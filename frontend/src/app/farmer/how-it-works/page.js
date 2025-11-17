"use client";

import Image from "next/image";

function StepCard({ number, title, text, image }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
          <span className="bg-green-100 px-2 py-0.5 rounded-full">
            {number}
          </span>
          Step {number}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            How LocalFarm Marketplace Works
          </h1>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Whether you’re a local farmer or a conscious consumer, LocalFarm
            makes it simple to connect, sell, and buy fresh produce directly
            from your community — no middlemen.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <StepCard
          number="1"
          title="Farmers Apply to Join"
          text="Local farmers register with their farm details and list what they produce. Each application is reviewed to ensure authenticity and local origin."
          image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80&auto=format&fit=crop"
        />
        <StepCard
          number="2"
          title="Product Listings Go Live"
          text="Approved farmers create listings with photos, descriptions, and pricing. Customers can browse by category, farm, or location."
          image="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=80&auto=format&fit=crop"
        />
        <StepCard
          number="3"
          title="Buyers Order Fresh, Local Goods"
          text="Buyers add products to their cart and place orders directly from local farmers. Payments are handled securely through the platform."
          image="https://images.unsplash.com/photo-1586201375761-83865001e17d?w=1200&q=80&auto=format&fit=crop"
        />
        <StepCard
          number="4"
          title="Delivery or Pickup Options"
          text="Each seller chooses how they deliver — home delivery, pickup points, or on-farm collection. Buyers get notified once their order is ready."
          image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80&auto=format&fit=crop"
        />
        <StepCard
          number="5"
          title="Support & Trust"
          text="We ensure verified sellers, fair pricing, and responsive customer support to make every transaction smooth and trustworthy."
          image="https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200&q=80&auto=format&fit=crop"
        />
      </section>

      {/* Benefits / Why LocalFarm */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Why Choose LocalFarm
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Empowering Farmers",
                text: "Farmers keep more of their earnings and gain visibility in their community.",
                icon: "🌱",
              },
              {
                title: "Fresh & Transparent",
                text: "Buyers know exactly where their food comes from — fresh, traceable, and seasonal.",
                icon: "🥕",
              },
              {
                title: "Sustainable Community",
                text: "Buying local reduces waste, supports small farms, and strengthens local economies.",
                icon: "🤝",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-6 bg-green-50 rounded-lg text-center hover:bg-green-100 transition"
              >
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {b.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to be part of it?</h2>
          <p className="mt-3 text-green-100 max-w-2xl mx-auto">
            Join our marketplace today — start selling your local produce or
            discover fresh food nearby.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/farmer"
              className="px-6 py-3 bg-white text-green-700 font-medium rounded-md hover:bg-green-50 transition"
            >
              Become a Seller
            </a>
            <a
              href="/"
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-green-700 transition"
            >
              Start Buying
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
