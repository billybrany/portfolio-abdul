import Link from "next/link";
import { notFound } from "next/navigation";
import { cv } from "@/data/cv";
import { withImages } from "@/lib/images";
import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";

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

function Heading({ n, children }) {
  return (
    <h2 className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
      <span className="text-accent">{n}</span>
      {children}
    </h2>
  );
}

// Images for one part of the story. Two phone shots overlap; others stack.
function Visuals({ project, images }) {
  if (!images.length) return null;
  const phones = images.filter((i) => i.device === "mobile" && i.src);
  if (phones.length >= 2 && phones.length === images.length) {
    return (
      <div className="relative mx-auto grid max-w-2xl grid-cols-2 items-start gap-4 sm:gap-10">
        <Reveal className="sm:rotate-[-3deg]">
          <ProjectVisual project={project} image={phones[0]} caption sizes="300px" />
        </Reveal>
        <Reveal delay={150} className="sm:translate-y-16 sm:rotate-[3deg]">
          <ProjectVisual project={project} image={phones[1]} caption sizes="300px" />
        </Reveal>
      </div>
    );
  }
  return (
    <div className={`grid gap-6 ${images.length > 1 ? "md:grid-cols-2" : ""}`}>
      {images.map((img, i) => (
        <Reveal key={img.file} delay={i * 120}>
          <ProjectVisual project={project} image={img} caption sizes={images.length > 1 ? "(min-width: 768px) 560px, 100vw" : "(min-width: 1024px) 1150px, 100vw"} />
        </Reveal>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params; // params is a Promise in Next.js 15+
  const i = cv.projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const project = withImages(cv.projects[i]);
  const next = withImages(cv.projects[(i + 1) % cv.projects.length]);
  const prev = cv.projects[(i - 1 + cv.projects.length) % cv.projects.length];

  const [main, ...others] = project.images;
  const bySection = (s) => others.filter((img) => img.section === s);
  const overviewImgs = bySection("overview");
  const approachImgs = bySection("approach");
  const solutionImgs = [...bySection("solution"), ...overviewImgs];
  const resultImgs = bySection("results");

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.period },
    { label: "Team", value: project.team },
    { label: "Organization", value: project.organization },
  ].filter((m) => m.value);

  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <article className="pb-10">
      {/* 1. Introduction */}
      <header className="relative pt-10 sm:pt-16">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-mute">
            <Link href="/#work" className="link-u hover:text-ink">← All work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              {String(i + 1).padStart(2, "0")} of {String(cv.projects.length).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-line px-2.5 py-1 text-ink">{project.category}</span>
            {project.flagship && <span className="rounded-full bg-ink px-2.5 py-1 text-bg">Flagship</span>}
          </nav>
          <h1 className="mt-10 max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.92]">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-xl text-soft sm:text-2xl">{project.summary}</p>
        </Reveal>
        {project.nameArabic && (
          <span aria-hidden="true" dir="rtl" lang="ar" className="font-arabic pointer-events-none absolute end-0 top-10 hidden text-[10rem] font-bold leading-none text-accent opacity-15 lg:block">
            {project.nameArabic}
          </span>
        )}

        {/* 5. Timeline and team */}
        <Reveal delay={150} as="dl" className="mt-12 grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {meta.map((m, k) => (
            <div key={m.label} className={`py-5 ${k % 2 ? "border-s border-line ps-5" : "pe-5"} ${k >= 2 ? "border-t border-line lg:border-t-0" : ""} ${k % 4 ? "lg:border-s lg:ps-6" : "lg:ps-0"}`}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-mute">{m.label}</dt>
              <dd className="mt-1 font-medium">{m.value}</dd>
            </div>
          ))}
        </Reveal>
      </header>

      {/* 2. Main visual */}
      <Reveal className="mt-12">
        <ProjectVisual project={project} image={main} ratio="16 / 9" priority caption sizes="(min-width: 1200px) 1150px, 100vw" />
      </Reveal>

      {/* 3–4. Overview + role */}
      <section className="mt-24 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Heading n={num()}>Overview</Heading>
          <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">{project.overview}</p>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
          <Heading n={num()}>Role & responsibilities</Heading>
          <p className="mt-5 font-medium">{project.role}</p>
          <ul className="mt-4 space-y-3 text-soft">
            {project.responsibilities.map((r) => (
              <li key={r} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 6. Problem */}
      <section className="mt-24 rounded-[2rem] border border-line bg-elev px-6 py-14 sm:px-12 sm:py-20">
        <Reveal>
          <Heading n={num()}>Problem</Heading>
          <p className="mt-6 max-w-4xl font-display text-3xl leading-tight sm:text-5xl">{project.problem}</p>
        </Reveal>
      </section>

      {/* 7. Approach (split screen with its image) */}
      <section className={`mt-24 grid items-center gap-12 ${approachImgs.length ? "lg:grid-cols-12" : ""}`}>
        <Reveal className={approachImgs.length ? "lg:col-span-4" : "max-w-3xl"}>
          <Heading n={num()}>Approach</Heading>
          <p className="mt-5 text-xl leading-relaxed">{project.approach}</p>
        </Reveal>
        {approachImgs.length > 0 && (
          <div className="lg:col-span-8">
            <Visuals project={project} images={approachImgs} />
          </div>
        )}
      </section>

      {/* 8. Solution */}
      <section className="mt-24">
        <Reveal className="max-w-3xl">
          <Heading n={num()}>Solution</Heading>
          <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">{project.solution}</p>
        </Reveal>
        {solutionImgs.length > 0 && (
          <div className="mt-12">
            <Visuals project={project} images={solutionImgs} />
          </div>
        )}
      </section>

      {/* 9. Results */}
      <section className={`relative mt-24 overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-bg sm:px-12 sm:py-20 ${solutionImgs.some((x) => x.device === "mobile" && x.src) ? "sm:mt-36" : ""}`}>
        <Reveal>
          <h2 className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] opacity-70">
            <span className="text-accent-inv">{num()}</span> Results
          </h2>
        </Reveal>
        <dl className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {project.results.map((r, k) => (
            <Reveal key={r.label} delay={k * 90} className="border-t border-bg/20 pt-6">
              <dd className="font-display text-5xl leading-none text-accent-inv sm:text-6xl">
                {r.value}
                {r.unit && <span className="ms-2 text-2xl text-bg/70">{r.unit}</span>}
              </dd>
              <dt className="mt-3 text-lg">{r.label}</dt>
              {r.detail && <p className="mt-1 text-sm opacity-70">{r.detail}</p>}
            </Reveal>
          ))}
        </dl>
        {project.recognition && (
          <Reveal className="mt-12 inline-flex items-center gap-3 rounded-full border border-bg/25 px-5 py-3 text-sm">
            <span className="text-accent-inv" aria-hidden="true">✦</span>
            <span><span className="sr-only">Award: </span>{project.recognition}</span>
          </Reveal>
        )}
      </section>
      {resultImgs.length > 0 && (
        <div className="mt-10">
          <Visuals project={project} images={resultImgs} />
        </div>
      )}

      {/* 10. Technologies */}
      <section className="mt-24 grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Heading n={num()}>Technologies</Heading>
        </div>
        <ul className="flex flex-wrap gap-2 lg:col-span-9">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-line bg-elev px-4 py-2 font-mono text-sm">{t}</li>
          ))}
        </ul>
      </section>
      <p className="mt-8 text-sm text-mute">
        Visuals on this page are conceptual product visualizations, not production screenshots.
      </p>

      {/* 12. Next project */}
      <nav aria-label="More projects" className="mt-24 border-t border-line pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href={`/projects/${prev.slug}/`} className="link-u font-mono text-xs uppercase tracking-widest text-mute hover:text-ink">
            ← Previous: {prev.name}
          </Link>
          <Link href="/#work" className="link-u font-mono text-xs uppercase tracking-widest text-mute hover:text-ink">All work</Link>
        </div>
        <Link href={`/projects/${next.slug}/`} className="group mt-8 grid items-center gap-8 rounded-[2rem] border border-line p-5 transition hover:border-ink sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-mute">Next project →</p>
            <p className="mt-3 font-display text-4xl leading-tight transition-colors group-hover:text-accent sm:text-5xl">{next.name}</p>
            <p className="mt-3 text-soft">{next.summary}</p>
          </div>
          <div className="lg:col-span-7">
            <ProjectVisual project={next} image={next.images[0]} fit="cover" ratio="16 / 9" hover sizes="(min-width: 1024px) 660px, 100vw" />
          </div>
        </Link>
      </nav>
    </article>
  );
}
