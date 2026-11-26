import { Hospital } from "@/types";
import { allHospitalsRaw } from "@/mocks/data";

/**
 * MANDATORY BUSINESS RULE:
 * Only return hospitals where verified === true.
 * Verification filtering is strictly enforced at the data/service layer.
 */
export async function getHospitals(): Promise<Hospital[]> {
  return allHospitalsRaw.filter((hospital) => hospital.verified === true);
}

/**
 * Fetch a verified hospital by slug
 */
export async function getHospitalBySlug(slug: string): Promise<Hospital | undefined> {
  const verifiedList = await getHospitals();
  return verifiedList.find((h) => h.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Fetch verified hospitals located in a specific country
 */
export async function getHospitalsByCountry(country: string): Promise<Hospital[]> {
  const verifiedList = await getHospitals();
  return verifiedList.filter(
    (h) => h.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Fetch verified hospitals providing a specific medical specialty
 */
export async function getHospitalsBySpecialty(specialtyName: string): Promise<Hospital[]> {
  const verifiedList = await getHospitals();
  const query = specialtyName.toLowerCase().replace("treatment", "").replace("care", "").trim();

  return verifiedList.filter((h) =>
    h.specialties.some((s) => {
      const spec = s.toLowerCase();
      return (
        spec.includes(query) ||
        query.includes(spec) ||
        (query.includes("cardiac") && spec.includes("cardiac")) ||
        (query.includes("cancer") && spec.includes("cancer")) ||
        (query.includes("kidney") && spec.includes("kidney")) ||
        (query.includes("neuro") && spec.includes("neuro")) ||
        (query.includes("ortho") && spec.includes("ortho")) ||
        (query.includes("liver") && spec.includes("liver")) ||
        (query.includes("ivf") && spec.includes("ivf"))
      );
    })
  );
}
