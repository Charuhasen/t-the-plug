"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/context/cart-context";
import { cookies, type Cookie } from "@/lib/cookies";

export default function Home() {
  const [selectedCookie, setSelectedCookie] = useState<Cookie | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const { addItem } = useCart();

  const handleOpenCookie = (cookie: Cookie) => {
    setSelectedCookie(cookie);
    setModalQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedCookie(null);
    setModalQuantity(1);
  };

  const handleAddToCart = (cookie: Cookie) => {
    for (let i = 0; i < modalQuantity; i += 1) {
      addItem(cookie.id);
    }
    handleCloseModal();
  };

  const handleIncreaseQuantity = () =>
    setModalQuantity((previous) => previous + 1);

  const handleDecreaseQuantity = () =>
    setModalQuantity((previous) => (previous > 1 ? previous - 1 : 1));
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <main className="space-y-16 pb-16 pt-14 sm:space-y-20 sm:pb-20 sm:pt-16 md:space-y-28 md:pb-28 md:pt-20">
        <section
          id="home"
          className="mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-10"
        >
          <div className="grid items-center gap-10 rounded-[32px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-[12px_12px_0_0_rgba(var(--shadow-color),0.25)] transition sm:p-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 sm:space-y-7"
            >
              <p className="inline-flex items-center gap-2 rounded-full border-[3px] border-[var(--border-color)] bg-[var(--accent-tertiary)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--border-color)]">
                Fresh Batches Daily
              </p>
              <h1 className="text-4xl font-black leading-tight text-[var(--border-color)] sm:text-5xl lg:text-[52px]">
                Fresh-baked happiness delivered like your favourite boutique drop.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
                We craft small-batch cookies with premium ingredients and dispatch
                them the moment they are cool enough to seal. Pick your box, review
                your cart, and confirm over WhatsApp in seconds.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="relative hidden min-h-[260px] items-center justify-center sm:flex sm:min-h-[300px] md:min-h-[340px]"
            >
              <div className="absolute inset-0 -z-10 rounded-[40px] border-[3px] border-dashed border-[var(--border-color)] bg-[var(--accent-tertiary)] opacity-60" />
              <div className="relative grid gap-6 sm:grid-cols-2">
                {cookies.slice(0, 4).map((cookie, index) => (
                  <motion.button
                    key={cookie.id}
                    type="button"
                    onClick={() => handleOpenCookie(cookie)}
                    className="group relative flex flex-col items-center rounded-[28px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-6 text-left shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.2)] transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(var(--shadow-color),0.25)]"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative mb-4 h-28 w-32 overflow-hidden rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.2)]">
                    <Image
                      src={cookie.image}
                      alt={cookie.name}
                      fill
                      sizes="(min-width: 1024px) 180px, 140px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <p className="text-center text-sm font-semibold text-[var(--border-color)]">
                    {cookie.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-700">
                    GHS {cookie.price.toFixed(2)}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
          </div>
        </section>

        <section
          id="cookies"
          className="mx-auto w-full max-w-6xl space-y-8 px-6 sm:space-y-10 md:px-8 lg:px-10"
        >
          <div className="flex flex-col gap-4 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl font-black text-[var(--border-color)] sm:text-4xl"
            >
              Signature Menu
            </motion.h2>
            <p className="text-base text-neutral-700 sm:text-lg">
              Explore the flavours that made us the go-to plug. Tap any cookie to
              view details, ingredients, and add it straight to your cart.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {cookies.map((cookie, index) => (
              <motion.button
                key={cookie.id}
                type="button"
                onClick={() => handleOpenCookie(cookie)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col items-stretch rounded-[28px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-6 text-left shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)] transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(var(--shadow-color),0.25)]"
              >
                <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.2)]">
                  <Image
                    src={cookie.image}
                    alt={cookie.name}
                    fill
                    sizes="(min-width: 1024px) 240px, (min-width: 768px) 220px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--border-color)]">
                      {cookie.name}
                    </h3>
                    <p className="text-sm text-neutral-700">{cookie.size}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {cookie.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="text-sm font-bold text-[var(--border-color)]">
                    GHS {cookie.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-700">
                    View
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedCookie ? (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--border-color)]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative mx-4 max-w-lg rounded-[30px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-8 shadow-[12px_12px_0_0_rgba(var(--shadow-color),0.35)] sm:mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[var(--border-color)] bg-[var(--surface)] text-sm font-semibold text-[var(--border-color)] shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.2)] transition hover:-translate-y-1 hover:bg-[var(--accent-tertiary)]"
                onClick={handleCloseModal}
                aria-label="Close details"
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-5">
                <div className="relative h-40 w-full max-w-[260px] overflow-hidden rounded-3xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)]">
                  <Image
                    src={selectedCookie.image}
                    alt={selectedCookie.name}
                    fill
                    sizes="(min-width: 768px) 260px, 70vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-[var(--border-color)]">
                    {selectedCookie.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-neutral-700">
                    {selectedCookie.size} | {selectedCookie.delightLevel} Delight
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                    {selectedCookie.description}
                  </p>
                </div>
                <div className="w-full space-y-3 text-left">
                  <div className="rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] p-4 shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.15)]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--border-color)]">
                      Ingredients
                    </p>
                    <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-[var(--border-color)]">
                      {selectedCookie.ingredients.map((ingredient) => (
                        <li key={ingredient} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-4 rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)] sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                      <span className="text-sm font-semibold text-[var(--border-color)]">
                        GHS {selectedCookie.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-3 rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] px-3 py-1 shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)]">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-[12px] border-[2px] border-[var(--border-color)] bg-white text-neutral-800 shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.18)] transition hover:bg-[var(--accent-tertiary)]"
                          onClick={handleDecreaseQuantity}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2ch] text-center text-sm font-semibold text-[var(--border-color)]">
                          {modalQuantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-[12px] border-[2px] border-[var(--border-color)] bg-white text-neutral-800 shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.18)] transition hover:bg-[var(--accent-tertiary)]"
                          onClick={handleIncreaseQuantity}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-[16px] border-[3px] border-[var(--border-color)] bg-[var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.2)] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.25)]"
                      onClick={() => handleAddToCart(selectedCookie)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}
