import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/get-quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
