/*
 * Home Page — Rolll Agency
 * Design: Dark Premium Agency — Editorial Boldness
 * Sections: Navbar > Hero > About > Mission > Services > CTA > Contact > Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ServicesSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
