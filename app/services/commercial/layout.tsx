import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/commercial',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
