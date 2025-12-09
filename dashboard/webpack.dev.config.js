const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: "./src/dashboard.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // public path is where the other apps can find remoteEntry.js file for this mfe
    publicPath: "http://localhost:9000/",
  },
  mode: "development",
  devServer: {
    port: 9000,
    index: "dashboard.html",
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: {
      index: "dashboard.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "Dashboard",
      description: "Dashboard container",
    }),
    new ModuleFederationPlugin({
      // name from which this app will be used by other apps, but this is the container app
      name: "App",
      // no need to add remote entry here as we not exposing anything from container
      // filename: "remoteEntry.js",
      // this is the container app, hence it uses remotes, where we'll list all the modules exposed by other app with that exact name set in ModuleFederationPlugin of mini app
      remotes: {
        // HelloWorld is the name of app that was exported by other mini app, and after @ is the path that will be used to consume remoteEntry.js file exposed from that app
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
        KiwiApp: "KiwiApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
