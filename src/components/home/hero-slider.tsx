"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    {
        image: "/cleaner1.webp",
        sub: "Reliable and Stable Crews",
        title: "OUR TEAM IS OUR MOST VALUABLE RESOURCE",
    },
    {
        image: "/cleaner2.webp",
        sub: "Expert Cleaning Services",
        title: "TRANSFORM YOUR SPACE WITH PROFESSIONALS",
    },
    {
        image: "/cleaner3.avif",
        sub: "User Friendly. Simple. Awesome",
        title: "CONTINUOUS PURSUIT FOR PERFECTION",
    },
];

const topToBottom: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.4,
            duration: 1.0,
            ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
        },
    }),
};

const bottomToTop: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.2,
            duration: 1.0,
            ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
        },
    },
};

export default function HeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-[80vh] md:h-[90vh] w-full overflow-hidden bg-black" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                speed={1500}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                navigation={false}
                pagination={{ clickable: true }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative h-full w-full flex items-center justify-center bg-cover bg-center"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${slide.image})`,
                            }}
                        >
                            <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                                <AnimatePresence mode="wait">
                                    {activeIndex === index && (
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            className="flex flex-col items-center"
                                        >
                                            {/* Subheading (1st Line) */}
                                            <motion.p
                                                custom={0}
                                                variants={topToBottom}
                                                className="text-[10px] md:text-xs uppercase tracking-[0.6em] mb-5 font-medium text-green-500 italic"
                                            >
                                                {slide.sub}
                                            </motion.p>

                                            {/* Main Title (2nd Line) - Size Reduced */}
                                            <motion.h2
                                                custom={1}
                                                variants={topToBottom}
                                                className="text-lg sm:text-2xl md:text-4xl font-bold uppercase mb-10 leading-snug tracking-widest max-w-3xl"
                                            >
                                                {slide.title}
                                            </motion.h2>

                                            {/* Button (3rd Line) */}
                                            <motion.div variants={bottomToTop}>
                                                <Link href="/get-quote">
                                                    <button className={`
                          relative group
                          bg-green-600 text-white 
                          px-10 py-3.5 rounded-none 
                          text-[10px] md:text-xs font-black uppercase tracking-[0.3em] 
                          transition-all duration-500 ease-in-out
                          hover:-translate-y-2 
                          hover:bg-white hover:text-black 
                          border-x-2 border-transparent hover:border-green-500
                          shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        `}>
                                                        Calculate Service
                                                    </button>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {

          .swiper-pagination-bullet {
            width: 5px !important;
            height: 5px !important;
          }
        }

        /* Pagination active color */
        .swiper-pagination-bullet {
          background: white !important;
          width: 7px;
          height: 7px;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #22c55e !important;
          opacity: 1;
        }
      `}</style>
        </div>
    );
}
