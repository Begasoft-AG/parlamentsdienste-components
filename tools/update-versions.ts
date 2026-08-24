// import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

// Define the project paths relative to the repo root
const projects = ['.', 'packages/core', 'packages/angular', 'packages/react', 'packages/vue'];

const releasablePackageNames = new Set([
    '@parlamentsdienste/pdcomponents-core',
    '@parlamentsdienste/pdcomponents-angular',
    '@parlamentsdienste/pdcomponents-react',
    '@parlamentsdienste/pdcomponents-vue',
]);

function updateInternalDependencyVersions(deps: Record<string, string> | undefined, newVersion: string): void {
    if (!deps) {
        return;
    }

    for (const dep of Object.keys(deps)) {
        const currentSpecifier = deps[dep];

        if (!dep.startsWith('@parlamentsdienste/')) {
            continue;
        }

        if (currentSpecifier.startsWith('workspace:')) {
            continue;
        }

        if (!releasablePackageNames.has(dep)) {
            continue;
        }

        deps[dep] = newVersion;
    }
}

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

            updateInternalDependencyVersions(pkg.dependencies, newVersion);
            updateInternalDependencyVersions(pkg.devDependencies, newVersion);
            updateInternalDependencyVersions(pkg.peerDependencies, newVersion);
            updateInternalDependencyVersions(pkg.optionalDependencies, newVersion);

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
