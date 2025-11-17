"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

function SocialButton({ provider, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-md hover:shadow-sm transition text-sm bg-white"
      aria-label={`Continue with ${provider}`}
    >
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

/* ----- Purchaser Sign Up Form ----- */
function PurchaserSignup({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!validateEmail(form.email)) newErrors.email = "Enter a valid email.";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "purchaser", ...form })
    );
    onSubmit({ role: "purchaser", email: form.email });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
          required
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          required
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          required
        />
        {errors.password && (
          <p className="text-xs text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Sign up as Purchaser"}
      </button>
    </form>
  );
}

/* ----- Vendor Sign Up Form ----- */
function VendorSignup({ onSubmit }) {
  const [form, setForm] = useState({ business: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.business.trim())
      newErrors.business = "Business name is required.";
    if (!validateEmail(form.email)) newErrors.email = "Enter a valid email.";
    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("user", JSON.stringify({ role: "vendor", ...form }));
    onSubmit({ role: "vendor", email: form.email });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business / Farm Name
        </label>
        <input
          name="business"
          value={form.business}
          onChange={handleChange}
          className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 ${
            errors.business ? "border-red-500" : "border-gray-200"
          }`}
          required
        />
        {errors.business && (
          <p className="text-xs text-red-600 mt-1">{errors.business}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          required
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          required
        />
        {errors.password && (
          <p className="text-xs text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Sign up as Vendor"}
      </button>
    </form>
  );
}

/* ----- Main Sign Up Page ----- */
export default function SignupPage() {
  const [role, setRole] = useState("purchaser");
  const [message, setMessage] = useState(null);

  const handleSuccess = (payload) => {
    setMessage({
      type: "success",
      text: `Welcome, ${payload.role} registered as ${payload.email}!`,
    });
    setTimeout(() => (window.location.href = "/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left image section */}
        <div className="rounded-xl overflow-hidden shadow-md bg-white">
          <div className="relative h-64 sm:h-80 lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=1600&q=80&auto=format&fit=crop"
              alt="Farm background"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="text-white text-2xl font-bold leading-tight">
                Grow together with LocalFarm.
              </h3>
              <p className="text-white/90 mt-2 text-sm max-w-xs">
                Join our network of local farmers and conscious customers.
              </p>
            </div>
          </div>
        </div>

        {/* Right form section */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
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
              <p className="text-sm text-gray-500 mt-1">Create your account</p>
            </div>

            {/* Role toggle */}
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
                >
                  Vendor
                </button>
              </div>
            </div>
          </div>

          {/* Social signup */}
          <div className="grid gap-3 mb-4">
            <SocialButton
              provider="Google"
              onClick={() => alert("Google signup clicked")}
            >
              Sign up with Google
            </SocialButton>
            <SocialButton
              provider="Apple"
              onClick={() => alert("Apple signup clicked")}
            >
              Sign up with Apple
            </SocialButton>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or sign up with email
              </span>
            </div>
          </div>

          {/* Form */}
          {role === "purchaser" ? (
            <PurchaserSignup onSubmit={handleSuccess} />
          ) : (
            <VendorSignup onSubmit={handleSuccess} />
          )}

          {message && (
            <div
              className={`mt-4 text-sm rounded-md px-3 py-2 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
