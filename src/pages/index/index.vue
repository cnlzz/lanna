<template>
	<view class="main">
		<view class="header">
			<lanna-header @isActive="isActive"></lanna-header>
		</view>
		<view style="width:100; height:215rpx"></view>
		<lanna-appointment v-if="showAppointment"></lanna-appointment>
		<lanna-products ref="products" v-if="showProduct" :productList='productList'></lanna-products>
		<lanna-activity v-if="showActivity"></lanna-activity>
		<lanna-profile ref="profile" v-if="showMember" :userDetail='userDetail'></lanna-profile>
	</view>
</template>

<script>
import lannaProducts from '@/components/products/index.vue'
import lannaAppointment from '@/components/appointment/index.vue'
import lannaProfile from '@/components/profile/index.vue'
import lannaActivity from '@/components/activity/index.vue'
export default {
	components: {
		lannaAppointment,
		lannaProducts,
		lannaProfile,
		lannaActivity
	},
	data() {
		return {
			showAppointment:true,
			showProduct:false,
			showActivity:false,
			showMember:false,
			productList:[],
			userDetail:{}
		}
	},
	onLoad(){
    },
	onShow() {
	},
	onReady() {},
	methods: {
		isActive(e){
			if(e==='appointment'){
				this.showAppointment=true
			}else{
				this.showAppointment=false
			}
			if(e==='product'){
				this.showProduct=true
				this.getProductList()
			}else{
				this.showProduct=false
			}
			if(e==='activity'){
				this.showActivity=true
				this.getCardVouchers()
			}else{
				this.showActivity=false
			}
			if(e==='member'){
				this.showMember=true
				this.getUserinfo()
			}else{
				this.showMember=false
			}
		},
		getProductList(){
			this.$api.getProductList().then((res)=>{
				if(res.data.code===401){
					this.$Router.replace({
						path: '/auth',
					})
				}else{
					this.productList=res.data.data.data
					// this.$refs.products.getProductsList(this.productList)
				}
			})
		},
		getUserinfo(){
			this.$api.getUserinfo().then((res)=>{
				if(res.data.code===401){
					this.$Router.replace({
						path: '/auth',
					})
				}else{
					this.userDetail=res.data.data
					this.$refs.profile.getProfile(this.userDetail)
				}
			})
		},
		getCardVouchers(){
            this.$api.getCardVouchers().then((res)=>{
                if(res.data.code===401){
					this.$Router.replace({
						path: '/auth',
					})
				}else{
					this.userDetail=res.data.data
				}
            })
        },
	},
}
</script>
<style lang="scss">
.main{
	background: #faf7f2;
	.header{
		position: fixed;
		left: 0;
		top: 0;
	}

}
</style>
<style>
page{
	background: #faf7f2;
}
</style>
