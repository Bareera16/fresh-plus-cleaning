"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Calendar, Clock, MapPin, User, Mail, Phone, ShieldCheck, Star, Leaf, Home, Building, Sparkles } from "lucide-react";

// Service Data
const services = [
    { id: 'residential', name: "Residential Cleaning", price: 152, description: "Regular home cleaning with bedroom-based pricing", tag: "Popular", icon: Home },
    { id: 'lease', name: "End of Lease Cleaning", price: 197, description: "Bond-back guarantee cleaning for rental properties", tag: "Bond Back Guarantee", icon: Sparkles },
    { id: 'deep', name: "Deep Cleaning", price: 224, description: "Intensive cleaning for heavily soiled areas", tag: "Deep Clean", icon: Sparkles },
    { id: 'commercial', name: "Commercial Cleaning", price: 70, description: "Office, warehouse & retail cleaning", tag: "Per Hour", icon: Building },
    { id: 'carpet', name: "Carpet & Rug Cleaning", price: 0, description: "Steam & dry carpet cleaning", tag: "Get Free Quote", icon: Sparkles },
    { id: 'window', name: "Window Cleaning", price: 0, description: "Interior & exterior window cleaning", tag: "Get Free Quote", icon: Sparkles }
];

// Extras Data
const extrasList = [
    { id: 'oven', name: "Inside Oven", price: 59 },
    { id: 'fridge', name: "Inside Fridge", price: 49 },
    { id: 'windows', name: "Interior Windows", price: 79 },
    { id: 'cabinets', name: "Inside Cabinets", price: 59 },
    { id: 'walls', name: "Wall Washing", price: 89 },
    { id: 'balcony', name: "Balcony Cleaning", price: 39 },
];

export default function GetQuotePage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: null as string | null,
        bedrooms: 1,
        bathrooms: 1,
        extras: [] as string[],
        date: "",
        time: "morning",
        contact: { firstName: "", lastName: "", email: "", phone: "", address: "", suburb: "", postcode: "", notes: "" }
    });

    // Helper to get current service object
    const currentService = services.find(s => s.id === formData.service);

    // Dynamic Pricing Logic
    const basePrice = currentService?.price || 0;
    const isQuoteOnly = basePrice === 0;

    // Room Surcharges (Example logic: +$30/room over 1, +$20/bath over 1)
    // Only applies to residential types
    const appliesRoomCharges = ['residential', 'lease', 'deep'].includes(currentService?.id || '');
    const roomSurcharge = appliesRoomCharges
        ? ((formData.bedrooms - 1) * 30) + ((formData.bathrooms - 1) * 20)
        : 0;

    // Extras Total
    const extrasTotal = formData.extras.reduce((acc, curr) => {
        const item = extrasList.find(e => e.id === curr);
        return acc + (item ? item.price : 0);
    }, 0);

    const totalPrice = basePrice + roomSurcharge + extrasTotal;

    // Handlers
    const handleServiceSelect = (id: string) => {
        setFormData(prev => ({ ...prev, service: id }));
        // Auto advance to next step after short delay for better UX
        setTimeout(() => setStep(2), 300);
    };

    const toggleExtra = (id: string) => {
        setFormData(prev => {
            const isSelected = prev.extras.includes(id);
            if (isSelected) {
                return { ...prev, extras: prev.extras.filter(e => e !== id) };
            } else {
                return { ...prev, extras: [...prev.extras, id] };
            }
        });
    };

    // Render Header for Accordion
    const renderStepHeader = (num: number, title: string, subtitle: string) => {
        const isActive = step === num;
        const isCompleted = step > num;

        return (
            <div
                onClick={() => setStep(num)}
                className={`flex items-center justify-between p-6 cursor-pointer transition-colors ${isActive ? 'bg-white' : 'bg-white hover:bg-gray-50'}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-200' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        {isCompleted ? <Check size={18} /> : num}
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg leading-tight ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h3>
                        <p className="text-sm text-gray-400 hidden md:block">{subtitle}</p>
                    </div>
                </div>
                <ChevronDown className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-green-600' : 'text-gray-300'}`} />
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] pt-36 pb-12 px-4 md:px-8 font-sans relative overflow-hidden">

            {/* Animated Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-green-300/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-blue-200/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, 60, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-green-100/40 rounded-full blur-[130px]"
                />
            </div>

            <div className="relative z-10">

                {/* Trust Badges */}
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-center gap-6 md:gap-12 mb-12 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-2"><ShieldCheck className="text-green-600" size={20} /> Fully Insured</div>
                    <div className="flex items-center gap-2"><Star className="text-green-600" size={20} /> 100% Guarantee</div>
                    <div className="flex items-center gap-2"><Clock className="text-green-600" size={20} /> 12+ Years</div>
                    <div className="flex items-center gap-2"><MapPin className="text-green-600" size={20} /> Melbourne Local</div>
                    <div className="flex items-center gap-2"><Leaf className="text-green-600" size={20} /> Eco-Friendly</div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN: STEPS */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* STEP 1: SERVICE */}
                        <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 1 ? 'border-green-500 ring-4 ring-green-50/50' : 'border-gray-200'}`}>
                            {renderStepHeader(1, "Select Your Service", "Choose what you need")}
                            <AnimatePresence initial={false}>
                                {step === 1 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 border-t border-gray-100">
                                            <div className="py-6 mb-4 text-center">
                                                <h4 className="text-xl font-bold text-gray-900">What service do you need?</h4>
                                                <p className="text-gray-500 text-sm mt-1">Select a service to see instant pricing</p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {services.map((s) => (
                                                    <div
                                                        key={s.id}
                                                        onClick={() => handleServiceSelect(s.id)}
                                                        className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md hover:border-green-300 group flex flex-col justify-between h-full min-h-[160px] ${formData.service === s.id ? 'border-green-600 bg-green-50/30' : 'border-gray-100 bg-white'}`}
                                                    >
                                                        {s.tag && (
                                                            <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm z-10 ${formData.service === s.id ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}>
                                                                {s.tag}
                                                            </span>
                                                        )}

                                                        <div className="mb-3 pt-2">
                                                            <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center ${formData.service === s.id ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600'}`}>
                                                                {/* We can use s.icon here if mapped, or generic */}
                                                                {formData.service === s.id ? <Check size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                                            </div>
                                                            <h5 className="font-bold text-gray-900 leading-tight">{s.name}</h5>
                                                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{s.description}</p>
                                                        </div>

                                                        <div className="mt-2">
                                                            {s.price === 0 ? (
                                                                <span className="text-green-600 font-bold text-sm flex items-center gap-1">Get Free Quote <ArrowRightSmall /></span>
                                                            ) : (
                                                                <div className="flex items-baseline gap-1">
                                                                    <span className="text-gray-400 text-xs line-through">${Math.round(s.price * 1.1)}</span>
                                                                    <span className="text-green-700 font-black text-lg">${s.price}</span>
                                                                    <span className="text-[10px] text-gray-400 uppercase font-bold">{s.id === 'commercial' ? 'per hour' : 'from'}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* STEP 2: DETAILS */}
                        <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 2 ? 'border-green-500 ring-4 ring-green-50/50' : 'border-gray-200'}`}>
                            {renderStepHeader(2, "Property Details", "Tell us about your property")}
                            <AnimatePresence initial={false}>
                                {step === 2 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 border-t border-gray-100">
                                            <div className="py-6 space-y-6">

                                                {/* Property Type Selection (Visual) */}
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-gray-700">Property Type</label>
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {['House', 'Apartment', 'Unit', 'Townhouse', 'Villa'].map((type) => (
                                                            <div key={type} className="border border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all">
                                                                <div className="mx-auto w-8 h-8 mb-2 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                                    <Home size={14} />
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-700 block">{type}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {appliesRoomCharges && (
                                                    <>
                                                        <div className="space-y-3">
                                                            <label className="text-sm font-bold text-gray-700">Number of Bedrooms</label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                {[1, 2, 3, 4, 5, 6].map(num => (
                                                                    <div
                                                                        key={num}
                                                                        onClick={() => setFormData({ ...formData, bedrooms: num })}
                                                                        className={`p-4 rounded-xl border cursor-pointer relative ${formData.bedrooms === num ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                                                                    >
                                                                        {num === 3 && <span className="absolute -top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>}
                                                                        <div className="flex justify-between items-center">
                                                                            <div>
                                                                                <span className="font-bold text-gray-900 block">{num} {num === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                                                                                <span className="text-xs text-gray-500">{num === 1 ? 'Studio or 1 bedroom apartment' : num === 3 ? 'Most popular family home size' : 'Standard property size'}</span>
                                                                            </div>
                                                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.bedrooms === num ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}>
                                                                                {formData.bedrooms === num && <div className="w-2 h-2 rounded-full bg-white" />}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-3 text-sm">
                                                                            <span className="text-gray-400 line-through text-xs mr-2">${basePrice + ((num - 1) * 30) + 17}</span>
                                                                            <span className="font-bold text-green-700">${basePrice + ((num - 1) * 30)}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <label className="text-sm font-bold text-gray-700">Number of Bathrooms</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {[1, 2, 3, 4].map(num => (
                                                                    <button
                                                                        key={num}
                                                                        onClick={() => setFormData({ ...formData, bathrooms: num })}
                                                                        className={`px-6 py-3 rounded-full font-bold text-sm transition-all border ${formData.bathrooms === num ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}
                                                                    >
                                                                        {num} {num === 4 ? '4+ Bathrooms' : num === 1 ? 'Bathroom' : 'Bathrooms'}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="pt-4">
                                                    <button
                                                        onClick={() => setStep(3)}
                                                        className="bg-green-400/20 text-green-700 font-bold py-3 px-8 rounded-xl hover:bg-green-500 hover:text-white transition-all text-sm uppercase tracking-wider"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* STEP 3: EXTRAS */}
                        <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 3 ? 'border-green-500 ring-4 ring-green-50/50' : 'border-gray-200'}`}>
                            {renderStepHeader(3, "Add Extras", "Customize your clean")}
                            <AnimatePresence initial={false}>
                                {step === 3 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 border-t border-gray-100">
                                            <div className="py-6">
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {extrasList.map(extra => (
                                                        <div
                                                            key={extra.id}
                                                            onClick={() => toggleExtra(extra.id)}
                                                            className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center text-center gap-3 transition-all ${formData.extras.includes(extra.id) ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                                                        >
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.extras.includes(extra.id) ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                                                {formData.extras.includes(extra.id) ? <Check size={20} /> : <span className="text-xl">+</span>}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900 text-sm">{extra.name}</div>
                                                                <div className="text-green-600 font-bold text-sm">+${extra.price}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="pt-8">
                                                    <button
                                                        onClick={() => setStep(4)}
                                                        className="bg-green-400/20 text-green-700 font-bold py-3 px-8 rounded-xl hover:bg-green-500 hover:text-white transition-all text-sm uppercase tracking-wider"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* STEP 4: SCHEDULE */}
                        <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${step === 4 ? 'border-green-500 ring-4 ring-green-50/50' : 'border-gray-200'}`}>
                            {renderStepHeader(4, "Schedule & Contact", "When should we come?")}
                            <AnimatePresence initial={false}>
                                {step === 4 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 border-t border-gray-100">
                                            <div className="py-6 space-y-6">

                                                {/* Date Banner */}
                                                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                                            <Sparkles size={20} />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-orange-900 text-sm">Need it today?</div>
                                                            <div className="text-orange-700 text-xs text-opacity-80">Same day booking available (+$40)</div>
                                                        </div>
                                                    </div>
                                                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm"></div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Preferred Date</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                        <input
                                                            type="date"
                                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all bg-gray-50/50"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Preferred Time</label>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {['Morning', 'Afternoon', 'Flexible'].map(t => (
                                                            <div
                                                                key={t}
                                                                onClick={() => setFormData({ ...formData, time: t.toLowerCase() })}
                                                                className={`p-3 rounded-xl border text-center cursor-pointer ${formData.time === t.toLowerCase() ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                                                            >
                                                                <Clock size={16} className={`mx-auto mb-2 ${formData.time === t.toLowerCase() ? 'text-green-600' : 'text-gray-400'}`} />
                                                                <div className="text-sm font-bold">{t}</div>
                                                                <div className="text-[10px] text-gray-400">{t === 'Morning' ? '8:00 AM - 12:00 PM' : t === 'Afternoon' ? '12:00 PM - 5:00 PM' : 'Any time works'}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <hr className="border-gray-100 my-4" />

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Contact Details</label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 ml-1">First Name *</label>
                                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Last Name *</label>
                                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 ml-1">Email *</label>
                                                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 ml-1">Phone *</label>
                                                        <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 ml-1">Address *</label>
                                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Suburb *</label>
                                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 ml-1">Postcode *</label>
                                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 pt-2">
                                                        <label className="text-xs font-bold text-gray-500 ml-1">Special Instructions (Optional)</label>
                                                        <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all bg-gray-50/50"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: STICKY SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sticky top-8">
                            <h3 className="text-xl font-black text-gray-900 mb-6">Your Quote</h3>

                            <div className="space-y-6">
                                {/* Service Section */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Home size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">Service</p>
                                        <p className="font-bold text-gray-800">{currentService?.name || "Select a service"}</p>
                                        {!formData.service && <p className="text-xs text-gray-400 mt-1">Select a service to see pricing</p>}
                                    </div>
                                </div>

                                {/* Details Section */}
                                {appliesRoomCharges && formData.service && (
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Building size={20} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">Property</p>
                                            <p className="font-medium text-sm text-gray-700">{formData.bedrooms} Bedroom, {formData.bathrooms} Bathroom</p>
                                        </div>
                                    </div>
                                )}

                                <div className="h-px bg-gray-100 my-4"></div>

                                {/* Total Price */}
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-gray-900">Total</span>
                                    {isQuoteOnly ? (
                                        <span className="text-2xl font-black text-green-600">Free Quote</span>
                                    ) : (
                                        <span className="text-3xl font-black text-green-600">${totalPrice}</span>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="flex gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider pt-2">
                                    <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-green-600" /> Insured</span>
                                    <span className="flex items-center gap-1"><Star size={12} className="text-green-600" /> Guaranteed</span>
                                    <span className="flex items-center gap-1"><Leaf size={12} className="text-green-600" /> Eco</span>
                                </div>

                                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-green-200 mt-6 transition-all transform active:scale-95">
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

// Simple Helper for Arrow
const ArrowRightSmall = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;