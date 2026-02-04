import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spring Deep Cleaning Checklist',
  description: 'Your room-by-room guide to transforming your home this spring with professional cleaning techniques.',
  alternates: {
    canonical: '/blog/deep-cleaning-checklist-spring',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
