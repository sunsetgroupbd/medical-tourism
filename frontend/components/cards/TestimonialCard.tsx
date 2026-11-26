import React from "react";
import { Testimonial } from "@/types";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  locale: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  locale,
}) => {
  const isBn = locale === "bn";
  const name = isBn ? testimonial.patientNameBn : testimonial.patientName;
  const treatment = isBn ? testimonial.treatmentBn : testimonial.treatment;
  const quote = isBn ? testimonial.quoteBn : testimonial.quote;

  return (
    <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 flex flex-col justify-between hover:border-[#147D78] transition-colors">
      <div>
        {/* Rating stars & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <Quote className="w-5 h-5 text-[#147D78]/30" />
        </div>

        {/* Quote text */}
        <p className="text-sm md:text-base text-[#172B3A] italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Patient info */}
      <div className="mt-6 pt-4 border-t border-[#E1E7E8]">
        <h4 className="text-sm font-bold text-[#102D46]">{name}</h4>
        <p className="text-xs font-medium text-[#147D78] mt-0.5">{treatment}</p>
        <p className="text-xs text-[#647580] mt-0.5">
          {testimonial.hospitalName}, {testimonial.destination}
        </p>
      </div>
    </div>
  );
};
