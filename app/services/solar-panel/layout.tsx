import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/solar-panel',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
