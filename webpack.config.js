const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    entry: ["./src/fastIterationMap.js"],
    watch: true,
    output: {
        path: path.resolve('./dist'),
        filename: "FastIterationMap.min.js",
        libraryTarget: 'umd'
    },
    plugins: [new UglifyJSPlugin({sourceMap:true}) 
      ]
};