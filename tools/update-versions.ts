// import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

// Define the project paths relative to the repo root
const projects = ['.', 'packages/core', 'packages/angular', 'packages/react', 'packages/vue', 'docs'];

const internalWorkspacePackages = new Set(['@parlamentsdienste/angular-output-target']);

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
            const pkgText = fs.readFileSync(pkgPath, 'utf8');
            const pkg = JSON.parse(pkgText);

            // Update version
            pkg.version = newVersion;

            // Update dependencies with @parlamentsdienste scope
            if (pkg.dependencies) {
                for (const dep in pkg.dependencies) {
                    if (dep.startsWith('@parlamentsdienste/') && !internalWorkspacePackages.has(dep)) {
                        pkg.dependencies[dep] = newVersion;
                    }
                }
            }

            // Update devDependencies with @parlamentsdienste scope
            if (pkg.devDependencies) {
                for (const dep in pkg.devDependencies) {
                    if (dep.startsWith('@parlamentsdienste/') && !internalWorkspacePackages.has(dep)) {
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
