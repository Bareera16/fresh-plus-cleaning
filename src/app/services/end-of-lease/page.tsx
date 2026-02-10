"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WhyChooseUs from "@/src/components/home/why-choose-us";
import Navbar from "@/src/components/home/navbar";
import Footer from "@/src/components/home/footer";
import { Check, Home, Sparkles, Shield, Key } from "lucide-react";

// Based on user image: "End of Lease Packages" with cleaning icons
const leasePackages = [
    {
        title: "Studio & 1BR",
        desc: "Complete end of lease clean for apartments and small units.",
        icon: <Home size={40} className="text-brand-orange" />
    },
    {
        title: "2-3 Bedroom",
        desc: "Thorough bond cleaning for family homes and townhouses.",
        icon: <Sparkles size={40} className="text-brand-orange" />
    },
    {
        title: "3BR+ & Houses",
        desc: "Comprehensive cleaning for large properties and multi-level homes.",
        icon: <Shield size={40} className="text-brand-orange" />
    }
];

// Plans/Guarantees for the Green Section
const guarantees = [
    {
        name: "Bond Back Guarantee",
        desc: "We follow agency-approved checklists to ensure your bond return.",
        features: ["72hr Re-clean guarantee", "Real estate approved", "Receipt provided", "Full checklist covered"],
        btn: "Get Quote",
        color: "border-brand-blue-light",
        btnColor: "bg-brand-blue"
    },
    {
        name: "Deep Clean & Carpet",
        desc: "Combine bond cleaning with steam carpet cleaning for a full exit.",
        features: ["All bond tasks", "Steam carpet cleaning", "Stain treatment", "Deodorizing"],
        btn: "Get Bundle Deal",
        color: "border-brand-orange-light",
        btnColor: "bg-brand-orange",
        popular: true
    },
    {
        name: "Move-In Clean",
        desc: "Ensure your new home is spotless before you unpack.",
        features: ["Sanitization", "Cupboard cleaning", "Floor polishing", "Fresh start"],
        btn: "Get Quote",
        color: "border-brand-blue-light",
        btnColor: "bg-brand-blue"
    }
];

const locations = [
    "Melbourne CBD", "South Yarra", "Richmond", "St Kilda", "Brunswick",
    "Northcote", "Fitzroy", "Prahran", "Southbank", "Docklands",
    "Port Melbourne", "Carlton", "Collingwood", "Essendon", "Moonee Ponds"
];

const ServicesSection = () => {
    return (
        <section className="relative h-auto py-32 flex items-center justify-center overflow-hidden">
            {/* Parallax Image Overlay */}
            <div
                className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: "url('/lease.webp')",
                    filter: "brightness(0.35)"
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                        End of Lease <span className="text-brand-green">Packages</span>
                    </h2>
                    <div className="h-1.5 w-32 bg-brand-orange mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {leasePackages.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            whileHover={{ y: -20 }}
                            className="bg-white/95 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-start text-left border border-white/30"
                        >
                            <div className="mb-6 bg-orange-50 p-4 rounded-3xl shadow-sm">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-4 text-black tracking-tight">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function EndOfLeaseCleaning() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="relative min-h-screen bg-white overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>

                {/* 1. HERO SECTION */}
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative pt-48 pb-20 px-6 bg-gradient-to-b from-brand-green-light to-white text-center"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4"
                        >
                            End of Lease <span className="text-brand-green">Cleaning</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium"
                        >
                            Our professional end of lease cleaning covers every detail required by real estate agents and property managers. With our 100% bond back guarantee, you can move out stress-free knowing your property will pass inspection.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="relative mt-12 max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <Image src="/lease.webp" alt="End of Lease Cleaning" width={1200} height={600} priority className="w-full h-auto object-cover" />
                        </motion.div>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="mt-10 flex flex-wrap justify-center gap-4"
                        >
                            <button className="bg-brand-orange hover:bg-black text-white px-8 py-3 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1">
                                Get Bond Back Quote
                            </button>
                            <button className="border-2 border-brand-blue-dark text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white px-8 py-3 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1">
                                Call 0431 977 720
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* 2. PARALLAX PACKAGES SECTION */}
                <ServicesSection />

                {/* 3. WHY CHOOSE US */}
                <section className="py-10">
                    <WhyChooseUs />
                </section>

                {/* 4. GUARANTEES / PLANS (Master Green Card) */}
                <section className="py-24 px-6 md:px-12 bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative max-w-7xl mx-auto rounded-[3.5rem] border-4 border-brand-green p-8 md:p-16 bg-brand-green-light"
                    >
                        <div className="text-center mb-16 relative z-10">
                            <motion.h2
                                initial={{ y: -40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-black"
                            >
                                Bond Back <span className="text-brand-green">Guarantee</span>
                            </motion.h2>
                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-gray-500 max-w-xl mx-auto font-medium"
                            >
                                We confidently offer a 100% satisfaction guarantee on all our bond cleans.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {guarantees.map((plan, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: -40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.2 }}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className={`relative p-8 rounded-[2.5rem] border-2 bg-white shadow-sm flex flex-col ${plan.color}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                            Best Value
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-black mb-4 text-black uppercase">{plan.name}</h3>
                                    <p className="text-gray-500 text-sm mb-8 h-12">{plan.desc}</p>
                                    <div className="space-y-4 mb-10 flex-grow">
                                        {plan.features.map((feat, index) => (
                                            <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                <Check size={16} className="text-brand-green shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className={`w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-md ${plan.btnColor}`}>
                                        {plan.btn}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 5. LOCATIONS GRID */}
                <section className="py-24 bg-gray-50/50 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.h2
                            initial={{ y: -40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl font-black uppercase tracking-tighter mb-12 text-black"
                        >
                            Serving Melbourne <span className="text-brand-green">Suburbs</span>
                        </motion.h2>

                        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                            {locations.map((loc, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.05, backgroundColor: "var(--brand-green)" }}
                                    className="px-6 py-4 bg-brand-green text-white rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-brand-green"
                                >
                                    {loc}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
