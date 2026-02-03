"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Calendar, User, Clock, BarChart3, Building2, Coffee, Users, Zap, CheckCircle, Sparkles } from "lucide-react";

export default function CommercialCleaningPage() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">

                {/* EDITORIAL HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">Business Performance</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                        How Clean Offices Boost <br />
                        <span className="italic text-green-700">Productivity by 12%</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-y border-gray-200 py-6">
                        <span className="flex items-center gap-2"><Calendar size={14} /> Dec 5, 2024</span>
                        <span className="flex items-center gap-2"><User size={14} /> Fresh Plus Team</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> 7 min read</span>
                    </div>
                </motion.div>

                {/* HERO IMAGE */}
                <div className="relative h-[450px] md:h-[550px] mb-20 overflow-hidden rounded-sm shadow-2xl">
                    <Image
                        src="/Commercial cleaning.webp"
                        alt="Modern Clean Office Melbourne"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute bottom-10 right-10 bg-white p-6 shadow-xl rounded-sm max-w-[200px] hidden md:block">
                        <p className="text-3xl font-serif text-green-600 mb-1">+12%</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Employee Output Increase</p>
                    </div>
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
                        Studies consistently show that clean work environments significantly impact employee performance, health, and satisfaction. Research indicates that employees in clean offices are 12% more productive than those in cluttered workspaces.
                    </motion.p>

                    {/* THE SCIENCE SECTION */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10 items-center"
                    >
                        <div className="flex-1">
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2"><Zap className="text-green-600" size={24} /> The Science of Clean</h2>
                            <p className="text-sm">Clean environments reduce stress hormones and improve cognitive function. When employees aren't distracted by hygiene concerns, they can dedicate full attention to their work. Clean air also means fewer sick days.</p>
                        </div>
                        <div className="w-px h-20 bg-gray-100 hidden md:block"></div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-serif text-gray-900 mb-4">Melbourne Factors</h2>
                            <p className="text-sm">Rain means more tracked dirt, CBD pollution affects windows, and seasonal allergies require extra dusting. Local expertise is crucial.</p>
                        </div>
                    </motion.section>

                    {/* KEY AREAS GRID */}
                    <section>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-serif text-gray-900 mb-10 text-center"
                        >
                            Critical Productivity Areas
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: <Building2 />, title: "Reception", desc: "First impressions for clients" },
                                { icon: <Users />, title: "Restrooms", desc: "Affects staff satisfaction" },
                                { icon: <Coffee />, title: "Kitchen", desc: "Promotes team interaction" },
                                { icon: <BarChart3 />, title: "Workstations", desc: "Dust-free focus zones" },
                                { icon: <CheckCircle />, title: "Meeting Rooms", desc: "Professional appearance" },
                                { icon: <Sparkles />, title: "Common Areas", desc: "Influences company culture" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 border border-gray-100 rounded-xl hover:bg-green-50 transition-colors group"
                                >
                                    <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ROI HIGHLIGHT */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-green-900 text-white p-12 rounded-sm relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif mb-6 text-green-400">Professional vs In-House</h2>
                            <p className="mb-8 opacity-90">While some rely on employees for cleaning, professional services provide consistent results and free up your team for core tasks. The ROI is typically positive within months.</p>
                            <div className="flex flex-wrap gap-6">
                                <span className="bg-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Consistent Results</span>
                                <span className="bg-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Proper Equipment</span>
                                <span className="bg-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Healthier Staff</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* CONCLUSION CTA */}
                    <motion.footer
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center pt-10 border-t border-gray-100"
                    >
                        <p className="text-2xl font-serif text-gray-900 mb-8 italic">
                            "Investing in professional cleaning is about creating an environment where employees can thrive."
                        </p>
                        <button className="bg-green-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-green-600 transition-all shadow-xl">
                            Book Office Assessment
                        </button>
                    </motion.footer>

                </article>
            </div>
        </main>
    );
}