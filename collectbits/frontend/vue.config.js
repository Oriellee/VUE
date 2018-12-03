module.exports = {
    baseUrl: '/static/',//打包时在url中寻找的路径。
    outputDir: 'dist',//打包所存放的路径。
    // 配置代理。
    devServer: {
        proxy: {
            '/api': {//代理名称
                target: 'http://127.0.0.1:8000/api',//代理到的地址。
                changeOrigin: true,//是否跨域
                ws: true,// proxy websockets 加上这一句试试看
                pathRewrite: {
                    '^/api': '' // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            }
        },
    },
    lintOnSave: false,//编译时，config是否报错。
};