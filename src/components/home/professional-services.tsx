"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const allServices = [
    { title: "Residential Cleaning", desc: "Professional home cleaning tailored to your needs", img: "/res-clean.webp", link: "/services/residential" },
    { title: "Commercial Cleaning", desc: "Pristine workplace cleaning solutions", img: "/commercial-cleaning.webp", link: "/services/commercial" },
    { title: "Deep Cleaning", desc: "Thorough cleaning for spotless results", img: "/deep-cleaning.webp", link: "/services/deep-cleaning" },
    { title: "Pressure Washing", desc: "High-pressure cleaning for exterior surfaces", img: "/pressure.avif", link: "/services/pressure-washing" },
    { title: "Carpet Cleaning", desc: "Expert carpet cleaning for fresher carpets", img: "/carpet.webp", link: "/services/carpet" },
    { title: "Window Cleaning", desc: "Crystal clear windows for more light", img: "/window-cleaning.webp", link: "/services/window" },
    { title: "Tile & Grout Cleaning", desc: "Restore tiles to pristine condition", img: "/tiles.webp", link: "/services/tile-grout" },
    { title: "End of Lease", desc: "Bond-back guarantee cleaning", img: "/lease.webp", link: "/services/end-of-lease" },
    { title: "Solar Panel Cleaning", desc: "Maximize efficiency with professional cleaning", img: "/solarpanel.webp", link: "/services/solar-panel" },
];

export default function ProfessionalServices() {
    return (
        <section className="py-24 bg-[#f8faff] relative group/section overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section: Top to Bottom Animation */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight mb-4"
                    >
                        Our Professional Services
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-20 h-[3px] bg-green-500 mx-auto mb-6"
                    ></motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-medium"
                    >
                        From residential homes to commercial spaces across Melbourne, we deliver exceptional cleaning solutions.
                    </motion.p>
                </div>

                <div className="relative px-4 md:px-12">
                    {/* Custom Navigation Buttons */}
                    <button className="swiper-prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-black hover:bg-green-500 hover:text-white transition-all duration-300 hidden md:flex">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="swiper-next-btn absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg text-black hover:bg-green-500 hover:text-white transition-all duration-300 hidden md:flex">
                        <ChevronRight size={24} />
                    </button>

                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        // Continuous movement settings
                        speed={5000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        allowTouchMove={true}
                        pagination={{ clickable: true }}
                        navigation={{
                            nextEl: '.swiper-next-btn',
                            prevEl: '.swiper-prev-btn',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-20 linear-swiper" // CSS class for linear motion
                    >
                        {allServices.map((service, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <motion.div
                                    className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                                >
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={service.img}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    </div>

                                    <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                                        <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
                                            {service.desc}
                                        </p>
                                        <Link href={service.link} className="text-green-500 font-bold text-xs uppercase tracking-widest hover:gap-3 flex items-center transition-all">
                                            Learn detail: {service.title} <span className="ml-2">+</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* CSS for Seamless Linear Motion */}
            <style jsx global>{`
        .linear-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
        </section>
    );
}
