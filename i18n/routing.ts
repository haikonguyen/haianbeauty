import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "cs", "vi", "ru"],

  // Used when no locale matches
  defaultLocale: "en",

  // Automatically detect user's preferred language from browser settings
  localeDetection: true,

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the external path, the
  // middleware can determine the locale and forward to
  // the internal path.
  pathnames: {
    "/": "/",
    "/booking": "/booking",
    "/services": "/services",
    "/portfolio": "/portfolio",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
