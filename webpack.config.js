const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
var ManifestPlugin = require('webpack-manifest-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].[contenthash:8].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    bundle: './app/src/index.js',
    styles: './app/styles/main.scss'
  },
  output: {
    path: path.resolve(__dirname, 'deploy/static'),
    publicPath: "static/",
    filename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    loaders: [
      {
        test: /[.]html$/,
        loader: 'html-loader?' + JSON.stringify({ pretty: true })
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader?sourceMap'],
          fallback: 'style-loader'
        })
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff" +
          "&hash=sha512&digest=hex&name=fonts/[name].[ext]?[hash:8]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?hash=sha512&digest=hex&name=fonts/[name].[ext]?[hash:8]"
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]?[hash:8]',
        ],
      }
    ]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new CopyWebpackPlugin([{
      from: 'app/favicon.ico',
    }, {
      from: 'app/robots.txt'
    }, {
      from: 'app/404.html'
    }
    ])
  ],
};
