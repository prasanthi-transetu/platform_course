import fs from 'fs';
import path from 'path';

const searchDir = 'd:/Course Platform';
const variables = ['student', 'students', 'authHeader'];

function findDuplicatesAggressive(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                findDuplicatesAggressive(fullPath);
            }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            const foundInFile = [];
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                for (const variable of variables) {
                    // Match any declaration or property assignment that might look like a declaration to some linters
                    const regex = new RegExp(`\\b(const|let|var|data:|students:)\\s*\\{?\\s*${variable}\\b`, 'g');
                    if (regex.test(line)) {
                        foundInFile.push({ line: i + 1, content: line.trim(), variable });
                    }
                }
            }
            
            if (foundInFile.length > 1) {
                // Group by variable
                const grouped = foundInFile.reduce((acc, item) => {
                    acc[item.variable] = acc[item.variable] || [];
                    acc[item.variable].push(item);
                    return acc;
                }, {});
                
                Object.keys(grouped).forEach(v => {
                    if (grouped[v].length > 1) {
                        console.log(`Potential duplicate "${v}" in ${fullPath}:`);
                        grouped[v].forEach(item => console.log(`  Line ${item.line}: ${item.content}`));
                    }
                });
            }
        }
    }
}

findDuplicatesAggressive(searchDir);
