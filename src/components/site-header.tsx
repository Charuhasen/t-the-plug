"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart-context";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Cookies", href: "/#cookies" },
  { label: "Cart", href: "/cart" },
  { label: "Order", href: "/cart#order" },
];

export function SiteHeader() {
  const { totalItems } = useCart();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[var(--border-color)] bg-[var(--background)]/92 backdrop-blur transition-colors supports-[backdrop-filter]:backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6 md:px-8 lg:px-10">
        <Link className="group flex items-center gap-4" href="/">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-[16px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.2)] transition-transform group-hover:-translate-y-1 sm:h-12 sm:w-12">
            <span className="pointer-events-none absolute -bottom-2 inset-x-3 h-2 rounded-full border-[3px] border-[var(--border-color)] bg-[var(--accent-tertiary)] shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.18)] group-hover:bg-[var(--accent)]" />
            <Image
              src="/cookies/choco-chunk.svg"
              alt="T-The-Plug logo"
              width={28}
              height={28}
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--border-color)] sm:text-base">
              T-The-Plug
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-700">
              Cookie Studio
            </p>
          </div>
        </Link>
        <div className="hidden items-center gap-2 rounded-[22px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="inline-flex items-center gap-2 rounded-[16px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-700 transition-transform hover:-translate-y-1 hover:bg-[var(--accent-tertiary)] hover:text-[var(--border-color)]"
              href={link.href}
            >
              <span className="h-2.5 w-2.5 rounded-full border-[2px] border-[var(--border-color)] bg-[var(--surface)]" />
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="hidden rounded-[16px] border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--border-color)] shadow-[5px_5px_0_0_rgba(var(--shadow-color),0.18)] transition-transform hover:-translate-y-1 hover:bg-[var(--surface)] md:inline-flex"
            href="/#cookies"
          >
            Menu
          </Link>
          <Link
            className="flex items-center gap-3 rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[7px_7px_0_0_rgba(var(--shadow-color),0.25)] transition-transform hover:-translate-y-1"
            href="/cart"
          >
            View Cart
            {totalItems > 0 ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-[var(--border-color)] bg-white text-xs font-bold text-[var(--border-color)] shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.18)]">
                {totalItems}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] text-[var(--border-color)] shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.22)] transition-transform hover:-translate-y-1 md:hidden"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            aria-expanded={isMobileNavOpen}
            aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
          >
            <span className="sr-only">{isMobileNavOpen ? "Close navigation" : "Open navigation"}</span>
            <span className="relative flex h-4 w-5 items-center justify-center">
              <span
                className={`absolute h-0.5 w-full rounded-full bg-[var(--border-color)] transition-transform duration-200 ease-out ${
                  isMobileNavOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0"
                }`}
              />
              <span
                className={`absolute h-0.5 w-full rounded-full bg-[var(--border-color)] transition-opacity duration-200 ease-out ${
                  isMobileNavOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-full rounded-full bg-[var(--border-color)] transition-transform duration-200 ease-out ${
                  isMobileNavOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileNavOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden"
          >
            <div className="mx-auto mb-6 mt-2 w-[calc(100%-2.5rem)] max-w-lg rounded-[22px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-5 shadow-[10px_10px_0_0_rgba(var(--shadow-color),0.22)] sm:w-[calc(100%-3rem)]">
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-[16px] border-[3px] border-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700 transition hover:border-[var(--border-color)] hover:bg-[var(--muted-surface)] hover:text-[var(--border-color)]"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {link.label}
                    <span className="h-2 w-8 rounded-full border-[2px] border-[var(--border-color)] bg-[var(--accent-tertiary)]" />
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
