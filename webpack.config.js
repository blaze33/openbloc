const path = require('path')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

module.exports = function (env) {
  const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].css?[contenthash:8]',
    disable: env === 'dev'
  })
  const github = env === 'github'
  const dev = env === 'dev'

  return {
    entry: {
      bundle: './app/src/index.js',
      styles: './app/styles/main.scss'
    },
    output: {
      path: github ? path.resolve(__dirname, 'gh-pages') : path.resolve(__dirname, 'deploy/static'),
      publicPath: github || dev ? '' : 'static/',
      filename: `js/[name].js${env === 'dev' ? '' : '?[chunkhash:8]'}`
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader'
        }, {
          test: /[.]html$/,
          loader: 'html-loader?' + JSON.stringify({ pretty: true })
        }, {
          test: /\.scss$/,
          use: extractSass.extract({
            use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
            fallback: 'style-loader',
            publicPath: '../'
          })
        }, {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff' +
            '&hash=sha512&digest=hex&name=fonts/[name].[ext]?[hash:8]'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?hash=sha512&digest=hex&name=fonts/[name].[ext]?[hash:8]'
        }, {
          test: /\.(jpe?g|png|gif|svg|ico)$/,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]?[hash:8]'
          ]
        }
      ]
    },
    plugins: [
      extractSass,
      new HtmlWebpackPlugin({
        template: 'app/index.html'
      }),
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'app/*.html'))
      }),
      new CopyWebpackPlugin([{
        from: 'app/favicon.ico'
      }, {
        from: 'app/robots.txt'
      }, {
        from: 'app/404.html'
      }
      ])
    ],
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true
    },
    devtool: env === 'dev' ? 'source-map' : false
  }
}
