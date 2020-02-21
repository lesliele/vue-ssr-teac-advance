/*
 * @Author: your name
 * @Date: 2020-02-19 18:00:28
 * @LastEditTime: 2020-02-20 15:26:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ssr-tech-advance\build\vue-loader.config.js
 */
// const docLoader = require.resolve('./doc-loader.js');
module.exports = (isDev) => {
    return {
        // preserveWhitespace: false,//默认true，保留空格
        // extractCSS: false,
        // postcss,
        // loaders: {
        //     'docs': docLoader
        // },
        // preLoaders: {}, //解析前使用的loader
        // postLoaders: {} //解析后使用的loader
        // cssModules: {
        //     localIdentName: '[path]-[name]-[hash:base64:5]',
        //     camelCase: true
        // }
        // 下列选项已经被废弃了
        // loader
        // preLoaders
        // postLoaders
        // postcss
        // cssSourceMap
        // buble
        // extractCSS
        // template

        // 以下可以使用的v15
        // hotReload: false //关闭热重载
        // compilerOptions: {
        //     preserveWhitespace: false //默认开启
        // }
    }
}