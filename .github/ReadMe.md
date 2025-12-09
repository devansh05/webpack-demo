# Copilot Instructions for `webpack-demo`

These instructions help AI coding agents work productively in this repo. The workspace contains three Webpack 5 projects demonstrating Module Federation:

- `dashboard`: container host consuming remotes
- `hello-mfe`: remote exposing UI components
- `kiwi-mfe`: remote exposing UI and also consuming `hello-mfe`

## Architecture Overview

- **Module Federation**: Each app uses `ModuleFederationPlugin`.
  - `hello-mfe` (`port 9001`): exposes `./HelloWorldButton` and `./HelloWorldPage` from `src/components/...` via `name: "HelloWorldApp"` and `filename: remoteEntry.js`.
  - `kiwi-mfe` (`port 9002`): consumes `HelloWorldApp@http://localhost:9001/remoteEntry.js`, exposes `./KiwiPage` via `name: "KiwiApp"`.
  - `dashboard` (`port 9000`): container that consumes both remotes via
    - `HelloWorldApp@http://localhost:9001/remoteEntry.js`
    - `KiwiApp@http://localhost:9002/remoteEntry.js`
- **Outputs & publicPath**: Remotes set `output.publicPath` to their dev server URL so containers locate `remoteEntry.js`.
- **Entrypoints**:
  - `hello-mfe/src/hello-world.js`
  - `kiwi-mfe/src/kiwi.js`
  - `dashboard/src/dashboard.js`
- **HTML generation**: Each remote uses `HtmlWebpackPlugin` with Handlebars templates (`src/page-template.hbs`) for standalone pages (`hello-world.html`, `kiwi.html`).
- **Styling & assets**: SCSS via `sass-loader` and `style-loader` in remotes; `MiniCssExtractPlugin` in `dashboard`. Images in `kiwi-mfe` handled via `type: "asset"`.

## Dev & Build Workflows

Run each app independently in separate terminals.

- `dashboard`
  - Dev: `npm run dev` (serves on `http://localhost:9000`)
  - Build: `npm run build`
  - Start (Express): `npm run start`
- `hello-mfe`
  - Dev: `npm run dev` (serves on `http://localhost:9001` and writes `hello-world.html` to `dist`)
  - Build: `npm run build`
  - Start (Express): `npm run start`
- `kiwi-mfe`
  - Dev: `npm run dev` (serves on `http://localhost:9002` and writes `kiwi.html` to `dist`)
  - Build: `npm run build`
  - Start (Express): `npm run start`

Notes:

- For the container (`dashboard`) to resolve remotes, both `hello-mfe` and `kiwi-mfe` must be running so their `remoteEntry.js` files are reachable.
- The remotes write to disk in dev (`devMiddleware.writeToDisk: true`), generating `dist/remoteEntry.js` and HTML files.

## Conventions & Patterns

- **Module exposure**: Use clear exposure keys and paths in `ModuleFederationPlugin.exposes`. Example (`hello-mfe/webpack.dev.config.js`):
  ```js
  exposes: {
    './HelloWorldButton': './src/components/hello-world-button/hello-world-button.js',
    './HelloWorldPage': './src/components/hello-page/hello-page.js'
  }
  ```
- **Remote consumption**: Reference remotes using the `name@url/remoteEntry.js` format in `remotes`. Example (`dashboard/webpack.dev.config.js`):
  ```js
  remotes: {
    HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js',
    KiwiApp: 'KiwiApp@http://localhost:9002/remoteEntry.js'
  }
  ```
- **Transpilation**: Babel with `@babel/preset-env` across projects; class properties plugin in remotes where needed.
- **Templates**: Handlebars templates in remotes at `src/page-template.hbs` drive static page generation.
- **CSS handling**:
  - Remotes: `style-loader` + `css-loader` + `sass-loader`
  - Container: `MiniCssExtractPlugin` for extracted bundles

## Common Tasks for Agents

- **Add a new remote component** (e.g., in `hello-mfe`):
  - Create component under `src/components/<feature>/<feature>.js` (+ optional `.scss`).
  - Expose via `ModuleFederationPlugin.exposes` using a stable key.
  - If needed, render via the entry script and include styles.
- **Consume a remote in the container**:
  - Update `dashboard/webpack.dev.config.js` `remotes` if URL/name changes.
  - Import exposed modules in `dashboard/src/dashboard.js` using the configured exposure key.
- **Add a new page in a remote**:
  - Extend `HtmlWebpackPlugin` in the remote config with an additional `filename` and `template` or create another plugin instance.
- **Adjust ports/paths**:
  - Keep `devServer.port` aligned with `output.publicPath`. Changing ports requires updating `remotes` URLs in consumers.

## External Dependencies

- Webpack 5 (`webpack`, `webpack-cli`, `webpack-dev-server`)
- Babel (`@babel/core`, `babel-loader`) and preset(s)
- Express for simple servers (`src/server.js` in each app)
- `html-webpack-plugin`, `clean-webpack-plugin`, `mini-css-extract-plugin`
- SCSS toolchain in remotes (`sass`, `sass-loader`, `style-loader`, `css-loader`)
- Handlebars (`handlebars`, `handlebars-loader`) in remotes

## Quick Start (macOS zsh)

Open three terminals and run from each app directory:

```sh
# Terminal 1
cd dashboard
npm install
npm run dev

# Terminal 2
cd ../hello-mfe
npm install
npm run dev

# Terminal 3
cd ../kiwi-mfe
npm install
npm run dev
```

Visit `http://localhost:9000` (container). Ensure `9001` and `9002` serve `remoteEntry.js`.

---

If anything here is unclear or missing (e.g., specific import examples in `dashboard/src/dashboard.js`), tell me what you want documented and I’ll refine this file.
