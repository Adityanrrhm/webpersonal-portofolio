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

  useEffect(() => {
    fetchAPI<{ data: Profile }>("profile")
      .then((res) => setProfile(wrapData(res)))
      .catch(() => {});
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
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
            className="w-[280px] h-[360px] md:w-[340px] md:h-[440px] bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border-[8px] border-white relative overflow-hidden flex items-end cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200/50"></div>

            {profile?.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name || "Aditya Nur Rohim"}
                fill
                priority
                className="object-cover object-bottom z-10 scale-105 group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Image
                src="/assets/fotogw.png"
                alt="Aditya Nur Rohim"
                fill
                priority
                className="object-cover object-bottom z-10 scale-105 group-hover:scale-110 transition-transform duration-500"
              />
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-8"
        >
          <p className="font-handwritten text-3xl md:text-7xl text-gray-500 tracking-wide rotate-[-3deg] inline-block mb-3">
            hi, i&apos;m
          </p>
          <h1 className="font-heading text-5xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mb-8">
            {profile?.name || "Aditya Nur Rohim"}
          </h1>

          <p className="text-gray-600 max-w-xl text-lg md:text-xl leading-relaxed">
            {profile?.bio ||
              "Passionate about Data Analytics and Cloud Computing, transforming data into actionable insights while building scalable and reliable cloud-based solutions."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
