import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog/commercial-cleaning-productivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
