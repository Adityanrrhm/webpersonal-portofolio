"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchAPI, wrapData } from "@/lib/api";

interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  periodStart: string;
  periodEnd: string | null;
  points: string[];
}

export default function Experience({ isPreview = false }: { isPreview?: boolean }) {
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
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">(04) WORK HISTORY</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">Experience.</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-0"
        >
          {isPreview && (
            <Link href="/experience" className="inline-block border border-gray-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
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
              <div className="absolute left-[5px] top-2 bottom-0 w-px bg-gray-200"></div>
              <div className="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full bg-black border border-white"></div>

              <div className="md:grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-gray-500 mb-4">{exp.company} • {exp.type}</p>
                  
                  {exp.points.length > 0 && (
                    <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-gray-300 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="md:col-span-4 mt-4 md:mt-0 text-gray-400 text-sm md:text-right font-medium">
                  {exp.periodStart}{exp.periodEnd ? ` — ${exp.periodEnd}` : ""}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
