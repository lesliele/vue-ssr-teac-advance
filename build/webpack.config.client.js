const path = require('path')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const VueServerPlugin = require('vue-server-renderer/client-plugin')

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]

let config
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: 'resources/[path][name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            // css modules
            // {
            //   loader: 'css-loader',
            //   options: {
            //     modules: {
            //       localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //     },
            //     localsConvention: 'camelCase'
            //   }
            // },
            'css-loader',
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
      headers: {
        'Access-Control-Allow-origin': '*'
      },
      hot: true,
      historyApiFallback: {
        index: '/public/index.html' // 由于在服务器中不存在路由的映射关系，所以找不到对应的路径导致报错,需要重定向到index.html(即app.vue)
      }
    },
    plugins: [
      ...defaultPlugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new VueServerPlugin()
    ]
  })
} else {
  config = merge(baseConfig, {
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                publicPath: '/public/',
                limit: 1024,
                name: 'resources/[path][name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.styl(us)?$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { modules: true }
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
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      ...defaultPlugins,
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      }),
      new VueServerPlugin()
    ]
  })
}

module.exports = config
