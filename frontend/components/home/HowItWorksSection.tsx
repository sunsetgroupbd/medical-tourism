import React from "react";
import { useTranslations } from "next-intl";
import { howItWorksSteps } from "@/mocks/data";
import {
  FileText,
  SearchCheck,
  Building2,
  PlaneTakeoff,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export const HowItWorksSection: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("howItWorks");
  const isBn = locale === "bn";

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-white";
    switch (iconName) {
      case "FileText":
        return <FileText className={iconClass} />;
      case "SearchCheck":
        return <SearchCheck className={iconClass} />;
      case "Building2":
        return <Building2 className={iconClass} />;
      case "PlaneTakeoff":
        return <PlaneTakeoff className={iconClass} />;
      case "UserCheck":
        return <HeartHandshake className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  return (
    <section className="relative bg-white py-16 md:py-20 border-b border-[#E1E7E8] overflow-hidden" id="how-it-works">
      {/* Solid architectural corner facets (strictly solid geometry, no lines/outlines) */}
      <svg
        className="absolute left-0 top-0 w-80 h-80 pointer-events-none hidden sm:block"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="0,0 300,0 0,220" fill="#F3F6F5" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 w-80 h-80 pointer-events-none hidden sm:block"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="80,300 300,100 300,300" fill="#F3F6F5" />
      </svg>

      <div className="container-custom relative z-10">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#102D46] tracking-tight">
            {t("title")}
          </h2>
        </div>

        {/* 5-step horizontal progression with arrows matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {howItWorksSteps.map((stepItem, index) => {
            const isLast = index === howItWorksSteps.length - 1;
            const title = isBn ? stepItem.titleBn : stepItem.title;
            const desc = isBn ? stepItem.descBn : stepItem.desc;

            return (
              <div
                key={stepItem.step}
                className="relative flex flex-col items-center text-center p-4"
              >
                {/* Connecting arrow on desktop */}
                {!isLast && (
                  <div className="hidden md:block absolute top-7 -right-3 text-[#147D78] z-10">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Numbered Teal Circle Icon */}
                <div className="w-14 h-14 rounded-full bg-[#147D78] flex items-center justify-center mb-4 shrink-0 shadow-none">
                  {getIcon(stepItem.iconName)}
                </div>

                <span className="text-xs font-bold text-[#102D46] mb-1">
                  0{stepItem.step}
                </span>

                <h3 className="text-sm font-bold text-[#102D46] mb-2 leading-snug">
                  {title}
                </h3>

                <p className="text-xs text-[#647580] leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
