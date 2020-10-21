const path = require("path");
const webpack = require("webpack");


// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const isDevelopment = false;

module.exports = (_, {mode}) => ({
    entry: "./src/js/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            "@css": path.resolve(__dirname, 'src/css/'),
            "@lib": path.resolve(__dirname, 'src/js/lib/'),
            "@client": path.resolve(__dirname, 'src/js/client/'),
            "@server": path.resolve(__dirname, 'src/js/server/'),
            "@chess": path.resolve(__dirname, 'src/js/chess/'),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        host: "0.0.0.0",
        port: 8000,
        disableHostCheck: true,   // That solved it
    },
    externals: {
        react: 'React',
        reactDom: 'ReactDOM',
        ably: 'Ably',
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            publicPath: "",
        }),
        new WebpackCdnPlugin({
            publicPath: '/node_modules',
            modules: [
                {
                    name: "react",
                    var: "React",
                    path: "umd/react.development.js"
                },
                {
                    name: "react-dom",
                    var: "ReactDOM",
                    path: "umd/react-dom.development.js"
                },
                {
                    name: "ably",
                    var: "Ably",
                    prodUrl: "https://cdn.ably.io/lib/ably.min-1.js",
                    devUrl: "https://cdn.ably.io/lib/ably.min-1.js",
                },
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css'
        }),
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node\n',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader?modules=true",
                    "sass-loader",
                ],
            },
        ],
    },
});
