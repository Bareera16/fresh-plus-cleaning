"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const pathname = usePathname();

  // Pages that have a dark hero section where white text on transparent bg works
  const hasDarkHero = pathname === "/" || pathname === "/about" || pathname === "/contact";

  // Text color should be black if scrolled OR if it's a light-background page
  const useBlackText = scrolled || !hasDarkHero;

  // Background should ONLY be white when scrolled
  const showWhiteBg = scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover Effect Style (Border bottom animation)
  const navItemClass = "relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all hover:after:w-full";

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-500 font-display ${showWhiteBg ? "bg-white py-2 shadow-md" : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* LOGO - Animation restored */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link href="/" className="relative z-[110]">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={150}
              height={45}
              priority
              style={{ width: scrolled ? "120px" : "140px", height: "auto" }}
              className="object-contain transition-all duration-300"
              quality={60}
              sizes="150px"
            />
          </Link>
        </motion.div>

        {/* DESKTOP NAV - Animations restored */}
        <nav className="hidden lg:flex items-center space-x-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Link href="/" className={`${navItemClass} ${useBlackText ? "text-black hover:text-green-600" : "text-white hover:text-green-400"}`}>Home</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/about" className={`${navItemClass} ${useBlackText ? "text-black hover:text-green-600" : "text-white hover:text-green-400"}`}>About</Link>
          </motion.div>

          {/* SERVICES DROPDOWN */}
          <motion.div
            className="relative py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <button className={`${navItemClass} flex items-center gap-1 ${useBlackText ? "text-black" : "text-white"}`}>
              Services <ChevronDown size={12} className={`transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-4 border-green-600 py-4"
                >
                  {services.map((s) => (
                    <Link key={s.name} href={s.href} className="block px-6 py-2.5 text-[12px] font-bold text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors border-b border-gray-50 last:border-0">
                      {s.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link href="/blog" className={`${navItemClass} ${useBlackText ? "text-black hover:text-green-600" : "text-white hover:text-green-400"}`}>Blog</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link href="/contact" className={`${navItemClass} ${useBlackText ? "text-black hover:text-green-600" : "text-white hover:text-green-400"}`}>Contact</Link>
          </motion.div>
        </nav>

        {/* ACTION BUTTON - Hover Animation restored */}
        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            {/* Link component yahan add kiya hai */}
            <Link href="/get-quote">
              <button className={`
        hidden sm:block px-6 py-2.5 text-[10px] font-black uppercase tracking-widest
        transition-all duration-500 ease-in-out
        hover:-translate-y-1 hover:shadow-xl
        border-x-2 border-transparent hover:border-green-500
        ${useBlackText ? "bg-green-600 text-white hover:bg-black" : "bg-green-600 text-white hover:bg-white hover:text-black"}
      `}>
                See Instant Pricing
              </button>
            </Link>
          </motion.div>

          <button
            className={`lg:hidden relative z-[110] p-2 transition-transform active:scale-90 ${useBlackText || isOpen ? "text-black" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Smooth Transition & Spacing */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[100] lg:hidden flex flex-col pt-24 px-8 overflow-y-auto pb-10"
          >
            <div className="flex flex-col space-y-8">
              {/* Home & About */}
              {["Home", "About"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-xl font-bold uppercase border-b border-gray-100 pb-2 hover:text-green-600 transition-colors"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* SERVICES DROPDOWN MOBILE */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between text-xl font-bold uppercase border-b border-gray-100 pb-2 hover:text-green-600 transition-colors text-left"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  Services <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-green-600" : ""}`} />
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-4 pl-4 border-l-2 border-green-500 mt-6 mb-4">
                        {services.map((s) => (
                          <Link
                            key={s.name}
                            href={s.href}
                            className="text-xs font-bold uppercase text-gray-500 hover:text-green-600 transition-all active:translate-x-2"
                            style={{ fontFamily: "'Times New Roman', Times, serif" }}
                            onClick={() => setIsOpen(false)}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog & Contact */}
              {["Blog", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-xl font-bold uppercase border-b border-gray-100 pb-2 hover:text-green-600 transition-colors"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}

              <div className="mt-6">
                <Link href="/get-quote" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-green-600 text-white py-4 font-bold uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    See Instant Pricing
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}