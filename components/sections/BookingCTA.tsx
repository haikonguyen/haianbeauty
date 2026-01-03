import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function BookingCTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-forest-green via-deep-teal to-forest-green text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-spa-gold blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-sage-green blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in">
                    <Calendar className="h-16 w-16 mx-auto mb-6 text-spa-gold" />
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Ready to Relax & Rejuvenate?
                    </h2>
                    <p className="text-xl mb-8 text-spa-cream">
                        Book your appointment today and experience the ultimate in beauty and wellness.
                        Our expert team is ready to pamper you.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-spa-gold hover:bg-spa-gold/90 text-white text-lg px-10 py-6 shadow-2xl hover:shadow-spa-gold/50 transition-all"
                    >
                        <Link href="/booking">Schedule Your Visit</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
