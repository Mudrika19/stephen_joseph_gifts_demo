/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'x-tenant',
              value: '(.*)',
            },
          ],
        },
      ];
    },
};

export default nextConfig;
