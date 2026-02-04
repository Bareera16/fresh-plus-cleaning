import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tile and Grout Restoration Guide",
  description: "From dingy to sparkling: a comprehensive guide to restoring your tile surfaces at home.",
  alternates: {
    canonical: "/blog/tile-grout-restoration-guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
