"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { Award, ShieldCheck, Heart, Leaf } from 'lucide-react';
import WhyChooseFreshPlus from "./why-melbourne-chooses";

const backgroundImages = [
    '/cleaner1.webp',
    '/res-clean.webp',
    '/commercial-cleaning.webp',
    '/window-cleaning.webp'
];

const storyLines = [
    { title: "Since 2012", text: "Melbourne's most reliable cleaning service." },
    { title: "Our Mission", text: "Every home deserves to be a sanctuary of comfort." },
    { title: "Trust & Quality", text: "Upholding the Fresh Plus standard of excellence." },
    { title: "Our Passion", text: "Serving all Melbourne suburbs with attention to detail." }
];

const stats = [
    { value: "12+", label: "Years Experience" },
    { value: "Thousands", label: "Homes Served" },
    { value: "100%", label: "Melbourne Owned" },
    { value: "24/7", label: "Premium Support" },
];

export default function AboutPageContent() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % storyLines.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Journey Section Animation
    const journeyVariants: Variants = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    // Values Container (for stagger effect)
    const containerVariants: Variants = {
        initial: { opacity: 0 },
        whileInView: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardItemVariants: Variants = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <main className="bg-white overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>

            <h1 className="sr-only">About Fresh Plus Cleaning - Melbourne's Trusted Family-Owned Cleaners</h1>

            {/* 1. HERO SLIDESHOW */}
            <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <Image
                            src={backgroundImages[currentSlide % backgroundImages.length]}
                            alt="Fresh Plus Cleaning Journey"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-10 max-w-5xl px-6 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-green-400 font-black uppercase tracking-[0.4em] text-sm block mb-6">
                                {storyLines[currentSlide].title}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
                                {storyLines[currentSlide].text}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* 2. OUR JOURNEY (Green Border & Animation) */}
            <section className="relative py-32 px-6 bg-white overflow-hidden">
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={journeyVariants}
                    className="relative z-10 max-w-5xl mx-auto"
                >
                    {/* Journey Card with Green Border */}
                    <div className="bg-white border-2 border-green-500 p-10 md:p-20 rounded-[4rem] shadow-sm">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 uppercase tracking-tight text-center">
                            Our <span className="text-green-600">Journey</span>
                        </h2>

                        <div className="text-xl md:text-2xl text-gray-700 leading-relaxed space-y-8 text-center">
                            <p>
                                What started as a small family business in 2012 has grown into Melbourne's most reliable cleaning service.
                            </p>

                            <div className="py-10 px-8 bg-green-600 rounded-[2.5rem] my-12 shadow-xl">
                                <p className="text-2xl md:text-3xl font-bold text-white italic leading-snug">
                                    "We don't just clean homes, we create spaces where families can thrive."
                                </p>
                            </div>

                            <p>
                                Over the past 12+ years, we've built our reputation one satisfied customer at a time, dedicated to the Fresh Plus standard.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 3. STATS (Still Background Parallax) */}
            <section className="relative min-h-[60vh] flex items-center justify-center py-20 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/commercial-cleaning.webp')" }}>
                <div className="absolute inset-0 bg-black/60 z-0" />

                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 w-full">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/95 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-2xl text-center border-b-8 border-green-500"
                        >
                            <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-green-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. OUR VALUES (Text Animation + One by One Cards) */}
            <section className="py-40 px-6 bg-white">
                <div className="max-w-7xl mx-auto">

                    {/* Animated Text */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-gray-900">
                            Our <span className="text-green-600">Values</span>
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 100 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="h-1 bg-green-500 mx-auto mt-6"
                        />
                    </motion.div>

                    {/* Staggered Cards (One by One) */}
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            { icon: Award, title: "Excellence", desc: "Setting the gold standard in cleanliness across all Melbourne suburbs." },
                            { icon: ShieldCheck, title: "Integrity", desc: "Built on absolute honesty. Every team member is vetted strictly." },
                            { icon: Heart, title: "Care", desc: "We handle your space with empathy, treating every home as our own." },
                            { icon: Leaf, title: "Passion", desc: "Serving with dedication that defined our first day back in 2012." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardItemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="p-10 rounded-[2rem] bg-white border-2 border-green-500 shadow-md transition-all duration-300 text-center flex flex-col items-center"
                            >
                                <div className="mb-6 text-green-600">
                                    <item.icon size={44} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold uppercase mb-4 text-gray-900 tracking-tight">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <WhyChooseFreshPlus />
        </main>
    );
}
