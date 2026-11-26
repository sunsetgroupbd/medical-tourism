import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { destinationsData } from "@/mocks/data";
import { ArrowRight } from "lucide-react";

export const DestinationsSection: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("destinations");
  const isBn = locale === "bn";

  return (
    <section className="bg-white py-16 md:py-20 border-b border-[#E1E7E8]" id="destinations">
      <div className="container-custom">
        {/* Section Header with "View All" on right matching reference image */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
            {t("title")}
          </h2>
          <Link
            href="/destinations"
            className="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-md border border-[#102D46] text-[#102D46] hover:bg-[#F3F6F5] transition-colors"
          >
            {t("viewAllDestinations")}
          </Link>
        </div>

        {/* 6 destinations grid matching reference image */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinationsData.map((dest) => {
            const name = isBn ? dest.nameBn : dest.name;
            return (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group bg-white border border-[#E1E7E8] rounded-lg overflow-hidden flex flex-col hover:border-[#147D78] transition-all"
              >
                <div className="relative h-28 sm:h-32 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors">
                    {name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#647580] group-hover:text-[#147D78] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
