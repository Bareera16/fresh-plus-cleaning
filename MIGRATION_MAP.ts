// Migration Helper Script
// This documents the page migration mapping from Vite to Next.js

/*
VITE STRUCTURE -> NEXT.JS STRUCTURE

src/pages/Index.tsx -> app/page.tsx ✅
src/pages/About.tsx -> app/about/page.tsx
src/pages/Contact.tsx -> app/contact/page.tsx
src/pages/Blog.tsx -> app/blog/page.tsx
src/pages/BlogPost.tsx -> app/blog/[slug]/page.tsx
src/pages/Book.tsx -> app/book/page.tsx
src/pages/InstantQuote.tsx -> app/get-quote/page.tsx
src/pages/ThankYou.tsx -> app/thank-you/page.tsx
src/pages/PrivacyPolicy.tsx -> app/privacy-policy/page.tsx
src/pages/TermsOfService.tsx -> app/terms-of-service/page.tsx
src/pages/LicensedInsured.tsx -> app/licensed-insured/page.tsx

SERVICES:
src/pages/Services.tsx -> app/services/[service]/page.tsx
src/pages/EndOfLeaseCleaning.tsx -> app/services/end-of-lease/page.tsx
src/pages/TileGroutCleaning.tsx -> app/services/tile-grout/page.tsx
src/pages/CarpetCleaning.tsx -> app/services/carpet/page.tsx
src/pages/ResidentialCleaning.tsx -> app/services/residential/page.tsx
src/pages/CommercialCleaning.tsx -> app/services/commercial/page.tsx
src/pages/DeepCleaning.tsx -> app/services/deep-cleaning/page.tsx
src/pages/SolarPanelCleaning.tsx -> app/services/solar-panel/page.tsx
src/pages/PressureWashing.tsx -> app/services/pressure-washing/page.tsx

LANDING PAGES:
src/pages/PressureWashingLanding.tsx -> app/pressure-washing/page.tsx
src/pages/TileGroutCleaningLanding.tsx -> app/tile-grout/page.tsx
src/pages/EndOfLeaseCleaningLanding.tsx -> app/end-of-lease/page.tsx

ADMIN PAGES:
src/pages/admin/v2/LoginPage.tsx -> app/admin/login/page.tsx
src/pages/admin/v2/DashboardPage.tsx -> app/admin/dashboard/page.tsx
src/pages/admin/v2/BookingsPage.tsx -> app/admin/instant-bookings/page.tsx
src/pages/admin/v2/BookingDetailPage.tsx -> app/admin/booking/[id]/page.tsx
src/pages/admin/v2/CleanersPage.tsx -> app/admin/cleaners/page.tsx
src/pages/admin/v2/CleanerDetailPage.tsx -> app/admin/cleaner/[id]/page.tsx
src/pages/admin/v2/CustomersPage.tsx -> app/admin/customers/page.tsx
src/pages/admin/v2/CustomerDetailPage.tsx -> app/admin/customer/[id]/page.tsx
src/pages/admin/v2/AnalyticsPage.tsx -> app/admin/analytics/page.tsx
src/pages/admin/v2/SettingsPage.tsx -> app/admin/settings/page.tsx
src/pages/QuotesList.tsx -> app/admin/quotes-list/page.tsx
src/pages/SimpleAdmin.tsx -> app/admin/simple/page.tsx

IMPORTANT NOTES:
- All components in src/components/ remain unchanged
- All lib files in src/lib/ remain unchanged (backend logic preserved)
- All hooks in src/hooks/ remain unchanged
- Only routing structure changes, no business logic changes
*/

export { };
