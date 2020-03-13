const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: "development",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }, 
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),//实例化，参数为目录
  ]
};