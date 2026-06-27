/** @type {import('next').NextConfig} */
module.exports = {
  // Ensure Turbopack knows the correct project root (the directory containing package.json)
  turbopack: {
    root: __dirname,
  },
  // Allow external images from Unsplash via remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};
