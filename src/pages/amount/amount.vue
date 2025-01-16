<template>
	<view class="amount">
       <view class="nav-box"></view>
       <view class="amount-list">
            <view class="amount-item" v-for="(item,index) in currencyLogs" :key="index">
                <view class="time">
                    <view class="clock">
                        <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_time%402x.png"></image>
                    </view>
                    <view class="date">{{item.created_at}}</view>
                </view>
                <view class="line"></view>
                <view class="detail">
                    <view class="type">
                        {{item.type}}
                    </view>
                    <view class="value">
                        ¥ {{item.value/100}}
                    </view>
                </view>
            </view>
       </view>
	</view>
</template>

<script>
export default {
	components: {
		
	},
	data() {
		return {
            currencyLogs:[]
		}
	},
	mounted(){
        this.getCurrencyLogs()
    },
	methods: {
        getCurrencyLogs(){
            let params={
                page:'1',
                per_page:'15',
                currency_type:'0'
            }
            this.$api.getCurrencyLogs(params).then((res)=>{
                console.log('res------>',res.data.data.data)
                this.currencyLogs=res.data.data.data
            })
        }
	},
}
</script>
<style lang="scss">
.amount{
    width:100%;
    min-height:100vh;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-box{
        width: 100%;
        height: 100rpx;
        background: #d9c1a5;
    }
    .amount-list{
        width: 680rpx;
        position: relative;
        top: -60rpx;
        .amount-item{
            width: 100%;
            height: 190rpx;
            border-radius: 16rpx;
            background: #FFFFFF;
            display: flex;
            flex-direction: column;
            margin-bottom: 30rpx;
            .time{
                display: flex;
                flex-direction: row;
                margin: 20rpx;
                .clock{
                    width: 40rpx;
                    height: 40rpx;
                    margin-right: 10rpx;
                    image{
                        width: 100%;
                        height: 100%;
                    }
                }
                .date{
                    font-size: 26rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 40rpx;
                }
            }
            .line{
                width: 620rpx;
                height: 2rpx;
                background: #F6F6F6;
                margin-left: 30rpx;
            }
            .detail{
                width: 680rpx;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                margin: 30rpx;
                font-size: 30rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 30rpx;
                .type{
                    width: 70%;
                }
                .value{
                    width: 30%;
                }
            }
        }
    }
}
</style>
<style>
page{
	background: #faf7f2;
}
</style>
