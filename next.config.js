/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    allowFutureImage: true,
    remotePatterns: [
      {
        // protocol: 'http',
        hostname: 'localhost'
        // port: '2000',
        // pathname: '**'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
