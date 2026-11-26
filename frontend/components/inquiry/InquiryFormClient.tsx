"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Hospital, Destination, Specialty, InquirySubmission } from "@/types";
import { submitInquiry } from "@/lib/api/inquiry";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AlertCircle, FileText, ImageIcon } from "lucide-react";

interface InquiryFormClientProps {
  destinations: Destination[];
  hospitals: Hospital[];
  specialties: Specialty[];
}

interface SelectedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function InquiryFormClient({
  destinations,
  hospitals,
  specialties,
}: InquiryFormClientProps) {
  const t = useTranslations("inquiryPage");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [selectedFiles, setSelectedFiles] = useState<SelectedFileItem[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<InquirySubmission | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Zod validation schema
  const inquirySchema = z.object({
    fullName: z
      .string()
      .min(3, { message: t("nameRequired") }),
    phone: z
      .string()
      .min(8, { message: t("phoneRequired") }),
    email: z.string().email().optional().or(z.literal("")),
    medicalCondition: z
      .string()
      .min(10, { message: t("conditionRequired") }),
    preferredDestination: z.string().optional(),
    preferredHospital: z.string().optional(),
    preferredSpecialty: z.string().optional(),
    additionalNotes: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, {
      message: t("consentRequired"),
    }),
  });

  type InquiryFormValues = z.infer<typeof inquirySchema>;

  const defaultHospital = searchParams.get("hospital") || "";
  const defaultDestination = searchParams.get("destination") || "";
  const defaultSpecialty = searchParams.get("specialty") || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      medicalCondition: "",
      preferredDestination: defaultDestination,
      preferredHospital: defaultHospital,
      preferredSpecialty: defaultSpecialty,
      additionalNotes: "",
      consent: false,
    },
  });

  const selectedDestinationVal = watch("preferredDestination");

  // Filter hospitals if a destination is chosen
  const filteredHospitals = selectedDestinationVal && selectedDestinationVal !== ""
    ? hospitals.filter(
        (h) => h.countryCode.toLowerCase() === selectedDestinationVal.toLowerCase() ||
               h.country.toLowerCase() === selectedDestinationVal.toLowerCase()
      )
    : hospitals;

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    const maxTotalFiles = 5;

    if (selectedFiles.length + files.length > maxTotalFiles) {
      setFileError(
        locale === "bn"
          ? "সর্বোচ্চ ৫টি ফাইল আপলোড করা যাবে"
          : "Maximum 5 files allowed"
      );
      return;
    }

    const newFiles: SelectedFileItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setFileError(
          locale === "bn"
            ? `অননুমোদিত ফরম্যাট: ${file.name}। শুধুমাত্র PDF, JPG, PNG গ্রহণযোগ্য`
            : `Unsupported file type: ${file.name}. Only PDF, JPG, PNG accepted`
        );
        return;
      }
      if (file.size > maxSizeBytes) {
        setFileError(
          locale === "bn"
            ? `${file.name} ফাইলের আকার ১০MB-এর বেশি`
            : `${file.name} exceeds 10MB limit`
        );
        return;
      }

      newFiles.push({
        id: `${file.name}-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Submit Handler
  const onSubmit = async (data: InquiryFormValues) => {
    try {
      setIsSubmitting(true);
      const submission = await submitInquiry({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || undefined,
        medicalCondition: data.medicalCondition,
        preferredDestination: data.preferredDestination || undefined,
        preferredHospital: data.preferredHospital || undefined,
        preferredSpecialty: data.preferredSpecialty || undefined,
        additionalNotes: data.additionalNotes || undefined,
        consent: data.consent,
        files: selectedFiles.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
      });

      setSubmissionResult(submission);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(submissionResult.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  // -------------------------------------------------------------
  // SUCCESS / CONFIRMATION SCREEN
  // -------------------------------------------------------------
  if (submissionResult) {
    const destName = destinations.find(
      (d) => d.slug === submissionResult.preferredDestination || d.code.toLowerCase() === submissionResult.preferredDestination?.toLowerCase()
    );
    const hospName = hospitals.find(
      (h) => h.slug === submissionResult.preferredHospital
    );

    return (
      <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-xs space-y-8 animate-fadeIn">
        {/* Success Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-14 h-14 bg-[#247A52]/10 text-[#247A52] rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <Badge variant="verified" size="md">
            {locale === "bn" ? "কেস সফলভাবে তালিকাভুক্ত" : "Case Successfully Registered"}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B3A]">
            {t("successTitle")}
          </h2>
          <p className="text-sm text-[#647580] leading-relaxed">
            {t("successSubtitle")}
          </p>
        </div>

        {/* Official Reference Tracking Box */}
        <div className="bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg p-6 max-w-xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#647580] block">
            {t("trackingIdLabel")}
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#102D46] tracking-wider select-all">
              {submissionResult.id}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              className="px-3 py-1.5 bg-white border border-[#E1E7E8] hover:border-[#102D46] rounded text-xs font-medium text-[#172B3A] transition-colors cursor-pointer"
            >
              {copiedId ? t("copied") : t("copyTrackingId")}
            </button>
          </div>
          <p className="text-xs text-[#647580]">
            {locale === "bn"
              ? "এই ট্র্যাকিং নম্বরটি সংরক্ষণ করুন। পরবর্তী যোগাযোগ এবং পোর্টাল স্ট্যাটাস যাচাইয়ে এটি ব্যবহার করবেন।"
              : "Save this reference ID. You will use it for follow-ups and tracking case status in the patient portal."}
          </p>
        </div>

        {/* What Happens Next Timeline */}
        <div className="border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-6">
          <h3 className="text-lg font-bold text-[#172B3A]">
            {t("whatHappensNext")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 bg-[#F3F6F5] rounded-md border border-[#E1E7E8]/60">
              <span className="text-xs font-mono font-bold text-[#147D78] bg-[#147D78]/10 px-2 py-0.5 rounded">
                01
              </span>
              <h4 className="text-sm font-bold text-[#172B3A] pt-1">
                {t("step1Title")}
              </h4>
              <p className="text-xs text-[#647580] leading-relaxed">
                {t("step1Desc")}
              </p>
            </div>

            <div className="space-y-2 p-4 bg-[#F3F6F5] rounded-md border border-[#E1E7E8]/60">
              <span className="text-xs font-mono font-bold text-[#147D78] bg-[#147D78]/10 px-2 py-0.5 rounded">
                02
              </span>
              <h4 className="text-sm font-bold text-[#172B3A] pt-1">
                {t("step2Title")}
              </h4>
              <p className="text-xs text-[#647580] leading-relaxed">
                {t("step2Desc")}
              </p>
            </div>

            <div className="space-y-2 p-4 bg-[#F3F6F5] rounded-md border border-[#E1E7E8]/60">
              <span className="text-xs font-mono font-bold text-[#147D78] bg-[#147D78]/10 px-2 py-0.5 rounded">
                03
              </span>
              <h4 className="text-sm font-bold text-[#172B3A] pt-1">
                {t("step3Title")}
              </h4>
              <p className="text-xs text-[#647580] leading-relaxed">
                {t("step3Desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Submitted Case Summary Card */}
        <div className="border border-[#E1E7E8] rounded-lg p-6 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#647580]">
            {t("summaryHeading")}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[#647580] block">{t("patientName")}:</span>
              <span className="font-semibold text-[#172B3A] text-sm">
                {submissionResult.fullName}
              </span>
            </div>
            <div>
              <span className="text-[#647580] block">{t("contactNumber")}:</span>
              <span className="font-semibold text-[#172B3A] text-sm font-mono">
                {submissionResult.phone}
              </span>
            </div>
            <div>
              <span className="text-[#647580] block">{t("assignedDestination")}:</span>
              <span className="font-semibold text-[#172B3A]">
                {destName ? (locale === "bn" ? destName.nameBn : destName.name) : (submissionResult.preferredDestination || t("noPreference"))}
              </span>
            </div>
            <div>
              <span className="text-[#647580] block">{t("assignedHospital")}:</span>
              <span className="font-semibold text-[#172B3A]">
                {hospName ? (locale === "bn" && hospName.nameBn ? hospName.nameBn : hospName.name) : (submissionResult.preferredHospital || t("noPreference"))}
              </span>
            </div>
            <div>
              <span className="text-[#647580] block">{t("attachedFilesCount")}:</span>
              <span className="font-semibold text-[#172B3A]">
                {submissionResult.files.length} {locale === "bn" ? "টি ডকুমেন্ট" : "files attached"}
              </span>
            </div>
            <div>
              <span className="text-[#647580] block">Submission Timestamp:</span>
              <span className="font-mono text-[#172B3A]">
                {new Date(submissionResult.createdAt).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E1E7E8]">
          <Button
            href={`/${locale}`}
            variant="outline"
            size="md"
          >
            {t("backToHome")}
          </Button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmissionResult(null);
                setSelectedFiles([]);
              }}
              className="text-xs font-semibold text-[#147D78] hover:underline cursor-pointer px-3 py-2"
            >
              {t("submitAnother")}
            </button>
            <Button
              href={`/${locale}/portal?track=${submissionResult.id}`}
              variant="teal"
              size="md"
            >
              {t("trackInPortal")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // INQUIRY FORM VIEW
  // -------------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-xs space-y-10"
      noValidate
    >
      {/* Notice header */}
      <div className="bg-[#F3F6F5] border border-[#E1E7E8] rounded-md p-4 flex items-start space-x-3 text-xs text-[#647580]">
        <div className="w-5 h-5 rounded-full bg-[#102D46] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
          ℹ
        </div>
        <div className="space-y-0.5">
          <p className="font-semibold text-[#172B3A]">
            {t("directDeskNotice")}
          </p>
          <p>
            {t("privacyPledge")}
          </p>
        </div>
      </div>

      {/* SECTION 1: Patient Information */}
      <div className="space-y-6">
        <div className="border-b border-[#E1E7E8] pb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#172B3A]">
            {t("step1Badge")}
          </h2>
          <span className="text-xs font-semibold text-[#147D78] bg-[#147D78]/10 px-2.5 py-0.5 rounded">
            Part 1 of 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
              {t("fullNameLabel")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder={t("fullNamePlaceholder")}
              className={`w-full px-4 py-2.5 bg-[#F3F6F5] border ${
                errors.fullName ? "border-red-500" : "border-[#E1E7E8]"
              } rounded-md text-sm text-[#172B3A] placeholder:text-[#647580] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
              {t("phoneLabel")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder={t("phonePlaceholder")}
              className={`w-full px-4 py-2.5 bg-[#F3F6F5] border ${
                errors.phone ? "border-red-500" : "border-[#E1E7E8]"
              } rounded-md text-sm text-[#172B3A] placeholder:text-[#647580] font-mono focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors`}
            />
            {errors.phone ? (
              <p className="text-xs text-red-500 font-medium">
                {errors.phone.message}
              </p>
            ) : (
              <p className="text-[11px] text-[#647580]">
                {t("phoneHelp")}
              </p>
            )}
          </div>

          {/* Email Address (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              className="w-full px-4 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] placeholder:text-[#647580] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Medical Condition & Preferences */}
      <div className="space-y-6 pt-4 border-t border-[#E1E7E8]">
        <div className="border-b border-[#E1E7E8] pb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#172B3A]">
            {t("step2Badge")}
          </h2>
          <span className="text-xs font-semibold text-[#147D78] bg-[#147D78]/10 px-2.5 py-0.5 rounded">
            Part 2 of 3
          </span>
        </div>

        {/* Medical Condition Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
            {t("conditionLabel")} <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            {...register("medicalCondition")}
            placeholder={t("conditionPlaceholder")}
            className={`w-full px-4 py-2.5 bg-[#F3F6F5] border ${
              errors.medicalCondition ? "border-red-500" : "border-[#E1E7E8]"
            } rounded-md text-sm text-[#172B3A] placeholder:text-[#647580] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors`}
          />
          {errors.medicalCondition && (
            <p className="text-xs text-red-500 font-medium">
              {errors.medicalCondition.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
              {t("destinationLabel")}
            </label>
            <select
              {...register("preferredDestination")}
              className="w-full px-3.5 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            >
              <option value="">{t("noPreference")}</option>
              {destinations.map((d) => (
                <option key={d.code} value={d.code}>
                  {locale === "bn" ? d.nameBn : d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
              {t("hospitalLabel")}
            </label>
            <select
              {...register("preferredHospital")}
              className="w-full px-3.5 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            >
              <option value="">{t("noPreference")}</option>
              {filteredHospitals.map((h) => (
                <option key={h.slug} value={h.slug}>
                  {locale === "bn" && h.nameBn ? h.nameBn : h.name} ({h.country})
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
              {t("specialtyLabel")}
            </label>
            <select
              {...register("preferredSpecialty")}
              className="w-full px-3.5 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            >
              <option value="">{t("noPreference")}</option>
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {locale === "bn" ? s.nameBn : s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#172B3A] block">
            {t("notesLabel")}
          </label>
          <input
            type="text"
            {...register("additionalNotes")}
            placeholder={t("notesPlaceholder")}
            className="w-full px-4 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] placeholder:text-[#647580] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* SECTION 3: Diagnostic Records Upload & Consent */}
      <div className="space-y-6 pt-4 border-t border-[#E1E7E8]">
        <div className="border-b border-[#E1E7E8] pb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#172B3A]">
            {t("step3Badge")}
          </h2>
          <span className="text-xs font-semibold text-[#147D78] bg-[#147D78]/10 px-2.5 py-0.5 rounded">
            Part 3 of 3
          </span>
        </div>

        {/* File Upload Component */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-bold text-[#172B3A]">
              {t("uploadTitle")}
            </h3>
            <p className="text-xs text-[#647580] mt-0.5">
              {t("uploadSubtitle")}
            </p>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#E1E7E8] hover:border-[#147D78] bg-[#F3F6F5]/50 hover:bg-[#F3F6F5] rounded-lg p-6 text-center cursor-pointer transition-colors"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-[#147D78]/10 text-[#147D78] flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#102D46]">
              {t("uploadDropzone")}
            </p>
            <p className="text-xs text-[#647580] mt-1">
              {t("uploadFormats")}
            </p>
          </div>

          {fileError && (
            <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-200 p-2.5 rounded flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{fileError}</span>
            </p>
          )}

          {/* Attached Files List */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-[#647580] uppercase tracking-wider">
                {t("uploadedFiles")} ({selectedFiles.length}/5):
              </div>
              <div className="space-y-1.5">
                {selectedFiles.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-xs"
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <span className="font-mono text-[#102D46] font-bold inline-flex items-center gap-1">
                        {f.type.includes("pdf") ? (
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
                      <span className="font-medium text-[#172B3A] truncate">
                        {f.name}
                      </span>
                      <span className="text-[#647580] shrink-0 font-mono">
                        ({formatFileSize(f.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      className="text-red-600 hover:text-red-800 font-semibold px-2 py-0.5 rounded hover:bg-white transition-colors cursor-pointer"
                    >
                      {t("removeFile")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-1 h-4 w-4 rounded border-[#E1E7E8] text-[#147D78] focus:ring-[#147D78] shrink-0 cursor-pointer"
            />
            <span className="text-xs text-[#647580] leading-relaxed">
              {t("consentText")}
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-red-500 font-medium mt-1">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {/* Submission Actions */}
      <div className="pt-6 border-t border-[#E1E7E8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs text-[#247A52] font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>
            {locale === "bn"
              ? "২৫৬-বিট এনক্রিপশন ও সরাসরি হাসপাতাল সমন্বয়"
              : "256-bit Encrypted & Confidential Hospital Facilitation"}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#102D46] hover:bg-[#183F5B] text-white font-semibold rounded-md text-sm transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? t("submittingBtn") : t("submitBtn")}
        </button>
      </div>
    </form>
  );
}
