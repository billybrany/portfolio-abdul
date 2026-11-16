// Build-time image lookup (runs only on the server while the static site is built).
// Finds each project image in /public/images, whatever its extension, and reads
// its real width/height so the page reserves space (no layout shift).
// If a file is missing, `src` is null and the designed artwork cover is shown.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];
const ROOT = path.join(process.cwd(), "public", "images");

export function resolveImage(file) {
  for (const ext of EXTENSIONS) {
    const full = path.join(ROOT, file + ext);
    if (fs.existsSync(full)) {
      try {
        const { width, height } = imageSize(fs.readFileSync(full));
        return { src: encodeURI(`/images/${file}${ext}`), width, height };
      } catch {
        return null;
      }
    }
  }
  return null;
}

// Returns the project with each image resolved: { ...image, src, width, height }.
export function withImages(project) {
  return {
    ...project,
    images: (project.images || []).map((img) => ({ ...img, ...(resolveImage(img.file) || { src: null }) })),
  };
}
