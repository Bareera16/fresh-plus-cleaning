"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const services = [
        { name: "Residential Cleaning", href: "/services/residential" },
        { name: "Commercial Cleaning", href: "/services/commercial" },
        { name: "Deep Cleaning", href: "/services/deep-cleaning" },
        { name: "Carpet Cleaning", href: "/services/carpet" },
        { name: "Tile & Grout Cleaning", href: "/services/tile-grout" },
        { name: "Pressure Washing", href: "/services/pressure-washing" },
        { name: "Solar Panel Cleaning", href: "/services/solar-panel" },
        { name: "End of Lease Cleaning", href: "/services/end-of-lease" },
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
        { name: "See Instant Pricing", href: "/get-quote" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
    ];

    return (
        <footer className="relative bg-black/80 backdrop-blur-md text-white pt-16 pb-8 overflow-hidden border-t border-white/10">


            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Logo + Brand Info */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3 w-fit">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/logo.webp"
                                    alt="Fresh Plus Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Fresh Plus</h2>
                                <p className="text-[10px] text-green-500 font-bold tracking-[0.2em] uppercase mt-1">Cleaning Services</p>
                            </div>
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Melbourne's premier cleaning service provider since 2012. Professional, reliable, and eco-friendly solutions.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-1 text-orange-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                <span className="text-white text-xs font-bold ml-2">4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Our Services */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white border-l-4 border-green-500 pl-3">Our Services</h4>
                        <ul className="grid grid-cols-1 gap-3 text-sm text-gray-400">
                            {services.map((item) => (
                                <li key={item.name} className="hover:text-green-500 transition-colors group">
                                    <Link href={item.href} className="flex items-center gap-2">
                                        <span className="w-1.5 h-[1.5px] bg-gray-700 group-hover:bg-green-500 transition-all"></span> {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white border-l-4 border-green-500 pl-3">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            {quickLinks.map((item) => (
                                <li key={item.name} className="hover:text-green-500 transition-colors">
                                    <Link href={item.href}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white border-l-4 border-green-500 pl-3">Contact Info</h4>
                        <div className="flex flex-col gap-6">
                            <a href="tel:+6143971720" className="flex items-start gap-4 group">
                                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-orange-500 transition-all duration-300">
                                    <Phone size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-black">0439 717 20</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">7AM - 7PM weekdays</p>
                                </div>
                            </a>
                            <a href="mailto:Info@freshpluscleaning.com.au" className="flex items-start gap-4 group">
                                <div className="bg-white/10 p-3 rounded-xl group-hover:bg-orange-500 transition-all duration-300">
                                    <Mail size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-black break-all">Info@freshpluscleaning.com.au</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Email anytime</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        © {currentYear} Fresh Plus Professional Cleaning.
                    </p>
                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-black text-gray-500">
                        <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-green-500" /> Licensed</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-500" /> Insured</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
