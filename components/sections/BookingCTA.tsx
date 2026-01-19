"use client";

import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function BookingCTA() {
  const t = useTranslations("bookingCta");

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-forest-green via-deep-teal to-forest-green py-20 text-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-spa-gold blur-3xl" />
        <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-sage-green blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <Calendar className="mx-auto mb-6 h-16 w-16 text-spa-gold" />
          <h2 className="mb-6 font-bold text-4xl sm:text-5xl">{t("title")}</h2>
          <p className="mb-8 text-spa-cream text-xl">{t("subtitle")}</p>
          <Button
            asChild
            size="lg"
            className="bg-spa-gold px-10 py-6 text-lg text-white shadow-2xl transition-all hover:bg-spa-gold/90 hover:shadow-spa-gold/50"
          >
            <Link href="/services">{t("button")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
