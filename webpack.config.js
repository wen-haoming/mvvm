const path = require("path")
const webpack = require('webpack')
module.exports = {
    entry:path.resolve(__dirname,'src/main.js'),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            {}
        ]
    },
    devtool:'source-map'
}
