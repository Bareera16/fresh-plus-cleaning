"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { CheckCircle2, ListChecks, Utensils, Bath, BedDouble, Wind, Sparkles } from "lucide-react";

const sections = [
    {
        title: "Kitchen Deep Clean",
        icon: <Utensils className="text-green-600" />,
        items: [
            "Empty and clean refrigerator and freezer",
            "Deep clean oven, stovetop, and microwave",
            "Wash all cabinet fronts and interiors",
            "Organize and clean pantry shelves",
            "Clean and degrease range hood",
            "Scrub backsplash tiles and grout",
            "Wash or replace curtains and blinds"
        ]
    },
    {
        title: "Bathroom Renovation",
        icon: <Bath className="text-green-600" />,
        items: [
            "Remove and wash shower curtains",
            "Deep clean grout and re-seal if needed",
            "Descale showerheads and faucets",
            "Clean exhaust fans thoroughly",
            "Organize medicine cabinets",
            "Replace old towels and bath mats",
            "Clean and disinfect toilet completely"
        ]
    },
    {
        title: "Living Areas & Bedrooms",
        icon: <BedDouble className="text-green-600" />,
        items: [
            "Wash or dry clean curtains and drapes",
            "Deep clean carpets and rugs",
            "Wipe down all walls and baseboards",
            "Clean light fixtures and ceiling fans",
            "Organize closets and wardrobes",
            "Flip and vacuum mattresses",
            "Clean windows inside and out"
        ]
    }
];

export default function SpringCleaningPage() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">

                {/* HEADER SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">Seasonal Guide</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                        Spring Deep Cleaning: <br />
                        <span className="italic">Room by Room Guide</span>
                    </h1>
                    <div className="w-20 h-px bg-gray-300 mx-auto mb-6"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">By Fresh Plus Team</p>
                </motion.div>

                {/* HERO IMAGE */}
                <div className="relative h-[400px] md:h-[500px] mb-20 rounded-sm overflow-hidden shadow-2xl">
                    <Image
                        src="/House Cleaning.webp"
                        alt="Spring Cleaning Checklist"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* INTRO CONTENT */}
                <article className="prose prose-lg max-w-none text-gray-600 mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-xl font-medium text-gray-900 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-green-600 first-letter:mr-3 first-letter:float-left"
                    >
                        Spring is the perfect time to refresh your home with a thorough deep clean. After months of closed windows and indoor living, your home needs more than just surface cleaning.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2"><Wind size={20} /> Why it Matters</h2>
                            <p className="text-sm">Winter leaves homes with accumulated dust and stale air. Spring cleaning removes allergens and prepares your home for warmer months.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2"><Sparkles size={20} /> Essential Supplies</h2>
                            <p className="text-sm">Gather microfiber cloths, all-purpose cleaners, glass cleaner, disinfectant, vacuum with attachments, and a mop before starting.</p>
                        </motion.div>
                    </div>
                </article>

                {/* CHECKLIST SECTIONS */}
                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                    {section.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-gray-900">{section.title}</h3>
                            </div>

                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 group">
                                        <CheckCircle2 size={18} className="text-green-200 group-hover:text-green-600 transition-colors mt-0.5" />
                                        <span className="text-sm text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>
                    ))}
                </div>

                {/* CONCLUSION */}
                <motion.footer
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-green-900 rounded-sm text-center text-white relative overflow-hidden"
                >
                    <ListChecks className="absolute -top-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                    <h2 className="text-3xl font-serif mb-6 text-green-400 relative z-10">Fresh Start</h2>
                    <p className="max-w-2xl mx-auto text-green-100/80 mb-10 relative z-10 leading-relaxed">
                        Spring deep cleaning is an investment in your home's health. Consider hiring professionals for carpets and windows to ensure the best results.
                    </p>
                    <button className="bg-white text-green-900 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-green-400 transition-all relative z-10">
                        Book Professional Clean
                    </button>
                </motion.footer>
            </div>
        </main>
    );
}