"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI, wrapData } from "@/lib/api";


interface Profile {
  name: string;
  cvUrl: string | null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchAPI<{ data: Profile }>("profile")
      .then((res) => setProfile(wrapData(res)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAbout = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      window.location.href = "/#about";
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${
        isScrolled ? "py-0" : "py-4"
      }`}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8,
        }}
        className={`bg-background/80 backdrop-blur-md border-card-border flex items-center justify-between shadow-sm relative z-50 ${
          isScrolled
              ? "w-full max-w-none rounded-none border-b px-8 py-4"
              : "w-[calc(100%-3rem)] max-w-5xl mx-auto rounded-full border px-6 py-3"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight group">
          <img 
            src="/assets/logo_web_Adityanrrhm.png" 
            alt="Logo" 
            className="h-6 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <span className="text-gray-900">{profile?.name || "Aditya Nur Rohim"}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted">
          <Link href="/project" className="hover:text-foreground transition-colors">
            Project
          </Link>
          <Link href="/certificate" className="hover:text-foreground transition-colors">
            Certificate
          </Link>
          <Link href="/experience" className="hover:text-foreground transition-colors">
            Experience
          </Link>
          <button onClick={handleAbout} className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit">
            About
          </button>
        </div>

        {/* Desktop Download CV */}
        <a
          href={profile?.cvUrl || "#"}
          className="hidden md:flex bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-medium items-center gap-2 hover:opacity-90 transition-all active:scale-[0.97] cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden p-1.5 text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`w-[calc(100%-3rem)] max-w-5xl bg-white/95 backdrop-blur-lg border border-gray-100 shadow-xl mt-2 px-6 py-5 flex flex-col gap-4 md:hidden z-40 overflow-hidden ${
              isScrolled ? "rounded-2xl" : "rounded-3xl"
            }`}
          >
            <Link
              href="/project"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium py-1.5 text-sm border-b border-gray-50 transition-colors"
            >
              Project
            </Link>
            <Link
              href="/certificate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium py-1.5 text-sm border-b border-gray-50 transition-colors"
            >
              Certificate
            </Link>
            <Link
              href="/experience"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium py-1.5 text-sm border-b border-gray-50 transition-colors"
            >
              Experience
            </Link>
            <button
              onClick={handleAbout}
              className="text-gray-600 hover:text-gray-900 font-medium py-1.5 text-sm border-b border-gray-50 transition-colors text-left bg-transparent border-none cursor-pointer w-full"
            >
              About
            </button>
            <a
              href={profile?.cvUrl || "#"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-accent text-accent-foreground px-5 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.97] mt-2 cursor-pointer w-full text-center"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
