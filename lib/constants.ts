export const SITE_CONFIG = {
  name: "HaiAn Beauty & Spa",
  description:
    "Premium beauty, spa, and nail studio services for your ultimate relaxation and rejuvenation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: "haianbeautycz@gmail.com",
    phone: "+420774707869",
    address: "Jaromírova 686/41, 120 00 Vinohrady",
  },
  social: {
    facebook: "https://www.facebook.com/haianbeautycz",
    instagram: "https://www.instagram.com/haianbeautycz/",
    tiktok: "https://www.tiktok.com/@haianbeautycz",
  },
  hours: {
    weekday: "9:00 AM - 7:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed",
  },
} as const;

export const CALCOM_CONFIG = {
  username: process.env.NEXT_PUBLIC_CALCOM_USERNAME || "",
  teamSlug: process.env.NEXT_PUBLIC_CALCOM_TEAM_SLUG || "",
  baseUrl: process.env.NEXT_PUBLIC_CALCOM_URL || "https://app.cal.eu",
} as const;
