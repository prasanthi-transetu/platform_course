import fs from 'fs';
import path from 'path';

const searchDir = 'd:/Course Platform';
const variables = ['student', 'students', 'authHeader'];

function findDuplicatesInScope(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                findDuplicatesInScope(fullPath);
            }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            
            // This is a very rough way to find duplicates in the "same scope"
            // We'll look for multiple declarations within curly braces.
            let scopeDepth = 0;
            let scopes = [[]]; // Stack of scopes, each scope is a list of declared variables
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // Track curly braces to simulate scope
                for (const char of line) {
                    if (char === '{') {
                        scopeDepth++;
                        scopes.push([]);
                    } else if (char === '}') {
                        if (scopeDepth > 0) {
                            scopeDepth--;
                            scopes.pop();
                        }
                    }
                }
                
                for (const variable of variables) {
                    const regex = new RegExp(`(const|let|var)\\s+${variable}\\s*=`, 'g');
                    if (regex.test(line)) {
                        const currentScope = scopes[scopes.length - 1];
                        if (currentScope.includes(variable)) {
                            console.log(`DUPLICATE FOUND in ${fullPath}:`);
                            console.log(`  Line ${i + 1}: ${line.trim()}`);
                        } else {
                            currentScope.push(variable);
                        }
                    }
                    
                    // Also check destructuring like { data: student }
                    const destructuringRegex = new RegExp(`const\\s+\\{\\s*.*data:\\s*${variable}.*\\s*\\}\\s*=\\s*`, 'g');
                    if (destructuringRegex.test(line)) {
                        const currentScope = scopes[scopes.length - 1];
                        if (currentScope.includes(variable)) {
                            console.log(`DUPLICATE FOUND (destructuring) in ${fullPath}:`);
                            console.log(`  Line ${i + 1}: ${line.trim()}`);
                        } else {
                            currentScope.push(variable);
                        }
                    }
                }
            }
        }
    }
}

findDuplicatesInScope(searchDir);
