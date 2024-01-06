/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['103.210.54.196', 'localhost'], // Izinkan host gambar dari '103.210.54.196' dan 'localhost'
    allowFutureImage: true,
    remotePatterns: [
      {
        protocol: 'http', // Izinkan host dengan protokol 'http'
        hostname: 'localhost',
        // port: '2000', (Opsional: Tambahkan jika menggunakan port selain 80)
        // pathname: '**' (Opsional: Tambahkan jika ingin mengizinkan semua path)
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true, // Gunakan SWC sebagai minifier untuk kode JavaScript
};

module.exports = nextConfig;
