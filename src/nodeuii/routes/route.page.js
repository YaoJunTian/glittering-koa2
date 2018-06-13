//页面路由
module.exports = {
    index: async (ctx) => {
        // throw new Error('500');
        await ctx.render('index/index.html', {
            title: `姚竣天`,
            labelP: `<p>hello JunTian·Yao</p>`,
            atrue: true,
            array: [`姚`, `竣`, `天`]
        });
    },

}