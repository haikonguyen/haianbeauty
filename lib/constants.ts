export const SITE_CONFIG = {
  name: "HaiAn Beauty & Spa",
  description:
    "Premium beauty, spa, and nail studio services for your ultimate relaxation and rejuvenation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: "info@haianbeauty.com",
    phone: "+1 (555) 123-4567",
    address: "123 Spa Street, Beauty City, BC 12345",
  },
  social: {
    facebook: "https://facebook.com/haianbeauty",
    instagram: "https://instagram.com/haianbeauty",
    twitter: "https://twitter.com/haianbeauty",
  },
  hours: {
    weekday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed",
  },
} as const;

export const CALCOM_CONFIG = {
  username: process.env.NEXT_PUBLIC_CALCOM_USERNAME || "",
  namespace: process.env.NEXT_PUBLIC_CALCOM_NAMESPACE || "",
  baseUrl: "https://cal.com",
} as const;
