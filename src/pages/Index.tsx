import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AiAssistantSection from "@/components/AiAssistantSection";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <AiAssistantSection />
    <MissionSection />
    <Footer />
  </div>
);

export default Index;
