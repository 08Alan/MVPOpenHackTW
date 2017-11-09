const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'public');

module.exports = {
  watch: true,
  cache: true,
  devtool: 'cheap-source-map',
  context: srcPath,
  entry: {
    index: './index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      core: path.resolve(srcPath, 'core'),
      components: path.resolve(srcPath, 'views/components'),
      pages: path.resolve(srcPath, 'views/pages')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {modules: false}], 'react'],
            plugins: ['transform-class-properties']
          }
        }]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options : {
              url: false
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js', minChunks: 2})],
  devServer: {
    contentBase: distPath,
    compress: true,
    port: 8080
  }
};
