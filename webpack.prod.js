const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader', 'postcss-loader'
                ]
            })
        }]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(['dist/*.*']),
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            allChunks: true
        })
    ]
});