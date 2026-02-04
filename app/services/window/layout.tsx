import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Window Cleaning Services Melbourne",
  description: "Sparkling streak-free windows for your home or office. Professional window cleaning in Melbourne.",
  alternates: {
    canonical: "/services/window",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
