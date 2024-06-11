/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'budget-breakdown-account-images.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
