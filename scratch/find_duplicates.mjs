import fs from 'fs';
import path from 'path';

const searchDir = 'd:/Course Platform';
const variables = ['student', 'students', 'authHeader'];

function findDuplicates(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                findDuplicates(fullPath);
            }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            for (const variable of variables) {
                const declarations = [];
                const regex = new RegExp(`(const|let|var)\\s+${variable}\\s*=`, 'g');
                for (let i = 0; i < lines.length; i++) {
                    if (regex.test(lines[i])) {
                        declarations.push({ line: i + 1, content: lines[i].trim() });
                    }
                }
                if (declarations.length > 1) {
                    console.log(`Duplicate "${variable}" in ${fullPath}:`);
                    declarations.forEach(d => console.log(`  Line ${d.line}: ${d.content}`));
                }
            }
        }
    }
}

findDuplicates(searchDir);
