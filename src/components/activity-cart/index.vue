<template>
	<view class="activity-cart">
    <view class="total-num">
      <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/logo%402x.png"></image>
    </view>
		<view class="detail">
      <view class="total-price">￥{{totalPrice}}</view>
      <view class="submit-btn" @click="submit">提交</view>
    </view>
    <u-popup v-model="showPayPopup" mode="bottom" border-radius="24" height="450rpx" closeable="true">
      <view class="pay-box">
        <view class="title">支付</view>
        <view class="amount">￥{{totalPrice}}</view>
        <view class="methods">
          <view class="method-item" @click="selectWechat">
            <view class="item"><image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/pay_icon_WeChat%402x.png"></image>微信支付</view>
            <view class="iconSel">
              <image v-if="wechatSelected" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_selected%402x.png"></image>
              <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_sel%402x.png"></image>
            </view>
          </view>
          <view v-if="showRemain" class="method-item" @click="selectRemain">
            <view class="item"><image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/pay_icon_card%402x.png"></image>账户余额支付</view>
            <view class="iconSel">
              <image v-if="remainSelected" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_selected%402x.png"></image>
              <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_sel%402x.png"></image>
            </view>
          </view>
        </view>
        <view v-if='!loading' class="pay-btn" @click="handlePay">支付</view>
        <view v-else class="pay-btn">
          <u-loading mode="circle" ></u-loading>
        </view>
      </view>
	  </u-popup>
	</view>
</template>
<script>
export default {
	components: {
  },
	props: {
  },
	data() {
		return {
      showPayPopup:false,
      totalPrice:'0.00',
      product_id:'',
      showRemain:true,
      wechatSelected:false,
      remainSelected:false,
      payType:'', // 支付类型
      type:'',
      id:'',
      loading:false
		}
	},
  watch:{
    wechatSelected(value,oldvalue){
      if(value===true){
        this.remainSelected=false
        this.payType=0
      }
    },
    remainSelected(value,oldvalue){
      if(value===true){
        this.wechatSelected=false
        this.payType=1
      }
    }
  },
  mounted(){
   
  },
  methods: {
    getPrice(id,price,type){
      this.totalPrice=price
      this.product_id=id
      this.type=type
    },
    getPay(id,price,type){
      if(price>0){
        this.product_id=id
        this.totalPrice=price
        this.type=type
      }else{
        this.totalPrice='0.00'
      }
    },
    submit(){
        // this.userPoints()
        let params={
          product_id:this.product_id,
          type:this.type
        }
        this.$api.takeOrder(params).then((res)=>{
          this.id=res.data.data.id
        })
        if(this.type==='1'){
          this.showRemain=false
        }
        // this.showRemain=false
        this.showPayPopup=true
    },
    selectWechat(){
      this.wechatSelected=!this.wechatSelected
    },
    selectRemain(){
      this.remainSelected=!this.remainSelected
    },
    handlePay(){
      let params={
        order_id:this.id,
        type: this.payType
      }
      this.$api.payOrder(params).then((res)=>{
        this.loading=true
        if(this.payType=='1'){
          this.checkOrderStatus()
        }
        if(this.payType=='0'){
          if(res.data.data){
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              success (res) { 
                uni.redirectTo({
                    url: 'pages/amount/amount'
                });
              },
              fail (res) { 
                uni.redirectTo({
                    url: 'pages/amount/amount'
                });
              }
            })
          }
        }
      })
    },
    checkOrderStatus(){
      let params={
        order_id:this.id,
      }
      const timer=setInterval(()=>{
        this.$api.checkOrderStatus(params).then((res)=>{
          if(res.data.data.paid===true){
            clearInterval(timer)
            this.$Router.replace({
                path: '/tickets',
            })
          }
        })
      },1000)
    }
    // userPoints(){
    //   this.$api.userPoints().then((res)=>{
    //     console.log('res------->',res)
    //     this.remainBalance=res.data.data.balance
    //     this.remainPoints=res.data.data.points
    //   })
    // },
    // takeOrder(){
    //   let params={
    //       product_id:this.product_id,
    //       type:this.type
    //     }
    //     this.$api.takeOrder(params).then((res)=>{
    //       this.id=res.data.data.id
    //     })
    // }
  },
}
</script>
<style lang="scss">
.activity-cart {
  width: 100%;
  position: absolute;
  .total-num{
    position: relative;
    left: 20rpx;
    top: 60rpx;
    width: 88rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 50%;
    background: #FFFFFF;
    // border: 4rpx solid #EBDFD0;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .detail{
    width: 100%;
    height: 120rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    margin: 0 auto;
    .total-price{
      height: 40rpx;
      font-size: 32rpx;
      font-family: HarmonyOS_Sans_Medium;
      color: #000000;
      line-height: 40rpx;
      margin-left: 100rpx;
    }
    .submit-btn{
      width: 332rpx;
      height: 88rpx;
      font-size: 32rpx;
      color: #333333;
      line-height: 88rpx;
      text-align:center;
      border-radius: 44rpx;
      background: #D9C1A5;
      font-weight: 500;
      margin-right: 30rpx;
    }
  }  
  .pay-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title{
      width: 100%;
      height: 50rpx;
      margin-top: 30rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 50rpx;
      text-align: center;
    }
    .amount{
      font-size: 48rpx;
      font-family: HarmonyOS_Sans_Medium;
      color: #333333;
      line-height: 100rpx;
    }
    .methods{
      display: flex;
      flex-direction: column;
      .method-item{
        width: 660rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10rpx 0;
        .item{
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 40rpx;
          image{
            width: 48rpx;
            height: 48rpx;
            display: inline-block;
            margin-right: 20rpx;
          }
        }
        .iconSel{
          width: 32rpx;
          height: 32rpx;
          image{
            width:100%;
            height: 100%;
          }
        }
      }

    }
    .pay-btn{
      width: 686rpx;
      height: 88rpx;
      background: #D9C1A5;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 88rpx;
      text-align: center;
      margin-top: 20rpx;
    }
  }
}
</style>
