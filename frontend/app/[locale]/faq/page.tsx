import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { faqItems } from "@/mocks/data";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

interface FAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });

  const formattedFaqs = faqItems.map((item) => ({
    id: item.id,
    question: locale === "bn" ? item.questionBn : item.question,
    answer: locale === "bn" ? item.answerBn : item.answer,
  }));

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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

        {/* FAQ Accordion Section */}
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs space-y-6">
          <Accordion items={formattedFaqs} />
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#102D46] text-white rounded-lg p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">
              {locale === "bn"
                ? "আপনার প্রশ্নের উত্তর খুঁজে পাননি?"
                : "Still Have Clinical or Travel Questions?"}
            </h3>
            <p className="text-xs text-white/80">
              {locale === "bn"
                ? "আমাদের সিনিয়র কেস ম্যানেজারের সাথে সরাসরি ফোনে বা হোয়াটসঅ্যাপে কথা বলুন।"
                : "Speak directly with our Dhaka coordination desk or submit your medical records."}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button href={`/${locale}/contact`} variant="outline" size="md" className="text-white border-white/50 hover:bg-white/10">
              {locale === "bn" ? "যোগাযোগ করুন" : "Contact Desk"}
            </Button>
            <Button href={`/${locale}/inquiry`} variant="teal" size="md">
              {locale === "bn" ? "ফ্রি কেস রিভিউ" : "Free Case Review"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
