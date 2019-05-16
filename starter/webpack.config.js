const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

console.log(path);
module.exports = {
    entry:['babel-polyfill','./src/js/index.js'],

    output:{
        path : path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    devServer:{
        contentBase: './dist' 
    },

    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    module: { // object passed , 1st prop : 'rules'
        rules: [                            
            {   //tests for all files which end with .js --> all JAVASCRIPT files
                test: /\.js$/,  
                //excludes the node-modules (they are indirect dependencies and need not be converted to ES5 )
                exclude: /node-modules/,    
                use:
                {
                    //uses babel-loader on 'test' files (all JS files except node-modules)
                    loader: 'babel-loader'  
                }
            }
        ]
    }
};