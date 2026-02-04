import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Clean Offices Boost Productivity',
  description: 'Discover the link between workspace cleanliness and employee performance in our latest guide.',
  alternates: {
    canonical: '/blog/commercial-cleaning-productivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
