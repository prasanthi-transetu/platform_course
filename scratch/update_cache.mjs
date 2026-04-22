import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('route.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export const dynamic = "force-dynamic";') && !content.includes('export const fetchCache')) {
        content = content.replace('export const dynamic = "force-dynamic";', 'export const dynamic = "force-dynamic";\nexport const fetchCache = "force-no-store";\nexport const revalidate = 0;');
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}
processDir('app/api');
