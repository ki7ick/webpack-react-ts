const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const paths = require("./paths");

const getCSSRule = (modules, sass) => {
  return [
    "style-loader",
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

module.exports = DEV => {
  return {
    mode: DEV ? "development" : "production",
    ...(DEV && { devtool: "cheap-module-eval-source-map" }),
    entry: paths.appEntry,
    output: {
      clean: true,
      path: paths.appBuild,
      filename: "[name].[chunkhash:8].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
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
      new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        template: paths.appHtml,
      }),
    ],
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
