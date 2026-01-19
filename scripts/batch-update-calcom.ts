#!/usr/bin/env tsx
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

// All event type IDs from Cal.com
const eventTypeIds = [
  27210, 27211, 27212, 27213, 27214, 27215, 27216, 27220, 27222, 27217, 27218,
  27219, 27221, 27225, 27223, 27224, 27230, 27226, 27228, 27229, 27231, 27232,
  27251, 27265, 27233, 27234, 27235, 27236, 27237, 27243, 27238, 27239, 27240,
  27241, 27242, 27244, 27256, 27245, 27246, 27247, 27249, 27250, 27271, 27248,
  27252, 27253, 27254, 27255, 27257, 27258, 27259, 27260, 27261, 27266, 27267,
  27268, 27269, 27270, 27272,
];

// Update payload
const updatePayload = {
  minimumBookingNotice: 30, // 30 minutes instead of 120
  currency: "czk", // Change from USD to CZK
};

// Function to update a single event type
async function updateEventType(eventTypeId: number) {
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
        body: JSON.stringify(updatePayload),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(`✅ Updated event type ID: ${eventTypeId}`);
    return { success: true, id: eventTypeId };
  } catch (error) {
    console.error(`❌ Failed to update event type ${eventTypeId}:`, error);
    return { success: false, id: eventTypeId, error };
  }
}

// Main batch update function
async function batchUpdateEventTypes() {
  console.log("🚀 Starting batch update of Cal.com event types...\n");
  console.log(`📊 Total event types to update: ${eventTypeIds.length}`);
  console.log(`📝 Updates to apply:`);
  console.log(`   - minimumBookingNotice: 120 → 30 minutes`);
  console.log(`   - currency: USD → CZK\n`);

  let successCount = 0;
  let failCount = 0;

  for (const eventTypeId of eventTypeIds) {
    const result = await updateEventType(eventTypeId);
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }

    // Rate limiting: wait 1 second between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n" + "=".repeat(50));
  console.log("🎉 Batch Update Summary:");
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${eventTypeIds.length}`);
  console.log("=".repeat(50) + "\n");
}

// Run the batch update
batchUpdateEventTypes().catch(console.error);
