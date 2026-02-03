import Navbar from "./components/navbar";
import HeroSlider from "./components/hero-slider";
import WhyChooseUs from "./components/why-choose-us";
import ProfessionalServices from "./components/professional-services";
import StatsParallax from "./components/stats-parallax";
import CtaParallax from "./components/cta-parallax";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />
      <WhyChooseUs />
       <StatsParallax />
      <ProfessionalServices />
      <CtaParallax/>
  

      
    </main>
  );
}