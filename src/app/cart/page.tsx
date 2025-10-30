"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/context/cart-context";
import type { CartItem } from "@/context/cart-context";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY_NUMBER } from "@/lib/constants";
import { cookieMap, type Cookie } from "@/lib/cookies";

type CartItemDetail = Cookie & {
  quantity: number;
  lineTotal: number;
};

function buildCartDetails(items: CartItem[]): CartItemDetail[] {
  return items
    .map((item) => {
      const cookie = cookieMap.get(item.cookieId);
      if (!cookie) {
        return null;
      }

      return {
        ...cookie,
        quantity: item.quantity,
        lineTotal: cookie.price * item.quantity,
      };
    })
    .filter(Boolean) as CartItemDetail[];
}

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const cartWithDetails = useMemo(
    () => buildCartDetails(items),
    [items],
  );

  const cartTotal = useMemo(
    () => cartWithDetails.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartWithDetails],
  );

  const handlePlaceOrder = () => {
    if (!cartWithDetails.length) {
      return;
    }

    const orderId = `TTP-${Math.floor(Math.random() * 90000 + 10000)}`;
    const messageLines = [
      "Hi T-The-Plug! I'd like to place an order.",
      `Order ID: ${orderId}`,
      "Items:",
      ...cartWithDetails.map(
        (item) => `- ${item.name} (x${item.quantity})`,
      ),
      `Total: GHS ${cartTotal.toFixed(2)}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messageLines,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const isEmpty = cartWithDetails.length === 0;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 pb-20 pt-16 sm:px-6 sm:pb-22 sm:pt-18 md:gap-12 md:px-8 md:pb-24 md:pt-20 lg:px-10">
        <section className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-neutral-700">
            Your Cart
          </p>
          <h1 className="text-4xl font-black text-[var(--border-color)] sm:text-[42px]">
            A box full of happiness, almost yours.
          </h1>
          <p className="max-w-2xl text-base text-neutral-700">
            Review your selection, adjust the mix, and lock in delivery via
            WhatsApp checkout. We bake on demand, so your cookies head out the
            moment you confirm.
          </p>
        </section>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-5 rounded-[30px] border-[3px] border-dashed border-[var(--border-color)] bg-[var(--muted-surface)] px-6 py-12 text-center shadow-[10px_10px_0_0_rgba(var(--shadow-color),0.22)] sm:px-8 sm:py-14 md:px-10 md:py-16">
            <div className="relative h-28 w-32 overflow-hidden rounded-3xl border-[3px] border-[var(--border-color)] bg-[var(--surface)] shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)] sm:h-32 sm:w-40">
              <Image
                src="/images/hungry-cookie-monster.png"
                alt="Hungry cookie monster illustration"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--border-color)]">
                Your tray is cooling
              </h2>
              <p className="text-sm text-neutral-700">
                Add a few favourites from our signature menu and we will prep a
                fresh batch for you.
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.25)] transition-transform hover:-translate-y-1"
              href="/#cookies"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-5">
              {cartWithDetails.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-5 rounded-[28px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-5 shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)] sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-28 overflow-hidden rounded-3xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] shadow-[5px_5px_0_0_rgba(var(--shadow-color),0.16)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 140px, 120px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--border-color)]">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-700">
                        {item.size} · GHS {item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3 rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] px-3 py-1 shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)]">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-[12px] border-[2px] border-[var(--border-color)] bg-white text-neutral-800 shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.18)] transition hover:bg-[var(--accent-tertiary)]"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-[2ch] text-center text-sm font-semibold text-[var(--border-color)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-[12px] border-[2px] border-[var(--border-color)] bg-white text-neutral-800 shadow-[3px_3px_0_0_rgba(var(--shadow-color),0.18)] transition hover:bg-[var(--accent-tertiary)]"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-[var(--border-color)]">
                      GHS {item.lineTotal.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      className="text-xs font-semibold uppercase tracking-widest text-neutral-700 transition hover:text-[var(--accent)]"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="space-y-6 self-start rounded-[28px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-5 shadow-[10px_10px_0_0_rgba(var(--shadow-color),0.22)] sm:p-6">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-[var(--border-color)]">
                  Order Summary
                </h2>
                <div className="flex items-center justify-between text-sm text-neutral-700">
                  <span>Subtotal</span>
                  <span>GHS {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-neutral-700">
                  <span>Delivery</span>
                  <span>Calculated on WhatsApp</span>
                </div>
              </div>
              <div className="border-t-[3px] border-[var(--border-color)] pt-4">
                <div className="flex items-center justify-between pb-4">
                  <span className="text-sm text-neutral-700">Total</span>
                  <span className="text-2xl font-black text-[var(--border-color)]">
                    GHS {cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="inline-flex w-full items-center justify-center rounded-[18px] border-[3px] border-[var(--border-color)] bg-[var(--accent-secondary)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.25)] transition-transform hover:-translate-y-1"
                >
                  Place Order via WhatsApp
                </button>
              </div>
              <div className="rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] p-4 text-xs text-neutral-700 shadow-[6px_6px_0_0_rgba(var(--shadow-color),0.18)]">
                We will confirm delivery slots, dietary preferences, and payment
                inside WhatsApp before we bake. Need help? Message us directly at{" "}
                <a
                  className="font-semibold text-[var(--border-color)] underline underline-offset-2"
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHATSAPP_DISPLAY_NUMBER}
                </a>
                .
              </div>
            </aside>
          </div>
        )}

        <section
          id="order"
          className="rounded-[28px] border-[3px] border-[var(--border-color)] bg-[var(--surface)] px-6 py-10 shadow-[12px_12px_0_0_rgba(var(--shadow-color),0.2)] md:px-10"
        >
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-3xl font-black text-[var(--border-color)]">
                How Ordering Works
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                Checkout runs through a secure WhatsApp conversation so we can
                confirm delivery timings and answer any allergy questions before
                you pay.
              </p>
            </div>
            <div className="space-y-5 md:col-span-2">
              <div className="flex gap-4 rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] p-6 shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border-[2px] border-[var(--border-color)] bg-[var(--accent)] font-semibold text-white shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)]">
                  1
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--border-color)]">
                    Fill Your Cart
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                    Add your favourite cookies and tweak the quantities until everything looks perfect.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border-[2px] border-[var(--border-color)] bg-[var(--accent-secondary)] font-semibold text-white shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)]">
                  2
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--border-color)]">
                    Tap Place Order
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                    We will generate a unique order ID and pack all cart details into a ready-to-send WhatsApp message.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--muted-surface)] p-6 shadow-[8px_8px_0_0_rgba(var(--shadow-color),0.18)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border-[2px] border-[var(--border-color)] bg-[var(--accent-tertiary)] font-semibold text-[var(--border-color)] shadow-[4px_4px_0_0_rgba(var(--shadow-color),0.18)]">
                  3
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--border-color)]">
                    Confirm on WhatsApp
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                    Hit send, confirm delivery logistics with our team, and receive your fresh batch within hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
