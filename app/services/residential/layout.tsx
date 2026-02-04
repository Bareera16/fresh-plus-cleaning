import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Residential House Cleaning Melbourne",
  description: "Reliable and high-quality home cleaning services tailored to your Melbourne lifestyle.",
  alternates: {
    canonical: "/services/residential",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
