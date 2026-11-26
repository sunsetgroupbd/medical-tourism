import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Globe, Users, Headphones } from "lucide-react";

export const TrustIndicators: React.FC = () => {
  const t = useTranslations("trustIndicators");

  const indicators = [
    {
      title: t("verifiedHospitalNetwork"),
      desc: t("verifiedDesc"),
      icon: ShieldCheck,
    },
    {
      title: t("internationalDestinations"),
      desc: t("destinationsDesc"),
      icon: Globe,
    },
    {
      title: t("dedicatedCoordination"),
      desc: t("coordinationDesc"),
      icon: Users,
    },
    {
      title: t("endToEndSupport"),
      desc: t("supportDesc"),
      icon: Headphones,
    },
  ];

  return (
    <section className="relative bg-[#0d253a] text-white border-t-2 border-[#147D78] border-b border-[#183F5B] py-8 md:py-10 overflow-hidden">
      {/* Solid architectural SVG shapes (strictly solid geometry, no lines/outlines) */}
      <svg
        className="absolute left-0 top-0 h-full w-48 pointer-events-none hidden sm:block"
        viewBox="0 0 160 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="0,0 160,0 60,120 0,120" fill="#183F5B" />
        <polygon points="0,0 70,0 0,90" fill="#105F5B" />
      </svg>
      <svg
        className="absolute right-0 top-0 h-full w-48 pointer-events-none hidden sm:block"
        viewBox="0 0 160 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="100,0 160,0 160,120 0,120" fill="#183F5B" />
        <polygon points="120,0 160,0 160,60" fill="#147D78" />
      </svg>

      <div className="container-custom relative z-10">
        {/* Mobile 2x2 cardview grid with compact scaling */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {indicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 p-2.5 sm:p-3 rounded-lg bg-white/5 sm:bg-transparent border border-white/10 sm:border-transparent"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#147D78] text-white flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-white/75 leading-normal sm:leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
