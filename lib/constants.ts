export const SITE_CONFIG = {
  name: "HaiAn Beauty & Spa",
  description:
    "Premium beauty, spa, and nail studio services for your ultimate relaxation and rejuvenation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: "anbeautyjaromirova41@gmail.com",
    phone: "+420774707869",
    address: "Jaromírova 686/41, 120 00 Vinohrady",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61581609553047",
    instagram:
      "https://www.instagram.com/anbeautyjaromirova41/?igsh=MWYyb3ZtY3Q3MjV2OQ%3D%3D&utm_source=qr#",
    tiktok: "https://www.tiktok.com/@anbeautyjaromirov?_t=ZN-90bE5IM4u3e&_r=1",
  },
  hours: {
    weekday: "9:00 AM - 7:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed",
  },
} as const;

export const CALCOM_CONFIG = {
  username: process.env.NEXT_PUBLIC_CALCOM_USERNAME || "",
  namespace: process.env.NEXT_PUBLIC_CALCOM_NAMESPACE || "",
  baseUrl: "https://cal.com",
} as const;
