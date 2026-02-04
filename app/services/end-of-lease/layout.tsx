import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "End of Lease Cleaning Melbourne",
  description: "Guaranteed bond back cleaning services. Professional, reliable, and thorough end of lease cleans.",
  alternates: {
    canonical: "/services/end-of-lease",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
