import Request from '../luch-request/index.js'
import configService from './config.service.js'
import store from '../../store/index'
let apiUrl = configService.apiUrl

const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('access_token')
	} catch (e) {
		//TODO handle the exception
		console.log('getTokenFailed', token)
	}
	return token
}

const http = new Request()
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseUrl = apiUrl /* 根域名不同 */
	config.header = {
		...config.header,
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => {
	/* 请求之前拦截器 */
	//tip.alert('before request:' + config)
	// console.log('------请求设置------', getTokenStorage())
	config.header = {
		...config.header,
		'Authorization':'Bearer '+ 	getTokenStorage(), //getTokenStorage()
	}
	/*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
	return config
})

// 必须使用异步函数，注意
http.interceptor.response(
	async (response) => {
		/* 请求之后拦截器 */
		// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
		//   return Promise.reject(response)
		// }
		if (response) {
		// 	let data = response.data
		// 	const token = getTokenStorage()
		// 	console.log('response------->',response)
			// console.log('------响应状态------', data)
			// switch (data.code) {
			// 	case 403:
			// 		tip.error('拒绝访问')
			// 		break
			// 	case 510:4
			// 		break
			// 	case 500:
			// 		if (data.message.includes('Token失效，请重新登录')) {
			// 			uni.removeStorageSync(ACCESS_TOKEN)
			// 		}

			// 		break
			// 	case 404:
			// 		break
			// 	case 504:
			// 		break
			// 	case 401:
			// 		break
			// 	default:
			// 		tip.error({
			// 			duration: 1000,
			// 			//forbidClick: true,
			// 			message: data.message,
			// 		})
			// 		break
			// }
		}
		return response
	},
	(response) => {
		// 请求错误做点什么
		console.log('请求错误做点什么', response)
		uni.showToast({
			title: response.data.error,
			icon:'none',
			duration: 2000
		  });
		let url = response.config.url

		if (response) {
			let data = response.data
			console.log('------异常响应------', data.status);
			switch (data.status) {
				case 400:
					uni.showToast({
						title: response.data.error,
						icon:'none',
						duration: 2000
					  });
				break
				case 401:
					this.$Router.push({
						path: 'pages/auth/auth',
					})
				break
				case 403:
					uni.showToast({
						title: '没有权限操作',
						icon:'none',
						duration: 2000
					  });
				break
				case 404:
					uni.showToast({
						title: '未找到该数据',
						icon:'none',
						duration: 2000
					  });
				break
				case 422:
					uni.showToast({
						title: '表单校验失败',
						icon:'none',
						duration: 2000
					  });
				break
				case 500:
					uni.showToast({
						title: '表单校验失败',
						icon:'none',
						duration: 2000
					  });
				break
				default:
					uni.showToast({
						title: data.message,
						icon:'none',
						duration: 2000
					  });
					break
			}
		}
		return response
	}
)

export { http }
