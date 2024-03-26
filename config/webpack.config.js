const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const paths = require("./paths");

module.exports = (mode, analysis) => {
  const DEV = mode === "development";

  const getCSSRule = (modules, sass) => {
    return [
      DEV ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            mode: modules ? "local" : "global",
            localIdentName: DEV
              ? "[local]__[path][name]--[hash:base64:5]"
              : "[hash:base64]",
          },
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
      sass && {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
      ,
    ].filter(Boolean);
  };

  return {
    mode,
    target: "browserslist",
    devtool: DEV && "eval-source-map",
    entry: paths.appEntry,
    output: {
      clean: true,
      path: paths.appBuild,
      filename: pathData =>
        ["main", "runtime"].includes(pathData.chunk.name)
          ? "JS/[name].js"
          : "JS/[name].[chunkhash:8].js",
      assetModuleFilename: DEV
        ? "ASSETS/[ext]/[name]-[hash:8][ext][query]"
        : "ASSETS/[ext]/[hash][ext][query]",
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: paths.appSrc,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          include: paths.appSrc,
          oneOf: [
            {
              resourceQuery: /css_modules/,
              use: getCSSRule(true),
            },
            {
              use: getCSSRule(false),
            },
          ],
        },
        {
          test: /\.(scss|sass)$/,
          include: paths.appSrc,
          oneOf: [
            {
              resourceQuery: /css_modules/,
              use: getCSSRule(true, true),
            },
            {
              use: getCSSRule(false, true),
            },
          ],
        },
        {
          test: /\.(png|jpg|svg|ttf)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      !DEV && new MiniCssExtractPlugin({ filename: "CSS/[name].css" }),
      new WebpackManifestPlugin({ fileName: "JS/manifest.json" }),
      !DEV && analysis && new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        template: paths.appHtml,
      }),
    ].filter(Boolean),
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
        minSize: 1024,
        maxSize: 10240,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "_",
        enforceSizeThreshold: 30000,
        cacheGroups: {
          // more info see https://medium.com/naukri-engineering/mastering-webpack-splitchunks-plugin-tips-and-tricks-14be89f7a9e2
          common: {
            test: /[\\/]node_modules[\\/]/,
            priority: -5,
            reuseExistingChunk: true,
            chunks: "initial",
            name: "CommonApp/app",
            minSize: 0,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          reactPackage: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: "CacheGroups/vendor_react",
            chunks: "all",
            priority: 10,
          },
        },
      },
      runtimeChunk: { name: "runtime" },
    },
  };
};
