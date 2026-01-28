import { CALCOM_CONFIG } from "@/lib/constants";

/**
 * Generates a Cal.com booking URL for a specific service
 * @param eventSlug - The Cal.com event type slug (e.g., "manicure-shellac")
 * @returns Full Cal.com booking URL
 */
export function getCalcomUrl(eventSlug: string): string {
  const { username, teamSlug, baseUrl } = CALCOM_CONFIG;

  if (!baseUrl) {
    console.warn("Cal.com URL not configured");
    return "#";
  }

  // Use team booking if teamSlug is set (paid feature)
  // Otherwise use personal booking (free)
  if (teamSlug) {
    return `${baseUrl}/team/${teamSlug}/${eventSlug}`;
  }

  if (username) {
    return `${baseUrl}/${username}/${eventSlug}`;
  }

  console.warn("Cal.com username or team slug not configured");
  return "#";
}

/**
 * Generates Cal.com embed configuration for React
 * @param eventSlug - The Cal.com event type slug
 * @returns Embed configuration object
 */
export function getCalcomEmbedConfig(eventSlug: string) {
  const { username, teamSlug } = CALCOM_CONFIG;

  // Use team or personal link depending on configuration
  const calLink = teamSlug
    ? `team/${teamSlug}/${eventSlug}`
    : `${username}/${eventSlug}`;

  return {
    calLink,
    config: {
      layout: "month_view" as const,
      theme: "light" as const,
    },
  };
}
