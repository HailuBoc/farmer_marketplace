"use client";

import { useEffect, useState } from "react";
import { User, ShoppingCart, Trash2 } from "lucide-react";

/* ---------------------------
       NAVBAR
---------------------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b">
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

          <div className="flex items-center gap-4">
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-green-700 hover:text-green-800" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </a>

            {user ? (
              <>
                <a
                  href="/login/profile"
                  className="text-green-700 hover:text-green-800 transition"
                >
                  <User className="w-6 h-6" />
                </a>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="hidden sm:inline-block text-gray-700 hover:text-green-700"
              >
                Login
              </a>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <a className="block px-2 py-1 hover:bg-gray-100" href="/">
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
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <a className="block px-2 py-1 hover:bg-gray-100" href="/login">
                Login
              </a>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

/* ---------------------------
       FOOTER
---------------------------- */
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

/* ---------------------------
       CART PAGE
---------------------------- */
export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    setTotal(sum);
  }, [cart]);

  const updateQty = (id, change) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="antialiased text-gray-800">
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-16">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
            Your Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <p className="text-center py-20 text-gray-600 text-lg">
              Your cart is empty.
            </p>
          ) : (
            <div className="lg:flex lg:gap-8">
              {/* Cart Items */}
              <div className="flex-1 space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex items-center gap-5"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `http://localhost:5000/${item.image}`
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-green-700 font-medium">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-2 py-1 border rounded-md"
                        >
                          -
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, +1)}
                          className="px-2 py-1 border rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow h-fit mt-6 lg:mt-0 sticky top-28">
                <h3 className="text-2xl font-bold border-b pb-3">
                  Order Summary
                </h3>
                <div className="flex justify-between mt-4 text-lg">
                  <span>Total</span>
                  <span className="font-semibold text-green-700">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                  onClick={() => alert("Checkout coming soon!")}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
