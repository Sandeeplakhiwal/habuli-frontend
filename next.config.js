/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dkqp81ehr/image/upload/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
