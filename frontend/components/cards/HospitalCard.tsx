import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Hospital } from "@/types";
import { Button } from "../ui/Button";
import { MapPin, Award, ArrowRight } from "lucide-react";

interface HospitalCardProps {
  hospital: Hospital;
  locale: string;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  locale,
}) => {
  // STRICT BUSINESS RULE: Hospital MUST be verified
  if (!hospital.verified) {
    return null;
  }

  const isBn = locale === "bn";
  const description = isBn ? hospital.descriptionBn : hospital.description;

  return (
    <div className="group bg-white border border-[#E1E7E8] rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:border-[#147D78]">
      {/* Hospital Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-3 left-3 bg-[#102D46]/95 backdrop-blur-none text-white text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-white/80" />
          <span>{hospital.city}, {hospital.country}</span>
        </div>
      </div>

      {/* Hospital Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors leading-snug">
            <Link href={`/hospitals/${hospital.slug}`}>
              {hospital.name}
            </Link>
          </h3>

          <p className="mt-2 text-sm text-[#647580] leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Accreditations */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            {hospital.accreditations.map((acc) => (
              <span
                key={acc}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F3F6F5] text-[#172B3A] px-2 py-0.5 rounded border border-[#E1E7E8]"
              >
                <Award className="w-3 h-3 text-[#147D78]" />
                {acc}
              </span>
            ))}
          </div>

          {/* Specialty tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hospital.specialties.map((spec) => (
              <span
                key={spec}
                className="text-xs text-[#172B3A] bg-white border border-[#E1E7E8] px-2 py-0.5 rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 pt-4 border-t border-[#E1E7E8] flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#647580] block font-semibold">
              {isBn ? "চিকিৎসা কোটেশন" : "Treatment Pricing"}
            </span>
            <span className="text-xs font-semibold text-[#147D78]">
              {hospital.startingPrice || (isBn ? "কোটেশনের জন্য যোগাযোগ করুন" : "Contact us for quotation")}
            </span>
          </div>

          <Button href={`/hospitals/${hospital.slug}`} variant="outline" size="sm">
            {isBn ? "বিস্তারিত দেখুন" : "View Details"}
          </Button>
        </div>
      </div>
    </div>
  );
};
