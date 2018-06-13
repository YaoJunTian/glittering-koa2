const rp = require('request-promise');
const api = require('./api');
module.exports = {
    getdata : async (ctx,next)=>{
        return await rp(api.test)
        .then(function (data) {
            ctx.body = data;
        })
        .catch(function (err) {
            ctx.body = err;
        });
    }
}