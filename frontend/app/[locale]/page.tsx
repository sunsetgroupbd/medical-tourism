import React from "react";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { FeaturedHospitalsSection } from "@/components/home/FeaturedHospitalsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Indicators */}
      <TrustIndicators />

      {/* 3. Five-Step How It Works */}
      <HowItWorksSection locale={locale} />

      {/* 4. Six International Destinations Preview */}
      <DestinationsSection locale={locale} />

      {/* 5. Medical Specialties Preview */}
      <SpecialtiesSection locale={locale} />

      {/* 6. Why Choose Sun Breeze Healthcare (Editorial) */}
      <WhyChooseSection />

      {/* 7. Verified Partner Hospitals (Strict verification filtering) */}
      <FeaturedHospitalsSection locale={locale} />

      {/* 8. Patient Testimonials (Clearly labeled demo content) */}
      <TestimonialsSection locale={locale} />

      {/* 9. Accessible FAQ Accordion */}
      <FAQSection locale={locale} />

      {/* 10. Final Conversion CTA Section */}
      <FinalCTASection />
    </div>
  );
}
