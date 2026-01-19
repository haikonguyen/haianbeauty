#!/usr/bin/env tsx
import { writeFileSync } from "node:fs";

/**
 * Category Mapping Script
 * Analyzes Cal.com event type slugs and assigns categories based on prefix patterns
 */

// Category mapping rules based on slug prefixes
const CATEGORY_RULES = {
  nails: [
    "manicure-",
    "pedicure-",
    "nail-modeling-",
    "nail-refill-",
    "nail-decoration-",
  ],
  beauty: ["eyelash-extension-", "eyelash-refill-", "brows-lashes-"],
  laser: ["laser-epilation-"],
  skincare: ["skincare-"],
  "lifting-lamination": ["lifting-lamination-"],
} as const;

export type ServiceCategory = keyof typeof CATEGORY_RULES;

// All Cal.com event types (from extract-calcom-data.ts)
const calcomEventTypes = [
  { id: 27210, title: "Manikúra klasik", slug: "manicure-classic" },
  {
    id: 27211,
    title: "Manikúra s lakováním Shellak/Gellak",
    slug: "manicure-shellac-gellac-polish",
  },
  { id: 27213, title: "Pedikúra klasik", slug: "pedicure-classic" },
  {
    id: 27214,
    title: "Pedikúra s lakováním Shellak/ Gellak",
    slug: "pedicure-shellac-gellac-polish",
  },
  {
    id: 27216,
    title: "Masáž a pární lázeň nohou 15 minut",
    slug: "pedicure-foot-massage-steam-bath-15min",
  },
  {
    id: 27220,
    title: "Gelové s lakováním",
    slug: "nail-modeling-new-gel-polish",
  },
  {
    id: 27222,
    title: "Mramorový efekt/ vlastní design od",
    slug: "nail-decoration-marble-custom-design",
  },
  {
    id: 27217,
    title: "Gelové na nohy s lakováním",
    slug: "pedicure-gel-nails-polish",
  },
  {
    id: 27218,
    title: "Pedikúra FOOTLOGIX klasik",
    slug: "pedicure-footlogix-classic",
  },
  {
    id: 27219,
    title: "Pedikúra FOOTLOGIX s Shellak/Gellak",
    slug: "pedicure-footlogix-shellac-gellac",
  },
  { id: 27221, title: "Gelové s lakováním", slug: "nail-refill-gel-polish" },
  {
    id: 27225,
    title: "Zrcadlový efekt (chrome)",
    slug: "nail-decoration-mirror-chrome",
  },
  {
    id: 27223,
    title: "Lakování/Gellak",
    slug: "nail-decoration-polish-gellac",
  },
  {
    id: 27224,
    title: "Cat eyes barva",
    slug: "nail-decoration-cat-eyes-color",
  },
  {
    id: 27230,
    title: "Příliš dlouhé nehty",
    slug: "nail-decoration-too-long-nails",
  },
  { id: 27226, title: "Matný efekt", slug: "nail-decoration-matte-effect" },
  { id: 27228, title: "Svítící barva", slug: "nail-decoration-glow-color" },
  { id: 27229, title: "ODSTRANĚNÍ NEHTŮ", slug: "nail-decoration-removal" },
  {
    id: 27231,
    title: "Ozdoby nebo piercing nehtu od",
    slug: "nail-decoration-ornaments-piercing",
  },
  { id: 27232, title: "Nálepky", slug: "nail-decoration-stickers" },
  { id: 27251, title: "Barvení řas", slug: "brows-lashes-lash-tinting" },
  {
    id: 27265,
    title: "Kombinovaný balíček (Lifting & Laminace)",
    slug: "lifting-lamination-combined-package",
  },
  { id: 27233, title: "Fólie", slug: "nail-decoration-foil" },
  { id: 27234, title: "Pásky", slug: "nail-decoration-stripes" },
  { id: 27235, title: "Rašy 2D", slug: "eyelash-extension-new-2d" },
  {
    id: 27236,
    title: "Řasy Mega Volume",
    slug: "eyelash-extension-new-mega-volume",
  },
  { id: 27237, title: "Řasy Katun", slug: "eyelash-extension-new-cotton" },
  {
    id: 27243,
    title: "Řasy Mega Volume",
    slug: "eyelash-refill-mega-volume",
  },
  { id: 27238, title: "Řasy 8D", slug: "eyelash-extension-new-8d" },
  { id: 27239, title: "Řasy 5D", slug: "eyelash-extension-new-5d" },
  { id: 27240, title: "Řasy 3D", slug: "eyelash-extension-new-3d" },
  { id: 27241, title: "Řasy Klasik", slug: "eyelash-extension-new-classic" },
  { id: 27242, title: "Řasy 2D", slug: "eyelash-refill-2d" },
  { id: 27244, title: "Řasy Katun", slug: "eyelash-refill-cotton" },
  { id: 27256, title: "Brada", slug: "laser-epilation-chin" },
  { id: 27245, title: "Řasy 8D", slug: "eyelash-refill-8d" },
  { id: 27246, title: "Řasy 5D", slug: "eyelash-refill-5d" },
  { id: 27247, title: "Řasy 3D", slug: "eyelash-refill-3d" },
  { id: 27249, title: "Úprava obočí", slug: "brows-lashes-brow-shaping" },
  {
    id: 27250,
    title: "Úprava + Barvení obočí",
    slug: "brows-lashes-brow-shaping-tinting",
  },
  { id: 27271, title: "Nano Exo", slug: "skincare-nano-exo" },
  { id: 27248, title: "Řasy Klasik", slug: "eyelash-refill-classic" },
  { id: 27252, title: "Horní ret", slug: "laser-epilation-upper-lip" },
  { id: 27253, title: "Krk", slug: "laser-epilation-neck" },
  { id: 27254, title: "Celý obličej", slug: "laser-epilation-full-face" },
  { id: 27255, title: "Podpaží", slug: "laser-epilation-underarms" },
  { id: 27257, title: "Hrudník", slug: "laser-epilation-chest" },
  { id: 27258, title: "Břicho", slug: "laser-epilation-abdomen" },
  { id: 27259, title: "Záda", slug: "laser-epilation-back" },
  { id: 27260, title: "Celé nohy", slug: "laser-epilation-full-legs" },
  { id: 27261, title: "Celé tělo", slug: "laser-epilation-full-body" },
  {
    id: 27266,
    title: "Laminace obočí + úprava + barva",
    slug: "lifting-lamination-brow-lamination-shaping-tint",
  },
  {
    id: 27267,
    title: "Lifting řas + barvení řas",
    slug: "lifting-lamination-lash-lift-tinting",
  },
  {
    id: 27268,
    title: "Mikroneedling - Rolling",
    slug: "skincare-microneedling-rolling",
  },
  {
    id: 27269,
    title: "Mikroneedling - Dermapen",
    slug: "skincare-microneedling-dermapen",
  },
  { id: 27270, title: "Peeling", slug: "skincare-peeling" },
  {
    id: 27272,
    title: "Komplexní péče o pleť",
    slug: "skincare-comprehensive-facial",
  },
];

/**
 * Determine category based on slug prefix
 */
function categorizeBySlug(slug: string): ServiceCategory | null {
  for (const [category, prefixes] of Object.entries(CATEGORY_RULES)) {
    if (prefixes.some((prefix) => slug.startsWith(prefix))) {
      return category as ServiceCategory;
    }
  }
  return null;
}

/**
 * Generate category mapping
 */
function generateCategoryMapping() {
  const mapping = calcomEventTypes.map((event) => ({
    id: event.id,
    title: event.title,
    slug: event.slug,
    category: categorizeBySlug(event.slug),
  }));

  // Group by category for summary
  const categorized = mapping.filter((m) => m.category !== null);
  const uncategorized = mapping.filter((m) => m.category === null);

  const summary = {
    total: mapping.length,
    categorized: categorized.length,
    uncategorized: uncategorized.length,
    byCategory: {} as Record<string, number>,
  };

  categorized.forEach((item) => {
    if (item.category) {
      summary.byCategory[item.category] =
        (summary.byCategory[item.category] || 0) + 1;
    }
  });

  return { mapping, summary, uncategorized };
}

// Main execution
console.log("🗂️  Category Mapping Script\n");
console.log("=" + "=".repeat(60) + "\n");

const { mapping, summary, uncategorized } = generateCategoryMapping();

// Display summary
console.log("📊 Summary:");
console.log(`   Total services: ${summary.total}`);
console.log(`   ✅ Categorized: ${summary.categorized}`);
console.log(`   ❌ Uncategorized: ${summary.uncategorized}\n`);

console.log("📂 Services by Category:");
Object.entries(summary.byCategory).forEach(([category, count]) => {
  console.log(`   ${category}: ${count} services`);
});

if (uncategorized.length > 0) {
  console.log("\n⚠️  Uncategorized Services:");
  uncategorized.forEach((item) => {
    console.log(`   - ${item.title} (${item.slug})`);
  });
}

// Save to JSON file
const outputPath = "./category-mapping.json";
writeFileSync(outputPath, JSON.stringify(mapping, null, 2));

console.log(`\n✅ Category mapping saved to: ${outputPath}`);
console.log(
  "\n💡 Next step: Review the mapping and run update-calcom-categories.ts\n",
);
