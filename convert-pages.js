#!/usr/bin/env node

/**
 * Automated Page Converter - Vite to Next.js
 * 
 * This script helps convert remaining pages from src/pages/ to app/ directory
 * 
 * Usage:
 * node convert-pages.js
 */

const fs = require('fs');
const path = require('path');

// Page mapping configuration
const pageMapping = [
    // Simple pages
    { from: 'src/pages/Blog.tsx', to: 'app/blog/page.tsx', clientComponent: false },
    { from: 'src/pages/Book.tsx', to: 'app/book/page.tsx', clientComponent: true },
    { from: 'src/pages/InstantQuote.tsx', to: 'app/get-quote/page.tsx', clientComponent: true },
    { from: 'src/pages/ThankYou.tsx', to: 'app/thank-you/page.tsx', clientComponent: false },
    { from: 'src/pages/PrivacyPolicy.tsx', to: 'app/privacy-policy/page.tsx', clientComponent: false },
    { from: 'src/pages/TermsOfService.tsx', to: 'app/terms-of-service/page.tsx', clientComponent: false },
    { from: 'src/pages/LicensedInsured.tsx', to: 'app/licensed-insured/page.tsx', clientComponent: false },

    // Service pages
    { from: 'src/pages/EndOfLeaseCleaning.tsx', to: 'app/services/end-of-lease/page.tsx', clientComponent: false },
    { from: 'src/pages/TileGroutCleaning.tsx', to: 'app/services/tile-grout/page.tsx', clientComponent: false },
    { from: 'src/pages/CarpetCleaning.tsx', to: 'app/services/carpet/page.tsx', clientComponent: false },
    { from: 'src/pages/ResidentialCleaning.tsx', to: 'app/services/residential/page.tsx', clientComponent: false },
    { from: 'src/pages/CommercialCleaning.tsx', to: 'app/services/commercial/page.tsx', clientComponent: false },
    { from: 'src/pages/DeepCleaning.tsx', to: 'app/services/deep-cleaning/page.tsx', clientComponent: false },
    { from: 'src/pages/SolarPanelCleaning.tsx', to: 'app/services/solar-panel/page.tsx', clientComponent: false },
    { from: 'src/pages/PressureWashing.tsx', to: 'app/services/pressure-washing/page.tsx', clientComponent: false },

    // Landing pages
    { from: 'src/pages/PressureWashingLanding.tsx', to: 'app/pressure-washing/page.tsx', clientComponent: false },
    { from: 'src/pages/TileGroutCleaningLanding.tsx', to: 'app/tile-grout/page.tsx', clientComponent: false },
    { from: 'src/pages/EndOfLeaseCleaningLanding.tsx', to: 'app/end-of-lease/page.tsx', clientComponent: false },
];

/**
 * Convert a single page file
 */
function convertPage(fromPath, toPath, isClientComponent) {
    try {
        // Read source file
        let content = fs.readFileSync(fromPath, 'utf8');

        // 1. Replace React Router imports with Next.js
        content = content.replace(
            /import { Link } from "react-router-dom";?/g,
            'import Link from "next/link";'
        );
        content = content.replace(
            /import { useNavigate } from "react-router-dom";?/g,
            'import { useRouter } from "next/navigation";'
        );

        // 2. Replace Link component props
        content = content.replace(
            /<Link to="/g,
            '<Link href="'
        );

        // 3. Update imports to use @/src/ prefix
        content = content.replace(
            /from "@\/components\//g,
            'from "@/src/components/'
        );
        content = content.replace(
            /from "@\/lib\//g,
            'from "@/src/lib/'
        );
        content = content.replace(
            /from "@\/hooks\//g,
            'from "@/src/hooks/'
        );

        // 4. Replace navigate() calls
        content = content.replace(
            /const navigate = useNavigate\(\);?/g,
            'const router = useRouter();'
        );
        content = content.replace(
            /navigate\(/g,
            'router.push('
        );

        // 5. Change export default to function name
        const componentNameMatch = content.match(/const (\w+) = \(\) => \{/);
        if (componentNameMatch) {
            const componentName = componentNameMatch[1];
            content = content.replace(
                `const ${componentName} = () => {`,
                `export default function ${componentName}Page() {`
            );
            content = content.replace(
                `export default ${componentName};`,
                ''
            );
        }

        // 6. Add 'use client' directive if needed
        if (isClientComponent) {
            content = `'use client';\n\n${content}`;
        }

        // 7. Create directory if it doesn't exist
        const dir = path.dirname(toPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // 8. Write converted file
        fs.writeFileSync(toPath, content, 'utf8');

        console.log(`✅ Converted: ${fromPath} → ${toPath}`);
        return true;
    } catch (error) {
        console.error(`❌ Error converting ${fromPath}:`, error.message);
        return false;
    }
}

/**
 * Main conversion process
 */
function main() {
    console.log('🚀 Starting page conversion...\n');

    let successCount = 0;
    let failCount = 0;

    pageMapping.forEach(({ from, to, clientComponent }) => {
        const success = convertPage(from, to, clientComponent);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    });

    console.log(`\n✨ Conversion complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review converted files for any manual adjustments needed`);
    console.log(`   2. Test each route in the browser`);
    console.log(`   3. Update any dynamic routes or special cases`);
    console.log(`   4. Run: npm run build`);
}

// Run the converter
main();
