<template>
	<view class="header">
		<view class="nav" v-for="(item, index) in list" :key="index">
			<view class="icon">
				<image v-if=item.isActive class="img" :src=item.active mode="" />
				<image v-else class="img" :src=item.src mode="" @click="clickIcon(item.name)"/>
			</view>
			<view class="title" @click="clickIcon(item.name)">{{item.title}}</view>
		</view>
	</view>
</template>
<script>
export default {
	components: {},
	props: {},
	data() {
		return {
			list: [
				{
					name: 'appointment',
					title: '预约',
					src: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_appointment%402x.png',
					active: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_appointment_active%402x.png',
					isActive: true
				},
				{
					name: 'product',
					title: '产品',
					src: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_product%402x.png',
					active: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_product_active%402x.png',
					isActive: false
				},
				{
					name: 'activity',
					title: '活动',
					src: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_activity%402x.png',
					active: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_activity_active%402x.png',
					isActive: false
				},
				{
					name: 'member',
					title: '会员',
					src: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_member%402x.png',
					active: 'https://lanna-product.oss-cn-shanghai.aliyuncs.com/tabber_member_active%402x.png',
					isActive: false
				},
			],
		}
	},
	methods: {
		clickIcon(name){
			this.list.forEach((item)=>{
				if(item.name===name){
					item.isActive=true
					this.$emit('isActive',name)
				}else{
					item.isActive=false
				}
			})

		}
	},
}
</script>
<style lang="scss">
.header {
	width: 100%;
	height: 216rpx;
	background: #d9c1a5;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	.nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.icon {
			width: 96rpx;
			height: 96rpx;
			.img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
