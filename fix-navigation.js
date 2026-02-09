#!/usr/bin/env node

/**
 * Fix all 'to' props to 'href' in Navigation.tsx
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'components', 'Navigation.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace all 'to=' with 'href='
    content = content.replace(/\bto=/g, 'href=');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed Navigation.tsx - replaced all "to=" with "href="');
} catch (error) {
    console.error('❌ Error:', error.message);
}
