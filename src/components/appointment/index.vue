<template>
	<view class="appointment">
		<view class="shop" @click='handleShop'>
            <view class='icon'>
                <image class='img' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_store%402x.png"></image>
            </view>
		    <view class='shopName'>{{shop}}</view>
            <view class='icon' >
                <image class='img' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_btn_open%402x.png"></image>
            </view>
        </view>
		<view class="tabs"> 
            <view class='tabs-box' v-for="(item, index) in tabList" :key="index">
                <view v-if='item.isActive' class="tabs-btn-actived">{{item.text}}</view>
                <view v-else class='tabs-btn' @click='handleTabs(item.text)'>{{item.text}}</view>
            </view>
        </view>
        <lanna-booking ref="booking" v-if="showBooking" :shop="shop"></lanna-booking>
        <lanna-store-detail v-if="showStoreDetail" :shop="shop"></lanna-store-detail>
        <lanna-comments v-if="showStoreComments" :shop="shop"></lanna-comments>
        <u-picker v-model='showShopList' mode='selector' :default-selector="[0]" :range="shopNameList" @confirm='selectShop'></u-picker>
	</view>
</template>
<script>
import lannaStoreDetail from '../store-detail/index.vue'
import lannaBooking from '../booking/index.vue'
import lannaComments from '../comments/index.vue'
export default {
	components: {
        lannaStoreDetail,
        lannaBooking,
        lannaComments
    },
	props: {},
	data() {
		return {
            showStoreDetail:false,
            showBooking:true,
            showShopList:false,
            showStoreComments:false,
            shop:'四季铭源健康管理有限公司',
            shopList:[],
            shopNameList:[],
            tabList:[
                {
					text: '预约下单',
					isActive: true
				},
                {
					text: '门店介绍',
					isActive: false
				},
                {
					text: '门店评价',
					isActive: false
				},
            ]

		}
	},
    created(){
        this.getStore()
    },
	methods: {
        getStore(){
            this.$api.getStoreList().then((res)=>{
                res.data.data.forEach(e=>{
                    this.shopList.push({
                        id:e.id,
                        name:e.name
                    })
                    this.shopNameList.push(e.name)
                })
                if(this.shop===''){
                    this.shop=this.shopNameList[0]
                }
                uni.setStorageSync('shopList',this.shopList)
                uni.setStorageSync('shopNameList',this.shopNameList)
            })
        },
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
        // 点击门店
        handleShop(){
            this.showShopList=true
        },
        // 选择门店
        selectShop(e){
            let index=e[0]
            this.shop=this.shopNameList[index]
            let selectedShop=this.shopList.find((item=>item.name===this.shop))
            this.$refs.booking.getShop(this.shopList,this.shop)
        },
        // 点击tabs
        handleTabs(text){
            this.tabList.forEach((item)=>{
				if(item.text===text){
					item.isActive=true
                    if(item.text==='预约下单'){
                        this.showBooking=true
                    }else{
                        this.showBooking=false
                    }
                    if(item.text==='门店介绍'){
                        this.showStoreDetail=true
                    }else{
                        this.showStoreDetail=false
                    }
                    if(item.text==='门店评价'){
                        this.showStoreComments=true
                    }else{
                        this.showStoreComments=false
                    }
				}else{
					item.isActive=false
				}
			})
        }
	},
}
</script>
<style lang="scss">
.appointment {
	width: 100%;
	background: #FAF7F2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .shop{
        width: 90%;
        display: flex;
        flex-direction: row;
        margin: 30rpx 0;
        .icon{
            width: 48rpx;
            height: 48rpx;
            .img{
                width: 100%;
                height: 100%;
            }
        }
        .shopName{
        //    width: 180rpx;
           width: auto;
           padding-left: 10rpx;
        }
    }
    .tabs{
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 26rpx;
        .tabs-box{
            width: 202rpx;
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
}
</style>
