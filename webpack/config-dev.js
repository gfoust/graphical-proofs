const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./config-base');

module.exports = [
  merge(base[0], {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    devServer: {
      client: {
        overlay: false,
      },
      compress: true,
      historyApiFallback: true,
      hot: false,
      static: {
        directory: path.join(__dirname, '../static'),
        publicPath: "/proofs",
        watch: {
          ignored: [ 'node_modules', '**/*.spec.ts' ],
        }
      },
      host: '0.0.0.0',
    }
  }),
  // merge(base[1], {
  //   mode: 'development',
  //   devtool: 'inline-cheap-module-source-map',
  //   output: {
  //     path: path.resolve(__dirname, '../dist')
  //   },
  // })
]