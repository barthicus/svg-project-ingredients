/* eslint import/no-extraneous-dependencies: "off" */
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    clientLogLevel: "error",
    compress: true,
    stats: "errors-only",
    host: 'localhost',
    port: 4000,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    contentBase: [ 'src' ],
    watchContentBase: true
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new SimpleProgressWebpackPlugin(),
  ],
})
