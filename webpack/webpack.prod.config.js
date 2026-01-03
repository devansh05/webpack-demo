const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  devtool: "source-map",
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-mozjpeg", { quality: 40 }],
              ["imagemin-pngquant", { quality: [0.65, 0.85], speed: 4 }],
              ["imagemin-gifsicle", { interlaced: true }],
              [
                "imagemin-svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            type: "asset",
            preset: "webp-custom-name",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [["imagemin-webp", { quality: 40 }]],
            },
          },
        ],
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      // cacheGroups: {
      //   jquery: {
      //     test: /[\\/]node_modules[\\/]jquery[\\/]/,
      //     name: "jquery",
      //     chunks: "initial",
      //   },
      //   jquery: {
      //     test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
      //     name: "bootstrap",
      //     chunks: "initial",
      //   },
      // },
      // chunks: "all",
      // cacheGroups: {
      //   node_modules: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name(module) {
      //       const context = module.context || "";
      //       const match = context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
      //       if (!match) {
      //         return "vendor";
      //       }
      //       const packageName = match[1].replace("@", "");
      //       return `vendor.${packageName}`;
      //     },
      //   },
      // },
      // chunks: "all",
      // maxSize: Infinity,
      // minSize: 10,
      // cacheGroups: {
      //   jquery: {
      //     test: /[\\/]node_modules[\\/]jquery[\\/]/,
      //     name: "jquery",
      //   },
      //   bootstrap: {
      //     test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
      //     name: "bootstrap",
      //   },
      //   lodash: {
      //     test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
      //     name: "lodash-es",
      //   },
      //   node_modules: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "node_modules",
      //   },
      // },
      chunks: "all",
      maxSize: Infinity,
      minSize: 10,
      cacheGroups: {
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          name: "jquery",
          chunks: "initial",
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
          name: "lodash-es",
          chunks: "initial",
        },
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
          chunks: "initial",
          priority: -20,
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          priority: 20,
          reuseExistingChunk: true,
          name(module, chunks) {
            const derived = (chunks || [])
              .map((chunk) => chunk && (chunk.name || chunk.id))
              .filter(Boolean)
              .join("-");
            return derived || "async";
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64]",
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ["import"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: "images/[name].[contenthash:12][ext]",
        },
        use: [],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
});
