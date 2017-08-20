var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './app/javascript/packs/driver.js',
    './app/javascript/stockwatcher/styles/stocks.scss'
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'underscore-template-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  output: {
    path: __dirname + '/public',
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore'
    }),
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: true
    })
  ],
  resolve: {
    modules: [__dirname + '/node_modules', __dirname + '/app']
  },
  resolveLoader: {
    modules: [__dirname + '/node_modules']
  },
  devServer: {
    clientLogLevel: 'none',
    host: "local.foreup.com",
    port: 8080,
    publicPath: "/public/js/",
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
};
