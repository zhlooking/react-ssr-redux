const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require('path');

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new ExtractTextPlugin({
      filename: "assets/css/[name].css"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: { importLoaders: 1, minimize: true }
            }, {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: { importLoaders: 1, minimize: true  }
          }, {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer()] }
          }, 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "assets/media/[hash:16].[ext]",
              publicPath: url => url.replace(/assets/, ""),
              emit: false
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              optipng: { optimizationLevel: 3 },
              pngquant: false,
            },
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
        ]
      }
    ],
  },
}
