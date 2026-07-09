"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchAPI, wrapData } from "@/lib/api";

interface Profile {
  name: string;
  title: string;
  bio: string;
  photoUrl: string | null;
}

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchAPI<{ data: Profile }>("profile")
      .then((res) => setProfile(wrapData(res)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ rotate: -8 }}
            animate={{ rotate: -8 }}
            whileHover={{
              rotate: 0,
              scale: 1.05,
              y: -11,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] md:w-[300px] md:h-[400px] lg:w-[340px] lg:h-[440px] bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border-[6px] sm:border-[8px] border-white relative overflow-hidden flex items-end cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200/50" />

            {loading ? (
              <div className="absolute inset-0 z-10 overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
            ) : profile?.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name || "Aditya Nur Rohim"}
                fill
                priority
                className={`object-cover object-bottom z-10 transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                <svg
                  className="w-24 h-24 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left lg:pl-8"
        >
          <p className="font-handwritten text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-gray-500 tracking-wide rotate-[-3deg] inline-block mb-2 sm:mb-3">
            hi, i&apos;m
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] font-bold tracking-tighter leading-[1.05] md:leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mb-6 sm:mb-8">
            {profile?.name || "Aditya Nur Rohim"}
          </h1>

          <p className="text-gray-600 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed">
            {profile?.bio ||
              "I help businesses make sense of their data — from cleaning messy datasets to building cloud infrastructure that scales."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
