import {
  InquirySubmission,
  InquiryFile,
  PortalTimelineStep,
  PortalCaseCoordinator,
  PortalCaseQuotation,
} from "@/types";

const STORAGE_KEY = "sbh_patient_inquiries";

// Default clinical coordinator for patient cases
export const DEFAULT_COORDINATOR: PortalCaseCoordinator = {
  name: "Dr. Farhana Rahman",
  nameBn: "ডা. ফারহানা রহমান",
  title: "Senior Medical Concierge Director",
  titleBn: "সিনিয়র মেডিকেল কনসিয়ার্জ ডিরেক্টর",
  phone: "+880 1730 000000",
  whatsapp: "+8801730000000",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
};

// Built-in verified sample cases for immediate review & portal testing
export const DEMO_PORTAL_CASES: InquirySubmission[] = [
  {
    id: "SBH-2026-1084",
    createdAt: "2026-11-20T08:30:00.000Z",
    fullName: "Mohammad Rafiqul Islam",
    phone: "+880 1711 987654",
    email: "rafiqul.islam@example.com",
    medicalCondition: "Severe Triple Vessel Coronary Artery Disease. Advised Coronary Artery Bypass Grafting (CABG).",
    preferredDestination: "thailand",
    preferredHospital: "bumrungrad-international-hospital",
    preferredSpecialty: "cardiac-care",
    additionalNotes: "Patient requires airport wheelchair assistance and halal dietary meal plan.",
    consent: true,
    status: "quotation_ready",
    files: [
      { name: "Coronary_Angiogram_Report_Nov2026.pdf", size: 3450000, type: "application/pdf" },
      { name: "Echocardiogram_Summary.pdf", size: 1820000, type: "application/pdf" },
      { name: "Recent_Blood_Biochemistry.jpg", size: 950000, type: "image/jpeg" },
    ],
    coordinator: {
      name: "Dr. Farhana Rahman",
      nameBn: "ডা. ফারহানা রহমান",
      title: "Senior Medical Concierge Director",
      titleBn: "সিনিয়র মেডিকেল কনসিয়ার্জ ডিরেক্টর",
      phone: "+880 1730 000000",
      whatsapp: "+8801730000000",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    },
    quotation: {
      hospitalName: "Bumrungrad International Hospital",
      hospitalNameBn: "বামরুনগ্রাদ ইন্টারন্যাশনাল হসপিটাল",
      country: "Thailand",
      countryBn: "থাইল্যান্ড",
      specialty: "Cardiac Surgery",
      specialtyBn: "কার্ডিয়াক সার্জারি",
      recommendedDoctor: "Dr. Prapas Voravitpisut",
      recommendedDoctorBn: "ডা. প্রাপাস ভোরাভিতপিসুত",
      doctorOpinion: "Patient is suitable for Off-Pump Coronary Artery Bypass (OPCAB) procedure. Expected ICU stay 2 days, standard inpatient room 4 days. Full pre-op workup scheduled upon arrival.",
      doctorOpinionBn: "রোগীর সাম্প্রতিক এনজিওগ্রাম পর্যালোচনায় অফ-পাম্প করোনারি আর্টারি বাইপাস (OPCAB) অপারেশনের পরামর্শ দেওয়া হয়েছে। আইসিইউ অবস্থান আনুমানিক ২ দিন এবং জেনারেল কেবিন ৪ দিন। হাসপাতালে পৌঁছানোর পর চূড়ান্ত প্রি-অপারেটিভ পরীক্ষা সম্পন্ন হবে।",
      estimatedCostUsd: "$14,500 - $16,000",
      estimatedCostBdt: "৳১৭,৪০,০০০ - ৳১৯,২০,০০০",
      estimatedInpatientDays: 6,
      estimatedOutpatientDays: 7,
      visaInvitationStatus: "issued",
      tariffNote: "Direct official Bumrungrad package tariff with zero agency markup. Billed directly by hospital cash desk.",
      tariffNoteBn: "বামরুনগ্রাদ হাসপাতালের সরাসরি অফিসিয়াল প্যাকেজ রেট। সান ব্রীজ হেলথকেয়ার কোনো অতিরিক্ত কমিশন বা সার্ভিস চার্জ গ্রহণ করে না।",
    },
    timeline: [
      {
        step: 1,
        title: "Medical Records Submitted",
        titleBn: "মেডিকেল রেকর্ড প্রাপ্তি ও রেজিস্ট্রেশন",
        description: "Case received, verified for clinical completeness, and encrypted in patient portal.",
        descriptionBn: "রোগীর প্রয়োজনীয় রিপোর্ট ও তথ্য সফলভাবে সিস্টেমে সংরক্ষিত এবং এনক্রিপ্ট করা হয়েছে।",
        date: "20 Nov 2026, 02:30 PM",
        completed: true,
        current: false,
      },
      {
        step: 2,
        title: "Clinical Triage & Specialist Review",
        titleBn: "বিশেষজ্ঞ চিকিৎসক দ্বারা কেস পর্যালোচনা",
        description: "Chief of Cardiothoracic Surgery at Bumrungrad Hospital reviewed angiogram files.",
        descriptionBn: "বামরুনগ্রাদ হাসপাতালের চিফ অব কার্ডিওথোরাসিক সার্জারি রোগীর রিপোর্ট বিস্তারিত পর্যালোচনা করেছেন।",
        date: "22 Nov 2026, 11:15 AM",
        completed: true,
        current: false,
      },
      {
        step: 3,
        title: "Official Treatment Plan & Quotation Ready",
        titleBn: "হাসপাতালের অফিসিয়াল চিকিৎসা পরিকল্পনা ও কোটেশন প্রস্তুত",
        description: "Direct hospital itemized estimate, physician recommendation, and length-of-stay delivered.",
        descriptionBn: "হাসপাতাল থেকে অফিসিয়াল খরচের হিসাব, প্রয়োজনীয় অবস্থান কাল ও চিকিৎসকের মূল্যায়ন প্রস্তুত।",
        date: "24 Nov 2026, 04:00 PM",
        completed: true,
        current: true,
      },
      {
        step: 4,
        title: "Medical Visa & Travel Coordination",
        titleBn: "ভিসা ইনভিটেশন লেটার ও ভ্রমণ প্রস্তুতি",
        description: "Official hospital embassy invitation letter issued. Ready for medical visa application.",
        descriptionBn: "হাসপাতাল থেকে থাই দূতাবাসের জন্য অফিসিয়াল মেডিকেল ভিসা ইনভিটেশন লেটার ইস্যু করা হয়েছে।",
        date: "Pending Confirmation",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: "SBH-2026-2491",
    createdAt: "2026-11-24T10:15:00.000Z",
    fullName: "Mrs. Nasreen Akhter",
    phone: "+880 1819 234567",
    email: "nasreen.a@example.com",
    medicalCondition: "Suspected stage II breast malignancy. Requested PET-CT staging, second surgical oncology opinion.",
    preferredDestination: "singapore",
    preferredHospital: "singapore-general-hospital",
    preferredSpecialty: "cancer-treatment",
    additionalNotes: "Requires daughter as medical escort. Prefers serviced apartment booking nearby.",
    consent: true,
    status: "in_review",
    files: [
      { name: "Mammography_Ultrasound_Biopsy.pdf", size: 4200000, type: "application/pdf" },
      { name: "Histopathology_Immunohistochemistry.pdf", size: 2100000, type: "application/pdf" },
    ],
    coordinator: {
      name: "Dr. Farhana Rahman",
      nameBn: "ডা. ফারহানা রহমান",
      title: "Senior Medical Concierge Director",
      titleBn: "সিনিয়র মেডিকেল কনসিয়ার্জ ডিরেক্টর",
      phone: "+880 1730 000000",
      whatsapp: "+8801730000000",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    },
    timeline: [
      {
        step: 1,
        title: "Medical Records Submitted",
        titleBn: "মেডিকেল রেকর্ড প্রাপ্তি ও রেজিস্ট্রেশন",
        description: "Case received, verified for clinical completeness, and encrypted in patient portal.",
        descriptionBn: "রোগীর প্রয়োজনীয় রিপোর্ট ও তথ্য সফলভাবে সিস্টেমে সংরক্ষিত এবং এনক্রিপ্ট করা হয়েছে।",
        date: "24 Nov 2026, 04:15 PM",
        completed: true,
        current: false,
      },
      {
        step: 2,
        title: "Clinical Triage & Specialist Review",
        titleBn: "বিশেষজ্ঞ চিকিৎসক দ্বারা কেস পর্যালোচনা",
        description: "SGH Department of Surgical Oncology reviewing biopsy and staging requirements.",
        descriptionBn: "সিঙ্গাপুর জেনারেল হাসপাতালের সার্জিক্যাল অনকোলজি বিভাগ হিস্টোপ্যাথলজি রিপোর্ট পর্যালোচনা করছে।",
        date: "In Progress (Estimated 24h)",
        completed: false,
        current: true,
      },
      {
        step: 3,
        title: "Official Treatment Plan & Quotation",
        titleBn: "হাসপাতালের অফিসিয়াল চিকিৎসা পরিকল্পনা ও কোটেশন",
        description: "Pending surgical panel consensus and diagnostic package breakdown.",
        descriptionBn: "সার্জনদের চূড়ান্ত পর্যালোচনা সাপেক্ষে আনুষ্ঠানিক প্যাকেজ কোটেশন প্রদান করা হবে।",
        completed: false,
        current: false,
      },
      {
        step: 4,
        title: "Medical Visa & Travel Coordination",
        titleBn: "ভিসা ইনভিটেশন লেটার ও ভ্রমণ প্রস্তুতি",
        description: "Expedited medical visa letter issued upon patient confirmation.",
        descriptionBn: "রোগীর সম্মতি সাপেক্ষে দূতাবাসের মেডিকেল ভিসা লেটার ইস্যু করা হবে।",
        completed: false,
        current: false,
      },
    ],
  },
];

export interface CreateInquiryInput {
  fullName: string;
  phone: string;
  email?: string;
  medicalCondition: string;
  preferredDestination?: string;
  preferredHospital?: string;
  preferredSpecialty?: string;
  additionalNotes?: string;
  consent: boolean;
  files: InquiryFile[];
}

export async function submitInquiry(
  input: CreateInquiryInput
): Promise<InquirySubmission> {
  // Simulate network latency for authentic concierge submission
  await new Promise((resolve) => setTimeout(resolve, 800));

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const currentYear = new Date().getFullYear();
  const id = `SBH-${currentYear}-${randomNum}`;
  const nowIso = new Date().toISOString();

  // Create default clinical timeline for fresh submission
  const defaultTimeline: PortalTimelineStep[] = [
    {
      step: 1,
      title: "Medical Records Submitted",
      titleBn: "মেডিকেল রেকর্ড প্রাপ্তি ও রেজিস্ট্রেশন",
      description: "Case received, verified for clinical completeness, and encrypted in patient portal queue.",
      descriptionBn: "আপনার প্রেরিত মেডিকেল রিপোর্ট ও শারীরিক বিবরণ সফলভাবে সংরক্ষিত এবং এনক্রিপ্ট করা হয়েছে।",
      date: "Just now",
      completed: true,
      current: false,
    },
    {
      step: 2,
      title: "Clinical Triage & Specialist Review",
      titleBn: "বিশেষজ্ঞ চিকিৎসক দ্বারা কেস পর্যালোচনা",
      description: "Our in-house clinical director reviews records and presents to partner hospital specialists.",
      descriptionBn: "আমাদের মেডিকেল বোর্ড রিপোর্ট যাচাই করে সংশ্লিষ্ট হাসপাতালের বিভাগীয় প্রধানের কাছে পাঠিয়েছেন।",
      date: "Underway (Expected within 24h)",
      completed: false,
      current: true,
    },
    {
      step: 3,
      title: "Official Treatment Plan & Quotation",
      titleBn: "হাসপাতালের অফিসিয়াল চিকিৎসা পরিকল্পনা ও কোটেশন",
      description: "Direct hospital cost estimate, projected duration, and treatment options provided.",
      descriptionBn: "হাসপাতালের সরাসরি খরচের হিসাব এবং চিকিৎসকের মূল্যায়ন প্রস্তুত করা হবে।",
      completed: false,
      current: false,
    },
    {
      step: 4,
      title: "Medical Visa & Travel Coordination",
      titleBn: "ভিসা ইনভিটেশন লেটার ও ভ্রমণ প্রস্তুতি",
      description: "Priority medical visa endorsement letter, flight booking, and hospital reception.",
      descriptionBn: "অফিসিয়াল মেডিকেল ভিসা ইনভিটেশন সংগ্রহ এবং এয়ারপোর্ট ট্রান্সফার ব্যবস্থা।",
      completed: false,
      current: false,
    },
  ];

  const submission: InquirySubmission = {
    ...input,
    id,
    createdAt: nowIso,
    status: "submitted",
    coordinator: DEFAULT_COORDINATOR,
    timeline: defaultTimeline,
  };

  if (typeof window !== "undefined") {
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: InquirySubmission[] = existingRaw
        ? JSON.parse(existingRaw)
        : [];
      const updated = [submission, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage fallback
    }
  }

  return submission;
}

export function getInquiryById(id: string): InquirySubmission | null {
  const cleanId = id.trim().toUpperCase();

  // Check demo cases first
  const demoMatch = DEMO_PORTAL_CASES.find((item) => item.id.toUpperCase() === cleanId);
  if (demoMatch) return demoMatch;

  if (typeof window === "undefined") return null;

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    if (!existingRaw) return null;
    const existing: InquirySubmission[] = JSON.parse(existingRaw);
    const found = existing.find((item) => item.id.toUpperCase() === cleanId);
    if (!found) return null;

    // Ensure timeline and coordinator exist if missing
    if (!found.coordinator) found.coordinator = DEFAULT_COORDINATOR;
    if (!found.timeline) {
      found.timeline = [
        {
          step: 1,
          title: "Medical Records Submitted",
          titleBn: "মেডিকেল রেকর্ড প্রাপ্তি ও রেজিস্ট্রেশন",
          description: "Case received, verified for clinical completeness, and encrypted in patient portal queue.",
          descriptionBn: "আপনার প্রেরিত মেডিকেল রিপোর্ট ও শারীরিক বিবরণ সফলভাবে সংরক্ষিত এবং এনক্রিপ্ট করা হয়েছে।",
          date: new Date(found.createdAt).toLocaleDateString(),
          completed: true,
          current: false,
        },
        {
          step: 2,
          title: "Clinical Triage & Specialist Review",
          titleBn: "বিশেষজ্ঞ চিকিৎসক দ্বারা কেস পর্যালোচনা",
          description: "Our in-house clinical director reviews records and presents to partner hospital specialists.",
          descriptionBn: "আমাদের মেডিকেল বোর্ড রিপোর্ট যাচাই করে সংশ্লিষ্ট হাসপাতালের বিভাগীয় প্রধানের কাছে পাঠিয়েছেন।",
          date: "In Review (Expected within 24h)",
          completed: false,
          current: true,
        },
        {
          step: 3,
          title: "Official Treatment Plan & Quotation",
          titleBn: "হাসপাতালের অফিসিয়াল চিকিৎসা পরিকল্পনা ও কোটেশন",
          description: "Direct hospital cost estimate, projected duration, and treatment options provided.",
          descriptionBn: "হাসপাতালের সরাসরি খরচের হিসাব এবং চিকিৎসকের মূল্যায়ন প্রস্তুত করা হবে।",
          completed: false,
          current: false,
        },
        {
          step: 4,
          title: "Medical Visa & Travel Coordination",
          titleBn: "ভিসা ইনভিটেশন লেটার ও ভ্রমণ প্রস্তুতি",
          description: "Priority medical visa endorsement letter, flight booking, and hospital reception.",
          descriptionBn: "অফিসিয়াল মেডিকেল ভিসা ইনভিটেশন সংগ্রহ এবং এয়ারপোর্ট ট্রান্সফার ব্যবস্থা।",
          completed: false,
          current: false,
        },
      ];
    }
    return found;
  } catch {
    return null;
  }
}

export function getRecentInquiries(): InquirySubmission[] {
  let userInquiries: InquirySubmission[] = [];
  if (typeof window !== "undefined") {
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      if (existingRaw) {
        userInquiries = JSON.parse(existingRaw);
      }
    } catch {
      // LocalStorage fallback
    }
  }

  // Combine user inquiries with demo cases (avoiding duplicates)
  const combined = [...userInquiries];
  for (const demo of DEMO_PORTAL_CASES) {
    if (!combined.some((item) => item.id.toUpperCase() === demo.id.toUpperCase())) {
      combined.push(demo);
    }
  }

  return combined;
}

export function addDocumentToInquiry(
  id: string,
  newFile: InquiryFile
): InquirySubmission | null {
  if (typeof window === "undefined") return null;
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: InquirySubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
    const index = existing.findIndex((item) => item.id.toUpperCase() === id.toUpperCase());

    if (index !== -1) {
      existing[index].files = [...existing[index].files, newFile];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      return existing[index];
    }
  } catch {
    // LocalStorage fallback
  }
  return null;
}
