var webpack = require('webpack');

module.exports = {    
    output: {
        filename: 'bundle.js',
        publicPath: ''
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['stage-0', 'env', 'react']
                }
            }
        ]
    },

    externals: {
        'Config': JSON.stringify(require('./config.json'))
      }    
}
