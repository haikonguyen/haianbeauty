import type { Service } from "../types";

export const SERVICES: Service[] = [
  {
    id: "manicure-shellac",
    name: "Manikúra s lakováním Shellak/Gellak",
    category: "nails",
    description:
      "Profesionální manikúra s dlouhotrvajícím Shellac/Gellac lakem",
    duration: "40",
    price: "349 Kč",
    setmoreBookingUrl:
      "https://anbeauty.setmore.com/book?step=staff&products=810ec297-3857-4621-89ef-8922d5473509&type=service",
    features: [
      "Úprava tvaru nehtů",
      "Ošetření nehtových lůžek",
      "Shellac/Gellac lakování",
      "Vydrží až 3 týdny",
    ],
  },
  {
    id: "pedicure-shellac",
    name: "Pedikúra s lakováním Shellak/Gellak",
    category: "nails",
    description: "Kompletní pedikúra s dlouhotrvajícím Shellac/Gellac lakem",
    duration: "50",
    price: "329 Kč",
    setmoreBookingUrl:
      "https://anbeauty.setmore.com/book?step=staff&products=e6c2e4d5-d265-4958-b49a-58679c832331&type=service",
    features: [
      "Koupel nohou",
      "Odstranění ztvrdlé kůže",
      "Shellac/Gellac lakování",
      "Masáž nohou",
    ],
  },
  {
    id: "gel-nails-polish",
    name: "Gelové nehty s lakováním",
    category: "nails",
    description: "Nové gelové nehty s profesionálním lakováním",
    duration: "60",
    price: "449 Kč",
    setmoreBookingUrl:
      "https://anbeauty.setmore.com/book?step=staff&products=f7b69c3d-269e-4a75-afac-aef6b723326f&type=service",
    features: [
      "Modelace gelových nehtů",
      "Lakování dle výběru",
      "Dlouhotrvající výsledek",
      "Přirozený vzhled",
    ],
  },
  {
    id: "lashes-3d",
    name: "Řasy 3D",
    category: "beauty",
    description: "Prodlužování řas 3D technikou pro přirozený objem",
    duration: "60",
    price: "799 Kč",
    setmoreBookingUrl:
      "https://anbeauty.setmore.com/book?step=staff&products=e80cd0bd-ebcd-4ae4-a8ff-6ac1eeb7ae6f&type=service",
    features: [
      "3D technika",
      "Přirozený vzhled",
      "Dlouhotrvající efekt",
      "Profesionální aplikace",
    ],
  },
  {
    id: "eyebrow-shaping-tinting",
    name: "Úprava + Barvení obočí",
    category: "beauty",
    description: "Kompletní úprava a barvení obočí pro dokonalý vzhled",
    duration: "25",
    price: "399 Kč",
    setmoreBookingUrl:
      "https://anbeauty.setmore.com/book?step=staff&products=49eb7cf5-7ab7-411d-8c92-3de65ae70368&type=service",
    features: [
      "Tvarování obočí",
      "Profesionální barvení",
      "Dlouhotrvající barva",
      "Přirozený výsledek",
    ],
  },
  {
    id: "pedicure-footlogix-shellac",
    name: "Pedikúra FOOTLOGIX s Shellak/Gellak",
    category: "nails",
    description: "Prémiová pedikúra FOOTLOGIX s dlouhotrvajícím lakem",
    duration: "60",
    price: "389 Kč",
    setmoreBookingUrl:
      "https://anbeauty.setmore.com/book?step=staff&products=e0911ed6-5282-41ee-adb5-b6e8e7c84880&type=service",
    features: [
      "FOOTLOGIX profesionální péče",
      "Hloubkové ošetření",
      "Shellac/Gellac lakování",
      "Dlouhodobý efekt",
    ],
  },
];

export const getServicesByCategory = (category: Service["category"]) => {
  return SERVICES.filter((service) => service.category === category);
};

export const getServiceById = (id: string) => {
  return SERVICES.find((service) => service.id === id);
};
