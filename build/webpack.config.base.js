/*
 * @Author: your name
 * @Date: 2020-02-10 15:18:06
 * @LastEditTime: 2020-02-20 15:16:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ssr-tech\webpack.config.js
 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoaderOptions = require('./vue-loader.config.js')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: path.join(__dirname, '../client/client-entry.js')
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].[hash:8].js',
    publicPath: 'http://127.0.0.1:8088/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions(isDev)
      },
      {
        resourceQuery: /blockType=docs/,
        loader: require.resolve('./doc-loader.js')
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'client')
    }
  }
}

module.exports = config
