"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { FaApple, FaPlay } from "react-icons/fa";
import { FiX, FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { suite, homeServer } from "@/lib/content";
import type { MediaEntry } from "@/lib/media";

type App = {
  title: string;
  description: string;
  architecture?: string;
  tags: string[];
  appStore?: string;
  website?: string;
  media?: MediaEntry[];
};

const SIZES =
  "(max-width: 768px) calc(100vw - 3rem), 460px";

const LINK_BUTTON =
  "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[#3b9eff]/30 text-[#3b9eff] hover:bg-[#3b9eff]/10 hover:border-[#3b9eff]/60 transition-colors";

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-xs font-medium bg-white/[0.05] text-neutral-400 rounded-md border border-white/[0.07]">
      {label}
    </span>
  );
}

// Card preview: shows the whole image (no cropping), so phone screenshots and
// desktop screenshots both read clearly. Videos show their first frame (or
// poster) with a play badge and open in the fullscreen viewer.
function CardThumb({ item, title }: { item: MediaEntry; title: string }) {
  if (item.type === "image") {
    return (
      <Image
        src={item.src}
        alt={title}
        fill
        sizes={SIZES}
        className="object-contain"
      />
    );
  }
  return (
    <>
      {item.poster ? (
        <Image
          src={item.poster}
          alt={title}
          fill
          sizes={SIZES}
          className="object-contain"
        />
      ) : (
        <video
          src={`${item.src}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/25">
        <div className="w-14 h-14 rounded-full bg-[#3b9eff]/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <FaPlay size={16} className="text-white ml-1" />
        </div>
      </div>
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
  const touchStartX = useRef<number | null>(null);
  const swiped = useRef(false);
  const current = media[idx];
  const count = media.length;
  const multiple = count > 1;

  const go = (delta: number) => setIdx((i) => (i + delta + count) % count);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/10 backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9eff]";

  return (
    <div>
      <div
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] bg-[#141414] group"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          swiped.current = false;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || !multiple) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) {
            swiped.current = true;
            go(dx < 0 ? 1 : -1);
          }
          touchStartX.current = null;
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.button
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              if (swiped.current) {
                swiped.current = false;
                return;
              }
              onOpen(idx);
            }}
            className="absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9eff] focus-visible:ring-inset"
            aria-label={
              current.type === "video"
                ? `Play ${title} video`
                : `View ${title} screenshot fullscreen`
            }
          >
            <CardThumb item={current} title={title} />
          </motion.button>
        </AnimatePresence>

        {multiple && (
          <>
            <button
              onClick={() => go(-1)}
              className={`${arrowClass} left-2`}
              aria-label="Previous"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              className={`${arrowClass} right-2`}
              aria-label="Next"
            >
              <FiChevronRight size={18} />
            </button>
            <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md bg-black/60 text-white/80 text-xs font-medium tabular-nums backdrop-blur-sm pointer-events-none">
              {idx + 1} / {count}
            </span>
          </>
        )}
      </div>

      {multiple && (
        <div className="flex justify-center gap-1.5 mt-3">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx
                  ? "w-4 bg-[#3b9eff]"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
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
                  {(app.appStore || app.website) && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {app.appStore && (
                        <a
                          href={app.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${app.title} on the App Store`}
                          className={LINK_BUTTON}
                        >
                          <FaApple className="text-base" aria-hidden />
                          App Store
                        </a>
                      )}
                      {app.website && (
                        <a
                          href={app.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${app.title}`}
                          className={LINK_BUTTON}
                        >
                          <FiExternalLink className="text-base" aria-hidden />
                          Live site
                        </a>
                      )}
                    </div>
                  )}
                </div>
                {app.media && app.media.length > 0 && (
                  <div className="shrink-0 w-full md:w-[44%]">
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

          {/* Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 p-8 rounded-xl border border-white/[0.08] bg-[#111111] hover:border-[#3b9eff]/30 transition-colors duration-300"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <h3 className="text-xl font-semibold text-white">
                {homeServer.title}
              </h3>
              <span className="shrink-0 text-xs px-3 py-1 rounded-full border border-[#3b9eff]/30 text-[#3b9eff] font-medium">
                {homeServer.badge}
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-6">
              {homeServer.description}
            </p>
            <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2 mb-6">
              {homeServer.highlights.map((h) => (
                <li
                  key={h.label}
                  className="text-sm leading-relaxed border-l-2 border-[#3b9eff]/40 pl-3"
                >
                  <span className="block text-white font-medium mb-0.5">
                    {h.label}
                  </span>
                  <span className="text-neutral-500">{h.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {homeServer.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
