const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

const webpackCommon = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const options = {
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "public/styles/[name].css",
            chunkFilename: "[id].css"
          })
    ]
}

const _options = _.mergeWith(webpackCommon.dev, options);
module.exports = _options;
// console.log(_options.module);