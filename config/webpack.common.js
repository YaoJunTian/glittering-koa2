const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//配置多入口
const pagespath = path.join(__dirname, '../src/web/views');
const _entry = {};
fs.readdirSync(pagespath).map((f, i) => {
    fs.readdirSync(path.join(pagespath, f)).map((filename, index) => {
        if (/.entry.js$/.test(filename)) {
            _entry[filename.replace('.entry.js', '')] = `${pagespath}/${f}/${filename}`;
        };
    });
});

// 配置输出路径
const _outputPath = path.join(__dirname, '../build/web');

// 配置双环境输出文件名
const _outputFilenameDev = 'public/scripts/[name].bundle.js';
const _outputFilenameProd = 'public/scripts/[name].bundle.[hash:5].js';

//配置别名
const _resolve = { extensions: ['.js', '.css'] };

// 配置js文件处理方式
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
    },{
        test: /\.html$/,
        use:{loader:'html-loader'}
    }]
};
//克隆双环境loader
const _devLoaders = _.clone(_module.rules);
const _prodLoaders = _.clone(_module.rules);
// dev图片处理
_devLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf|jpeg)$/,
    loader: 'url-loader?limit=2048&name=assets/images/[name].[ext]'
});
// dev css处理
_devLoaders.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'postcss-loader', options: { path: path.join(__dirname, '../postcss.config.js') } }
    ]
});
// prod图片处理
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf|jpeg)$/,
    loader: 'url-loader?limit=2048&name=assets/images/[hash:7].[ext]'
});
// prod css处理
_prodLoaders.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
        { loader: 'postcss-loader', options: { path: path.join(__dirname, '../postcss.config.js') } }
    ]
});


//预留双环境前缀
const _publicPathDev = '';
const _publicPathProd = '';

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
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
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