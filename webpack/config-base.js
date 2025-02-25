const path = require('path');

module.exports = [
  {
    entry: {
      proofs: './main.tsx',
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        'src': path.resolve('./src'),
      },
    },
    context: path.resolve('./src'),
    output: {
      filename: '[name].js',
      globalObject: 'this',
      publicPath: "/gfoust/classes/hnrs2050/proofs/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.scss$/,
          loader: 'style-loader',
        },
        {
          test: /\.scss$/,
          loader: 'css-loader',
        },
        {
          test: /\.scss$/,
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              path: __dirname,
            }
          },
        },
        {
          test: /\.scss$/,
          loader: 'sass-loader',
        },
        {
          test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[path][name].[ext]',
                  }
              }
          ]
        }
      ],
    },
  }
];
