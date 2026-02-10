"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WhyChooseUs from "@/components/home/why-choose-us";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { Check, Sparkles, ShieldCheck, Clock } from "lucide-react";

const plans = [
    {
        name: "Standard Residential",
        desc: "Perfect for single-story homes. Includes internal and external glass cleaning.",
        features: ["External glass wash", "Internal streak-free wipe", "Window sill dusting", "Fly screen cleaning"],
        btn: "Request Quote",
        color: "border-green-100",
        btnColor: "bg-green-700"
    },
    {
        name: "Premium Deluxe",
        desc: "Complete window care for multi-story properties and luxury homes.",
        features: ["Track deep cleaning", "Cobweb removal", "High-reach window cleaning", "Frame detailing", "Rain-repellent finish"],
        btn: "Request Quote",
        color: "border-orange-400",
        btnColor: "bg-orange-500",
        popular: true
    },
    {
        name: "Commercial Window",
        desc: "Showroom and office window cleaning for a professional business front.",
        features: ["Storefront glass polishing", "Regular maintenance plans", "After-hours service", "Pure water tech used"],
        btn: "Request Quote",
        color: "border-green-100",
        btnColor: "bg-green-700"
    }
];

const locations = [
    "Melbourne CBD", "South Yarra", "St Kilda", "Brighton", "Toorak",
    "Doncaster", "Kew", "Richmond", "Malvern", "Hawthorn",
    "Camberwell", "Balwyn", "Glen Iris", "Prahran", "Windsor"
];

export default function WindowCleaning() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="relative min-h-screen bg-white overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>

                {/* 1. HERO SECTION (Green Theme) */}
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative pt-48 pb-20 px-6 bg-gradient-to-b from-green-50 to-white text-center"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4"
                        >
                            Window Cleaning <span className="text-green-600">Melbourne</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium"
                        >
                            Professional streak-free window cleaning for homes and businesses. We use eco-friendly pure water technology to ensure your glass stays crystal clear.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="relative mt-12 max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
                        >
                            <Image src="/window-cleaning.webp" alt="Window Cleaning" width={1200} height={600} priority className="w-full h-auto object-cover" />
                        </motion.div>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link href="/get-quote">
                                <button className="bg-orange-500 hover:bg-black text-white px-8 py-4 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1">
                                    Free Instant Quote
                                </button>
                            </Link>
                            <a href="tel:0431977720" className="border-2 border-green-900 text-green-900 px-8 py-4 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1 block text-center flex items-center justify-center">
                                Call 0431 977 720
                            </a>
                        </div>
                    </div>
                </motion.div>




                {/* 3. WHY CHOOSE SECTION */}
                <section className="py-20 bg-white">
                    <WhyChooseUs />
                </section>

                {/* 4. PRICING PLANS (Green Style) */}
                <section className="py-24 px-6 md:px-12 bg-gray-50/50">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative max-w-7xl mx-auto rounded-[4rem] border-4 border-green-500/20 p-8 md:p-20 bg-white shadow-2xl"
                    >
                        <div className="text-center mb-16 relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
                                Window Cleaning <span className="text-green-600">Packages</span>
                            </h2>
                            <p className="text-gray-500 max-w-xl mx-auto font-medium">Transparent pricing for every type of property.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {plans.map((plan, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -15 }}
                                    className={`relative p-10 rounded-[3rem] border-2 bg-white shadow-lg flex flex-col ${plan.color}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            Top Rated
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-black mb-4 text-black uppercase">{plan.name}</h3>
                                    <p className="text-gray-500 text-sm mb-8 h-12 leading-tight">{plan.desc}</p>
                                    <div className="space-y-4 mb-10 flex-grow">
                                        {plan.features.map((feat, index) => (
                                            <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                <Check size={18} className="text-green-600 shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/get-quote" className="w-full block">
                                        <button className={`w-full py-5 rounded-[2rem] text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-md ${plan.btnColor} hover:brightness-110`}>
                                            {plan.btn}
                                        </button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 5. LOCATIONS GRID WITH STAGGERED MOTION */}
                <section className="py-24 bg-white px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-black uppercase tracking-tighter mb-4 text-black"
                        >
                            Melbourne Areas <span className="text-green-600">We Service</span>
                        </motion.h2>

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                            className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mt-12"
                        >
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8, y: 20 },
                                        show: { opacity: 1, scale: 1, y: 0 }
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "#15803d",
                                        color: "#ffffff",
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-5 bg-green-50 border border-green-100 text-green-800 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors shadow-sm flex items-center justify-center min-w-[160px]"
                                >
                                    {loc}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
