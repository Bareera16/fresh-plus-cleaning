#!/usr/bin/env node

/**
 * Fix all import paths in src/components to use @/src/ prefix
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

        // Fix imports
        const replacements = [
            { from: /from "@\/components\//g, to: 'from "@/src/components/' },
            { from: /from "@\/lib\//g, to: 'from "@/src/lib/' },
            { from: /from "@\/hooks\//g, to: 'from "@/src/hooks/' },
            { from: /from '@\/components\//g, to: "from '@/src/components/" },
            { from: /from '@\/lib\//g, to: "from '@/src/lib/" },
            { from: /from '@\/hooks\//g, to: "from '@/src/hooks/" },
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

console.log('🔧 Fixing import paths in src/components...\n');

const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = getAllFiles(componentsDir);

let fixed = 0;
files.forEach(file => {
    if (fixImports(file)) {
        fixed++;
    }
});

console.log(`\n✨ Fixed ${fixed} files!`);
