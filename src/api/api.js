import { http } from '../common/service/service.js'
const apiService = {
	// get demo
	getFAQList(params) {
		return http.get(
			`https://dam.3m.com.cn/content/dam/mmm/3mdotcom/emsd/emsd-selector/eda/json/FAQ_data_202201017.json`
		)
	},
	getABSelector(params) {
		return http.get(
			`https://dam.3m.com.cn/content/dam/mmm/3mdotcom/emsd/emsd-selector/eda/json/AB_data_20221013.json`
		)
	},
	getFAQSelector(params) {
		return http.get(
			`https://dam.3m.com.cn/content/dam/mmm/3mdotcom/emsd/emsd-selector/eda/json/FAQ_selector_20220922.json`
		)
	},
	// 根据code appid获取session_key,open_id,union_id
	wechatCode2session(params) {
		return http.post('/wechat/mini/code2session', params)
	},
	wechatDecryptUserInfo(params) {
		return http.post('/wechat/mini/decryptUserInfo', params)
	},
	// 获取用户手机号码
	wechatGetUserPhone(params) {
		return http.post('/applet/login', params)
	},
	// 产品列表
	getProductList() {
		return http.get('/applet/product/list?page=1&per_page=1')
	},
	// 产品详情
	getProductDetail(id) {
		return http.get(`/applet/product/${id}`)
	},
	// 获取会员信息
	getUserinfo() {
		return http.get('applet/user/info')
	},
	// 修改会员信息
	updateUserinfo(params) {
		return http.post('applet/user/save',params)
	},
	// 获取门店信息
	getStoreinfo(id) {
		return http.get(`applet/store/${id}`)
	},
	// 获取服务列表
	getServeList(params) {
		return http.get('applet/bookings/servers',params)
	},
	// 获取可预约时间
	getDatesList(params) {
		return http.get('applet/bookings/dates',params)
	},
	// 获取会员卡券列表
	getUserCards() {
		return http.get('applet/user/cards?page=1&per_page=12')
	},
	// 获取项目卡券
	getCardVouchers() {
		return http.get('applet/card-vouchers')
	},
	// 获取充值列表
	getRecharges() {
		return http.get('applet/recharges')
	},
	// 预约下单
	booking(params) {
		return http.post('applet/bookings',params)
	},
	// 预约支付
	bookingPay(params) {
		return http.post('applet/bookings/pay',params)
	},
	// 获取偏好列表
	getPreference() {
		return http.get('applet/user/preference')
	},
	// 设置偏好
	setPreference(params) {
		return http.post('applet/user/preference',params)
	},
	// 支付卡券
	takeOrder(params) {
		return http.post('applet/orders',params)
	},
	// 支付
	payOrder(params) {
		return http.post('applet/orders/pay',params)
	},
	// 查询用户积分
	userPoints() {
		return http.get('applet/user/points')
	},
	// 活动查询支付状态
	checkOrderStatus(params) {
		return http.get('applet/orders/check',params)
	},
	// 预约查询支付状态
	checkBookingStatus(params) {
		return http.get('applet/bookings/pay/check',params)
	},
	// 门店评价列表
	getStoreEvaluation(id) {
		return http.get(`applet/evaluation/${id}`)
	},
	// 积分、余额明细
	getCurrencyLogs(params) {
		return http.get('applet/user/currency-logs',params)
	},
	// 服务订单列表
	getServiceOrderLogs(params) {
		return http.get('applet/bookings',params)
	},
	// 服务订单取消订单
	cancelServiceOrder(params) {
		return http.post('applet/bookings/cancel',params)
	},
	// 商品订单下单
	getProductOrder(params) {
		return http.post('applet/product_order',params)
	},
	// 商品支付
	payProductOrder(params) {
		return http.post('applet/product_order/pay',params)
	},
	// 商品订单列表
	getProductOrderLogs(params) {
		return http.get('applet/product_order',params)
	},
	// 商品订单详情
	getProductOrderDetail(id) {
		return http.get(`applet/product_order/${id}`)
	},
	// 商品订单取消订单
	cancelProductOrder(id) {
		return http.put(`applet/product_order/${id}`)
	},
	// 门店列表
	getStoreList() {
		return http.get('applet/store')
	},
	// 获取oss-token
	getOssToken() {
		return http.get('applet/sts/token')
	},
	// 评价服务订单
	setServiceEvaluation(params) {
		return http.post('applet/evaluation',params)
	},
	// 预约订单详情
	getServiceOrderDetail(id) {
		return http.get(`applet/bookings/${id}`)
	},
	wechatSaveMiniUser(params) {
		return http.post('/wechat/mini/saveMiniUser', params)
	},
}

export default apiService
