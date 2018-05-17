
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config= {
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['url-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['url-loader']
			}
		]
	},
	devtool: 'eval-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'production',
			template: './index.html'    
		}),
		// hot 检测文件改动替换plugin
		new webpack.NamedModulesPlugin(),      
		new webpack.HotModuleReplacementPlugin()		
	],
       // webpack-dev-server 配置
	devServer: {
		contentBase: './dist',
		hot: true
	},
};

module.exports = config;