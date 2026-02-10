"use client";
import val from "@/components/home/why-melbourne-chooses";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const whyPoints = [
    "Professionally trained and vetted cleaning specialists",
    "Eco-friendly products safe for families and pets",
    "100% satisfaction guarantee on all services",
    "Same-day service available",
    "12+ years of trusted service",
    "Licensed, insured, and fully certified",
    "Flexible scheduling to fit your lifestyle",
    "Transparent pricing with no hidden fees",
    "Serving all Melbourne suburbs",
    "Thousands of 5-star reviews"
];

export default function WhyChooseFreshPlus() {
    return (
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: "url('/choose.avif')",
                    filter: "brightness(0.3)"
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-12">
                    Why Melbourne Chooses <span className="text-brand-green">Fresh Plus</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto text-left">
                    {whyPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <CheckCircle2 className="text-brand-green shrink-0 group-hover:scale-110 transition-transform" size={28} />
                            <span className="text-gray-100 font-medium text-lg">{point}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
