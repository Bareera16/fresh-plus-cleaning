import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog/tile-grout-restoration-guide',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
