import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // linea de docker
  /*   output: "standalone", */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
