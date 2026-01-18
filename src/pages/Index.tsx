import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import OpenLearningTracksSection from "@/components/sections/OpenLearningTracksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DifferentiatorSection from "@/components/sections/DifferentiatorSection";
import BlogsSection from "@/components/sections/BlogsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OpenLearningTracksSection />
      <TestimonialsSection />
      <DifferentiatorSection />
      <BlogsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
};
export default Index;
