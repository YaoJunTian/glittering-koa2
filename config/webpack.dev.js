const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

const webpackCommon = require('./webpack.common');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const options = {
    mode: 'development',
    module: {
        rules: []
    },
    plugins: [
        new ExtractTextPlugin(path.join(__dirname,'../build/web/public/styles/[name].css'))
    ]
}

const _options = _.mergeWith(webpackCommon.dev, options);
module.exports = _options;