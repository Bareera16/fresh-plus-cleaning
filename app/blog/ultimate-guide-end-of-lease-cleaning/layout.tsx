import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog/ultimate-guide-end-of-lease-cleaning',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
