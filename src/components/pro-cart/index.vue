<template>
	<view class="pro-cart">
		<view class="total-num" @click="handleDetail">
      {{totalNum}}
      <image class="" src="" mode="aspectFit|aspectFill|widthFix" lazy-load="false" binderror="" bindload=""></image>
    </view>
		<view class="detail" @click="handleDetail">
      <view v-if='totalRedeem==0 && totalPrice==0' class="total-price">￥0.00</view>
      <view v-if='totalRedeem==0 && totalPrice>0' class="total-price">￥{{totalPrice/100}}</view>
      <view v-if='totalPrice==0 && totalRedeem>0' class="total-price">{{totalRedeem}}积分</view>
      <view v-if='totalRedeem!==0 && totalPrice!==0' class="total-price">￥{{totalPrice/100}}+{{totalRedeem}}积分</view>
      <view class="submit-btn">提交</view>
    </view>
    <u-popup v-model="showDetail" mode="bottom" border-radius="16">
      <view class="cart" v-for='(item,index) in cartDetailList' :key='index'>
        <view  class="cart-detail" id=item.id>
          <view class="pro-info">
            <view class="pro-name">{{item.name}}</view>
            <view v-if='item.redeem==0' class="pro-price">￥{{item.price/100}}</view>
            <view v-if='item.price==0' class="pro-price">{{item.redeem}}积分</view>
            <view v-if='item.redeem!==0 && item.price!==0' class="pro-price">￥{{item.price/100}}+{{item.redeem}}积分</view>
          </view>
          <view class="pro-num">
            <view class="minus" @click="handleMinus(item.name,index,item.id)">
              <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/product_icon_reduce_default%402x.png"></image>
            </view>
            <view class="num">{{item.num}}</view>
            <view class="add" @click="handleAdd(item.name,index,item.id)">
              <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/product_icon_add_default%402x.png"></image>
            </view>
          </view>
        </view>
        <view class="line"></view>
      </view>
      <view class="detail">
        <view v-if="redeem==0 && price==0" class="total-price">¥0.00</view>
        <view v-if="redeem==0 && price>0" class="total-price">¥{{price/100}}</view>
        <view v-if="price==0 && redeem>0" class="total-price">{{redeem}}积分</view>
        <view v-if="redeem!==0 && price!==0" class="total-price">¥{{price/100}}+{{redeem}}积分</view>
        <view class="submit-btn" @click="goOrder">提交</view>
      </view>
		</u-popup>
    <u-popup v-model="showOrder" mode="bottom" border-radius="16">
      <view class="order-detail">
        <view class="agreement">
          <view class="agreement-text">
            退款条款已阅读
            <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image>
          </view>
          <view class="agreement-check" @click="getCheck">
            <image v-if='checkPolicy' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_selected%402x.png"></image>
            <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_sel%402x.png"></image>
          </view>
        </view>
        <view class="line"></view>
        <view class="receipt">
          <view style="margin-bottom:20rpx;">请选择收货方式</view>
          <view>
            <u-radio-group v-model="value" @change="radioGroupChange">
              <u-radio 
                v-for="(item, index) in list" :key="index" 
                :name="item.name"
                :disabled="item.disabled"
              >
                {{item.name}}
              </u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="receipt">
          <view style="margin-bottom:20rpx;">请选择自提地址</view>
          <view>
            <u-radio-group v-model="storeValue" @change="radioGroupChange">
              <u-radio 
                v-for="(item, index) in storeList" :key="index" 
                :name="item.name"
                :disabled="item.disabled"
              >
                {{item.name}}
              </u-radio>
            </u-radio-group>
          </view>
          <view style="margin:20rpx 0;">
            <u-input v-model="textValue" type="textarea" :border="true" height="120" placeholder="请备注自提时间"/>
          </view>
        </view>
        <view class="service-list">
          <view class="service-item" v-for="(item,index) in orderDetail" :key="index">
            <view class="name">{{item.name}} x {{item.num}}</view>
            <view class="price">¥{{item.subtotal/100}}</view>
          </view>
        </view>
        <view class="line"></view>
        <view v-if='totalRedeem>0' class="points">
          <view class="points-name">积分抵扣</view>
          <view class="points-value">{{totalRedeem}}积分</view>
        </view>
        <view class="total">
          <view class="total-title">合计</view>
          <view v-if='redeem==0' class="total-price">¥{{price/100}}</view>
          <view v-if='price==0' class="total-price">{{redeem}}积分</view>
          <view v-if='redeem!==0 && price!==0' class="total-price">¥{{price/100}}+{{redeem}}积分</view>
        </view>
        <view class="order-btn">
          <view class="order-button" @click="getProductOrder">立即支付</view>
        </view>
      </view>
		</u-popup>
    <u-popup v-model="showPay" mode="bottom" border-radius="24" height="450rpx" closeable="true">
      <view class="pay-box">
        <view class="title">支付</view>
        <view v-if='totalRedeem==0' class="amount">¥{{price/100}}</view>
        <view v-if='price==0' class="amount">¥{{redeem}}</view>
        <view v-if='totalRedeem!==0 && price!==0' class="amount">¥{{price/100}}+{{redeem}}积分</view>
        <view class="methods">
          <view class="method-item" @click="selectWechat">
            <view class="item"><image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/pay_icon_WeChat%402x.png"></image>微信支付</view>
            <view class="iconSel">
              <image v-if="wechatSelected" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_selected%402x.png"></image>
              <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_sel%402x.png"></image>
            </view>
          </view>
          <view class="method-item" @click="selectRemain">
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
    totalNum:{
      type:Number,
      default:0
    },
    totalPrice:{
      type:Number,
      default:0
    },
    totalRedeem:{
      type:Number,
      default:0
    }
  },
	data() {
		return {
      showPay:false,
      textValue:'',
      showDetail:false,
      cartDetailList:[],
      showCart:true,
      price:'',
      redeem:'',
      showOrder:false,
      checkPolicy:false,
      textValue:'',
      list: [
				{
					name: '自提',
					disabled: false
				},
				{
					name: '配送',
					disabled: true
				}
			],
      storeList:[],
			value: '自提',
      storeValue:'',
      orderDetail:[],
      orderList:[],
      order_id:'',
      wechatSelected:false,
      remainSelected:false,
      payType:'',
      loading:false
		}
	},
  watch:{
    totalNum(value,oldvalue) {
      this.totalNum=value
    },
    totalPrice(value,oldvalue){
      this.totalPrice=value
      this.price=value
    },
    totalRedeem(value,oldvalue){
      this.totalRedeem=value
      this.redeem=value
    },
    showDetail(value,oldvalue) {
      if(value===false){
        this.$emit('updateCartDetail',true)
      }
    },
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
    this.price=this.totalPrice
    this.redeem=this.totalRedeem
    this.getStoreList()
  },
	methods: {
    // 查看订单详情，弹出弹出框
    handleDetail(){
      if(this.totalNum>0){
        this.showDetail=true
        this.cartDetailList=uni.getStorageSync('cart-detail').filter((item)=>{ return item.num !== 0})
      }else{
        uni.showToast({
            title: '请先往购物车内添加商品',
            icon:'none',
            duration: 2000
        });
      }
    },
    // 减
    handleMinus(name,index,id){
      this.cartDetailList.forEach((item)=>{
        if(item.num===0){
          uni.showToast({
            title: '本商品不能再减少了～',
            icon:'none',
            duration: 2000
        });
        }else{
          if(item.name===name){
            item.num--,
						item.subtotal=item.subtotal-item.price
            item.subredeem=item.subredeem-item.redeem
          }
        }
      })
      let newPrice=this.cartDetailList.reduce((sum,e)=>sum+Number(e.subtotal),0)
      let newRedeem=this.cartDetailList.reduce((sum,e)=>sum+Number(e.subredeem),0)
      this.redeem=newRedeem
      this.price=newPrice
      uni.setStorageSync('cart-detail',this.cartDetailList.filter((item)=>{ return item.num !== 0}))
    },
    // 加
    handleAdd(name,index,id){
      this.cartDetailList.forEach((item)=>{
        if(item.name===name){
            item.num++,
						item.subtotal=item.subtotal+item.price
            item.subredeem=item.subredeem+item.redeem
        }
      });
      let newPrice=this.cartDetailList.reduce((sum,e)=>sum+Number(e.subtotal),0)
      let newRedeem=this.cartDetailList.reduce((sum,e)=>sum+Number(e.subredeem),0)
      this.price=newPrice
      this.redeem=newRedeem
      uni.setStorageSync('cart-detail',this.cartDetailList.filter((item)=>{ return item.num !== 0}))
    },
    // 获取订单信息
    goOrder(){
      this.showDetail=false
      this.showOrder=true
      this.orderDetail=uni.getStorageSync('cart-detail').filter((item)=>{ return item.num !== 0})
    },
    // 选择提货方式
		radioGroupChange(e) {
			console.log('radioGroupChange------>',e);
		},
    // 阅读退款协议
    getCheck(){
      this.checkPolicy=!this.checkPolicy
    },
    // 商品订单锁单
    getProductOrder(){
      if(!this.checkPolicy){
        uni.showToast({
            title: '请阅读退款条款',
            icon:'none',
            duration: 2000
        });
      }
      else if(this.storeValue===''){
        uni.showToast({
            title: '请选择自提门店',
            icon:'none',
            duration: 2000
        });
      }else{
        this.$api.userPoints().then((res)=>{
          if(res.data.message==='操作成功'){
            if(res.data.data.points>this.redeem){
              this.orderList = this.$u.deepClone(this.orderDetail)
              this.orderList.forEach(e=>{
                e['product_id']=e.id
                delete e.name
                delete e.price
                delete e.subtotal
                delete e.id
                delete e.redeem, 
                delete e.subredeem
              })
              let params={
                product_arr:this.orderList,
                receive_type:'1',
                back:this.textValue
              }
              this.$api.getProductOrder(params).then((res)=>{
                if(res.data.message==='操作成功'){
                  this.order_id=res.data.data.id
                  this.showOrder=false
                  this.showPay=true
                }
              })
            }else{
              uni.showToast({
                  title: '您的积分不够呦～',
                  icon:'none',
                  duration: 2000
              });
            }
          }
          
        })
        // this.orderList = this.$u.deepClone(this.orderDetail)
        // this.orderList.forEach(e=>{
        //   e['product_id']=e.id
        //   delete e.name
        //   delete e.price
        //   delete e.subtotal
        //   delete e.id
        //   delete e.redeem, 
        //   delete e.subredeem
        // })
        // let params={
        //   product_arr:this.orderList,
        //   receive_type:'1',
        //   back:this.textValue
        // }
        // this.$api.getProductOrder(params).then((res)=>{
        //   if(res.data.message==='操作成功'){
        //     this.order_id=res.data.data.id
        //     this.showOrder=false
        //     this.showPay=true
        //   }
        // })
      }
    },
    selectWechat(){
			this.wechatSelected=!this.wechatSelected
		},
		selectRemain(){
			this.remainSelected=!this.remainSelected
		},
    handlePay(){
      if(!this.wechatSelected&&!this.remainSelected){
        uni.showToast({
            title: '请选择支付方式～',
            icon:'none',
            duration: 2000
        });
      }else{
        this.$api.userPoints().then((res)=>{
          if(res.data.message==='操作成功'){
            if(res.data.data.points>this.redeem){
              let params={
                order_id:this.order_id,
                type:this.payType,
              }
              this.loading=true
              this.$api.payProductOrder(params).then((res)=>{
                if(this.payType=='1'){
                  if(res.data.message==='操作成功'){
                    uni.removeStorageSync('cart-detail')
                    this.$Router.replace({
                        path: '/productsOrderList',
                    })

                  }
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
                        uni.removeStorageSync('cart-detail')
                        uni.redirectTo({
                            url: 'pages/productsOrderList/productsOrderList'
                        });
                      },
                      fail (res) { 
                        uni.redirectTo({
                            url: 'pages/productsOrderList/productsOrderList'
                        });
                      }
                    })
                  }
                }
              })
            }else{
              uni.showToast({
                  title: '您的积分不够呦～',
                  icon:'none',
                  duration: 2000
              });
            }
          }
        })
      }
    },
    getStoreList(){
      this.$api.getStoreList().then((res)=>{
        let storeArr=res.data.data
        storeArr.forEach(e=>{
          this.storeList.push({
            name:e.name,
            disabled:false
          })
        })
      })
    }

  },
}
</script>
<style lang="scss">
.pro-cart {
  width: 100%;
  position: absolute;
  .total-num{
    position: relative;
    left: 20rpx;
    top: 40rpx;
    width: 88rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 50%;
    background: #FFFFFF;
    border: 4rpx solid #EBDFD0;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .detail{
    width: 100%;
    height: 150rpx;
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
}
.cart{
  min-height: 100rpx;
  .cart-detail{
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin:50rpx auto;
    background:#EBDFD0;
    border-radius: 40rpx;
      .pro-info{
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 30rpx;
        .pro-name{
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 34rpx;
          margin: 10rpx 0;
        }
        .pro-price{
          font-size: 20rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24rpx;
          margin-bottom: 10rpx;
        }
      }
      .pro-num{
        width: 25%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .num{
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 32rpx;
          padding-top: 4px;
        }
        .minus{
          width: 32rpx;
          height: 32rpx;
          image{
            width: 100%;
            height: 100%;
          }
        }
        .add{
          width: 32rpx;
          height: 32rpx;
          image{
            width: 100%;
            height: 100%;
          }
        }
      }
  }
}
.box{
  width:100%; 
  height:50rpx; 
}
.order-detail{
  width: 680rpx;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .agreement{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 40rpx 0;
    .agreement-text{
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 34rpx;
      image{
        width: 40rpx;
        height: 40rpx;
      }
    }
    .agreement-check{
      width: 40rpx;
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 34rpx;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .line{
      width: 620rpx;
      height: 2rpx;
      background: #F6F6F6;
      margin-left: 30rpx;
  }
  .receipt{
    display: flex;
    flex-direction: column;
    margin: 30rpx 0;
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 30rpx;
    font-weight: 400;
    color: #333333;
    line-height: 34rpx;
  }
  .service-list{
    display: flex;
    flex-direction: column;
    margin-bottom: 30rpx;
    .service-item{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 20rpx 0;
      .points-name{
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 34rpx;
      }
     
    }
  }
  .points{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 30rpx 0;
    .points-name{
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 34rpx;
    }
    .points-value{
      font-size: 28rpx;
      font-family: HarmonyOS_Sans_Medium;
      color: #FD4A2C;
      line-height: 34rpx;
    }
  }
  .total{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 30rpx 0;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 34rpx;
  }
  .order-btn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 40rpx;
    .order-button{
      width: 332rpx;
      height: 88rpx;
      background: #D9C1A5;
      border-radius: 44rpx;
      text-align: center;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 88rpx;
    }
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
</style>

