// webpack.config.js
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'lodash-es': 'lodash'
    },
    fallback: {
      "crypto": false,
      "stream": false,
      "util": false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: true,
      minify: isProd
    }),
    new Dotenv(),
    isProd && new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: true
    })
  ].filter(Boolean),
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            dead_code: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug']
          },
          mangle: true
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 25,
      maxAsyncRequests: 30,
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        // React and core dependencies
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
          name: 'framework',
          chunks: 'all',
          priority: 40,
          enforce: true
        },
        // Dynamic Labs SDK
        dynamic: {
          test: /[\\/]node_modules[\\/]@dynamic-labs[\\/]/,
          name: 'npm.dynamic-labs',
          chunks: 'async',
          priority: 35
        },
        // MetaMask SDK
        metamask: {
          test: /[\\/]node_modules[\\/]@metamask[\\/]/,
          name: 'npm.metamask',
          chunks: 'async',
          priority: 35
        },
        // Ethers and related
        ethersLib: {
          test: /[\\/]node_modules[\\/](ethers|@ethersproject)[\\/]/,
          name: 'npm.ethers',
          chunks: 'async',
          priority: 35
        },
        // Chain Registry
        chain: {
          test: /[\\/]node_modules[\\/]chain-registry[\\/]/,
          name: 'npm.chain-registry',
          chunks: 'async',
          priority: 30
        },
        // Common utilities
        utils: {
          test: /[\\/]node_modules[\\/](lodash|bignumber\.js|bn\.js)[\\/]/,
          name: 'npm.utils',
          chunks: 'async',
          priority: 25
        },
        // Default vendor bundle
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'npm.vendor',
          chunks: 'async',
          priority: 20,
          reuseExistingChunk: true,
          minSize: 10000
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: isProd ? 'warning' : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true
  },
  devtool: isProd ? 'source-map' : 'eval-source-map'
};