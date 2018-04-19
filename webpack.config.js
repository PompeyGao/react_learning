const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "development",
    entry: {
        app: [
            'react-hot-loader/patch'
        ]
    },
    output: {
        filename: '[name].[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        historyApiFallback: true,
        hot: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader?modules&localIdentName=[local]--[hash:base64:5]', 'postcss-loader']
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});