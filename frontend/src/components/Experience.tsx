"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fetchAPI, wrapData } from "@/lib/api";

interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  periodStart: string;
  periodEnd: string | null;
  points: string[];
  imageUrl: string | null;
  companyLogoUrl: string | null;
}

export default function Experience({
  isPreview = false,
}: {
  isPreview?: boolean;
}) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI<{ data: Experience[] }>("experiences")
      .then((res) => {
        setExperiences(wrapData(res));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayExperiences = isPreview ? experiences.slice(0, 2) : experiences;

  return (
    <section className="section-padding py-20 border-t border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
            (04) WORK HISTORY
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Experience.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-0"
        >
          {isPreview && (
            <Link
              href="/experience"
              className="inline-block border border-gray-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-all active:scale-[0.97] cursor-pointer"
            >
              View All Experience ↗
            </Link>
          )}
        </motion.div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-8 max-w-4xl">
          {[1, 2].map((i) => (
            <div key={i} className="pl-8">
              <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : displayExperiences.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No experience yet.</p>
      ) : (
        <div className="max-w-4xl">
          {displayExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 pb-16 last:pb-0"
            >
              {/* Timeline line & dot */}
              <div className="absolute left-[5px] top-2 bottom-0 w-px bg-gray-200"></div>
              <div className="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full bg-black border border-white"></div>

              <div className="md:grid md:grid-cols-12 gap-8 items-start">
                {/* Content area */}
                <div className="md:col-span-8">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-gray-500 mb-4">
                    {exp.company} • {exp.type}
                  </p>

                  {exp.points.length > 0 && (
                    <ul className="space-y-3 text-gray-600 text-sm md:text-base mb-6">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-gray-300 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Foto Dokumentasi dengan Logo Badge */}
                  {exp.imageUrl && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-full max-w-sm"
                    >
                      {/* Foto dokumentasi */}
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={exp.imageUrl}
                          alt={`${exp.company} documentation`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 384px"
                        />
                      </div>

                      {/* Logo company badge — pojok kanan atas */}
                      {exp.companyLogoUrl && (
                        <Image
                          src={exp.companyLogoUrl}
                          alt={exp.company}
                          width={56}
                          height={56}
                          className="absolute top-2 right-2 object-contain drop-shadow-lg"
                        />
                      )}
                    </motion.div>
                  )}

                  {/* Jika tidak ada foto tapi ada logo, tampilkan logo saja */}
                  {!exp.imageUrl && exp.companyLogoUrl && (
                    <div className="flex items-center gap-3 mt-2">
                      <Image
                        src={exp.companyLogoUrl}
                        alt={exp.company}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <span className="text-sm text-gray-400">{exp.company}</span>
                    </div>
                  )}
                </div>

                {/* Period — kanan */}
                <div className="md:col-span-4 mt-4 md:mt-0 text-gray-400 text-sm md:text-right font-medium">
                  {exp.periodStart}
                  {exp.periodEnd ? ` — ${exp.periodEnd}` : " — Present"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
