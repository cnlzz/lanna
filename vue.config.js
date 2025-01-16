const path = require('path')
const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
function resolve(dir) {
	return path.join(__dirname, dir)
}
const baseURL = process.env.VUE_APP_DOMAIN
// vue.config.js
module.exports = {
	publicPath: './',
	configureWebpack: (config) => {
		// 生产环境取消 console.log
		if (process.env.NODE_ENV === 'production') {
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
		}
		config.plugins.push(
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath'],
					})
					return JSON.stringify(tfPages.routes)
				}, true),
			})
		)
	},
	transpileDependencies: ['uview-ui'],
	devServer: {
		port: 3000,
		open: true,
		host: 'webapps-dev.3m.com.cn',
		proxy: {
			'/api': {
				target: baseURL, //需要代理的域名
				//ws: false,
				changeOrigin: true,
				// pathRewrite: {'^/api' : ''}
			},
			'/req': {
				target: baseURL, //需要代理的域名
				//ws: false,
				changeOrigin: true,
				pathRewrite: { '^/req': '' },
			},
		},
	},
}
