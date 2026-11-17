/* eslint-disable @next/next/no-img-element -- static export: plain <img> with build-time width/height */
import { withBase } from "@/lib/withBase";
import ArtCover from "@/components/ArtCover";

// One project image, art-directed by `fit`, or the designed artwork if the
// file isn't there yet. Images are never stretched, and never shown wider
// than their real pixel width, so they stay sharp.
//
// fit="cover"   → card thumbnail: the design sits on the project's color and
//                 bleeds off the bottom-right corner, like a product shot.
// fit="stage"   → case-study hero: centered on a colored panel, height capped.
// fit="natural" → keeps its own ratio in a clean frame (window style).
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
  maxHeight = "70svh",
}) {
  const isMobile = image?.device === "mobile";
  const hasFile = Boolean(image?.src);
  const aspect = hasFile ? image.width / image.height : 16 / 10;
  const zoom = hover ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" : "";

  const imgProps = hasFile && {
    src: withBase(image.src),
    alt: image.alt,
    width: image.width,
    height: image.height,
    sizes,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
    decoding: "async",
  };

  // Phone screenshot in a device frame
  if (isMobile && hasFile && fit === "natural") {
    return (
      <figure className={className}>
        <div className="img-reveal mx-auto w-full max-w-[280px] rounded-[2.4rem] bg-ink p-[7px] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
          <div className="overflow-hidden rounded-[2rem]">
            <img {...imgProps} alt={image.alt} className="block h-auto w-full" />
          </div>
        </div>
        {caption && <Caption image={image} center />}
      </figure>
    );
  }

  // Missing file → designed artwork cover
  if (!hasFile) {
    return (
      <figure className={className}>
        <div className="img-reveal relative overflow-hidden rounded-[1.25rem] border border-line" style={{ aspectRatio: fit === "stage" ? "16 / 9" : ratio }}>
          <div className={`h-full w-full ${zoom}`}>
            <ArtCover project={project} label={image?.caption} />
          </div>
        </div>
        {caption && <Caption image={image} />}
      </figure>
    );
  }

  // Card thumbnail: bleed composition on the project color
  if (fit === "cover") {
    return (
      <figure className={className}>
        <div className="img-reveal relative overflow-hidden rounded-[1.25rem]" style={{ aspectRatio: ratio, background: project.art.bg }}>
          <Dots color={project.art.fg} />
          <div className={`absolute left-[8%] top-[10%] w-[92%] origin-top-left ${zoom}`}>
            <img {...imgProps} alt={image.alt} className="block h-auto w-full rounded-tl-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10" />
          </div>
        </div>
        {caption && <Caption image={image} />}
      </figure>
    );
  }

  // Case-study hero: centered on a colored stage
  if (fit === "stage") {
    return (
      <figure className={className}>
        <div className="img-reveal relative overflow-hidden rounded-[2rem] px-[4%] py-[6%] sm:px-[7%] sm:py-[5.5%]" style={{ background: project.art.bg }}>
          <Dots color={project.art.fg} />
          <img
            {...imgProps}
            alt={image.alt}
            style={{ width: `min(100%, ${image.width}px, calc(${maxHeight} * ${aspect.toFixed(4)}))` }}
            className="relative mx-auto block h-auto rounded-lg shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] ring-1 ring-white/10 sm:rounded-xl"
          />
        </div>
        {caption && <Caption image={image} />}
      </figure>
    );
  }

  // Natural: clean window frame, own ratio, never wider than the file
  return (
    <figure className={className} style={{ maxWidth: image.width }}>
      <div className="img-reveal overflow-hidden rounded-[1.1rem] border border-line bg-elev shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
        <img {...imgProps} alt={image.alt} className={`block h-auto w-full ${zoom}`} />
      </div>
      {caption && <Caption image={image} />}
    </figure>
  );
}

function Dots({ color }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1.2px)`, backgroundSize: "22px 22px" }}
    />
  );
}

function Caption({ image, center = false }) {
  return (
    <figcaption className={`mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs text-mute ${center ? "justify-center text-center" : "justify-between"}`}>
      <span>{image?.caption}</span>
      {!center && <span className="uppercase tracking-[0.16em]">Concept visual</span>}
    </figcaption>
  );
}
