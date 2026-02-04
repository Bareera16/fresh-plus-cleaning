import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Commercial Office Cleaning Melbourne",
  description: "Professional cleaning solutions for Melbourne businesses, offices, and commercial spaces.",
  alternates: {
    canonical: "/services/commercial",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
