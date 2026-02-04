import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Carpet Cleaning vs DIY',
  description: 'Everything you need to know about professional carpet cleaning in Melbourne vs doing it yourself.',
  alternates: {
    canonical: '/blog/carpet-cleaning-guide-melbourne',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
