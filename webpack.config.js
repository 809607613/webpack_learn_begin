const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'eval-source-map',
    //入口文件
    entry: __dirname + "/app/main.js",
    //打包输出
    output: {
        //打包后的文件目录
        path: __dirname + "/build",
        //打包输出文件名
        filename: "bundle.js"
    },
    //webpack自带的服务器，基于nodejs的服务器实现
    devServer: {
        //本地服务器加载页面所载目录
        contentBase: __dirname + "/build",
        //将所有链接只指定index.html 实现单页
        historyApiFallback: true,
        //修改入口目录下所有文件时，实时刷新
        inline: true,
        hot: true
    },
    //loader用于转换文件，告诉浏览器识别
    module: {
        rules: [
            {
                //遇到jsx或者js文件
                test: /(\.jsx|\.js)$/,
                //调用以下的loader
                use: {
                    loader: 'babel-loader',
                },
                //由于babel配置复杂，因此把相关的配置放到.babelrc目录下
                // use: {
                //     //使用babel平台的loader进行编译转换jsx, js
                //     loader: "babel-loader",
                //     //分别使用env, react 模块来解析
                //     options: {
                //         //高速babel，使用env，react标识来转换
                //         presets: [
                //             "env", "react"
                //         ]
                //     }
                // },
                //除了node_modules不转换
                exclude: /node_modules/
            },

            //转换css文件
            {
                test: /\.css$/,
                use: [
                    {
                        //进行特殊的如scss那种转换
                        loader: "style-loader"
                    },
                    {
                        //进行 如@import url等方法转换
                        loader: "css-loader",
                        options: {
                            //启用modules
                            modules: true,
                            //指定css类名格式 name文件名，local样式类名 hash base64 5随机加密 长度为5
                            localIdentName: '[name]_[local]--[hash:base64:5]'
                        }
                    },
                    {
                        //使用postcss预处理器，给不同浏览器css加上前缀
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    //插件，用于拓展
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            //filename指定生成的文件目录
            filename: __dirname + '/build/index.html',
            //template指定模板的目录
            template: __dirname + "/app/index.tpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
}
//入口文件：告诉webpack（这个js他里有所有的require, import的依赖）这是个单页
//出口文件，根据入口文件以及所有的依赖打包成一个bundle.js出口文件，index.html引入这个js文件即可
// loader 配置在 module.rules下，用于把不同的文件进行编译转换。