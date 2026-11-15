"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

// Project cards with a filter by technology.
export default function ProjectsGrid({ projects }) {
  const [filter, setFilter] = useState("All");

  // Only offer filters for tech used in more than one project
  // (or all tech if there are only a few projects).
  const filters = useMemo(() => {
    const counts = {};
    projects.forEach((p) => p.tech.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
    const all = Object.keys(counts);
    const shared = all.filter((t) => counts[t] > 1);
    return ["All", ...(projects.length <= 4 || shared.length < 2 ? all : shared)];
  }, [projects]);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <>
      {filters.length > 2 && (
        <div
          role="group"
          aria-label="Filter projects by technology"
          className="mb-8 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === f
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-soft hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>
      <ul className="grid gap-5 md:grid-cols-2">
        {visible.map((project) => (
          <Reveal as="li" key={project.slug} delay={(projects.indexOf(project) % 2) * 120}>
            <ProjectCard project={project} number={projects.indexOf(project) + 1} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}
