import Link from "next/link";

export default function ProjectCard({ project, number }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-elev p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:p-8"
    >
      {/* Accent wash that slides in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-mute">
          {String(number).padStart(2, "0")}
          {project.year && ` · ${project.year}`}
        </span>
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </div>

      <h3 className="mt-10 font-display text-3xl leading-tight sm:text-4xl">
        {project.name}
      </h3>
      <p className="mt-3 flex-1 text-soft">{project.summary}</p>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-soft"
          >
            {t}
          </li>
        ))}
      </ul>
      <span className="sr-only">Read the case study</span>
    </Link>
  );
}
