import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Lock } from "lucide-react";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Breadcrumb & Introduction */}
        <div className="relative bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs space-y-4 overflow-hidden">
          {/* Solid architectural corner facet */}
          <svg
            className="absolute right-0 top-0 w-64 h-64 pointer-events-none hidden sm:block"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            fill="none"
          >
            <polygon points="70,0 200,0 200,130" fill="#F3F6F5" />
          </svg>
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#147D78] bg-[#147D78]/10 px-3 py-1 rounded">
              <span>{t("eyebrow")}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-[#172B3A] tracking-tight">
              {t("title")}
            </h1>

            <p className="text-base text-[#647580] leading-relaxed max-w-3xl">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* 2-Column Contact Info and Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-7 space-y-6">
            {/* Gulshan Office Card */}
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-[#102D46] text-white flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172B3A]">
                    {t("officeTitle")}
                  </h3>
                  <p className="text-xs text-[#647580]">
                    Headquarters & Patient Reception Desk
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#172B3A] font-medium leading-relaxed pl-1">
                {t("officeAddress")}
              </p>

              <div className="p-3 bg-[#F3F6F5] rounded border border-[#E1E7E8] text-xs space-y-1">
                <span className="font-semibold text-[#102D46] uppercase text-[10px] block">
                  {t("officeHoursTitle")}
                </span>
                <p className="text-[#647580]">
                  {t("officeHours")}
                </p>
              </div>
            </div>

            {/* Direct Hotlines & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2 shadow-2xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#147D78] block">
                  {t("hotlineTitle")}
                </span>
                <div className="text-base font-bold font-mono text-[#102D46]">
                  +880 1730 000000
                </div>
                <div className="text-sm font-bold font-mono text-[#647580]">
                  +880 1711 000000
                </div>
                <p className="text-[11px] text-[#647580] pt-1">
                  24/7 Emergency Medical Inquiries
                </p>
              </div>

              <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2 shadow-2xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#247A52] block">
                  {t("whatsappTitle")}
                </span>
                <div className="text-base font-bold font-mono text-[#102D46]">
                  +880 1730 000000
                </div>
                <p className="text-[11px] text-[#647580]">
                  {t("whatsappDesc")}
                </p>
                <div className="pt-2">
                  <Button
                    href="https://wa.me/8801730000000?text=Hello%20Sun%20Breeze%20Healthcare,%20I%20would%20like%20to%20inquire%20about%20medical%20treatment%20abroad."
                    variant="teal"
                    size="sm"
                    className="w-full text-xs"
                  >
                    Open WhatsApp Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2 shadow-2xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#647580] block">
                {t("emailTitle")}
              </span>
              <div className="text-base font-bold font-mono text-[#102D46]">
                {t("email")}
              </div>
              <p className="text-xs text-[#647580]">
                Diagnostic files and formal inquiries: response within 2 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Case Review Direct Access Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#102D46] text-white rounded-lg p-6 lg:p-8 space-y-5">
              <Badge variant="teal" size="sm">
                No Login Required
              </Badge>

              <h3 className="text-xl font-bold leading-snug">
                {locale === "bn"
                  ? "দ্রুততম উপায়ে বিশেষজ্ঞ চিকিৎসকের মতামত ও কোটেশন চান?"
                  : "Need an Official Specialist Opinion & Quotation?"}
              </h3>

              <p className="text-xs text-white/80 leading-relaxed">
                {locale === "bn"
                  ? "আমাদের অনলাইন সুরক্ষিত ইনকোয়ারি পোর্টালে আপনার টেস্ট রিপোর্ট আপলোড করুন। ২৪ থেকে ৪৮ ঘণ্টার মধ্যে সংশ্লিষ্ট আন্তর্জাতিক হাসপাতাল থেকে কোটেশন সংগ্রহ করে দেওয়া হবে।"
                  : "Submit your latest diagnostic records via our secure online intake. Receive preliminary physician evaluation and direct hospital quotations within 24 to 48 hours."}
              </p>

              <div className="space-y-2 pt-2">
                <Button
                  href={`/${locale}/inquiry`}
                  variant="teal"
                  size="md"
                  className="w-full"
                >
                  {locale === "bn" ? "ফ্রি কেস রিভিউ ফর্ম পূরণ করুন" : "Start Free Case Review"}
                </Button>

                <Button
                  href={`/${locale}/portal`}
                  variant="outline"
                  size="md"
                  className="w-full text-white border-white/40 hover:bg-white/10"
                >
                  {locale === "bn" ? "বিদ্যমান কেস ট্র্যাক করুন" : "Track Existing Case"}
                </Button>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-white/60 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-white/70" />
                <span>256-bit SSL encrypted • Zero agency markups</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
