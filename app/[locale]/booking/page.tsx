"use client";

import { Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalcomEmbed } from "@/features/booking/components/CalcomEmbed";
import { getCalcomUrl } from "@/features/booking/utils/calcom";
import { SERVICES } from "@/features/services/data/services";

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const selectedService = serviceId
    ? SERVICES.find((s) => s.id === serviceId)
    : null;
  const t = useTranslations("booking");

  const tServices = useTranslations("services");

  return (
    <div className="min-h-screen bg-spa-cream/30 pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-fade-in text-center">
          <Calendar className="mx-auto mb-4 h-16 w-16 text-forest-green" />
          <h1 className="mb-4 font-bold text-4xl text-forest-green sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-charcoal/70 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {selectedService ? (
          <div className="mb-8 space-y-6">
            <Card className="animate-slide-up border-sage-green/30">
              <CardHeader>
                <CardTitle className="text-2xl text-forest-green">
                  {tServices(`items.${selectedService.id}.name`)}
                </CardTitle>
                <CardDescription className="text-base">
                  {tServices(`items.${selectedService.id}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <p className="text-charcoal/70 text-sm">
                      {tServices("duration")}: {selectedService.duration}{" "}
                      {tServices("common.min")}
                    </p>
                    <p className="font-semibold text-forest-green text-lg">
                      {tServices("price")}: {selectedService.price}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cal.com Embed Widget */}
            <Card className="animate-slide-up border-sage-green/30">
              <CardHeader>
                <CardTitle className="text-xl text-forest-green">
                  {t("title")}
                </CardTitle>
                <CardDescription>
                  Select your preferred date and time below
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <CalcomEmbed
                  eventSlug={
                    selectedService.calcomEventType || selectedService.id
                  }
                  className="min-h-[600px] w-full"
                />
              </CardContent>
            </Card>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Card
              key={service.id}
              className="group border-spa-cream/50 transition-all duration-300 hover:-translate-y-1 hover:border-sage-green/50 hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-sage-green text-xs uppercase tracking-wide">
                    {tServices(`categories.${service.category}`)}
                  </span>
                  <span className="font-semibold text-forest-green text-sm">
                    {service.price}
                  </span>
                </div>
                <CardTitle className="text-forest-green text-xl transition-colors group-hover:text-sage-green">
                  {tServices(`items.${service.id}.name`)}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                  {tServices(`items.${service.id}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full bg-spa-gold text-white hover:bg-spa-gold/90"
                >
                  <a href={`?service=${service.id}`}>{t("bookNow")}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 animate-slide-up rounded-lg border border-sage-green/30 bg-white p-6">
          <h2 className="mb-3 font-semibold text-forest-green text-xl">
            {t("helpTitle")}
          </h2>
          <p className="mb-4 text-charcoal/70">{t("helpText")}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              asChild
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            >
              <a href="tel:+15551234567">{t("callUs")}</a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            >
              <a href="mailto:info@haianbeauty.com">{t("emailUs")}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  const t = useTranslations("booking");

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-spa-cream/30 pt-32 pb-20">
          <div className="text-center">
            <Calendar className="mx-auto mb-4 h-16 w-16 animate-pulse text-forest-green" />
            <p className="text-charcoal/70 text-lg">{t("loading")}</p>
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
