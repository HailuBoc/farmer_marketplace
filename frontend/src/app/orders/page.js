// ...existing code...
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Orders page (client)
 * - Customers can place new orders and view/manage their existing orders.
 * - Uses Tailwind CSS for responsive styling and small transitions.
 * - UI-only: orders are persisted to localStorage as a demo (replace with API calls).
 *
 * Accessibility:
 * - Semantic HTML, labelled inputs, aria-live for messages, focusable action buttons.
 */

/* -------------------------
   Dummy product data (example)
   ------------------------- */
const PRODUCTS = [
  {
    id: "p1",
    name: "Organic Heirloom Tomatoes",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Free-Range Eggs (Dozen)",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Raw Honey 250g",
    price: 8.75,
    image:
      "https://images.unsplash.com/photo-1502741126161-b048400d7c6f?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Fresh Kale Bunch",
    price: 2.25,
    image:
      "https://images.unsplash.com/photo-1542444459-db6f3b7909a8?w=800&q=60&auto=format&fit=crop",
  },
];

/* -------------------------
   Local storage helpers (demo)
   ------------------------- */
const STORAGE_KEY = "localfarm_orders_v1";

function loadOrdersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveOrdersToStorage(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore storage failures in demo
  }
}

/* -------------------------
   OrderCard - displays a single order
   ------------------------- */
function OrderCard({ order, onCancel }) {
  const date = new Date(order.createdAt).toLocaleString();

  return (
    <article className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-start hover:shadow-md transition">
      <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
        <Image
          src={order.product.image}
          alt={order.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {order.product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Qty: {order.quantity} • ${order.total.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Delivery: {order.deliveryMethod}
            </p>
          </div>

          <div className="text-right">
            <p
              className={`text-sm font-medium ${
                order.status === "cancelled"
                  ? "text-red-600"
                  : order.status === "delivered"
                  ? "text-green-700"
                  : "text-yellow-700"
              }`}
            >
              {order.status.toUpperCase()}
            </p>
            <p className="text-xs text-gray-400 mt-1">{date}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() =>
              navigator.clipboard?.writeText(JSON.stringify({ id: order.id }))
            }
            className="text-xs px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            aria-label="Copy order info"
            title="Copy order info"
          >
            Copy Info
          </button>

          {order.status === "pending" && (
            <button
              onClick={() => onCancel(order.id)}
              className="text-xs px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* -------------------------
   OrderForm - create a new order
   ------------------------- */
function OrderForm({ onPlace }) {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("Delivery");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // clear transient notices
    if (notice) {
      const t = setTimeout(() => setNotice(null), 3500);
      return () => clearTimeout(t);
    }
  }, [notice]);

  const findProduct = (id) => PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Valid email required";
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1)
      e.quantity = "Quantity must be at least 1";
    if (deliveryMethod === "Delivery" && !address.trim())
      e.address = "Delivery address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const product = findProduct(productId);
    const qty = Number(quantity);
    const subtotal = product.price * qty;
    const deliveryFee = deliveryMethod === "Delivery" ? 5.0 : 0.0;
    const total = Math.round((subtotal + deliveryFee) * 100) / 100;

    // simulate server latency
    await new Promise((r) => setTimeout(r, 750));

    const order = {
      id: `ord_${Date.now()}`,
      product,
      quantity: qty,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      deliveryMethod,
      deliveryFee,
      subtotal,
      total,
      status: "pending",
      createdAt: Date.now(),
    };

    onPlace(order);
    setLoading(false);
    setNotice({ type: "success", text: "Order placed successfully" });

    // reset minimal fields
    setQuantity(1);
    setPhone("");
    setAddress("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-lg shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">Place a new order</h2>

      <div>
        <label
          htmlFor="product"
          className="block text-sm font-medium text-gray-700"
        >
          Product
        </label>
        <select
          id="product"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200"
        >
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — ${p.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200"
          />
          {errors.quantity && (
            <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="delivery"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery
          </label>
          <select
            id="delivery"
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200"
          >
            <option>Delivery</option>
            <option>Pickup</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200"
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-1 block w-full rounded-md border-gray-200"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200"
          />
        </div>
      </div>

      {deliveryMethod === "Delivery" && (
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery address
          </label>
          <input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200"
          />
          {errors.address && (
            <p className="text-xs text-red-600 mt-1">{errors.address}</p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-600">
          <p>
            Subtotal:{" "}
            <span className="font-medium">
              $
              {(
                PRODUCTS.find((p) => p.id === productId).price *
                Number(quantity)
              ).toFixed(2)}
            </span>
          </p>
          <p className="text-xs text-gray-400">
            Delivery fee applies for Delivery option
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

      <div aria-live="polite">
        {notice && (
          <p
            className={`text-sm mt-2 ${
              notice.type === "success" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {notice.text}
          </p>
        )}
      </div>
    </form>
  );
}

/* -------------------------
   OrdersPage - main export
   ------------------------- */
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | delivered | cancelled
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    // load persisted orders (demo)
    const loaded = loadOrdersFromStorage();
    // sort newest first
    loaded.sort((a, b) => b.createdAt - a.createdAt);
    setOrders(loaded);
    setLoading(false);
  }, []);

  useEffect(() => {
    // persist orders on change
    saveOrdersToStorage(orders);
  }, [orders]);

  const handlePlaceOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setStatusMsg({ text: "Order placed", type: "success" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleCancel = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o))
    );
    setStatusMsg({ text: "Order cancelled", type: "info" });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const filtered = orders.filter((o) =>
    filter === "all" ? true : o.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: order form */}
        <div className="lg:col-span-1">
          <OrderForm onPlace={handlePlaceOrder} />
          <div className="mt-6 text-xs text-gray-500">
            <p>
              Note: This demo stores orders in your browser only. Replace with
              your API to persist server-side.
            </p>
          </div>
        </div>

        {/* Right: orders list */}
        <div className="lg:col-span-2">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
              <p className="text-sm text-gray-500 mt-1">
                Track placed orders and manage cancellations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="filter" className="sr-only">
                Filter orders
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-md border-gray-200"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </header>

          {/* Status message */}
          {statusMsg && (
            <div
              className={`mb-4 p-3 rounded-md text-sm ${
                statusMsg.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <main>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-20 bg-white rounded-md" />
                <div className="h-20 bg-white rounded-md" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <p className="text-gray-700">
                  No orders found for the selected filter.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Place your first order using the form on the left.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
// ...existing code...
