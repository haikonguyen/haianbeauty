"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-spa-cream via-white to-spa-pink/20">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("https://ik.imagekit.io/8qy7obkhf/tr:w-2560,q-80,f-auto/haianbeauty-cz/hero/hero-main.jpg")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="mb-6 font-bold text-5xl text-forest-green sm:text-6xl lg:text-7xl">
            {t("title")}
            <span className="mt-2 block text-sage-green">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-charcoal/80 text-xl sm:text-2xl">
            {t("subtitle")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="animate-scale-in bg-spa-gold px-8 py-6 text-lg text-white hover:bg-spa-gold/90"
            >
              <Link href="/services">{t("bookAppointment")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="animate-scale-in border-forest-green px-8 py-6 text-forest-green text-lg hover:bg-forest-green hover:text-white"
            >
              <a href="#services">{t("viewServices")}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - positioned at the bottom of a hero section */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-forest-green" />
      </div>
    </section>
  );
}
