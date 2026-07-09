"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ZoomIn, ExternalLink, X } from "lucide-react";
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

const PREVIEW_COUNT = 6;

function CardStack({
  certificates,
  onCardClick,
  deckAngle = 0,
}: {
  certificates: Certificate[];
  onCardClick?: (cert: Certificate) => void;
  deckAngle?: number;
}) {
  const [items, setItems] = useState(certificates);
  const [swipingId, setSwipingId] = useState<number | null>(null);
  const [swipeDir, setSwipeDir] = useState(0);
  const [swipeVelocity, setSwipeVelocity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const didDrag = useRef(false);

  useEffect(() => {
    setItems(certificates);
  }, [certificates]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = useCallback(
    (certId: number, _: any, info: { offset: { x: number }; velocity: { x: number } }) => {
      if (Math.abs(info.offset.x) <= 70 && Math.abs(info.velocity.x) <= 300) return;

      didDrag.current = true;
      const dir = info.offset.x > 0 || info.velocity.x > 0 ? 1 : -1;
      setSwipingId(certId);
      setSwipeDir(dir);
      setSwipeVelocity(info.velocity.x);

      setTimeout(() => {
        setItems((prev) => {
          const idx = prev.findIndex((c) => c.id === certId);
          if (idx === -1) return prev;
          const next = [...prev];
          next.push(next.splice(idx, 1)[0]);
          return next;
        });
        setSwipingId(null);
        setSwipeDir(0);
        setSwipeVelocity(0);
      }, 350);
    },
    [],
  );

  const handleCardClick = useCallback(
    (certId: number) => {
      if (swipingId) return;
      const cert = items.find((c) => c.id === certId);
      if (cert) onCardClick?.(cert);
    },
    [items, swipingId, onCardClick],
  );

  return (
    <motion.div
      animate={{ rotate: isHovered ? 0 : deckAngle }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full"
      style={{ height: 450, perspective: 800 }}
    >
      {items.map((cert, i) => {
        const isTop = i === 0;
        const isSwiping = swipingId === cert.id;
        const clampedIdx = Math.min(i, 5);
        const targetY = clampedIdx * 8;
        const targetScale = 1 - clampedIdx * 0.03;
        const zIndex = items.length - i;

        return (
          <motion.div
            key={cert.id}
            layout
            initial={false}
            animate={{
              y: isSwiping ? clampedIdx * 8 : targetY,
              scale: isSwiping ? targetScale : targetScale,
              x: isSwiping ? swipeDir * 350 : 0,
              opacity: isSwiping ? 0 : i < 6 ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: isSwiping ? 220 : 350,
              damping: isSwiping ? 18 : 32,
              mass: isSwiping ? 1.2 : 0.9,
              velocity: isSwiping ? swipeVelocity : undefined,
            }}
            drag={isTop && !swipingId ? "x" : false}
            dragElastic={0.12}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onDragEnd={(_, info: any) => handleDragEnd(cert.id, _, info)}
            whileDrag={{
              scale: 1.03,
              rotate: 4,
              boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
              cursor: "grabbing",
              transition: { duration: 0.1 },
            }}
            whileHover={
              isTop && !swipingId
                ? {
                    y: -6,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }
                : undefined
            }
            onMouseDown={() => { didDrag.current = false; }}
            onClick={() => {
              if (didDrag.current) { didDrag.current = false; return; }
              if (isTop && !swipingId) handleCardClick(cert.id);
            }}
            className="absolute inset-x-0 rounded-[12px] bg-white overflow-hidden cursor-grab select-none will-change-transform"
            style={{
              zIndex,
              touchAction: isTop && !swipingId ? "none" : "pan-y",
              pointerEvents: isSwiping ? "none" : "auto",
              boxShadow:
                isTop && !isSwiping
                  ? "0 10px 30px rgba(0,0,0,0.06)"
                  : "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div className="h-[340px] bg-gradient-to-b from-[#fcf9f5] to-[#f8f3ec] flex items-center justify-center p-5 overflow-hidden">
              {cert.imageUrl ? (
                <Img src={cert.imageUrl} alt={cert.title} containerClassName="w-full h-full rounded-[8px]" imgClassName="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full rounded-[8px] bg-white flex flex-col items-center justify-center p-5">
                  <div className="w-full max-w-[140px] flex flex-col items-center gap-2.5">
                    <div className="w-full h-px bg-[#e5ddd2]" />
                    <p className="text-[10px] font-bold text-[#3d3730] text-center leading-snug">{cert.title}</p>
                    <div className="w-8 h-px bg-[#e5ddd2]" />
                    <p className="text-[8px] text-[#9e9280] text-center">{cert.org}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 pb-4 pt-3">
              <h3 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-1">
                {cert.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">{cert.org}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{cert.issuedDate}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function Certificates({ isPreview = false }: { isPreview?: boolean }) {
  const [modalCert, setModalCert] = useState<Certificate | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI<{ data: Certificate[] }>("certificates")
      .then((res) => {
        setCertificates(wrapData(res));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayCerts = isPreview
    ? certificates.slice(0, PREVIEW_COUNT)
    : certificates;

  const MID = Math.ceil(displayCerts.length / 2);

  if (loading) {
    return (
      <section className="section-padding py-20 border-t border-gray-100">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-48 bg-gray-200 rounded" />
          <div className="flex gap-10 justify-center mt-10">
            <div className="w-[260px] h-[450px] rounded-[12px] bg-gray-100" />
            <div className="w-[260px] h-[450px] rounded-[12px] bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding py-20 border-t border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
            CERTIFICATIONS
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">Certificates.</h2>
        </div>
        {isPreview && (
          <Link
            href="/certificate"
            className="mt-6 md:mt-0 inline-block border border-gray-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-all active:scale-[0.97] cursor-pointer"
          >
            View All Certificates ↗
          </Link>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-10 text-center">
        Drag the cards to browse certificates
      </p>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
        <div className="w-full max-w-[260px] mx-auto">
          <CardStack
            certificates={displayCerts.slice(0, MID)}
            deckAngle={-3}
            onCardClick={setModalCert}
          />
        </div>
        <div className="w-full max-w-[260px] mx-auto">
          <CardStack
            certificates={displayCerts.slice(MID)}
            deckAngle={3}
            onCardClick={setModalCert}
          />
        </div>
      </div>

      <AnimatePresence>
        {modalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setModalCert(null);
              setZoomed(false);
            }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl relative flex flex-col w-full max-w-lg max-h-[90vh]"
            >
              <div className="flex-1 bg-gradient-to-b from-[#fcf9f5] to-[#f8f3ec] flex items-center justify-center p-8 min-h-0 overflow-hidden">
                {modalCert.imageUrl ? (
                  <Img src={modalCert.imageUrl} alt={modalCert.title} containerClassName="w-full h-full rounded-[10px]" imgClassName="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full max-h-full rounded-[10px] bg-white flex flex-col items-center justify-center p-8">
                    <div className="max-w-[240px] flex flex-col items-center gap-3">
                      <div className="w-12 h-px bg-[#e5ddd2]" />
                      <p className="text-lg font-bold text-[#3d3730] text-center leading-snug">{modalCert.title}</p>
                      <div className="w-8 h-px bg-[#e5ddd2]" />
                      <p className="text-sm text-[#9e9280] text-center">{modalCert.org}</p>
                      <p className="text-xs text-[#b8ad9e]">{modalCert.issuedDate}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-100">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {modalCert.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {modalCert.org} &bull; {modalCert.issuedDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomed(!zoomed)}
                    className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-all active:scale-[0.97] px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    {zoomed ? "Reset" : "Zoom"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setModalCert(null);
                  setZoomed(false);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-[0.92] shadow-sm"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
