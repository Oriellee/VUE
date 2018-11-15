module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    // 前端文件项目路径。
    baseUrl: '/static/',
    // baseUrl: '',

    outputDir: 'dist',
    configureWebpack: {
        performance: {
            hints: "warning", // enum
            maxAssetSize: 9048576, // int (in bytes),
            maxEntrypointSize: 9048576, // int (in bytes)
        }
    },
    devServer: {
        // port: 8000, // 端口号
        // host: 'localhost',
        // https: false, // https:{type:Boolean}
        // open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/api',   // 需要请求的地址
                changeOrigin: true,  // 是否跨域
                ws: true,                         // proxy websockets 加上这一句试试看
                pathRewrite: {
                    '^/api': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            }

        },  // 配置多个代理
    }
};