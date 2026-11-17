import { Fragment } from "react";
import Reveal from "@/components/Reveal";

// A reusable wrapper for each part of the page (Experience, Projects, ...).
// The id lets the navbar jump to it: <a href="#projects">.
// `index` shows the editorial number (01, 02, ...); `intro` is an optional lead line.
export default function Section({ id, index, label, title, intro, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <Reveal className="mb-12 grid gap-4 sm:mb-16 sm:grid-cols-12">
        {/* Section tag, e.g. "01  Work": large and easy to spot */}
        <p className="flex items-center gap-3 sm:col-span-3 sm:pt-3">
          {index && (
            <span className="font-mono text-xl font-bold text-ink sm:text-2xl">
              {index}
            </span>
          )}
          <span className="text-xl font-semibold uppercase tracking-[0.12em] text-ink sm:text-2xl">{label || id}</span>
        </p>
        <div className="sm:col-span-9">
          <h2
            id={`${id}-title`}
            aria-label={title}
            className="font-display text-4xl leading-[1.05] sm:text-6xl"
          >
            {/* words rise in one after another */}
            <span className="words" aria-hidden="true">
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
