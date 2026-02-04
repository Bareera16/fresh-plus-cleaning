import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/services/deep-cleaning',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
