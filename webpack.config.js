// webpack.config.js
var webpack = require("webpack");

module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    path: './build', // 图片和 JS 会到这里来
    publicPath: 'http://7xrp2j.com1.z0.glb.clouddn.com/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader'},
      {test: /\.scss$/,   loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  }
};