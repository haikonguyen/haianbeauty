"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaFacebook, FaLink, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const t = useTranslations("blog");
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-sm">{t("share")}:</span>
      <div className="flex gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform hover:scale-110"
          aria-label="Share on Facebook"
        >
          <FaFacebook className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110"
          aria-label="Share on Twitter"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform hover:scale-110"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-transform hover:scale-110"
          aria-label="Copy link"
        >
          <FaLink className="h-4 w-4" />
        </button>
      </div>
      {copied && (
        <span className="text-sm text-muted-foreground">{t("linkCopied")}</span>
      )}
    </div>
  );
}
