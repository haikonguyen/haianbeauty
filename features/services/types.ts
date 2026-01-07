export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: string;
  price: string;
  image?: string;
  calcomEventType?: string; // Cal.com event type slug
  setmoreBookingUrl?: string; // Direct Setmore booking URL
  features?: string[];
}

export type ServiceCategory = "nails" | "spa" | "beauty" | "massage" | "laser";

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
  date: string;
  image?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: ServiceCategory;
  featured?: boolean;
}
