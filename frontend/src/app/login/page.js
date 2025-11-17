// ...existing code...
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Login page with two roles: Purchaser (consumer) and Vendor
 * - Client component for Next.js App Router
 * - Tailwind CSS for styling
 * - Accessible semantic HTML, responsive layout, small animations
 *
 * Note: This is a UI-only implementation. Hook the submit handlers
 * to your authentication API / provider as needed.
 */

/* ----- Helper utilities ----- */
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

/* ----- Social button (UI) ----- */
function SocialButton({ provider, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-md hover:shadow-sm transition text-sm bg-white"
      aria-label={`Continue with ${provider}`}
    >
      {/* Simple provider icon */}
      <span className="w-5 h-5 flex-shrink-0">
        {provider === "Google" ? (
          <svg
            viewBox="0 0 533.5 544.3"
            aria-hidden="true"
            className="w-full h-full"
          >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.3-1.5-34-4.3-50.2H272v95.1h146.9c-6.3 34-25 62.8-53.5 82v67h86.4c50.5-46.5 80.2-115 80.2-193.9z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c72.7 0 133.7-24.1 178.3-65.4l-86.4-67c-24.1 16.2-55 25.8-91.9 25.8-70.7 0-130.6-47.7-152-111.8H33.6v70.5C77.8 486.9 168.8 544.3 272 544.3z"
            />
            <path
              fill="#fbbc04"
              d="M120 327.9c-11.7-35.1-11.7-72.9 0-108l-86.4-70.5C7.2 192.8 0 233.6 0 272s7.2 79.2 33.6 122.6l86.4-66.7z"
            />
            <path
              fill="#ea4335"
              d="M272 108.6c39.6 0 75.2 13.6 103.1 40.4l77.3-77.3C404.9 24.7 344 0 272 0 168.8 0 77.8 57.4 33.6 143.7l86.4 70.5C141.4 156.3 201.3 108.6 272 108.6z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
            <path
              d="M16 7a4 4 0 0 0-8 0 6 6 0 0 0 0 10 4 4 0 0 0 8 0 6 6 0 0 0 0-10z"
              fill="#111"
            />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-700">{children}</span>
    </button>
  );
}

/* ----- Purchaser (consumer) form ----- */
function PurchaserForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = "Enter a valid email.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (phone && !/^\+?[0-9\s\-()]{6,20}$/.test(phone))
      newErrors.phone = "Enter a valid phone number.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      // Replace with real API call
      await new Promise((r) => setTimeout(r, 900));
      onSubmit({ role: "purchaser", email });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="p-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="p-email"
          type="email"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="p-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="p-password"
          type="password"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-xs text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="p-phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone (optional)
        </label>
        <input
          id="p-phone"
          type="tel"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
            errors.phone ? "border-red-500" : "border-gray-200"
          }`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <a href="#forgot" className="text-green-600 hover:underline">
          Forgot password?
        </a>
        <a href="/login/signup" className="text-gray-600 hover:underline">
          Create account
        </a>
      </div>

      <div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in as Purchaser"}
        </button>
      </div>
    </form>
  );
}

/* ----- Vendor form ----- */
function VendorForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [password, setPassword] = useState("");
  const [farmId, setFarmId] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = "Enter a valid email.";
    if (!business) newErrors.business = "Business / farm name is required.";
    if (!password || password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (farmId && farmId.length < 3)
      newErrors.farmId = "Farm ID must be at least 3 characters.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      // Replace with real API call
      await new Promise((r) => setTimeout(r, 900));
      onSubmit({ role: "vendor", email, business, farmId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="v-email"
          className="block text-sm font-medium text-gray-700"
        >
          Business Email
        </label>
        <input
          id="v-email"
          type="email"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="v-business"
          className="block text-sm font-medium text-gray-700"
        >
          Business / Farm Name
        </label>
        <input
          id="v-business"
          type="text"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
            errors.business ? "border-red-500" : "border-gray-200"
          }`}
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          required
          aria-invalid={!!errors.business}
        />
        {errors.business && (
          <p className="text-xs text-red-600 mt-1">{errors.business}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="v-password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="v-password"
            type="password"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="v-farm"
            className="block text-sm font-medium text-gray-700"
          >
            Farm ID (optional)
          </label>
          <input
            id="v-farm"
            type="text"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
              errors.farmId ? "border-red-500" : "border-gray-200"
            }`}
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            aria-invalid={!!errors.farmId}
          />
          {errors.farmId && (
            <p className="text-xs text-red-600 mt-1">{errors.farmId}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <a href="#help" className="text-gray-600 hover:underline">
          Need help?
        </a>
        <a href="#apply" className="text-green-600 hover:underline">
          Apply to sell
        </a>
      </div>

      <div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in as Vendor"}
        </button>
      </div>
    </form>
  );
}

/* ----- Main Login Page ----- */
export default function LoginPage() {
  const [role, setRole] = useState("purchaser"); // 'purchaser' | 'vendor'
  const [message, setMessage] = useState(null);

  const handleSuccess = (payload) => {
    // store user data in localStorage
    localStorage.setItem("user", JSON.stringify(payload));

    // show a short success message
    setMessage({
      type: "success",
      text: `Welcome back, ${payload.email}! Redirecting...`,
    });

    // redirect after 1 second
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: visual / marketing */}
        <div className="rounded-xl overflow-hidden shadow-md bg-white">
          <div className="relative h-64 sm:h-80 lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=1600&q=80&auto=format&fit=crop"
              alt="Fresh produce"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold leading-tight">
                Sell local. Grow community.
              </h3>
              <p className="text-white/90 mt-2 text-sm max-w-xs">
                Join LocalFarm—connect directly with customers who value
                sustainable and local produce.
              </p>
            </div>
          </div>
        </div>

        {/* Right: auth panel */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                href="/"
                className="flex items-center text-green-700 font-semibold text-lg"
              >
                <svg
                  className="w-7 h-7 mr-2"
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
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your account
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-gray-400">Role</span>
              <div className="inline-flex rounded-md bg-gray-100 p-1">
                <button
                  onClick={() => setRole("purchaser")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    role === "purchaser"
                      ? "bg-white shadow text-green-700"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                  aria-pressed={role === "purchaser"}
                >
                  Purchaser
                </button>
                <button
                  onClick={() => setRole("vendor")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    role === "vendor"
                      ? "bg-white shadow text-green-700"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                  aria-pressed={role === "vendor"}
                >
                  Vendor
                </button>
              </div>
            </div>
          </div>

          {/* Mobile role switch */}
          <div className="sm:hidden mb-4">
            <label htmlFor="role" className="sr-only">
              Select role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border-gray-200"
            >
              <option value="purchaser">Purchaser</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {/* Social sign-in */}
          <div className="grid gap-3 mb-4">
            <SocialButton
              provider="Google"
              onClick={() =>
                setMessage({
                  type: "info",
                  text: "Google sign-in clicked (demo)",
                })
              }
            >
              Continue with Google
            </SocialButton>
            <SocialButton
              provider="Apple"
              onClick={() =>
                setMessage({
                  type: "info",
                  text: "Apple sign-in clicked (demo)",
                })
              }
            >
              Continue with Apple
            </SocialButton>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* Role-specific form */}
          {role === "purchaser" ? (
            <PurchaserForm onSubmit={handleSuccess} />
          ) : (
            <VendorForm onSubmit={handleSuccess} />
          )}

          {/* Notice / status */}
          {message && (
            <div
              role="status"
              className={`mt-4 text-sm rounded-md px-3 py-2 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Footer links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            By signing in you agree to our{" "}
            <a href="#terms" className="text-green-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-green-600 hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...
