export interface GoogleReview {
  authorAttribution: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  rating: number;
  relativePublishTimeDescription: string;
  text: {
    text: string;
    languageCode: string;
  };
  publishTime: string;
}

export interface GooglePlaceDetails {
  displayName?: {
    text: string;
    languageCode: string;
  };
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
}

export interface ReviewsResponse {
  success: boolean;
  data?: GooglePlaceDetails;
  error?: string;
}
