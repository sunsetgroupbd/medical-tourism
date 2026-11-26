import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isBn = locale === "bn";

  const destinations = isBn
    ? [
        { href: "/destinations/thailand", label: "থাইল্যান্ড (ব্যাংকক)" },
        { href: "/destinations/singapore", label: "সিঙ্গাপুর" },
        { href: "/destinations/malaysia", label: "মালয়েশিয়া (কুয়ালালামপুর)" },
        { href: "/destinations/india", label: "ভারত (দিল্লি / চেন্নাই)" },
        { href: "/destinations/turkey", label: "তুরস্ক (ইস্তাম্বুল)" },
        { href: "/destinations/china", label: "চীন (বেইজিং)" },
      ]
    : [
        { href: "/destinations/thailand", label: "Thailand (Bangkok)" },
        { href: "/destinations/singapore", label: "Singapore" },
        { href: "/destinations/malaysia", label: "Malaysia (Kuala Lumpur)" },
        { href: "/destinations/india", label: "India (Delhi / Chennai)" },
        { href: "/destinations/turkey", label: "Turkey (Istanbul)" },
        { href: "/destinations/china", label: "China (Beijing)" },
      ];

  const specialties = isBn
    ? [
        { href: "/specialties/cardiac-care", label: "কার্ডিয়াক কেয়ার ও বাইপাস" },
        { href: "/specialties/cancer-treatment", label: "ক্যান্সার ও ইমিউনোথেরাপি" },
        { href: "/specialties/kidney-care", label: "কিডনি প্রতিস্থাপন ও কেয়ার" },
        { href: "/specialties/neurology", label: "নিউরোলজি ও ব্রেন সার্জারি" },
        { href: "/specialties/orthopaedics", label: "রোবোটিক জয়েন্ট রিপ্লেসমেন্ট" },
        { href: "/specialties/liver-care", label: "লিভার ট্রান্সপ্লান্ট ও কেয়ার" },
        { href: "/specialties/ivf-fertility", label: "আইভিএফ ও বন্ধ্যাত্ব চিকিৎসা" },
      ]
    : [
        { href: "/specialties/cardiac-care", label: "Cardiac Care & Bypass" },
        { href: "/specialties/cancer-treatment", label: "Cancer & Immunotherapy" },
        { href: "/specialties/kidney-care", label: "Kidney Transplantation" },
        { href: "/specialties/neurology", label: "Neurology & Brain Surgery" },
        { href: "/specialties/orthopaedics", label: "Robotic Joint Replacement" },
        { href: "/specialties/liver-care", label: "Living Donor Liver Care" },
        { href: "/specialties/ivf-fertility", label: "IVF & Advanced Fertility" },
      ];

  return (
    <footer className="bg-[#102D46] text-white pt-16 pb-12 border-t border-[#183F5B]">
      <div className="container-custom">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white">
                SUN BREEZE HEALTHCARE
              </span>
              <span className="text-xs text-white/70 tracking-widest uppercase mt-0.5 font-semibold">
                INTERNATIONAL MEDICAL CONCIERGE
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {t("aboutText")}
            </p>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">
              {t("destinationsTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {destinations.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="hover:text-white transition-colors">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">
              {t("specialtiesTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {specialties.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">
              {t("contactTitle")}
            </h3>
            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#147D78] shrink-0 mt-1" />
                <span>{t("headOffice")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#147D78] shrink-0" />
                <span>{tCommon("phone")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#147D78] shrink-0" />
                <span>{tCommon("email")}</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/inquiry"
                  className="inline-block text-xs font-semibold bg-[#147D78] hover:bg-[#105F5B] text-white px-3 py-1.5 rounded transition-colors"
                >
                  {tCommon("freeCaseReview")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {t("copyright")}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
