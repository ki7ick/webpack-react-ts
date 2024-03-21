const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devServerConfig = require("../config/devServer.config");
const getWebpackConfig = require("../config/webpack.config");

process.env.NODE_ENV = "development";

const compiler = Webpack(getWebpackConfig("development"));
const server = new WebpackDevServer(devServerConfig, compiler);

server.start();
