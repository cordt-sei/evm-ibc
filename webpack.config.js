// webpack.config.js
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
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
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'lodash-es': 'lodash'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new Dotenv(),
    process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin()
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          dead_code: true
        }
      }
    })],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        default: false,
        defaultVendors: false,
        framework: {
          name: 'framework',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          priority: 40,
          enforce: true
        },
        chainRegistry: {
          test: /[\\/]node_modules[\\/]chain-registry[\\/]/,
          name: 'chain-registry',
          chunks: 'async',
          priority: 30
        },
        dynamicLabs: {
          test: /[\\/]node_modules[\\/]@dynamic-labs[\\/]/,
          name: 'dynamic-labs',
          chunks: 'async',
          priority: 30
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
          chunks: 'async',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map'
};