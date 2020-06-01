/** @format */

import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import isProduction from './helpers/isProduction';

const config: webpack.Configuration = {
  mode: isProduction //
    ? 'production'
    : 'development',
  context: path.join(__dirname, '/assets/'),
  devtool: isProduction //
    ? 'cheap-source-map'
    : 'source-map',
  entry: {
    mashup: ['./scripts/index'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '',
    filename: !isProduction //
      ? 'scripts/[name].js'
      : 'scripts/[name].[chunkhash].js',
    chunkFilename: !isProduction //
      ? 'scripts/[name].js'
      : 'scripts/[name].[chunkhash].js',
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, '/public/'),
    publicPath: 'http://localhost:8080/',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|pcss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: isProduction
                  ? '[hash:base64:6]'
                  : '[name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: ['url-loader', 'svgo-loader'],
      },
    ],
  },
  plugins: [
    new ManifestPlugin({
      fileName: path.join(__dirname, 'rev-manifest.json'),
      writeToFileEmit: !isProduction,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: 'scripts/mashup.js',
    }),
    new MiniCssExtractPlugin({
      filename: !isProduction
        ? 'stylesheets/[name].css'
        : 'stylesheets/[name].[chunkhash].css',
      chunkFilename: !isProduction
        ? 'stylesheets/[name].css'
        : 'stylesheets/[name].[chunkhash].css',
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        cache: true, //
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      minSize: 10000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  performance: {
    hints: 'warning',
  },
};

export default config;
