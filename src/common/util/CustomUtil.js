const getCookie = function(cname) {
	var name = cname + '='
	var decodedCookie = decodeURIComponent(document.cookie)
	var ca = decodedCookie.split(';')
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i]
		while (c.charAt(0) == ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ''
}
const isWeiXin = function() {
	var ua = window.navigator.userAgent.toLowerCase()
	if (ua.indexOf('micromessenger') > -1 || uni.getStorageSync('isWeChat')) {
		return true
	} else {
		return false
	}
}
const setCookie = function(name, value, days) {
	var expires = ''
	if (days) {
		var date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = '; expires=' + date.toUTCString()
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
const clearCookie = function(name) {
	setCookie(name, '', -1)
}
const getParam = function(attr) {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	return urlParams.get(attr)
}

const getServerTime = function() {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest()
		if (!xhr) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP')
		}
		xhr.open('HEAD', '/')
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				resolve(new Date(xhr.getResponseHeader('date')))
			}
		}
		xhr.send(null)
	})
}

const filterObjInArr = (key, value, arr = []) => {
	return arr.find(obj => {
		return obj[key] === value
	})
}

const findObjIdxInArr = (key, value, arr = []) => {
	return arr.findIndex(obj => {
		return obj[key] === value
	})
}

const getSystemInfo = () => {
	if (!window.navigator) {
		return 'app'
	} else if (navigator.userAgent.indexOf('Mobile') > -1) {
		return 'mobile'
	} else {
		return 'pc'
	}
}

const getServerDateStamp = () => {
	const promise = new Promise(function(resolve, reject) {
		const handler = function() {
			if (this.readyState !== 4) {
				//4-Done
				return
			}
			if (this.status === 200) {
				resolve(new Date(xhr.getResponseHeader('Date')).getTime())
			} else {
				resolve(new Date().getTime())
				//reject(new Error(this.statusText));
			}
		}
		const xhr = new XMLHttpRequest()
		const resURL =
			process.env.NODE_ENV === 'development'
				? '/req/s_time/'
				: process.env.VUE_APP_DOMAIN + 's_time'
		xhr.open('GET', resURL)
		xhr.timeout = 1000
		xhr.onreadystatechange = handler
		xhr.ontimeout = function() {
			console.log('timeout')
			resolve(new Date().getTime())
		}
		xhr.send(null)
	})

	return promise
}
// 获取父窗口的url
const getParentUrl = () => {
	var url = null
	if (parent !== window) {
		try {
			url = parent.location.href
		} catch (e) {
			url = document.referrer
		}
	}
	return url
}

const getMoblieOS = () => {
	let u = navigator.userAgent
	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
	let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	if (isAndroid) {
		return 'Android'
	}
	if (isIOS) {
		return 'IOS'
	}
}

const getBlobBannerURL = id => {
	let timeStamp = new Date().getTime()
	return process.env.VUE_APP_MULTIMEDIA + id + '/banner.png?ts=' + timeStamp
}

const getBackupBannerURL = id => {
	let timeStamp = new Date().getTime()
	return (
		process.env.VUE_APP_DOMAIN +
		'api/lms/attachment/preview/image/?id=' +
		id +
		'&name=banner.png&ts=' +
		timeStamp
	)
	// return '';
}
// 获取页面url
const getQueryStringParams = function(query) {
	return query
		? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function(params, param) {
				var words = param.split('=')
				var key = words[0]
				var value = words[1]
				params[key] = value ? decodeURIComponent(value) : ''
				return params
		  }, {})
		: {}
}

/**
 * 此方法 用于解决 部门,用户，token为 undefined 登录兼容处理用
 * constant (包含 DEPARTMENT,CURRENT_USER_INFO,ACCESS_TOKEN)等常量
 * department 部门值；
 * data : 设置的值
 */
const formatStorage = function(constant, department, data) {
	let newDepartment = ''
	let oldDepartmentArr = constant.split('_')
	let oldDepartment = oldDepartmentArr[oldDepartmentArr.length - 1]
	// console.error(oldDepartment)
	if (oldDepartment == 'undefined' || oldDepartment == undefined) {
		oldDepartmentArr[oldDepartmentArr.length - 1] = department
		newDepartment = oldDepartmentArr.join('_')
		// console.error(oldDepartmentArr)
		if (oldDepartmentArr[3] == 'department') {
			uni.setStorageSync(newDepartment, department)
		} else {
			uni.setStorageSync(newDepartment, data)
		}
	}
}

export {
	getCookie,
	setCookie,
	isWeiXin,
	clearCookie,
	getParam,
	getServerTime,
	filterObjInArr,
	findObjIdxInArr,
	getSystemInfo,
	getServerDateStamp,
	getParentUrl,
	getMoblieOS,
	getBlobBannerURL,
	getBackupBannerURL,
	getParamForRank,
	getParamForUser,
	clearLocalStorage,
	getQueryStringParams,
	formatStorage,
}
