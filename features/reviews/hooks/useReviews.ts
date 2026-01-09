"use client";

import { useEffect, useState } from "react";
import { FALLBACK_REVIEWS } from "../data/reviews";
import type { GooglePlaceDetails } from "../types";

export function useReviews(locale: string = "en") {
  const [data, setData] = useState<GooglePlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/reviews?lang=${locale}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          // Use fallback reviews if API fails
          setData({
            displayName: { text: "HaiAn Beauty", languageCode: "en" },
            rating: 4.9,
            userRatingCount: FALLBACK_REVIEWS.length,
            reviews: FALLBACK_REVIEWS,
          });
          setError(result.error || "Failed to fetch reviews");
        }
      } catch (err) {
        // Use fallback reviews on error
        setData({
          displayName: { text: "HaiAn Beauty", languageCode: "en" },
          rating: 4.9,
          userRatingCount: FALLBACK_REVIEWS.length,
          reviews: FALLBACK_REVIEWS,
        });
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [locale]);

  return { data, loading, error };
}
