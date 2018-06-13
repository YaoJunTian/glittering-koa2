const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

const webpackCommon = require('./webpack.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const options = {
    mode: 'production',
    module: {
        rules: []
    },
    plugins: [
        new ExtractTextPlugin('public/styles/[name].[hash:5].css')
    ]
}

const _options = _.mergeWith(webpackCommon.prod, options);
module.exports = _options;