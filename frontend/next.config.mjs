/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "images.unsplash.com", // allow Unsplash images
      "randomuser.me",
      "http://localhost:5000",
      "localhost", // allow Random User API images
    ],
  },
};

export default nextConfig;
