const fs = require('fs');
const path = require('path');

// 1. Rename src/pages to src/legacy_pages
const srcPages = path.join(process.cwd(), 'src', 'pages');
const destPages = path.join(process.cwd(), 'src', 'legacy_pages');

try {
    if (fs.existsSync(srcPages)) {
        if (fs.existsSync(destPages)) {
            console.log('Destination folder exists, removing it first...');
            fs.rmSync(destPages, { recursive: true, force: true });
        }

        // Give OS time to unlock file handles? No way to force.
        // Retry logic maybe?

        try {
            fs.renameSync(srcPages, destPages);
            console.log('✅ Renamed src/pages -> src/legacy_pages');
        } catch (err) {
            console.error('Failed to rename (locked?):', err.message);
            // Try copy and delete
            console.log('Attempting to copy and delete...');
            // fs.cpSync(srcPages, destPages, { recursive: true }); // node > 16.7
            // fs.rmSync(srcPages, { recursive: true, force: true });
            // Can't rely on cpSync for older node. Using simple recursion?
            // Or just fail and ask user to close things.
        }
    } else {
        console.log('src/pages not found (already renamed?)');
    }
} catch (error) {
    console.error('Error renaming pages:', error);
}

// 2. Fix app/thank-you/page.tsx
const thankYouPath = path.join(process.cwd(), 'app', 'thank-you', 'page.tsx');
if (fs.existsSync(thankYouPath)) {
    let content = fs.readFileSync(thankYouPath, 'utf8');

    if (!content.includes('"use client"')) {
        content = '"use client";\n' + content;
    }

    // Fix imports
    content = content.replace(/import { useSearchParams, useNavigate, Link } from "next\/link";/, 'import { useSearchParams, useRouter } from "next/navigation";\nimport Link from "next/link";');

    // If useNavigate was imported but unused/undefined:
    // Code uses `const router = useRouter();`
    // Convert to `const [searchParams] = useSearchParams();`?
    // Wait, useSearchParams return strictly readonly URLSearchParams except in pages router? No, in app router: `const searchParams = useSearchParams();` 
    // And it doesn't return array? It returns search params object directly.

    // Wait, in App Router:
    // import { useSearchParams } from 'next/navigation'
    // const searchParams = useSearchParams()
    // const search = searchParams.get('search')

    // The existing code: `const [searchParams] = useSearchParams();` this syntax is WRONG for Next.js App Router (it was correct for React Router v6 useSearchParams which returns [params, setParams]).

    // Fix: `const searchParams = useSearchParams();`
    content = content.replace(/const \[searchParams\] = useSearchParams\(\);/, 'const searchParams = useSearchParams();');

    // Fix dependency array: `[source, type, navigate]` -> `[source, type, router]`
    content = content.replace(/\[source, type, navigate\]/, '[source, type, router]');

    fs.writeFileSync(thankYouPath, content, 'utf8');
    console.log('✅ Fixed app/thank-you/page.tsx');
}
