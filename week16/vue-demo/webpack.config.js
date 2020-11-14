const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            // ... other rules
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
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
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
};

