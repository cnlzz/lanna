<template>
	<view class="store-comment">
        <view class="comment-item" v-for="(item,index) in evaluationList" :key="index">
            <view class="user-info">
                <view class="avatar">
                    <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_user%402x.png"></image>
                </view>
                <view class="detail">
                    <view class="name">微信用户</view>
                    <view class="date">2023-01-04</view>
                </view>
            </view>
            <view class="starts">
                总体满意{{item.overall_score}}星 服务{{item.service_score }}星 效果{{item.effect_score}}星
            </view>
            <view class="comment-detail">
                {{item.comment}}
            </view>
            <view class="photo-list">
                <view class="photo" v-for="(item,index) in evaluationList.img" :key="index">
                    <image :src="item"></image>
                </view>
                <!-- <view class="photo">
                    <image src=""></image>
                </view>
                <view class="photo">
                    <image src=""></image>
                </view>
                <view class="photo">
                    <image src=""></image>
                </view> -->
            </view>
        </view>
	</view>
</template>
<script>
export default {
	components: {},
	props: {
        shop:{
            type: String,
            defult: '四季铭源健康管理有限公司'
        }
    },
	data() {
		return {
            evaluationList:[],
            shopList:[]
		}
	},
    watch:{
        shop(value,oldvalue){
            if(value!==oldvalue){
                this.shop=value
                this.getStoreId()
            }
        }
    },
    mounted(){
       if(this.shop){
        this.getStoreId()
       }
    },
	methods: {
        getStoreId(){
            this.shopList=uni.getStorageSync('shopList')
            if(this.shopList.length>0){
                this.shopList.forEach(e=>{
                    if(e.name===this.shop){
                        this.id=e.id
                    }
                 })
            }
            this.getStoreEvaluation()
        },
        getStoreEvaluation(){
            this.$api.getStoreEvaluation(this.id).then((res)=>{
                console.log('res------>',res.data.data.data)
                this.evaluationList=res.data.data.data
            })
        }
	},
}
</script>
<style lang="scss">
.store-comment {
	width: 100%;
	height: 100vh;
	background: #FAF7F2;
	display: flex;
	flex-direction: column;
	align-items: center;
    margin: 40rpx 0;  
    .comment-item{
        width: 680rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        display: flex;
	    flex-direction: column;
        margin: 20rpx 0;
        .user-info{
            width: 100%;
            display: flex;
            flex-direction: row;
            margin: 20rpx 0;
            .avatar{
                width: 56rpx;
                height: 56rpx;
                margin-left: 20rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .detail{
                display: flex;
                flex-direction: column;
                margin-left: 20rpx;
                .name{
                    font-size: 28rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 34rpx;
                }
                .date{
                    font-size: 20rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 24rpx;
                }
            }
        }
        .starts{
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 34rpx;
            padding:0 20rpx;
        }
        .comment-detail{
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 34rpx;
            padding:20rpx;
        }
        .photo-list{
            width: 680rpx;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .photo{
                width: 196rpx;
                height: 196rpx;
                background: pink;
                margin: 10rpx 0 30rpx 20rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        
    } 
}
</style>
<style>

</style>
