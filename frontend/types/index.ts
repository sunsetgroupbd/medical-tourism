export interface HospitalDoctor {
  name: string;
  nameBn: string;
  title: string;
  titleBn: string;
  specialty: string;
  specialtyBn: string;
  experience: string;
  experienceBn: string;
  verified: boolean;
  image: string;
}

export interface HospitalAmenity {
  name: string;
  nameBn: string;
  iconName: string;
}

export interface HospitalAdmissionStep {
  step: number;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  country: string;
  countryBn?: string;
  countryCode: string;
  city: string;
  cityBn?: string;
  address: string;
  addressBn: string;
  image: string;
  heroImage: string;
  verified: boolean; // MANDATORY BUSINESS RULE: Only show where verified === true
  specialties: string[];
  specialtiesBn: string[];
  accreditations: string[];
  description: string;
  descriptionBn: string;
  fullOverview: string;
  fullOverviewBn: string;
  features: string[];
  featuresBn: string[];
  establishedYear: number;
  bedCount: number;
  doctorsCount: number;
  amenities: HospitalAmenity[];
  featuredDoctors: HospitalDoctor[];
  startingPrice?: string; // If undefined, UI shows "Contact us for quotation"
  admissionProcess: HospitalAdmissionStep[];
  faq: {
    q: string;
    qBn: string;
    a: string;
    aBn: string;
  }[];
}

export interface InquiryFile {
  name: string;
  size: number;
  type: string;
}

export interface PortalCaseCoordinator {
  name: string;
  nameBn: string;
  title: string;
  titleBn: string;
  phone: string;
  whatsapp: string;
  image: string;
}

export interface PortalCaseQuotation {
  hospitalName: string;
  hospitalNameBn: string;
  country: string;
  countryBn: string;
  specialty: string;
  specialtyBn: string;
  recommendedDoctor: string;
  recommendedDoctorBn: string;
  doctorOpinion: string;
  doctorOpinionBn: string;
  estimatedCostUsd: string;
  estimatedCostBdt: string;
  estimatedInpatientDays: number;
  estimatedOutpatientDays: number;
  visaInvitationStatus: "pending" | "issued" | "not_required";
  tariffNote: string;
  tariffNoteBn: string;
}

export interface PortalTimelineStep {
  step: number;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  date?: string;
  completed: boolean;
  current: boolean;
}

export interface InquirySubmission {
  id: string; // e.g. "SBH-2026-4821"
  createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  medicalCondition: string;
  preferredDestination?: string;
  preferredHospital?: string;
  preferredSpecialty?: string;
  additionalNotes?: string;
  consent: boolean;
  status: "submitted" | "in_review" | "quotation_ready" | "scheduled";
  files: InquiryFile[];
  timeline?: PortalTimelineStep[];
  coordinator?: PortalCaseCoordinator;
  quotation?: PortalCaseQuotation;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  nameBn: string;
  code: string;
  image: string;
  heroImage: string;
  summary: string;
  summaryBn: string;
  fullOverview: string;
  fullOverviewBn: string;
  popularSpecialties: string[];
  popularSpecialtiesBn: string[];
  flightDurationFromDhaka: string;
  flightDurationFromDhakaBn: string;
  visaAssistance: boolean;
  visaProcessingTime: string;
  visaProcessingTimeBn: string;
  currency: string;
  languages: string;
  bengaliInterpreterAvailable: boolean;
  verifiedHospitalsCount: number;
  clinicalHighlights: {
    title: string;
    titleBn: string;
    description: string;
    descriptionBn: string;
  }[];
  travelTips: {
    title: string;
    titleBn: string;
    desc: string;
    descBn: string;
  }[];
}

export interface SpecialtyProcedure {
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
}

export interface SpecialtyCondition {
  name: string;
  nameBn: string;
}

export interface SpecialtyRecordRequired {
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  nameBn: string;
  iconName: string;
  summary: string;
  summaryBn: string;
  fullDescription: string;
  fullDescriptionBn: string;
  heroImage: string;
  keyProcedures: string[];
  topCountries: {
    name: string;
    nameBn: string;
    slug: string;
  }[];
  advancedProcedures: SpecialtyProcedure[];
  commonConditions: SpecialtyCondition[];
  requiredRecords: SpecialtyRecordRequired[];
  specialtyFaq: {
    q: string;
    qBn: string;
    a: string;
    aBn: string;
  }[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientNameBn: string;
  treatment: string;
  treatmentBn: string;
  destination: string;
  hospitalName: string;
  quote: string;
  quoteBn: string;
  avatarUrl?: string;
  year: number;
  isDemo: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  category: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  iconName: string;
}
