"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { Award, ShieldCheck, Heart, Leaf } from 'lucide-react';
import WhyChooseFreshPlus from "../components/why-melbourne-chooses";

const backgroundImages = [
  '/cleaner1.jpg',
  '/res-clean.jpg',
  '/commercial-cleaning.jpg',
  '/window-cleaning.jpg'
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

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storyLines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Journey & General Animation
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 60 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Stats Card Animation (Spring Pop)
  const statsContainer: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const statItem: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.8 },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  // Values Card Animation (Slide & Fade)
  const valueCardVariants: Variants = {
    initial: { opacity: 0, x: -30, rotate: -2 },
    whileInView: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "backOut" }
    }
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

      {/* 2. OUR JOURNEY */}
      <section className="relative py-32 px-6 bg-white">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="bg-white border border-green-100 p-10 md:p-20 rounded-[4rem] shadow-sm">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 uppercase tracking-tight text-center">
              Our <span className="text-green-600">Journey</span>
            </motion.h2>

            <div className="text-xl md:text-2xl text-gray-700 leading-relaxed space-y-8 text-center">
              <motion.p variants={fadeInUp}>
                What started as a small family business in 2012 has grown into Melbourne's most reliable cleaning service.
              </motion.p>

              <motion.div variants={fadeInUp} className="py-10 px-8 bg-green-600 rounded-[2.5rem] my-12 shadow-xl text-white italic">
                <p className="text-2xl md:text-3xl font-bold">"We don't just clean homes, we create spaces where families can thrive."</p>
              </motion.div>

              <motion.p variants={fadeInUp}>
                Over the past 12+ years, we've built our reputation one satisfied customer at a time.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. STATS WITH FIXED BACKGROUND & CARD ANIMATION */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Parallax Background (Fixed) */}
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/commercial-cleaning.jpg')" }}>
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <motion.div
          variants={statsContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 w-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={statItem}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl text-center border-b-8 border-green-500"
            >
              <div className="text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. OUR VALUES (Green Borders & Individual Card Animations) */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-gray-900">
              Our <span className="text-green-600">Values</span>
            </h2>
            <div className="h-1 w-24 bg-green-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Excellence", desc: "Setting the gold standard in cleanliness across all Melbourne suburbs." },
              { icon: ShieldCheck, title: "Integrity", desc: "Built on absolute honesty. Every team member is vetted strictly." },
              { icon: Heart, title: "Care", desc: "We handle your space with empathy, treating every home as our own." },
              { icon: Leaf, title: "Passion", desc: "Serving with dedication that defined our first day back in 2012." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={valueCardVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }} // Staggering effect
                whileHover={{
                  scale: 1.03,
                  borderColor: "#16a34a",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
                }}
                className="p-10 rounded-[2rem] bg-white border-2 border-green-500 shadow-sm transition-all duration-300 text-center flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: (idx * 0.1) + 0.3, type: "spring" }}
                  className="mb-6 text-green-600"
                >
                  <item.icon size={44} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-2xl font-bold uppercase mb-4 text-gray-900 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseFreshPlus />
    </main>
  );
}