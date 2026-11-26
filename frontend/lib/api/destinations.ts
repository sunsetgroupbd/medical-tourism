import { Destination } from "@/types";
import { destinationsData, getDestinationBySlug as findDestinationBySlug } from "@/mocks/data";

/**
 * Fetch all supported international healthcare destinations
 */
export async function getDestinations(): Promise<Destination[]> {
  // Simulating async API call
  return destinationsData;
}

/**
 * Fetch destination details by country slug (e.g. 'thailand', 'singapore')
 */
export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  return findDestinationBySlug(slug);
}
