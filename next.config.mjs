/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export",
  basePath: isProd ? "/product-counter" : "",
  assetPrefix: isProd ? "/product-counter/" : "",
};

export default nextConfig;
