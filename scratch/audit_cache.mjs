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

const results = routes.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  return {
    file: path.relative(process.cwd(), file),
    hasDynamic: content.includes('export const dynamic = "force-dynamic"'),
    hasFetchCache: content.includes('export const fetchCache = "force-no-store"'),
    hasRevalidate0: content.includes('export const revalidate = 0'),
    hasCacheNoStore: content.includes("cache: 'no-store'") || content.includes('cache: "no-store"')
  };
});

console.log(JSON.stringify(results, null, 2));
