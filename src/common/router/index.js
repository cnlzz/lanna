// router.js
import { RouterMount, createRouter } from './uni-simple-router'
import { isWeiXin } from '../util/CustomUtil.js'
import store from '../../store'

const scrollInfo = {}
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	h5: {
		paramsToQuery: true,
		vueRouterDev: false,
		scrollBehavior: (to, from, savedPosition) => {
			const XY = scrollInfo[to.name]
			if (XY) {
				return XY
			}
			return savedPosition
		},
		// scrollBehavior: (to, from, savedPosition) => {
		//   // `to` 和 `from` 都是路由对象
		//   console.log('h5~to:', to);
		//   console.log('h5~from:', from);
		//   console.log('h5~savedPosition:', savedPosition);
		// },
	},
	routes: [
		...ROUTES,
		{
			path: '*',
			redirect: to => {
				return { name: 'error' }
			},
		},
	],
})
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('全局路由前置守卫to:', to)
	console.log('全局路由前置守卫from:', from)
	// store.commit('setCurrentPage', to.name);
	console.log('我是ie:::', window.isIE())
	scrollInfo[from.name] = {
		x: window.scrollX,
		y: window.scrollY,
	}
})

export { router, RouterMount }
