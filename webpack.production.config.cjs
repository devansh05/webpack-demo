const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  //entry point where webpack starts the build process from
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    //index.html file generated from HTMLWebPackPlugin, is already in dist, hence need to remove dist/ from publicPath
    // publicPath: "dist/",
    publicPath: "",
    // publicPath: "https://aws.s3.com/something/",
    // alternate for CleanWebpackPlugin
    // clean:{
    // dry: true,
    // keep: /files you want to prevent from deleting\.js/
    // }
  },
  mode: "production",
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
        test: /\.(hbs)$/i,
        use: ["handlebars-loader"],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        //now it'll not delete anything inside build folder
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    new HTMLWebPackPlugin({
      title: "My Webpack App",
      meta: {
        description: "A simple webpack app",
      },
      template: "src/app.hbs"
    }),
  ],
};
