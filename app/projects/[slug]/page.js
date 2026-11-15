import Link from "next/link";
import { notFound } from "next/navigation";
import { cv } from "@/data/cv";
import Reveal from "@/components/Reveal";

// A static site must know every project page at build time.
// This builds one page per project in data/cv.js.
export function generateStaticParams() {
  return cv.projects.map((p) => ({ slug: p.slug }));
}

// Any slug that is not in cv.js shows the 404 page.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = cv.projects.find((p) => p.slug === slug);
  return {
    title: `${project?.name} | ${cv.name}`,
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params; // params is a Promise in Next.js 15+
  const i = cv.projects.findIndex((p) => p.slug === slug);
  const project = cv.projects[i];
  if (!project) notFound();

  const prev = cv.projects[(i - 1 + cv.projects.length) % cv.projects.length];
  const next = cv.projects[(i + 1) % cv.projects.length];
  const paragraphs = project.description.split(/\n\s*\n/);

  const meta = [
    project.year && { label: "Year", value: project.year },
    project.role && { label: "Role", value: project.role },
  ].filter(Boolean);

  return (
    <article className="pb-10 pt-10 sm:pt-16">
      <Reveal>
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.18em] text-mute">
          <Link href="/#projects" className="link-u hover:text-ink">
            ← All projects
          </Link>
          <span className="mx-3" aria-hidden="true">/</span>
          <span aria-current="page">
            {String(i + 1).padStart(2, "0")} of {String(cv.projects.length).padStart(2, "0")}
          </span>
        </nav>

        <h1 className="mt-10 font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.92]">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-soft sm:text-2xl">{project.summary}</p>
      </Reveal>

      <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
        {/* Sidebar: meta + links */}
        <Reveal as="aside" className="space-y-8 lg:col-span-4">
          {meta.length > 0 && (
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-mute">{m.label}</dt>
                  <dd className="mt-1">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-mute">Built with</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-line bg-elev px-3 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {(project.demo || project.repo) && (
            <div className="flex flex-wrap gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition hover:brightness-110"
                >
                  Live demo ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium transition hover:border-ink"
                >
                  Source code ↗
                </a>
              )}
            </div>
          )}
        </Reveal>

        {/* Story */}
        <div className="lg:col-span-8">
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-soft">
            {paragraphs.map((para, n) => (
              <p
                key={n}
                className={
                  n === 0
                    ? "font-display text-2xl leading-snug text-ink sm:text-3xl"
                    : ""
                }
              >
                {para}
              </p>
            ))}
          </Reveal>

          {project.highlights?.length > 0 && (
            <Reveal delay={150} className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-mute">Highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 rounded-2xl border border-line bg-elev p-5">
                    <span className="text-accent" aria-hidden="true">✦</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>

      {/* Prev / next */}
      {cv.projects.length > 1 && (
        <nav aria-label="More projects" className="mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}/`} className="group rounded-3xl border border-line p-6 transition hover:border-ink">
            <span className="font-mono text-xs uppercase tracking-widest text-mute">← Previous</span>
            <span className="mt-2 block font-display text-3xl transition-colors group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}/`} className="group rounded-3xl border border-line p-6 text-right transition hover:border-ink">
            <span className="font-mono text-xs uppercase tracking-widest text-mute">Next →</span>
            <span className="mt-2 block font-display text-3xl transition-colors group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
