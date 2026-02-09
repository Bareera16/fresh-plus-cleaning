#!/usr/bin/env node

/**
 * Fix all import paths in app/ directory
 */

const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

function fixImports(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Fix relative imports to use aliases
        const replacements = [
            { from: /from "\.\.\/src\/components\//g, to: 'from "@/src/components/' },
            { from: /from "\.\.\/src\/lib\//g, to: 'from "@/src/lib/' },
            { from: /from "\.\.\/src\/hooks\//g, to: 'from "@/src/hooks/' },
        ];

        replacements.forEach(({ from, to }) => {
            if (from.test(content)) {
                content = content.replace(from, to);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

console.log('🔧 Fixing import paths in app/...\n');

const appDir = path.join(process.cwd(), 'app');
const files = getAllFiles(appDir);

let fixed = 0;
files.forEach(file => {
    if (fixImports(file)) {
        fixed++;
    }
});

console.log(`\n✨ Fixed ${fixed} files in app directory!`);
