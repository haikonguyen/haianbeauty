import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="bg-deep-teal text-spa-cream">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{SITE_CONFIG.contact.address}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0" />
                                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-sm hover:text-white transition-colors">
                                    {SITE_CONFIG.contact.phone}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0" />
                                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-sm hover:text-white transition-colors">
                                    {SITE_CONFIG.contact.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Hours</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>{SITE_CONFIG.hours.weekday}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday</span>
                                <span>{SITE_CONFIG.hours.saturday}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span>{SITE_CONFIG.hours.sunday}</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href={SITE_CONFIG.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a
                                href={SITE_CONFIG.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a
                                href={SITE_CONFIG.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-spa-cream/20 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
