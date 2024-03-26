const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const DevServerConfig = require("../config/devServer.config");
const GetWebpackConfig = require("../config/webpack.config");

process.env.NODE_ENV = "development";

const compiler = Webpack(GetWebpackConfig("development"));
const server = new WebpackDevServer(DevServerConfig, compiler);

server.start();
