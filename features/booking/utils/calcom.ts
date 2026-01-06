import { CALCOM_CONFIG } from "@/lib/constants";

/**
 * Generates a Cal.com booking URL for a specific service
 * @param eventType - The Cal.com event type slug (e.g., "classic-manicure")
 * @returns Full Cal.com booking URL
 */
export function getCalcomUrl(eventType: string): string {
  const { username, namespace, baseUrl } = CALCOM_CONFIG;

  if (!username) {
    console.warn(
      "Cal.com username not configured. Please set NEXT_PUBLIC_CALCOM_USERNAME in .env.local",
    );
    return "#";
  }

  const namespacePrefix = namespace ? `${namespace}/` : "";
  return `${baseUrl}/${namespacePrefix}${username}/${eventType}`;
}

/**
 * Generates Cal.com embed configuration
 * @param eventType - The Cal.com event type slug
 * @returns Embed configuration object
 */
export function getCalcomEmbedConfig(eventType: string) {
  return {
    calLink: getCalcomUrl(eventType),
    config: {
      layout: "month_view",
      theme: "light",
    },
  };
}
