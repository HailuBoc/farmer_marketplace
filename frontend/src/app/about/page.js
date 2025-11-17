"use client";

/**
 * About page for Local Marketplace
 * - Responsive design using Tailwind CSS
 * - Information about the marketplace, mission, and values
 */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-gray-700">
          Welcome to our Local Marketplace! We are dedicated to connecting local
          farmers, artisans, and producers with consumers who value fresh,
          sustainable, and high-quality products.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Our Mission
        </h2>
        <p className="mt-2 text-gray-700">
          Our mission is to support local economies by providing a platform for
          small-scale producers to showcase their goods. We believe in the power
          of community and strive to create a marketplace that fosters
          relationships between consumers and producers.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Our Values
        </h2>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          <li>
            **Sustainability:** We prioritize eco-friendly practices and
            products.
          </li>
          <li>
            **Quality:** We ensure that all products meet high standards of
            quality.
          </li>
          <li>
            **Community:** We support local businesses and promote community
            engagement.
          </li>
          <li>
            **Transparency:** We believe in open communication and honesty with
            our customers.
          </li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-gray-800">Join Us</h2>
        <p className="mt-2 text-gray-700">
          Whether you're a consumer looking for fresh produce or a local
          producer wanting to reach more customers, we invite you to join our
          marketplace. Together, we can build a sustainable future for our
          community.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Contact Us
        </h2>
        <p className="mt-2 text-gray-700">
          If you have any questions or would like to learn more about our
          marketplace, feel free to{" "}
          <a href="/contact" className="text-green-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
