import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cleaning Blog",
  description: "Expert cleaning tips, guides, and industry insights from Melbourne's professional cleaning team.",
  alternates: {
    canonical: "/blog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
