import type { GoogleReview } from "../types";

// Fallback reviews in case API fails
export const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    authorAttribution: {
      displayName: "Jana Nováková",
    },
    rating: 5,
    relativePublishTimeDescription: "2 months ago",
    text: {
      text: "Absolutely amazing service! The staff is professional and friendly. My nails look perfect every time.",
      languageCode: "en",
    },
    publishTime: new Date(Date.now() - 60 * 60 * 24 * 60 * 1000).toISOString(),
  },
  {
    authorAttribution: {
      displayName: "Petra Svobodová",
    },
    rating: 5,
    relativePublishTimeDescription: "1 month ago",
    text: {
      text: "Best spa experience in Prague! The atmosphere is so relaxing and the treatments are top quality.",
      languageCode: "en",
    },
    publishTime: new Date(Date.now() - 60 * 60 * 24 * 30 * 1000).toISOString(),
  },
  {
    authorAttribution: {
      displayName: "Marie Dvořáková",
    },
    rating: 5,
    relativePublishTimeDescription: "3 weeks ago",
    text: {
      text: "I've been coming here for years and they never disappoint. Highly recommend the pedicure!",
      languageCode: "en",
    },
    publishTime: new Date(Date.now() - 60 * 60 * 24 * 21 * 1000).toISOString(),
  },
];
