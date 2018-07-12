const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const webpackCommon = require('./webpack.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const options = {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "public/styles/style.[hash:5].css"
          }),
        new HtmlWebpackPlugin({
            filename: 'views/error/error.html',
            template: 'src/web/views/error/error.html'
        }),
        new HtmlWebpackPlugin({
            // inject:false,
            filename: 'views/index/index.html',
            template: 'src/web/views/index/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['style'],
            filename: 'views/layout/header.html',
            template: 'src/web/views/layout/header.html'
        })
    ]
}

fs.readdirSync(path.join(__dirname, '../src/web/views')).map((f, i) => {
    // console.log(`${f}+++++${i}`)
    fs.readdirSync(path.join(path.join(__dirname, '../src/web/views'), f)).map((filename, index) => {
        if (/.entry.js$/.test(filename)) {
            _entry[filename.replace('.entry.js', '')] = `${pagespath}/${f}/${filename}`;
        };
    });
});

const _options = _.mergeWith(webpackCommon.prod, options);
module.exports = _options;
// console.log(_options);