import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Stethoscope, Microscope, Scale, Globe2 } from "lucide-react";

interface MedicalTourismPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: MedicalTourismPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "medicalTourismPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function MedicalTourismPage({
  params,
}: MedicalTourismPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "medicalTourismPage" });

  const benefits = [
    {
      num: "01",
      title: t("benefit1Title"),
      desc: t("benefit1Desc"),
      icon: Stethoscope,
    },
    {
      num: "02",
      title: t("benefit2Title"),
      desc: t("benefit2Desc"),
      icon: Microscope,
    },
    {
      num: "03",
      title: t("benefit3Title"),
      desc: t("benefit3Desc"),
      icon: Scale,
    },
    {
      num: "04",
      title: t("benefit4Title"),
      desc: t("benefit4Desc"),
      icon: Globe2,
    },
  ];

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="bg-white border border-[#E1E7E8] rounded-lg overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#147D78] bg-[#147D78]/10 px-3 py-1 rounded">
                  <span>{t("eyebrow")}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172B3A] tracking-tight leading-tight">
                  {t("title")}
                </h1>
                <p className="text-base text-[#647580] leading-relaxed">
                  {t("subtitle")}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Button href={`/${locale}/inquiry`} variant="teal" size="md">
                  {locale === "bn" ? "ফ্রি কেস রিভিউ নিন" : "Request Free Case Review"}
                </Button>
                <Button href={`/${locale}/destinations`} variant="outline" size="md">
                  {locale === "bn" ? "গন্তব্যসমূহ দেখুন" : "Explore Destinations"}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#102D46]">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                alt="International Healthcare"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Why Cross-Border Care */}
        <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 space-y-8 shadow-2xs">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-bold text-[#172B3A]">
              {t("whyCrossBorderTitle")}
            </h2>
            <p className="text-sm text-[#647580] leading-relaxed">
              {t("whyCrossBorderDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.num}
                  className="p-5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-3 hover:border-[#147D78] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#147D78] bg-[#147D78]/10 px-2 py-0.5 rounded">
                      {b.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#147D78]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#172B3A] leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#647580] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Destinations Overview Quick Links */}
        <div className="bg-[#102D46] text-white rounded-lg p-8 lg:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold max-w-2xl mx-auto">
            {locale === "bn"
              ? "চীন, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, তুরস্ক ও ভারতের শীর্ষ হাসপাতাল"
              : "Direct Partnerships with Accredited Hospitals Across Asia & Europe"}
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            {locale === "bn"
              ? "জরুরি কার্ডিয়াক সার্জারি থেকে শুরু করে ক্যানসার অনকোলজি ও অঙ্গ প্রতিস্থাপন—প্রতিটি রোগের জন্য সঠিক হাসপাতাল নির্বাচনে আমরা আছি আপনার পাশে।"
              : "From robotic surgery to advanced organ transplantation, receive authentic clinical guidance tailored to your medical history."}
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button href={`/${locale}/destinations`} variant="teal" size="md">
              {locale === "bn" ? "সকল গন্তব্য দেখুন" : "View All Destinations"}
            </Button>
            <Button href={`/${locale}/hospitals`} variant="outline" size="md" className="text-white border-white/50 hover:bg-white/10">
              {locale === "bn" ? "যাচাইকৃত হাসপাতালসমূহ" : "Verified Hospitals"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
