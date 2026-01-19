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
console.log(`🔑 API Key: ${CALCOM_API_KEY.substring(0, 10)}...`);

// Delete event type by ID
async function deleteEventType(id: number, title: string) {
  try {
    const response = await fetch(`${CALCOM_API_URL}/event-types/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": CALCOM_API_VERSION,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    console.log(`✅ Deleted: ${title} (ID: ${id})`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to delete ${title}:`, error);
    return false;
  }
}

// Fetch all event types
async function fetchEventTypes() {
  try {
    const response = await fetch(`${CALCOM_API_URL}/event-types`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": CALCOM_API_VERSION,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch event types:", error);
    return [];
  }
}

// Main cleanup function
async function cleanupEventTypes() {
  console.log("\n🧹 Starting Cal.com event types cleanup...\n");

  // Fetch all event types
  const eventTypes = await fetchEventTypes();

  if (eventTypes.length === 0) {
    console.log("✅ No event types found. Nothing to clean up!");
    return;
  }

  console.log(`📋 Found ${eventTypes.length} event types to delete\n`);

  let deleted = 0;
  let failed = 0;

  // Delete each event type with a delay
  for (const eventType of eventTypes) {
    const success = await deleteEventType(eventType.id, eventType.title);
    if (success) {
      deleted++;
    } else {
      failed++;
    }

    // Wait 1 second between deletions to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n" + "=".repeat(50));
  console.log("🎉 Cleanup Summary:");
  console.log(`   ✅ Deleted: ${deleted}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📊 Total: ${eventTypes.length}`);
  console.log("=".repeat(50) + "\n");
}

// Run the cleanup
cleanupEventTypes().catch(console.error);
