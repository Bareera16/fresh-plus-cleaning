import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deep Cleaning Services Melbourne',
  description: 'Intensive deep cleaning solutions for homes and offices that need extra care and attention.',
  alternates: {
    canonical: '/services/deep-cleaning',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
