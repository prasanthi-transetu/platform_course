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
                // regex to match const/let/var declaration of the variable
                // handles destructuring as well: { student } or [ student ]
                const pattern = new RegExp(`(const|let|var)\\s+({?\\s*${varName}\\s*}?|${varName})\\s*=`, 'g');
                const matches = [...content.matchAll(pattern)];
                if (matches.length > 1) {
                    console.log(`Potential duplicate '${varName}' in ${fullPath}: Lines ${matches.map(m => content.substring(0, m.index).split('\n').length).join(', ')}`);
                }
            }
        }
    }
}

findDuplicates(TARGET_DIR);
