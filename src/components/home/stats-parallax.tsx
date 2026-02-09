"use client";
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
    { label: "Years of Experience", value: 12, suffix: "+" },
    { label: "Happy Customers", value: 1500, suffix: "+" },
    { label: "Satisfaction Rate", value: 100, suffix: "%" },
    { label: "Customer Support", value: 24, suffix: "/7" },
];

export default function StatsParallax() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            ref={ref}
            className="relative min-h-[500px] flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
            style={{

                backgroundImage: "url('/stats-bg.webp')",
            }}
        >

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center group">


                            <div className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-md">
                                {inView ? (
                                    <CountUp end={stat.value} duration={3} suffix={stat.suffix} />
                                ) : (
                                    "0"
                                )}
                            </div>


                            <div className="text-white uppercase tracking-[0.2em] text-xs md:text-sm font-black opacity-90">
                                {stat.label}
                            </div>


                            <div className="w-16 h-[2px] bg-white/40 mt-6 group-hover:w-24 group-hover:bg-green-500 transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
