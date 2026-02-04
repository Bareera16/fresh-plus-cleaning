import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Fresh Plus Cleaning Melbourne. Professional, reliable, and committed to making your space sparkle.',
  alternates: {
    canonical: '/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
