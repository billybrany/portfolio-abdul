import Link from "next/link";
import { cv } from "@/data/cv";
import { withBase } from "@/lib/withBase";
import { withImages } from "@/lib/images";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import WorkShowcase from "@/components/WorkShowcase";
import ExperienceList from "@/components/ExperienceList";
import ShowMore from "@/components/ShowMore";
import CopyEmail from "@/components/CopyEmail";
import HeroArt from "@/components/HeroArt";
import Parallax from "@/components/Parallax";

// Splits a word into letters that rise in one by one.
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

const Arrow = ({ down }) => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={down ? "M12 5v14M6 13l6 6 6-6" : "M5 12h14M13 6l6 6-6 6"} />
  </svg>
);

const Label = ({ children }) => (
  <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute">{children}</p>
);

// Link if the contact details are real, plain text if they are the CV's placeholders.
function ContactLink({ href, children, className = "" }) {
  if (!cv.contactIsLive) return <span className={className}>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`link-u ${className}`}>
      {children}
    </a>
  );
}

export default function Home() {
  const projects = cv.projects.map(withImages);
  const projectNames = Object.fromEntries(cv.projects.map((p) => [p.slug, p.name]));
  const [first, ...rest] = cv.name.split(" ");
  const last = rest.join(" ");
  const resume = cv.cvFile ? withBase(`/${cv.cvFile}`) : null;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="pb-16 pt-10 sm:pt-16 lg:pb-24">
        <Reveal className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-mute">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 normal-case tracking-normal text-ink">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {cv.location}
          </span>
          <span>Portfolio · 16 years of product work</span>
        </Reveal>

        <h1 id="hero-title" aria-label={`${cv.name}, ${cv.credentials}`} className="font-display text-[clamp(3.1rem,9.4vw,8.6rem)] leading-[0.9]">
          <RiseWord word={first} />
          <RiseWord word={last} start={first.length} className="italic text-accent" />
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal delay={250}>
              <ul className="flex flex-wrap gap-2" aria-label="Roles">
                {cv.titles.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-8 max-w-xl text-xl leading-snug text-soft sm:text-2xl">
                <span className="text-ink">{cv.intro}</span> 40+ products across health tech, fintech, education and mobility, used by over 9 million people.
              </p>
            </Reveal>
            <Reveal delay={450} className="mt-10 flex flex-wrap gap-3">
              <Link href="#work" className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-bg transition hover:bg-accent hover:text-accent-ink">
                Explore my work
                <span className="transition-transform group-hover:translate-y-0.5"><Arrow down /></span>
              </Link>
              {resume && (
                <a href={resume} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition hover:border-ink">
                  View résumé
                  <span className="font-mono text-xs text-mute">PDF</span>
                </a>
              )}
            </Reveal>
          </div>
          <div className="mx-auto w-full max-w-[340px] lg:col-span-4 lg:col-start-9 lg:max-w-none">
            <Parallax speed={0.08}>
              <Reveal delay={200}>
                <HeroArt />
              </Reveal>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ── Career statistics ────────────────────────────── */}
      <section aria-label="Career highlights" className="border-y border-line">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {cv.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(i % 4) * 80}
              className={`flex flex-col border-line py-7 sm:py-9 ${i % 2 ? "border-s ps-5 sm:ps-8" : "pe-5"} ${i >= 2 ? "border-t" : ""} lg:border-t-0 ${i % 4 ? "lg:border-s lg:ps-8" : "lg:ps-0"} ${i >= 4 ? "lg:border-t" : ""}`}
            >
              <dt className="order-2 mt-2 text-sm text-soft">
                {s.label}
                {s.note && <span className="block text-xs text-mute">{s.note}</span>}
              </dt>
              <dd className="font-display text-5xl leading-none sm:text-6xl">
                <AnimatedNumber value={`${s.value}${s.suffix || ""}`} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Selected work ────────────────────────────────── */}
      <Section id="work" index="01" title="Selected work." intro="Eight projects, from design systems to national health care. Keep scrolling to move through them, or pick a category. Each one opens a full case study.">
        <WorkShowcase projects={projects} />
      </Section>

      {/* ── About ────────────────────────────────────────── */}
      <Section id="about" index="02" title="Designer, engineer, researcher, leader.">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <blockquote className="font-display text-3xl leading-tight sm:text-4xl">
              “{cv.intro}”
            </blockquote>
            <p className="mt-6 text-soft">{cv.summary}</p>
          </Reveal>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {cv.about.map((a, i) => (
              <Reveal key={a.title} delay={i * 70} className="border-t border-line pt-5">
                <dt className="flex gap-3 font-mono text-xs uppercase tracking-[0.18em] text-mute">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {a.title}
                </dt>
                <dd className="mt-3 leading-relaxed">{a.text}</dd>
              </Reveal>
            ))}
            <Reveal delay={350} className="border-t border-line pt-5">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-mute">Languages</dt>
              <dd className="mt-3 space-y-1">
                {cv.languages.map((l) => (
                  <p key={l.name}>
                    <span className="font-medium">{l.name}</span> <span className="text-soft">· {l.level}</span>
                  </p>
                ))}
              </dd>
            </Reveal>
          </dl>
        </div>
        <Reveal className="mt-14 rounded-3xl border border-line bg-elev p-6 sm:p-8">
          <Label>Outside work</Label>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cv.interests.map((x) => (
              <li key={x} className="flex gap-3 text-soft">
                <span className="text-accent" aria-hidden="true">✦</span>
                {x}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ── Experience ───────────────────────────────────── */}
      <Section id="experience" index="03" title="Sixteen years, twelve roles." intro="From freelance design at university to leading 64 people. Open any role for the details.">
        <ExperienceList roles={cv.experience} projectNames={projectNames} />
      </Section>

      {/* ── Skills ───────────────────────────────────────── */}
      <Section id="skills" index="04" title="What I work with." intro="Ten areas, with the proficiency level and years of experience stated in my CV.">
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {cv.skills.map((s, i) => (
            <Reveal as="li" key={s.group} delay={(i % 2) * 80} className="flex flex-col bg-bg p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl leading-tight sm:text-3xl">{s.group}</h3>
                  <p className="mt-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest ${
                      s.level === "Expert" ? "bg-ink text-bg" : s.level === "Advanced" ? "border border-ink" : "border border-line text-soft"
                    }`}>
                      {s.level}
                    </span>
                  </p>
                </div>
                <p className="text-end">
                  <span className="block font-display text-5xl leading-none text-accent"><AnimatedNumber value={s.years} /></span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-mute">years</span>
                </p>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${s.group} skills`}>
                {s.items.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-soft">{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Education & research ─────────────────────────── */}
      <Section id="research" index="05" title="Education & research." intro="A PhD in Human-Computer Interaction focused on Arabic interfaces, built on a career-long habit of learning.">
        <ol className="grid gap-5 md:grid-cols-3">
          {cv.education.map((e, i) => (
            <Reveal as="li" key={e.degree} delay={(i % 2) * 90} className={`rounded-3xl border border-line p-6 sm:p-8 ${i === 0 ? "bg-ink text-bg md:col-span-3" : "bg-elev"}`}>
              <p className={`font-mono text-xs uppercase tracking-[0.16em] ${i === 0 ? "opacity-70" : "text-mute"}`}>{e.period}</p>
              <h3 className={`mt-3 font-display leading-tight ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{e.degree}</h3>
              <p className={`mt-2 ${i === 0 ? "text-accent-inv" : "text-accent"}`}>
                {e.school} <span className={i === 0 ? "opacity-70" : "text-mute"}>· {e.location}</span>
              </p>
              <ul className={`mt-4 space-y-1 ${i === 0 ? "opacity-85" : "text-soft"}`}>
                {e.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="font-display text-3xl">Patents</h3>
            <ul className="mt-6 space-y-4">
              {cv.patents.map((p) => (
                <li key={p.title} className="rounded-2xl border border-line bg-elev p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.status}</p>
                  <p className="mt-2 font-medium">{p.title}</p>
                  <p className="mt-1 text-sm text-mute">{p.number}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7">
            <h3 className="font-display text-3xl">Publications</h3>
            <p className="mt-2 text-sm text-mute">{cv.publicationsNote}</p>
            <ol className="mt-6 border-t border-line">
              {cv.publications.map((p) => (
                <li key={p.title} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-sm text-accent">{p.year}</span>
                  <span>
                    <span className="font-medium">{p.title}</span>
                    <span className="block text-sm text-soft">{p.authors} {p.venue}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-3xl">Certifications</h3>
            <p className="text-sm text-mute">19 earned, 1 in progress. Issuers and credential IDs are fictional.</p>
          </div>
          <ShowMore initial={6} label="certifications" className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {cv.certifications.map((c) => (
              <li key={c.name} className="flex flex-col bg-bg p-5">
                <p className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-mute">{c.year || "—"}</span>
                  <span className={c.status === "Active" || c.status === "Lifetime" ? "text-ink" : c.status === "In progress" ? "text-accent" : "text-mute"}>
                    {c.status}
                  </span>
                </p>
                <p className="mt-2 font-medium leading-snug">{c.name}</p>
                <p className="mt-1 text-sm text-soft">{c.issuer}</p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-mute">{c.id ? `ID ${c.id}` : c.note}</p>
              </li>
            ))}
          </ShowMore>
        </Reveal>
      </Section>

      {/* ── Recognition ──────────────────────────────────── */}
      <Section id="recognition" index="06" title="Recognition." intro="Awards, talks, media, teaching and the communities I give time to.">
        <h3 className="sr-only">Awards</h3>
        <ol className="border-t border-line">
          {cv.awards.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 5) * 50} className="group grid gap-1 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <span className="font-mono text-sm text-accent sm:col-span-1">{a.year}</span>
              <span className="font-display text-xl leading-snug transition-colors group-hover:text-accent sm:col-span-5 sm:text-2xl">{a.title}</span>
              <span className="text-soft sm:col-span-3">{a.issuer}</span>
              <span className="text-sm text-mute sm:col-span-3">{a.for}</span>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-3xl">Speaking</h3>
              <p className="text-sm text-mute">{cv.talksNote}</p>
            </div>
            <ul className="mt-6 space-y-5">
              {cv.talks.map((t) => (
                <li key={t.title} className="grid grid-cols-[3.5rem_1fr] gap-3">
                  <span className="font-mono text-sm text-mute">{t.year}</span>
                  <span>
                    <span className="font-medium">“{t.title}”</span>
                    <span className="block text-sm text-soft">{t.type} · {t.event} · {t.city}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="font-display text-3xl">Media</h3>
            <ul className="mt-6 grid gap-3">
              {cv.media.map((m) => (
                <li key={m.title} className="rounded-2xl border border-line bg-elev p-5">
                  <p className="flex justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-mute">
                    <span className="text-accent">{m.type}</span>
                    <span>{m.date}</span>
                  </p>
                  <p className="mt-2 font-display text-xl">{m.type === "YouTube channel" ? m.title : `“${m.title}”`}</p>
                  <p className="mt-1 text-sm text-soft">{m.outlet}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="font-display text-3xl">Teaching, leadership & volunteering</h3>
          <p className="mt-2 text-sm text-mute">Held alongside the full-time roles above.</p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {cv.community.map((c) => (
              <li key={c.role} className="bg-bg p-6">
                <p className="flex justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-accent">{c.kind}</span>
                  <span className="text-mute">{c.period}</span>
                </p>
                <p className="mt-3 font-medium">{c.role}</p>
                <p className="text-sm text-soft">{c.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-soft">{c.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 py-20 sm:py-28">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-bg sm:px-14 sm:py-24">
          <span aria-hidden="true" className="absolute -end-28 -top-28 size-56 rounded-full bg-accent" />
          <p className="relative font-mono text-xs uppercase tracking-[0.2em] opacity-70">07 / contact</p>
          <h2 id="contact-title" className="relative mt-6 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            Let&apos;s build something <em className="text-accent-inv">together.</em>
          </h2>
          <p className="relative mt-6 max-w-lg text-lg opacity-80">
            Based in {cv.location}. The fastest way to reach me is email.
          </p>

          <div className="relative mt-10 flex flex-wrap items-center gap-3 [&_button]:border-bg/30 [&_button]:text-bg [&_button:hover]:border-bg">
            {cv.contactIsLive ? (
              <a href={`mailto:${cv.contact.email}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink transition hover:brightness-110">
                {cv.contact.email} <Arrow />
              </a>
            ) : (
              <span className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-accent-ink">{cv.contact.email}</span>
            )}
            <CopyEmail email={cv.contact.email} />
            {resume && (
              <a href={resume} target="_blank" rel="noopener" className="inline-flex h-12 items-center rounded-full border border-bg/30 px-5 text-sm font-medium transition hover:border-bg">
                View résumé (PDF)
              </a>
            )}
          </div>

          <dl className="relative mt-12 grid gap-6 border-t border-bg/20 pt-8 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-12">
            <dt className="font-mono text-xs uppercase tracking-widest opacity-60">Phone</dt>
            <dd>{cv.contact.phone}</dd>
            <dt className="font-mono text-xs uppercase tracking-widest opacity-60">Online</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {cv.contact.links.map((l) => (
                  <li key={l.label}>
                    <span className="opacity-60">{l.label}: </span>
                    <ContactLink href={l.url}>{l.url.replace("https://", "")}</ContactLink>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          {!cv.contactIsLive && (
            <p className="relative mt-8 text-xs opacity-60">
              These are the fictional contact details from the Portfolio Summit CV, shown as text rather than links.
            </p>
          )}
        </Reveal>
      </section>
    </>
  );
}
