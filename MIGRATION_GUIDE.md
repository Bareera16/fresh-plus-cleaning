# Fresh Plus Cleaning - Vite to Next.js Migration Guide

## ✅ Completed Steps

1. **Package Configuration**
   - ✅ Updated `package.json` with Next.js dependencies
   - ✅ Removed Vite dependencies
   - ✅ Updated build scripts

2. **Configuration Files**
   - ✅ Created `next.config.mjs`
   - ✅ Updated `tsconfig.json` for Next.js
   - ✅ Updated `.gitignore` for Next.js build folders

3. **App Structure**
   - ✅ Created `app/layout.tsx` (root layout)
   - ✅ Created `app/providers.tsx` (client-side providers)
   - ✅ Created `app/page.tsx` (home page)
   - ✅ Created `app/about/page.tsx` (about page)

## 🔄 Migration Rules

### Import Changes
- ❌ `import { Link } from "react-router-dom"` 
- ✅ `import Link from "next/link"`

- ❌ `import Component from "../components/Component"`
- ✅ `import Component from "@/src/components/Component"`

### Link Component Changes
- ❌ `<Link to="/about">About</Link>`
- ✅ `<Link href="/about">About</Link>`

### Navigation Changes
- ❌ `import { useNavigate } from "react-router-dom"`
- ✅ `import { useRouter } from "next/navigation"`

- ❌ `const navigate = useNavigate(); navigate("/path")`
- ✅ `const router = useRouter(); router.push("/path")`

### Component Type Changes
- All pages are now **Server Components** by default
- Add `'use client'` directive at top if component uses:
  - `useState`, `useEffect`, or other React hooks
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs
  - Context providers

### Metadata
- ❌ Using `<SEOHead>` component for metadata
- ✅ Export `metadata` object from page:
```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};
```

## 📁 File Structure Mapping

```
src/pages/Index.tsx          → app/page.tsx ✅
src/pages/About.tsx           → app/about/page.tsx ✅
src/pages/Contact.tsx         → app/contact/page.tsx
src/pages/Blog.tsx            → app/blog/page.tsx
src/pages/BlogPost.tsx        → app/blog/[slug]/page.tsx
src/pages/InstantQuote.tsx    → app/get-quote/page.tsx
src/pages/ThankYou.tsx        → app/thank-you/page.tsx

Services:
src/pages/EndOfLeaseCleaning.tsx    → app/services/end-of-lease/page.tsx
src/pages/TileGroutCleaning.tsx     → app/services/tile-grout/page.tsx
src/pages/CarpetCleaning.tsx        → app/services/carpet/page.tsx
src/pages/ResidentialCleaning.tsx   → app/services/residential/page.tsx
src/pages/CommercialCleaning.tsx    → app/services/commercial/page.tsx
src/pages/DeepCleaning.tsx          → app/services/deep-cleaning/page.tsx
src/pages/SolarPanelCleaning.tsx    → app/services/solar-panel/page.tsx
src/pages/PressureWashing.tsx       → app/services/pressure-washing/page.tsx

Landing Pages:
src/pages/PressureWashingLanding.tsx      → app/pressure-washing/page.tsx
src/pages/TileGroutCleaningLanding.tsx    → app/tile-grout/page.tsx
src/pages/EndOfLeaseCleaningLanding.tsx   → app/end-of-lease/page.tsx

Admin:
src/pages/admin/v2/LoginPage.tsx          → app/admin/login/page.tsx
src/pages/admin/v2/DashboardPage.tsx      → app/admin/dashboard/page.tsx
src/pages/admin/v2/BookingsPage.tsx       → app/admin/instant-bookings/page.tsx
```

## 🔒 Preserved (NO CHANGES)

- ✅ `src/components/` - All components remain unchanged
- ✅ `src/lib/` - All backend logic, API calls, validations
- ✅ `src/hooks/` - All custom hooks
- ✅ `src/types/` - All TypeScript types
- ✅ `public/` - All static assets
- ✅ Supabase configuration
- ✅ EmailJS configuration
- ✅ All business logic

## 📝 Next Steps

1. Install dependencies: `npm install`
2. Create remaining page files in `app/` directory
3. Update all `Link` components from `to` to `href`
4. Add `'use client'` directive where needed
5. Test all routes
6. Run build: `npm run build`
7. Test production build: `npm start`

## 🚀 Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## ⚠️ Important Notes

- **Backend logic**: ZERO changes to `src/lib/` files
- **Components**: Can be used as-is, just update imports
- **Routing**: Automatic based on folder structure
- **SEO**: Better with Next.js metadata API
- **Performance**: Improved with automatic code splitting
