<template>
	<view v-if="show" class="store-detail">
		<view class="video">
            <video id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4" @error="videoErrorCallback" controls>
            
            </video>
            <view class="store-infro">
                <view class="store-name">
                    <view class="name">{{storeDetail.name}}</view>
                    <view class="point">评分<span>{{storeDetail.score}}</span></view>
                </view>
                <view class="store-details">
                    <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_time%402x.png">{{storeDetail.start_time}}-{{storeDetail.end_time}}</image>
                </view>
                <view class="store-details" @click="goPhoneBtn(storeDetail.telephone)" style="display:flex; flex-direction:row; justify-content:space-between;">
                    <view class=""><image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_consult%402x.png"></image>{{storeDetail.telephone}}</view>
                    <view class="">
                        <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image>
                    </view>
                </view>
                <view class="store-details"><image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_activity%20place%402x.png"></image>{{storeDetail.address}}</view>
            </view>
        </view>
        <view class="album">
            <view class="album-detail">
                <view class="title">相册</view>
                <view class="photo" v-for="(item,index) in storeDetail.img" :key="index">
                    <image :src=item></image>
                </view>
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
            id:'',
            show:false,
            storeDetail:{},
            shopList:[]
		}
	},
    watch:{
        storeDetail(value,oldvalue){
            if(JSON.stringify(value) !== "{}"){
                this.show=true
            }
        }
    },
    mounted(){
        if(this.shop){
            this.getStoreinfo()
        }
    },
	methods: {
        getStoreinfo(){
            this.shopList=uni.getStorageSync('shopList')
            if(this.shopList.length>0){
                this.shopList.forEach(e=>{
                    if(e.name===this.shop){
                        this.storeId=e.id
                    }
                 })
            }
            this.$api.getStoreinfo(this.storeId).then((res)=>{
                if(res.data.message==='操作成功'){
                    this.storeDetail=res.data.data
                }
            })
        },
        goPhoneBtn(phone){
            uni.makePhoneCall({
                // 手机号
                phoneNumber: phone,
                // 成功回调
                success: (res) => {
                    console.log('res------->',res)
                },
                // 失败回调
                fail: (res) => {
                    console.log('res------->',res)
                }
            });
        }
	},
}
</script>
<style lang="scss">
.store-detail {
	width: 100%;
	height: 100vh;
	background: #FAF7F2;
	display: flex;
	flex-direction: column;
	align-items: center;
    margin: 40rpx 0;
    .video{
        width: 686rpx;
        height: 644rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFFFFF;
        border-radius: 16rpx;
        #myVideo{
        }
        .store-name{
            width: 686rpx;
            height: 40rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 40rpx 10rpx;
            .name{
                font-size: 32rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #333333;
                line-height: 40rpx;
            }
            .point{
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
                span{
                    font-size: 28rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #CC975A;
                    line-height: 40rpx;
                }
            }
        }
        .store-details{
            width: 686rpx;
            display: flex;
            flex-direction: row;
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 36rpx;
            padding: 10rpx;
            image{
                width: 40rpx;
                height: 40rpx;
            }
        }
    }
    .album{
        width: 686rpx;
        height: auto;
        background: #FFFFFF;
        margin-top: 30rpx;
        border-radius: 16rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
            font-size: 32rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 40rpx;
            margin: 30rpx 0;
        }
        .photo{
            width: 638rpx;
            height: 356rpx;
            margin-bottom: 20rpx;
            image{
                width: 100%;
                height: 100%;
                border-radius: 16rpx;
                margin: 10rpx auto;
            }
        }
    }
}
</style>
<style>
video{
    width: 686rpx;
    border-radius: 16rpx;
}
</style>
