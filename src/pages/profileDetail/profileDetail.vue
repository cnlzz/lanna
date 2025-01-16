<template>
    <view class="profile-detail">
        <view class="detail">
            <view class="title">头像</view>
            <view style="display:flex; flex-direction:row; align-items:center;">
                <view class="avatar-img">
                    <image v-if='avatar===""' src='https://lanna-product.oss-cn-shanghai.aliyuncs.com/member_icon_user%402x.png'></image>
                    <image v-else :src='avatar'></image>
                </view>
                <image src='https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png'></image>
            </view>
         </view>
         <view class="detail">
            <view class="title">姓名</view>
            <view style="display:flex; flex-direction:row; align-items:center;">
                <u-input v-model="nickname" type="text" input-align="right"/>
                <image src='https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png'></image>
            </view>
         </view>
         <view class="detail">
            <view class="title">性别</view>
            <view style="display:flex; flex-direction:row; align-items:center" @click="handleGender">
                <u-input v-model="gender" type="select" input-align="right"/>
                <image src='https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png'></image>
            </view>
         </view>
         <view class="detail">
            <view class="title">出生日期</view>
            <view style="display:flex; flex-direction:row; align-items:center;" @click="handleTime">
                <u-input v-model="birthday" type="select" input-align="right"/>
                <image src='https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png'></image>
            </view>
         </view>
         <view class="saveBtn" v-if="updateType" @click="updateUserinfo">保存</view>
         <u-picker mode="selector" v-model="showGender" :default-selector="[0]" :range="genderList" @confirm='selectGender'></u-picker>
         <u-picker mode="time" v-model="showTime" :params="time" @confirm='selectTime'></u-picker>
         <u-modal v-model="showModal" :content="content"></u-modal>
    </view>
  </template>
  <script>
  export default {
      components: {
      },
      props: {},
      data() {
          return {
            showModal:false,
            showGender:false,
            showTime:false,
            genderList:['男','女'],
            time:{
                year: true,
                month: true,
                day: true,
                hour: false,
                minute: false,
                second: false
            },
            avatar:'',
            birthday:'',
            nickname:'',
            gender:'',
            updateType:false,
            content:''
          }
      },
    onLoad(option){
        if(option.avatar=='undefined'){
            this.avatar=''
        }else{
            this.avatar=option.avatar
        }
        this.nickname=decodeURIComponent(option.nickname)
        this.birthday=option.birthday
        if(option.gender==='0'){
            this.gender='女'
        }
        if(option.gender==='1'){
            this.gender='男'
        }
        if(option.updateType==='0'){
            this.updateType=true
        }
    },
    methods: {
        handleGender(){
            this.showGender=true
        },
        selectGender(e){
            let index=e[0]
            this.gender=this.genderList[index]
        },
        handleTime(){
            this.showTime=true
        },
        selectTime(e){
            this.birthday=`${e.year}-${e.month}-${e.day}`
        },
        updateUserinfo(){
            let sex=''
            if(this.gender==='女'){
                sex='0'
            }
            if(this.gender==='男'){
                sex='1'
            }
            let params={
                sex:sex,
                birthday:this.birthday,
                nickname:this.nickname,
                avatar:''
            }
            this.$api.updateUserinfo(params).then((res)=>{
                if(res.data.message==='操作成功'){
                    this.updateType=false
                }
            })
        }
    },
  }
  </script>
  <style lang="scss">
  .profile-detail {
      width: 100% ;
      height: 100vh;
      background: #FAF7F2;	
      display: flex;
      flex-direction: column;
      align-items: center;
      .detail{
        width: 100%;
        background: #FFFFFF;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 30rpx 0;
        border-bottom: 1rpx solid #F6F6F6;
        .title{
            width: 160rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0,0,0,0.4);
            line-height: 40rpx;
            padding-right: 30rpx;
        }
        image{
            display: inline-block;
            width: 40rpx;
            height: 40rpx;
        }
        .avatar-img{
            width: 230rpx;
            text-align: right;
            image{
                width: 120rpx;
                height: 120rpx;
                border-radius: 50%;
            }
        }
      }
      .saveBtn{
        width: 686rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        text-align: center;
        color: #333333;
        background: #D9C1A5;
        border-radius: 44rpx;
        margin-top: 450rpx;
      }
  }
  </style>
  <style>
  .u-input__right-icon{
    display: none;
  }
  u-input{
    width: 240rpx;
  }
page{
    background: #faf7f2;
}
  </style>
  