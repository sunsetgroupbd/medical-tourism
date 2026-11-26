import { Specialty } from "@/types";
import { specialtiesData } from "@/mocks/data";

/**
 * Fetch all medical specialties supported by Sun Breeze Healthcare
 */
export async function getSpecialties(): Promise<Specialty[]> {
  return specialtiesData;
}

/**
 * Fetch a medical specialty by slug (e.g. 'cardiac-care', 'cancer-treatment')
 */
export async function getSpecialtyBySlug(slug: string): Promise<Specialty | undefined> {
  return specialtiesData.find(
    (spec) => spec.slug.toLowerCase() === slug.toLowerCase()
  );
}
