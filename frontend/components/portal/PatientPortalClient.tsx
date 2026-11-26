"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { InquirySubmission, InquiryFile } from "@/types";
import {
  getInquiryById,
  getRecentInquiries,
  addDocumentToInquiry,
  DEMO_PORTAL_CASES,
} from "@/lib/api/inquiry";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Info, FileText, ImageIcon } from "lucide-react";

interface PatientPortalClientProps {
  initialTrack?: string;
}

export function PatientPortalClient({ initialTrack = "" }: PatientPortalClientProps) {
  const t = useTranslations("portalPage");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryTrack = initialTrack || searchParams.get("track") || "";

  const [searchId, setSearchId] = useState<string>(queryTrack || DEMO_PORTAL_CASES[0]?.id || "");
  const [activeCase, setActiveCase] = useState<InquirySubmission | null>(() => {
    const targetId = queryTrack.trim() || DEMO_PORTAL_CASES[0]?.id;
    return getInquiryById(targetId) || DEMO_PORTAL_CASES[0] || null;
  });
  const [recentCases, setRecentCases] = useState<InquirySubmission[]>(DEMO_PORTAL_CASES);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync inquiries on mount or when queryTrack changes
  useEffect(() => {
    const recents = getRecentInquiries();
    setRecentCases(recents);

    const targetId = queryTrack.trim() || (recents.length > 0 ? recents[0].id : DEMO_PORTAL_CASES[0].id);
    const found = getInquiryById(targetId);
    if (found) {
      setActiveCase(found);
      setSearchId(found.id);
    } else if (DEMO_PORTAL_CASES.length > 0) {
      setActiveCase(DEMO_PORTAL_CASES[0]);
      setSearchId(DEMO_PORTAL_CASES[0].id);
    }
  }, [queryTrack]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = getInquiryById(searchId.trim());
    if (found) {
      setActiveCase(found);
      router.push(`/${locale}/portal?track=${encodeURIComponent(found.id)}`);
    } else {
      setActiveCase(null);
    }
  };

  const handleSelectCase = (id: string) => {
    setSearchId(id);
    const found = getInquiryById(id);
    if (found) {
      setActiveCase(found);
      router.push(`/${locale}/portal?track=${encodeURIComponent(found.id)}`);
    }
  };

  const handleCopyId = () => {
    if (!activeCase) return;
    navigator.clipboard.writeText(activeCase.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleUploadAdditional = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadMessage(null);
    const files = e.target.files;
    if (!files || files.length === 0 || !activeCase) return;

    const file = files[0];
    const newFile: InquiryFile = {
      name: file.name,
      size: file.size,
      type: file.type,
    };

    const updated = addDocumentToInquiry(activeCase.id, newFile);
    if (updated) {
      setActiveCase({ ...updated });
      setUploadMessage(
        locale === "bn"
          ? `${file.name} সফলভাবে সংযুক্ত হয়েছে`
          : `${file.name} attached successfully`
      );
    } else {
      // For demo cases or state fallback
      setActiveCase((prev) =>
        prev
          ? {
              ...prev,
              files: [...prev.files, newFile],
            }
          : null
      );
      setUploadMessage(
        locale === "bn"
          ? `${file.name} সংযুক্ত হয়েছে`
          : `${file.name} attached`
      );
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setTimeout(() => setUploadMessage(null), 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusBadge = (status: InquirySubmission["status"]) => {
    switch (status) {
      case "quotation_ready":
        return <Badge variant="verified" size="md">{t("statusQuotationReady")}</Badge>;
      case "scheduled":
        return <Badge variant="teal" size="md">{t("statusScheduled")}</Badge>;
      case "in_review":
        return <Badge variant="pending" size="md">{t("statusInReview")}</Badge>;
      case "submitted":
      default:
        return <Badge variant="pending" size="md">{t("statusSubmitted")}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Lookup Control Bar */}
      <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 shadow-2xs space-y-5">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={t("lookupPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] font-mono placeholder:text-[#647580] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            />
            <svg
              className="w-4 h-4 text-[#647580] absolute left-3.5 top-3.5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#102D46] hover:bg-[#183F5B] text-white font-semibold rounded-md text-sm transition-colors cursor-pointer shrink-0"
          >
            {t("trackBtn")}
          </button>
        </form>

        {/* Demo Cases and Recent Submissions Quick Switcher */}
        <div className="pt-3 border-t border-[#E1E7E8] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[#647580] uppercase tracking-wider mr-1">
            {t("demoPillLabel")}
          </span>
          {DEMO_PORTAL_CASES.map((demo) => {
            const isSelected = activeCase?.id === demo.id;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleSelectCase(demo.id)}
                className={`px-3 py-1 rounded-full font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#147D78] text-white font-bold"
                    : "bg-[#F3F6F5] text-[#172B3A] border border-[#E1E7E8] hover:border-[#147D78]"
                }`}
              >
                {demo.id} • {demo.preferredHospital ? demo.preferredHospital.split("-")[0] : demo.fullName.split(" ")[0]} ({demo.status === "quotation_ready" ? "Quotation Ready" : "In Review"})
              </button>
            );
          })}

          {/* User's own submitted cases */}
          {recentCases
            .filter((c) => !DEMO_PORTAL_CASES.some((d) => d.id === c.id))
            .map((userCase) => {
              const isSelected = activeCase?.id === userCase.id;
              return (
                <button
                  key={userCase.id}
                  type="button"
                  onClick={() => handleSelectCase(userCase.id)}
                  className={`px-3 py-1 rounded-full font-mono transition-colors cursor-pointer inline-flex items-center gap-1 ${
                    isSelected
                      ? "bg-[#102D46] text-white font-bold"
                      : "bg-emerald-50 text-[#247A52] border border-emerald-200 hover:border-[#102D46]"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-current" />
                  <span>{userCase.id} ({userCase.fullName.split(" ")[0]})</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Case Details View or Not Found */}
      {!activeCase ? (
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F3F6F5] text-[#647580] flex items-center justify-center mx-auto font-bold text-lg">
            ?
          </div>
          <h3 className="text-lg font-bold text-[#172B3A]">
            {t("noCaseFoundTitle")}
          </h3>
          <p className="text-sm text-[#647580] max-w-md mx-auto">
            {t("noCaseFoundDesc")}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectCase(DEMO_PORTAL_CASES[0].id)}
            >
              Load Demo Case: SBH-2026-1084
            </Button>
            <Button
              href={`/${locale}/inquiry`}
              variant="teal"
              size="sm"
            >
              {t("newInquiryCTA")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Active Case Header Card */}
          <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E1E7E8]">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl lg:text-3xl font-bold text-[#102D46] tracking-tight">
                    {activeCase.id}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="px-2.5 py-1 bg-[#F3F6F5] hover:bg-[#E1E7E8] border border-[#E1E7E8] rounded text-xs text-[#172B3A] transition-colors cursor-pointer"
                  >
                    {copiedId ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-[#647580]">
                  {t("submittedOn")}{" "}
                  <span className="font-medium text-[#172B3A]">
                    {new Date(activeCase.createdAt).toLocaleDateString(
                      locale === "bn" ? "bn-BD" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </p>
              </div>

              <div>{getStatusBadge(activeCase.status)}</div>
            </div>

            {/* Patient & Clinical Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F3F6F5] p-3.5 rounded border border-[#E1E7E8]/80">
                <span className="text-[#647580] block font-semibold uppercase tracking-wider text-[11px]">
                  {t("patientName")}
                </span>
                <span className="font-bold text-[#172B3A] text-sm mt-0.5 block">
                  {activeCase.fullName}
                </span>
              </div>

              <div className="bg-[#F3F6F5] p-3.5 rounded border border-[#E1E7E8]/80">
                <span className="text-[#647580] block font-semibold uppercase tracking-wider text-[11px]">
                  {t("contactNumber")}
                </span>
                <span className="font-bold text-[#172B3A] text-sm font-mono mt-0.5 block">
                  {activeCase.phone}
                </span>
              </div>

              <div className="bg-[#F3F6F5] p-3.5 rounded border border-[#E1E7E8]/80">
                <span className="text-[#647580] block font-semibold uppercase tracking-wider text-[11px]">
                  {t("destination")}
                </span>
                <span className="font-bold text-[#172B3A] text-sm mt-0.5 block capitalize">
                  {activeCase.preferredDestination || "General Assessment"}
                </span>
              </div>

              <div className="bg-[#F3F6F5] p-3.5 rounded border border-[#E1E7E8]/80">
                <span className="text-[#647580] block font-semibold uppercase tracking-wider text-[11px]">
                  {t("specialty")}
                </span>
                <span className="font-bold text-[#172B3A] text-sm mt-0.5 block capitalize">
                  {activeCase.preferredSpecialty?.replace("-", " ") || "Tertiary Review"}
                </span>
              </div>
            </div>

            {/* Condition description quote */}
            <div className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-xs space-y-1">
              <span className="font-semibold text-[#102D46] uppercase tracking-wider text-[11px]">
                {t("caseDetails")}:
              </span>
              <p className="text-[#172B3A] leading-relaxed">
                {activeCase.medicalCondition}
              </p>
              {activeCase.additionalNotes && (
                <p className="text-[#647580] pt-1">
                  <span className="font-semibold">Notes:</span> {activeCase.additionalNotes}
                </p>
              )}
            </div>
          </div>

          {/* 4-Step Treatment Coordination Timeline */}
          {activeCase.timeline && activeCase.timeline.length > 0 && (
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 shadow-2xs space-y-6">
              <div className="border-b border-[#E1E7E8] pb-3">
                <h3 className="text-lg font-bold text-[#172B3A]">
                  {t("timelineTitle")}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {activeCase.timeline.map((step) => {
                  const title = locale === "bn" ? step.titleBn : step.title;
                  const desc = locale === "bn" ? step.descriptionBn : step.description;

                  let stepColor = "border-[#E1E7E8] bg-[#F3F6F5]";
                  let badgeColor = "bg-[#E1E7E8] text-[#647580]";

                  if (step.completed) {
                    stepColor = "border-[#247A52]/40 bg-white";
                    badgeColor = "bg-[#247A52] text-white";
                  } else if (step.current) {
                    stepColor = "border-[#147D78] bg-white ring-1 ring-[#147D78]/20";
                    badgeColor = "bg-[#147D78] text-white";
                  }

                  return (
                    <div
                      key={step.step}
                      className={`p-4 rounded-lg border ${stepColor} space-y-2 flex flex-col justify-between`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${badgeColor}`}>
                            {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.step}
                          </span>
                          {step.date && (
                            <span className="text-[10px] text-[#647580] font-mono">
                              {step.date}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-[#172B3A] leading-snug">
                          {title}
                        </h4>
                        <p className="text-[11px] text-[#647580] leading-relaxed">
                          {desc}
                        </p>
                      </div>

                      {step.current && (
                        <div className="pt-2">
                          <span className="inline-block text-[10px] font-semibold text-[#147D78] uppercase tracking-wider bg-[#147D78]/10 px-2 py-0.5 rounded">
                            Active Phase
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2-Column Section: Quotation Card & Coordinator Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Hospital Quotation Card (if available) or Status Update */}
            <div className="lg:col-span-8 space-y-6">
              {activeCase.quotation ? (
                <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E1E7E8] gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#147D78]">
                        Official Treatment Plan
                      </span>
                      <h3 className="text-xl font-bold text-[#172B3A] mt-0.5">
                        {t("quotationTitle")}
                      </h3>
                    </div>
                    <Badge variant="verified" size="sm">
                      Official Direct Tariff
                    </Badge>
                  </div>

                  {/* Hospital & Specialist Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#F3F6F5] rounded border border-[#E1E7E8]">
                      <span className="text-[#647580] block font-semibold uppercase text-[10px]">
                        {t("hospitalName")}
                      </span>
                      <span className="font-bold text-[#172B3A] text-sm mt-0.5 block">
                        {locale === "bn" ? activeCase.quotation.hospitalNameBn : activeCase.quotation.hospitalName}
                      </span>
                      <span className="text-[#647580]">
                        {locale === "bn" ? activeCase.quotation.countryBn : activeCase.quotation.country} • {locale === "bn" ? activeCase.quotation.specialtyBn : activeCase.quotation.specialty}
                      </span>
                    </div>

                    <div className="p-3 bg-[#F3F6F5] rounded border border-[#E1E7E8]">
                      <span className="text-[#647580] block font-semibold uppercase text-[10px]">
                        {t("recommendedSpecialist")}
                      </span>
                      <span className="font-bold text-[#172B3A] text-sm mt-0.5 block">
                        {locale === "bn" ? activeCase.quotation.recommendedDoctorBn : activeCase.quotation.recommendedDoctor}
                      </span>
                      <span className="text-[#247A52] font-medium">
                        Board-Certified Consultant
                      </span>
                    </div>
                  </div>

                  {/* Doctor's Assessment */}
                  <div className="space-y-1.5 p-4 bg-[#F3F6F5] rounded border border-[#E1E7E8]">
                    <span className="text-xs font-bold text-[#102D46] uppercase tracking-wider">
                      {t("clinicalEvaluation")}:
                    </span>
                    <p className="text-xs text-[#172B3A] leading-relaxed">
                      {locale === "bn" ? activeCase.quotation.doctorOpinionBn : activeCase.quotation.doctorOpinion}
                    </p>
                  </div>

                  {/* Cost & Stay Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Direct Hospital Tariff */}
                    <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
                      <span className="text-[11px] font-bold text-[#247A52] uppercase tracking-wider block">
                        {t("estimatedTreatmentCost")}
                      </span>
                      <div className="text-2xl font-bold font-mono text-[#102D46]">
                        {activeCase.quotation.estimatedCostUsd}
                      </div>
                      <div className="text-xs font-semibold text-[#647580]">
                        Approx. {activeCase.quotation.estimatedCostBdt}
                      </div>
                      <p className="text-[11px] text-[#647580] pt-1">
                        {locale === "bn" ? activeCase.quotation.tariffNoteBn : activeCase.quotation.tariffNote}
                      </p>
                    </div>

                    {/* Stay Duration & Visa Status */}
                    <div className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-[#647580] uppercase tracking-wider block">
                          {t("projectedStay")}
                        </span>
                        <div className="flex gap-4 pt-1 text-xs">
                          <div>
                            <span className="text-base font-bold text-[#172B3A] font-mono">
                              {activeCase.quotation.estimatedInpatientDays} {t("daysUnit")}
                            </span>
                            <span className="text-[#647580] block text-[10px]">{t("inpatientLabel")}</span>
                          </div>
                          <div className="border-l border-[#E1E7E8] pl-4">
                            <span className="text-base font-bold text-[#172B3A] font-mono">
                              {activeCase.quotation.estimatedOutpatientDays} {t("daysUnit")}
                            </span>
                            <span className="text-[#647580] block text-[10px]">{t("outpatientLabel")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E1E7E8]">
                        <span className="text-[10px] uppercase font-bold text-[#647580] block">
                          {t("visaStatusTitle")}
                        </span>
                        <span className="text-xs font-semibold text-[#247A52] flex items-center gap-1.5 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#247A52]" />
                          <span>{t("visaIssued")}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#E1E7E8] flex flex-col sm:flex-row gap-3">
                    <Button
                      href={`https://wa.me/8801730000000?text=${encodeURIComponent(
                        `Hello Sun Breeze Healthcare, I would like to proceed with admission for my case ${activeCase.id}.`
                      )}`}
                      variant="teal"
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      {t("proceedAdmissionBtn")}
                    </Button>
                    <button
                      type="button"
                      onClick={() => alert(locale === "bn" ? "ভিসা আমন্ত্রণপত্র পিডিএফ ডাউনলোড প্রস্তুত।" : "Visa Invitation Letter PDF generated.")}
                      className="px-4 py-2.5 bg-white border border-[#102D46] hover:bg-[#F3F6F5] text-[#102D46] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      {t("downloadVisaLetter")}
                    </button>
                  </div>
                </div>
              ) : (
                /* In Review Placeholder Card */
                <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 shadow-2xs space-y-4">
                  <div className="flex items-center space-x-2 text-[#A66B19] font-bold text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A66B19] animate-pulse" />
                    <span>Case Review in Progress</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#172B3A]">
                    {locale === "bn"
                      ? "বিশেষজ্ঞ চিকিৎসক আপনার রিপোর্ট পর্যালোচনা করছেন"
                      : "Specialist Review Underway at Partner Hospital"}
                  </h3>
                  <p className="text-xs text-[#647580] leading-relaxed">
                    {locale === "bn"
                      ? "আপনার প্রেরিত মেডিকেল হিস্ট্রি এবং টেস্ট রিপোর্ট সংশ্লিষ্ট আন্তর্জাতিক হাসপাতালের সিনিয়র কনসালট্যান্টের কাছে পাঠানো হয়েছে। সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আনুষ্ঠানিক ট্রিটমেন্ট প্ল্যান এবং সরাসরি কোটেশন প্রস্তুত হয়।"
                      : "Your diagnostic records have been routed to senior departmental chairs. Official treatment plans and itemized hospital quotes are typically issued within 24 to 48 business hours."}
                  </p>
                  <div className="p-3 bg-[#F3F6F5] rounded border border-[#E1E7E8] text-xs text-[#647580] flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#147D78] shrink-0 mt-0.5" />
                    <p>
                      {locale === "bn"
                        ? "জরুরি কোনো প্রশ্ন থাকলে নিচের লিঙ্কের মাধ্যমে আপনার অ্যাসাইন করা কেস কোঅর্ডিনেটরের সাথে কথা বলুন।"
                        : "For urgent updates or queries, you can reach out directly to your assigned medical coordinator below."}
                    </p>
                  </div>
                </div>
              )}

              {/* Uploaded Diagnostic Records Tray */}
              <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E1E7E8]">
                  <h4 className="text-sm font-bold text-[#172B3A]">
                    {t("documentsTitle")} ({activeCase.files.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-[#147D78] hover:underline cursor-pointer"
                  >
                    + {t("uploadAdditionalBtn")}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUploadAdditional}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>

                {uploadMessage && (
                  <p className="text-xs text-[#247A52] font-semibold bg-emerald-50 border border-emerald-200 p-2 rounded flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#247A52]" />
                    <span>{uploadMessage}</span>
                  </p>
                )}

                <div className="space-y-2">
                  {activeCase.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-xs"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="font-mono text-[#102D46] font-bold inline-flex items-center gap-1">
                          {file.type?.includes("pdf") || file.name.endsWith(".pdf") ? (
                            <>
                              <FileText className="w-3.5 h-3.5 text-[#102D46]" />
                              <span>PDF</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3.5 h-3.5 text-[#102D46]" />
                              <span>IMG</span>
                            </>
                          )}
                        </span>
                        <span className="font-semibold text-[#172B3A] truncate">
                          {file.name}
                        </span>
                      </div>
                      <span className="text-[#647580] font-mono shrink-0 ml-2">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Assigned Clinical Coordinator & Help Desk */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Coordinator Card */}
              {activeCase.coordinator && (
                <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 shadow-2xs space-y-4">
                  <div className="border-b border-[#E1E7E8] pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#147D78] block">
                      Dedicated Patient Care
                    </span>
                    <h4 className="text-sm font-bold text-[#172B3A] mt-0.5">
                      {t("coordinatorTitle")}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#E1E7E8] bg-[#102D46]/10">
                      <Image
                        src={activeCase.coordinator.image}
                        alt={activeCase.coordinator.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#172B3A]">
                        {locale === "bn" ? activeCase.coordinator.nameBn : activeCase.coordinator.name}
                      </h5>
                      <p className="text-xs text-[#647580]">
                        {locale === "bn" ? activeCase.coordinator.titleBn : activeCase.coordinator.title}
                      </p>
                      <span className="inline-block text-[10px] font-semibold text-[#247A52] mt-0.5">
                        ● Online / Available
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button
                      href={`https://wa.me/${activeCase.coordinator.whatsapp}?text=${encodeURIComponent(
                        `Hello ${activeCase.coordinator.name}, I am tracking case ${activeCase.id} on Sun Breeze Healthcare.`
                      )}`}
                      variant="teal"
                      size="sm"
                      className="w-full text-xs"
                    >
                      {t("whatsappDirect")}
                    </Button>

                    <Button
                      href={`tel:${activeCase.coordinator.phone}`}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                    >
                      {t("callDirect")}
                    </Button>
                  </div>

                  <div className="pt-2 border-t border-[#E1E7E8] text-[11px] text-[#647580]">
                    {t("officeHours")}
                  </div>
                </div>
              )}

              {/* Direct Official Hospital Tariff Pledge Card */}
              <div className="bg-[#102D46] text-white rounded-lg p-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#147D78] uppercase tracking-wider">
                  <span>Institutional Pledge</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {t("officialTariffPledge")}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  {locale === "bn"
                    ? "সান ব্রীজ হেলথকেয়ার প্রতিটি রোগীকে হাসপাতালের আনুষ্ঠানিক নির্ধারিত মূল্যে সেবা দেয়। কোনো অতিরিক্ত মধ্যস্থতাকারী ফি নেওয়া হয় না।"
                    : "All medical expenses are billed directly by accredited partner hospitals. Sun Breeze adds zero hidden coordination fees."}
                </p>
                <div className="pt-2 border-t border-white/10 text-xs text-white/70">
                  Dhaka Desk: <span className="font-mono font-bold text-white">+880 1730 000000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
