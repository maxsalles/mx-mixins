const path = require('path')

const library = {
  name: 'mixins',
  version: '0.1.0'
}

module.exports = () => {
  const filename = `${library.name}.min.js`

  return {
    entry: './src/index.js',
    devtool: 'inline-source-map',

    output: {
      path: path.resolve('dist', 'mx', library.version),
      filename,
      library: library.name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'typeof self !== "undefined" ? self : this'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        }
      ]
    }
  }
}
