// ...existing code...
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
/**
 * Farmer Registration / "Become a Seller" page
 * - Client component for Next.js App Router
 * - Tailwind CSS for responsive, accessible layout
 * - Local demo storage (replace with your API)
 *
 * Sections:
 *  - Intro / hero
 *  - Benefits / why join
 *  - Application form (with image upload & preview)
 *  - Steps & FAQ
 *  - Success confirmation
 *
 * Notes:
 *  - In production, replace localStorage usage and simulated API with server calls.
 *  - If using next/image with external domains, add them to next.config.js images.domains.
 */

/* Demo storage key */
const STORAGE_KEY = "localfarm_vendor_applications_v1";

/* Basic validators */
const isEmail = (s) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).toLowerCase());
const isPhone = (s) => /^\+?[0-9\s\-()]{6,20}$/.test(String(s));
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
/* Small component: Badge */
function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      {children}
    </span>
  );
}

/* Small component: InfoCard */
function InfoCard({ title, children, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-50 text-green-600">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{children}</p>
        </div>
      </div>
    </div>
  );
}

/* Application form */
export default function FarmerPage() {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [products, setProducts] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [terms, setTerms] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // {type:'success'|'error', text}
  const fileRef = useRef(null);

  useEffect(() => {
    if (!photoFile) return;
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(photoFile);
    return () => {
      // cleanup
    };
  }, [photoFile]);

  const validate = () => {
    const e = {};
    if (!businessName.trim())
      e.businessName = "Business / farm name is required.";
    if (!ownerName.trim()) e.ownerName = "Owner / contact name is required.";
    if (!isEmail(email)) e.email = "Enter a valid email.";
    if (phone && !isPhone(phone))
      e.phone = "Enter a valid phone number (or leave empty).";
    if (!city.trim()) e.city = "City / region is required.";
    if (!products.trim()) e.products = "Describe main products you sell.";
    if (!terms) e.terms = "You must agree to the terms to proceed.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setBusinessName("");
    setOwnerName("");
    setEmail("");
    setPhone("");
    setCity("");
    setProducts("");
    setBankDetails("");
    setWebsite("");
    setTerms(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    setErrors({});
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) {
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    const payload = {
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      products: products.trim(),
      bankDetails: bankDetails.trim(),
      website: website.trim(),
      photo: photoPreview, // base64 or null
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/farmers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus({
        type: "success",
        text: "Application submitted successfully!",
      });

      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        text: "Submission failed. Please try again later.",
      });
    } finally {
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / intro */}
      <Navbar />
      <section className="bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge>For Farmers</Badge>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Join LocalFarm — sell directly to your community
              </h1>
              <p className="mt-4 text-gray-700 max-w-lg">
                Reach local buyers, control pricing, and grow a sustainable
                business. Apply to become a verified seller and start listing
                your produce and goods in minutes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/farmer/how-it-works"
                  className="inline-flex items-center px-5 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
                >
                  How it works
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <InfoCard
                  title="Fast Onboarding"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m4 0h.01M12 3v3m6 2l-2 1M4 7l2 1"
                      />
                    </svg>
                  }
                >
                  Simple form, quick review.
                </InfoCard>
                <InfoCard
                  title="Fair Fees"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
                      />
                    </svg>
                  }
                >
                  Transparent, low commission.
                </InfoCard>
                <InfoCard
                  title="Local Customers"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                      />
                    </svg>
                  }
                >
                  Connect with nearby buyers.
                </InfoCard>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1600&q=80&auto=format&fit=crop"
                alt="Farmer and fresh produce"
                width={1200}
                height={800}
                className="object-cover w-full h-64 sm:h-80 lg:h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status banner */}
        {status && (
          <div
            className={`mb-6 rounded-md px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {status.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <section
              id="application"
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Seller Application
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill out the form to apply. We typically review applications
                    within 2–3 business days.
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Step 1 of 2</p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business / Farm name
                    </label>
                    <input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
                        errors.businessName
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="ownerName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Owner / Contact
                    </label>
                    <input
                      id="ownerName"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
                        errors.ownerName ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.ownerName && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.ownerName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.email}
                      </p>
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
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City / Region
                    </label>
                    <input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website / Social (optional)
                    </label>
                    <input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://..."
                      className="mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="products"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Products you sell (short)
                  </label>
                  <input
                    id="products"
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    placeholder="e.g., tomatoes, eggs, honey"
                    className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition ${
                      errors.products ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.products && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.products}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bankDetails"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bank details / payout info (optional)
                  </label>
                  <input
                    id="bankDetails"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    placeholder="Account number / PayPal / mobile pay"
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition border-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile photo or farm image (optional)
                  </label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {photoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-xs text-gray-400">No image</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={(ev) => {
                          const f = ev.target.files?.[0] || null;
                          if (f && f.size > 5_000_000) {
                            setErrors((prev) => ({
                              ...prev,
                              photo: "Image must be under 5MB.",
                            }));
                            return;
                          }
                          setErrors((prev) => ({ ...prev, photo: undefined }));
                          setPhotoFile(f);
                        }}
                        className="text-sm"
                      />
                      {errors.photo && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.photo}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Accepted: JPG, PNG. Max 5MB. We'll use this on your
                        seller profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#terms" className="text-green-600 hover:underline">
                      Marketplace terms
                    </a>{" "}
                    and confirm that I am authorized to sell these products.
                    {errors.terms && (
                      <div className="text-xs text-red-600 mt-1">
                        {errors.terms}
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit application"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </section>

            {/* Steps & FAQ */}
            <section
              id="how-it-works"
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  How onboarding works
                </h3>
                <ol className="mt-4 space-y-4 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 text-green-600 font-semibold">
                      1
                    </div>
                    <div>
                      Application review by our team (1–3 business days).
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 text-green-600 font-semibold">
                      2
                    </div>
                    <div>
                      Verification and profile setup — we help you list your
                      first products.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 text-green-600 font-semibold">
                      3
                    </div>
                    <div>
                      Start selling — receive orders, manage availability, and
                      get paid.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="text-sm font-semibold text-gray-900">
                  Frequently asked
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li>
                    <strong>Fees?</strong> We charge a small commission; we’ll
                    share clear terms after approval.
                  </li>
                  <li>
                    <strong>Delivery?</strong> You choose delivery or pickup per
                    product.
                  </li>
                  <li>
                    <strong>Support?</strong> Get onboarding help and local
                    marketing tips.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Right: Sidebar - resources & CTA */}
          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-900">
                Ready to grow?
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                Join hundreds of local sellers reaching customers who prefer
                fresh, local food.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="#contact"
                  className="inline-flex items-center px-3 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
                >
                  Contact us
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-sm font-semibold text-gray-900">
                Tips for a great listing
              </h5>
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li>Use clear photos of your product.</li>
                <li>State unit, weight, and any certifications.</li>
                <li>Keep inventory up to date for best customer experience.</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-sm font-semibold text-gray-900">Support</h5>
              <p className="text-sm text-gray-600 mt-2">
                Need help with your application? Email{" "}
                <a
                  href="mailto:vendors@localfarm.example"
                  className="text-green-600 hover:underline"
                >
                  vendors@localfarm.example
                </a>
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Small footer CTA */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Questions about selling?{" "}
            <a
              href="mailto:vendors@localfarm.example"
              className="text-green-600 hover:underline"
            >
              Contact our team
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/farmer/how-it-works"
              className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
            >
              Learn more
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
// ...existing code...
