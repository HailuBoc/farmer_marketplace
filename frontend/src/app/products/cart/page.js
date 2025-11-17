"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

/**
 * Cart page (client)
 * - Reads/writes cart from localStorage (key: localfarm_cart_v1)
 * - Responsive, accessible, Tailwind CSS
 * - Quantity editing, remove item, clear cart, totals, checkout stub
 */

/* -------------------------
   Local storage helpers
   ------------------------- */
const STORAGE_CART = "localfarm_cart_v1";
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_CART);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  } catch {}
}

/* -------------------------
   Utilities
   ------------------------- */
const formatCurrency = (n) =>
  typeof n === "number" ? `$${n.toFixed(2)}` : "$0.00";

/* -------------------------
   Main Cart Page
   ------------------------- */
export default function CartPage() {
  const [cart, setCart] = useState(() =>
    typeof window !== "undefined" ? loadCart() : {}
  );
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notice]);

  const items = useMemo(() => Object.values(cart), [cart]);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0),
    [items]
  );

  const shipping = useMemo(
    () => (subtotal > 0 && subtotal < 25 ? 5.0 : subtotal === 0 ? 0 : 0),
    [subtotal]
  ); // free shipping over $25
  const taxRate = 0.08;
  const tax = Math.round((subtotal + shipping) * taxRate * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  function updateQuantity(productId, nextQty) {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[productId]) return prev;
      const qty = Math.max(0, Math.floor(Number(nextQty) || 0));
      if (qty <= 0) {
        delete copy[productId];
        setNotice({ type: "info", text: "Item removed from cart" });
      } else {
        copy[productId] = { ...copy[productId], quantity: qty };
        setNotice({ type: "success", text: "Quantity updated" });
      }
      return copy;
    });
  }

  function removeItem(productId) {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    setNotice({ type: "info", text: "Item removed" });
  }

  function clearCart() {
    setCart({});
    setNotice({ type: "info", text: "Cart cleared" });
  }

  function handleCheckout() {
    // Stub: integrate with real checkout flow
    if (items.length === 0) {
      setNotice({ type: "error", text: "Your cart is empty" });
      return;
    }
    setNotice({ type: "success", text: "Checkout initiated (demo)" });
    // In production: redirect to checkout, create order, etc.
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <section className="lg:col-span-2">
          <header className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
              <p className="text-sm text-gray-500 mt-1">
                Review items, update quantities, and proceed to checkout.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCart}
                disabled={items.length === 0}
                className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition text-sm disabled:opacity-50"
                aria-disabled={items.length === 0}
              >
                Clear cart
              </button>
              <a
                href="/products"
                className="px-3 py-2 bg-white border rounded-md text-sm hover:bg-gray-50 transition"
              >
                Continue shopping
              </a>
            </div>
          </header>

          {/* Items list */}
          <main className="space-y-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-700">Your cart is empty.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Browse our{" "}
                  <a
                    href="/products"
                    className="text-green-600 hover:underline"
                  >
                    products
                  </a>{" "}
                  to add fresh goods.
                </p>
              </div>
            ) : (
              items.map((it) => (
                <article
                  key={it.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-start hover:shadow-md transition"
                >
                  <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {it.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {it.unit ?? ""}
                        </p>
                        <p className="text-sm text-green-700 font-medium mt-2">
                          {formatCurrency(it.price)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency((it.price || 0) * (it.quantity || 0))}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <label className="sr-only">Quantity for {it.name}</label>
                      <div className="inline-flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(it.id, (it.quantity || 0) - 1)
                          }
                          className="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 transition"
                          aria-label={`Decrease quantity for ${it.name}`}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={it.quantity}
                          onChange={(e) =>
                            updateQuantity(it.id, Number(e.target.value))
                          }
                          className="w-16 text-center text-sm px-2 py-1 outline-none"
                          aria-label={`Quantity for ${it.name}`}
                        />
                        <button
                          onClick={() =>
                            updateQuantity(it.id, (it.quantity || 0) + 1)
                          }
                          className="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 transition"
                          aria-label={`Increase quantity for ${it.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-xs px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </main>
        </section>

        {/* Summary & checkout */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Order summary
            </h2>
            <dl className="mt-4 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(shipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(tax)}
                </dd>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <dt className="font-semibold">Total</dt>
                <dd className="text-lg font-extrabold text-gray-900">
                  {formatCurrency(total)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-3">
              <button
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
              >
                Proceed to checkout
              </button>

              <a
                href="/orders"
                className="w-full inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm hover:bg-gray-50 transition"
              >
                View orders
              </a>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Secure checkout & payments. This demo uses localStorage — wire up
              your backend to process payments.
            </p>
          </div>

          {/* Small cart tips */}
          <div className="mt-4 bg-white rounded-lg shadow-sm p-4 text-sm text-gray-700">
            <strong>Tip:</strong> Free shipping for orders $25 and up.
          </div>
        </aside>
      </div>

      {/* Floating notice */}
      {notice && (
        <div
          role="status"
          className={`fixed right-6 bottom-6 rounded-md px-4 py-3 shadow-lg ${
            notice.type === "success"
              ? "bg-green-50 text-green-800"
              : notice.type === "error"
              ? "bg-red-50 text-red-800"
              : "bg-gray-50 text-gray-800"
          }`}
        >
          {notice.text}
        </div>
      )}
    </div>
  );
}
