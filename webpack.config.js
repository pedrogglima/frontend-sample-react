'use strict';

const path = require('path');
const dirPublic = path.resolve(__dirname, 'public');

module.exports = {
  entry: './src/index.js',
  output: {
    path: dirPublic,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: dirPublic,
    port: 3000,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
};
