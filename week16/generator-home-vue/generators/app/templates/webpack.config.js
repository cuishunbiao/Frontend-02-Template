const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    entry: './main.js',
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns:[
                {
                    from:'src/*.html', to: '[name].[ext]'
                }
            ]
        })
    ]
};