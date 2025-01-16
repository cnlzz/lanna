<template>
	<view class="tickets">
        <view style="margin-bottom:80rpx;">
            <view class="ticket-item" v-for="(item,index) in userCardsList" :key="index">
                <view class="ticket-detail">
                    <view class="ticket-top">
                        <view class="ticket-name">{{item.name}}</view>
                        <view v-if=item.used class="ticket-status">已使用</view>
                        <view v-else class="ticket-status">未使用</view>
                    </view>
                    <view class="ticket-expired">有效期至：{{item.expire_at}}</view>
                </view>
                <view class="ticket-checked"></view>
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
			userCardsList:[],
            value:'',
            cards:[],
            type:''
		}
	},
	onShow() {
        this.getUserCards()
	},
	onReady() {},
	methods: {
        getUserCards(){
            this.$api.getUserCards().then((res)=>{
                if(res.data.code===401){
                    this.$Router.replace({
                        path: '/auth',
                    })
                }else{
                    this.userCardsList=res.data.data.data
                    console.log('this.userCardsList-------->',this.userCardsList)
                }
                })
        },
        // radioChange(e){
        //     this.userCardsList.forEach(item=>{
        //         if(item.card_vouchers_id===e){
        //             this.idcard=e
        //         }
        //     })
        // },
        // goBack(){
        //     uni.navigateBack({
        //         delta: 1
        //     })
        // }
	},
}
</script>
<style lang="scss">
.tickets{
    width:100%;
    min-height:100vh;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ticket-item{
        width: 680rpx !important;
        height: 130rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-radius: 16rpx;
        background: #FFFFFF;
        margin-top: 40rpx;
        .ticket-detail{
            display: flex;
            flex-direction: column;
            margin-left: 30rpx;
            .ticket-top{
                width: 630rpx;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                .ticket-name{
                    font-size: 32rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 60rpx;
                }
                .ticket-status{
                    font-size: 26rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #999999;
                    line-height: 32rpx;
                }
            }
            
            .ticket-expired{
                font-size: 26rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 32rpx;
            }
        }
        .ticket-checked{
            width: 32rpx;
            height: 32rpx;
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
    .confirm-btn{
        width: 332rpx;
        height: 88rpx;
        font-size: 32rpx;
        color: #333333;
        line-height: 88rpx;
        text-align:center;
        border-radius: 44rpx;
        background: #D9C1A5;
        font-weight: 500;
        margin: 30rpx 0;
    }
}
</style>
<style>
page{
	background: #faf7f2;
}
</style>

