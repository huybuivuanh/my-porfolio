"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
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

// ── Plyr-backed video player ────────────────────────────────────────────────

function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<import("plyr") | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    let player: import("plyr") | null = null;

    import("plyr").then(({ default: Plyr }) => {
      if (!videoRef.current) return;
      player = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
        settings: ["speed"],
        speed: { selected: 1, options: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2] },
        hideControls: true,
        resetOnEnd: false,
      });
      playerRef.current = player;
    });

    return () => {
      player?.destroy();
      playerRef.current = null;
    };
  }, [src]);

  return (
    <div className="w-full rounded-xl overflow-hidden">
      <video ref={videoRef} src={src} poster={poster} playsInline />
    </div>
  );
}

// ── Fullscreen modal ────────────────────────────────────────────────────────

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

  const isVideo = current.type === "video";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/96 flex flex-col"
      onClick={onClose}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white/50 text-sm font-medium truncate">{title}</span>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Main area */}
      <div
        className="flex-1 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev nav */}
        <button
          onClick={() => setIdx((i) => i - 1)}
          disabled={!hasPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 disabled:opacity-0 disabled:pointer-events-none transition-all"
          aria-label="Previous"
        >
          <FiChevronLeft size={22} />
        </button>

        {/* Content */}
        {isVideo ? (
          <div className="absolute inset-0 flex items-center justify-center px-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-5xl"
              >
                <VideoPlayer src={current.src} poster={current.poster} />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 px-14"
            >
              <div className="relative w-full h-full">
                <Image
                  src={current.src}
                  alt={title}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Next nav */}
        <button
          onClick={() => setIdx((i) => i + 1)}
          disabled={!hasNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 disabled:opacity-0 disabled:pointer-events-none transition-all"
          aria-label="Next"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {/* Dot navigation */}
      {items.length > 1 && (
        <div
          className="flex gap-2 py-3 justify-center shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === idx ? "bg-white" : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Card thumbnail strip ────────────────────────────────────────────────────

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
    <div className="mb-4">
      {/* Media area */}
      <div className="relative w-full rounded-lg overflow-hidden group">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {current.type === "video" ? (
            // Video plays inline — no modal needed
            <VideoPlayer src={current.src} poster={current.poster} />
          ) : (
            // Image opens fullscreen modal on click
            <button
              onClick={() => onOpen(idx)}
              className="block w-full aspect-video relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9eff] focus-visible:ring-inset"
              aria-label={`View ${title} fullscreen`}
            >
              <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                <MediaItem item={current} title={title} fill />
              </div>
            </button>
          )}
        </motion.div>
      </div>

      {/* Dots — outside the media area so they never overlap Plyr controls */}
      {media.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
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

// ── Section ─────────────────────────────────────────────────────────────────

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

          {/* Individual apps */}
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
