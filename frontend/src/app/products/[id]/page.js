"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { User, ShoppingCart } from "lucide-react";
/* Navbar */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    // Check login state
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
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
              LocalFarm
            </a>

            <div className="hidden md:flex items-center space-x-4">
              <a
                className="text-gray-700 hover:text-green-700 transition"
                href="/"
              >
                Home
              </a>
              <a
                className="text-gray-700 hover:text-green-700 transition"
                href="/products"
              >
                Products
              </a>
              <a
                className="text-gray-700 hover:text-green-700 transition"
                href="/farmer"
              >
                Farmers
              </a>
              <a
                className="text-gray-700 hover:text-green-700 transition"
                href="/contact"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Profile */}
                <a
                  href="/login/profile"
                  className="text-green-700 hover:text-green-800 transition font-medium"
                >
                  <User className="w-6 h-6" />
                </a>

                {/* Cart */}
                <a
                  href="/cart"
                  className="relative text-green-700 hover:text-green-800 transition"
                >
                  <ShoppingCart className="w-6 h-6" />

                  {/* Counter bubble */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </a>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="hidden sm:inline-block text-gray-700 hover:text-green-700 transition"
              >
                Login
              </a>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <a className="block px-2 py-1 rounded hover:bg-gray-100" href="/">
              Home
            </a>
            <a
              className="block px-2 py-1 rounded hover:bg-gray-100"
              href="/products"
            >
              Products
            </a>
            <a
              className="block px-2 py-1 rounded hover:bg-gray-100"
              href="/farmer"
            >
              Farmers
            </a>
            <a
              className="block px-2 py-1 rounded hover:bg-gray-100"
              href="/contact"
            >
              Contact
            </a>

            {user ? (
              <>
                <a
                  href="/profile"
                  className="block px-2 py-1 rounded hover:bg-gray-100"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                className="block px-2 py-1 rounded hover:bg-gray-100"
                href="/login"
              >
                Login
              </a>
            )}
          </div>
        )}
      </nav>
    </header>
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

/* Product Detail Page */

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // ✅ Notification state

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    const user = localStorage.getItem("user"); // check login
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (!existing) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setMessage("✅ Product added to cart!");
    } else {
      setMessage("🛒 Product is already in your cart!");
    }

    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleContactSeller = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    } else {
      window.location.href = "/contact"; // or open chat
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-gray-700">Loading product...</p>
    );
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!product)
    return (
      <p className="text-center py-20 text-gray-700">Product not found.</p>
    );

  const imgUrl =
    product.image && typeof product.image === "string"
      ? product.image
      : product.image?.url || `http://localhost:5000/${product.image?.path}`;

  return (
    <div className="antialiased text-gray-800">
      <Navbar />

      <main className="bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="relative w-full h-96 bg-gray-100 rounded-xl shadow-sm overflow-hidden">
              {(() => {
                let imgVal = null;
                if (!product) imgVal = null;
                else if (typeof product.image === "string")
                  imgVal = product.image;
                else if (product.image && typeof product.image === "object") {
                  imgVal =
                    product.image.url ||
                    product.image.path ||
                    product.image.filename ||
                    null;
                }

                const imageUrl = imgVal
                  ? imgVal.startsWith("http")
                    ? imgVal
                    : `http://localhost:5000/${imgVal.replace(/^\//, "")}`
                  : null;

                if (!imageUrl)
                  return (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      No Image
                    </div>
                  );

                return (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                );
              })()}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              <p className="text-3xl text-green-700 font-semibold">
                ${product.price}
              </p>
              <p className="text-gray-700 text-lg">{product.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition transform hover:-translate-y-0.5"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleContactSeller}
                  className="px-6 py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-md shadow-sm transition transform hover:-translate-y-0.5"
                >
                  Contact Seller
                </button>
              </div>

              {/* Notification Message */}
              {message && (
                <div className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-sm animate-fade-in">
                  {message}
                </div>
              )}

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-gray-700 mt-6">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold">Category</h3>
                  <p className="mt-1">{product.category || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold">Stock</h3>
                  <p className="mt-1">{product.stock || "Available"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold">Origin</h3>
                  <p className="mt-1">{product.origin || "Local Farm"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-semibold">Sustainability</h3>
                  <p className="mt-1">
                    {product.sustainability || "Certified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
