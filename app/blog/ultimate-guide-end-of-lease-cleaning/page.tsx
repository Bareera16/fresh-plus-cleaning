"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { Calendar, User, Clock, ShieldCheck, Home, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

const checklist = [
    {
        room: "Kitchen",
        items: ["Clean inside/outside all appliances", "Degrease range hood & filters", "Clean cupboards inside/out", "Scrub sink & polish taps", "Remove grout staining", "Mop floors & skirting boards"]
    },
    {
        room: "Bathrooms",
        items: ["Remove soap scum from screens", "Disinfect toilet thoroughly", "Polish mirrors & chrome", "Clean exhaust fans", "Scrub grout & remove mold", "Clean vanity inside/out"]
    },
    {
        room: "Living & Bedrooms",
        items: ["Professional carpet cleaning", "Wash walls & remove scuffs", "Clean windows inside/out", "Dust fans & light fixtures", "Clean AC vents", "Vacuum/mop all floors"]
    }
];

export default function EndOfLeaseGuide() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">

                {/* EDITORIAL HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">Bond Back Guarantee</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">
                        Ultimate Guide to <br />
                        <span className="italic text-green-700">Get Your Bond Back</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 border-y border-gray-200 py-6">
                        <span className="flex items-center gap-2"><Calendar size={14} /> Feb 03, 2026</span>
                        <span className="flex items-center gap-2"><User size={14} /> Fresh Plus Team</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> 8 min read</span>
                    </div>
                </motion.div>

                {/* HERO IMAGE */}
                <div className="relative h-[450px] md:h-[600px] mb-20 overflow-hidden rounded-sm shadow-2xl">
                    <Image
                        src="/blog1.webp"
                        alt="End of Lease Cleaning Melbourne"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute top-10 left-10 bg-green-900 text-white p-6 shadow-2xl rounded-sm">
                        <p className="text-2xl font-serif text-green-400">100%</p>
                        <p className="text-[9px] font-black uppercase tracking-widest">Bond Return Success</p>
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
                        Moving out of a rental property can be stressful enough without worrying about your bond. With the average rental bond in Melbourne being $2,000-$4,000, getting it back in full should be your top priority.
                    </motion.p>

                    {/* TWO COLUMN INFO */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-y border-gray-100 py-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2"><Home size={22} className="text-green-600" /> What is Bond Cleaning?</h2>
                            <p className="text-sm">It's a deep clean designed to return the property to the same condition it was in when you moved in. This goes far beyond your regular weekly routine.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck size={22} className="text-green-600" /> Victoria Tenancy Laws</h2>
                            <p className="text-sm">Under Victorian law, you must leave the property in a 'reasonably clean condition'. Failure can result in heavy deductions from your bond.</p>
                        </motion.div>
                    </section>

                    {/* CHECKLIST SECTIONS */}
                    <section>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-serif text-gray-900 mb-10 text-center"
                        >
                            The Complete Cleaning Checklist
                        </motion.h2>
                        <div className="space-y-8">
                            {checklist.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
                                        <Sparkles className="text-green-600" size={18} /> {section.room}
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-xs text-gray-500">
                                                <CheckCircle2 size={14} className="text-green-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* COMMON MISTAKES BOX */}
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-orange-50 p-10 rounded-sm border-l-8 border-orange-400"
                    >
                        <h2 className="text-2xl font-serif text-orange-900 mb-6 flex items-center gap-3">
                            <AlertCircle /> Mistakes That Cost Bonds
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-800 font-medium">
                            <li>• Not cleaning inside appliances</li>
                            <li>• Missing ceiling fans/fixtures</li>
                            <li>• Ignoring wall marks & scuffs</li>
                            <li>• Inadequate carpet cleaning</li>
                        </ul>
                    </motion.section>

                    {/* DIY VS PROFESSIONAL TABLE */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="overflow-hidden rounded-xl border border-gray-200"
                    >
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="p-6">Feature</th>
                                    <th className="p-6">DIY Cleaning</th>
                                    <th className="p-6 text-green-600">Professional</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-6 font-bold">Equipment</td>
                                    <td className="p-6">Household grade</td>
                                    <td className="p-6">Commercial grade</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-bold">Bond Guarantee</td>
                                    <td className="p-6 text-red-400">None</td>
                                    <td className="p-6 text-green-600 font-bold">100% Included</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.section>

                    {/* CONCLUSION CTA */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-green-900 text-white p-12 rounded-sm text-center"
                    >
                        <h2 className="text-3xl font-serif mb-6 text-green-400 italic">"Invest in Professional Cleaning, Save Your Bond."</h2>
                        <p className="max-w-xl mx-auto text-green-100/70 mb-10 leading-relaxed">
                            Based on 12+ years of experience, we know exactly what property managers look for. Don't risk thousands of dollars.
                        </p>
                        <button className="bg-white text-green-900 px-12 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-green-400 transition-all shadow-xl">
                            Book Bond Back Clean
                        </button>
                    </motion.footer>

                </article>
            </div>
        </main>
    );
}