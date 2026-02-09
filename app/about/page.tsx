import type { Metadata } from 'next';
import AboutPageContent from "@/src/components/home/about-page-content";
import Navbar from "@/src/components/home/navbar";
import Footer from "@/src/components/home/footer";

export const metadata: Metadata = {
    title: "About Fresh Plus Cleaning Melbourne | 12+ Years of Excellence",
    description: "Melbourne's most trusted cleaning service since 2012. Professional, reliable, eco-friendly cleaning for homes and businesses across Melbourne. Meet our team.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <AboutPageContent />
            <Footer />
        </div>
    );
}
