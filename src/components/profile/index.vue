<template>
	<view v-if='show' class="profile">
        <view class="profile-card" @click="handleProfile">
            <view class="user-info">
                <view class="user-detail">
                    <view class="avatar">
                        <image v-if='userDetail.avatar===null' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_user%402x.png"></image>
                        <image v-else :src="userDetail.avatar"></image>
                    </view>
                    <view class="info">
                        <view class="name">
                            {{userDetail.nickname}}
                        </view>
                        <view class="phone">
                            {{userDetail.mobile}}
                        </view>
                    </view>
                </view>
                <view v-if='userDetail.level==null' class="level">
                    普通会员
                </view>
                <view v-else class="level">
                    {{userDetail.level}}会员
                </view>
            </view>
        </view>
        <view class="preference" @click="handlePreference">
            <view class="icon">
                <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_preference%402x.png"></image>
            </view>
            <view class="text">偏好设置</view>
            <view class="icon">
                <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image>
            </view>
        </view>
        <view class="account">
            <view class="account-detail" @click="checkAmount">
                <view class="text">余额</view>
                <view class="num"> {{userDetail.extend.balance/100}}</view>
            </view>
            <view class="account-detail" @click="checkPoints">
                <view class="text">积分</view>
                <view class="num">{{userDetail.extend.points}}</view>
            </view>
            <view class="account-detail" @click="checkTickets">
                <view class="text">卡券</view>
                <view class="num">{{userDetail.card_vouchers_num}}</view>
            </view>
        </view>
        <view class="orders">
            <view class="orders-detail">
                <view class="detail-img">
                    <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_service%402x.png"></image>
                </view>
                <view class="detail-title" @click="checkServiceList">
                    <view class="text">服务订单</view>
                    <view class="check">查看订单<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></view>
                </view>
            </view>
            <view class="orders-detail">
                <view class="detail-img">
                    <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_product%402x.png"></image>
                </view>
                <view class="detail-title" @click="checkProducesList">
                    <view class="text">产品订单</view>
                    <view class="check">查看订单<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></view>
                </view>
            </view>
        </view>
        <view class="fun-list">
            <view class="fun-name" @click="goMemberBenefits"> <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_member%402x.png"></image>会员权益 <image style='margin-left:380rpx' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></view>
            <button class="fun-name" plain='true' open-type="contact" @getphonenumber="decryptPhoneNumber"><image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_kefu%402x.png"></image>联系客服<image style='margin-left:380rpx' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></button>
            <view class="fun-name" @click="goAboutUs"> <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_about%402x.png"></image>关于我们 <image style='margin-left:380rpx' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></view>
        </view>
	</view>
</template>
<script>
export default {
    components: { },
    props: {
        userDetail:{
            type:Object,
            default:{}
        }
    },
	data() {
		return {
            show:false,
            updateType:'',
            mobile:'',
            nickname:'',
            birthday:'',
            gender:'',
            avatar:''
		}
	},
    watch:{
        userDetail(value,oldvalue){
            console.log('value------>',value)
            if(JSON.stringify(value) !== "{}"){
                this.show=true
                this.avatar=this.userDetail.avatar
                this.updateType=this.userDetail.is_update
                this.mobile=this.userDetail.mobile
                this.nickname=this.userDetail.nickname
                this.birthday=this.userDetail.birthday
                this.gender=this.userDetail.sex
            }
        }
    },
    mounted(){
       
    },
	methods: {
        handleProfile(){
            this.$Router.push({
                path: '/profileDetail',
                query: {
					updateType:this.updateType,
                    avatar:this.avatar,
                    nickname:this.nickname,
                    birthday:this.birthday,
                    gender:this.gender
				},
            })
        },
        getProfile(profile){
            this.userDetail=profile
        },
        handlePreference(){
            this.$Router.push({
                path: '/perferenceDetail',
            })
        },
        checkTickets(){
            this.$Router.push({
                path: '/tickets',
            })
        },
        checkAmount(){
            this.$Router.push({
                path: '/amount',
            })
        },
        checkPoints(){
            this.$Router.push({
                path: '/points',
            })
        },
        checkServiceList(){
            this.$Router.push({
                path: '/serviceOrderList',
            })
        },
        checkProducesList(){
            this.$Router.push({
                path: '/productsOrderList',
            })
        },
        goMemberBenefits(){
            uni.navigateTo({
                url: 'subA/memberBenefits/memberBenefits'
            })
        },
        goAboutUs(){
            uni.navigateTo({
                url: 'subA/aboutUs/aboutUs'
            })
        }
    },
}
</script>
<style lang="scss">
.profile {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    background: #FAF7F2;
    .profile-card{
        width: 686rpx;
        height: 234rpx;
        background: black;
        border-radius: 32rpx;
        margin-top: 30rpx;
        .user-info{
            display: flex;
            flex-direction: column;            
            padding: 40rpx 0 0 30rpx;
            .user-detail{
                display: flex;
                flex-direction: row;
                .avatar{
                    width: 96rpx;
                    height: 96rpx;
                    margin-right: 20rpx;
                    image{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .info{
                    display: flex;
                    flex-direction: column;
                    font-family: PingFangSC-Medium, PingFang SC;
                    color: #FFFFFF;
                    .name{
                        font-size: 32rpx;
                        font-weight: 500;
                        padding-bottom: 20rpx
                    }
                    .phone{
                        font-size: 24rpx;
                        font-weight: 400;
                    }
                }
            }
            .level{
                font-size: 24rpx;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #FAC570;
                background: linear-gradient(90deg, #F7BA71 0%, #FFD79D 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 10rpx 0 0 10rpx;
            }
        }
    }
    .preference{
        width: 686rpx;
        height: 120rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: linear-gradient(180deg, #FFE9C4 0%, #FFFFFF 100%);
        border-radius: 0px 0px 32px 32px;
        padding-left:20rpx ;
        .icon{
            width: 40rpx;
            height: 40rpx;
            align-content: center;
            image{
                width: 100%;
                height: 100%;
            }
        }
        .text{        
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 50rpx;
            padding: 10rpx 400rpx 0 10rpx;
        }
    }
    .account{
        width: 686rpx;
        height: 164rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #FFFFFF;
        border-radius: 16rpx;
        margin-top: 30rpx;
        .account-detail{
            width: 228rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .text{              
                font-size: 24rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 28rpx;
            }
            .num{           
                font-size: 24rpx;
                font-family: HarmonyOS_Sans_Medium;
                color: #CC975A;
                line-height: 40rpx;
                padding-top: 20rpx;
            }
        }
    }
    .orders{
        width: 686rpx;
        height: 176rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background: #FFFFFF;
        border-radius: 16rpx;
        margin-top: 30rpx;
        .orders-detail{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .detail-img{
                width: 96rpx;
                height: 96rpx;
                margin-right: 20rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .detail-title{
                display: flex;
                flex-direction: column;
                .text{
                    font-size: 28rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #333333;
                    line-height: 40rpx;
                    margin-bottom: 10rpx;
                }
                .check{
                    font-size: 24rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 28rpx;
                    image{
                        width: 24rpx;
                        height: 24rpx;
                    }
                }
            }
        }
    }
    .fun-list{
        width: 686rpx;
        height: 308rpx;
        background: #FFFFFF;;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 30rpx;
        .fun-name{          
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 40rpx;
            image{
                width: 42rpx;
                height: 42rpx;
                margin-right: 10rpx;
            }
        }
    }
}
</style>
<style>
button{
    border: none !important;
}
</style>
