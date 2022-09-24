const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
	entry: './src/index.ts',
	module: {
		exprContextRegExp: /^\.\/.*$/,
        unknownContextRegExp: /^\.\/.*$/,
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader',
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(ts)$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			}
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[contenthash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			minify: true,
			inject: true,
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new WebpackManifestPlugin({}),
		new CleanWebpackPlugin(),
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.ts', '.css', '.scss'],
	}
}
