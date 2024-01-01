const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    resolve :{
        alias: {
            classes: path.resolve(__dirname, "src/scripts/classes/"),
            components: path.resolve(__dirname, "src/scripts/components/"),
            functions: path.resolve(__dirname, "src/scripts/functions/"),
            styles: path.resolve(__dirname, "src/styles"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
            {
                 test: /\.txt$/,
                 use: 'raw-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
};