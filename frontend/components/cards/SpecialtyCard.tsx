import React from "react";
import { Link } from "@/i18n/routing";
import { Specialty } from "@/types";
import {
  HeartPulse,
  ShieldAlert,
  Activity,
  Brain,
  Bone,
  Stethoscope,
  Baby,
  ArrowRight,
} from "lucide-react";

interface SpecialtyCardProps {
  specialty: Specialty;
  locale: string;
}

export const SpecialtyCard: React.FC<SpecialtyCardProps> = ({
  specialty,
  locale,
}) => {
  const isBn = locale === "bn";
  const name = isBn ? specialty.nameBn : specialty.name;
  const summary = isBn ? specialty.summaryBn : specialty.summary;

  // Render minimal consistent line icon
  const renderIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-[#147D78]";
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className={iconClass} />;
      case "ShieldAlert":
        return <ShieldAlert className={iconClass} />;
      case "Activity":
        return <Activity className={iconClass} />;
      case "Brain":
        return <Brain className={iconClass} />;
      case "Bone":
        return <Bone className={iconClass} />;
      case "Stethoscope":
        return <Stethoscope className={iconClass} />;
      case "Baby":
        return <Baby className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  return (
    <div className="group bg-white border border-[#E1E7E8] rounded-lg p-3.5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#147D78] hover:shadow-sm">
      <div>
        {/* Minimal Icon Box */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-[#F3F6F5] border border-[#E1E7E8] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#147D78]/10 group-hover:border-[#147D78]/30 transition-colors">
          {renderIcon(specialty.iconName)}
        </div>

        <h3 className="text-sm sm:text-lg font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors leading-snug">
          {name}
        </h3>

        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#647580] leading-relaxed line-clamp-2 sm:line-clamp-3">
          {summary}
        </p>

        {/* Common Key Procedures (hidden on mobile 2-col to maintain compact height) */}
        <ul className="mt-3 sm:mt-4 space-y-1 text-xs text-[#172B3A] hidden sm:block">
          {specialty.keyProcedures.map((proc) => (
            <li key={proc} className="flex items-center gap-1.5 text-xs text-[#647580]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#147D78]"></span>
              {proc}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-4 border-t border-[#E1E7E8] flex items-center justify-between">
        <Link
          href={`/specialties/${specialty.slug}`}
          className="text-[11px] sm:text-xs font-semibold text-[#102D46] group-hover:text-[#147D78] flex items-center gap-1 transition-colors"
        >
          <span>{isBn ? "বিস্তারিত" : "View Details"}</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
