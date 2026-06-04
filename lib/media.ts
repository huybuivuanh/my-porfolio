import fs from "fs";
import path from "path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov"]);

export type MediaEntry = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export function getProjectMedia(slug: string): MediaEntry[] {
  const dir = path.join(process.cwd(), "public", "media", slug);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).sort();

  // Files claimed as video posters (same name as a video, different ext) are skipped as standalone items
  const posterNames = new Set<string>();
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (VIDEO_EXTS.has(ext)) {
      const base = path.basename(file, ext);
      for (const imgExt of IMAGE_EXTS) {
        posterNames.add(base + imgExt);
      }
    }
  }

  const media: MediaEntry[] = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const src = `/media/${slug}/${file}`;

    if (IMAGE_EXTS.has(ext)) {
      if (!posterNames.has(file)) {
        media.push({ type: "image", src });
      }
    } else if (VIDEO_EXTS.has(ext)) {
      const base = path.basename(file, ext);
      const poster = IMAGE_EXTS.values().reduce<string | undefined>((found, imgExt) => {
        if (found) return found;
        const candidate = base + imgExt;
        return files.includes(candidate) ? `/media/${slug}/${candidate}` : undefined;
      }, undefined);
      media.push({ type: "video", src, poster });
    }
  }

  return media;
}
