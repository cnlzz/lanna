import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
import apiService from './api/api'
import { router, RouterMount } from './router/index' //路径换成自己的

import lannaHeader from './components/header'
Vue.config.productionTip = false
String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, 'gm'), s2)
}
Vue.use(uView)
Vue.use(router)
// 如此配置即可
uni.$u.config.unit = 'rpx'
Vue.prototype.$api = apiService
App.mpType = 'app'
Vue.component('lannaHeader', lannaHeader)
const app = new Vue({
	...App,
	store,
})
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif
