import { CALCOM_CONFIG } from "./constants";

/**
 * Cal.com booking configuration
 * Replaces the old Setmore integration
 */

/**
 * Get the Cal.com booking URL for a specific event or general booking page
 *
 * @param eventSlug - Optional Cal.com event type slug (e.g., "manicure-shellac-gellac-polish")
 * @returns Cal.com booking URL
 */
export function getCalcomBookingUrl(eventSlug?: string): string {
  const { baseUrl, username } = CALCOM_CONFIG;

  if (!username) {
    console.warn("NEXT_PUBLIC_CALCOM_USERNAME is not set");
    return baseUrl;
  }

  // If event slug is provided, return specific event URL
  if (eventSlug) {
    return `${baseUrl}/${username}/${eventSlug}`;
  }

  // Otherwise return general booking page
  return `${baseUrl}/${username}`;
}

/**
 * Get the Cal.com embed configuration for a specific event
 *
 * @param eventSlug - Cal.com event type slug
 * @returns Cal.com embed configuration
 */
export function getCalcomEmbedConfig(eventSlug: string) {
  const { username } = CALCOM_CONFIG;

  return {
    calLink: `${username}/${eventSlug}`,
    config: {
      layout: "month_view" as const,
      theme: "light" as const,
    },
  };
}
