import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/SectionHeading";
import {
  UserCheck2,
  ShieldCheck,
  FileSpreadsheet,
  Plane,
  HeartPulse,
} from "lucide-react";

export const WhyChooseSection: React.FC = () => {
  const t = useTranslations("whyChoose");

  const pillars = [
    {
      title: t("feature1Title"),
      desc: t("feature1Desc"),
      icon: UserCheck2,
    },
    {
      title: t("feature2Title"),
      desc: t("feature2Desc"),
      icon: ShieldCheck,
    },
    {
      title: t("feature3Title"),
      desc: t("feature3Desc"),
      icon: FileSpreadsheet,
    },
    {
      title: t("feature4Title"),
      desc: t("feature4Desc"),
      icon: Plane,
    },
    {
      title: t("feature5Title"),
      desc: t("feature5Desc"),
      icon: HeartPulse,
    },
  ];

  return (
    <section className="relative bg-[#102D46] text-white py-16 md:py-24 border-b border-[#183F5B] overflow-hidden" id="why-sun-breeze">
      {/* Solid architectural SVG shapes (strictly solid geometric polygons, no lines/outlines) */}
      <svg
        className="absolute right-0 top-0 w-96 h-96 pointer-events-none hidden md:block"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="60,0 300,0 300,240" fill="#183F5B" />
        <polygon points="180,0 300,0 300,120" fill="#105F5B" />
      </svg>
      <svg
        className="absolute left-0 bottom-0 w-80 h-80 pointer-events-none hidden md:block"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="0,60 0,300 240,300" fill="#183F5B" />
        <polygon points="0,180 0,300 120,300" fill="#105F5B" />
      </svg>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          theme="dark"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#183F5B]/60 border border-white/10 rounded-lg p-6 flex flex-col justify-between hover:border-[#147D78] transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-md bg-[#147D78] text-white flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {pillar.desc}
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
