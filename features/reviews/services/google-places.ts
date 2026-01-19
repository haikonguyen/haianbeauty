import type { GooglePlaceDetails } from "../types";

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

export async function getGoogleReviews(
  lang = "en",
): Promise<GooglePlaceDetails | null> {
  // Validate environment variables
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    console.error("Google Places API credentials not configured");
    return null;
  }

  try {
    const fields = [
      "displayName",
      "rating",
      "userRatingCount",
      "reviews.rating",
      "reviews.text",
      "reviews.relativePublishTimeDescription",
      "reviews.publishTime",
      "reviews.authorAttribution",
    ].join(",");

    const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=${lang}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": fields,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(
        `Google Places API error: ${response.status} ${await response.text()}`,
      );
      return null;
    }

    const data: GooglePlaceDetails = await response.json();

    if (data.reviews && data.reviews.length > 0) {
      data.reviews = data.reviews
        .filter((review) => review.rating >= 4)
        .sort((a, b) => {
          const timeA = new Date(a.publishTime || 0).getTime();
          const timeB = new Date(b.publishTime || 0).getTime();
          return timeB - timeA;
        })
        .slice(0, 3);
    }

    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
}
