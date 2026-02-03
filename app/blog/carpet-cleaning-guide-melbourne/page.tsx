"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock, CheckCircle, AlertTriangle, ThermometerSnowflake } from "lucide-react";

export default function CarpetCleaningArticle() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6 overflow-hidden">

            {/* 1. HERO SECTION: MAGAZINE OVERLAP STYLE */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
                <div className="lg:col-span-7 relative h-[500px] md:h-[650px]">
                    <div className="absolute -top-10 -left-10 text-[10vw] font-black text-black/[0.02] uppercase pointer-events-none">Expertise</div>

                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} className="absolute top-10 left-0 w-[75%] h-[85%] z-10 shadow-2xl overflow-hidden rounded-sm">
                        <Image src="/carpet.jpg" alt="Carpet Cleaning" fill className="object-cover" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="absolute bottom-0 right-0 w-[55%] h-[65%] z-20 shadow-2xl border-[15px] border-[#F0F4F2] overflow-hidden rounded-sm">
                        <Image src="/carpet-diy.webp" alt="Steam Cleaning" fill className="object-cover" />
                    </motion.div>
                </div>

                <div className="lg:col-span-5 flex flex-col items-start">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">Professional Maintenance</span>
                        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                            Carpet Cleaning: <br />
                            <span className="italic text-green-700">Investment vs DIY</span>
                        </h1>
                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-gray-200 pt-6 w-full">
                            <span className="flex items-center gap-2"><User size={14} /> Fresh Plus Team</span>
                            <span className="flex items-center gap-2"><Clock size={14} /> 7 min read</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. MAIN CONTENT BODY */}
            <div className="max-w-4xl mx-auto">
                <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-16">

                    {/* Intro */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-xl font-medium text-gray-900 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-green-600 first-letter:mr-3 first-letter:float-left"
                    >
                        Your carpets are one of the largest investments in your home, yet they're also the most neglected when it comes to proper maintenance. With Melbourne's unique climate and lifestyle, understanding the difference between DIY and professional carpet cleaning can save you thousands in replacement costs.
                    </motion.p>

                    {/* Melbourne Specific */}
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
                    >
                        <ThermometerSnowflake className="absolute top-5 right-5 text-green-100 w-24 h-24 -z-0" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif text-gray-900 mb-6">Why Melbourne Carpets Need Special Care</h2>
                            <p>Melbourne's variable weather means carpets face unique challenges. High humidity in summer promotes mold growth, while winter mud and debris get tracked inside. The city's dust and pollution also settle deep into carpet fibers, requiring specialized cleaning techniques.</p>
                        </div>
                    </motion.section>

                    {/* DIY Pros/Cons */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">DIY Carpet Cleaning: Pros and Cons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-black text-[10px] uppercase text-green-600 tracking-widest">The Pros</h4>
                                <p className="text-sm">DIY can handle surface dirt and small spills, costs less upfront, and allows cleaning on your schedule.</p>
                            </div>
                            <div className="space-y-4 border-l border-gray-100 pl-8">
                                <h4 className="font-black text-[10px] uppercase text-orange-600 tracking-widest">The Cons</h4>
                                <p className="text-sm">Rental machines lack the power of professional equipment, improper technique can damage carpets, and over-wetting can cause mold issues.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Benefits List */}
                    <section className="border-y border-gray-200 py-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-serif text-gray-900 mb-10 text-center"
                        >
                            Professional Carpet Cleaning Benefits
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Power", desc: "Truck-mounted equipment with superior suction." },
                                { title: "Stains", desc: "Pre-treatment solutions for the toughest marks." },
                                { title: "Longevity", desc: "Expert care that extends your carpet's life." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="text-center space-y-3"
                                >
                                    <CheckCircle className="mx-auto text-green-600" size={28} />
                                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-xs">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Cost Analysis */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Cost Analysis: Investment vs Replacement</h2>
                        <div className="bg-green-900 text-white p-10 rounded-sm">
                            <p className="mb-6 opacity-90 italic">"Professional cleaning is significantly more economical than premature replacement."</p>
                            <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-6">
                                <div>
                                    <span className="block text-2xl font-serif text-green-400">$150-$400</span>
                                    <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Annual Cleaning</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-serif text-green-400">$15-$50/m²</span>
                                    <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Replacement Cost</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Health Benefits */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Health Benefits</h2>
                        <p>Professional cleaning removes allergens, dust mites, and bacteria that regular vacuuming can't reach. This is especially important for families with allergies, asthma, or young children who spend time on carpets.</p>
                    </motion.section>

                    {/* Conclusion */}
                    <motion.footer
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="pt-20 border-t border-gray-100"
                    >
                        <p className="text-center font-serif text-2xl text-gray-900 max-w-2xl mx-auto italic">
                            "Annual professional cleaning combined with regular vacuuming provides the best results for Melbourne homeowners."
                        </p>
                    </motion.footer>

                </article>
            </div>
        </main>
    );
}