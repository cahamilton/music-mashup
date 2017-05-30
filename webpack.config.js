const path = require('path');

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
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[hash:base64:6]',
          'postcss-loader',
        ],
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: 'warning',
  },
};
