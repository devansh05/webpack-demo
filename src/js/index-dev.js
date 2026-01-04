import "webpack-hot-middleware/client";
import { reloadAppForDev } from "./index.js";

if (module.hot) {
  module.hot.accept("./index.js", function () {
    console.log("🔁  HMR Reloading...");
    reloadAppForDev();
  });
}
