const Koa = require('koa');
const serve = require('koa-static');//静态资源模块
const path = require('path');//路径处理模块
const views = require('koa-views');//模板引擎
const _ = require('lodash');//函数库
const log4js = require('log4js');//log库

const routerConfig = require('./routes/route.plant');//路由配置文件 
const Config = require('./config/config.entry');//执行配置文件，传入系统变量

const NODE_ENV = process.env.NODE_ENV;//获取系统变量

const config = Config(NODE_ENV,_);

const app = new Koa();

app.use(serve(config.publicPath));//配置静态资源

app.use(views(path.join(__dirname, '../web/views'), {
    map: {
        html: 'ejs'
    }
}));

routerConfig(app);

app.listen(config.port,()=>{
    console.log(`服务器已启动\n当前环境：${NODE_ENV}\n端口号：${config.port}`);
});//启动端口
