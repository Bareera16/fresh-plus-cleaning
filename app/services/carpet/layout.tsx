import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Carpet Cleaning Melbourne",
  description: "Deep steam carpet cleaning to remove stains, allergens, and bacteria from your Melbourne home.",
  alternates: {
    canonical: "/services/carpet",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
