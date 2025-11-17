"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "lucide-react";

/* Navbar / Header */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
          {/* left logo section */}
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
              <a className="text-gray-700 hover:text-green-700" href="#">
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

          {/* right buttons */}
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
                  <span className="text-gray-700 text-sm">
                    <User className="w-6 h-6" />
                  </span>
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

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <a className="block px-2 py-1 hover:bg-gray-100" href="#">
              Home
            </a>
            <a className="block px-2 py-1 hover:bg-gray-100" href="/products">
              Products
            </a>
            <a className="block px-2 py-1 hover:bg-gray-100" href="/farmer">
              Farmers
            </a>
            <a className="block px-2 py-1 hover:bg-gray-100" href="/contact">
              Contact
            </a>
            {!user ? (
              <a className="block px-2 py-1 hover:bg-gray-100" href="/login">
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

/* Hero Section */
function Hero() {
  return (
    <section className="relative bg-green-50" aria-label="Hero">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=2000&q=80&auto=format&fit=crop"
          alt="Fresh produce background"
          fill
          sizes="(max-width: 640px) 100vw, 100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Fresh. Local. Sustainable.
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">
              Discover fresh produce, dairy, and artisanal goods from trusted
              local farmers. Built to connect communities with sustainable food
              sources.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Shop Now
              </a>
              <a
                href="/farmer"
                className="inline-flex items-center justify-center px-5 py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-md transition transform hover:-translate-y-0.5"
              >
                Become a Seller
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <span className="font-medium">Free pickup available</span> •
              Secure payments • Local delivery
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-800">
                Verified Farmers
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Local producers verified for quality and sustainability.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-800">
                Fresh Daily
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Products harvested and delivered directly from the farm.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-800">
                Transparent Pricing
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Fair prices for farmers and customers alike.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-gray-800">
                Community Events
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Workshops, farm tours, and seasonal markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Product Card */
function ProductCard({ product }) {
  // Normalize possible shapes for product.image
  let imgVal = null;
  if (!product) imgVal = null;
  else if (typeof product.image === "string") imgVal = product.image;
  else if (product.image && typeof product.image === "object") {
    imgVal =
      product.image.url || product.image.path || product.image.filename || null;
  }

  const imageUrl = imgVal
    ? imgVal.startsWith("http")
      ? imgVal
      : `${process.env.NEXT_PUBLIC_API_URL}/${imgVal.replace(/^\//, "")}`
    : null;

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition transform hover:-translate-y-1">
      <div className="relative w-full h-48 sm:h-40 md:h-44 lg:h-40 bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name || "Product Image"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentNode.querySelector(
                ".no-image"
              ).style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="no-image bg-gray-200 w-full h-full flex items-center justify-center text-gray-400"
          style={{ display: imageUrl ? "none" : "flex" }}
        >
          No Image
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 font-semibold">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-green-700 font-medium">${product.price}</p>
          <a
            href={`/products/${product.id}`} // ✅ Always use product.id
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

/* Featured Products Section */
function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("${process.env.NEXT_PUBLIC_API_URL}/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-8">Loading products...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!products.length)
    return <p className="text-center py-8">No products found.</p>;

  return (
    <section
      id="products"
      className="py-16 bg-gray-50"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2
            id="featured-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Featured Products
          </h2>
          <a
            href="/products"
            className="text-sm text-green-600 hover:underline"
          >
            Browse all
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Testimonials Section */
function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("${process.env.NEXT_PUBLIC_API_URL}/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center py-8">Loading testimonials...</p>;

  return (
    <section
      id="testimonials"
      className="py-16 bg-green-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials-heading"
          className="text-2xl font-bold text-gray-900 text-center"
        >
          What our community says
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">Verified customer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">“{t.quote}”</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Footer */
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
                    aria-label="Facebook"
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    FB
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    IG
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-label="Twitter"
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
   Main Page Export
   ------------------------- */

export default function Home() {
  return (
    <div className="antialiased text-gray-800">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
