const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./js/app.js",
  },
  output: {
    filename: "js/[name]-bundle-[contenthash:6].js",
    path: path.resolve(__dirname, "../", "docs"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.sass|scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[contenthash:6].[ext]",
              publicPath: "./public/assets",
              outputPath: "./public/assets",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 70,
                progressive: true,
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./[name]-bundle-[contenthash:6].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/img",
          to: "img",
        },
      ],
    }),
  ],
};
