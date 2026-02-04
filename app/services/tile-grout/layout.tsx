import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tile & Grout Cleaning Melbourne',
  description: 'Restore the shine to your floors with professional tile and grout cleaning across Melbourne.',
  alternates: {
    canonical: '/services/tile-grout',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
