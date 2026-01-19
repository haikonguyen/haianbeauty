import { NextResponse } from "next/server";
import type { ServiceCategory } from "@/features/services/types";

// Cal.com API configuration
const CALCOM_API_URL = "https://api.cal.eu/v2";
const CALCOM_API_VERSION = "2024-06-14";

interface CalcomEventType {
  id: number;
  title: string;
  slug: string;
  lengthInMinutes: number;
  price?: number;
  currency?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

interface CalcomApiResponse {
  status: string;
  data: CalcomEventType[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number;
  price: string;
  calcomEventType: string;
}

/**
 * Category mapping rules based on slug prefixes
 */
const CATEGORY_RULES: Record<ServiceCategory, string[]> = {
  nails: [
    "manicure-",
    "pedicure-",
    "nail-modeling-",
    "nail-refill-",
    "nail-decoration-",
  ],
  beauty: [
    "eyelash-extension-",
    "eyelash-refill-",
    "brows-lashes-",
    "eyelash-removal-",
    "eyelash-removal",
  ],
  laser: ["laser-epilation-"],
  skincare: ["skincare-"],
  "lifting-lamination": ["lifting-lamination-"],
  spa: ["spa-"],
  massage: ["massage-"],
};

/**
 * Determine category based on the slug prefix
 */
function getCategoryFromSlug(slug: string): ServiceCategory | null {
  for (const [category, prefixes] of Object.entries(CATEGORY_RULES)) {
    if (prefixes.some((prefix) => slug.startsWith(prefix))) {
      return category as ServiceCategory;
    }
  }
  return null;
}

/**
 * Fetch all event types from Cal.com API
 */
async function fetchCalcomEventTypes(): Promise<CalcomEventType[]> {
  const apiKey = process.env.CALCOM_API_KEY;

  if (!apiKey) {
    console.error("❌ CALCOM_API_KEY not configured");
    return [];
  }

  try {
    console.log(`🔄 Fetching event types from ${CALCOM_API_URL}/event-types`);

    const response = await fetch(`${CALCOM_API_URL}/event-types`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": CALCOM_API_VERSION,
      },
      // Disable Next.js caching for this fetch
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Cal.com API error: ${response.status} - ${errorText}`);
      throw new Error(`Cal.com API error: ${response.status}`);
    }

    const data: CalcomApiResponse = await response.json();
    console.log(
      `✅ Successfully fetched ${data.data?.length || 0} event types`,
    );
    return data.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch Cal.com event types:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return [];
  }
}

/**
 * Extract price from description markdown
 * Looks for patterns like "**Cena: 199 Kč**" or "Cena: 199 Kč"
 */
function extractPriceFromDescription(
  description: string | null | undefined,
): string | null {
  if (!description) return null;

  // Match patterns like "**Cena: XXX Kč**" or "Cena: XXX Kč" or "XXX Kč"
  const patterns = [
    /\*\*Cena:\s*(\d+(?:[\s,]\d{3})*)\s*Kč\*\*/i,
    /Cena:\s*(\d+(?:[\s,]\d{3})*)\s*Kč/i,
    /(\d+(?:[\s,]\d{3})*)\s*Kč/,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      // Clean up the number and format
      const numStr = match[1].replace(/[\s,]/g, "");
      return `${numStr} Kč`;
    }
  }

  return null;
}

/**
 * Transform the Cal.com event type to our Service format
 */
function transformEventType(event: CalcomEventType): Service | null {
  // Determine category from slug
  const category = getCategoryFromSlug(event.slug);

  // Only include events with a valid category
  if (!category) {
    return null;
  }

  // Try to extract price from the description first, then fall back to the API price field
  let price: string;
  const extractedPrice = extractPriceFromDescription(event.description);

  if (extractedPrice) {
    price = extractedPrice;
  } else if (event.price && event.price > 0) {
    price = `${event.price} ${event.currency?.toUpperCase() || "CZK"}`;
  } else {
    price = "Na dotaz"; // "On request" in Czech
  }

  // Clean description - remove the price line for a cleaner display
  let cleanDescription = event.description || "";
  cleanDescription = cleanDescription
    .replace(/\*\*Cena:.*?Kč\*\*\n*/gi, "")
    .replace(/Cena:.*?Kč\n*/gi, "")
    .trim();

  return {
    id: event.slug,
    slug: event.slug,
    name: event.title,
    category,
    description: cleanDescription,
    duration: event.lengthInMinutes,
    price,
    calcomEventType: event.slug,
  };
}

/**
 * Group services by category
 */
function groupByCategory(
  services: Service[],
): Record<ServiceCategory, Service[]> {
  const grouped: Partial<Record<ServiceCategory, Service[]>> = {};

  for (const service of services) {
    if (!grouped[service.category]) {
      grouped[service.category] = [];
    }
    grouped[service.category]?.push(service);
  }

  return grouped as Record<ServiceCategory, Service[]>;
}

/**
 * GET /api/services
 * Returns all services grouped by category
 */
export async function GET() {
  try {
    const eventTypes = await fetchCalcomEventTypes();

    // Transform and filter
    const services = eventTypes
      .map(transformEventType)
      .filter((service): service is Service => service !== null);

    // Group by category
    const servicesByCategory = groupByCategory(services);

    return NextResponse.json({
      success: true,
      data: {
        services,
        byCategory: servicesByCategory,
        total: services.length,
      },
    });
  } catch (error) {
    console.error("Error in /api/services:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 },
    );
  }
}
