const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const paths = require("./paths");

module.exports = DEV => {
  const getCSSRule = (modules, sass) => {
    return [
      DEV ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules,
        },
      },
      "postcss-loader",
      sass && "sass-loader",
    ].filter(Boolean);
  };

  return {
    mode: DEV ? "development" : "production",
    ...(DEV && { devtool: "eval-source-map" }),
    entry: paths.appEntry,
    output: {
      clean: true,
      path: paths.appBuild,
      filename: "js/[name].[chunkhash:8].js",
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
      ],
    },
    plugins: [
      !DEV &&
        new MiniCssExtractPlugin({
          filename: "css/[name].css",
        }),
      new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        template: paths.appHtml,
      }),
    ].filter(Boolean),
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
