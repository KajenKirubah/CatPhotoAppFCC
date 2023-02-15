const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const currentTask = process.env.npm_lifecycle_event;

let plugins = [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), 
    new HtmlWebpackPlugin({
        filename: '[name].[contenthash].html',
        template: './app/index.html'
    })
];

module.exports = {
  entry: {
    mainJS: "./app/scripts/App.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /(node_modules)/,
        use: [currentTask == "dev" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  mode: "development",
  
  devServer: {
    static: {
      directory: path.resolve(__dirname, "app"),
    },
    watchFiles: ['./app/**/*.html'],
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  },
};

/*** 
* Stuff to do
1) the mini extract css plugin isnt working, because they use condition to check if production or development
figure out how to add this to the cat photo app
2) add the html webpack plugin, without this, the webpack config file deletes all files in the docs folder once the build is started
3) add the css minimizer, depending on if its production or not (should work in development too)
*
**/
