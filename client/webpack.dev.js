const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    inline: true,
    hot: true,
    compress: false,
    historyApiFallback: true,
    port: 9000
  }
});
