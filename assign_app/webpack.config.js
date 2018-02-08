const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    OptimizeJsPlugin = require('optimize-js-plugin'),

    env = process.env.NODE_ENV || 'development',

    plugins = [new HtmlWebpackPlugin({
        template: './src/index.ejs',
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
        './app.js'
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
