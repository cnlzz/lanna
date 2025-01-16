import mmmApi from './api'
export const wechatCode2session = ({ code, appid = process.env.VUE_APP_ID }) => {
	return new Promise((resolve, reject) => {
		mmmApi.wechatCode2session({ code, appid }).then((res) => {
			console.log(res)
			let result = res.data
			if (result.success) {
				resolve(result.result)
			} else {
				uni.$u.toast(result.message)
				setTimeout(() => {
					resolve(false)
				}, 1500)
			}
		})
	})
}
// export const wechatGetUserPhone = ({ js_code,code, appid = process.env.VUE_APP_ID }) => {
// 	return new Promise((resolve, reject) => {
// 		mmmApi.wechatGetUserPhone({ js_code,code, appid }).then((res) => {
// 			console.log(res)
// 			let result = res.data
// 			if (result.success) {
// 				resolve(result.result)
// 			} else {
// 				uni.$u.toast(result.message)
// 				setTimeout(() => {
// 					resolve(false)
// 				}, 1500)
// 			}
// 		})
// 	})
// }
export const wechatSaveMiniUser = (params, appId = process.env.VUE_APP_ID) => {
	let data = { ...params, appId }
	return new Promise((resolve, reject) => {
		mmmApi.wechatSaveMiniUser(data).then((res) => {
			console.log(res)
			let result = res.data
			if (result.success) {
				resolve(result.success)
			} else {
				uni.$u.toast(result.message)
				setTimeout(() => {
					resolve(false)
				}, 1500)
			}
		})
	})
}
