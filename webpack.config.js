const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // webpack4以后替换extract-text-webpack-plugin成为提取css插件
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name]-[hash].js",
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                exclude: path.resolve(__dirname, './node_modules'),
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,   // 开发：页面；  生产：独立css
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff)$/,
                loader: 'url-loader',
                exclude: /node_modules/,
                include: /src/,
                options: {
                    limit: 1000,
                    name: 'static/[name]-[hash].[ext]'  //放置位置和名称放到一起
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "src/index.html",  // 以根目录下的index.html为模板
            inject: 'body',  // 文件放在head标签还是body
            title: "Webpack is awesome!",
            // minify: {   // 是否对代码进行压缩
            //     collapseWhitespace: true,   // 去掉空格
            //     removeComments: true,   // 去掉注释
            // }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash].css',  //放置位置和名称放到一起

        }),
        new CleanWebpackPlugin('dist')
    ],
    devServer: {
        index: 'index.html',
        hot: true,
        contentBase: path.join(__dirname, 'dist'),  // 服务器根目录
        compress: true,
        port: 9000
    }
};
