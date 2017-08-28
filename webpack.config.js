const path = require('path');
const webpack = require('webpack');

process.noDeprecation = true;

module.exports = {
    watch: true,
    cache: true,
    context: __dirname,
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname + '/public/'),
        publicPath: '/public/'
    },
    devServer: {
        contentBase: './views',
        stats: {
            colors: true,
            errorDetails: true
        },
        inline: true,
        port: 4747
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ],
        alias: {
            js: __dirname
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            {
                test: [/\.scss$/],
                use: [
                    {
                        loader: "style-loader" 
                    },
                    {
                        loader: "css-loader" 
                    },
                    {
                        loader: "sass-loader" 
                    }
                ]
            },
            {
                test: [/\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf|ico)(\?.*$|$)/i],
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]'
                    }
                ]
            }

        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}