import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getHospitalBySlug, getHospitals } from "@/lib/api/hospitals";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Phone, Mail, Clock } from "lucide-react";
import { routing } from "@/i18n/routing";

interface HospitalDetailsPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const hospitals = await getHospitals();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const hospital of hospitals) {
      params.push({
        locale,
        slug: hospital.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: HospitalDetailsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const hospital = await getHospitalBySlug(slug);

  if (!hospital) {
    return {
      title: "Hospital Not Found | Sun Breeze Healthcare",
    };
  }

  const name = (locale === "bn" && hospital.nameBn) ? hospital.nameBn : hospital.name;
  const city = (locale === "bn" && hospital.cityBn) ? hospital.cityBn : hospital.city;
  const country = (locale === "bn" && hospital.countryBn) ? hospital.countryBn : hospital.country;

  return {
    title: `${name} (${city}, ${country}) | Verified Partner | Sun Breeze Healthcare`,
    description: locale === "bn" ? hospital.descriptionBn : hospital.description,
  };
}

export default async function HospitalDetailsPage({
  params,
}: HospitalDetailsPageProps) {
  const { locale, slug } = await params;
  const hospital = await getHospitalBySlug(slug);

  if (!hospital) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "hospitalDetails" });

  const name = (locale === "bn" && hospital.nameBn) ? hospital.nameBn : hospital.name;
  const city = (locale === "bn" && hospital.cityBn) ? hospital.cityBn : hospital.city;
  const country = (locale === "bn" && hospital.countryBn) ? hospital.countryBn : hospital.country;
  const description = locale === "bn" ? hospital.descriptionBn : hospital.description;
  const specialties = locale === "bn" ? hospital.specialtiesBn : hospital.specialties;

  // Hospital-specific FAQ entries
  const hospitalFaqs = [
    {
      id: "faq-language",
      question: locale === "bn"
        ? `${name}-এ কি বাংলা বা ইংরেজি অনুবাদক সেবা পাওয়া যায়?`
        : `Are Bengali and English language translation services available at ${name}?`,
      answer: locale === "bn"
        ? `হ্যাঁ, সান ব্রীজ হেলথকেয়ারের মাধ্যমে আন্তর্জাতিক রোগী বিভাগে বাংলা ও ইংরেজি সমন্বয়কারী এবং ডেডিকেটেড ইন্টারপ্রেটার সহায়তা নিশ্চিত করা হয়। ডাক্তার কনসালটেশন থেকে শুরু করে রিপোর্ট ব্যাখ্যায় আপনি সার্বক্ষণিক সহায়তা পাবেন।`
        : `Yes. Sun Breeze Healthcare arranges dedicated international patient coordinators and interpreters for clear communication throughout consultations, investigations, and hospital admissions.`,
    },
    {
      id: "faq-payment",
      question: locale === "bn"
        ? `চিকিৎসার ফি বা পেমেন্ট কীভাবে পরিশোধ করতে হয়?`
        : `How are treatment fees and hospital bills paid?`,
      answer: locale === "bn"
        ? `রোগী সরাসরি হাসপাতালের অফিসিয়াল ক্যাশ কাউন্টার বা অনুমোদিত আন্তর্জাতিক ব্যাংক রেমিট্যান্সের মাধ্যমে পরিশোধ করেন। কোনো মধ্যস্থতাকারী ফি বা অতিরিক্ত চার্জ নেওয়া হয় না।`
        : `Patients pay all treatment expenses directly to the hospital billing desk or via authorized institutional international bank remittance at official hospital tariff rates. There are zero agent markups.`,
    },
    {
      id: "faq-visa",
      question: locale === "bn"
        ? `মেডিকেল ভিসা ইনভিটেশন লেটার পেতে কতদিন সময় লাগে?`
        : `How long does it take to obtain a Medical Visa Invitation Letter?`,
      answer: locale === "bn"
        ? `আপনার সর্বশেষ মেডিকেল রেকর্ড এবং পাসপোর্ট কপি জমা দেওয়ার পর সংশ্লিষ্ট বিশেষজ্ঞ চিকিৎসকের অনুমোদন সাপেক্ষে ৪৮ থেকে ৭২ কার্যঘণ্টার মধ্যে অফিসিয়াল ভিসা ইনভিটেশন লেটার সরবরাহ করা হয়।`
        : `Upon submission of your recent medical records and passport copies, official Medical Visa Invitation letters are issued by the hospital within 48 to 72 business hours following clinical assessment.`,
    },
    {
      id: "faq-accommodation",
      question: locale === "bn"
        ? `রোগীর সাথে পরিবারের সদস্যদের থাকার ব্যবস্থা কীভাবে সমন্বয় করা হয়?`
        : `How is accommodation coordinated for patient attendants and family?`,
      answer: locale === "bn"
        ? `হাসপাতালের নিজস্ব আন্তর্জাতিক গেস্ট স্যুট অথবা হাসপাতালের সংলগ্ন নিরাপদ পার্টনার হোটেল ও সার্ভিসড অ্যাপার্টমেন্টে সাশ্রয়ী থাকার ব্যবস্থা সান ব্রীজ টিম আগে থেকেই নিশ্চিত করে।`
        : `Sun Breeze Healthcare assists in booking patient attendant suites within the hospital or partner serviced apartments and hotels within walking distance of the facility.`,
    },
  ];

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-8 lg:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#647580]">
          <Link href={`/${locale}`} className="hover:text-[#102D46]">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/hospitals`} className="hover:text-[#102D46]">
            {locale === "bn" ? "যাচাইকৃত হাসপাতাল" : "Hospitals"}
          </Link>
          <span>/</span>
          <span className="text-[#172B3A] font-medium truncate max-w-xs sm:max-w-md">
            {name}
          </span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white border border-[#E1E7E8] rounded-lg overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Header / Photo */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] bg-[#102D46]">
              <Image
                src={hospital.image}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102D46]/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <Badge variant="verified" size="md">
                  <svg className="w-3.5 h-3.5 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t("verifiedPartnerBadge")}
                </Badge>
              </div>
            </div>

            {/* Information & Action Header */}
            <div className="lg:col-span-6 p-6 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#147D78] uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{city}, {country}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172B3A] tracking-tight leading-tight">
                  {name}
                </h1>

                <p className="text-sm sm:text-base text-[#647580] leading-relaxed">
                  {description}
                </p>

                {/* Accreditations & Key Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E1E7E8]">
                  {hospital.accreditations && hospital.accreditations.length > 0 && (
                    <div className="bg-[#F3F6F5] p-3 rounded border border-[#E1E7E8]">
                      <div className="text-[11px] uppercase tracking-wider text-[#647580] font-semibold">
                        {t("accreditations")}
                      </div>
                      <div className="text-xs font-bold text-[#172B3A] mt-1">
                        {hospital.accreditations.join(", ")}
                      </div>
                    </div>
                  )}

                  {hospital.bedCount && (
                    <div className="bg-[#F3F6F5] p-3 rounded border border-[#E1E7E8]">
                      <div className="text-[11px] uppercase tracking-wider text-[#647580] font-semibold">
                        {t("capacity")}
                      </div>
                      <div className="text-xs font-bold text-[#172B3A] mt-1">
                        {locale === "bn" ? `${hospital.bedCount}+ শয্যা` : `${hospital.bedCount}+ Beds`}
                      </div>
                    </div>
                  )}

                  {hospital.establishedYear && (
                    <div className="bg-[#F3F6F5] p-3 rounded border border-[#E1E7E8]">
                      <div className="text-[11px] uppercase tracking-wider text-[#647580] font-semibold">
                        {t("established")}
                      </div>
                      <div className="text-xs font-bold text-[#172B3A] mt-1">
                        {hospital.establishedYear}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E1E7E8] flex flex-col sm:flex-row gap-3">
                <Button
                  href={`/${locale}/inquiry?hospital=${encodeURIComponent(hospital.slug)}`}
                  variant="teal"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {t("requestCaseReviewCTA")}
                </Button>

                <Button
                  href={`/${locale}/contact?hospital=${encodeURIComponent(hospital.slug)}`}
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {t("speakWithCoordinator")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Centers of Excellence & Key Specialties */}
            <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-[#E1E7E8] pb-4">
                <h2 className="text-xl font-bold text-[#172B3A]">
                  {t("centersOfExcellenceTitle")}
                </h2>
                <p className="text-xs text-[#647580] mt-1">
                  {t("centersOfExcellenceDesc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialties.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-3 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md hover:border-[#147D78]/40 transition-colors"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#147D78] mr-3 shrink-0" />
                    <span className="text-sm font-semibold text-[#172B3A]">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Senior Medical Faculty & Specialists */}
            {hospital.featuredDoctors && hospital.featuredDoctors.length > 0 && (
              <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-6 shadow-2xs">
                <div className="border-b border-[#E1E7E8] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#172B3A]">
                      {t("leadingSpecialistsTitle")}
                    </h2>
                    <p className="text-xs text-[#647580] mt-1">
                      {t("leadingSpecialistsDesc")}
                    </p>
                  </div>
                  <Badge variant="verified" size="sm">
                    {locale === "bn" ? "ভেরিফায়েড ফ্যাকাল্টি" : "Verified Faculty"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.featuredDoctors.map((doc, idx) => {
                    const docName = locale === "bn" ? doc.nameBn : doc.name;
                    const docTitle = locale === "bn" ? doc.titleBn : doc.title;
                    const docSpec = locale === "bn" ? doc.specialtyBn : doc.specialty;
                    const docExp = locale === "bn" ? doc.experienceBn : doc.experience;

                    return (
                      <div
                        key={idx}
                        className="bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg p-4 flex space-x-4 items-start"
                      >
                        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#102D46]/10 border border-[#E1E7E8]">
                          <Image
                            src={doc.image}
                            alt={docName}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#172B3A] truncate">
                            {docName}
                          </h4>
                          <p className="text-xs font-medium text-[#147D78] truncate">
                            {docSpec}
                          </p>
                          <p className="text-[11px] text-[#647580] line-clamp-1">
                            {docTitle}
                          </p>
                          <div className="pt-1 text-[11px] text-[#647580] font-medium">
                            {docExp}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* International Patient Care & Amenities */}
            <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-[#E1E7E8] pb-4">
                <h2 className="text-xl font-bold text-[#172B3A]">
                  {t("internationalServicesTitle")}
                </h2>
                <p className="text-xs text-[#647580] mt-1">
                  {t("internationalServicesDesc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-1.5">
                  <div className="font-semibold text-sm text-[#172B3A] flex items-center space-x-2">
                    <span className="text-[#147D78] font-bold">1.</span>
                    <span>{locale === "bn" ? "অনুবাদক ও ভাষা সমন্বয়" : "Interpreter & Language Support"}</span>
                  </div>
                  <p className="text-xs text-[#647580] leading-relaxed">
                    {locale === "bn"
                      ? "ডাক্তার ভিজিট, মেডিকেল রিপোর্ট এবং ভর্তি প্রক্রিয়া চলাকালীন বাংলা ও ইংরেজি দ্বিভাষিক সহায়তা।"
                      : "Native Bengali and English medical translation throughout specialist reviews and procedures."}
                  </p>
                </div>

                <div className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-1.5">
                  <div className="font-semibold text-sm text-[#172B3A] flex items-center space-x-2">
                    <span className="text-[#147D78] font-bold">2.</span>
                    <span>{locale === "bn" ? "অফিসিয়াল ভিসা আমন্ত্রণ" : "Official Visa Invitation"}</span>
                  </div>
                  <p className="text-xs text-[#647580] leading-relaxed">
                    {locale === "bn"
                      ? "রোগী ও সহযোগীর জন্য সংশ্লিষ্ট দূতাবাস অনুমোদিত অফিসিয়াল মেডিকেল ভিসা ইনভিটেশন লেটার।"
                      : "Official hospital-issued visa endorsement letters for expedited medical visa processing."}
                  </p>
                </div>

                <div className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-1.5">
                  <div className="font-semibold text-sm text-[#172B3A] flex items-center space-x-2">
                    <span className="text-[#147D78] font-bold">3.</span>
                    <span>{locale === "bn" ? "এয়ারপোর্ট পিক-আপ ও ট্রান্সফার" : "Airport Reception & Transfer"}</span>
                  </div>
                  <p className="text-xs text-[#647580] leading-relaxed">
                    {locale === "bn"
                      ? "বিমানবন্দরে সরাসরি অভ্যর্থনা এবং ডেডিকেটেড অ্যাম্বুলেন্স বা প্রাইভেট কার যোগে হাসপাতালে স্থানান্তর।"
                      : "Direct tarmac/arrival reception with private patient vehicle or ambulance transfer."}
                  </p>
                </div>

                <div className="p-4 bg-[#F3F6F5] border border-[#E1E7E8] rounded-lg space-y-1.5">
                  <div className="font-semibold text-sm text-[#172B3A] flex items-center space-x-2">
                    <span className="text-[#147D78] font-bold">4.</span>
                    <span>{locale === "bn" ? "হালাল খাবার ও প্রার্থনা সুবিধা" : "Dietary & Prayer Facilities"}</span>
                  </div>
                  <p className="text-xs text-[#647580] leading-relaxed">
                    {locale === "bn"
                      ? "সার্টিফাইড হালাল খাবারের ব্যবস্থা এবং রোগীর পরিজনদের জন্য নির্ধারিত প্রার্থনা কক্ষ।"
                      : "Certified halal and custom inpatient dietary choices with dedicated multi-faith prayer spaces."}
                  </p>
                </div>
              </div>
            </section>

            {/* Admission Process Timeline */}
            <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-[#E1E7E8] pb-4">
                <h2 className="text-xl font-bold text-[#172B3A]">
                  {t("admissionWorkflowTitle")}
                </h2>
                <p className="text-xs text-[#647580] mt-1">
                  {t("admissionWorkflowDesc")}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: locale === "bn" ? "রেকর্ড পাঠানো ও ক্লিনিক্যাল পর্যালোচনা" : "Record Submission & Clinical Assessment",
                    desc: locale === "bn"
                      ? "আপনার সাম্প্রতিক রিপোর্ট আমাদের মেডিকেল প্যানেল সংশ্লিষ্ট হাসপাতালের সিনিয়র কনসালট্যান্টের কাছে পাঠান।"
                      : "Medical summaries are reviewed directly by the hospital's senior department chair.",
                  },
                  {
                    step: "02",
                    title: locale === "bn" ? "চিকিৎসার পরিকল্পনা ও কোটেশন (৪৮–৭২ ঘণ্টা)" : "Treatment Plan & Direct Quotation (48–72h)",
                    desc: locale === "bn"
                      ? "হাসপাতাল থেকে আনুষ্ঠানিক চিকিৎসা খরচ, সম্ভাব্য থাকার মেয়াদ এবং বিশেষজ্ঞের মতামত প্রদান করা হয়।"
                      : "Official hospital cost estimate, projected inpatient stay, and physician evaluation are delivered.",
                  },
                  {
                    step: "03",
                    title: locale === "bn" ? "ভিসা আমন্ত্রণ ও ভ্রমণ সমন্বয়" : "Visa Invitation & Travel Facilitation",
                    desc: locale === "bn"
                      ? "হাসপাতালের সিলমোহরযুক্ত ভিসা ইনভিটেশন লেটার এবং ফ্লাইট/হোটেল বুকিং সহায়তা প্রদান করা হয়।"
                      : "Official embassy-accredited invitation letters and seamless itinerary arrangements are completed.",
                  },
                  {
                    step: "04",
                    title: locale === "bn" ? "হাসপাতালে আগমন ও সরাসরি ভর্তি" : "Arrival & Fast-track Admission",
                    desc: locale === "bn"
                      ? "সান ব্রীজ আন্তর্জাতিক রোগী ডেস্ক দ্বারা দ্রুত রেজিস্ট্রেশন, ডাক্তারের সাথে বৈঠক এবং ইনপেশেন্ট ভর্তি নিশ্চিত করা হয়।"
                      : "VIP admission handling, priority specialist appointment, and seamless room allocation.",
                  },
                  {
                    step: "05",
                    title: locale === "bn" ? "ডিসচার্জ পরবর্তী ফলো-আপ ও রেকর্ড সংরক্ষণ" : "Post-discharge Coordination & Tele-consult",
                    desc: locale === "bn"
                      ? "দেশে ফিরে আসার পর ফলো-আপ কনসালটেশন এবং ডিজিটাল মেডিকেল রেকর্ড সুরক্ষিতভাবে সরবরাহ করা হয়।"
                      : "Ongoing follow-up teleconsultations with the treating consultant and permanent digital record archiving.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-4 items-start p-3 rounded bg-[#F3F6F5]/50 border border-[#E1E7E8]/60">
                    <span className="text-sm font-mono font-bold text-[#147D78] px-2 py-1 bg-[#147D78]/10 rounded shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#172B3A]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#647580] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hospital-Specific FAQ Accordion */}
            <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-[#E1E7E8] pb-4">
                <h2 className="text-xl font-bold text-[#172B3A]">
                  {t("hospitalFaqTitle")}
                </h2>
                <p className="text-xs text-[#647580] mt-1">
                  {t("hospitalFaqDesc")}
                </p>
              </div>

              <Accordion items={hospitalFaqs} />
            </section>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Direct Official Tariff Guarantee Box */}
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-4 shadow-2xs">
              <div className="flex items-center space-x-2 text-[#102D46] font-bold text-sm">
                <svg className="w-5 h-5 text-[#147D78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{t("tariffGuaranteeHeading")}</span>
              </div>

              <p className="text-xs text-[#647580] leading-relaxed">
                {t("tariffGuaranteeBody")}
              </p>

              <div className="bg-[#F3F6F5] p-3 rounded text-xs space-y-1.5 border border-[#E1E7E8]">
                <div className="flex justify-between text-[#647580]">
                  <span>{locale === "bn" ? "এজেন্ট কমিশন ফি" : "Agency Surcharge"}</span>
                  <span className="font-semibold text-[#247A52]">0 BDT</span>
                </div>
                <div className="flex justify-between text-[#647580]">
                  <span>{locale === "bn" ? "কেস রিভিউ ও সমন্বয়" : "Case Review & Coordination"}</span>
                  <span className="font-semibold text-[#247A52]">0 BDT</span>
                </div>
                <div className="flex justify-between text-[#172B3A] font-bold pt-1.5 border-t border-[#E1E7E8]">
                  <span>{locale === "bn" ? "হাসপাতাল বিলিং" : "Hospital Billing"}</span>
                  <span>{locale === "bn" ? "অফিসিয়াল ট্যারিফ" : "Direct Hospital Rate"}</span>
                </div>
              </div>

              <Button
                href={`/${locale}/inquiry?hospital=${encodeURIComponent(hospital.slug)}`}
                variant="teal"
                size="md"
                className="w-full"
              >
                {t("requestCaseReviewCTA")}
              </Button>
            </div>

            {/* Direct Patient Desk Card */}
            <div className="bg-[#102D46] text-white rounded-lg p-6 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#147D78]">
                {locale === "bn" ? "সরাসরি যোগাযোগ ডেস্ক" : "Direct Patient Desk"}
              </div>

              <h3 className="text-lg font-bold leading-snug">
                {locale === "bn"
                  ? "চিকিৎসা সংক্রান্ত যে কোনো তথ্যের জন্য আমাদের সাথে কথা বলুন"
                  : "Need assistance with your medical reports or visa?"}
              </h3>

              <div className="space-y-2 text-xs text-white/80">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#147D78] shrink-0" />
                  <span className="font-mono text-white font-semibold">+880 1730 000000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#147D78] shrink-0" />
                  <span>inquiry@sunbreezehealthcare.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#147D78] shrink-0" />
                  <span>{locale === "bn" ? "প্রতিদিন সকাল ৯টা – রাত ৯টা (বাংলাদেশ সময়)" : "Daily 9:00 AM – 9:00 PM (BST)"}</span>
                </div>
              </div>

              <Button
                href={`/${locale}/contact`}
                variant="outline"
                size="sm"
                className="w-full text-xs text-white border-white/40 hover:bg-white/10"
              >
                {locale === "bn" ? "যোগাযোগের বিবরণ দেখুন" : "View Contact Details"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
