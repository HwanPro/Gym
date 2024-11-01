// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**', // Esto permite todas las rutas en ese dominio
      },
    ],
  },
};

export default nextConfig;
