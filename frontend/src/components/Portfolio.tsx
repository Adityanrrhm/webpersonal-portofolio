"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAPI, wrapData } from "@/lib/api";

interface Project {
  id: number;
  title: string;
  category: string;
  label: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
}

const CARD_W = 340;
const GAP = 24;
const STEP = CARD_W + GAP;

function ProjectCard({
  project,
  cardIndex,
  carouselX,
  initialOffset,
  onTap,
}: {
  project: Project;
  cardIndex: number;
  carouselX: ReturnType<typeof useMotionValue<number>>;
  initialOffset: ReturnType<typeof useMotionValue<number>>;
  onTap: () => void;
}) {
  const dist = useTransform(() => {
    const x = carouselX.get();
    const offset = initialOffset.get();
    return Math.abs(x - (offset - cardIndex * STEP));
  });

  const cardScale = useTransform(dist, (d) => {
    if (d < 60) return 1;
    if (d < STEP) return 1 - (1 - 0.85) * ((d - 60) / (STEP - 60));
    return 0.85;
  });

  const cardOpacity = useTransform(dist, (d) => {
    if (d < 80) return 1;
    if (d < STEP * 1.2) return 0.7;
    return 0;
  });

  const cardZ = useTransform(dist, (d) => {
    if (d < 60) return 3;
    if (d < STEP) return 2;
    return 1;
  });

  const cardShadow = useTransform(dist, (d) => {
    if (d < 60)
      return "0 25px 60px rgba(0,0,0,0.10), 0 8px 20px rgba(0,0,0,0.06)";
    if (d < STEP * 1.2) return "0 8px 24px rgba(0,0,0,0.06)";
    return "none";
  });

  return (
    <motion.div
      className="shrink-0 rounded-[28px] overflow-hidden cursor-pointer will-change-transform"
      style={{
        width: CARD_W,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: cardZ,
        boxShadow: cardShadow,
      }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
      onTap={onTap}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
          <span className="text-[11px] font-medium text-white/70 mb-1 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        </div>
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm border border-white/20 text-white/90 bg-white/10">
          {project.label}
        </span>
      </div>
    </motion.div>
  );
}

const ProjectCardMemo = memo(ProjectCard);

export default function Portfolio({ isPreview = false }: { isPreview?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselX = useMotionValue(0);
  const initialOffset = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    fetchAPI<{ data: Project[] }>("projects")
      .then((res) => {
        setProjects(wrapData(res));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const items = isPreview ? projects.slice(0, 4) : projects;
  const maxIdx = items.length - 1;

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      initialOffset.set(containerRef.current!.offsetWidth / 2 - CARD_W / 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [initialOffset]);

  const goTo = useCallback(
    (i: number) => {
      const idx = Math.max(0, Math.min(i, maxIdx));
      const offset = initialOffset.get();
      const target = offset - idx * STEP;
      animate(carouselX, target, {
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.8,
      });
      setIndex(idx);
    },
    [maxIdx, initialOffset, carouselX],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
      isDragging.current = false;
      const current = carouselX.get();
      const offset = initialOffset.get();

      const rawIdx = Math.round((offset - current) / STEP);
      const clampedIdx = Math.max(0, Math.min(rawIdx, maxIdx));
      const target = offset - clampedIdx * STEP;

      animate(carouselX, target, {
        type: "spring",
        velocity: info.velocity.x,
        stiffness: 320,
        damping: 26,
        mass: 0.9,
      });

      setIndex(clampedIdx);
    },
    [maxIdx, initialOffset, carouselX],
  );

  return (
    <section id="portfolio" className="section-padding py-20 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
            (02) RECENT WORK
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">My Portfolio.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-0"
        >
          {isPreview && (
            <Link
              href="/projects"
              className="inline-block border border-gray-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View All Projects ↗
            </Link>
          )}
        </motion.div>
      </div>

      {loading ? (
        <div className="animate-pulse flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="shrink-0 w-[340px] aspect-[4/5] rounded-[28px] bg-gray-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No projects yet.</p>
      ) : (
        <>
          <div ref={containerRef} className="relative select-none">
            <motion.div
              className="flex items-center"
              drag="x"
              style={{ x: carouselX, gap: GAP }}
              dragElastic={0.08}
              onDragStart={() => {
                isDragging.current = true;
                carouselX.stop();
              }}
              onDragEnd={handleDragEnd}
            >
              {items.map((project, i) => (
                <ProjectCardMemo
                  key={project.id}
                  project={project}
                  cardIndex={i}
                  carouselX={carouselX}
                  initialOffset={initialOffset}
                  onTap={() => goTo(i)}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex items-center gap-2.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-500 ease-out ${
                    i === index ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={{ width: i === index ? 32 : 10, height: 6 }}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(index + 1)}
              disabled={index === maxIdx}
              className="w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
