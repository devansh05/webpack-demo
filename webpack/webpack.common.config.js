const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{ loader: "html-loader" }],
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html", // name of generated file, useful if you want to generate more than one file
      template: "./src/template.html", // source file for custom html file template
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../images"),
          to: path.resolve(__dirname, "../dist/public/images"),
        },
      ],
    }),
  ],
};

module.exports = config;
