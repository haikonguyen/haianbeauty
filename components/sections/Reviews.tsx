"use client";

import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import type { GoogleReview } from "@/features/reviews/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "fill-spa-gold text-spa-gold"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const authorName = review.authorAttribution.displayName;
  const authorPhoto = review.authorAttribution.photoUri;
  const reviewText = review.text.text;
  const publishTime = review.relativePublishTimeDescription;

  return (
    <Card className="h-full border-spa-cream/50 transition-all duration-300 hover:border-sage-green/50 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {authorPhoto ? (
              <Image
                src={authorPhoto}
                alt={authorName}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-green/10 font-semibold text-sage-green">
                {authorName.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-forest-green">{authorName}</h4>
              <p className="text-charcoal/60 text-sm">{publishTime}</p>
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} />
        <p className="mt-4 text-charcoal/80 leading-relaxed">{reviewText}</p>
      </CardContent>
    </Card>
  );
}

export function Reviews() {
  const t = useTranslations("reviews");
  const { data, loading } = useReviews();

  if (loading) {
    return (
      <section className="bg-spa-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-sage-green border-t-transparent" />
            <p className="mt-4 text-charcoal/70">{t("loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!data || !data.reviews || data.reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="bg-spa-cream/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 animate-slide-up text-center">
          <h2 className="mb-4 font-bold text-4xl text-forest-green sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/70 text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews
            ?.filter((review) => review.rating >= 4)
            .slice(0, 6)
            .map((review, index) => (
              <div
                key={review.publishTime || `review-${index}`}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-spa-gold text-white hover:bg-spa-gold/90"
          >
            <a
              href="https://www.google.com/maps/place/HaiAn+Beauty/@50.04513,14.4049379,13z/data=!4m8!3m7!1s0x470b95002cae8d69:0xbd4c11ac833e9cc0!8m2!3d50.0651626!4d14.4295204!9m1!1b1!16s%2Fg%2F11xfkptm1y?entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              {t("writeReview")}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
