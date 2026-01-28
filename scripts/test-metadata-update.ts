#!/usr/bin/env tsx
import { config } from "dotenv";

config({ path: ".env.local" });

const CALCOM_API_URL = "https://api.cal.eu/v2";
const CALCOM_API_VERSION = "2024-06-14";
const CALCOM_API_KEY = process.env.CALCOM_API_KEY;

async function testDifferentApproaches() {
  console.log("🧪 Testing different metadata approaches...\n");

  const testEventId = 27210;

  try {
    // Approach 1: Try nested metadata
    console.log("1️⃣ Trying nested metadata structure...");
    let response = await fetch(`${CALCOM_API_URL}/event-types/${testEventId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": CALCOM_API_VERSION,
      },
      body: JSON.stringify({
        metadata: {
          customData: {
            category: "nails",
          },
        },
      }),
    });

    let data = await response.json();
    console.log("Result:", JSON.stringify(data.data?.metadata, null, 2));

    // Approach 2: Try description field (we can parse it)
    console.log("\n2️⃣ Checking if we can use description...");
    response = await fetch(`${CALCOM_API_URL}/event-types/${testEventId}`, {
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": CALCOM_API_VERSION,
      },
    });

    data = await response.json();
    console.log("Description exists:", !!data.data?.description);
    console.log("Slug:", data.data?.slug);

    // Approach 3: Check what fields we CAN update
    console.log("\n3️⃣ Testing simple field update (title)...");
    const originalTitle = data.data?.title;
    response = await fetch(`${CALCOM_API_URL}/event-types/${testEventId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": CALCOM_API_VERSION,
      },
      body: JSON.stringify({
        title: originalTitle, // Set it back to same value
      }),
    });

    data = await response.json();
    console.log("Title update status:", response.status);
    console.log("Title after update:", data.data?.title);
  } catch (error) {
    console.error("Error:", error);
  }
}

testDifferentApproaches();
