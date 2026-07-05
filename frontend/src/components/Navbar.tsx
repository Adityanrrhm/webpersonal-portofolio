"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { fetchAPI, wrapData } from "@/lib/api";

interface Profile {
  name: string;
  cvUrl: string | null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 ${
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
        className={`bg-background/80 backdrop-blur-md border-card-border flex items-center justify-between shadow-sm ${
          isScrolled
            ? "w-full max-w-none rounded-none border-b px-8 py-4"
            : "mx-6 w-full max-w-5xl rounded-full border px-6 py-3"
        }`}
      >
        <Link href="/" className="font-bold text-lg tracking-tight">
          {profile?.name || "Aditya Nur Rohim"}
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted">
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/certificate" className="hover:text-foreground transition-colors">
            Certificate
          </Link>
          <Link href="/experience" className="hover:text-foreground transition-colors">
            Experience
          </Link>
          <Link href="/#about" className="hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <a
          href={profile?.cvUrl || "#"}
          className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>
      </motion.div>
    </motion.nav>
  );
}
