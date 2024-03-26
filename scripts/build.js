const webpack = require("webpack");
const chalk = require("chalk");
const getWebpackConfig = require("../config/webpack.config");

const compiler = webpack(getWebpackConfig("production"));

process.env.NODE_ENV = "production";

console.log(chalk.blue("[Start]: => Start building..."));

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    return;
  }

  const info = stats.toJson();
  console.log(chalk.blue("[Detail]: =>"), "\n");
  console.log({
    assets: info.assets,
    hash: info.hash,
    builtAt: info.builtAt,
    assetsByChunkName: info.assetsByChunkName,
  });

  console.log(
    chalk.green(
      `[Success]: => compiled in ${info.time} ms by webpack ${info.version}`
    )
  );

  if (stats.hasErrors()) console.error(info.errors);

  if (stats.hasErrors()) {
    console.error(info.errors);
    console.log("==========>", "\n");
    console.error(stats.toString("errors-only"));
  }
  if (stats.hasWarnings()) console.warn(info.warnings);

  compiler.close(closeErr => {
    if (closeErr) {
      console.log("[Close]: => error:", closeErr);
    }
  });
});
