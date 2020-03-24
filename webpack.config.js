/** @format */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = require('./helpers/isProduction');

module.exports = {
  context: path.join(__dirname, '/assets/'),
  entry: {
    mashup: ['./scripts/index'],
  },
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: isProduction ? '/' : 'http://localhost:8080/',
    filename: './scripts/[name].js',
    chunkFilename: './scripts/[name].[chunkhash].js',
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
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: './scripts/mashup.js',
    }),
    new MiniCssExtractPlugin({
      filename: isProduction
        ? './stylesheets/[name].[hash].css'
        : './stylesheets/[name].css',
      chunkFilename: isProduction
        ? './stylesheets/[id].[hash].css'
        : './stylesheets/[id].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: 'warning',
  },
};
