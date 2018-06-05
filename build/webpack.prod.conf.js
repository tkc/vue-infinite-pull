const path = require('path');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'vue-infinite-pull': './src/components/InfinitePull.vue'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: '/',
		library: 'VueInfinitePull',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.min.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.(vue|js)$/,
				enforce: 'pre',
				include: [path.join(__dirname, './src'), path.join(__dirname, './test')],
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.js$/,
				include: [path.join(__dirname, './src'), path.join(__dirname, './test')],
				loader: 'babel-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					postcss: [require('autoprefixer')]
				}
			}
		]
	}
};

if (process.env.NODE_ENV !== 'production') {
	// development configurations
	module.exports.plugins = [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './example/index.html',
			inject: false
		})
	];
	module.exports.devtool = '#cheap-module-eval-source-map';
}