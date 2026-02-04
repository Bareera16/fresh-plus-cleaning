import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog/deep-cleaning-checklist-spring',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
