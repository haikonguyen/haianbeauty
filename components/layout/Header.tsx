"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  const navigation: Array<
    | {
        name: string;
        href: "/" | "/portfolio" | "/services" | "/blog";
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

  // Check if we're on the homepage (supports all locales)
  const isHomepage = pathname === "/" || pathname.match(/^\/[a-z]{2}$/);

  // Scroll to section helper function
  const scrollToSection = useCallback((targetId: string) => {
    if (targetId === "contact") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, []);

  // Handle scrolling to section after navigation
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash && isHomepage) {
      // Wait a bit for the page to render
      setTimeout(() => {
        const targetId = hash.substring(1); // Remove "#"
        scrollToSection(targetId);
      }, 100);
    }
  }, [isHomepage, scrollToSection]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");

    // Check if it's a hash link (e.g., /#about, /#services, /#contact)
    if (href?.startsWith("/#")) {
      const targetId = href.substring(2); // Remove "/#" to get the id

      // Close mobile menu if open
      setMobileMenuOpen(false);

      // If we're on the homepage, smooth scroll
      if (isHomepage) {
        e.preventDefault();
        scrollToSection(targetId);
      } else {
        // If we're not on homepage, navigate to homepage with hash
        e.preventDefault();
        router.push(href);
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
              <Link href="/services">{t("bookNow")}</Link>
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
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("bookNow")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
