import { execSync } from 'child_process'
import { existsSync, rmSync, symlinkSync, lstatSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const webappClientPath = resolve(__dirname, '..')

const links = [
    ['node_modules'],
    ['tsconfig.json'],
    ['static-assets.d.ts'],
    ['src/main', 'import'],
]

function checkTargetExists(targetPath) {
    if (!existsSync(targetPath)) {
        throw new Error(`Target does not exist: ${targetPath}`)
    }
}

function removeExistingLink(linkPath) {
    // if (existsSync(linkPath)) {
        console.log(`Removing link: ${linkPath}`)
        rmSync(linkPath, { recursive: true, force: true })
    // }
}

function createSymlink(targetPath, linkPath) {
    console.log(`Creating symlink: ${linkPath}`)
    if (process.platform === 'win32') {
        execSync(`powershell -Command "New-Item -ItemType SymbolicLink -Path '${linkPath}' -Target '${targetPath}' -Force"`, { stdio: 'inherit' })
    } else {
        execSync(`ln -s "${targetPath}" "${linkPath}"`, { stdio: 'inherit' })
    }
}


function setupLink(target, link) {
    const targetPath = resolve(webappClientPath, target)
    const linkPath = resolve(process.cwd(), link)

    console.log(`Linking: ${link}`)

    checkTargetExists(targetPath)
    removeExistingLink(linkPath)
    createSymlink(targetPath, linkPath)

    if (!existsSync(linkPath)) {
        throw new Error(`Failed to create symlink: ${linkPath}`)
    }

    console.log(`✅  ${link}`)
}

// Main execution
console.log('🔗 Setting up development environment...')

try {
    links.forEach((link) => setupLink(link[0], link[1] || link[0]))
    console.log('🎉 All links created successfully!')
} catch (error) {
    console.error(`❌  Error: ${error.message}`)
    process.exit(1)
}