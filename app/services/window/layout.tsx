import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/window',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
