import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog/solar-panel-cleaning-efficiency',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
