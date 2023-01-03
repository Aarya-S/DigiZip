/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {nextConfig,
  env:{
    API_URL: 'http://localhost:3000/api',
    SECRETKEY: 'secretkey'
  }
}
