<template>
  <view v-if="show" class="product-detail">
		<view class="product-img">
			<image
				:src="productDetail.cover_img[0]"
				mode="scaleToFill"
			/>
		</view>
		<view class="product-details">
			<view class="product-infor">
				<view class="title">{{productDetail.name}}</view>
				<!-- <view class="price">￥{{productDetail.price}}</view> -->
				<view v-if='productDetail.redeem==0' class="price">￥{{productDetail.price/100}}</view>
				<view v-if='productDetail.price==0' class="price">{{productDetail.redeem}}积分</view>
				<view v-if='productDetail.redeem!==0 && productDetail.price!==0' class="price">￥{{productDetail.price/100}}+{{productDetail.redeem}}积分</view>
			</view>
			<view class="product-btn">
				<view class="add-cart" @click="handleCart">
					添加至购物车
				</view>
			</view>
		</view>
		<view class="detail-img">
			<image
				:src="productDetail.img[0]"
				mode="scaleToFill"
			/>
		</view>
		<view style="width:100%; height:120rpx;"></view>
		<view class="pro-cart">
			<lannaProductCart :totalNum="totalNum" :totalPrice="totalPrice"  :totalRedeem="totalRedeem" @updateCartDetail='updateCartDetail'></lannaProductCart>
		</view>
  </view>
</template>
<script>
import lannaProductCart from '@/components/pro-cart/index.vue'
export default {
	components: {
		lannaProductCart
	},
	props: {},
	data() {
		return {
			show:false,
      		id:'',
			productDetail:{},
			totalNum:0,
			totalPrice:0,
			totalRedeem:0,
			cartDetail:[]
		}
	},
	watch:{
		productDetail(value,oldvalue){
			if(JSON.stringify(value) !== "{}"){
				this.show=true
			}
		}
	},
  	onLoad(option){
		this.id=option.id
		if(this.id){
			this.getProductDetail(this.id)
		}
		if(uni.getStorageSync('cart-detail')){
			this.cartDetail=uni.getStorageSync('cart-detail').filter((item)=>{ return item.num !== 0})
			let newNum=this.cartDetail.reduce((sum,e)=>sum+Number(e.num),0)
			let newPrice=this.cartDetail.reduce((sum,e)=>sum+Number(e.subtotal),0)
			let newRedeem=this.cartDetail.reduce((sum,e)=>sum+Number(e.subredeem),0)
			this.totalNum=newNum
			this.totalPrice=newPrice
			this.totalRedeem=newRedeem
		}else{
			uni.setStorageSync('cart-detail',this.cartDetail)
		}
	},
	methods: {
		// 获取产品详情
		getProductDetail(id){
			this.$api.getProductDetail(id).then((res)=>{
				if(res.data.code===401){
					this.$Router.replace({
						path: '/auth',
					})
				}else{
					this.productDetail=res.data.data
				}
      		})
    	},
		// 购物车同步数据
		handleCart(){
			if(!this.cartDetail.some(item=>item.name==this.productDetail.name)){
				this.cartDetail.push({
					id:this.productDetail.id,
					name:this.productDetail.name,
					price:this.productDetail.price,
					num:1,
					subtotal:this.productDetail.price,
					redeem:this.productDetail.redeem,
					subredeem:this.productDetail.redeem
				})
			}else{
				this.cartDetail.forEach((item)=>{
					if(item.name===this.productDetail.name){
						item.num++,
						item.subtotal=item.subtotal+item.price
						item.subredeem=item.subredeem+item.redeem
					}
				})
			}
			uni.setStorageSync('cart-detail',this.cartDetail)
			let newNum=this.cartDetail.reduce((sum,e)=>sum+Number(e.num),0)
			let newPrice=this.cartDetail.reduce((sum,e)=>sum+Number(e.subtotal),0)
			let newRedeem=this.cartDetail.reduce((sum,e)=>sum+Number(e.subredeem),0)
			this.totalNum=newNum
			this.totalPrice=newPrice
			this.totalRedeem=newRedeem
		},
		// 更新购物车数据
		updateCartDetail(e){
			if(e===true){
				this.cartDetail=uni.getStorageSync('cart-detail').filter((item)=>{ return item.num !== 0})
				let newNum=this.cartDetail.reduce((sum,e)=>sum+Number(e.num),0)
				let newPrice=this.cartDetail.reduce((sum,e)=>sum+Number(e.subtotal),0)
				let newRedeem=this.cartDetail.reduce((sum,e)=>sum+Number(e.subredeem),0)
				this.totalNum=newNum
				this.totalPrice=newPrice
				this.totalRedeem=newRedeem
			}
		}
  	},
}
</script>
<style lang="scss">
.product-detail {
	width: 100% ;
	height: 100%;
	background: #faf7f2;	
	display: flex;
	flex-direction: column;
	.product-img{
		width: 100%;
		height: 750rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.product-details{
		width: 100%;
		display: flex;
		flex-direction: row;
		margin: 40rpx 0;
		.product-infor{
			width: 50%;
			display: flex;
			flex-direction: column;
			padding-left: 40rpx;
			.title{
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 44rpx;	
				margin-bottom: 20rpx;
			}
			.price{
				height: 38rpx;
				font-size: 32rpx;
				color: #FD4A2C;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 38rpx;
			}
		}
		.product-btn{
			width: 50%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			padding-right: 40rpx;
			.add-cart{
				width: 220rpx;
				height: 64rpx;
				font-size: 26rpx;
				color: #333333;
				line-height: 64rpx;
				text-align:center;
				border-radius: 44rpx;
				background: #D9C1A5;
			}
		}
	}
	.detail-img{
		width: 100%;
		height: 900rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.pro-cart{
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
<style>
page{
	background: #faf7f2;
}
</style>

