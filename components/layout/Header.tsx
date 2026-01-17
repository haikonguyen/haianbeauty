"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");

  const navigation: Array<
    | {
        name: string;
        href: "/" | "/portfolio" | "/booking" | "/blog";
        useLink: true;
      }
    | { name: string; href: string; useLink: false }
  > = [
    { name: t("home"), href: "/" as const, useLink: true },
    { name: t("services"), href: "/#services", useLink: false },
    { name: t("gallery"), href: "/portfolio" as const, useLink: true },
    // { name: t("blog"), href: "/blog" as const, useLink: true }, // Hidden until content is ready
    { name: t("about"), href: "/#about", useLink: false },
    { name: t("contact"), href: "/#contact", useLink: false },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");

    // Check if it's a hash link (e.g., /#about, /#services, /#contact)
    if (href?.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2); // Remove "/#" to get the id

      // Close mobile menu if open
      setMobileMenuOpen(false);

      // Special handling for contact (scroll to bottom)
      if (targetId === "contact") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        // For other sections, find the element and scroll to it
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerOffset = 80; // Height of fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.jpeg"
              alt="HaiAn Beauty & Spa"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="font-semibold text-forest-green text-xl">
              HaiAn Beauty & Spa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) =>
              item.useLink ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-foreground/80 text-sm transition-colors hover:text-forest-green"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-foreground/80 text-sm transition-colors hover:text-forest-green"
                  onClick={handleSmoothScroll}
                >
                  {item.name}
                </a>
              ),
            )}
            <Button
              asChild
              className="bg-spa-gold text-white hover:bg-spa-gold/90"
            >
              <a
                href="https://anbeauty.setmore.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("bookNow")}
              </a>
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="animate-slide-up py-4 md:hidden">
            <div className="space-y-1">
              {navigation.map((item) =>
                item.useLink ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 font-medium text-base text-foreground/80 transition-colors hover:bg-accent hover:text-forest-green"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 font-medium text-base text-foreground/80 transition-colors hover:bg-accent hover:text-forest-green"
                    onClick={handleSmoothScroll}
                  >
                    {item.name}
                  </a>
                ),
              )}
              <div className="px-3 pt-2">
                <Button
                  asChild
                  className="w-full bg-spa-gold text-white hover:bg-spa-gold/90"
                >
                  <a
                    href="https://anbeauty.setmore.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("bookNow")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
