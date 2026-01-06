"use client";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { useTranslations } from "next-intl";
import type { GalleryItem } from "../types";
import { getLightboxImageUrl } from "../utils/imagekit";

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryLightbox({
  items,
  index,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const t = useTranslations("gallery.lightbox");

  // Convert gallery items to lightbox slides
  const slides = items.map((item) => {
    if (item.type === "video") {
      return {
        type: "video" as const,
        sources: [
          {
            src: getLightboxImageUrl(item.path),
            type: "video/mp4",
          },
        ],
        poster: item.thumbnailPath
          ? getLightboxImageUrl(item.thumbnailPath)
          : undefined,
      };
    }

    return {
      src: getLightboxImageUrl(item.path),
      alt: item.alt,
      width: item.width,
      height: item.height,
    };
  });

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Video, Zoom, Fullscreen, Slideshow]}
      // Localization
      carousel={{
        finite: false,
      }}
      // Custom styling to match spa theme
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
        },
      }}
      // Zoom settings
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      // Slideshow settings
      slideshow={{
        autoplay: false,
        delay: 3000,
      }}
      // Accessibility
      render={{
        buttonPrev: () => (
          <button
            type="button"
            className="yarl__button yarl__navigation_prev"
            aria-label={t("previous")}
          />
        ),
        buttonNext: () => (
          <button
            type="button"
            className="yarl__button yarl__navigation_next"
            aria-label={t("next")}
          />
        ),
      }}
    />
  );
}
