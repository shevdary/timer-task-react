const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssPlugins = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"] // используемые плагины
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name]:[sha1:hash:3].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [miniCssPlugins.loader, "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: [
      "node_modules",
      "bower_components",
      "shared",
      "/shared/vendor/modules"
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new miniCssPlugins()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    overlay: true,
    historyApiFallback: true
  }
};