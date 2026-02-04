import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solar Panel Cleaning Melbourne',
  description: 'Maximize your energy production with professional solar panel cleaning in the Melbourne area.',
  alternates: {
    canonical: '/services/solar-panel',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
