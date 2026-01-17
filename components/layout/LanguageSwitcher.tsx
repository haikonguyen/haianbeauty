"use client";

import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "@/i18n/routing";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const handleLanguageChange = (newLocale: string) => {
    setOpen(false);
    // Cast needed because next-intl types don't include dynamic route patterns like /blog/[slug]
    router.replace(pathname as "/", { locale: newLocale });
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Language</DialogTitle>
          <DialogDescription>Select your preferred language</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={currentLocale === language.code ? "default" : "outline"}
              className="cursor-pointer justify-start gap-3"
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="text-2xl">{language.flag}</span>
              <span>{language.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
