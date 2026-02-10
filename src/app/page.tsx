import Navbar from "@/src/components/home/navbar";
import HeroSlider from "@/src/components/home/hero-slider";
import WhyChooseUs from "@/src/components/home/why-choose-us";
import ProfessionalServices from "@/src/components/home/professional-services";
import StatsParallax from "@/src/components/home/stats-parallax";
import CtaParallax from "@/src/components/home/cta-parallax";
import Footer from "@/src/components/home/footer";

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
