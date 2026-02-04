"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Residential Cleaning", href: "/services/residential" },
  { name: "Commercial Cleaning", href: "/services/commercial" },
  { name: "Deep Cleaning", href: "/services/deep-cleaning" },
  { name: "Pressure Washing", href: "/services/pressure-washing" },
  { name: "Window Cleaning", href: "/services/window" },
  { name: "Carpet Cleaning", href: "/services/carpet" },
  { name: "Tile & Grout Cleaning", href: "/services/tile-grout" },
  { name: "End of Lease Cleaning", href: "/services/end-of-lease" },
  { name: "Solar Panel Cleaning", href: "/services/solar-panel" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navItemClass = "text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 text-gray-800 hover:text-green-600 whitespace-nowrap";

  return (
    <header className="absolute top-0 w-full z-[100] px-4 py-4 md:px-8 pointer-events-none">
      <div className="max-w-full mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* LOGO CARD - Resized and Fitted to show full text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-br-[35px] rounded-tl-[15px] shadow-xl border border-white/20 overflow-hidden flex items-center justify-center w-[220px] h-[110px] md:w-[280px] md:h-[140px]
"
        >
          <Link href="/" className="relative w-full h-full p-2 flex items-center justify-center">
            <Image
  src="/logo.png"
  alt="Logo"
  width={260}
  height={120}
  priority
  className="object-contain"
  quality={100}
/>

          </Link>
        </motion.div>

        {/* PILL NAV - Floating Style */}
        <nav className="hidden lg:flex items-center bg-white/95 backdrop-blur-md px-10 py-4 rounded-full shadow-2xl border border-white/40 space-x-10">
          <Link href="/" className={navItemClass}>Home</Link>
          <Link href="/about" className={navItemClass}>About</Link>
          
          <div 
            className="relative" 
            onMouseEnter={() => setOpenDropdown(true)} 
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <button className={`${navItemClass} flex items-center gap-1`}>
              Services <ChevronDown size={14} className={`transition-transform ${openDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-5 w-64 bg-white shadow-2xl rounded-2xl py-4 border border-gray-100"
                >
                  {services.map((s) => (
                    <Link key={s.name} href={s.href} className="block px-6 py-2.5 text-[11px] font-bold text-gray-600 hover:bg-green-50 hover:text-green-600 border-b border-gray-50 last:border-0 transition-colors">
                      {s.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blog" className={navItemClass}>Blog</Link>
          <Link href="/contact" className={navItemClass}>Contact</Link>
          
          <div className="pl-6 border-l border-gray-200">
             <Link href="/get-quote">
                <button className="bg-green-600 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
                  See Pricing
                </button>
             </Link>
          </div>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden bg-white p-4 rounded-full shadow-lg border border-gray-100 pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} className="text-black" /> : <Menu size={28} className="text-black" />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[110] lg:hidden flex flex-col pt-32 px-10 pointer-events-auto overflow-y-auto"
          >
            <div className="flex flex-col space-y-10">
              {["Home", "About", "Blog", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-3xl font-bold uppercase border-b border-gray-100 pb-4"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link href="/get-quote" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-green-600 text-white py-6 rounded-2xl font-bold uppercase text-sm tracking-widest shadow-2xl">
                  See Instant Pricing
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}