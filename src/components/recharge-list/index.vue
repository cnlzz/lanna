<template>
	<view class="coupons-list">
       <view class="coupons">
            <view class="title">
                <view class="text">
                    储值
                </view>
                <view class="intro" @click="goInstructions">
                    使用说明<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image>
                </view>
            </view>
            <view class="card">
                <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/card.png"></image>
            </view>
       </view>
       <view class="amount">
            <view class="title">选择面值</view>
            <view class="num">
                <view class="" v-for="(item,index) in newRechargesList" :key="index">
                    <view v-if="item.isActive" class="num-item bgB" @click="uncheckRecharge(item.id,item.price)">¥{{item.price/100}}</view>
                    <view v-else class="num-item" @click="checkRecharge(item.id,item.price)">¥{{item.price/100}}</view>
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
            rechargesList:[],
            newRechargesList:[],
            totalPrice:'',
            id:''
		}
	},
    mounted(){
        this.getRecharges()
    },
	methods: {
		getRecharges(){
            this.$api.getRecharges().then((res)=>{
               this.rechargesList=res.data.data.data
               this.rechargesList.forEach(e=>{
                    e['isActive']=false
                })
               this.newRechargesList = this.$u.deepClone(this.rechargesList)
               console.log('this.newRechargesList------>',this.newRechargesList)
            })
        },
        checkRecharge(id,price){
            if(this.totalPrice!==''){
                uni.showToast({
                    title: '每次请选择一个充值金额哦～再次点击已选金额进行取消～',
                    icon:'none',
                    duration: 2000
                });
            }else{
                this.newRechargesList.forEach(e=>{
                    if(e.id===id){
                        e.isActive=true
                        this.$set(this.newRechargesList,e.isActive,true)
                    }
                    if(e.isActive===true){
                        this.totalPrice=price/100
                        this.id=id
                        this.$emit('getRechargePrice',this.id,this.totalPrice)
                    }
                })
            }
        },
        uncheckRecharge(id,price){
            this.newRechargesList.forEach(e=>{
                if(e.id===id){
                    e.isActive=false
                    this.$set(this.newRechargesList,e.isActive,false)
                }
            })
            this.totalPrice=''
            this.$emit('getRechargePrice','','0.00')
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
    .amount{
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
        .num{
            width: 680rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-flow: wrap;
            .num-item{
                width: 328rpx;
                height: 164rpx;
                background: #EBDFD0;
                border-radius: 16px;
                text-align: center;
                line-height: 164rpx;
                margin-top: 20rpx;
                font-size: 40rpx;
                font-family: HarmonyOS_Sans_Medium;
                color: #333333;
            }
            .bgB{
                border: 2rpx solid #CC975A;
                background: url('https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_mark%402x.png');
                background-size:66rpx 48rpx;
                background-repeat: no-repeat;
                background-position: right bottom;
            }
        }
    }
}
</style>
