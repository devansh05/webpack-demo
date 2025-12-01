const path = require("path");
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //entry point where webpack starts the build process from
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
    // publicPath: "https://aws.s3.com/something/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(ttf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        ],
      },
    ],
  },
  plugins:[
   new TerserPlugin(),
   new MiniCssExtractPlugin({
    filename: "styles.css",
   })
  ]
};
