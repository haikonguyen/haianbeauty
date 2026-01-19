#!/usr/bin/env tsx
import { readFileSync } from "node:fs";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

// Cal.eu API v2
const CALCOM_API_URL = "https://api.cal.eu/v2";
const CALCOM_API_VERSION = "2024-06-14";
const CALCOM_API_KEY = process.env.CALCOM_API_KEY;

if (!CALCOM_API_KEY) {
  console.error("❌ Error: CALCOM_API_KEY not found in .env.local");
  process.exit(1);
}

console.log("✅ Cal.com API Key loaded successfully");
console.log(`🔑 API Key: ${CALCOM_API_KEY.substring(0, 10)}...\n`);

// Load category mapping
const categoryMapping = JSON.parse(
  readFileSync("./category-mapping.json", "utf-8"),
);

interface CategoryMapping {
  id: number;
  title: string;
  slug: string;
  category: string | null;
}

/**
 * Update a single event type with category metadata
 */
async function updateEventTypeCategory(
  eventTypeId: number,
  category: string,
): Promise<{ success: boolean; id: number; error?: unknown }> {
  try {
    const response = await fetch(
      `${CALCOM_API_URL}/event-types/${eventTypeId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${CALCOM_API_KEY}`,
          "Content-Type": "application/json",
          "cal-api-version": CALCOM_API_VERSION,
        },
        body: JSON.stringify({
          metadata: {
            category,
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(
      `✅ Updated event type ID ${eventTypeId} → category: ${category}`,
    );
    return { success: true, id: eventTypeId };
  } catch (error) {
    console.error(`❌ Failed to update event type ${eventTypeId}:`, error);
    return { success: false, id: eventTypeId, error };
  }
}

/**
 * Main batch update function
 */
async function batchUpdateCategories() {
  console.log("🚀 Starting batch category update...\n");

  const itemsToUpdate = categoryMapping.filter(
    (item: CategoryMapping) => item.category !== null,
  );

  console.log(`📊 Total event types to update: ${itemsToUpdate.length}`);
  console.log(`📝 Adding category metadata to each event type\n`);

  let successCount = 0;
  let failCount = 0;
  const failed: CategoryMapping[] = [];

  for (const item of itemsToUpdate) {
    const result = await updateEventTypeCategory(item.id, item.category!);
    if (result.success) {
      successCount++;
    } else {
      failCount++;
      failed.push(item);
    }

    // Rate limiting: wait 1 second between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n" + "=".repeat(60));
  console.log("🎉 Batch Update Summary:");
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${itemsToUpdate.length}`);
  console.log("=".repeat(60) + "\n");

  if (failed.length > 0) {
    console.log("❌ Failed items:");
    failed.forEach((item) => {
      console.log(`   - ID ${item.id}: ${item.title} (${item.slug})`);
    });
  }
}

// Run the batch update
batchUpdateCategories().catch(console.error);
