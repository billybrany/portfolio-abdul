import { cv } from "@/data/cv";
import { ArrowUp } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-24 pt-8 sm:pb-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {cv.name}. {cv.site.footer}
        </p>
        <div className="flex items-center gap-6">
          <p className="hidden lg:block">
            Press{" "}
            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-xs">
              ⌘K
            </kbd>{" "}
            for the quick menu
          </p>
          <a href="#main" className="group inline-flex items-center gap-1.5 text-ink">
            <span className="link-u">Back to top</span>
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
