import { NextResponse } from "next/server";
import type {
  GooglePlaceDetails,
  ReviewsResponse,
} from "@/features/reviews/types";

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

// Cache configuration
let cachedReviews: GooglePlaceDetails | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export async function GET() {
  try {
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

    // Return cached data if still valid
    const now = Date.now();
    if (cachedReviews && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json<ReviewsResponse>({
        success: true,
        data: cachedReviews,
      });
    }

    // Fetch from Google Places API
    const fields = ["displayName", "rating", "userRatingCount", "reviews"].join(
      ",",
    );

    const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`;

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

    // Cache the successful response
    cachedReviews = data;
    cacheTimestamp = now;

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
