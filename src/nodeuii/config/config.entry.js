const path = require('path');
const configDev = require('./config.dev');
const configProd = require('./config.prod');

let config = {
    publicPath :  path.join(__dirname, '../../web/public/')//静态资源目录
};

module.exports = (env,_)=>{
    if(!env || env === 'dev'){
        return _.extend(config,configDev);
    }else if(env === 'prod'){
        return  _.extend(config,configProd);
    }else{
        return  _.extend(config,configProd);
    };
};