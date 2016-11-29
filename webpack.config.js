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
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
