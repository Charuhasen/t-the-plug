"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Cookies", href: "/#cookies" },
  { label: "Cart", href: "/cart" },
  { label: "Order", href: "/cart#order" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[var(--background)] px-5 pb-10 pt-12 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto mb-8 flex w-full max-w-6xl flex-col items-start gap-2 rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-700 shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span>End of the Batch</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 sm:text-xs">
          Thanks for rolling with the plug.
        </span>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[28px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-5 py-8 shadow-[12px_12px_0_0_rgba(var(--shadow-color),0.2)] sm:px-6 sm:py-8 md:flex-row md:items-start md:gap-12 md:px-10 md:py-10">
        <div className="space-y-4 md:w-1/2">
          <div className="inline-flex items-center rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--accent-tertiary)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--border-color)] shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)]">
            T-The-Plug
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-700">
            Neo-brutalist treats baked daily in Accra. We keep it bold, fresh,
            and a little rebellious—just like our signature cookies.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700">
            <span className="rounded-[14px] border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] px-3 py-1 shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)]">
              Baked Daily
            </span>
            <span className="rounded-[14px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-3 py-1 shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.15)]">
              Accra, GH
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:w-1/2 md:flex-row md:items-start md:gap-10">
          <nav className="min-w-[200px] flex-1 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--border-color)]">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm font-semibold text-neutral-700 md:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="inline-flex items-center gap-2 rounded-[16px] border-[3px] border-transparent px-3 py-2 transition hover:border-[var(--border-color)] hover:bg-[var(--muted-surface)] hover:text-[var(--border-color)]"
                    href={link.href}
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-[220px] flex-1 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--border-color)]">
              Reach Out
            </p>
            <div className="space-y-3 text-sm text-neutral-700">
              <div className="flex flex-col gap-2 rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] px-4 py-3 font-semibold shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.2)] md:flex-row md:items-center md:justify-between">
                <span>WhatsApp:</span>
                <span className="inline-flex items-center gap-2 rounded-[14px] border-[2px] border-[var(--border-color)] bg-[var(--surface)] px-3 py-1 text-sm font-black shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.2)]">
                  +233 556637554
                </span>
              </div>
              <a
                className="inline-flex items-center gap-2 rounded-[16px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 font-semibold text-[var(--border-color)] shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)] transition hover:-translate-y-1 hover:bg-[var(--accent-secondary)] hover:text-white hover:shadow-[10px_10px_0_0_rgba(var(--shadow-color),0.25)]"
                href="mailto:hello@t-the-plug.com"
              >
                hello@t-the-plug.com
              </a>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-700">
                <a
                  className="inline-flex items-center justify-center rounded-[14px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)] transition hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-white"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-[14px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-4 py-2 shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)] transition hover:-translate-y-1 hover:bg-[var(--accent-secondary)] hover:text-white"
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-700 shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)]">
        <span>© {currentYear} T-The-Plug.</span>
        <span>Crafted with butter, sugar &amp; bold vibes.</span>
      </div>
    </footer>
  );
}
