import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "High Pressure Washing Melbourne",
  description: "Driveway, patio, and exterior surface cleaning with high-pressure washing across Melbourne.",
  alternates: {
    canonical: "/services/pressure-washing",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
