"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Home, Info, BookOpen, Mail, Zap, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";

const services = [
    { name: "Residential Cleaning", href: "/services/residential" },
    { name: "Commercial Cleaning", href: "/services/commercial" },
    { name: "Deep Cleaning", href: "/services/deep-cleaning" },
    { name: "Pressure Washing", href: "/services/pressure-washing" },
    { name: "Window Cleaning", href: "/services/window" },
    { name: "Carpet Cleaning", href: "/services/carpet" },
    { name: "Tile & Grout Cleaning", href: "/services/tile-grout" },
    { name: "End of Lease Cleaning", href: "/services/end-of-lease" },
    { name: "Solar Panel Cleaning", href: "/services/solar-panel" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    const navItemClass = "text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 text-gray-800 hover:text-green-600 whitespace-nowrap";

    return (
        <header className="absolute top-0 w-full z-[100] px-4 py-4 md:px-8 pointer-events-none font-sans">
            <div className="max-w-full mx-auto flex items-center justify-between pointer-events-auto">

                {/* 1. LOGO - Left to Right Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="overflow-hidden flex items-center justify-center w-[220px] h-[110px] md:w-[280px] md:h-[140px]"
                >
                    <Link href="/" className="relative w-full h-full p-2 flex items-center justify-center">
                        <Image
                            src="/logo.webp"
                            alt="Logo"
                            width={260}
                            height={120}
                            priority
                            className="object-contain"
                            style={{ height: 'auto', width: 'auto' }}
                            quality={90}
                        />
                    </Link>
                </motion.div>

                {/* 2. PILL NAV - Right to Left Animation */}
                <motion.nav
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="hidden lg:flex items-center bg-white/95 backdrop-blur-md px-10 py-4 rounded-full shadow-2xl border border-white/40 space-x-10"
                >
                    <Link href="/" className={navItemClass}>Home</Link>
                    <Link href="/about" className={navItemClass}>About</Link>

                    <div className="relative" onMouseEnter={() => setOpenDropdown(true)} onMouseLeave={() => setOpenDropdown(false)}>
                        <button className={`${navItemClass} flex items-center gap-1`}>
                            Services <ChevronDown size={14} className={`transition-transform ${openDropdown ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {openDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-5 w-64 bg-white shadow-2xl rounded-2xl py-4 border border-gray-100"
                                >
                                    {services.map((s) => (
                                        <Link key={s.name} href={s.href} className="block px-6 py-2.5 text-[11px] font-bold text-gray-600 hover:bg-green-50 hover:text-green-600 border-b border-gray-50 last:border-0 transition-colors">
                                            {s.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/blog" className={navItemClass}>Blog</Link>
                    <Link href="/contact" className={navItemClass}>Contact</Link>

                    <div className="pl-6 border-l border-gray-200">
                        <Link href="/get-quote">
                            <GradientButton className="text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 px-8 py-3 rounded-full min-w-[160px]">
                                See Pricing
                            </GradientButton>
                        </Link>
                    </div>
                </motion.nav>

                {/* MOBILE MENU TOGGLE */}
                <button className="lg:hidden bg-white p-4 rounded-full shadow-lg border border-gray-100 pointer-events-auto" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU - Transparent Background & Icons */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white/90 backdrop-blur-xl z-[110] lg:hidden flex flex-col pt-32 px-10 pointer-events-auto overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-6">
                            <MobileNavLink href="/" icon={<Home size={24} />} label="Home" onClick={() => setIsOpen(false)} />
                            <MobileNavLink href="/about" icon={<Info size={24} />} label="About" onClick={() => setIsOpen(false)} />

                            {/* Mobile Services Dropdown */}
                            <div className="border-b border-gray-200 pb-4">
                                <button
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                    className="flex items-center justify-between w-full text-2xl font-black uppercase"
                                >
                                    <span className="flex items-center gap-4"><LayoutGrid size={24} /> Services</span>
                                    <ChevronDown className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileServicesOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-10 pt-4 flex flex-col space-y-3">
                                            {services.map((s) => (
                                                <Link key={s.name} href={s.href} className="text-lg font-bold text-gray-600 uppercase" onClick={() => setIsOpen(false)}>{s.name}</Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <MobileNavLink href="/blog" icon={<BookOpen size={24} />} label="Blog" onClick={() => setIsOpen(false)} />
                            <MobileNavLink href="/contact" icon={<Mail size={24} />} label="Contact" onClick={() => setIsOpen(false)} />

                            <Link href="/get-quote" onClick={() => setIsOpen(false)}>
                                <GradientButton className="w-full py-5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3">
                                    <Zap size={20} /> See Instant Pricing
                                </GradientButton>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// Helper Component for Mobile Links
function MobileNavLink({ href, label, icon, onClick }: { href: string, label: string, icon: React.ReactNode, onClick: () => void }) {
    return (
        <Link href={href} onClick={onClick} className="text-2xl font-black uppercase border-b border-gray-200 pb-4 flex items-center gap-4">
            {icon} {label}
        </Link>
    );
}
