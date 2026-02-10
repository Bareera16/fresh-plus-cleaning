import type { Metadata } from 'next';
import ContactPageContent from "@/components/home/contact-page-content";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
    title: "Contact Fresh Plus Cleaning Melbourne | Book Your Service Today",
    description: "Get in touch with Fresh Plus Cleaning. Melbourne's trusted team for home and commercial cleaning. Call 0403 971 720 or request a free quote.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <ContactPageContent />
            <Footer />
        </div>
    );
}
