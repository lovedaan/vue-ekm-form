'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './package/index.js'
  },
 
  devtool: config.pub.productionSourceMap ? config.pub.devtool : false,
  output: {
    path: config.pub.assetsRoot,
    filename: 'form-build.js',
    library: 'FormBuild',
		libraryTarget: 'umd'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'element-ui': 'element-ui'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new MiniCssExtractPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css')
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.pub.productionSourceMap,
      parallel: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../package/package.json'),
        to: ''
      },
      {
        from: path.resolve(__dirname, '../docs/'),
        to: 'docs',
        ignore: ['.*', '_book/**']
      },
      {
        from: path.resolve(__dirname, '../docs/README.MD'),
        to: ''
      }
    ])
  ]
})

if (config.pub.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.pub.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config.pub.bundleAnalyzerReport) {
  var Visualizer = require('webpack-visualizer-plugin')
  webpackConfig.plugins.push(new Visualizer({
    filename: './statistics.html'
  }))
}

module.exports = webpackConfig
