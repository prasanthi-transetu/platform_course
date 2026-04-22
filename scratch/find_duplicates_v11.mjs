import fs from 'fs';
import path from 'path';

const TARGET_DIR = 'app';
const TARGET_VARS = ['student', 'students', 'authHeader'];

function findDuplicates(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next') {
                findDuplicates(fullPath);
            }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            for (const varName of TARGET_VARS) {
                // regex to match const/let/var/param declaration of the variable
                // handles destructuring as well: { student } or [ student ]
                // This is still a bit naive but good for finding candidates
                const pattern = new RegExp(`(?:const|let|var|function|async|await|import|export)\\s+.*?\\b${varName}\\b`, 'g');
                const matches = [...content.matchAll(pattern)];
                if (matches.length > 1) {
                    // Filter matches by whether they are actual declarations
                    const declarations = matches.filter(m => {
                        const line = content.substring(0, m.index).split('\n').pop() + content.substring(m.index).split('\n')[0];
                        return /\b(const|let|var)\b/.test(line) && line.includes('=');
                    });
                    
                    if (declarations.length > 1) {
                         console.log(`Potential duplicate '${varName}' in ${fullPath}: Lines ${declarations.map(m => content.substring(0, m.index).split('\n').length).join(', ')}`);
                    }
                }
            }
        }
    }
}

findDuplicates(TARGET_DIR);
findDuplicates('features');
findDuplicates('components');
