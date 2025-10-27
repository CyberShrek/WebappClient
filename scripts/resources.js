import { readdirSync, cpSync, existsSync, mkdirSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function copyResources(targetPath) {
    const resourcesPath = resolve(__dirname, '../resources');
    const destinationPath = resolve(process.cwd(), targetPath);

    console.log(`Copying resources from ${resourcesPath} to ${destinationPath}`);

    if (!existsSync(resourcesPath)) {
        console.log('No resources directory found, skipping.');
        return;
    }

    if (!existsSync(destinationPath)) {
        mkdirSync(destinationPath, { recursive: true });
    }

    const resourcesContent = readdirSync(resourcesPath);

    for (const item of resourcesContent) {
        const sourceItem = join(resourcesPath, item);
        const destItem = join(destinationPath, item);
        cpSync(sourceItem, destItem, { recursive: true, force: true });
        console.log(`Copied: ${item}`);
    }

    console.log(`✅ Resources copied to ${targetPath}`);
}