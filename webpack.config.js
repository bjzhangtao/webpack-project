const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // webpack4以后替换extract-text-webpack-plugin成为提取css插件
const isDev = process.env.NODE_ENV === 'development';
const includePath = path.resolve(__dirname, './src');   // include路径

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
                include: includePath,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,   // 缓存loader执行结果，提高编译速度
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                'targets': {
                                    'browsers': ['last 2 versions']
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                include: includePath,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,   // 开发：页面；  生产：独立css
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1    // css中@import后的文件也会进行编译
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                include: includePath,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/[name]-[hash].[ext]',  //放置位置和名称放到一起
                            limit: 1024 * 10,   // 单位字节 100kb
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            },
                            webp: {     // png和jpeg
                                quality: 75
                            }
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],   // extensions that are used
        alias: {

        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "src/index.html",  // 以根目录下的index.html为模板
            minify: {   // 是否对代码进行压缩
                // collapseWhitespace: true,   // 去掉空格
                // removeComments: true,   // 去掉注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash].css',  //放置位置和名称放到一起

        }),
        new CleanWebpackPlugin('dist')
    ],
    devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',  // 协助调试的一种功能，使混淆后的代码定位到开发代码
    devServer: {
        port: 9000,
        index: 'index.html',
        contentBase: path.join(__dirname, 'dist'),  // 服务器根目录
        hot: true,
        compress: true,
        proxy: {
            '/api': 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }    // 去掉uri中的/api
        }
    }
};
