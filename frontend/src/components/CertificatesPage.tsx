"use client";

import { useState, useCallback, useEffect, memo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import Img from "@/components/Img";
import { fetchAPI, wrapData } from "@/lib/api";

interface Certificate {
  id: number;
  title: string;
  org: string;
  category: string;
  issuedDate: string;
  description: string;
  imageUrl: string | null;
}

const CARD_W = 360;
const GAP = 24;
const STEP = CARD_W + GAP;

const CertificateCard = memo(function CertificateCard({
  cert,
  cardIndex,
  carouselX,
  onSelect,
}: {
  cert: Certificate;
  cardIndex: number;
  carouselX: ReturnType<typeof useMotionValue<number>>;
  onSelect: (cert: Certificate) => void;
}) {
  const dist = useTransform(() => {
    return Math.abs(carouselX.get() + cardIndex * STEP);
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
      style={{
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: cardZ,
        boxShadow: cardShadow,
      }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(cert)}
      className="shrink-0 w-[320px] sm:w-[360px] h-[460px] sm:h-[480px] rounded-2xl bg-zinc-100 p-3 cursor-pointer will-change-transform group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="bg-white rounded-xl h-full flex flex-col overflow-hidden">
        <div className="flex-1 p-4 pb-2">
          <div className="rounded-lg h-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
            {cert.imageUrl ? (
              <Img src={cert.imageUrl} alt={cert.title} containerClassName="w-full h-full" imgClassName="w-full h-full object-contain" />
            ) : (
              <div className="text-center w-full px-6">
                <div className="max-w-[200px] mx-auto aspect-[4/3] bg-white rounded border border-gray-100 shadow-xs flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <span className="text-xs font-bold text-gray-400">{cert.org.charAt(0)}</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-700 text-center leading-tight px-3">{cert.title}</p>
                  <div className="w-6 h-px bg-gray-200 my-1.5" />
                  <p className="text-[9px] text-gray-400">{cert.org}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 pb-4 pt-2">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {cert.org}
          </p>
          <p className="text-[13px] text-gray-500 truncate">
            {cert.title}
          </p>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {cert.category}
            </span>
            <span className="text-[11px] text-gray-400">
              {cert.issuedDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-[0.92] shadow-sm"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-0 md:p-0 flex items-center justify-center min-h-[220px] md:min-h-[400px] overflow-hidden">
          {cert.imageUrl ? (
            <Img src={cert.imageUrl} alt={cert.title} containerClassName="w-full h-full" imgClassName="w-full h-full object-contain" />
          ) : (
            <div className="w-full p-6 md:p-8">
              <div className="w-full max-w-sm mx-auto">
                <div className="aspect-[4/3] bg-white rounded-xl shadow-md flex items-center justify-center">
                  <div className="text-center p-6 w-full">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <span className="text-sm font-bold text-gray-400">{cert.org.charAt(0)}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-800">{cert.title}</h3>
                    <div className="w-10 h-px bg-gray-200 mx-auto my-3" />
                    <p className="text-sm text-gray-500">{cert.org}</p>
                    <p className="text-xs text-gray-400 mt-2">{cert.issuedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              {cert.org}
            </p>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {cert.title}
            </h2>

            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 mb-6">
              {cert.category}
            </span>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Issued
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  {cert.issuedDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Description
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [index, setIndex] = useState(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselX = useMotionValue(0);

  useEffect(() => {
    fetchAPI<{ data: Certificate[] }>("certificates")
      .then((res) => {
        setCertificates(wrapData(res));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...new Set(certificates.map((c) => c.category)),
  ] as string[];

  const filtered =
    activeCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  const maxIdx = filtered.length - 1;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setIndex(0);
    carouselX.set(0);
  };

  const goTo = useCallback(
    (i: number) => {
      const idx = Math.max(0, Math.min(i, maxIdx));
      animate(carouselX, -idx * STEP, {
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.8,
      });
      setIndex(idx);
    },
    [maxIdx, carouselX],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
      const current = carouselX.get();
      const rawIdx = Math.round(-current / STEP);
      const clampedIdx = Math.max(0, Math.min(rawIdx, maxIdx));

      animate(carouselX, -clampedIdx * STEP, {
        type: "spring",
        velocity: info.velocity.x,
        stiffness: 320,
        damping: 26,
        mass: 0.9,
      });
      setIndex(clampedIdx);
    },
    [maxIdx, carouselX],
  );

  if (loading) {
    return (
      <section className="section-padding py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-48 bg-gray-200 rounded" />
          <div className="flex gap-6 mt-10 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="shrink-0 w-[360px] h-[480px] rounded-2xl bg-zinc-100 p-3"
              >
                <div className="bg-white rounded-xl h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding py-20 overflow-hidden">
      <div className="mb-2">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
          CERTIFICATIONS
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold">Certificates.</h2>
        <p className="text-gray-400 mt-2">
          Verified achievements from continuous learning.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-12 mt-8">
        {categories.map((cat) => {
          const count =
            cat === "All"
              ? certificates.length
              : certificates.filter((c) => c.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                isActive
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}{" "}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="relative select-none">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center"
          drag="x"
          style={{
            x: carouselX,
            gap: GAP,
            paddingLeft: `calc(50% - ${CARD_W / 2}px)`,
            paddingRight: `calc(50% - ${CARD_W / 2}px)`,
          }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
        >
          {filtered.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              cardIndex={i}
              carouselX={carouselX}
              onSelect={setSelectedCert}
            />
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          aria-label="Previous certificate"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex items-center gap-2.5">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ease-out active:scale-75 ${
                i === index ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
              }`}
              style={{ width: i === index ? 32 : 10, height: 6 }}
              aria-label={`Go to certificate ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === maxIdx}
          className="w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          aria-label="Next certificate"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
