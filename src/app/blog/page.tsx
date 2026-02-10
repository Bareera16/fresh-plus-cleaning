import type { Metadata } from 'next';
import BlogPageContent from "@/components/home/blog-page-content";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides Blog | Fresh Plus Cleaning Melbourne",
  description: "Expert cleaning advice, industry insights, and professional tips from Melbourne's trusted cleaning specialists. Learn from 12+ years of experience.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogPageContent />
      <Footer />
    </div>
  );
}
