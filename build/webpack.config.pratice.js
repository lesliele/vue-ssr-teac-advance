const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })
]

module.exports = merge(baseConfig, {
  entry: path.join(__dirname, '../pratice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },
              localsConvention: 'camelCase'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 8088,
    // 方便内网的调试
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    ...defaultPlugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    // import Vue from 'vue'
    // 默认情况下，开发环境引用vue.runtime.esm.js;线上环境引用vue.runtime.min.js
    // 有runtime的无法进行template编译,需要使用vue.esm.js
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  }
})
