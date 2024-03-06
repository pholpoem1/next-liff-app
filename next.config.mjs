/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile.line-scdn.net"
      }
    ]
  }
};

export default nextConfig;
