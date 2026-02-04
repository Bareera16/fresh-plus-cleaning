import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solar Panel Cleaning Efficiency Guide',
  description: 'Learn how regular solar panel cleaning can boost your energy output by up to 25%.',
  alternates: {
    canonical: '/blog/solar-panel-cleaning-efficiency',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
