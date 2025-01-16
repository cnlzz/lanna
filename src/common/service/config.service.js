let BASE_URL = ''

if (process.env.NODE_ENV == 'development') {
	// #ifdef H5
	BASE_URL = '/api' // 开发环境
	// #endif

	// #ifndef H5
	BASE_URL = process.env.VUE_APP_HOST + 'api' // 开发环境
	// #endif
} else {
	BASE_URL = process.env.VUE_APP_HOST + 'api' // 生产环境
}
let staticDomainURL = BASE_URL + '/sys/common/static'

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL,
}

export default configService
