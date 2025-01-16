<template>
	<view class="coupons-list">
       <view class="coupons">
            <view class="title">
                <view class="text">
                    项目卡
                </view>
                <view class="intro" @click="goInstructions">
                    使用说明<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image>
                </view>
            </view>
            <view class="card">
                <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/card.png"></image>
            </view>
       </view>
       <view class="cards">
            <view class="title">选择项目卡</view>
            <view class="cards-list">
                <view v-for="(item,index) in newCardList" :key="index">
                    <view v-if="item.isActive" class="card-item bgB" @click="checkCard(item.id,item.points_price,item.price)">
                        <view class="detail">
                            <view class="card-title">{{item.name}}</view>
                            <view class="card-times">使用次数:{{item.usage_count}}</view>
                        </view>
                        <view v-if="item.price>0 && item.points_price>0" class="card-amount">{{item.price/100}}现金+{{item.points_price/100}}积分</view>
                        <view v-else-if="item.price==0 && item.points_price>0" class="card-amount">{{item.points_price/100}}积分</view>
                        <view v-else-if="item.price>0 && item.points_price==0" class="card-amount">{{item.price/100}}现金</view>
                    </view>
                    <view v-else class="card-item bgA" @click="uncheckCard(item.id,item.points_price,item.price)">
                        <view class="detail">
                            <view class="card-title">{{item.name}}</view>
                            <view class="card-times">使用次数:{{item.usage_count}}</view>
                        </view>
                        <view v-if="item.price>0 && item.points_price>0" class="card-amount">{{item.price/100}}现金+{{item.points_price/100}}积分</view>
                        <view v-else-if="item.price==0 && item.points_price>0" class="card-amount">{{item.points_price/100}}积分</view>
                        <view v-else-if="item.price>0 && item.points_price==0" class="card-amount">{{item.price/100}}现金</view>
                    </view>
                   
                </view>
            </view>
       </view>
	</view>
</template>
<script>
export default {
	components: {},
	props: {},
	data() {
		return {
            cardList:[],
            totalPrice:'',
            card_voucher_id:'',
            newCardList:[],
            remainBalance:'',
            remainPoints:''
		}
	},
    mounted(){
        this.getCardVouchers()
    },
	methods: {
        // 获取优惠券列表
		getCardVouchers(){
            this.$api.getCardVouchers().then((res)=>{
                this.cardList=res.data.data.data
                this.cardList.forEach(e=>{
                    e['isActive']=false
                })
                this.newCardList = this.$u.deepClone(this.cardList)
            })
            this.userPoints()
        },
        // 取消选择优惠券
        checkCard(id){
            this.newCardList.forEach(e=>{
                if(e.id===id){
                    e.isActive=false
                    this.$set(this.newCardList,e.isActive,false)
                }
            })
            this.totalPrice=''
            this.$emit('getDetail','','0.00')
        },
        // 选择的优惠券
        uncheckCard(id,point,price){
            if(this.totalPrice!==''){
                uni.showToast({
                    title: '每次请选择一个购买哦～',
                    icon:'none',
                    duration: 2000
                });
            }else{
                this.newCardList.forEach(e=>{
                    if(e.id===id){
                        if(point>0){
                            if(this.remainPoints>point){
                                e.isActive=true
                                this.$set(this.newCardList,e.isActive,true)
                            }else{
                                uni.showToast({
                                    title: '您的积分不足～',
                                    icon:'none',
                                    duration: 2000
                                });
                            }
                        }else{
                            e.isActive=true
                            this.$set(this.newCardList,e.isActive,true)
                        }
                    }
                    if(e.isActive===true){
                        if(price>0 && point>0){
                            this.totalPrice=price/100+"+"+point/100+'积分'
                        }
                        if(price==0 && point>0){
                            this.totalPrice=point/100+'积分'
                        }
                        if(price>0 && point==0){
                            this.totalPrice=price/100
                        }
                        this.card_voucher_id=id
                        this.$emit('getDetail',this.card_voucher_id,this.totalPrice)
                    }
                })
            }
        },
        userPoints(){
            this.$api.userPoints().then((res)=>{
                this.remainBalance=res.data.data.balance/100
                this.remainPoints=res.data.data.points
                console.log('remainPoints------>',this.remainPoints)
            })
        },
        goInstructions(){
            uni.navigateTo({
                url: 'subA/instructions/instructions'
            })
        }
	},
}
</script>
<style lang="scss">
.coupons-list {
	width: 100%;
	height: auto;
	background: #FAF7F2;
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
    .coupons{
        width: 100%;
        display: flex;
	    flex-direction: column;
        justify-content:center;
	    align-items: center;
        .title{
            width: 670rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .text{
                font-size: 32rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
            }
            .intro{
                font-size: 26rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 40rpx;
                image{
                    width: 40rpx;
                    height: 40rpx;
                }
            }
        }
        .card{
            width: 604rpx;
            height: 296rpx;
            border-radius: 24rpx;
            margin: 30rpx 0;
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
    .cards{
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        .title{
            width: 670rpx;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            font-size: 32rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 40rpx;
        }
        .cards-list{
            width: 680rpx;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-flow: wrap;
            margin-bottom: 50rpx;
            .card-item{
                width: 328rpx;
                height: 164rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                border-radius: 16px;
                margin-top: 20rpx;
                margin-right: 10rpx;
                .detail{
                    width: 328rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .card-title{
                        font-size: 28rpx;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #333333;
                        line-height: 40rpx;
                    }
                    .card-time{
                        font-size: 24rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #333333;
                        line-height: 40rpx;
                    }
                }
                .card-amount{
                    font-size: 24rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 28rpx;
                }
            }
            .bgA{
                background: url('https://lanna-product.oss-cn-shanghai.aliyuncs.com/activity_coupon%402x.png');
                background-size:cover ;
            }
            .bgB{
                background: url("https://lanna-product.oss-cn-shanghai.aliyuncs.com/activity_coupon_sel%402x.png");
                background-size:cover ;
            }
        }
    }
}
</style>
