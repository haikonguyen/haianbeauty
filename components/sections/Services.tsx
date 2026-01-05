"use client";

import { Clock, DollarSign, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICES } from "@/features/services/data/services";
import { Link } from "@/i18n/routing";

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="bg-white py-20">
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
          {SERVICES.map((service, index) => (
            <Card
              key={service.id}
              className="group border-spa-cream/50 transition-all duration-300 hover:-translate-y-1 hover:border-sage-green/50 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <Sparkles className="h-6 w-6 text-spa-gold" />
                  <span className="font-semibold text-sage-green text-xs uppercase tracking-wide">
                    {t(`categories.${service.category}`)}
                  </span>
                </div>
                <CardTitle className="text-2xl text-forest-green transition-colors group-hover:text-sage-green">
                  {t(`items.${service.id}.name`)}
                </CardTitle>
                <CardDescription className="text-base">
                  {t(`items.${service.id}.description`)}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {service.features && (
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((_, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-charcoal/70 text-sm"
                      >
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sage-green" />
                        {t(`items.${service.id}.features.${idx}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-charcoal/70 text-sm">
                    <Clock className="mr-1 h-4 w-4" />
                    {service.duration} {t("common.min")}
                  </div>
                  <div className="flex items-center font-semibold text-forest-green text-lg">
                    <DollarSign className="h-5 w-5" />
                    {service.price.replace("$", "")}
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-spa-gold text-white hover:bg-spa-gold/90"
                >
                  <Link
                    href={{
                      pathname: "/booking",
                      query: { service: service.id },
                    }}
                  >
                    {t("bookNow")}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
