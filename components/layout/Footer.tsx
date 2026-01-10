"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-teal text-spa-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-lg text-white">
              {t("contactUs")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-sm">{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="text-sm transition-colors hover:text-spa-gold"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-sm transition-colors hover:text-spa-gold"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="mb-4 font-semibold text-lg text-white">
              {t("hours")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("weekday")}</span>
                <span>{SITE_CONFIG.hours.weekday}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("saturday")}</span>
                <span>{SITE_CONFIG.hours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("sunday")}</span>
                <span>{t("closed")}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold text-lg text-white">
              {t("followUs")}
            </h3>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-spa-cream/10 p-2 transition-colors hover:bg-spa-gold"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-spa-cream/10 p-2 transition-colors hover:bg-spa-gold"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-spa-cream/10 p-2 transition-colors hover:bg-spa-gold"
                aria-label="TikTok"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-spa-cream/20 border-t pt-8 text-center text-sm">
          <p>
            © {currentYear} {SITE_CONFIG.name}. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
