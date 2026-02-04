import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cleaning Cost Calculator',
  description: 'Estimate your cleaning costs with our interactive calculator for Melbourne properties.',
  alternates: {
    canonical: '/calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
