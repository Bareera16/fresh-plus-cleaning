const fs = require('fs');
const path = require('path');

function fixHooksSyntax() {
    const hooksDir = path.join(process.cwd(), 'src/hooks');
    const files = fs.readdirSync(hooksDir);

    files.forEach(file => {
        const filePath = path.join(hooksDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix mixed quotes caused by previous script
        // Pattern: from "@/src/lib/something'; -> from "@/src/lib/something";

        content = content.replace(/from "@/g, 'from "'); // clear up potentially bad replacement start? No, start is fine.

        // Fix specific mixed quote cases
        // Fix @/src/lib
        content = content.replace(/from "@/src\/lib\/([^'"]*)';/g, 'from "@/src/lib/$1";');
        // Fix @/src/hooks
        content = content.replace(/from "@/src\/hooks\/([^'"]*)';/g, 'from "@/src/hooks/$1";');
        // Fix @/src/components
        content = content.replace(/from "@/src\/components\/([^'"]*)';/g, 'from "@/src/components/$1";');

        // Also check for ' from " (if original was double quote but regex used single?) 
        // My previous regex matched ["'] so it replaced " or ' with ".
        // If original was ", then result is " -> " which is fine.
        // If original was ', then result is " -> ' which is mixed.

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed syntax in hook: ${file}`);
    });
}

fixHooksSyntax();
