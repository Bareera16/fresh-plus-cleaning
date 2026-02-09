#!/usr/bin/env node

/**
 * Convert remaining important pages
 */

const fs = require('fs');
const path = require('path');

const pages = [
    { source: 'src/pages/Blog.tsx', target: 'app/blog/page.tsx', client: false },
    { source: 'src/pages/InstantQuote.tsx', target: 'app/get-quote/page.tsx', client: true },
    { source: 'src/pages/ThankYou.tsx', target: 'app/thank-you/page.tsx', client: false },
    { source: 'src/pages/PrivacyPolicy.tsx', target: 'app/privacy-policy/page.tsx', client: false },
    { source: 'src/pages/TermsOfService.tsx', target: 'app/terms-of-service/page.tsx', client: false },
    { source: 'src/pages/LicensedInsured.tsx', target: 'app/licensed-insured/page.tsx', client: false },
    { source: 'src/pages/PressureWashingLanding.tsx', target: 'app/pressure-washing/page.tsx', client: false },
    { source: 'src/pages/TileGroutCleaningLanding.tsx', target: 'app/tile-grout/page.tsx', client: false },
    { source: 'src/pages/EndOfLeaseCleaningLanding.tsx', target: 'app/end-of-lease/page.tsx', client: false },
];

function convertPage(source, target, isClient) {
    try {
        if (!fs.existsSync(source)) {
            console.log(`⏭️  Skip: ${source}`);
            return false;
        }

        let content = fs.readFileSync(source, 'utf8');

        // Replace imports
        content = content.replace(/from "react-router-dom"/g, 'from "next/link"');
        content = content.replace(/import { Link, useNavigate }/g, 'import Link');
        content = content.replace(/import { Link }/g, 'import Link');
        content = content.replace(/import { useNavigate }/g, 'import { useRouter }');
        content = content.replace(/from "@\/components\//g, 'from "@/src/components/');
        content = content.replace(/from "@\/lib\//g, 'from "@/src/lib/');
        content = content.replace(/from "@\/hooks\//g, 'from "@/src/hooks/');

        // Replace Link props
        content = content.replace(/<Link to="/g, '<Link href="');

        // Replace navigation
        content = content.replace(/const navigate = useNavigate\(\);?/g, 'const router = useRouter();');
        content = content.replace(/navigate\(/g, 'router.push(');

        // Add imports
        if (!content.includes('import type { Metadata }')) {
            const importIndex = content.indexOf('import');
            if (importIndex !== -1) {
                const firstImportEnd = content.indexOf(';', importIndex);
                content = content.slice(0, firstImportEnd + 1) +
                    "\nimport type { Metadata } from 'next';" +
                    content.slice(firstImportEnd + 1);
            }
        }

        if (isClient && !content.startsWith("'use client'")) {
            content = "'use client';\n\n" + content;
        }

        // Convert component
        const componentMatch = content.match(/const (\w+) = \(\) => \{/);
        if (componentMatch) {
            const componentName = componentMatch[1];
            content = content.replace(
                `const ${componentName} = () => {`,
                `export default function ${componentName}Page() {`
            );
            content = content.replace(`export default ${componentName};`, '');
        }

        // Create directory
        const dir = path.dirname(target);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(target, content, 'utf8');
        console.log(`✅ ${path.basename(source)} → ${target}`);
        return true;
    } catch (error) {
        console.error(`❌ ${source}:`, error.message);
        return false;
    }
}

console.log('🚀 Converting remaining pages...\n');

let success = 0;
pages.forEach(({ source, target, client }) => {
    if (convertPage(source, target, client)) success++;
});

console.log(`\n✨ Done! Converted ${success}/${pages.length} pages`);
