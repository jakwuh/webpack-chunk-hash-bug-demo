const {optimize: {CommonsChunkPlugin}} = require('webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const {resolve} = require('path');
const cleanDir = require('clean-dir');

cleanDir(resolve(__dirname, 'dist'));

module.exports = {
    context: __dirname,
    entry: {
        vendor: ['lodash'],
        index: ['./src/index.js']
    },
    output: {
       filename: '[chunkhash:8].[name].js',
       chunkFilename: '[chunkhash:8].[name].js',
       path: resolve(__dirname, 'dist')
   },
   plugins: [
       new WebpackChunkHash({
           additionalHashContent(chunk) {
               return (chunk.id || '') + (chunk.ids || []).map(String).join(',');
           }
       }),
       new CommonsChunkPlugin({
           name: 'vendor'
       })
   ]
}
