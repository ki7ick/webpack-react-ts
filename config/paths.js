"use client";

const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  resolveApp,
  appPath: resolveApp("."),
  appEntry: resolveApp("src/index.tsx"),
  appBuild: resolveApp(".dist"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("src/index.html"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appNodeModules: resolveApp("node_modules"),
};
