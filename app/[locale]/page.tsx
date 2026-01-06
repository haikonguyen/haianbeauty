import { BookingCTA } from "@/components/sections/BookingCTA";
import { FeaturedGallery } from "@/components/sections/FeaturedGallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedGallery />
      <BookingCTA />
    </>
  );
}
