import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/features/services/data/services";
import { Sparkles, Clock, DollarSign } from "lucide-react";

export function Services() {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-4xl sm:text-5xl font-bold text-forest-green mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                        Indulge in our comprehensive range of beauty and wellness treatments,
                        tailored to your unique needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <Card
                            key={service.id}
                            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-spa-cream/50 hover:border-sage-green/50"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <Sparkles className="h-6 w-6 text-spa-gold" />
                                    <span className="text-xs uppercase tracking-wide text-sage-green font-semibold">
                                        {service.category}
                                    </span>
                                </div>
                                <CardTitle className="text-2xl text-forest-green group-hover:text-sage-green transition-colors">
                                    {service.name}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {service.features && (
                                    <ul className="space-y-2">
                                        {service.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="text-sm text-charcoal/70 flex items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-sage-green mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>

                            <CardFooter className="flex items-center justify-between pt-4 border-t">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center text-sm text-charcoal/70">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {service.duration}
                                    </div>
                                    <div className="flex items-center text-lg font-semibold text-forest-green">
                                        <DollarSign className="h-5 w-5" />
                                        {service.price.replace('$', '')}
                                    </div>
                                </div>
                                <Button
                                    asChild
                                    className="bg-spa-gold hover:bg-spa-gold/90 text-white"
                                >
                                    <Link href={`/booking?service=${service.id}`}>
                                        Book Now
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
