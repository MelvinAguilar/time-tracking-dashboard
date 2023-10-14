/** @type {import('next').NextConfig} */
const CompressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  webpack: function(config) {
    config.plugins.push(new CompressionPlugin());
    
    return config;
  }
}

module.exports = nextConfig