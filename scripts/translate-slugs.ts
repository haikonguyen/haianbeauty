#!/usr/bin/env tsx

// Quick script to translate Czech slugs to English
const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../.gemini/antigravity/brain/24ac3762-7664-4a1f-9cd4-0786cf6a3d63/setmore_services.json",
);
const services = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Slug translation map
const slugTranslations: Record<string, string> = {
  manikura: "manicure",
  pedikura: "pedicure",
  gelove: "gel",
  lakovanim: "polish",
  shellak: "shellac",
  gellak: "gellac",
  kompletni: "complete",
  klasik: "classic",
  masaz: "massage",
  parni: "steam",
  lazen: "bath",
  nohou: "feet",
  minut: "minutes",
  nohach: "feet",
  rukou: "hands",
  modelace: "modeling",
  nehtu: "nails",
  nove: "new",
  doplneni: "refill",
  zdobeni: "decoration",
  mramorovy: "marble",
  efekt: "effect",
  vlastni: "custom",
  design: "design",
  lakovani: "polish",
  barva: "color",
  zrcadlovy: "mirror",
  chrome: "chrome",
  matny: "matte",
  svitici: "glow",
  odstraneni: "removal",
  prilis: "too",
  dlouhe: "long",
  nehty: "nails",
  ozdoby: "decorations",
  nebo: "or",
  piercing: "piercing",
  nalepky: "stickers",
  folie: "foil",
  pasky: "stripes",
  rasy: "lashes",
  prodluzovani: "extension",
  ras: "lashes",
  katun: "cotton",
  mega: "mega",
  volume: "volume",
  oboci: "brows",
  uprava: "shaping",
  barveni: "tinting",
  laserova: "laser",
  epilace: "epilation",
  horni: "upper",
  ret: "lip",
  brada: "chin",
  krk: "neck",
  cely: "full",
  oblicej: "face",
  podpazi: "underarms",
  hrudnik: "chest",
  bricho: "abdomen",
  zada: "back",
  cele: "full",
  nohy: "legs",
  telo: "body",
  lifting: "lifting",
  laminace: "lamination",
  kombinovany: "combined",
  balicek: "package",
  pece: "care",
  plet: "skin",
  mikroneedling: "microneedling",
  rolling: "rolling",
  dermapen: "dermapen",
  peeling: "peeling",
  nano: "nano",
  exo: "exo",
  komplexni: "comprehensive",
  footlogix: "footlogix",
};

// Function to translate slug
function translateSlug(slug: string): string {
  let translated = slug;

  // Replace each Czech word with English
  Object.entries(slugTranslations).forEach(([czech, english]) => {
    const regex = new RegExp(czech, "gi");
    translated = translated.replace(regex, english);
  });

  return translated;
}

// Update all slugs
services.forEach((service: any) => {
  service.slug = translateSlug(service.slug);
});

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(services, null, 2), "utf-8");

console.log("✅ Successfully translated all slugs to English!");
console.log(`📝 Updated ${services.length} services`);
