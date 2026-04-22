import fs from 'fs';
import path from 'path';

const TARGET_DIR = 'app';
const TARGET_VARS = ['student', 'students', 'authHeader'];

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
            const fileResults = [];

            for (const varName of TARGET_VARS) {
                // Regex to find declarations: const x =, let x =, const { x } =, const [ x ] =
                // We focus on the word boundary \b to avoid matching longer names
                const pattern = new RegExp(`(?:const|let|var)\\s+(?:{[^}]*\\b${varName}\\b[^}]*}|\\[[^\\]]*\\b${varName}\\b[^\\]]*\\]|\\b${varName}\\b)\\s*=`, 'g');
                
                const matches = [];
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    const lineNum = content.substring(0, match.index).split('\n').length;
                    matches.push({ lineNum, content: lines[lineNum - 1].trim() });
                }

                if (matches.length > 1) {
                    fileResults.push({ varName, matches });
                }
            }

            if (fileResults.length > 0) {
                console.log(`--- ${fullPath} ---`);
                fileResults.forEach(res => {
                    console.log(`Duplicate '${res.varName}' found at:`);
                    res.matches.forEach(m => console.log(`  Line ${m.lineNum}: ${m.content}`));
                });
            }
        }
    }
}

findDuplicates('.');
