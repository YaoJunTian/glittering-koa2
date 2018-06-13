const Router = require('koa-router');//路由模块
const router = new Router();

const port = require('./route.port');//处理请求接口
const page = require('./route.page');//处理页面路由
const api = require('../models/model');
const errorHandler = require('./errorhandler');//处理404以及500



module.exports = (app) => {

    errorHandler(app);
    
    app.use(router.routes()).use(router.allowedMethods());//需要注册路由中间件

    router.get(['/index', '/', '/index.html'], page.index);

    router.all('/spitdata',port.spitdata);
    
    router.get('/getdata',api.getdata);


    // // router.get('*',port.indexRedirect);//回首页重定向

};