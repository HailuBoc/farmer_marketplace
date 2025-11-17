"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      setError("");
      try {
        const [productsRes, testimonialsRes] = await Promise.all([
          fetch("http://localhost:5000/products", { cache: "no-store" }),
          fetch("http://localhost:5000/testimonials", { cache: "no-store" }),
        ]);
        if (!productsRes.ok) {
          throw new Error(`Products request failed (${productsRes.status})`);
        }
        if (!testimonialsRes.ok) {
          throw new Error(
            `Testimonials request failed (${testimonialsRes.status})`
          );
        }
        const productsData = await productsRes.json();
        const testimonialsData = await testimonialsRes.json();
        if (!isMounted) return;
        setProducts(
          Array.isArray(productsData) ? productsData : productsData?.data ?? []
        );
        setTestimonials(
          Array.isArray(testimonialsData)
            ? testimonialsData
            : testimonialsData?.data ?? []
        );
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load data.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const recentProducts = useMemo(() => {
    const data = Array.isArray(products) ? products : [];
    const sorted = [...data].sort((a, b) => {
      const aDate = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
    return sorted.slice(0, 5);
  }, [products]);

  const latestTestimonials = useMemo(() => {
    const data = Array.isArray(testimonials) ? testimonials : [];
    const sorted = [...data].sort((a, b) => {
      const aDate = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
    return sorted.slice(0, 3);
  }, [testimonials]);

  const computedStats = useMemo(() => {
    const totalProducts = Array.isArray(products) ? products.length : 0;
    const uniqueFarmers = (() => {
      const setIds = new Set();
      for (const p of products || []) {
        const id =
          p?.farmerId ??
          p?.farmerID ??
          p?.farmer_id ??
          p?.farmer?.id ??
          p?.farmerName ??
          p?.farmer;
        if (id) setIds.add(String(id));
      }
      return setIds.size;
    })();
    const activeOrders = 0;
    const revenue = 0;
    return { totalProducts, uniqueFarmers, activeOrders, revenue };
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle sidebar"
              className="inline-flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden"
              onClick={() => setIsSidebarOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6.75c0-.414.336-.75.75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 6a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Link href="/admin-dashboard" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-green-600 text-white shadow-sm">
                FM
              </span>
              <span className="text-lg font-semibold text-gray-900">
                Farmer's Marketplace — Admin
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-600 sm:block">
              Welcome back, Admin
            </span>
            <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-green-100">
              <img
                alt="Admin avatar"
                src="https://api.dicebear.com/7.x/initials/svg?seed=Admin"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r border-gray-200 bg-white p-4 transition-transform duration-200 ease-out md:static md:inset-auto md:w-full md:translate-x-0 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="space-y-1">
            <SidebarLink
              href="/admin-dashboard"
              label="Dashboard"
              icon="home"
            />
            <SidebarLink
              href="/admin-dashboard/products"
              label="Products"
              icon="boxes"
            />
            <SidebarLink
              href="/admin-dashboard/farmers"
              label="Farmers"
              icon="users"
            />
            <SidebarLink
              href="/admin-dashboard/testimonials"
              label="Testimonials"
              icon="chat"
            />
            <SidebarLink
              href="/admin-dashboard/orders"
              label="Orders"
              icon="receipt"
            />
            <SidebarLink
              href="/admin-dashboard/settings"
              label="Settings"
              icon="settings"
            />
            <SidebarLink href="/logout" label="Logout" icon="logout" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-64px)] px-4 py-6 sm:px-6 lg:px-8">
          {/* Loading / Error */}
          {isLoading && (
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></span>
                <p className="text-sm text-gray-700">Loading data...</p>
              </div>
            </div>
          )}
          {!!error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {/* Stats */}
          <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Products"
              value={computedStats.totalProducts}
              trend="+2.1%"
              color="green"
            />
            <StatCard
              title="Total Farmers"
              value={computedStats.uniqueFarmers}
              trend="+0.4%"
              color="sky"
            />
            <StatCard
              title="Active Orders"
              value={computedStats.activeOrders}
              trend="-1.2%"
              color="amber"
            />
            <StatCard
              title="Revenue"
              value={new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(computedStats.revenue)}
              trend="+5.4%"
              color="violet"
            />
          </section>

          {/* Recent Products */}
          <section className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h2 className="text-base font-semibold text-gray-900">
                Recent Products
              </h2>
              <Link
                href="/admin-dashboard/products"
                className="text-sm font-medium text-green-700 hover:text-green-800"
              >
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Price</Th>
                    <Th>Stock</Th>
                    <Th>Added</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {recentProducts.length === 0 && !isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    recentProducts.map((p, idx) => (
                      <tr
                        key={p?.id ?? p?._id ?? idx}
                        className="hover:bg-gray-50"
                      >
                        <Td className="font-medium text-gray-900">
                          {p?.name ?? p?.title ?? "Unnamed"}
                        </Td>
                        <Td>{p?.category ?? p?.type ?? "-"}</Td>
                        <Td>
                          {formatCurrency(
                            p?.price ?? p?.unitPrice ?? p?.amount
                          )}
                        </Td>
                        <Td>{p?.stock ?? p?.quantity ?? "-"}</Td>
                        <Td>{formatDate(p?.createdAt)}</Td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Testimonials */}
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h2 className="text-base font-semibold text-gray-900">
                Latest Testimonials
              </h2>
              <Link
                href="/admin-dashboard/testimonials"
                className="text-sm font-medium text-green-700 hover:text-green-800"
              >
                Manage
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestTestimonials.length === 0 && !isLoading ? (
                <div className="col-span-full rounded-md border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                  No testimonials available.
                </div>
              ) : (
                latestTestimonials.map((t, idx) => (
                  <article
                    key={t?.id ?? t?._id ?? idx}
                    className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-green-100">
                        <img
                          alt={t?.name ?? "Customer"}
                          src={
                            t?.avatar ??
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              t?.name ?? "User"
                            )}`
                          }
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {t?.name ?? t?.author ?? "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(t?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 line-clamp-4">
                      {t?.message ?? t?.content ?? "-"}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td
      className={`whitespace-nowrap px-4 py-3 text-sm text-gray-700 ${className}`}
    >
      {children}
    </td>
  );
}

function StatCard({ title, value, trend, color = "green" }) {
  const colorMap = {
    green: "bg-green-50 text-green-700 ring-green-100",
    sky: "bg-sky-50 text-sky-700 ring-sky-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    violet: "bg-violet-50 text-violet-700 ring-violet-100",
  };
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs ring-1 ${colorMap[color]}`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

function SidebarLink({ href, label, icon }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
    >
      <Icon
        name={icon}
        className="h-5 w-5 text-gray-400 transition group-hover:text-gray-600"
      />
      <span>{label}</span>
    </Link>
  );
}

function Icon({ name, className = "" }) {
  switch (name) {
    case "home":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 0 1-1.06 1.06l-.9-.9V19.5A2.25 2.25 0 0 1 17.25 21h-2.5a.75.75 0 0 1-.75-.75v-3.5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v3.5a.75.75 0 0 1-.75.75h-2.5A2.25 2.25 0 0 1 4.75 19.5v-6.81l-.9.9a.75.75 0 1 1-1.06-1.06l8.69-8.69Z" />
        </svg>
      );
    case "boxes":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h3.5A2.75 2.75 0 0 1 12 6.75v3.5A2.75 2.75 0 0 1 9.25 13h-3.5A2.75 2.75 0 0 1 3 10.25v-3.5Zm8.5 0A2.75 2.75 0 0 1 14.25 4h3.5A2.75 2.75 0 0 1 20.5 6.75v3.5A2.75 2.75 0 0 1 17.75 13h-3.5A2.75 2.75 0 0 1 11.5 10.25v-3.5ZM3 16.75A2.75 2.75 0 0 1 5.75 14h3.5A2.75 2.75 0 0 1 12 16.75v3.5A2.75 2.75 0 0 1 9.25 23h-3.5A2.75 2.75 0 0 1 3 20.25v-3.5Zm8.5 0A2.75 2.75 0 0 1 14.25 14h3.5A2.75 2.75 0 0 1 20.5 16.75v3.5A2.75 2.75 0 0 1 17.75 23h-3.5A2.75 2.75 0 0 1 11.5 20.25v-3.5Z" />
        </svg>
      );
    case "users":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a6.75 6.75 0 1 1 13.5 0 .75.75 0 0 1-.75.75h-12a.75.75 0 0 1-.75-.75Z" />
        </svg>
      );
    case "chat":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.5 6A3.75 3.75 0 0 1 8.25 2.25h7.5A3.75 3.75 0 0 1 19.5 6v5.25A3.75 3.75 0 0 1 15.75 15H9l-4.2 2.4a.75.75 0 0 1-1.125-.65V6Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "receipt":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6.32 2.577A1.5 1.5 0 0 1 7.76 2h8.48a1.5 1.5 0 0 1 1.44.577l.96 1.2c.19.237.29.53.29.83V21a.75.75 0 0 1-1.066.69L15 20.25l-2.25 1.44a.75.75 0 0 1-.816 0L9.75 20.25 6.096 21.69A.75.75 0 0 1 5.03 21V4.607c0-.3.1-.593.29-.83l1-1.2Z" />
        </svg>
      );
    case "settings":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM2.25 12c0-.414.336-.75.75-.75h1.07a7.5 7.5 0 0 1 .58-1.4l-.76-.76a.75.75 0 0 1 0-1.06l1.5-1.5a.75.75 0 0 1 1.06 0l.76.76c.44-.25.91-.45 1.4-.58V3a.75.75 0 0 1 .75-.75h2.12a.75.75 0 0 1 .75.75v1.07c.49.13.96.33 1.4.58l.76-.76a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1 0 1.06l-.76.76c.25.44.45.91.58 1.4h1.07a.75.75 0 0 1 .75.75v2.12a.75.75 0 0 1-.75.75h-1.07a7.5 7.5 0 0 1-.58 1.4l.76.76a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 0 1-1.06 0l-.76-.76c-.44.25-.91.45-1.4.58V21a.75.75 0 0 1-.75.75H9.75A.75.75 0 0 1 9 21v-1.07a7.2 7.2 0 0 1-1.4-.58l-.76.76a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 0 1 0-1.06l.76-.76a7.2 7.2 0 0 1-.58-1.4H3a.75.75 0 0 1-.75-.75V12Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.75 3A2.25 2.25 0 0 1 18 5.25v2.75a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V16a.75.75 0 0 1 1.5 0v2.75A2.25 2.25 0 0 1 15.75 21h-9A2.25 2.25 0 0 1 4.5 18.75V5.25A2.25 2.25 0 0 1 6.75 3h9Z" />
          <path d="M20.03 11.47a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H10.5a.75.75 0 0 1 0-1.5h7.19l-1.72-1.72a.75.75 0 0 1 1.06-1.06l3 3Z" />
        </svg>
      );
    default:
      return <span className={className} />;
  }
}

function formatCurrency(value) {
  if (value == null || value === "") return "-";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(Number(value));
  } catch {
    return String(value);
  }
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString();
}
