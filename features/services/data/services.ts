import type { Service } from "../types";

export const SERVICES: Service[] = [
  {
    id: "classic-manicure",
    name: "Classic Manicure",
    category: "nails",
    description:
      "Professional nail care with polish application, cuticle treatment, and hand massage",
    duration: "45 min",
    price: "$35",
    calcomEventType: "classic-manicure",
    features: [
      "Nail shaping",
      "Cuticle care",
      "Polish application",
      "Hand massage",
    ],
  },
  {
    id: "gel-manicure",
    name: "Gel Manicure",
    category: "nails",
    description:
      "Long-lasting gel polish with UV curing for chip-free nails up to 2 weeks",
    duration: "60 min",
    price: "$50",
    calcomEventType: "gel-manicure",
    features: [
      "Gel polish",
      "UV curing",
      "Lasts 2+ weeks",
      "Nail strengthening",
    ],
  },
  {
    id: "luxury-pedicure",
    name: "Luxury Pedicure",
    category: "nails",
    description:
      "Indulgent foot treatment with exfoliation, massage, and polish",
    duration: "75 min",
    price: "$65",
    calcomEventType: "luxury-pedicure",
    features: [
      "Foot soak",
      "Exfoliation",
      "Callus removal",
      "Massage",
      "Polish",
    ],
  },
  {
    id: "facial-treatment",
    name: "Signature Facial",
    category: "beauty",
    description:
      "Customized facial treatment for deep cleansing, hydration, and rejuvenation",
    duration: "60 min",
    price: "$85",
    calcomEventType: "signature-facial",
    features: [
      "Deep cleansing",
      "Exfoliation",
      "Mask treatment",
      "Facial massage",
    ],
  },
  {
    id: "anti-aging-facial",
    name: "Anti-Aging Facial",
    category: "beauty",
    description:
      "Advanced treatment targeting fine lines, wrinkles, and skin firmness",
    duration: "90 min",
    price: "$120",
    calcomEventType: "anti-aging-facial",
    features: [
      "Collagen boost",
      "LED therapy",
      "Peptide serum",
      "Lifting massage",
    ],
  },
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    category: "massage",
    description:
      "Relaxing full-body massage to relieve tension and promote circulation",
    duration: "60 min",
    price: "$90",
    calcomEventType: "swedish-massage",
    features: ["Full body", "Relaxation", "Stress relief", "Aromatherapy"],
  },
  {
    id: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "massage",
    description:
      "Therapeutic massage targeting deep muscle layers and chronic tension",
    duration: "75 min",
    price: "$110",
    calcomEventType: "deep-tissue-massage",
    features: [
      "Deep pressure",
      "Muscle relief",
      "Pain management",
      "Targeted therapy",
    ],
  },
  {
    id: "hot-stone-massage",
    name: "Hot Stone Massage",
    category: "spa",
    description:
      "Luxurious massage using heated stones for ultimate relaxation",
    duration: "90 min",
    price: "$130",
    calcomEventType: "hot-stone-massage",
    features: [
      "Heated stones",
      "Deep relaxation",
      "Energy balance",
      "Aromatherapy",
    ],
  },
  {
    id: "body-scrub",
    name: "Body Scrub & Wrap",
    category: "spa",
    description: "Exfoliating treatment followed by nourishing body wrap",
    duration: "75 min",
    price: "$95",
    calcomEventType: "body-scrub-wrap",
    features: [
      "Full body exfoliation",
      "Hydrating wrap",
      "Moisturizing",
      "Skin renewal",
    ],
  },
];

export const getServicesByCategory = (category: Service["category"]) => {
  return SERVICES.filter((service) => service.category === category);
};

export const getServiceById = (id: string) => {
  return SERVICES.find((service) => service.id === id);
};
