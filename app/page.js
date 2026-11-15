import Image from "next/image";
import Link from "next/link";
import { cv } from "@/data/cv";
import { withBase } from "@/lib/withBase";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import CopyEmail from "@/components/CopyEmail";
// TODO: replace assets/avatar.svg with your own photo (e.g. assets/me.jpg).
// Importing the image (instead of using a "/public" path) keeps it working on GitHub Pages.
import avatar from "@/assets/avatar.svg";

// Splits a word into letters that animate in one by one.
function RiseWord({ word, start = 0, className = "" }) {
  return (
    <span className={`rise block ${className}`} aria-hidden="true">
      {[...word].map((ch, i) => (
        <span key={i} style={{ "--i": start + i }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const [first, ...rest] = cv.name.split(" ");
  const last = rest.join(" ");
  const allSkills = cv.skills.flatMap((s) => s.items);

  const stats = [
    { value: cv.projects.length, label: "Projects built" },
    { value: cv.experience.length, label: "Roles held" },
    { value: allSkills.length, label: "Skills & tools" },
    { value: cv.achievements.length, label: "Awards & certificates" },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative grid gap-12 pb-16 pt-12 sm:pt-20 lg:grid-cols-12 lg:items-end lg:pb-24">
        <div className="lg:col-span-8">
          <Reveal className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-mute">
            {cv.status && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 normal-case tracking-normal text-ink">
                <span className="pulse relative size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {cv.status}
              </span>
            )}
            <span>{cv.location}</span>
          </Reveal>

          <h1
            aria-label={cv.name}
            className="font-display text-[clamp(3.5rem,13vw,10rem)] leading-[0.88]"
          >
            <RiseWord word={first} />
            {last && (
              <RiseWord
                word={last}
                start={first.length}
                className="italic text-accent sm:ps-[0.6em]"
              />
            )}
          </h1>

          <Reveal delay={300} className="mt-8 max-w-xl">
            <p className="text-xl leading-snug sm:text-2xl">
              <span className="font-medium">{cv.title}</span>
              <span className="text-soft">, {cv.summary.split(". ")[0]}.</span>
            </p>
          </Reveal>

          <Reveal delay={420} className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-bg transition hover:bg-accent hover:text-accent-ink"
            >
              See my work
              <span className="transition-transform group-hover:translate-x-1">
                <Arrow />
              </span>
            </Link>
            {cv.cvFile && (
              <a
                href={withBase(`/${cv.cvFile}`)}
                download
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition hover:border-ink"
              >
                Download CV
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
                </svg>
              </a>
            )}
            <Link
              href="#contact"
              className="inline-flex h-12 items-center rounded-full px-4 font-medium text-soft transition hover:text-ink"
            >
              Get in touch
            </Link>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-56 sm:w-64 lg:col-span-4 lg:mx-0 lg:ms-auto lg:w-full lg:max-w-[300px]">
          <div className="relative rotate-3 overflow-hidden rounded-[2rem] border border-line bg-elev p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:rotate-0">
            <Image
              src={avatar}
              alt={`Portrait of ${cv.name}`}
              width={400}
              height={480}
              className="aspect-[5/6] w-full rounded-[1.5rem] bg-line object-cover"
              priority
            />
          </div>
          {/* Rotating badge */}
          <div className="absolute -bottom-6 -left-6 grid size-24 place-items-center rounded-full bg-accent text-accent-ink" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.2em]">
                <textPath href="#circle">Portfolio · {new Date().getFullYear()} · Portfolio · </textPath>
              </text>
            </svg>
            <span className="font-display text-2xl italic">✦</span>
          </div>
        </Reveal>
      </section>

      {/* Stats strip */}
      <Reveal as="dl" className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col py-6 sm:px-6 sm:py-8 ${i % 2 ? "ps-5 border-s border-line" : ""} ${i > 0 ? "sm:border-s sm:border-line" : ""} ${i > 1 ? "border-t border-line sm:border-t-0" : ""} ${i === 0 ? "sm:ps-0" : ""}`}
          >
            <dt className="order-2 mt-1 text-sm text-mute">{s.label}</dt>
            <dd className="font-display text-5xl sm:text-6xl">
              {String(s.value).padStart(2, "0")}
            </dd>
          </div>
        ))}
      </Reveal>

      {/* Skills ticker */}
      <div className="marquee-wrap relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-6" aria-hidden="true">
        <div className="marquee gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {allSkills.map((skill) => (
                <span key={skill + copy} className="flex items-center font-display text-3xl italic text-mute sm:text-4xl">
                  <span className="px-6">{skill}</span>
                  <span className="text-accent not-italic">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── About ────────────────────────────────────────── */}
      <Section id="about" index="01" title="A little about me.">
        <div className="grid gap-12 sm:grid-cols-12">
          <Reveal className="sm:col-span-7 sm:col-start-4">
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              {cv.summary}
            </p>
          </Reveal>
          <Reveal delay={150} as="dl" className="space-y-5 text-sm sm:col-span-2 sm:col-start-11">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-mute">Based in</dt>
              <dd className="mt-1">{cv.location}</dd>
            </div>
            {cv.education[0] && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-mute">Studying</dt>
                <dd className="mt-1">{cv.education[0].school}</dd>
              </div>
            )}
            {cv.languages?.length > 0 && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-mute">Speaks</dt>
                {cv.languages.map((l) => (
                  <dd key={l} className="mt-1">{l}</dd>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* ── Experience (timeline) ────────────────────────── */}
      <Section id="experience" index="02" title="Where I've worked." intro="Roles where I learned to ship, collaborate and own outcomes.">
        <ol className="relative sm:ms-[25%]">
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          {cv.experience.map((job, i) => (
            <Reveal as="li" key={job.role + job.company} delay={i * 100} className="relative pb-14 ps-10 last:pb-0">
              <span aria-hidden="true" className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-accent bg-bg" />
              <p className="font-mono text-xs uppercase tracking-widest text-mute">{job.period}</p>
              <h3 className="mt-2 font-display text-3xl leading-tight">{job.role}</h3>
              <p className="mt-1 text-lg text-accent">{job.company}</p>
              <ul className="mt-5 space-y-3 text-soft">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-mute" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Education ────────────────────────────────────── */}
      <Section id="education" index="03" title="Education.">
        <ul className="grid gap-5 sm:ms-[25%]">
          {cv.education.map((e, i) => (
            <Reveal as="li" key={e.degree} delay={i * 100} className="rounded-3xl border border-line bg-elev p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl sm:text-3xl">{e.degree}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-mute">{e.period}</p>
              </div>
              <p className="mt-1 text-accent">{e.school}</p>
              {e.details && <p className="mt-4 text-soft">{e.details}</p>}
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Projects ─────────────────────────────────────── */}
      <Section id="projects" index="04" title="Selected work." intro="Each project has its own case study: the problem, what I built and what I learned.">
        <ProjectsGrid projects={cv.projects} />
      </Section>

      {/* ── Skills ───────────────────────────────────────── */}
      <Section id="skills" index="05" title="What I work with.">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {cv.skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 80}>
              <h3 className="flex items-baseline gap-3 border-b border-line pb-3 font-mono text-xs uppercase tracking-widest text-mute">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                {s.group}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-elev px-3.5 py-1.5 text-sm transition hover:border-accent hover:text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Achievements ─────────────────────────────────── */}
      <Section id="achievements" index="06" title="Recognition.">
        <ul className="border-t border-line">
          {cv.achievements.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 80} className="group grid gap-2 border-b border-line py-7 sm:grid-cols-12 sm:items-baseline">
              <span className="font-mono text-xs text-mute sm:col-span-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl transition-colors group-hover:text-accent sm:col-span-5 sm:text-3xl">
                {a.title}
              </h3>
              <p className="text-soft sm:col-span-4">{a.detail}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-20 sm:py-28">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-bg sm:px-14 sm:py-24">
          <span aria-hidden="true" className="absolute -right-28 -top-28 size-56 rounded-full bg-accent opacity-90" />
          <p className="relative font-mono text-xs uppercase tracking-[0.2em] opacity-70">
            07 / contact
          </p>
          <h2 id="contact-title" className="relative mt-6 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            Let&apos;s build something <em className="text-accent">together.</em>
          </h2>
          <p className="relative mt-6 max-w-lg text-lg opacity-80">
            I reply within a day. The fastest way to reach me is email.
          </p>

          <div className="relative mt-10 flex flex-wrap gap-3 [&_button]:border-bg/30 [&_button]:text-bg [&_button:hover]:border-bg">
            <a
              href={`mailto:${cv.contact.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink transition hover:brightness-110"
            >
              {cv.contact.email}
              <Arrow />
            </a>
            <CopyEmail email={cv.contact.email} />
          </div>

          <ul className="relative mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-bg/20 pt-8 text-sm">
            {cv.contact.github && (
              <li>
                <a href={cv.contact.github} target="_blank" rel="noopener noreferrer" className="link-u">
                  GitHub ↗
                </a>
              </li>
            )}
            {cv.contact.linkedin && (
              <li>
                <a href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                  LinkedIn ↗
                </a>
              </li>
            )}
            {cv.contact.phone && (
              <li>
                <a href={`tel:${cv.contact.phone.replace(/\s/g, "")}`} className="link-u">
                  {cv.contact.phone}
                </a>
              </li>
            )}
            <li className="opacity-70">{cv.location}</li>
          </ul>
        </Reveal>
      </section>
    </>
  );
}
