// import { execSync } from 'node:child_process';
import path from 'node:path';

// Define the project paths relative to the repo root
const projects = ['.', 'packages/core', 'packages/angular', 'packages/react', 'packages/vue', 'docs'];

// Prompt for the new version
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the new version: ', (newVersion: string) => {
    for (const projectPath of projects) {
        const absPath = path.resolve(projectPath);
        console.log(`Updating version in ${absPath} to ${newVersion}...`);
        const pkgPath = path.join(absPath, 'package.json');
        try {
            const fs = require('fs');
            const pkgText = fs.readFileSync(pkgPath, 'utf8');
            const pkg = JSON.parse(pkgText);

            // Update version
            pkg.version = newVersion;

            // Update dependencies with @parlamentsdienste scope
            if (pkg.dependencies) {
                for (const dep in pkg.dependencies) {
                    if (dep.startsWith('@parlamentsdienste/')) {
                        pkg.dependencies[dep] = newVersion;
                    }
                }
            }

            // Update devDependencies with @parlamentsdienste scope
            if (pkg.devDependencies) {
                for (const dep in pkg.devDependencies) {
                    if (dep.startsWith('@parlamentsdienste/')) {
                        pkg.devDependencies[dep] = newVersion;
                    }
                }
            }

            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n', 'utf8');
            console.log(`✅ Updated version in ${pkgPath} to ${newVersion}`);
        } catch (error) {
            console.error(`❌ Failed to update ${pkgPath}:`, error);
            process.exitCode = 1;
        }
    }
    console.log('✅ All specified packages updated successfully.');
    rl.close();
});
