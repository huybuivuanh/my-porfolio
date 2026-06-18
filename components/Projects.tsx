"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { suite } from "@/lib/content";
import type { MediaEntry } from "@/lib/media";

type App = {
  title: string;
  description: string;
  architecture?: string;
  tags: string[];
  media?: MediaEntry[];
};

const SIZES =
  "(max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 2rem), 33vw";

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-xs font-medium bg-white/[0.05] text-neutral-400 rounded-md border border-white/[0.07]">
      {label}
    </span>
  );
}

function MediaItem({
  item,
  title,
  fill: isFill,
}: {
  item: MediaEntry;
  title: string;
  fill: boolean;
}) {
  if (item.type === "image") {
    return (
      <Image
        src={item.src}
        alt={title}
        fill={isFill}
        width={isFill ? undefined : 1920}
        height={isFill ? undefined : 1080}
        sizes={isFill ? SIZES : undefined}
        style={
          isFill
            ? undefined
            : {
                width: "100%",
                height: "auto",
                maxHeight: "85vh",
                objectFit: "contain",
              }
        }
        className={isFill ? "object-cover" : "rounded-xl"}
      />
    );
  }
  return (
    <>
      {item.poster && (
        <Image
          src={item.poster}
          alt={title}
          fill={isFill}
          width={isFill ? undefined : 1920}
          height={isFill ? undefined : 1080}
          sizes={isFill ? SIZES : undefined}
          style={
            isFill
              ? undefined
              : {
                  width: "100%",
                  height: "auto",
                  maxHeight: "85vh",
                  objectFit: "contain",
                }
          }
          className={isFill ? "object-cover" : "rounded-xl"}
        />
      )}
      {isFill && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <FaPlay size={13} className="text-white ml-0.5" />
          </div>
        </div>
      )}
    </>
  );
}

function MediaModal({
  items,
  initialIndex,
  title,
  onClose,
}: {
  items: MediaEntry[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const current = items[idx];
  const hasPrev = idx > 0;
  const hasNext = idx < items.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) setIdx((i) => i - 1);
      if (e.key === "ArrowRight" && hasNext) setIdx((i) => i + 1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, hasPrev, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-2"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        aria-label="Close"
      >
        <FiX size={26} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full flex items-center gap-3"
      >
        <button
          onClick={() => setIdx((i) => i - 1)}
          disabled={!hasPrev}
          className="shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-0 disabled:pointer-events-none transition-all"
          aria-label="Previous"
        >
          <FiChevronLeft size={22} />
        </button>

        <div className="flex-1 min-w-0">
          {current.type === "video" ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              className="w-full rounded-xl"
            />
          ) : (
            <MediaItem item={current} title={title} fill={false} />
          )}
        </div>

        <button
          onClick={() => setIdx((i) => i + 1)}
          disabled={!hasNext}
          className="shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-0 disabled:pointer-events-none transition-all"
          aria-label="Next"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {items.length > 1 && (
        <div onClick={(e) => e.stopPropagation()} className="flex gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === idx ? "bg-white" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CardMedia({
  media,
  title,
  onOpen,
}: {
  media: MediaEntry[];
  title: string;
  onOpen: (index: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const current = media[idx];

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 group">
      <button
        onClick={() => onOpen(idx)}
        className="absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9eff] focus-visible:ring-inset"
        aria-label={`View ${title} media`}
      >
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          {current.type === "image" ? (
            <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
              <MediaItem item={current} title={title} fill />
            </div>
          ) : (
            <div className="w-full h-full">
              {current.poster ? (
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                  <MediaItem item={current} title={title} fill />
                </div>
              ) : (
                <div className="w-full h-full bg-white/[0.04] flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <FaPlay size={13} className="text-white ml-0.5" />
                  </div>
                </div>
              )}
              {current.poster && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/25 transition-colors duration-300">
                    <FaPlay size={13} className="text-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </button>

      {media.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === idx
                  ? "bg-white shadow-sm"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`View media ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects({ apps }: { apps: App[] }) {
  const [openMedia, setOpenMedia] = useState<{
    items: MediaEntry[];
    index: number;
    title: string;
  } | null>(null);
  const close = useCallback(() => setOpenMedia(null), []);

  return (
    <>
      <AnimatePresence>
        {openMedia && (
          <MediaModal
            items={openMedia.items}
            initialIndex={openMedia.index}
            title={openMedia.title}
            onClose={close}
          />
        )}
      </AnimatePresence>

      <section
        id="projects"
        className="py-24 px-6 border-t border-white/[0.04]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Projects</h2>

          {/* Suite overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-8 rounded-xl border border-[#3b9eff]/20 bg-[#111111] hover:border-[#3b9eff]/40 hover:shadow-[0_0_40px_rgba(59,158,255,0.07)] transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <h3 className="text-xl font-semibold text-white">
                {suite.title}
              </h3>
              <span className="shrink-0 text-xs px-3 py-1 rounded-full border border-[#3b9eff]/30 text-[#3b9eff] font-medium">
                {suite.badge}
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-5">
              {suite.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {suite.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <p className="text-sm text-neutral-500 italic">{suite.note}</p>
          </motion.div>

          {/* Individual apps as subsections */}
          <div className="divide-y divide-white/[0.04] mt-2">
            {apps.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="py-10 flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-3">
                    {app.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mb-3">
                    {app.description}
                  </p>
                  {app.architecture && (
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4 border-l-2 border-white/10 pl-3">
                      {app.architecture}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {app.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                </div>
                {app.media && app.media.length > 0 && (
                  <div className="shrink-0 w-full md:w-72">
                    <CardMedia
                      media={app.media}
                      title={app.title}
                      onOpen={(index) =>
                        setOpenMedia({
                          items: app.media!,
                          index,
                          title: app.title,
                        })
                      }
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
