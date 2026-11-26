import React from "react";
import { useTranslations } from "next-intl";
import { faqItems } from "@/mocks/data";
import { Accordion } from "../ui/Accordion";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { MessageSquare, PhoneCall } from "lucide-react";

export const FAQSection: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("faq");
  const isBn = locale === "bn";

  const formattedFaq = faqItems.map((item) => ({
    id: item.id,
    question: isBn ? item.questionBn : item.question,
    answer: isBn ? item.answerBn : item.answer,
  }));

  return (
    <section className="bg-white py-16 md:py-24 border-b border-[#E1E7E8]" id="faq">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading and Support Box */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />

            <div className="bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#102D46] flex items-center justify-center text-white shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#102D46]">
                    {t("stillHaveQuestions")}
                  </h4>
                  <p className="text-xs text-[#647580]">
                    {t("talkToCounsellor")}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button href="/contact" variant="teal" size="sm" className="w-full">
                  <PhoneCall className="w-3.5 h-3.5 mr-2" />
                  {isBn ? "সরাসরি যোগাযোগ করুন" : "Speak with Counsellor"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={formattedFaq} />
          </div>
        </div>
      </div>
    </section>
  );
};
