const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')

const env = process.env.NODE_ENV || 'development'

const plugins = [new HtmlWebpackPlugin({
        title: "test",
        template: './views/index.ejs',
        filename: 'index.html',
        inject: 'body'
        })
    ];

console.log('NODE_ENV:', env);

if (env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        })
    );
}

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        path:__dirname + '/dist',
        filename: 'app.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: __dirname + '/node_modules'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: plugins
}
