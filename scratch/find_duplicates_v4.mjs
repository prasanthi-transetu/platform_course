import fs from 'fs';
import path from 'path';

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
            const seen = new Map(); // scope-blind for now, just to find candidates
            
            // This is a naive check for declarations in the same file
            // Let's look for multiple 'const name =' or 'let name =' or 'const { name } ='
            const declPattern = /(const|let|var)\s+(\{?\s*([a-zA-Z0-9_]+)\s*\}?)\s*=/g;
            let match;
            const fileContext = [];
            while ((match = declPattern.exec(content)) !== null) {
                const name = match[3];
                const lineNum = content.substring(0, match.index).split('\n').length;
                if (!fileContext[name]) fileContext[name] = [];
                fileContext[name].push(lineNum);
            }
            
            for (const name in fileContext) {
                if (fileContext[name].length > 1 && ['student', 'students', 'authHeader'].includes(name)) {
                    console.log(`Potential duplicate '${name}' in ${fullPath}: lines ${fileContext[name].join(', ')}`);
                }
            }
        }
    }
}

findDuplicates('app');
findDuplicates('features');
findDuplicates('components');
