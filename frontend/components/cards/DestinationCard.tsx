import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Destination } from "@/types";
import { ArrowRight, Plane } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
  locale: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  locale,
}) => {
  const isBn = locale === "bn";
  const name = isBn ? destination.nameBn : destination.name;
  const summary = isBn ? destination.summaryBn : destination.summary;

  return (
    <div className="group bg-white border border-[#E1E7E8] rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:border-[#147D78]">
      {/* Photographic Header with Next Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
        <Image
          src={destination.image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-[#102D46] text-white text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded">
          {destination.code}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#147D78] uppercase tracking-wider mb-1.5">
            <Plane className="w-3.5 h-3.5" />
            <span>{destination.flightDurationFromDhaka}</span>
          </div>

          <h3 className="text-xl font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors">
            {name}
          </h3>

          <p className="mt-2 text-sm text-[#647580] leading-relaxed line-clamp-3">
            {summary}
          </p>

          {/* Specialties Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destination.popularSpecialties.slice(0, 2).map((spec) => (
              <span
                key={spec}
                className="text-xs bg-[#F3F6F5] text-[#172B3A] px-2 py-0.5 rounded border border-[#E1E7E8]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Link / CTA */}
        <div className="mt-5 pt-4 border-t border-[#E1E7E8] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#102D46] group-hover:text-[#147D78] flex items-center gap-1.5 transition-colors">
            {isBn ? "বিস্তারিত দেখুন" : "Explore Destination"}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-xs text-[#647580]">
            {destination.verifiedHospitalsCount}+ {isBn ? "হাসপাতাল" : "Hospitals"}
          </span>
        </div>
      </div>
    </div>
  );
};
