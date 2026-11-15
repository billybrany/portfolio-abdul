import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Error 404</p>
      <h1 className="mt-4 font-display text-[clamp(4rem,14vw,10rem)] leading-none">
        Lost<em className="text-accent">?</em>
      </h1>
      <p className="mt-6 max-w-md text-lg text-soft">
        This page doesn&apos;t exist, but plenty of good work does.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-bg transition hover:bg-accent hover:text-accent-ink"
      >
        Take me home
      </Link>
    </div>
  );
}
