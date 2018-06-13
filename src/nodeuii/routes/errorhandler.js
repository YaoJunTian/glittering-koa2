const log4js = require('log4js');//log库
const log4Config = require('../config/log4.config');

module.exports = (app) => {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            log4js.configure(log4Config);
            log4js.getLogger('请求故障').error(`服务器故障 : 500，请求方式：${ctx.method}， 请求地址： ${ctx.url}`);
            await ctx.render('error/error.html', {
                title: `500`,
                data: `服务器出错。`
            });
        };
    });
    app.use(async (ctx, next) => {
        await next();
        if (ctx.status != 404) return;
        log4js.configure(log4Config);
        log4js.getLogger('请求故障').error(`服务器故障 404"，请求方式：${ctx.method}， 请求地址： ${ctx.url}`);
        ctx.status = 404;
        await ctx.render('error/error.html', {
            title: `404`,
            data: `您访问的页面未找到！`
        });
    });
}