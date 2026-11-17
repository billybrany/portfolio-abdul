import Link from "next/link";
import { notFound } from "next/navigation";
import { cv } from "@/data/cv";
import { withImages } from "@/lib/images";
import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import AnimatedNumber from "@/components/AnimatedNumber";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

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

// Images for one part of the story, each with its own composition:
//   phones  → two screens overlapping on a soft panel
//   offset  → single image shifted right over a block of the project color
//   panel   → wide image framed on a light panel (e.g. statistics)
//   split   → used beside text (Approach); plain window frame
//   2 images → asymmetric 7/5 grid
function Visuals({ project, images, layout = "split" }) {
  if (!images.length) return null;
  const phones = images.filter((i) => i.device === "mobile" && i.src);

  if (phones.length >= 2 && phones.length === images.length) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-elev px-4 pb-14 pt-12 sm:px-10 sm:pb-24 sm:pt-16">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-3xl" style={{ background: project.art.accent }} />
        <div className="relative mx-auto grid max-w-xl grid-cols-2 items-start gap-4 sm:gap-8">
          <Reveal className="sm:-rotate-3">
            <ProjectVisual project={project} image={phones[0]} caption sizes="280px" />
          </Reveal>
          <Reveal delay={150} className="mt-10 sm:mt-20 sm:rotate-3">
            <ProjectVisual project={project} image={phones[1]} caption sizes="280px" />
          </Reveal>
        </div>
      </div>
    );
  }

  if (images.length === 1 && layout === "offset") {
    const img = images[0];
    return (
      <Reveal className="relative pt-6 lg:ps-[14%]">
        <div aria-hidden="true" className="absolute bottom-14 left-0 top-[18%] w-[72%] rounded-[2rem] sm:bottom-16 sm:w-[58%]" style={{ background: project.art.bg }} />
        <ProjectVisual project={project} image={img} caption className="relative ms-auto ps-5 sm:ps-10 lg:ps-0" sizes="(min-width: 1024px) 990px, 100vw" />
      </Reveal>
    );
  }

  if (images.length === 1 && layout === "panel") {
    return (
      <Reveal className="rounded-[2rem] border border-line bg-elev p-4 sm:p-8 lg:p-10">
        <ProjectVisual project={project} image={images[0]} caption className="mx-auto" sizes="(min-width: 1024px) 1070px, 100vw" />
      </Reveal>
    );
  }

  if (images.length === 1) {
    return (
      <Reveal>
        <ProjectVisual project={project} image={images[0]} caption sizes="(min-width: 1024px) 760px, 100vw" />
      </Reveal>
    );
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-12">
      {images.map((img, i) => (
        <Reveal key={img.file} delay={i * 120} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-16"}>
          <ProjectVisual project={project} image={img} caption sizes="(min-width: 768px) 640px, 100vw" />
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
      {/* Always-visible way back, floating at the bottom of the screen */}
      <Link
        href="/#work"
        className="fixed bottom-5 left-5 z-40 inline-flex h-12 items-center gap-2.5 rounded-full bg-ink pe-5 ps-2 text-sm font-semibold text-bg shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-accent hover:text-accent-ink sm:bottom-7 sm:left-7"
      >
        <span className="grid size-8 place-items-center rounded-full bg-bg text-ink" aria-hidden="true">
          <ArrowLeft className="size-4" strokeWidth={2} />
        </span>
        <span className="hidden sm:inline">{cv.site.caseStudy.back}</span>
        <span className="sm:hidden">{cv.site.caseStudy.backShort}</span>
      </Link>
      {/* 1. Introduction */}
      <header className="relative pt-10 sm:pt-16">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-mute">
            <Link
              href="/#work"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pe-6 ps-2 font-sans text-base font-semibold normal-case tracking-normal text-bg hover:bg-accent hover:text-accent-ink"
            >
              <span className="grid size-8 place-items-center rounded-full bg-bg text-ink transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
                <ArrowLeft className="size-4" strokeWidth={2} />
              </span>
              {cv.site.caseStudy.back}
            </Link>
            <span aria-current="page" className="ms-1">
              {String(i + 1).padStart(2, "0")} of {String(cv.projects.length).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-line px-2.5 py-1 text-ink">{project.category}</span>
            {project.flagship && <span className="rounded-full bg-ink px-2.5 py-1 text-bg">Flagship</span>}
          </nav>
          <h1 className="mt-10 max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.92]">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-xl text-soft sm:text-2xl">{project.summary}</p>
        </Reveal>
        {project.nameArabic && (
          <span aria-hidden="true" dir="rtl" lang="ar" className="font-arabic pointer-events-none absolute right-0 top-24 hidden text-[10rem] font-bold leading-none text-accent opacity-15 lg:block">
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
        <ProjectVisual project={project} image={main} fit="stage" priority caption sizes="(min-width: 1200px) 900px, 92vw" />
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
      <section className={`mt-24 grid items-start gap-10 lg:gap-12 ${approachImgs.length ? "lg:grid-cols-12" : ""}`}>
        <Reveal className={approachImgs.length ? "lg:sticky lg:top-28 lg:col-span-4 lg:pt-6" : "max-w-3xl"}>
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
            <Visuals project={project} images={solutionImgs} layout="offset" />
          </div>
        )}
      </section>

      {/* 9. Results */}
      <section className={`relative mt-24 overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-bg sm:px-12 sm:py-20`}>
        <Reveal>
          <h2 className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em]">
            <span className="text-accent-inv">{num()}</span> <span className="opacity-75">Results</span>
          </h2>
        </Reveal>
        <dl className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {project.results.map((r, k) => (
            <Reveal key={r.label} delay={k * 90} className="border-t border-bg/20 pt-6">
              <dd className="font-display text-5xl leading-none text-accent-inv sm:text-6xl">
                <AnimatedNumber value={r.value} />
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
          <Visuals project={project} images={resultImgs} layout="panel" />
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
      <p className="mt-8 text-sm text-mute">{cv.site.caseStudy.conceptNote}</p>

      {/* 12. Next project */}
      <nav aria-label="More projects" className="mt-24 border-t border-line pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href={`/projects/${prev.slug}/`} className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mute hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} aria-hidden="true" />
            <span className="link-u">Previous: {prev.name}</span>
          </Link>
          <Link href="/#work" className="inline-flex h-11 items-center gap-2 rounded-full border border-ink px-5 text-sm font-semibold hover:bg-ink hover:text-bg">
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
            {cv.site.caseStudy.back}
          </Link>
        </div>
        <Link href={`/projects/${next.slug}/`} className="group mt-8 grid items-center gap-8 rounded-[2rem] border border-line p-5 transition hover:border-ink sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mute">
              Next project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </p>
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
