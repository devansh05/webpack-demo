const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
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
          from: "https://unsplash.com/photos/*.*",
          to: path.resolve(__dirname, "../dist/public"),
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
};

module.exports = config;
