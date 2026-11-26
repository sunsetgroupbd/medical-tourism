import { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PatientPortalClient } from "@/components/portal/PatientPortalClient";

interface PortalPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    track?: string;
  }>;
}

export async function generateMetadata({
  params,
}: PortalPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portalPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function PortalPage({ params, searchParams }: PortalPageProps) {
  const { locale } = await params;
  const { track } = await searchParams;
  const t = await getTranslations({ locale, namespace: "portalPage" });

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Introduction */}
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#147D78] bg-[#147D78]/10 px-3 py-1 rounded">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>{t("eyebrow")}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-[#172B3A] tracking-tight">
              {t("title")}
            </h1>

            <p className="text-base text-[#647580] leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Client Interactive Portal Dashboard */}
        <Suspense
          fallback={
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-12 text-center text-[#647580]">
              <div className="animate-spin w-8 h-8 border-2 border-[#102D46] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm">Loading patient portal...</p>
            </div>
          }
        >
          <PatientPortalClient initialTrack={track} />
        </Suspense>
      </div>
    </div>
  );
}
