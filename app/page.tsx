import Navbar from "@/components/home/navbar";
import HeroSlider from "@/components/home/hero-slider";
import WhyChooseUs from "@/components/home/why-choose-us";
import ProfessionalServices from "@/components/home/professional-services";
import StatsParallax from "@/components/home/stats-parallax";
import CtaParallax from "@/components/home/cta-parallax";
import Footer from "@/components/home/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <h1 className="sr-only">Fresh Plus Cleaning Melbourne - Professional House, Office & Commercial Cleaning Services</h1>
            <Navbar />
            <HeroSlider />
            <WhyChooseUs />
            <StatsParallax />
            <ProfessionalServices />
            <CtaParallax />
            <Footer />
        </main>
    );
}
