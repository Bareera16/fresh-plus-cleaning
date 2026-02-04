import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get an Instant Quote",
  description: "Get a fast and accurate cleaning quote for your home or office in Melbourne today.",
  alternates: {
    canonical: "/get-quote",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
