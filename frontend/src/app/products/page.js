"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { User } from "lucide-react";

/* -------------------------
   Navbar
------------------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="bg-white/70 backdrop-blur-sm sticky top-0 z-40 border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center text-green-700 hover:text-green-800 font-semibold text-lg"
            >
              <svg
                className="w-8 h-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2C13.1 2 14 2.9 14 4v6h6c1.1 0 2 .9 2 2s-.9 2-2 2h-6v6c0 1.1-.9 2-2 2s-2-.9-2-2v-6H4c-1.1 0-2-.9-2-2s.9-2 2-2h6V4c0-1.1.9-2 2-2z"
                  fill="currentColor"
                />
              </svg>
              LocalFarm
            </a>

            <div className="hidden md:flex items-center space-x-4">
              <a className="text-gray-700 hover:text-green-700" href="/">
                Home
              </a>
              <a
                className="text-gray-700 hover:text-green-700"
                href="/products"
              >
                Products
              </a>
              <a className="text-gray-700 hover:text-green-700" href="/farmer">
                Farmers
              </a>
              <a className="text-gray-700 hover:text-green-700" href="/contact">
                Contact
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <a
                href="/login"
                className="hidden sm:inline-block text-gray-700 hover:text-green-700 transition"
              >
                Login
              </a>
            ) : (
              <div className="flex items-center gap-3">
                <a href="/login/profile">
                  <User className="w-6 h-6 text-gray-700" />
                </a>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Logout
                </button>
              </div>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <a href="/" className="block px-2 py-1 hover:bg-gray-100">
              Home
            </a>
            <a href="/products" className="block px-2 py-1 hover:bg-gray-100">
              Products
            </a>
            <a href="/farmer" className="block px-2 py-1 hover:bg-gray-100">
              Farmers
            </a>
            <a href="/contact" className="block px-2 py-1 hover:bg-gray-100">
              Contact
            </a>
            {!user ? (
              <a href="/login" className="block px-2 py-1 hover:bg-gray-100">
                Login
              </a>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

/* -------------------------
   Footer
------------------------- */
function Footer() {
  return (
    <footer className="bg-white border-t" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-start md:justify-between">
          <div>
            <a
              href="#"
              className="flex items-center text-green-700 font-semibold text-lg"
            >
              <svg
                className="w-8 h-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2C13.1 2 14 2.9 14 4v6h6c1.1 0 2 .9 2 2s-.9 2-2 2h-6v6c0 1.1-.9 2-2 2s-2-.9-2-2v-6H4c-1.1 0-2-.9-2-2s.9-2 2-2h6V4c0-1.1.9-2 2-2z"
                  fill="currentColor"
                />
              </svg>
              LocalFarm
            </a>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              Connecting local farmers with customers who care about quality,
              sustainability, and community.
            </p>
          </div>

          <div className="mt-8 md:mt-0 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/farmer" className="hover:underline">
                    Farmers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Follow</h3>
              <ul className="mt-4 flex items-center gap-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    FB
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    IG
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    TW
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-sm text-gray-600 flex flex-col md:flex-row md:justify-between gap-4">
          <p>© {new Date().getFullYear()} LocalFarm. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">
              Privacy
            </a>
            <a href="#terms" className="hover:underline">
              Terms
            </a>
            <a href="#support" className="hover:underline">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------
   Product Card
------------------------- */
function ProductCard({ product }) {
  let imgVal = null;
  if (typeof product.image === "string") imgVal = product.image;
  else if (product.image && typeof product.image === "object")
    imgVal =
      product.image.url || product.image.path || product.image.filename || null;

  const imageUrl = imgVal
    ? imgVal.startsWith("http")
      ? imgVal
      : `http://localhost:5000/${imgVal.replace(/^\//, "")}`
    : null;

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition transform hover:-translate-y-1">
      <div className="relative w-full h-48 sm:h-40 md:h-44 lg:h-40 bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name || "Product Image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 font-semibold">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-green-700 font-medium">
            ${Number(product.price).toFixed(2)}
          </p>
          <a
            href={`/products/${product.id}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}

/* -------------------------
   Products Page
------------------------- */
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) =>
        setProducts(data.map((p) => ({ ...p, price: Number(p.price) })))
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );
  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!query || p.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [products, category, query]);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="antialiased bg-gray-50 text-gray-800">
      <Navbar />
      <main className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-64 rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  category === c
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
