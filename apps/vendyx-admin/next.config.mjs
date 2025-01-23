/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/shops',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
