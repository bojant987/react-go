const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const VENDOR_LIBS = ['react', 'redux', 'react-redux', 'react-dom', 'react-router', 'react-router-dom', 'redux-thunk'];

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: false,
		url: false,
	},
};

const resolveUrlLoader = {
	loader: 'resolve-url-loader',
	options: {
		sourceMap: false,
		fail: true,
	},
};

const sassLoader = {
	loader: 'sass-loader',
	options: {
		outputStyle: 'compressed',
		sourceMap: false,
	},
};

const scssLoader = [cssLoader, 'postcss-loader', resolveUrlLoader, sassLoader];

module.exports = merge(baseConfig, {
	devtool: 'cheap-module-source-map',
	mode: 'production',
	entry: {
		bundle: './src/index.jsx',
		vendor: VENDOR_LIBS,
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					cssLoader,
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					...scssLoader,
				],
			},
		],
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					compress: {
						warnings: false,
					},
				},
			}),
		],
	},
});
