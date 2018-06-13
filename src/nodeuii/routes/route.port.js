const _ = require('lodash');
//接口/逻辑中间件
module.exports = {
    indexRedirect: ctx => {//重定向
        ctx.redirect('/');
    },
    setcookies: (ctx, next) => {
        const n = Number(ctx.cookies.get('view') || 0) + 1;
        ctx.cookies.set('view', n);
    },
    spitdata: (ctx, next) => {
        ctx.body = _.merge({
            'text': '返回的数据'
        },ctx.query)
    }
}