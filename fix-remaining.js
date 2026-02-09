const fs = require('fs');
const path = require('path');

function fixHooks() {
    const hooksDir = path.join(process.cwd(), 'src/hooks');
    const files = fs.readdirSync(hooksDir);

    files.forEach(file => {
        const filePath = path.join(hooksDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix imports
        content = content.replace(/from "@\/lib\//g, 'from "@/src/lib/');
        content = content.replace(/from "@\/hooks\//g, 'from "@/src/hooks/');
        content = content.replace(/from "@\/components\//g, 'from "@/src/components/');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed hook: ${file}`);
    });
}

function fixLogoImports() {
    const filesToFix = [
        'src/components/Navigation.tsx',
        'app/end-of-lease/page.tsx',
        'app/pressure-washing/page.tsx'
    ];

    filesToFix.forEach(relPath => {
        const filePath = path.join(process.cwd(), relPath);
        if (!fs.existsSync(filePath)) {
            console.log(`Skipping ${relPath} (not found)`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        // Remove import
        content = content.replace(/import logoImage from "\/logo.webp";\n?/, '');
        content = content.replace(/import logoImage from '\/logo.webp';\n?/, '');

        // Replace usage
        content = content.replace(/src={logoImage}/g, 'src="/logo.webp"');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed logo in: ${relPath}`);
    });
}

function run() {
    fixHooks();
    fixLogoImports();
}

run();
