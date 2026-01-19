"use client";

import { getCalApi } from "@calcom/embed-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CALCOM_CONFIG } from "@/lib/constants";

// European Cal.com embed URL for GDPR compliance
const CALCOM_EU_EMBED_URL = "https://app.cal.eu/embed/embed.js";

interface CalComPopupButtonProps {
  /** Cal.com event slug (e.g., "manicure-classic") */
  eventSlug: string;
  /** Optional button size variant */
  size?: "default" | "sm" | "lg" | "icon";
  /** Optional additional className for the button */
  className?: string;
}

/**
 * A self-contained button component that opens Cal.com booking in a popup modal.
 * Follows the official Cal.com embed pattern with minimal wrapper logic.
 */
export function CalComPopupButton({
  eventSlug,
  size = "default",
  className,
}: CalComPopupButtonProps) {
  const t = useTranslations("services");
  const { username } = CALCOM_CONFIG;
  const calLink = `${username}/${eventSlug}`;
  const [isReady, setIsReady] = useState(false);

  // Initialize Cal.com embed on mount
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({
          namespace: eventSlug,
          embedJsUrl: CALCOM_EU_EMBED_URL,
        });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: "light",
          styles: {
            branding: {
              brandColor: "#d4af37", // spa-gold
            },
          },
        });
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Cal.com embed:", error);
      }
    })();
  }, [eventSlug]);

  return (
    <Button
      data-cal-namespace={eventSlug}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      size={size}
      disabled={!isReady}
      className={`scale-100 cursor-pointer bg-spa-gold text-white hover:bg-spa-gold/90 active:scale-95 disabled:cursor-wait disabled:opacity-70 ${className || ""}`}
      title={isReady ? undefined : "Loading booking system..."}
    >
      {t("bookNow")}
    </Button>
  );
}
