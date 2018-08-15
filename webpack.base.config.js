const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.png$|.jpg$|.svg$|.jpeg$|.ico$/,
				loader: 'file-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss', '.less', '.css', '.json', '.png'],
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'assets/img', to: 'img' }]),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
	optimization: {
		splitChunks: {
			name: 'vendor',
			minChunks: 2,
		},
	},
};
