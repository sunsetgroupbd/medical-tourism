import React from "react";
import { useTranslations } from "next-intl";
import { demoTestimonials } from "@/mocks/data";
import { TestimonialCard } from "../cards/TestimonialCard";
import { SectionHeading } from "../ui/SectionHeading";

export const TestimonialsSection: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-[#F3F6F5] py-16 md:py-20 border-b border-[#E1E7E8]" id="testimonials">
      <div className="container-custom">
        <div className="mb-12">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoTestimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              testimonial={item}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
