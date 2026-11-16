import { Fragment } from "react";
import Reveal from "@/components/Reveal";

// A reusable wrapper for each part of the page (Experience, Projects, ...).
// The id lets the navbar jump to it: <a href="#projects">.
// `index` shows the editorial number (01, 02, ...); `intro` is an optional lead line.
export default function Section({ id, index, title, intro, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <Reveal className="mb-12 grid gap-4 sm:mb-16 sm:grid-cols-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute sm:col-span-3 sm:pt-4">
          {index && <span className="text-accent">{index}</span>}
          {index && " / "}
          {id}
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
