import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fresh-plus-cleaning.vercel.app"),
  title: {
    default: "Fresh Plus Cleaning | Professional Home & Office Cleaning Melbourne",
    template: "%s | Fresh Plus Cleaning"
  },
  description: "Melbourne's most reliable professional cleaning services for homes and offices. Stable crews, eco-friendly products, and sparkling results guaranteed.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}