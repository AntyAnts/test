const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { option } = require('commander');
const isDev = process.env.NODE_ENV === "development"
console.log(isDev);
module.exports = {
    mode: 'development',
    entry:{
        main:"./src/index.js"
    },
    output:{
        filename: "[name].[contenthash].js",
        path:isDev ? path.resolve(__dirname,"dist") : path.resolve("../prod/src/")
    },
    resolve:{
        alias:{
            "@prod":path.resolve("../prod/src")
        }
    },
    optimization:{
        splitChunks:{
            chunks: 'all'
        }
    },
    devServer:{
        port:3000
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: !isDev
        }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.s(a|c)ss$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test:/\.(jp(e*)g)|(png)|(gif)/,
                type: "asset/resource"
            }
        ]
    }


}