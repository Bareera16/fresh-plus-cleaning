import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/end-of-lease',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
