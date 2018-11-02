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
    }
}