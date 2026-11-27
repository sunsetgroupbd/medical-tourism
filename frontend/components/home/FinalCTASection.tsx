import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import { ArrowRight, PhoneCall } from "lucide-react";

export const FinalCTASection: React.FC = () => {
  const t = useTranslations("cta");
  const tCommon = useTranslations("common");

  return (
    <section className="relative bg-[#102D46] text-white py-16 md:py-20 border-b border-[#183F5B] overflow-hidden">
      {/* Minimal architectural SVG shape - single green shape */}
      <svg
        className="absolute right-0 bottom-0 h-full w-2/5 pointer-events-none hidden sm:block"
        viewBox="0 0 300 150"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon points="170,150 300,40 300,150" fill="#147D78" />
      </svg>

      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {t("title")}
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/inquiry" variant="teal" size="lg" className="w-full sm:w-auto">
            {t("primaryButton")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10 hover:text-white">
            <PhoneCall className="w-4 h-4 mr-2 text-emerald-300" />
            {tCommon("phone")}
          </Button>
        </div>

        <p className="text-xs text-white/60 pt-2">
          {t("callText")} {tCommon("phone")} • {tCommon("email")}
        </p>
      </div>
    </section>
  );
};
