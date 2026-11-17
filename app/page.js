import { Fragment } from "react";
import Link from "next/link";
import { cv } from "@/data/cv";
import { withBase } from "@/lib/withBase";
import { withImages } from "@/lib/images";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import WorkGallery from "@/components/WorkGallery";
import ExperienceList from "@/components/ExperienceList";
import ShowMore from "@/components/ShowMore";
import CopyEmail from "@/components/CopyEmail";
import { ArrowDown, ArrowUpRight, FileText, Mail, Phone } from "@/components/Icons";
import { BrandIcon } from "@/components/BrandIcon";
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


const Label = ({ children }) => (
  <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute">{children}</p>
);

// A contact platform tile. A real link (with ↗ and "opens in a new tab") when
// the contact details are live; a no-op demo button while they're placeholders.
function ContactLink({ href, label, children }) {
  const base = "flex w-full items-center gap-3 rounded-xl border border-bg/15 px-3.5 py-2.5 text-start";
  // Placeholder details: looks and feels like a link (pointer, ↗, hover,
  // press, focus) but goes nowhere, since the CV's addresses are fictional.
  if (!cv.contactIsLive)
    return (
      <button
        type="button"
        aria-label={`${label}: demo link (fictional CV, not a real profile)`}
        className={`${base} cursor-pointer hover:border-bg/60 hover:bg-bg/10 active:bg-bg/20`}
      >
        {children}
        <ArrowUpRight className="ms-auto size-4 shrink-0 opacity-60" strokeWidth={2} aria-hidden="true" />
      </button>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className={`${base} hover:border-bg/60 hover:bg-bg/10`}>
      {children}
      <ArrowUpRight className="ms-auto size-4 shrink-0 opacity-60" strokeWidth={2} aria-hidden="true" />
    </a>
  );
}

const site = cv.site;
const S = site.sections;

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
          <span>{site.heroKicker}</span>
        </Reveal>

        <h1 id="hero-title" aria-label={`${site.heroGreeting} ${cv.name}, ${cv.credentials}`} className="font-display text-[clamp(3.1rem,9.4vw,8.6rem)] leading-[0.9]">
          {/* Greeting: smaller and lighter, so the name keeps its weight */}
          <span className="mb-3 flex items-center gap-3 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none text-soft sm:mb-4" aria-hidden="true">
            <span className="greet-line h-[2px] w-8 shrink-0 bg-accent sm:w-12" />
            <RiseWord word={site.heroGreeting} className="italic" />
          </span>
          <RiseWord word={first} start={site.heroGreeting.length} />
          <RiseWord word={last} start={site.heroGreeting.length + first.length} className="italic text-accent" />
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
                {site.heroLine}
              </p>
            </Reveal>
            <Reveal delay={450} className="mt-10 flex flex-wrap gap-3">
              <Link href="#work" className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-bg transition hover:bg-accent hover:text-accent-ink">
                {site.heroCtaWork}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2} aria-hidden="true" />
              </Link>
              {resume && (
                <a href={resume} target="_blank" rel="noopener" className="group inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 font-medium transition hover:border-ink hover:bg-elev">
                  <FileText className="size-4 text-soft transition-colors group-hover:text-ink" strokeWidth={1.8} aria-hidden="true" />
                  {site.heroCtaResume}
                  <span className="font-mono text-xs text-mute">PDF</span>
                  <ArrowUpRight className="size-3.5 text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
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
              <dt className="order-2 mt-3 text-lg font-medium leading-snug text-ink sm:text-xl">
                {s.label}
                {s.note && <span className="mt-0.5 block text-sm font-normal text-soft sm:text-base">{s.note}</span>}
              </dt>
              <dd className="font-display text-5xl leading-none sm:text-6xl">
                <AnimatedNumber value={`${s.value}${s.suffix || ""}`} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Selected work ────────────────────────────────── */}
      <Section id="work" {...S.work}>
        <WorkGallery projects={projects} hint={S.work.hint} />
      </Section>

      {/* ── About ────────────────────────────────────────── */}
      <Section id="about" {...S.about}>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <blockquote className="font-display text-3xl leading-tight sm:text-4xl">
              “{cv.intro}”
            </blockquote>
            <p className="mt-6 text-soft">{site.aboutCurrently}</p>
          </Reveal>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {cv.about.map((a, i) => (
              <Reveal key={a.title} delay={i * 70} className="border-t border-line pt-5">
                <dt className="flex items-baseline gap-2.5 text-lg font-semibold leading-snug text-ink">
                  <span className="font-mono text-xs font-medium text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {a.title}
                </dt>
                <dd className="mt-3 leading-relaxed">{a.text}</dd>
              </Reveal>
            ))}
            <Reveal delay={350} className="border-t border-line pt-5">
              <dt className="text-lg font-semibold leading-snug text-ink">{S.about.languages}</dt>
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
          <p className="text-lg font-semibold text-ink">{S.about.interests}</p>
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
      <Section id="experience" {...S.experience}>
        <ExperienceList roles={cv.experience} projectNames={projectNames} />
      </Section>

      {/* ── Skills ───────────────────────────────────────── */}
      <Section id="skills" {...S.skills}>
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
      <Section id="research" {...S.research} motion="x">
        {/* Education: PhD first (scales up), a line draws down and branches to the earlier degrees, which slide in from alternating sides. */}
        <ol className="grid gap-5 md:grid-cols-3 md:gap-x-5 md:gap-y-0">
          {cv.education.map((e, i) => (
            <Fragment key={e.degree}>
              <Reveal
                as="li"
                variant={i === 0 ? "scale" : i % 2 ? "left" : "right"}
                delay={i === 0 ? 0 : 250 + i * 120}
                className={`rounded-3xl border border-line p-6 sm:p-8 ${i === 0 ? "bg-ink text-bg md:col-span-3" : "bg-elev"}`}
              >
                <p className={`font-mono text-xs uppercase tracking-[0.16em] ${i === 0 ? "opacity-70" : "text-mute"}`}>{e.period}</p>
                <h3 className={`mt-3 font-display leading-tight ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{e.degree}</h3>
                <p className={`mt-2 ${i === 0 ? "text-accent-inv" : "text-accent"}`}>
                  {e.school} <span className={i === 0 ? "opacity-70" : "text-mute"}>· {e.location}</span>
                </p>
                <ul className={`mt-4 space-y-1 ${i === 0 ? "opacity-85" : "text-soft"}`}>
                  {e.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </Reveal>
              {i === 0 && (
                <Reveal as="li" role="presentation" aria-hidden="true" variant="draw" className="relative hidden h-12 md:col-span-3 md:block">
                  <span className="draw-y absolute left-1/2 top-0 h-1/2 w-px bg-accent" />
                  <span className="draw-x absolute left-[16.66%] right-[16.66%] top-1/2 h-px bg-accent" style={{ "--d": "250ms" }} />
                  {[16.66, 50, 83.33].map((x, k) => (
                    <span key={x} className="draw-y absolute top-1/2 h-1/2 w-px bg-accent" style={{ left: `${x}%`, "--d": `${450 + k * 120}ms` }} />
                  ))}
                </Reveal>
              )}
            </Fragment>
          ))}
        </ol>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="underline">
              <h3 className="inline-block font-display text-3xl">
                {S.research.patents}
                <span aria-hidden="true" className="draw-x mt-1 block h-[3px] bg-accent" />
              </h3>
            </Reveal>
            <ul className="mt-6 space-y-4">
              {cv.patents.map((p, i) => (
                <Reveal as="li" key={p.title} variant="rise" delay={150 + i * 160} className="relative overflow-hidden rounded-2xl border border-line bg-elev p-5 ps-6">
                  <span aria-hidden="true" className="draw-y absolute inset-y-0 left-0 w-1 bg-accent" style={{ "--d": `${400 + i * 160}ms` }} />
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.status}</p>
                  <p className="mt-2 font-medium">{p.title}</p>
                  <p className="mt-1 text-sm text-mute">{p.number}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Reveal variant="underline">
              <h3 className="inline-block font-display text-3xl">
                {S.research.publications}
                <span aria-hidden="true" className="draw-x mt-1 block h-[3px] bg-accent" />
              </h3>
              <p className="mt-2 text-sm text-mute">{cv.publicationsNote}</p>
            </Reveal>
            <ol className="mt-6 border-t border-line">
              {cv.publications.map((p, i) => (
                <Reveal as="li" key={p.title} variant="right" delay={i * 90} className="group grid gap-1 border-b border-line py-4 transition-colors hover:bg-elev sm:grid-cols-[4rem_1fr] sm:px-2">
                  <span className="font-mono text-sm text-accent">{p.year}</span>
                  <span>
                    <span className="font-medium">{p.title}</span>
                    <span className="block text-sm text-soft">{p.authors} {p.venue}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-20">
          <Reveal variant="underline" className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="inline-block font-display text-3xl">
              {S.research.certifications}
              <span aria-hidden="true" className="draw-x mt-1 block h-[3px] bg-accent" />
            </h3>
            <p className="text-sm text-mute">{S.research.certificationsNote}</p>
          </Reveal>
          {/* Certifications cascade in a diagonal wave */}
          <ShowMore initial={6} label="certifications" className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {cv.certifications.map((c, i) => (
              <Reveal as="li" key={c.name} variant="cascade" delay={((i % 3) + Math.floor((i % 6) / 3)) * 90} className="flex flex-col bg-bg p-5">
                <p className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-mute">{c.year || "—"}</span>
                  <span className={c.status === "Active" || c.status === "Lifetime" ? "text-ink" : c.status === "In progress" ? "text-accent" : "text-mute"}>
                    {c.status}
                  </span>
                </p>
                <p className="mt-2 font-medium leading-snug">{c.name}</p>
                <p className="mt-1 text-sm text-soft">{c.issuer}</p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-mute">{c.id ? `ID ${c.id}` : c.note}</p>
              </Reveal>
            ))}
          </ShowMore>
        </div>
      </Section>

      {/* ── Recognition ──────────────────────────────────── */}
      {/* Its own motion identity: wipes, pops, flips and tilts (no slides or plain fades). */}
      <Section id="recognition" {...S.recognition} motion="pop">
        <h3 className="sr-only">Awards</h3>
        <ol className="border-t border-line">
          {cv.awards.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              variant={a.major ? "pop" : "wipe"}
              delay={i * 70}
              className={`award group relative grid gap-1 border-b border-line py-5 ps-4 sm:grid-cols-12 sm:items-baseline sm:gap-6 ${a.major ? "bg-elev" : ""}`}
            >
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 origin-bottom bg-accent transition-transform duration-500 ${a.major ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} />
              <span className="font-mono text-sm text-accent sm:col-span-1">{a.year}</span>
              <span className="font-display text-xl leading-snug transition-[color,transform] duration-300 group-hover:translate-x-1.5 group-hover:text-accent sm:col-span-5 sm:text-2xl">
                {a.major && <span className="me-2 text-accent" aria-hidden="true">✦</span>}
                {a.title}
              </span>
              <span className="text-soft sm:col-span-3">{a.issuer}</span>
              <span className="text-sm text-mute sm:col-span-3">{a.for}</span>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <div>
            <Reveal variant="pop" className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-3xl">{S.recognition.speaking}</h3>
              <p className="text-sm text-mute">{cv.talksNote}</p>
            </Reveal>
            {/* Talks flip down like a departure board */}
            <ul className="mt-6 space-y-5">
              {cv.talks.map((t, i) => (
                <Reveal as="li" key={t.title} variant="flip" delay={i * 80} className="grid grid-cols-[3.5rem_1fr] gap-3">
                  <span className="font-mono text-sm text-mute">{t.year}</span>
                  <span>
                    <span className="font-medium">“{t.title}”</span>
                    <span className="block text-sm text-soft">{t.type} · {t.event} · {t.city}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal variant="pop">
              <h3 className="font-display text-3xl">{S.recognition.media}</h3>
            </Reveal>
            {/* Media cards tilt into place from alternating angles */}
            <ul className="mt-6 grid gap-3">
              {cv.media.map((m, i) => (
                <Reveal
                  as="li"
                  key={m.title}
                  variant={i % 2 ? "tilt-r" : "tilt-l"}
                  delay={120 + i * 110}
                  className="rounded-2xl border border-line bg-elev p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] hover:border-ink hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
                >
                  <p className="flex justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-mute">
                    <span className="text-accent">{m.type}</span>
                    <span>{m.date}</span>
                  </p>
                  <p className="mt-2 font-display text-xl">{m.type === "YouTube channel" ? m.title : `“${m.title}”`}</p>
                  <p className="mt-1 text-sm text-soft">{m.outlet}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <Reveal variant="pop">
            <h3 className="font-display text-3xl">{S.recognition.community}</h3>
            <p className="mt-2 text-sm text-mute">{S.recognition.communityNote}</p>
          </Reveal>
          {/* Community roles spring in, one after another */}
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {cv.community.map((c, i) => (
              <Reveal as="li" key={c.role} variant="spring" delay={i * 90} className="bg-bg p-6 transition-colors duration-300 hover:bg-elev">
                <p className="flex justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-accent">{c.kind}</span>
                  <span className="text-mute">{c.period}</span>
                </p>
                <p className="mt-3 font-medium">{c.role}</p>
                <p className="text-sm text-soft">{c.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-soft">{c.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" aria-labelledby="contact-title" className="static-section scroll-mt-24 py-20 sm:py-28">
        {/* Contact is intentionally static: no entrance, hover or scroll animation. */}
        <div className="static-zone relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-bg sm:px-14 sm:py-24">
          <span aria-hidden="true" className="absolute -end-28 -top-28 size-56 rounded-full bg-accent" />
          <p className="relative flex items-center gap-3.5">
            <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-accent-inv sm:h-9" />
            <span className="text-xl font-semibold uppercase tracking-[0.12em] sm:text-2xl">{S.contact.label}</span>
          </p>
          <h2 id="contact-title" className="relative mt-6 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            {S.contact.title} <em className="text-accent-inv">{S.contact.titleEmphasis}</em>
          </h2>
          <p className="relative mt-6 max-w-lg text-lg opacity-80">
            {S.contact.text}
          </p>

          <div className="relative mt-10 flex flex-wrap items-center gap-3 [&_button]:border-bg/30 [&_button]:text-bg [&_button:hover]:border-bg">
            {cv.contactIsLive ? (
              <a href={`mailto:${cv.contact.email}`} className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 font-medium text-accent-ink hover:brightness-110">
                <Mail className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
                {cv.contact.email}
              </a>
            ) : (
              <span className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 font-medium text-accent-ink">
                <Mail className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
                {cv.contact.email}
              </span>
            )}
            <CopyEmail email={cv.contact.email} />
            {resume && (
              <a href={resume} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full border border-bg/30 px-5 text-sm font-medium hover:border-bg hover:bg-bg/10">
                <FileText className="size-4" strokeWidth={1.8} aria-hidden="true" />
                {site.heroCtaResume} (PDF)
                <ArrowUpRight className="size-3.5 opacity-70" strokeWidth={2} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          <dl className="relative mt-12 grid gap-6 border-t border-bg/20 pt-8 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-12">
            <dt className="font-mono text-xs uppercase tracking-widest opacity-60 sm:pt-0.5">Phone</dt>
            <dd className="flex items-center gap-2.5">
              <Phone className="size-4 opacity-80" strokeWidth={1.8} aria-hidden="true" />
              {cv.contactIsLive ? (
                <a href={`tel:${cv.contact.phone.replace(/\s/g, "")}`} className="link-u">{cv.contact.phone}</a>
              ) : (
                cv.contact.phone
              )}
            </dd>
            <dt className="font-mono text-xs uppercase tracking-widest opacity-60 sm:pt-3">Online</dt>
            <dd>
              <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {cv.contact.links.map((l) => (
                  <li key={l.label}>
                    <ContactLink href={l.url} label={l.label}>
                      <BrandIcon name={l.label} className="size-[18px] shrink-0" />
                      <span className="min-w-0">
                        <span className="block font-medium">{l.label}</span>
                        <span className="block truncate text-xs opacity-60">{l.url.replace("https://", "")}</span>
                      </span>
                    </ContactLink>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          {!cv.contactIsLive && (
            <p className="relative mt-8 text-xs opacity-60">
              {S.contact.fictionalNote}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
