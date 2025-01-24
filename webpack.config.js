// webpack.config.js
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the webpack configuration
export default {
  // Entry point for your application
  entry: './src/index.tsx',

  // Output configuration for webpack build
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true // Clean the output directory before emit
  },

  // Module rules for processing different file types
  module: {
    rules: [
      // TypeScript and React files
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      // Add support for CSS (useful for styling)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // Configure how modules are resolved
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  // Webpack plugins
  plugins: [
    // Generate HTML file with injected bundles
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),
    // Load environment variables
    new Dotenv(),
    // Bundle analyzer - only enabled when analyzing
    process.env.ANALYZE === 'true' ? new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      generateStatsFile: true,
      statsFilename: 'stats.json'
    }) : null
  ].filter(Boolean), // Remove null plugins

  // Development server configuration
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },

  // Development tools
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

  // Optimization configuration
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};