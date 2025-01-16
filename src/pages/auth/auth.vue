<template>
  <view class="auth">
    <view class="logo">
      <view class="title">LANNA SPRING</view>
      <view class="logo-img">
        <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/logo%402x.png"/>
      </view>
    </view>
    <view class="auth-btn">
      <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button>
      <view class="policy">登录后即同意</view>
    </view>
  </view>
</template>
<script>
export default {
	components: {},
	props: {},
	data() {
		return {
		
		}
	},
  onShow(){
    this.wxlogin()
  },
	methods: {
    wxlogin(){
			uni.login({
				success:async (res)=> {
					this.js_code=res.code
				},
			});
		},
		async getPhoneNumber(e){
			this.getPhoneNumberCode=e.detail.code
			let params={
				js_code:this.js_code,
				code:this.getPhoneNumberCode
			}
			this.$api.wechatGetUserPhone(params).then((res)=>{
				let result = res.data
				if(result.data){
					uni.setStorageSync('access_token', result.data.access_token);
          if(uni.getStorageSync('access_token')){
            this.$Router.replace({
							path: '/',
						})
          }
         
				}
			})
		},
  },
}
</script>
<style lang="scss">
.auth {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
	background: #EBDFD0;
  .logo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
      font-size: 40rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 56rpx;
    }
    .logo-img{
      width: 192rpx;
      height: 192rpx;
      margin-top:48rpx ;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .auth-btn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn{
      width: 622rpx;
      height: 96rpx;
      background: #D9C1A5;
      border-radius: 48rpx;
      margin-bottom: 20rpx;
    }
    .policy{
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 34rpx;
    }
  }
}
</style>
<style>
page{
	background: #faf7f2;
}
</style>

