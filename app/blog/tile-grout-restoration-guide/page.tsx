"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Calendar, User, Clock, Droplets, Layers, ShieldCheck, TrendingDown, CheckCircle2 } from "lucide-react";

export default function TileGroutRestorationPage() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">

                {/* EDITORIAL HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">Surface Restoration</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                        Tile & Grout Restoration: <br />
                        <span className="italic text-green-700 font-normal">From Dingy to Sparkling</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-y border-gray-200 py-6">
                        <span className="flex items-center gap-2"><Calendar size={14} /> Dec 3, 2024</span>
                        <span className="flex items-center gap-2"><User size={14} /> Fresh Plus Team</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> 6 min read</span>
                    </div>
                </motion.div>

                {/* FEATURED IMAGE */}
                <div className="relative h-[450px] md:h-[600px] mb-20 overflow-hidden rounded-sm shadow-2xl group">
                    <Image
                        src="/Tile&grout.webp"
                        alt="Tile and Grout Restoration"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        priority
                    />
                </div>

                {/* ARTICLE CONTENT */}
                <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-16">

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-xl font-medium text-gray-900 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-green-600 first-letter:mr-3 first-letter:float-left"
                    >
                        Tile and grout can transform from beautiful to embarrassing surprisingly quickly. What starts as pristine white grout often becomes dark, stained, and unsightly within months. The good news? With proper techniques and professional restoration, your tiles can look brand new again.
                    </motion.p>

                    {/* WHY IT GETS DIRTY SECTION */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2">
                                <Droplets className="text-green-600" /> Why Grout Gets Dirty
                            </h3>
                            <p className="text-sm">Grout is porous and sits below the tile surface, making it a magnet for dirt, soap scum, and moisture. In Melbourne's humid climate, mold and mildew thrive. Regular mopping actually pushes dirt deeper into grout lines.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2">
                                <Layers className="text-green-600" /> Different Tile Types
                            </h3>
                            <p className="text-sm">Ceramic is durable, porcelain needs gentler care, and natural stone requires pH-neutral products only. Glass tiles show water spots easily. Each type requires specific cleaning methods.</p>
                        </motion.div>
                    </section>

                    {/* RESTORATION PROCESS */}
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-green-900 text-white p-12 rounded-sm shadow-xl relative overflow-hidden"
                    >
                        <CheckCircle2 className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
                        <h2 className="text-3xl font-serif mb-10 text-green-400 relative z-10">Professional Restoration Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                            {[
                                "Pre-treatment with specialized solutions",
                                "High-pressure steam cleaning",
                                "Grout line scrubbing and extraction",
                                "Stain removal treatments",
                                "Sealing for future protection",
                                "Final polish and inspection"
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-green-100/70 border-b border-white/5 pb-4"
                                >
                                    <span className="text-green-500 font-serif text-xl">0{i + 1}</span> {step}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* MAINTENANCE & RE-GROUTING */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-10">
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 text-green-700 italic underline decoration-green-200 underline-offset-8">Maintenance Tips</h2>
                            <p className="text-sm">Weekly cleaning with pH-neutral products, immediate spill cleanup, and annual re-sealing keep grout looking new. Proper maintenance extends results significantly after professional restoration.</p>
                        </motion.section>
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 text-orange-700 italic underline decoration-orange-200 underline-offset-8">When to Re-grout?</h2>
                            <p className="text-sm">If grout is cracked, missing, or permanently stained, cleaning isn't enough. Professional assessment can determine if restoration or replacement is the better investment for your home.</p>
                        </motion.section>
                    </div>

                    {/* COST ANALYSIS GRID */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex flex-col md:flex-row items-center gap-12 py-16 border-y border-gray-100"
                    >
                        <div className="flex-1">
                            <h2 className="text-3xl font-serif text-gray-900 mb-6">Cost vs Value Analysis</h2>
                            <p className="text-sm mb-8 text-gray-500">Professional tile and grout restoration costs significantly less than replacement. It's a high-impact, low-cost investment for your home.</p>
                            <div className="flex gap-10">
                                <div className="text-center md:text-left">
                                    <p className="text-4xl font-serif text-green-600">$15-$25</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Restoration / m²</p>
                                </div>
                                <div className="border-l border-gray-200 pl-10 text-center md:text-left">
                                    <p className="text-4xl font-serif text-gray-300">$30-$80</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Replacement / m²</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center opacity-20">
                            <TrendingDown size={120} strokeWidth={1} />
                        </div>
                    </motion.section>

                    {/* CONCLUSION CTA */}
                    <motion.footer
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pt-10 text-center"
                    >
                        <p className="text-2xl font-serif text-gray-900 mb-10 max-w-2xl mx-auto italic">
                            "Don't let dingy grout make your beautiful tiles look dated. Restore your surfaces at a fraction of replacement cost."
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-green-600 transition-all shadow-xl"
                        >
                            Request A Restoration Quote
                        </motion.button>
                    </motion.footer>

                </article>
            </div>
        </main>
    );
}