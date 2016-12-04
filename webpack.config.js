const path = require('path');

const precss = require('precss');
const cssnext = require('postcss-cssnext');

module.exports = {
  context: path.join(__dirname, '/assets/scripts'),
  entry: {
    mashup: './index',
  },
  output: {
    path: path.join(__dirname, '/public/scripts'),
    publicPath: '/scripts',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|pcss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[hash:base64:6]',
          'postcss-loader',
        ],
      },
      {
        test: /\.svg/,
        loaders: [
          'url-loader',
          'svgo-loader',
        ],
      },
    ],
  },
  resolve: {
    root: [
      path.resolve('/node_modules'),
      path.resolve('/assets/scripts'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  postcss: [
    precss,
    cssnext({ browsers: ['last 5 versions'] }),
  ],
};
