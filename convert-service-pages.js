#!/usr/bin/env node

/**
 * Quick Page Converter - Vite to Next.js
 * Converts remaining service pages automatically
 */

const fs = require('fs');
const path = require('path');

// Service pages to convert
const servicePages = [
    { name: 'TileGroutCleaning', route: 'tile-grout' },
    { name: 'CarpetCleaning', route: 'carpet' },
    { name: 'ResidentialCleaning', route: 'residential' },
    { name: 'CommercialCleaning', route: 'commercial' },
    { name: 'DeepCleaning', route: 'deep-cleaning' },
    { name: 'SolarPanelCleaning', route: 'solar-panel' },
    { name: 'PressureWashing', route: 'pressure-washing' },
];

function convertServicePage(pageName, route) {
    const sourcePath = `src/pages/${pageName}.tsx`;
    const targetPath = `app/services/${route}/page.tsx`;

    try {
        if (!fs.existsSync(sourcePath)) {
            console.log(`⏭️  Skipping ${pageName} - source file not found`);
            return false;
        }

        let content = fs.readFileSync(sourcePath, 'utf8');

        // 1. Replace imports
        content = content.replace(/from "react-router-dom"/g, 'from "next/link"');
        content = content.replace(/import { Link }/g, 'import Link');
        content = content.replace(/from "@\/components\//g, 'from "@/src/components/');
        content = content.replace(/from "@\/lib\//g, 'from "@/src/lib/');

        // 2. Replace Link props
        content = content.replace(/<Link to="/g, '<Link href="');

        // 3. Add metadata import
        if (!content.includes('import type { Metadata }')) {
            const importIndex = content.indexOf('import');
            const firstImportEnd = content.indexOf(';', importIndex);
            content = content.slice(0, firstImportEnd + 1) +
                "\nimport type { Metadata } from 'next';" +
                content.slice(firstImportEnd + 1);
        }

        // 4. Convert component
        const componentMatch = content.match(/const (\w+) = \(\) => \{/);
        if (componentMatch) {
            const componentName = componentMatch[1];
            content = content.replace(
                `const ${componentName} = () => {`,
                `export default function ${componentName}Page() {`
            );
            content = content.replace(`export default ${componentName};`, '');
        }

        // 5. Create directory
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // 6. Write file
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log(`✅ Converted: ${pageName} → ${targetPath}`);
        return true;
    } catch (error) {
        console.error(`❌ Error converting ${pageName}:`, error.message);
        return false;
    }
}

console.log('🚀 Converting service pages...\n');

let success = 0;
let failed = 0;

servicePages.forEach(({ name, route }) => {
    if (convertServicePage(name, route)) {
        success++;
    } else {
        failed++;
    }
});

console.log(`\n✨ Conversion complete!`);
console.log(`   ✅ Success: ${success}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`\n📝 Next: Check the converted files and test routes`);
