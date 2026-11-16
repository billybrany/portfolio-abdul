/* eslint-disable @next/next/no-img-element -- static export: plain <img> with build-time width/height */
import { withBase } from "@/lib/withBase";
import ArtCover from "@/components/ArtCover";

// One project image, or the designed artwork if the file isn't there yet.
//
// fit="cover"   → fills a fixed-ratio frame (cards). Cropped, never stretched.
// fit="natural" → keeps the image's own aspect ratio (case studies).
// device="mobile" images get a phone frame.
export default function ProjectVisual({
  project,
  image,
  fit = "natural",
  ratio = "16 / 10",
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  caption = false,
  className = "",
  hover = false,
}) {
  const isMobile = image?.device === "mobile";
  const hasFile = Boolean(image?.src);

  const img = hasFile && (
    <img
      src={withBase(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`block h-full w-full ${fit === "cover" ? "object-cover object-top" : "h-auto"} ${
        hover ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" : ""
      }`}
    />
  );

  // Phone frame for mobile screenshots
  if (isMobile && hasFile && fit === "natural") {
    return (
      <figure className={className}>
        <div className="img-reveal mx-auto w-full max-w-[300px] rounded-[2.4rem] border border-line bg-ink p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]">
          <div className="overflow-hidden rounded-[1.9rem]">{img}</div>
        </div>
        {caption && <Caption image={image} />}
      </figure>
    );
  }

  return (
    <figure className={className}>
      <div
        className="img-reveal relative overflow-hidden rounded-[1.25rem] border border-line bg-elev"
        style={fit === "cover" || !hasFile ? { aspectRatio: ratio } : undefined}
      >
        {hasFile ? (
          img
        ) : (
          <div className={`h-full w-full ${hover ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" : ""}`}>
            <ArtCover project={project} label={image?.caption} />
          </div>
        )}
      </div>
      {caption && <Caption image={image} />}
    </figure>
  );
}

function Caption({ image }) {
  return (
    <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-xs text-mute">
      <span>{image?.caption}</span>
      <span className="uppercase tracking-[0.16em]">Concept visual</span>
    </figcaption>
  );
}
