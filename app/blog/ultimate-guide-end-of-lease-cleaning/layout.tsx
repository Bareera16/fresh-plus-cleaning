import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultimate End of Lease Cleaning Guide',
  description: 'Ensure you get your bond back with our detailed Melbourne end of lease cleaning checklist.',
  alternates: {
    canonical: '/blog/ultimate-guide-end-of-lease-cleaning',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
