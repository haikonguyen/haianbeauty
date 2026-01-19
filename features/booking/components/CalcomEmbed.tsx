"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { getCalcomEmbedConfig } from "../utils/calcom";

// European Cal.com embed URL for GDPR compliance
const CALCOM_EU_EMBED_URL = "https://app.cal.eu/embed/embed.js";
const CALCOM_EU_ORIGIN = "https://app.cal.eu";

interface CalcomEmbedProps {
  eventSlug: string;
  className?: string;
}

export function CalcomEmbed({ eventSlug, className }: CalcomEmbedProps) {
  const { calLink, config } = getCalcomEmbedConfig(eventSlug);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ embedJsUrl: CALCOM_EU_EMBED_URL });
      cal("ui", {
        theme: config.theme,
        styles: {
          branding: {
            brandColor: "#A67C52", // spa-gold color
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, [config.theme]);

  return (
    <div className={className}>
      <Cal
        calLink={calLink}
        calOrigin={CALCOM_EU_ORIGIN}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          layout: config.layout,
          theme: config.theme,
        }}
      />
    </div>
  );
}
