module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    // 前端文件项目路径。
    baseUrl: '/static/',
    outputDir: 'dist',
    configureWebpack: {
        performance: {
            hints: "warning", // enum
            maxAssetSize: 1048576, // int (in bytes),
            maxEntrypointSize: 1048576, // int (in bytes)
        }
    }
}