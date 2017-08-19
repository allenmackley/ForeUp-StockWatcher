var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: './app/javascript/application.js',
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'underscore-template-loader'
      }
    ]
  },
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore'
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
