"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/features/services/data/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCalcomUrl } from "@/features/booking/utils/calcom";
import { Calendar, ExternalLink } from "lucide-react";

function BookingContent() {
    const searchParams = useSearchParams();
    const serviceId = searchParams.get("service");
    const selectedService = serviceId ? SERVICES.find(s => s.id === serviceId) : null;

    return (
        <div className="min-h-screen bg-spa-cream/30 pt-32 pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-forest-green" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-forest-green mb-4">
                        Book Your Appointment
                    </h1>
                    <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                        Select a service below to schedule your visit. We look forward to pampering you!
                    </p>
                </div>

                {selectedService ? (
                    <Card className="mb-8 border-sage-green/30 animate-slide-up">
                        <CardHeader>
                            <CardTitle className="text-2xl text-forest-green">
                                {selectedService.name}
                            </CardTitle>
                            <CardDescription className="text-base">
                                {selectedService.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-charcoal/70">Duration: {selectedService.duration}</p>
                                    <p className="text-lg font-semibold text-forest-green">Price: {selectedService.price}</p>
                                </div>
                                <Button
                                    asChild
                                    className="bg-spa-gold hover:bg-spa-gold/90 text-white"
                                >
                                    <a
                                        href={getCalcomUrl(selectedService.calcomEventType || selectedService.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        Book This Service
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                        <Card
                            key={service.id}
                            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-spa-cream/50 hover:border-sage-green/50"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs uppercase tracking-wide text-sage-green font-semibold">
                                        {service.category}
                                    </span>
                                    <span className="text-sm font-semibold text-forest-green">
                                        {service.price}
                                    </span>
                                </div>
                                <CardTitle className="text-xl text-forest-green group-hover:text-sage-green transition-colors">
                                    {service.name}
                                </CardTitle>
                                <CardDescription className="text-sm line-clamp-2">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    asChild
                                    className="w-full bg-spa-gold hover:bg-spa-gold/90 text-white"
                                >
                                    <a
                                        href={getCalcomUrl(service.calcomEventType || service.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Book Now
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-white rounded-lg border border-sage-green/30 animate-slide-up">
                    <h2 className="text-xl font-semibold text-forest-green mb-3">
                        Need Help Choosing?
                    </h2>
                    <p className="text-charcoal/70 mb-4">
                        Not sure which service is right for you? Contact us and our expert team will help you select the perfect treatment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" asChild className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                            <a href="tel:+15551234567">Call Us</a>
                        </Button>
                        <Button variant="outline" asChild className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                            <a href="mailto:info@haianbeauty.com">Email Us</a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-spa-cream/30 pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-forest-green animate-pulse" />
                    <p className="text-lg text-charcoal/70">Loading booking options...</p>
                </div>
            </div>
        }>
            <BookingContent />
        </Suspense>
    );
}
