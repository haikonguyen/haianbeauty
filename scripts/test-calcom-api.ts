#!/usr/bin/env tsx
import { config } from "dotenv";

config({ path: ".env.local" });

const CALCOM_API_URL = "https://api.cal.eu/v2";
const CALCOM_API_VERSION = "2024-06-14";
const CALCOM_API_KEY = process.env.CALCOM_API_KEY;

async function testAPI() {
  console.log("🔍 Testing Cal.com API...\n");
  console.log("API Key present:", !!CALCOM_API_KEY);
  console.log("API URL:", `${CALCOM_API_URL}/event-types\n`);

  try {
    const response = await fetch(`${CALCOM_API_URL}/event-types`, {
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": CALCOM_API_VERSION,
      },
    });

    console.log("📡 Response Status:", response.status);

    const data = await response.json();
    console.log("\n📊 Response Structure:");
    console.log("- status:", data.status);
    console.log(
      "- data type:",
      Array.isArray(data.data) ? "array" : typeof data.data,
    );
    console.log("- data length:", data.data?.length || 0);

    if (data.data && data.data.length > 0) {
      console.log("\n📋 First Event Type:");
      console.log(JSON.stringify(data.data[0], null, 2));

      console.log("\n🏷️  Checking Metadata:");
      const withMetadata = data.data.filter((e: any) => e.metadata);
      console.log("Events with metadata:", withMetadata.length);

      if (withMetadata.length > 0) {
        console.log("\n✨ Sample Metadata:");
        console.log(JSON.stringify(withMetadata[0].metadata, null, 2));
      } else {
        console.log("\n⚠️  No events have metadata!");
        console.log(
          "This means the category update script may not have worked.",
        );
      }

      // Check for category specifically
      const withCategory = data.data.filter((e: any) => e.metadata?.category);
      console.log("\n📂 Events with category:", withCategory.length);
    } else {
      console.log("\n❌ No event types returned!");
    }
  } catch (error) {
    console.error("\n❌ Error:", error);
  }
}

testAPI();
