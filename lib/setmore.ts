/**
 * Setmore booking configuration
 * This is an interim solution before migrating to Cal.com
 */

export const SETMORE_BASE_URL = "https://anbeauty.setmore.com/";

/**
 * Get the Setmore booking URL for a specific service
 * Currently returns the general booking URL for all services
 *
 * @param serviceId - Optional service ID for future service-specific booking
 * @returns Setmore booking URL
 */
export function getSetmoreBookingUrl(_serviceId?: string): string {
  // For now, return the general booking URL
  // In the future, this can be extended to support service-specific URLs:
  // return serviceId ? `${SETMORE_BASE_URL}bookappointment/${serviceId}` : SETMORE_BASE_URL;
  return SETMORE_BASE_URL;
}
