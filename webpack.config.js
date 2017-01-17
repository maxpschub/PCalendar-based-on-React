var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'eval-source-map', //配置source map
	//入口配置
	entry: {
		index:__dirname + "/src/main.js",//入口文件
		vendor:["react","react-dom"]
	},
	//出口配置
	output: {
		path: path.resolve(__dirname + "/public"),
		filename: "[name].js",
        publicPath: '/public',
        chunkFilename: "[name].js",
	},
	//处理模块
	module: {
		loaders: [ 
		//ES6-babel->ES5
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['react-hot','babel'], //babel配置在.babelrc
		},
		//(s)css->css modules
		{
			test: /\.s?css$/,
			loader: 'style!css!sass?modules!postcss'
		}]
	},
	//postcss,+前缀
	postcss: [
		require('autoprefixer')
	],
	//插件
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({//打包第三方库
            names: ['vendor'],
        }),
		new webpack.BannerPlugin('This file is created by Psc'),//添加版权注释
		new webpack.optimize.UglifyJsPlugin({//uglify
			compress:{
				warnings: false
			}
		})
	],
	//开发工具-本地服务器
	/*devServer: {
	    contentBase: "./",//本地服务器所加载的页面所在的目录
	    colors: true,//终端中输出结果为彩色
	    //historyApiFallback: true,//不跳转
	    inline: true,
	    hot:true
	}*/
}