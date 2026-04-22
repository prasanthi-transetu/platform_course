import fs from 'fs';
import path from 'path';

const TARGET_DIR = 'app';
const VARS_TO_CHECK = ['student', 'students', 'authHeader'];

function findDuplicates(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findDuplicates(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            
            // This is a naive check but it looks for multiple 'const name =' or 'let name =' or 'const { name } =' or 'const [name] =' 
            // in the same file. I'll manually check scope after.
            for (const varName of VARS_TO_CHECK) {
                const regex = new RegExp(`(const|let|var)\\s+({?\\s*${varName}\\s*}?|${varName})\\s*=`, 'g');
                const matches = [];
                let match;
                while ((match = regex.exec(content)) !== null) {
                    const lineNum = content.substring(0, match.index).split('\n').length;
                    matches.push(lineNum);
                }
                
                if (matches.length > 1) {
                    console.log(`Potential duplicate '${varName}' in ${fullPath}: Lines ${matches.join(', ')}`);
                }
            }
        }
    }
}

findDuplicates(TARGET_DIR);
