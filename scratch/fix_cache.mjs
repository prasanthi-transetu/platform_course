import fs from 'fs';
import path from 'path';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file === 'route.ts') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const apiDir = path.join(process.cwd(), 'app', 'api');
const routes = getFiles(apiDir);

routes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Ensure Route Configuration
  const configs = [
    'export const dynamic = "force-dynamic";',
    'export const fetchCache = "force-no-store";',
    'export const revalidate = 0;'
  ];

  configs.forEach(config => {
    if (!content.includes(config)) {
      const lines = content.split('\n');
      let insertIndex = lines.findIndex(line => !line.startsWith('import') && line.trim() !== '');
      if (insertIndex === -1) insertIndex = lines.length;
      lines.splice(insertIndex, 0, config);
      content = lines.join('\n');
      changed = true;
    }
  });

  // 2. Inject cache: "no-store" into fetch calls
  const fetchRegex = /fetch\(([^,]+),\s*\{([^\}]*)\}/g;
  const originalFetchContent = content;
  content = content.replace(fetchRegex, (match, url, options) => {
    if (options.includes('cache:')) return match;
    return `fetch(${url}, { cache: "no-store",${options}}`;
  });
  if (content !== originalFetchContent) changed = true;

  // 3. Add Cache-Control headers to NextResponse.json
  // Improved regex to handle nested braces or at least capture the options object correctly
  const nextResponseRegex = /NextResponse\.json\(([^,]+)(,\s*\{([^\}]*)\})\)/g;
  const originalResponseContent = content;
  
  // Update: Only replace if not already has Cache-Control
  content = content.replace(nextResponseRegex, (match, data, hasOptions, options) => {
    if (options.includes('Cache-Control')) return match;
    
    if (options.includes('headers:')) {
      // Inject into existing headers
      return match.replace(/headers:\s*\{/, 'headers: { "Cache-Control": "no-store, max-age=0, must-revalidate", "Pragma": "no-cache", "Expires": "0", ');
    } else {
      // Add headers object to existing options
      return `NextResponse.json(${data}, { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate", "Pragma": "no-cache", "Expires": "0" }, ${options}})`;
    }
  });

  // Handle case with NO options
  const nextResponseNoOptionsRegex = /NextResponse\.json\(([^,\)]+)\)/g;
  content = content.replace(nextResponseNoOptionsRegex, (match, data) => {
    if (content.includes('Cache-Control')) return match; // Rough check
    return `NextResponse.json(${data}, { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate", "Pragma": "no-cache", "Expires": "0" } })`;
  });

  if (content !== originalResponseContent) changed = true;

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${path.relative(process.cwd(), file)}`);
  }
});
