import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface HowItWorksPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HowItWorksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorksPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function HowItWorksPage({ params }: HowItWorksPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorksPage" });

  const steps = [
    {
      num: "01",
      title: locale === "bn" ? "মেডিকেল রেকর্ড ও তথ্য পাঠান" : "Share Your Medical Records",
      desc: locale === "bn"
        ? "আপনার সাম্প্রতিক টেস্ট রিপোর্ট, ইমেজিং ফাইল এবং চিকিৎসকের প্রেসক্রিপশন আমাদের সুরক্ষিত পোর্টালে জমা দিন। কোনো ফি বা অ্যাকাউন্ট খোলার প্রয়োজন নেই।"
        : "Upload recent diagnostic reports, imaging scans, and prescriptions via our encrypted intake portal. No account or upfront fee required.",
    },
    {
      num: "02",
      title: locale === "bn" ? "ক্লিনিক্যাল পর্যালোচনা ও বিশেষজ্ঞ নির্বাচন" : "Medical Case Review & Clinical Triage",
      desc: locale === "bn"
        ? "আমাদের অভিজ্ঞ চিকিৎসক দল রিপোর্ট বিশ্লেষণ করে উপযুক্ত আন্তর্জাতিক হাসপাতাল ও সিনিয়র কনসালট্যান্টের কাছে পাঠান।"
        : "Our medical directors evaluate your reports and submit them directly to accredited department chairs across Asia and Europe.",
    },
    {
      num: "03",
      title: locale === "bn" ? "হাসপাতাল নির্বাচন ও আনুষ্ঠানিক কোটেশন" : "Hospital Selection & Direct Quotation",
      desc: locale === "bn"
        ? "হাসপাতাল থেকে ৪৮ ঘণ্টার মধ্যে চিকিৎসকের মতামত, থাকার আনুমানিক মেয়াদ এবং সরকারি বা অফিশিয়াল প্যাকেজ রেট প্রদান করা হয়।"
        : "Receive an itemized official hospital quotation, estimated length of stay, and physician recommendation within 48 hours.",
    },
    {
      num: "04",
      title: locale === "bn" ? "ভিসা আমন্ত্রণ ও ভ্রমণ সমন্বয়" : "Medical Visa & Travel Coordination",
      desc: locale === "bn"
        ? "হাসপাতালের সিলমোহরযুক্ত ভিসা ইনভিটেশন লেটার সংগ্রহ, ফ্লাইট বুকিং সহায়তা এবং এয়ারপোর্টে ডেডিকেটেড ট্রান্সফারের ব্যবস্থা।"
        : "We secure official hospital-issued visa endorsement letters and arrange seamless airport reception and local logistics.",
    },
    {
      num: "05",
      title: locale === "bn" ? "চিকিৎসা ও পরবর্তী ধারাবাহিক ফলো-আপ" : "Treatment & Post-Discharge Follow-up",
      desc: locale === "bn"
        ? "হাসপাতালে ভর্তি চলাকালীন সার্বক্ষণিক বাংলা অনুবাদক সহায়তা এবং দেশে ফিরে সংশ্লিষ্ট চিকিৎসকের সাথে ফলো-আপ টেলি-পরামর্শ।"
        : "Enjoy in-hospital language coordination and continue regular follow-up teleconsultations with your treating surgeon from Bangladesh.",
    },
  ];

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Breadcrumb & Introduction */}
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs space-y-4">
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

        {/* 5-Step Process Cards */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 flex flex-col md:flex-row md:items-start gap-6 shadow-2xs hover:border-[#147D78] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#102D46] text-white flex items-center justify-center font-mono font-bold text-lg shrink-0">
                {step.num}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-bold text-[#172B3A]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#647580] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Required Documents Checklist */}
        <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 space-y-6 shadow-2xs">
          <div className="border-b border-[#E1E7E8] pb-4">
            <h2 className="text-xl font-bold text-[#172B3A]">
              {t("checklistTitle")}
            </h2>
            <p className="text-xs text-[#647580] mt-1">
              {t("checklistDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[t("doc1"), t("doc2"), t("doc3"), t("doc4")].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg flex items-start space-x-3"
              >
                <div className="w-6 h-6 rounded bg-[#247A52]/10 text-[#247A52] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-[#172B3A] leading-relaxed">
                  {doc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Bar */}
        <div className="bg-[#102D46] text-white rounded-lg p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold">
              {t("ctaTitle")}
            </h3>
            <p className="text-xs text-white/80">
              {t("ctaDesc")}
            </p>
          </div>
          <Button href={`/${locale}/inquiry`} variant="teal" size="md" className="shrink-0">
            {locale === "bn" ? "ফ্রি কেস রিভিউ অনুরোধ করুন" : "Request Free Case Review"}
          </Button>
        </div>
      </div>
    </div>
  );
}
