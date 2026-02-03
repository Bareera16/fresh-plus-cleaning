"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Calendar, User, Clock, ShieldCheck, Sun, Zap, AlertTriangle } from "lucide-react";

export default function SolarPanelCleaningPage() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">

                {/* EDITORIAL HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">
                        Solar Efficiency Guide
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                        Solar Panel Cleaning: <br />
                        <span className="italic">Boost Your Efficiency by 25%</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-y border-gray-200 py-6">
                        <span className="flex items-center gap-2"><Calendar size={14} /> Feb 03, 2026</span>
                        <span className="flex items-center gap-2"><User size={14} /> Fresh Plus Team</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> 5 min read</span>
                    </div>
                </motion.div>

                {/* HERO IMAGE */}
                <div className="relative h-[450px] md:h-[600px] mb-20 overflow-hidden rounded-sm shadow-2xl">
                    <Image
                        src="/solar panel cleaning.webp"
                        alt="Solar Panel Cleaning Melbourne"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* MAIN ARTICLE CONTENT */}
                <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-12">

                    {/* Intro with Drop Cap */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-xl font-medium text-gray-900 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-green-600 first-letter:mr-3 first-letter:float-left"
                    >
                        With over 3 million Australian households now using solar power, maintaining peak efficiency is crucial for maximizing your investment. Dirty solar panels can reduce energy output by up to 25%, costing the average Melbourne household $200-$500 annually in lost energy production.
                    </motion.p>

                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div>
                            <h2 className="text-2xl font-serif text-gray-900 mb-4">How Dirt Affects Performance</h2>
                            <p className="text-sm">Solar panels work by converting sunlight into electricity. When dirt, dust, bird droppings, or pollen accumulate, they block sunlight from reaching the photovoltaic cells. Even a thin layer can significantly reduce efficiency.</p>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <Sun size={60} strokeWidth={1} />
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Melbourne's Unique Challenges</h2>
                        <p>Melbourne's environment presents specific challenges: frequent storms deposit debris, birds nest under panels, and autumn leaves or tree sap accumulate. Air pollution from traffic also settles on surfaces, creating a stubborn film.</p>
                    </motion.section>

                    {/* WARNING BOX */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-orange-50 p-8 border-l-4 border-orange-400 my-10"
                    >
                        <div className="flex items-center gap-3 mb-4 text-orange-700 font-bold uppercase tracking-widest text-xs">
                            <AlertTriangle size={18} /> Signs You Need Cleaning
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-orange-800">
                            <li>• Declining output on dashboard</li>
                            <li>• Visible bird droppings or nests</li>
                            <li>• Accumulated autumn leaves</li>
                            <li>• Shading from grime buildup</li>
                        </ul>
                    </motion.div>

                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">DIY vs Professional Cleaning</h2>
                        <p>While you can clean accessible ground-mounted panels yourself, roof-mounted systems require professional cleaning for safety. Professionals have proper equipment, use deionized water/appropriate solutions, and can identify potential issues like cracks or loose wiring during the process.</p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="border-t border-gray-200 pt-10"
                    >
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Cleaning Frequency</h2>
                        <p>In Melbourne's climate, panels should be cleaned every <strong>3-6 months</strong>. More frequent cleaning may be needed if you live near construction sites, heavy traffic areas, or have overhanging trees that drop sap and leaves.</p>
                    </motion.section>

                    {/* FINAL CALL TO ACTION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-green-900 text-white p-12 rounded-sm mt-20 text-center relative overflow-hidden"
                    >
                        <Zap className="absolute top-0 right-0 text-white/5 w-64 h-64 -mr-20 -mt-20" />
                        <h2 className="text-2xl font-serif mb-6 text-green-400 relative z-10">Maximize Your Solar Investment</h2>
                        <p className="text-green-100/80 mb-8 relative z-10">Don't let $500 slip away every year. Get a professional clean and restore your panels to 100% efficiency.</p>
                        <button className="bg-white text-green-900 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-green-400 transition-all relative z-10">
                            Get an Instant Quote
                        </button>
                    </motion.div>

                </article>
            </div>
        </main>
    );
}