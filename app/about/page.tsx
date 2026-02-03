"use client";

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';



const backgroundImages = [

  '/cleaner1.jpg',

  '/res-clean.jpg',

  '/commercial-cleaning.jpg',

  '/window-cleaning.jpg'

];

import WhyChooseFreshPlus from "../components/why-melbourne-chooses";

import { CheckCircle, Target, Award, Users, TrendingUp, ShieldCheck, Heart, Leaf } from 'lucide-react';



const storyLines = [

  { title: "Our Story", text: "Founded in 2014 with a simple vision: excellence in every corner." },

  { title: "The Journey", text: "From a team of two to Melbourne's premier cleaning provider." },

  { title: "Our Growth", text: "Serving hundreds of homes and offices with passion and precision." },

  { title: "The Promise", text: "Unwavering commitment to quality and eco-friendly solutions." }

];



const stats = [

  { value: "10+", label: "Years Experience" },

  { value: "5000+", label: "Homes Cleaned" },

  { value: "100%", label: "Satisfaction" },

  { value: "24/7", label: "Support" },

];



export default function AboutPage() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const [hasWindow, setHasWindow] = useState(false);



  useEffect(() => {

    setHasWindow(true);

    // Automatic Slide Timer (Har 4 second baad agli line aayegi)

    const timer = setInterval(() => {

      setCurrentSlide((prev) => (prev + 1) % storyLines.length);

    }, 4000);

    return () => clearInterval(timer);

  }, []);



  return (

    <main className="bg-white overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>



      {/* 1. CINEMATIC IMAGE SLIDESHOW STORY SECTION */}

      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

        <AnimatePresence mode="popLayout">

          <motion.div

            key={currentSlide}

            className="absolute inset-0 z-0"

            initial={{ opacity: 0, scale: 1.1 }}

            animate={{ opacity: 0.6, scale: 1 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 1.5, ease: "easeInOut" }}

          >

            <Image

              src={backgroundImages[currentSlide % backgroundImages.length]}

              alt="Background"

              fill

              className="object-cover"

              priority

            />

            <div className="absolute inset-0 bg-black/40" /> {/* Overlay for text readability */}

          </motion.div>

        </AnimatePresence>



        {/* Text Slides Overlay */}

        <div className="relative z-10 max-w-4xl px-6 text-center">

          <AnimatePresence mode="wait">

            <motion.div

              key={currentSlide}

              initial={{ opacity: 0, y: 30 }}

              animate={{ opacity: 1, y: 0 }}

              exit={{ opacity: 0, y: -30 }}

              transition={{ duration: 0.8, ease: "easeInOut" }}

              className="space-y-4"

            >

              <motion.span

                className="text-green-400 font-black uppercase tracking-[0.3em] text-sm"

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                transition={{ delay: 0.2 }}

              >

                {storyLines[currentSlide].title}

              </motion.span>

              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>

                {storyLines[currentSlide].text}

              </h2>

            </motion.div>

          </AnimatePresence>



          {/* Slide Indicators (Choti dots) */}

          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex gap-3">

            {storyLines.map((_, i) => (

              <div

                key={i}

                className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? "w-12 bg-green-500" : "w-4 bg-white/30"}`}

              />

            ))}

          </div>

        </div>

      </section>



      {/* 2. STATS BAR (Floating over video edge) */}

      <section className="relative z-30 -mt-24 -mb-24 px-6 pointer-events-none">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">

          {stats.map((stat, i) => (

            <motion.div

              key={i}

              initial={{ scale: 0.9, opacity: 0 }}

              whileInView={{ scale: 1, opacity: 1 }}

              transition={{ delay: i * 0.1 }}

              className="bg-white p-8 rounded-[2rem] shadow-2xl text-center border border-gray-100"

            >

              <div className="text-4xl font-black text-green-600">{stat.value}</div>

              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>

            </motion.div>

          ))}

        </div>

      </section>



      {/* 3. CORE VALUES GRID */}
      <section className="py-32 px-6 bg-white">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
              Our <span className="text-brand-green">Values</span>
            </h2>
            <p className="text-gray-500 mt-4 font-medium">Built on trust, delivered with precision.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Excellence", desc: "We maintain the highest standards in every clean." },
              { icon: ShieldCheck, title: "Integrity", desc: "Honest, transparent, and trustworthy service." },
              { icon: Heart, title: "Care", desc: "We treat your home like our own." },
              { icon: Leaf, title: "Sustainability", desc: "Eco-friendly products and practices." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-white border border-brand-green shadow-xl group hover:bg-brand-green hover:border-white transition-all duration-500"
              >
                <item.icon size={40} className="text-brand-green mb-6 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-black uppercase mb-3 text-black group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm group-hover:text-white transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 4. WHY CHOOSE US */}

      <WhyChooseFreshPlus />





    </main>

  );

}