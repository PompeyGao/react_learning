// const path = require('path');

// module.exports = {
//     /**入口 */
//     entry: path.join(__dirname,'src/index.js'),

//     /**输出到dist文件夹，输出文件名字为bundle.js */
//     output:{
//         path: path.join(__dirname, './dist'),
//         filename: 'bundle.js'
//     }
// };

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }, 
    devServer: {
        contentBase: path.join(__dirname, './dist')
    },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            //use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
            },

        }]
    }
};