"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Leaf, Clock, Award } from "lucide-react";

const features = [
    {
        title: "Local Team",
        desc: "Melbourne-based professionals with full insurance and expert training.",
        icon: <Shield className="w-7 h-7 text-green-500" />,
        position: "left",
    },
    {
        title: "Eco-Friendly Products",
        desc: "Safe for your family, pets, and the environment without compromising quality.",
        icon: <Leaf className="w-7 h-7 text-green-500" />,
        position: "left",
    },
    {
        title: "Flexible Scheduling",
        desc: "Book at your convenience with same-day service available across the city.",
        icon: <Clock className="w-7 h-7 text-green-500" />,
        position: "right",
    },
    {
        title: "Satisfaction Guarantee",
        desc: "100% satisfaction or we'll make it right at no extra cost to you.",
        icon: <Award className="w-7 h-7 text-green-500" />,
        position: "right",
    },
];

export default function WhyChooseUs() {
    const leftFeatures = features.filter((f) => f.position === "left");
    const rightFeatures = features.filter((f) => f.position === "right");

    return (
        <section className="py-24 bg-white overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section - Triggers only when scrolled into view */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4"
                    >
                        Why Choose Fresh Plus?
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-24 h-1 bg-green-500 mx-auto mb-8 origin-center"
                    ></motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                        className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed"
                    >
                        Your trusted partner for maintaining a spotless, healthy environment.
                    </motion.p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24">

                    {/* Left Features */}
                    <div className="flex-1 space-y-16 text-right order-2 lg:order-1">
                        {leftFeatures.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="flex flex-col items-end group"
                            >
                                <div className="mb-4 bg-gray-50 p-4 rounded-full group-hover:bg-green-50 transition-colors">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-blue-900 mb-3 group-hover:text-green-500 transition-colors">
                                    {f.title}
                                </h3>
                                <p className="text-sm md:text-base leading-relaxed text-gray-500 max-w-xs font-medium">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="relative flex-shrink-0 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[12px] border-white shadow-2xl overflow-hidden z-10"
                        >
                            <Image
                                src="/choose.avif"
                                alt="Cleaning Crew"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Right Features */}
                    <div className="flex-1 space-y-16 text-left order-3">
                        {rightFeatures.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="flex flex-col items-start group"
                            >
                                <div className="mb-4 bg-gray-50 p-4 rounded-full group-hover:bg-green-50 transition-colors">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-blue-900 mb-3 group-hover:text-green-500 transition-colors">
                                    {f.title}
                                </h3>
                                <p className="text-sm md:text-base leading-relaxed text-gray-500 max-w-xs font-medium">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
