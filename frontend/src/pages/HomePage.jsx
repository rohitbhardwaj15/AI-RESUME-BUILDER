import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import ContactSection from "../components/landing/ContactSection";

const HomePage = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      <Navbar variant="light" />

      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default HomePage;