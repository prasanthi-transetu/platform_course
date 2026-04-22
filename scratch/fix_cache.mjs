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
      // Add at the top, after imports
      const lines = content.split('\n');
      let insertIndex = lines.findIndex(line => !line.startsWith('import') && line.trim() !== '');
      if (insertIndex === -1) insertIndex = lines.length;
      lines.splice(insertIndex, 0, config);
      content = lines.join('\n');
      changed = true;
    }
  });

  // 2. Inject cache: "no-store" into fetch calls
  // This regex looks for fetch(..., { ... }) and ensures cache: "no-store" is inside
  // It handles cases where there's already an options object.
  
  // First, handle fetch(url, { ... })
  const fetchWithOptionsRegex = /fetch\(([^,]+),\s*\{/g;
  if (content.match(fetchWithOptionsRegex)) {
    // We'll do a simple replacement for the most common pattern in this repo
    // If it has { headers: ... }, we'll inject cache: "no-store",
    const originalContent = content;
    content = content.replace(/fetch\(([^,]+),\s*\{([^\}]*)\}/g, (match, url, options) => {
      if (options.includes('cache:')) return match; // Already has cache setting
      return `fetch(${url}, { cache: "no-store",${options}}`;
    });
    if (content !== originalContent) changed = true;
  }

  // Second, handle fetch(url) without options
  const fetchNoOptionsRegex = /fetch\(([^,\)]+)\)/g;
  const originalContentNoOptions = content;
  content = content.replace(fetchNoOptionsRegex, (match, url) => {
    // Avoid matching things that aren't simple variables or strings for URL
    if (url.includes('{') || url.includes('}')) return match; 
    return `fetch(${url}, { cache: "no-store" })`;
  });
  if (content !== originalContentNoOptions) changed = true;

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${path.relative(process.cwd(), file)}`);
  }
});
