"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Info } from "lucide-react";

const services = [
    { id: 1, name: "Residential Cleaning", price: 152, tag: "Popular" },
    { id: 2, name: "End of Lease", price: 197, tag: "Bond Back Guarantee" },
    { id: 3, name: "Deep Cleaning", price: 224, tag: "Heavy Soiled" },
    { id: 4, name: "Commercial Cleaning", price: 70, tag: "Per Hour" },
    { id: 5, name: "Carpet & Rug", price: "Quote", tag: "Free Quote" },
    { id: 6, name: "Window Cleaning", price: "Quote", tag: "Free Quote" }
];

export default function GetQuotePage() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);

    // Video-style smooth transitions
    const variants = {
        enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({ x: direction < 0 ? 200 : -200, opacity: 0 })
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] py-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* 1. Video-Style Progress Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Get a Instant Quote</h1>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-4 py-1 rounded-full border border-green-100">Step {step} of 4</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-600"
                            initial={{ width: "25%" }}
                            animate={{ width: `${step * 25}%` }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100 min-h-[600px] flex flex-col md:flex-row">

                    {/* 2. Side Content (From Video Style) */}
                    <div className="md:w-1/3 bg-green-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <Info className="mb-6 opacity-50" size={32} />
                            <h2 className="text-3xl font-bold leading-tight mb-4">With more details comes a better quote</h2>
                            <p className="text-green-100 text-sm opacity-80 italic">Select the best service that fits your needs today.</p>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
                    </div>

                    {/* 3. Main Form Area (Animated Steps) */}
                    <div className="md:w-2/3 p-8 md:p-12 relative">
                        <AnimatePresence mode="wait" custom={step}>
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    custom={1}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.6 }}
                                    className="space-y-6"
                                >
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-800">What service do you need?</h3>
                                        <p className="text-gray-400 text-sm">Select a service to see instant pricing</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {services.map((s) => (
                                            <div
                                                key={s.id}
                                                onClick={() => setSelectedService(s.id)}
                                                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between h-32 ${selectedService === s.id ? 'border-green-600 bg-green-50/50 shadow-lg' : 'border-gray-100 hover:border-green-200'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${selectedService === s.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{s.tag}</span>
                                                    {selectedService === s.id && <Check size={16} className="text-green-600" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                                                    <p className="text-green-600 font-black text-lg">${s.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    custom={1}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.6 }}
                                    className="space-y-8"
                                >
                                    <h3 className="text-xl font-bold text-gray-800">Tell us about your property</h3>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Number of Bedrooms" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-green-600 outline-none transition-all" />
                                            <input type="text" placeholder="Number of Bathrooms" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-green-600 outline-none transition-all" />
                                        </div>
                                        <input type="text" placeholder="Property Address" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-green-600 outline-none transition-all" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                            <button
                                onClick={() => setStep(s => Math.max(1, s - 1))}
                                className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-black'}`}
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button
                                onClick={() => setStep(s => Math.min(4, s + 1))}
                                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-green-700 shadow-xl shadow-green-100 transition-all"
                            >
                                {step === 4 ? "Get Final Quote" : "Next Step"} <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video-Style Bottom Indicators */}
                <div className="mt-8 flex justify-center gap-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    <span className={step >= 1 ? "text-green-600" : ""}>01 Service</span>
                    <span>•</span>
                    <span className={step >= 2 ? "text-green-600" : ""}>02 Details</span>
                    <span>•</span>
                    <span className={step >= 3 ? "text-green-600" : ""}>03 Extras</span>
                    <span>•</span>
                    <span className={step >= 4 ? "text-green-600" : ""}>04 Schedule</span>
                </div>
            </div>
        </main>
    );
}