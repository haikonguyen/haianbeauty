"use client";

import { Calendar, Clock, Search, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CalComPopupButton } from "@/features/booking/components/CalComPopupButton";
import type { ServiceCategory } from "@/features/services/types";

interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number;
  price: string;
  calcomEventType: string;
}

interface ServicesData {
  services: Service[];
  byCategory: Record<ServiceCategory, Service[]>;
  total: number;
}

// Category icons and display order
const CATEGORY_CONFIG: Record<
  ServiceCategory,
  { icon: string; order: number; color: string }
> = {
  nails: { icon: "💅", order: 1, color: "bg-spa-pink/20 border-spa-pink/30" },
  beauty: { icon: "✨", order: 2, color: "bg-spa-gold/20 border-spa-gold/30" },
  "lifting-lamination": {
    icon: "🌟",
    order: 3,
    color: "bg-forest-green/20 border-forest-green/30",
  },
  laser: { icon: "⚡", order: 4, color: "bg-deep-teal/20 border-deep-teal/30" },
  skincare: {
    icon: "🧴",
    order: 5,
    color: "bg-sage-green/20 border-sage-green/30",
  },
  spa: { icon: "🧘", order: 6, color: "bg-spa-cream/40 border-spa-cream" },
  massage: {
    icon: "💆",
    order: 7,
    color: "bg-sage-green/10 border-sage-green/20",
  },
};

export default function ServicesPage() {
  const t = useTranslations("services");
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  console.table(servicesData?.services);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        if (data.success) {
          setServicesData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  // Sort categories by order and filter empty ones
  const sortedCategories = useMemo(() => {
    if (!servicesData) return [];
    return (Object.keys(servicesData.byCategory) as ServiceCategory[])
      .filter((cat) => servicesData.byCategory[cat]?.length > 0)
      .sort(
        (a, b) =>
          (CATEGORY_CONFIG[a]?.order ?? 99) - (CATEGORY_CONFIG[b]?.order ?? 99),
      );
  }, [servicesData]);

  // Filter services based on search query
  const filteredByCategory = useMemo(() => {
    if (!servicesData || !searchQuery.trim()) return servicesData?.byCategory;

    const query = searchQuery.toLowerCase();
    const filtered: Record<ServiceCategory, Service[]> = {} as Record<
      ServiceCategory,
      Service[]
    >;

    for (const [category, services] of Object.entries(
      servicesData.byCategory,
    )) {
      const matchingServices = services.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description?.toLowerCase().includes(query),
      );
      if (matchingServices.length > 0) {
        filtered[category as ServiceCategory] = matchingServices;
      }
    }

    return filtered;
  }, [servicesData, searchQuery]);

  // Categories with services after filtering
  const visibleCategories = useMemo(() => {
    if (!filteredByCategory) return [];
    return sortedCategories.filter(
      (cat) => filteredByCategory[cat]?.length > 0,
    );
  }, [sortedCategories, filteredByCategory]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-spa-cream/30 pt-32 pb-20">
        <div className="text-center">
          <Calendar className="mx-auto mb-4 h-16 w-16 animate-pulse text-forest-green" />
          <p className="text-charcoal/70 text-lg">
            {t("loading") || "Loading services..."}
          </p>
        </div>
      </div>
    );
  }

  if (!servicesData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-spa-cream/30 pt-32 pb-20">
        <div className="text-center">
          <p className="text-charcoal/70 text-lg">Failed to load services</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spa-cream/30 pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in text-center">
          <Sparkles className="mx-auto mb-4 h-16 w-16 text-spa-gold" />
          <h1 className="mb-4 font-bold text-4xl text-forest-green sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-charcoal/70 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mx-auto mb-8 max-w-md animate-slide-up">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-charcoal/50" />
          <input
            type="text"
            placeholder={t("searchPlaceholder") || "Search services..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-sage-green/30 bg-white py-3 pr-4 pl-12 text-charcoal placeholder:text-charcoal/50 focus:border-forest-green focus:outline-none focus:ring-2 focus:ring-forest-green/20"
          />
        </div>

        {/* Service Count */}
        <div className="mb-6 text-center">
          <span className="text-charcoal/60 text-sm">
            {t("totalServices") || "Total services"}: {servicesData.total}
          </span>
        </div>

        {/* Accordion Categories */}
        <Accordion
          type="single"
          collapsible
          defaultValue={visibleCategories[0]}
          className="animate-slide-up space-y-3"
        >
          {visibleCategories.map((category) => {
            const config = CATEGORY_CONFIG[category];
            const services = filteredByCategory?.[category] || [];

            return (
              <AccordionItem
                key={category}
                value={category}
                className={`overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-shadow hover:shadow-md ${config?.color || "border-gray-200"}`}
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-hidden="true">
                      {config?.icon || "📦"}
                    </span>
                    <span className="font-semibold text-forest-green text-lg">
                      {t(`categories.${category}`)}
                    </span>
                    <span className="rounded-full bg-sage-green/20 px-2 py-0.5 font-medium text-sage-green text-sm">
                      {services.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5">
                  <div className="divide-y divide-sage-green/10">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between gap-4 py-4 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-charcoal">
                            {service.name}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-charcoal/60 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {service.duration} {t("common.min")}
                            </span>
                            <span className="font-semibold text-forest-green">
                              {service.price}
                            </span>
                          </div>
                        </div>
                        <CalComPopupButton
                          eventSlug={service.calcomEventType}
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Empty State for Search */}
        {visibleCategories.length === 0 && searchQuery && (
          <div className="py-12 text-center">
            <p className="text-charcoal/70 text-lg">
              {t("noSearchResults") || "No services found matching your search"}
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-4 border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            >
              {t("clearSearch") || "Clear search"}
            </Button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 animate-slide-up rounded-lg border border-sage-green/30 bg-white p-6">
          <h2 className="mb-3 font-semibold text-forest-green text-xl">
            {t("helpTitle") || "Need Help Choosing?"}
          </h2>
          <p className="mb-4 text-charcoal/70">
            {t("helpText") ||
              "Not sure which service is right for you? Contact us and our expert team will help you select the perfect treatment."}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              asChild
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            >
              <a href="tel:+420774707869">{t("callUs") || "Call Us"}</a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            >
              <a href="mailto:haianbeautycz@gmail.com">
                {t("emailUs") || "Email Us"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
