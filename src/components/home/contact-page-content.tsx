"use client";
import React from 'react';
import { motion, Variants } from "framer-motion";
import Image from 'next/image';
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import ContactForm from "@/src/components/ContactForm";

const suburbs = [
    "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy",
    "Carlton", "St Kilda", "Prahran", "Toorak", "Hawthorn",
    "Camberwell", "Kew", "Northcote", "Thornbury", "Preston"
];

// Slow & Smooth Animation Settings
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.0, ease: "easeOut" }
    }
};

export default function ContactPageContent() {
    return (
        <main className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>

            {/* 1. HERO SECTION */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/commercial-cleaning.webp')",
                        filter: "brightness(0.35)"
                    }}
                />

                <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight"
                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    >
                        Contact Fresh Plus Cleaning Melbourne
                    </motion.h1>
                </div>
            </section>

            {/* 2. CONTACT CARDS SECTION WITH PARALLAX */}
            <section className="relative py-32 px-6 flex flex-col items-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/about.webp')",
                        filter: "brightness(0.3)"
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-3 gap-10 w-full"
                    >
                        {[
                            { icon: <Phone size={28} />, title: "Call Us", detail: "043971720", link: "tel:043971720" },
                            { icon: <MessageCircle size={28} />, title: "Text Us", detail: "043971720", link: "sms:043971720" },
                            { icon: <Mail size={28} />, title: "Email Us", detail: "info@freshpluscleaning.com.au", link: "mailto:info@freshpluscleaning.com.au" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -15, transition: { duration: 0.4 } }}
                                className="bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center text-center group cursor-pointer border border-white/50"
                            >
                                {/* Icon with Smooth Transition */}
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all duration-700">
                                    <div className="text-green-600 group-hover:text-white transition-colors duration-500">
                                        {item.icon}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 mb-3 transition-colors duration-500 group-hover:text-green-700">
                                    {item.title}
                                </h3>
                                <a href={item.link} className="text-green-600 font-extrabold text-sm md:text-base hover:underline break-all transition-colors duration-500">
                                    {item.detail}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 2. SERVICE AREAS (Slow Sequential Entry) */}
            <section className="py-24 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 text-green-600 font-bold uppercase tracking-[0.3em] text-[10px]">
                        <MapPin size={14} />
                        <span>Our Reach</span>
                    </div>

                    <h2 className="text-[14px] font-medium text-gray-500 uppercase tracking-[0.3em] mb-16" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Melbourne, VIC — <span className="text-gray-400 font-normal">Suburbs covered</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {suburbs.map((suburb, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.08 }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#14532d",
                                    transition: { duration: 0.3 }
                                }}
                                className="bg-green-600 text-white py-5 rounded-2xl font-bold text-xs tracking-wider shadow-md cursor-default"
                            >
                                {suburb}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CONTACT FORM (Slower Scroll Reveal) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-20">

                        {/* Left Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }} // Slow reveal
                            className="relative w-full lg:w-1/2 h-[650px]"
                        >
                            <div className="relative w-full h-full rounded-r-[250px] rounded-l-[50px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white">
                                <Image src="/contact-clean.avif" alt="Cleaning" fill className="object-cover" />
                            </div>
                        </motion.div>

                        {/* Right Form - Backend Integrated */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-full lg:w-1/2"
                        >
                            <h2 className="text-5xl font-black text-black mb-12 uppercase tracking-tighter leading-none">
                                Let's <span className="text-green-600 italic">Connect</span>
                            </h2>

                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
