const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
//const { webpack } = require("webpack");
const webpack = require("webpack");
//entry

//output

//mode





module.exports = {entry: './public/js/index.js',
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jquery: "jquery"
      }),
  ],
  mode: 'development'
};