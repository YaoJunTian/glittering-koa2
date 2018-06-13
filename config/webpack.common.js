const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pagespath = path.join(__dirname, '../src/web/views');
// const widgetpath = path.join(__dirname, '../src/web/widget');
//多入口拼接
const _entry = {};
fs.readdirSync(pagespath).map((f, i) => {
    fs.readdirSync(path.join(pagespath, f)).map((filename, index) => {
        if (/.entry.js$/.test(filename)) {
            _entry[filename.replace('.entry.js', '')] = `${pagespath}/${f}/${filename}`;
        };
    });
});
console.log(_entry);
// 配置输出路径
const _outputPath = path.join(__dirname, '../build/web');
// 配置双环境输出文件名
const _outputFilenameDev =  'public/scripts/[name].bundle.js';
const _outputFilenameProd = 'public/scripts/[name].bundle.[hash:5].js';
//配置别名
const _resolve = { extensions: ['.js', '.css'] };
//预留双环境前缀
const _publicPathDev = '';
const _publicPathProd = '';

const _module = {
    rules: [{
        test: /\.js$/,
        include: path.join(__dirname, '../src/web'),
        use: {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
                presets: ['env']
            }
        }
    }]
}

const _devLoaders = _.clone(_module.rules);
const _prodLoaders = _.clone(_module.rules);
//img上线环境改戳
_devLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf|jpeg)$/,
    loader: 'url-loader?limit=2048&name=nodeuii/assets/images/[name].[ext]'
});
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf|jpeg)$/,
    loader: 'url-loader?limit=2048&name=nodeuii/assets/images/[hash:7].[ext]'
});
// css上线环境为压缩
_devLoaders.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader', options: { importLoaders: 1} },
            { loader: 'postcss-loader', options: { path: path.join(__dirname, '../postcss.config.js') } }
        ]
    })
});
_prodLoaders.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader', options: { importLoaders: 1,minimize: true} },
            { loader: 'postcss-loader', options: { path: path.join(__dirname, '../postcss.config.js') } }
        ]
    })
});
// 集成配置
const webpackConfig = {
    dev: {
        entry: _entry,
        output: {
            path: _outputPath,
            publicPath: _publicPathDev,
            filename: _outputFilenameDev
        },
        module: {
            rules: _devLoaders
        },
        resolve: _resolve,
    },
    prod: {
        entry: _entry,
        output: {
            path: _outputPath,
            publicPath: _publicPathProd,
            filename: _outputFilenameProd
        },
        module: {
            rules: _prodLoaders
        },
        resolve: _resolve,
    }
}
module.exports = webpackConfig;