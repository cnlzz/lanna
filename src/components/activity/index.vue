<template>
	<view class="activity">
		<view class="tabs"> 
            <view class='tabs-box' v-for="(item, index) in tabList" :key="index">
                <view v-if='item.isActive' class="tabs-btn-actived">{{item.text}}</view>
                <view v-else class='tabs-btn' @click='handleTabs(item.text)'>{{item.text}}</view>
            </view>
        </view>
        <lanna-coupons-list v-if="showCoupons" @getDetail="getDetail"></lanna-coupons-list>
        <lanna-recharge-list v-if="showRecharge" @getRechargePrice="getRechargePrice"></lanna-recharge-list>
        <view style="width:100rpx; height:250rpx;"></view>
        <view class="cart-box">
            <lanna-activity-cart ref='activityCart'></lanna-activity-cart>
        </view>
	</view>
</template>
<script>
import lannaCouponsList from '../coupons-list/index.vue'
import lannaRechargeList from '../recharge-list/index.vue'
import lannaActivityCart from '../activity-cart/index.vue'
export default {
	components: {
        lannaCouponsList,
        lannaRechargeList,
        lannaActivityCart
    },
	props: {},
	data() {
		return {
            tabList:[
                {
					text: '项目券',
					isActive: true
				},
                {
					text: '储值',
					isActive: false
				},
            ],
            showCoupons:true,
            showRecharge:false,
            totalPrice:'0.00',
            card_voucher_id:'0'
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
		},
        handleTabs(text){
            this.tabList.forEach((item)=>{
				if(item.text===text){
					item.isActive=true
                    if(item.text==='项目券'){
                        this.showCoupons=true
                        this.getDetail('','0')
                    }else{
                        this.showCoupons=false
                    }
                    if(item.text==='储值'){
                        this.showRecharge=true
                        this.getRechargePrice('','0')
                    }else{
                        this.showRecharge=false
                    }
				}else{
					item.isActive=false
				}
			})
        },
        getDetail(id,price){
            this.$refs.activityCart.getPrice(id,price,'0')
        },
        getRechargePrice(id,price){
            this.$refs.activityCart.getPay(id,price,'1')
        }
	},
}
</script>
<style lang="scss">
.activity {
	width: 100%;
	background: #FAF7F2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tabs{
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 26rpx;
        margin: 30rpx 0;
        .tabs-box{
            width: 302rpx;
            height: 48rpx;
            line-height: 48rpx;
            text-align: center;
            .tabs-btn-actived{
                border-radius:16rpx;
                background: #D9C1A5;
            }
            .tabs-btn{
                border-radius:16rpx;
                background:#EBDFD0;
            }
        }
       
    }   
    .cart-box{
        width: 100%;
        height: 230rpx;
        position: fixed;
		left: 0;
		bottom: 0;
    }
}
</style>
