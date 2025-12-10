const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const path = require("path");

module.exports = merge.merge(common, {
  mode: "development",
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, ".."),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client:{
      overlay: true,
    },
    liveReload: false,
  },
});
