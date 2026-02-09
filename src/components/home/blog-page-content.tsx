"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from "lucide-react";

const secondaryPosts = [
    {
        title: "Professional Carpet Cleaning vs DIY: What You Need to Know",
        slug: "carpet-cleaning-guide-melbourne",
        category: "Carpet Cleaning",
        date: "Dec 12, 2024",
        readTime: "6 min read",
        image: "/carpet-diy.webp",
        desc: "Discover why professional carpet cleaning is worth the investment. Compare costs and health benefits.",
        animation: { initial: { opacity: 0, x: -100 }, whileInView: { opacity: 1, x: 0 } } // Left Side
    },
    {
        title: "Solar Panel Cleaning: Boost Your Energy Efficiency by 25%",
        slug: "solar-panel-cleaning-efficiency",
        category: "Solar Panel",
        date: "Dec 10, 2024",
        readTime: "5 min read",
        image: "/solar panel cleaning.webp",
        desc: "Learn how dirty solar panels can reduce your energy output and cost you hundreds annually.",
        animation: { initial: { opacity: 0, y: 100 }, whileInView: { opacity: 1, y: 0 } } // Middle (Down)
    },
    {
        title: "Spring Deep Cleaning Checklist: Room by Room Guide",
        slug: "deep-cleaning-checklist-spring",
        category: "Deep Cleaning",
        date: "Dec 8, 2024",
        readTime: "10 min read",
        image: "/House Cleaning.webp",
        desc: "Transform your home this spring with our comprehensive deep cleaning checklist for Melbourne homes.",
        animation: { initial: { opacity: 0, x: 100 }, whileInView: { opacity: 1, x: 0 } } // Right Side
    },
    {
        title: "How Clean Offices Boost Employee Productivity by 12%",
        slug: "commercial-cleaning-productivity",
        category: "Commercial",
        date: "Dec 5, 2024",
        readTime: "7 min read",
        image: "/Commercial cleaning.webp",
        desc: "Research shows clean workspaces significantly impact employee performance and satisfaction.",
        animation: { initial: { opacity: 0, x: -100 }, whileInView: { opacity: 1, x: 0 } } // Left Side (Next Row)
    },
    {
        title: "Tile and Grout Restoration: From Dingy to Sparkling",
        slug: "tile-grout-restoration-guide",
        category: "Tile & Grout",
        date: "Dec 3, 2024",
        readTime: "8 min read",
        image: "/Tile&grout.webp",
        desc: "Restore your tiles to their original beauty with professional cleaning techniques and maintenance tips.",
        animation: { initial: { opacity: 0, y: 100 }, whileInView: { opacity: 1, y: 0 } } // Middle (Down)
    }
];

export default function BlogPageContent() {
    return (
        <main className="min-h-screen bg-[#F0F4F2] pt-32 pb-20 px-6 overflow-hidden">
            <h1 className="sr-only">Our Cleaning Blog - Expert Tips & Maintenance Guides</h1>

            {/* 1. HERO SECTION (Wahi Purana Overlapping Style) */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
                <div className="lg:col-span-7 relative h-[500px] md:h-[650px]">
                    <div className="absolute -top-10 -left-10 text-[10vw] font-black text-black/[0.02] uppercase pointer-events-none">Featured</div>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} className="absolute top-10 left-0 w-[75%] h-[85%] z-10 shadow-2xl overflow-hidden rounded-sm">
                        <Image src="/blog1.webp" alt="Lease Cleaning" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="absolute bottom-0 right-0 w-[55%] h-[65%] z-20 shadow-2xl border-[15px] border-[#F0F4F2] overflow-hidden rounded-sm">
                        <Image src="/blog-1.webp" alt="Detail" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" quality={65} />
                    </motion.div>
                </div>
                <div className="lg:col-span-5 flex flex-col items-start">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-600 mb-6 block">End of Lease</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1] mb-8">Ultimate Guide to <span className="italic">Get Your Bond Back</span></h2>
                        <p className="text-gray-500 text-sm mb-10 max-w-sm">Ensure you get your full bond back with our comprehensive end of lease cleaning checklist.</p>
                        <Link href="/blog/ultimate-guide-end-of-lease-cleaning">
                            <button className="flex items-center gap-6 group transition-all">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 border-b border-gray-900 pb-1">Read the full Bond Back Guide</span>
                                <ArrowRight size={18} className="text-gray-400 group-hover:text-green-600 transition-all" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 2. LATEST BLOGS GRID WITH CUSTOM ANIMATIONS */}
            <section className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-center text-3xl font-black uppercase tracking-tighter text-gray-900 mb-4">Latest Cleaning Tips & Guides</h2>
                    <p className="text-center text-gray-400 text-sm mb-20">Stay updated with the latest techniques and expert advice</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {secondaryPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={post.animation.initial}
                            whileInView={post.animation.whileInView}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={60} />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-orange-400 text-white text-[9px] font-black uppercase px-3 py-1 rounded-md">{post.category}</span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-4 text-[9px] text-gray-400 font-bold uppercase mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-green-600 transition-colors">{post.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2">{post.desc}</p>
                                <Link href={`/blog/${post.slug}`} className="text-[10px] font-black uppercase tracking-widest text-orange-400 flex items-center gap-2 hover:gap-4 transition-all">
                                    View Article: {post.title} <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
