<template>
	<view class="service-cart">
    <view class="total-num">
      <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/logo%402x.png"></image>
    </view>
    <!-- <view class="total-num">{{totalServicesPeople}}</view> -->
		<view class="detail" @click="getServicesDetails">
      <view class="total-price">￥{{totalServicesPrice/100}}</view>
      <view class="submit-btn">提交</view>
    </view>
    <u-popup v-model="showDetails" mode="bottom" border-radius="24" mask-close-able="true">
			<view class="services-details">
        <view class="details-title">
          <view class="icon">
            <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_store%402x.png"></image>
          </view>
          <view class="info">
            <view class="name">{{userDetail.nickname}} 先生/女士</view>
            <view class="order">{{shop}} {{date}} {{time}}</view>
          </view>
        </view>
        <view class="services-list">
          <view class="services-item" v-for="(item,index) in checkedServicesList" :key="index">
            <view class="services-detail">
              <view class="services-name">{{item.name}} x1</view>
              <view class="services-time"><image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_time%402x.png"></image>{{item.time}}mins</view>
            </view>
            <view class="services-price">¥{{item.price/100}}</view>
          </view>
        </view>
        <view class="coupons">
          <view class="coupons-title">项目券</view>
          <view v-if="showText" class="get-coupons" @click="handleTickets">去选择<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></view>
          <view v-else class="use-coupons" @click="handleTickets">{{ticketName}}</view>
        </view>
        <view class="people">
          <view class="people-title">合计</view>
          <view class="people-num">{{totalServicesPeople}}人</view>
        </view>
        <view class="total-detail">
          <view class="total-price">￥{{total/100}}</view>
          <view class="submit-btn" @click="submitOrder">提交</view>
        </view>
    </view>
		</u-popup>
    <!-- 优惠券 -->
    <u-popup v-model="showList" mode="bottom" border-radius="24" mask-close-able="true" height="1000rpx">
      <!-- <view v-if="showRadioList" class="tickets"> -->
      <view class="tickets">
            <view class="tips">
              每单预约仅可使用一张优惠券，选择好请点击「确认」按钮呦！
            </view>
            <u-radio-group v-model="value">
                <u-radio 
                    class="ticket-item"
                    @change="radioChange" 
                    v-for="(item,index) in userCardsList" :key="index" 
                    :name="item.id"
                    active-color="#D9C1A5"
                >
                    <view class="ticket-detail">
                        <view class="ticket-name">{{item.name}}</view>
                        <view class="ticket-expired">有效期至：{{item.expire_at}}</view>
                    </view>
                </u-radio>
            </u-radio-group>
            <view style="width:100rpx; height:170rpx;"></view>
            <view class="btn-box">
              <view class="confirm-btn" @click="goBack">
                确定
              </view>
            </view>
        </view>
		</u-popup>
    <!-- 支付 -->
    <u-popup v-model="showPay" mode="bottom" border-radius="24" height="450rpx" closeable="true">
      <view class="pay-box">
        <view class="title">支付</view>
        <view class="amount">￥{{total/100}}</view>
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
        <view class="pay-btn" @click="handlePay">支付</view>
      </view>
	</u-popup>
	</view>
</template>
<script>
export default {
	components: {
  },
	props: {
    totalServicesPeople:{
      type:Number,
      default:0
    },
    totalServicesPrice:{
      type:Number,
      default:0
    },
    storeId:{
      type:String,
      default:''
    },
    shop:{
      type:String,
      default:''
    },
    servicesIdList:{
      type:Array,
    },
    checkedDate:{
      type:String,
    },
    checkedTime:{
      type:String,
    }
  },
	data() {
		return {
      payType:'', // 支付类型
      orderId:'', //支付订单id
      wechatSelected:false,
      remainSelected:false,
      showPay:false, // 是否显示支付弹框 
      showText:true,
      showRadioList:false,
      showList:false,
      showLogo:false,
      showDetails:false,
      showPopup:false,
      userDetail:{},
      date:'',
      time:'',
      checkedServicesList:[],
      userCardsList:[],
      value:'',
      ticketId:0,
      ticketName:'',
      totalChange:false, //总价变化
      minPrice:'', // 被扣除的价格
      total:'',
      selectedDate:'', // 选择的日期
      selectedTime:'', // 选择的时间
      idList:[],
      id:'',
      withoutCards:false,
		}
	},
  watch:{
    totalServicesPrice(value,oldvalue){
      if(value!==0){
        this.total=value
      }
    },
    totalChange(value,oldvalue){
      if(value===true){
        this.total=Number(this.total)-Number(this.minPrice)
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
    // this.getUserinfo()
    this.getSystemTime()
    // this.getUserCards()
  },
	methods: {
    // 获取会员信息
    getUserinfo(){
			this.$api.getUserinfo().then((res)=>{
        this.userDetail=res.data.data
			})
		},
    // 获取系统时间
    getSystemTime(){
      let time=new Date()
      let Y = time.getFullYear() + '-';
      let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
      let D = time.getDate() + ' ';
      let h = time.getHours() + ':';
      let m = time.getMinutes();
      this.date= Y+M+D
      this.time= h+m
    },
    // 传入购物车已选服务及总价（此处不做已选时间校验）
    getServicesDetails(){
      if(this.totalServicesPeople===0 || this.totalServicesPrice==0){
        uni.showToast({
            title: '请完成预约',
            icon:'none',
            duration: 2000
        });
      }else{
        this.getUserinfo()
        this.showDetails=true
      }
    },
    // 弹出优惠券列表
    handleTickets(){
      this.getUserCards()
      // this.showList=true
    },
    // 获取已选择的服务列表
    getlist(servicesIdList){
      if(this.checkedServicesList.length>0){
        if(servicesIdList!==this.checkedServicesList){
          this.idList=[]
        }
      }
      this.checkedServicesList=servicesIdList
      if(this.checkedServicesList.length>0){
        this.checkedServicesList.forEach(item=>{
          this.idList.push(item.id)
        })
      }
    },
    // 获取会员所属优惠券
    getUserCards(){
        this.$api.getUserCards().then((res)=>{
            if(res.data.code===401){
                this.$Router.replace({
                    path: '/auth',
                })
            }else{
                this.userCardsList=res.data.data.data
                if(this.userCardsList.length>0){
                  this.userCardsList=this.userCardsList.filter(item=>item.used===false)
                  this.showRadioList=true
                  this.showList=true
                }else{
                  uni.showToast({
                    title: '您的账户中无可以使用的优惠券',
                    icon:'none',
                    duration: 2000
                  })
                }
            }
        })
    },
    // 单选优惠券
    radioChange(e){
        this.userCardsList.forEach(item=>{
            if(item.id===e){
                this.ticketId=item.id
                this.ticketName=item.name
                this.cardId=item.serves_id
            }
        })
    },
    // 确认选择好优惠券
    goBack(){
      this.checkedServicesList.forEach(item=>{
        if(item.id===this.cardId){
          this.minPrice=item.price
          this.totalChange=true
        }
      })
      if(this.minPrice===''){
        uni.showToast({
            title: '您选择的卡券没有匹配到可用的服务',
            icon:'none',
            duration: 2000
        });
        this.showText=true
      }else{
        this.showText=false
      }
      this.showList=false
    },
    getDate(date){
      let time=new Date()
      let Y = time.getFullYear() + '-';
      this.selectedDate= Y+date.replace('.','-')
    },
    getTime(time){
      this.selectedTime=time
    },
    submitOrder(){
      if(this.selectedTime!==''&&this.selectedDate!==''){
        if(Number(this.totalServicesPeople)!==this.idList.length){
          uni.showToast({
            title: '每人需选择1个服务项目',
            icon:'none',
            duration: 2000
          });
        }else{
          let params={
            "store_id": this.storeId,
            "arrival_started_at": this.selectedDate+' '+this.selectedTime,
            "service_ids": this.idList,
            "people_numbers": this.totalServicesPeople,
            "user_card_voucher_id": this.ticketId
          }
          this.$api.booking(params).then((res)=>{
            if(res.data.message){
              // this.totalAmount=res.data.data.total_amount
              // this.orderId=res.data.data.id
              if(res.data.data.total_amount===0){
                uni.redirectTo({
                    url: 'subA/serviceOrderList/serviceOrderList'
                });
              }else{
                this.id=res.data.data.id
                this.showPay=true
                this.showDetails=false
              }
             
            }
          })
        }
      }else{
        uni.showToast({
          title: '请选择时间',
          icon:'none',
          duration: 2000
        });
      }
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
      this.$api.bookingPay(params).then((res)=>{
        if(this.payType=='1'){
          this.checkBookingStatus()
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
                console.log('success---res-------->',res)
                uni.redirectTo({
                    url: 'subA/serviceOrderList/serviceOrderList'
                });
              },
              fail (res) { 
                console.log('fail---res-------->',res)
                uni.redirectTo({
                    url: 'subA/serviceOrderList/serviceOrderList'
                });
              },
            })
          }
        }
      })
    },
    checkBookingStatus(){
      let params={
        order_id:this.id,
      }
      const timer=setInterval(()=>{
        this.$api.checkBookingStatus(params).then((res)=>{
          if(res.data.data.paid===true){
            clearInterval(timer)
            uni.redirectTo({
                url: 'subA/serviceOrderList/serviceOrderList'
            });
          }
        })
      },1000)
    }
  },
}
</script>
<style lang="scss">
.service-cart {
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
    height: 130rpx;
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
  .services-details{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .details-title{
      width: 90%;
      height: 140rpx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1rpx solid #F6F6F6;
      .icon{
        width: 72rpx;
        height: 72rpx;
        background: linear-gradient(360deg, #F7F1EA 0%, #EBDFD0 100%);
        border-radius: 50%;
        line-height: 72rpx;
        text-align: center;
        image{
          width: 40rpx;
          height: 40rpx;
        }
      }
      .info{
        .name{
          font-size: 32rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 46rpx;
        }
        .order{
          font-size: 26rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 38rpx;
        }
      }
    }
    .services-list{
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30rpx;
      border-bottom: 1rpx solid #F6F6F6;
      .services-item{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        .services-detail{
          display: flex;
          flex-direction: column;
          .services-name{
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 46rpx;
          }
          .services-time{
            font-size: 20rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 24rpx;
            text-align: left;
            image{
              display: inline-block;
              margin-right: 10rpx;
              width: 24rpx;
              height: 24rpx;
            }
          }
        }
        .ervices-price{
          font-size: 20rpx;
          font-family: HarmonyOS_Sans_Medium;
          color: #333333;
          line-height: 28rpx;
        }
      }
    }
    .coupons{
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 20rpx;
      .coupons-title{
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 80rpx;
      }
      .get-coupons{
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8e8e8e;
        line-height: 80rpx;
        image{
          width: 24rpx;
          height: 24rpx;
        }
      }
      .use-coupons{
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #D9C1A5;
        line-height: 80rpx;
      }
    }
    .people{
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .people-title{
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 80rpx;
      }
      .people-num{
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 80rpx;
      }
    }
    .total-detail{
      width: 90%;
      height: 200rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .total-price{
        font-size: 32rpx;
        font-family: HarmonyOS_Sans_Medium;
        color: #333333;
        line-height: 88rpx;
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
      }
    }
  }
  .tickets{
    width:100%;
    // min-height:100vh;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 2rpx solid red;
    .tips{
      width: 680rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 32rpx;
      margin: 30rpx 0 0 0;
    }
    .ticket-item{
        width: 680rpx !important;
        height: 100rpx;
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
            .ticket-name{
                font-size: 32rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 60rpx;
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
    .btn-box{
      width: 100%;
      height: 130rpx;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #faf7f2;
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
        margin: 10rpx 0;
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
}
</style>
