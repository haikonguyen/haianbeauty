import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-spa-cream via-white to-spa-pink/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D5F4F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-forest-green mb-6">
                        Your Sanctuary of
                        <span className="block text-sage-green mt-2">Beauty & Wellness</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-charcoal/80 mb-8 max-w-3xl mx-auto">
                        Experience premium spa treatments, expert nail care, and rejuvenating beauty services in a serene atmosphere
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-spa-gold hover:bg-spa-gold/90 text-white text-lg px-8 py-6 animate-scale-in"
                        >
                            <Link href="/booking">Book Appointment</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white text-lg px-8 py-6 animate-scale-in"
                        >
                            <Link href="/#services">View Services</Link>
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="h-8 w-8 text-forest-green" />
                </div>
            </div>
        </section>
    );
}
