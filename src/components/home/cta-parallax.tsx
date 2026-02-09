"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, Calendar } from 'lucide-react';

const contactOptions = [
    { icon: <Phone size={24} />, title: "Call Now", detail: "043971720", color: "bg-orange-500" },
    { icon: <MessageSquare size={24} />, title: "Text Us", detail: "043971720", color: "bg-green-500" },
    { icon: <Mail size={24} />, title: "Email Us", detail: "info@freshpluscleaning.com.au", color: "bg-orange-500" },
    { icon: <Calendar size={24} />, title: "Book Online", detail: "See Price Instantly", color: "bg-green-500" },
];

export default function CtaParallax() {
    return (
        <section
            className="relative min-h-[600px] py-24 flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: "url('/stc.webp')",
                fontFamily: "'Times New Roman', Times, serif"
            }}
        >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-black">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tight"
                >
                    Ready for a <span className="text-green-600">Cleaner</span> Home or Office?
                </motion.h2>

                {/* Desc & Button */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="text-gray-800 mb-12 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
                        Get your free quote today and experience the Fresh Plus difference across Melbourne.
                    </p>

                    <button className="bg-green-600 hover:bg-black hover:text-white text-white font-black py-5 px-12 rounded-xl uppercase tracking-widest mb-20 transition-all duration-300 shadow-2xl border-2 border-transparent hover:-translate-y-2">
                        See Instant Pricing
                    </button>
                </motion.div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactOptions.map((opt, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.15, ease: "backOut" }}
                            className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] flex flex-col items-center group hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer shadow-sm"
                        >
                            <div className={`${opt.color} p-5 rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {opt.icon}
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-gray-500">{opt.title}</h4>
                            <p className="text-sm md:text-base font-black text-black break-all w-full">{opt.detail}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Working Hours Badge with Bigger Emergency Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 inline-block bg-black/5 backdrop-blur-md px-10 py-6 rounded-2xl border border-black/10"
                >
                    <p className="text-sm md:text-base font-black text-black leading-relaxed">
                        Monday - Sunday: 8:00 AM - 5:00 PM <br className="md:hidden" />
                        <span className="block md:inline md:ml-4 text-green-600 text-base md:text-lg font-bold">
                            Emergency services available 24/7
                        </span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
