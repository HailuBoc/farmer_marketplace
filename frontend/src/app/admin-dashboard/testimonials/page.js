"use client";
import { useEffect, useState } from "react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/testimonials", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        setTestimonials(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        Testimonials
      </h1>
      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div
            key={t.id ?? idx}
            className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-green-100">
                <img
                  alt={t.name ?? "User"}
                  src={
                    t.avatar ??
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      t.name ?? "User"
                    )}`
                  }
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t.name ?? "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(t.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 line-clamp-4">
              {t.message ?? "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
