"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Gallery", href: "/#gallery" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src="/images/logo.jpeg"
                            alt="Hai An Beauty & Spa"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <span className="text-xl font-semibold text-forest-green">
                            Hai An Beauty & Spa
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-foreground/80 hover:text-forest-green transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button asChild className="bg-spa-gold hover:bg-spa-gold/90 text-white">
                            <Link href="/booking">Book Now</Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 animate-slide-up">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-forest-green hover:bg-accent rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="px-3 pt-2">
                                <Button asChild className="w-full bg-spa-gold hover:bg-spa-gold/90 text-white">
                                    <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                                        Book Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
