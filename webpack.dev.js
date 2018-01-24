const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',
        'babel-polyfill',
        './index.js'],
        
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
  });