const fs = require('fs');
const path = require('path');

const hooksDir = path.join(process.cwd(), 'src/hooks');

try {
    const files = fs.readdirSync(hooksDir);

    files.forEach(file => {
        const filePath = path.join(hooksDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix mixed quotes: "xxxx'; -> "xxxx";
        content = content.replace(/from "@\/src\/lib\/([^'"]*)';/g, 'from "@/src/lib/$1";');
        content = content.replace(/from "@\/src\/hooks\/([^'"]*)';/g, 'from "@/src/hooks/$1";');
        content = content.replace(/from "@\/src\/components\/([^'"]*)';/g, 'from "@/src/components/$1";');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed syntax in: ${file}`);
    });
} catch (error) {
    console.error('Error:', error);
}
