import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import InquiryForm from "@/components/InquiryForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { CircuitDivider, RoboticDivider, ChipDivider } from "@/components/SceneDividers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <Suspense fallback={null}><CircuitDivider /></Suspense>
      <ServicesSection />
      <Suspense fallback={null}><RoboticDivider /></Suspense>
      <WhyChooseUs />
      <ProcessSection />
      <Suspense fallback={null}><ChipDivider /></Suspense>
      <PortfolioSection />
      <CTASection />
      <InquiryForm />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
