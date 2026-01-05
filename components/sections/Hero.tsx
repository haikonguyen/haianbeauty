"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-spa-cream via-white to-spa-pink/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D5F4F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              <Link href="/booking">{t("bookAppointment")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="animate-scale-in border-forest-green px-8 py-6 text-forest-green text-lg hover:bg-forest-green hover:text-white"
            >
              <a href="/#services">{t("viewServices")}</a>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-forest-green" />
        </div>
      </div>
    </section>
  );
}
