const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '/assets/'),
  entry: {
    mashup: [
      'react-hot-loader/patch',
      './scripts/index',
    ],
  },
  output: {
    path: path.join(__dirname, '/public/'),
    publicPath: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/',
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
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(css|pcss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[hash:base64:6]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.svg/,
        use: [
          'url-loader',
          'svgo-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['./scripts/mashup.js'],
    }),
    new ExtractTextPlugin({
      filename: './stylesheets/mashup.css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: 'warning',
  },
};
