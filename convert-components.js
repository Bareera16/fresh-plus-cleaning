const fs = require('fs');
const path = require('path');

const filesToConvert = [
    'src/components/ThankYouPage.tsx',
    'src/components/ScrollToTop.tsx',
    'src/components/ProtectedRoute.tsx',
    'src/components/forms/LandingPageForm.tsx',
    'src/components/home/ServicesSection.tsx',
    'src/components/home/HeroSection.tsx',
    'src/components/home/GetInTouchSection.tsx',
    'src/components/ContactForm.tsx',
    'src/components/AreasWeServe.tsx',
    'src/components/admin/AdminLayout.tsx'
];

function convertFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`Skipping ${filePath} (not found)`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let originalContent = content;

    // Add 'use client' if using hooks or interactivity (most of these likely do)
    // We'll add it if it's not there and we see react hooks or event handlers or router usage
    const needsClient = /useState|useEffect|useRef|onClick|onChange|onSubmit|useNavigate|useRouter|useLocation|useParams/.test(content);

    if (needsClient && !content.includes("'use client'") && !content.includes('"use client"')) {
        content = "'use client';\n" + content;
    }

    // 1. Replace react-router-dom imports
    // Handle mixed imports e.g. import { Link, useNavigate } from 'react-router-dom'

    if (content.includes('react-router-dom')) {
        // Replace Link
        if (content.includes('Link')) {
            content = content.replace(/import {[^}]*Link[^}]*} from ["']react-router-dom["'];?/, (match) => {
                // If it has other imports, we need to keep them or split them?
                // Simple approach: Replace the whole line with Next.js imports, 
                // but carefully because useNavigate needs next/navigation
                return match; // We will handle replacements line by line or with more specific regex below
            });
        }
    }

    // Simpler approach: replace specific named imports

    // Link -> next/link
    // Note: import { Link } from 'react-router-dom' -> import Link from 'next/link'
    // But if it is import { Link, useNavigate } ...

    // Let's replace usages first, then fix imports.

    // <Link to= -> <Link href=
    content = content.replace(/<Link\s+to=/g, '<Link href=');
    content = content.replace(/<Link\s+([^>]*)\s+to=/g, '<Link $1 href='); // in case 'to' is not first

    // navigate -> router
    // const navigate = useNavigate() -> const router = useRouter()
    if (content.match(/useNavigate/)) {
        content = content.replace(/const navigate = useNavigate\(\)/g, 'const router = useRouter()');
        content = content.replace(/navigate\(/g, 'router.push(');
        // navigate(-1) -> router.back()
        content = content.replace(/navigate\(-1\)/g, 'router.back()');
    }

    // Location
    // const location = useLocation() -> const pathname = usePathname() (roughly)
    if (content.match(/useLocation/)) {
        content = content.replace(/const location = useLocation\(\)/g, 'const pathname = usePathname()');
        content = content.replace(/location\.pathname/g, 'pathname');
    }

    // Params
    // const { id } = useParams() -> params are passed to page props in App Router, 
    // but for creating client component wrapper, imports need change.
    // useParams from next/navigation works in client components.

    // Logic to rewrite imports
    let newImports = [];
    let lines = content.split('\n');
    let newLines = [];

    let reactRouterLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.match(/import.*from.*['"]react-router-dom['"]/)) {
            // Extract what was imported
            const match = line.match(/import\s+{([^}]+)}\s+from/);
            if (match) {
                const imports = match[1].split(',').map(s => s.trim());

                if (imports.includes('Link')) {
                    newImports.push('import Link from "next/link";');
                }

                if (imports.includes('useNavigate') || imports.includes('useLocation') || imports.includes('useParams') || imports.includes('Outlet')) {
                    let navImports = [];
                    if (imports.includes('useNavigate')) navImports.push('useRouter');
                    if (imports.includes('useLocation')) navImports.push('usePathname');
                    if (imports.includes('useParams')) navImports.push('useParams');

                    if (navImports.length > 0) {
                        newImports.push(`import { ${navImports.join(', ')} } from "next/navigation";`);
                    }
                }

                // Outlet is special for layouts.
                // In Next.js App Router, 'children' prop is used instead of Outlet.
                // We might need manual intervention for Outlet.
                if (imports.includes('Outlet')) {
                    // Warning: manual fix might be needed for Outlet
                    console.log(`⚠️  ${filePath} uses Outlet. Check manually.`);
                }

                // Don't add the original line
                continue;
            }
        }

        if (line.match(/import.*from.*['"]@\/components\//)) {
            line = line.replace('@/components/', '@/src/components/');
        }
        if (line.match(/import.*from.*['"]@\/lib\//)) {
            line = line.replace('@/lib/', '@/src/lib/');
        }
        if (line.match(/import.*from.*['"]@\/hooks\//)) {
            line = line.replace('@/hooks/', '@/src/hooks/');
        }

        newLines.push(line);
    }

    // Insert new imports after specific position (e.g. after 'use client' or other imports)
    // or just replace the react-router-dom line location?
    // Since I removed the react-router-dom line, I should insert new imports there.
    // But I'm iterating. 

    // Let's just prepend imports to the import section (ignoring 'use client')

    let finalContent = newLines.join('\n');

    // Prepend new imports
    if (newImports.length > 0) {
        // Find insertion point (after use client, before other code)
        const importIdx = finalContent.search(/import/);
        if (importIdx >= 0) {
            finalContent = finalContent.slice(0, importIdx) + newImports.join('\n') + '\n' + finalContent.slice(importIdx);
        } else {
            finalContent = newImports.join('\n') + '\n' + finalContent;
        }
    }

    // Rewrite Outlet usages to {children} ?? 
    // AdminLayout likely uses Outlet. Next.js Layouts receives children.
    if (finalContent.includes('<Outlet />') || finalContent.includes('<Outlet/>')) {
        finalContent = finalContent.replace(/<Outlet\s*\/?>/g, '{children}');
        // Also need to make sure props include children
        // This is getting complex for regex. A manual check is safer for AdminLayout.
    }

    if (finalContent !== originalContent) {
        fs.writeFileSync(fullPath, finalContent, 'utf8');
        console.log(`✅ Updated ${filePath}`);
    } else {
        console.log(`No changes needed for ${filePath}`);
    }
}

filesToConvert.forEach(convertFile);
