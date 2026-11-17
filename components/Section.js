import { Fragment } from "react";
import Reveal from "@/components/Reveal";

// A reusable wrapper for each part of the page (Experience, Projects, ...).
// The id lets the navbar jump to it: <a href="#projects">.
// `index` shows the editorial number (01, 02, ...); `intro` is an optional lead line.
export default function Section({ id, index, label, title, intro, motion, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      {/* measurement ticks along the top rule, like a drawing sheet */}
      <div aria-hidden="true" className="section-ruler absolute inset-x-0 top-0 h-2" />
      <Reveal className="mb-12 grid gap-4 sm:mb-16 sm:grid-cols-12">
        {/* Section tag: a vertical accent line beside the section name */}
        <p className="flex items-center gap-3.5 sm:col-span-3 sm:pt-3">
          <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-accent sm:h-9" />
          <span className="text-xl font-semibold uppercase tracking-[0.12em] text-ink sm:text-2xl">{label || id}</span>
        </p>
        <div className="sm:col-span-9">
          <h2
            id={`${id}-title`}
            aria-label={title}
            className="font-display text-4xl leading-[1.05] sm:text-6xl"
          >
            {/* words rise in one after another */}
            <span className={`words ${motion ? `words-${motion}` : ""}`} aria-hidden="true">
              {title.split(" ").map((w, i, all) => (
                <Fragment key={i}>
                  <span style={{ "--w": i }}>{w}</span>
                  {i < all.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          </h2>
          {intro && (
            <p className="mt-4 max-w-xl text-lg text-soft">{intro}</p>
          )}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
