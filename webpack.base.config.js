const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				use: 'babel-loader',
				test: /\.jsx$/,
				exclude: /node_modules/,
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000&mimetype=image/png',
			},
			{
				test: /\.jpg$/,
				loader: 'url-loader?limit=100000&mimetype=image/jpg',
			},
			{
				test: /\.svg$/,
				loader: 'url-loader?limit=100000&mimetype=image/svg',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss', '.less', '.css', '.json', '.png'],
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'assets/img', to: 'img' }]),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new ExtractTextPlugin({
			filename: '[name].[hash].css',
			allChunks: true,
		}),
	],
};
