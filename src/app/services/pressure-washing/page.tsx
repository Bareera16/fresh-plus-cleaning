"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WhyChooseUs from "@/src/components/home/why-choose-us";
import Navbar from "@/src/components/home/navbar";
import Footer from "@/src/components/home/footer";
import { Check, Home, Droplets, Warehouse } from "lucide-react";

const pressureWashServices = [
  {
    title: "Driveway Cleaning",
    desc: "Remove oil stains, tire marks, and years of dirt from concrete and paved driveways.",
    icon: <Droplets size={40} className="text-orange-500" />
  },
  {
    title: "Deck & Patio",
    desc: "Restore wooden decks and outdoor patios to their natural beauty.",
    icon: <Home size={40} className="text-orange-500" />
  },
  {
    title: "Building Exteriors",
    desc: "Clean walls, facades, and external surfaces for homes and businesses.",
    icon: <Warehouse size={40} className="text-orange-500" />
  }
];

const plans = [
  {
    name: "Residential Blast",
    desc: "Perfect for cleaning driveways and pathways around your home.",
    features: ["Driveway washing", "Sidewalk cleaning", "Mold/Algae removal", "Eco-friendly soaps"],
    btn: "See Pricing",
    color: "border-blue-200",
    btnColor: "bg-blue-700"
  },
  {
    name: "Full Exterior Wash",
    desc: "Complete revitalization of your property's exterior surfaces.",
    features: ["House soft wash", "Gutter exterior clean", "Deck/Patio refresh", "10% multi-service discount"],
    btn: "See Pricing",
    color: "border-orange-400",
    btnColor: "bg-orange-500",
    popular: true
  },
  {
    name: "Commercial Grade",
    desc: "Heavy-duty cleaning for large parking lots and commercial facades.",
    features: ["High-pressure treatment", "Gum & stain removal", "After-hours service", "Monthly maintenance"],
    btn: "See Pricing",
    color: "border-blue-200",
    btnColor: "bg-blue-700"
  }
];

const locations = [
  "Melbourne CBD", "South Yarra", "St Kilda", "Brighton", "Toorak",
  "Doncaster", "Kew", "Richmond", "Malvern", "Hawthorn",
  "Camberwell", "Balwyn", "Glen Iris", "Prahran", "Windsor"
];

export default function PressureWashing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="relative min-h-screen bg-white overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>

        {/* 1. HERO SECTION */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative pt-48 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white text-center"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4"
            >
              Pressure Washing <span className="text-green-600">Melbourne</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium"
            >
              Our professional pressure washing service uses state-of-the-art equipment to safely restore your property's curb appeal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative mt-12 max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image src="/pressure.avif" alt="Pressure Washing" width={1200} height={600} priority className="w-full h-auto object-cover" />
            </motion.div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-orange-500 hover:bg-black text-white px-8 py-4 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1">
                Request Free Quote
              </button>
              <button className="border-2 border-blue-900 text-blue-900 px-8 py-4 font-black uppercase text-[12px] tracking-widest transition-all shadow-lg hover:-translate-y-1">
                Call 0431 977 720
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. PARALLAX PRESSURE WASHING SERVICES SECTION */}
        <section className="relative h-auto py-32 flex items-center justify-center overflow-hidden">
          {/* Parallax Image Overlay */}
          <div
            className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: "url('/pressure.avif')",
              filter: "brightness(0.35)"
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Professional <span className="text-green-500">Washing</span> Services
              </h2>
              <div className="h-1.5 w-32 bg-orange-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {pressureWashServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -20 }}
                  className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl flex flex-col items-center text-center border border-white/30"
                >
                  <div className="mb-6 bg-blue-50 p-5 rounded-3xl text-blue-600 shadow-inner">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4 text-black tracking-tight">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHY CHOOSE SECTION */}
        <section className="py-20 bg-white">
          <WhyChooseUs />
        </section>

        {/* 4. SERVICE PACKAGES (Master Green Card Style) */}
        <section className="py-24 px-6 md:px-12 bg-gray-50/50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative max-w-7xl mx-auto rounded-[4rem] border-4 border-green-500/30 p-8 md:p-20 bg-white shadow-2xl shadow-green-900/5"
          >
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
                Service <span className="text-green-600">Packages</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto font-medium">Power through the grime with our tailored washing plans.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className={`relative p-10 rounded-[3rem] border-2 bg-white shadow-lg flex flex-col ${plan.color}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Best Value
                    </div>
                  )}
                  <h3 className="text-2xl font-black mb-4 text-black uppercase tracking-tighter">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-8 h-12 leading-tight">{plan.desc}</p>
                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feat, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <Check size={18} className="text-green-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-5 rounded-[2rem] text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-md ${plan.btnColor} hover:brightness-110`}>
                    {plan.btn}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 5. LOCATIONS GRID WITH ADVANCED MOTION */}
          <div className="max-w-7xl mx-auto text-center mt-20">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-black uppercase tracking-tighter mb-4 text-black"
            >
              Melbourne Areas <span className="text-green-600">We Service</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 mb-12 font-medium"
            >
              Click on your suburb to check availability
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
            >
              {locations.map((loc, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    show: { opacity: 1, scale: 1, y: 0 }
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#15803d",
                    color: "#ffffff",
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-green-50 border border-green-100 text-green-800 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors shadow-sm flex items-center justify-center min-w-[160px]"
                >
                  {loc}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
