const express = require("express");
const path = require("path");

const app = express();
const expressStaticGzip = require("express-static-gzip");

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, "../dist");
const STATIC_PREFIX = "/static";

if (process.env.NODE_ENV === "development") {
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const configuration = require("../webpack/webpack.dev.config");
  const webpack = require("webpack");
  const webpackCompiler = webpack(configuration);

  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  );

  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));
}
app.use(
  STATIC_PREFIX,
  expressStaticGzip(DIST_DIR, {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
  })
);

// Serve the built SPA for every other route so deep links keep working.
app.get("/", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
