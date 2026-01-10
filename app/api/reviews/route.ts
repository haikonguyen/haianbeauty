import { NextResponse } from "next/server";
import type {
  GooglePlaceDetails,
  ReviewsResponse,
} from "@/features/reviews/types";

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

// Cache configuration - separate cache per language
const cachedReviews: Record<string, GooglePlaceDetails | null> = {};
const cacheTimestamps: Record<string, number> = {};
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function GET(request: Request) {
  try {
    // Extract language from query params
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    // Validate environment variables
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
      return NextResponse.json<ReviewsResponse>(
        {
          success: false,
          error: "Google Places API credentials not configured",
        },
        { status: 500 },
      );
    }

    // Return cached data if still valid for this language
    const now = Date.now();
    if (
      cachedReviews[lang] &&
      cacheTimestamps[lang] &&
      now - cacheTimestamps[lang] < CACHE_DURATION
    ) {
      return NextResponse.json<ReviewsResponse>({
        success: true,
        data: cachedReviews[lang],
      });
    }

    // Fetch from Google Places API with language-specific translations
    // Using languageCode parameter ensures reviews are translated to the requested language
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

    // Add languageCode parameter to URL for proper translation
    const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=${lang}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": fields,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places API error:", errorText);
      return NextResponse.json<ReviewsResponse>(
        {
          success: false,
          error: `Google Places API error: ${response.status}`,
        },
        { status: response.status },
      );
    }

    const data: GooglePlaceDetails = await response.json();

    // Ensure we have reviews and sort them by date
    if (data.reviews && data.reviews.length > 0) {
      data.reviews = data.reviews
        .filter((review) => review.rating >= 4)
        .sort((a, b) => {
          const timeA = new Date(a.publishTime || 0).getTime();
          const timeB = new Date(b.publishTime || 0).getTime();
          return timeB - timeA;
        })
        .slice(0, 3); // Show only 3 latest reviews for consistency
    }

    // Cache the successful response for this language
    cachedReviews[lang] = data;
    cacheTimestamps[lang] = now;

    return NextResponse.json<ReviewsResponse>({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json<ReviewsResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
