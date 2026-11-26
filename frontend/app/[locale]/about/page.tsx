import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Target, ShieldCheck } from "lucide-react";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const stats = [
    { value: "8+", label: t("stat1") },
    { value: "6", label: t("stat2") },
    { value: "24/7", label: t("stat3") },
    { value: "0 BDT", label: t("stat4") },
  ];

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="relative bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-12 shadow-2xs space-y-6 overflow-hidden">
          {/* Solid architectural corner facet */}
          <svg
            className="absolute right-0 top-0 w-72 h-72 pointer-events-none hidden sm:block"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            fill="none"
          >
            <polygon points="60,0 200,0 200,140" fill="#F3F6F5" />
          </svg>
          <div className="max-w-3xl space-y-4 relative z-10">
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

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#E1E7E8]">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-[#F3F6F5] rounded-lg text-center space-y-1 border border-[#E1E7E8]">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#102D46]">
                  {s.value}
                </div>
                <div className="text-xs text-[#647580] font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#147D78]/10 text-[#147D78] flex items-center justify-center font-bold">
              <Target className="w-5 h-5 text-[#147D78]" />
            </div>
            <h2 className="text-xl font-bold text-[#172B3A]">
              {t("missionTitle")}
            </h2>
            <p className="text-sm text-[#647580] leading-relaxed">
              {t("missionDesc")}
            </p>
          </div>

          <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#102D46]/10 text-[#102D46] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#102D46]" />
            </div>
            <h2 className="text-xl font-bold text-[#172B3A]">
              {t("visionTitle")}
            </h2>
            <p className="text-sm text-[#647580] leading-relaxed">
              {t("visionDesc")}
            </p>
          </div>
        </div>

        {/* Leadership & Clinical Coordination Panel */}
        <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 space-y-8 shadow-2xs">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold text-[#172B3A]">
              {t("leadershipTitle")}
            </h2>
            <p className="text-sm text-[#647580]">
              {t("leadershipDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#E1E7E8] bg-[#102D46]/10">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
                  alt="Dr. Farhana Rahman"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-base font-bold text-[#172B3A]">
                {locale === "bn" ? "ডা. ফারহানা রহমান" : "Dr. Farhana Rahman"}
              </h3>
              <p className="text-xs text-[#147D78] font-semibold">
                {locale === "bn" ? "সিনিয়র মেডিকেল কনসিয়ার্জ ডিরেক্টর" : "Senior Medical Concierge Director"}
              </p>
              <p className="text-xs text-[#647580] leading-relaxed">
                {locale === "bn"
                  ? "আন্তর্জাতিক রোগী সহায়তা ও টারশিয়ারি কেস মূল্যায়নে ১৫ বছরের ক্লিনিক্যাল অভিজ্ঞতা।"
                  : "Over 15 years of experience in cross-border clinical triage and tertiary hospital case coordination."}
              </p>
            </div>

            <div className="p-5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#E1E7E8] bg-[#102D46]/10">
                <Image
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
                  alt="Dr. Tanvir Ahmed"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-base font-bold text-[#172B3A]">
                {locale === "bn" ? "ডা. তানভীর আহমেদ" : "Dr. Tanvir Ahmed"}
              </h3>
              <p className="text-xs text-[#147D78] font-semibold">
                {locale === "bn" ? "চিফ অব সার্জিক্যাল কোঅর্ডিনেশন" : "Chief of Surgical Coordination"}
              </p>
              <p className="text-xs text-[#647580] leading-relaxed">
                {locale === "bn"
                  ? "কার্ডিয়াক ও অর্গান ট্রান্সপ্লান্টেশন রোগীদের আন্তর্জাতিক প্রস্তুতি ও ফলো-আপের সমন্বয়কারী।"
                  : "Specializes in organ transplantation pathways and fast-track admission coordination for cardiac surgeries."}
              </p>
            </div>

            <div className="p-5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#E1E7E8] bg-[#102D46]/10">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                  alt="Syeda Nusrat Jahan"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-base font-bold text-[#172B3A]">
                {locale === "bn" ? "সৈয়দা নুসরাত জাহান" : "Syeda Nusrat Jahan"}
              </h3>
              <p className="text-xs text-[#147D78] font-semibold">
                {locale === "bn" ? "হেড অব পেশেন্ট রিলেশন্স ও ভিসা লজিস্টিকস" : "Head of Patient Relations & Visa Desk"}
              </p>
              <p className="text-xs text-[#647580] leading-relaxed">
                {locale === "bn"
                  ? "জরুরি মেডিকেল ভিসা ইনভিটেশন সংগ্রহ ও দূতাবাস সংশ্লিষ্ট আইনি প্রক্রিয়ার তদারক।"
                  : "Directly oversees priority embassy invitation protocols and patient attendant support services."}
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-[#102D46] text-white rounded-lg p-8 lg:p-12 text-center space-y-4">
          <h3 className="text-2xl font-bold">
            {locale === "bn"
              ? "আপনার পরিবারের চিকিৎসায় বিশ্বস্ত সঙ্গী"
              : "Dedicated to Finding the Right Care for You"}
          </h3>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            {locale === "bn"
              ? "সরাসরি কথা বলুন আমাদের সিনিয়র কেস সমন্বয়কারী দলের সাথে। বিনামূল্যে প্রাথমিক মূল্যায়ন নিন।"
              : "Speak with our clinical desk today or visit our patient concierge office in Gulshan-2, Dhaka."}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href={`/${locale}/inquiry`} variant="teal" size="md">
              {locale === "bn" ? "ফ্রি কেস রিভিউ নিন" : "Request Free Case Review"}
            </Button>
            <Button href={`/${locale}/contact`} variant="outline" size="md" className="text-white border-white/50 hover:bg-white/10">
              {locale === "bn" ? "অফিস যোগাযোগের বিবরণ" : "View Contact Details"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
