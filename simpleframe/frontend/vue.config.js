module.exports = {
    baseUrl: '/static/',
    outputDir: 'dist',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    lintOnSave: false,
    configureWebpack: {
        externals: {
            "BMap": "BMap",
        }
    }
};