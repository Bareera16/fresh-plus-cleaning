import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Cleaning Services",
  description: "Explore our full range of professional cleaning services in Melbourne, from residential to commercial.",
  alternates: {
    canonical: "/services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
