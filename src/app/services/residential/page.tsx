"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WhyChooseUs from "@/components/home/why-choose-us";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { Check } from "lucide-react";

const servicesList = [
  {
    title: "Kitchen Cleaning",
    desc: "Deep degreasing of ovens, stove tops, and sparkling surfaces.",
    img: "/cleaner1.webp"
  },
  {
    title: "Bathroom Sanitization",
    desc: "Complete disinfection and lime-scale removal for a fresh finish.",
    img: "/cleaner2.webp"
  },
  {
    title: "Living Area Dusting",
    desc: "Meticulous cleaning of furniture, floors, and windows.",
    img: "/cleaner3.avif"
  }
];

const plans = [
  {
    name: "One-Time Clean",
    desc: "Perfect for special occasions or when you need a fresh start.",
    features: ["Deep home cleaning", "Basic kitchen/bath", "Eco products", "Satisfaction guarantee"],
    btn: "See Pricing",
    color: "border-brand-blue-light",
    btnColor: "bg-brand-blue"
  },
  {
    name: "Regular Weekly",
    desc: "Maintain a consistently clean home for your family's health.",
    features: ["All weekly tasks", "Disinfecting surfaces", "Priority booking", "15% discount"],
    btn: "See Pricing",
    color: "border-brand-orange-light",
    btnColor: "bg-brand-orange",
    popular: true
  },
  {
    name: "Fortnightly Service",
    desc: "The perfect balance of cleanliness and affordability.",
    features: ["Every two weeks", "Deep floor care", "Flexible schedule", "10% discount"],
    btn: "See Pricing",
    color: "border-brand-blue-light",
    btnColor: "bg-brand-blue"
  }
];

const locations = [
  "Melbourne CBD", "South Melbourne", "Richmond", "Collingwood", "Fitzroy",
  "Carlton", "St Kilda", "Prahran", "Toorak", "Kew",
  "Hawthorn", "Footscray", "Doncaster", "Brunswick", "Epping"
];

export default function ResidentialCleaning() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="relative min-h-screen bg-white overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>

        {/* 1. HERO SECTION */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative pt-64 pb-24 px-6 text-center overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Home_Hero.webp"
              alt="Background"
              fill
              priority
              className="object-cover brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 relative z-10"
            >
              Residential Cleaning <span className="text-brand-green">Melbourne</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto font-medium relative z-10"
            >
              Experience a new level of clean, tailored for your home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="relative mt-12 max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image src="/cleaner2.webp" alt="Residential" width={1200} height={600} priority className="w-full h-auto object-cover" />
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link href="/get-quote">
                <GradientButton className="text-[12px] px-8 py-4 uppercase tracking-widest shadow-lg">
                  See Instant Pricing
                </GradientButton>
              </Link>
              <a href="tel:0431977720" className="bg-white border-2 border-brand-blue-dark text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white px-8 py-4 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1 block text-center flex items-center justify-center">
                Call 0431 977 720
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* 2. WHY CHOOSE US */}
        <section className="py-10">
          <WhyChooseUs />
        </section>

        {/* 3. OUR CLEANING SERVICES */}
        <section className="relative h-auto py-32 flex items-center justify-center overflow-hidden">
          {/* Parallax Image Overlay */}
          <div
            className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: "url('/cleaner1.webp')",
              filter: "brightness(0.35)"
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Our Cleaning <span className="text-brand-green">Services</span>
              </h2>
              <div className="h-1.5 w-32 bg-brand-orange mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {servicesList.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -20 }}
                  className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center border border-white/30"
                >
                  <div className="h-56 w-full relative overflow-hidden rounded-[2rem] mb-6 shadow-md">
                    <Image src={service.img} alt={service.title} fill className="object-cover transition-transform hover:scale-105" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4 text-black tracking-tight">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium mb-4">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FLEXIBLE CLEANING PLANS (Master Green Card) */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative max-w-7xl mx-auto rounded-[3.5rem] border-4 border-brand-green p-8 md:p-16 bg-brand-green-light"
          >
            {/* Section Title Animation */}
            <div className="text-center mb-16 relative z-10">
              <motion.h2
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-black"
              >
                Flexible Cleaning <span className="text-brand-green">Plans</span>
              </motion.h2>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-500 max-w-xl mx-auto font-medium"
              >
                Choose the service frequency that fits your lifestyle and budget.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className={`relative p-8 rounded-[2.5rem] border-2 bg-white shadow-sm flex flex-col ${plan.color}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black mb-4 text-black uppercase">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-8 h-12">{plan.desc}</p>
                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feat, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <Check size={16} className="text-brand-green shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/get-quote" className="w-full block">
                    <button className={`w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-md ${plan.btnColor}`}>
                      {plan.btn}
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. LOCATIONS GRID (Green Cards Animation) */}
        <section className="py-24 bg-gray-50/50 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-black uppercase tracking-tighter mb-12 text-black"
            >
              Serving Melbourne <span className="text-brand-green">Suburbs</span>
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {locations.map((loc, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: "var(--brand-green)" }}
                  className="px-6 py-4 bg-brand-green text-white rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-brand-green"
                >
                  {loc}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

      </main >
      <Footer />
    </div >
  );
}
