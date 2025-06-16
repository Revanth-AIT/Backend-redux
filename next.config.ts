import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remove the deprecated experimental.turbo completely
  // Add this if you need to transpile MUI modules
  transpilePackages: ['@mui/x-data-grid', '@mui/material'],
  
  // Webpack configuration to handle CSS files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },

  // Other Next.js configurations...
}

export default nextConfig