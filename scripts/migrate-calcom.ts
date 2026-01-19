#!/usr/bin/env tsx
import { config } from "dotenv";

// Service interface
interface Service {
  lengthInMinutes: number;
  title: string;
  slug: string;
  description: string;
  locations: Array<{
    type: string;
    address: string;
    public: boolean;
  }>;
}

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

// Load services data
const servicesData: Service[] = require("./setmore_services.json");

// Create event type in Cal.com
async function createEventType(service: Service) {
  const payload = {
    lengthInMinutes: service.lengthInMinutes,
    title: service.title,
    slug: service.slug,
    description: service.description,
    locations: service.locations,
    hidden: false,
    afterEventBuffer: 15,
  };

  try {
    const response = await fetch(`${CALCOM_API_URL}/event-types`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": CALCOM_API_VERSION,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();

      // Check if service already exists (409 = conflict/duplicate slug)
      if (response.status === 409) {
        console.log(`⏭️  Skipped: ${service.title} (already exists)`);
        return { skipped: true };
      }

      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(`✅ Created: ${service.title} (${service.slug})`);
    return data;
  } catch (error) {
    console.error(`❌ Failed to create ${service.title}:`, error);
    throw error;
  }
}

// Main migration function
async function migrateServices() {
  console.log("🚀 Starting Cal.com service migration...\\n");
  console.log(`📊 Total services to migrate: ${servicesData.length}\\n`);

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (const service of servicesData) {
    try {
      const result = await createEventType(service);
      if (result?.skipped) {
        skippedCount++;
      } else {
        successCount++;
      }

      // Rate limiting: wait 2 seconds between requests
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch {
      failCount++;
      console.error(`Failed: ${service.title}`);
    }
  }

  console.log("\\n" + "=".repeat(50));
  console.log("🎉 Migration Summary:");
  console.log(`   ✅ Successfully created: ${successCount}`);
  console.log(`   ⏭️  Skipped (already exist): ${skippedCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${servicesData.length}`);
  console.log("=".repeat(50) + "\\n");
}

// Run the migration
migrateServices().catch(console.error);
