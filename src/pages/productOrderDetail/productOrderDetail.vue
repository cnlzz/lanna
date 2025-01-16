<template>
	<view v-if='showDetail' class="products-detail">
        <view class="title">
            <view v-if="checkItem.status==0">待付款</view>
            <view v-if="checkItem.status==1">待发货</view>
            <view v-if="checkItem.status==2">已完成</view>
        </view>
        <view class="detail">
            <view class="store">
                <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_activity%20place%402x.png"></image>
               {{ checkItem.store_id }}
            </view>
            <view class="line"></view>
            <view class="services">
                <view class="service-item" v-for="(item,index) in product_order_items" :key="index">
                    <view class="item-name">{{item.product.name}} x {{item.num}}</view>
                    <view class="item-price">¥{{item.product.price/100*item.num}}</view>
                </view>
            </view>
            <view class="line"></view>
            <!-- <view class="coupon">
                <view class="coupon-title">优惠券</view>
                <view class="coupon-name">精油精油</view>
            </view> -->
            <view class="point">
                <view class="point-title">积分抵扣</view>
                <view class="point-price">{{ checkItem.points }}积分</view>
            </view>
            <view class="total">
                <view class="total-people">实付</view>
                <view class="total-price">¥{{ checkItem.price/100 }}</view>
            </view>
        </view>
        <view class="order-code">
            <view class="order-id">
                <view class="order-title">订单编号</view>
                <view class="id">{{checkItem.product_order_no}}</view>
            </view>
            <view class="order-id">
                <view class="order-title">下单时间</view>
                <view class="id">{{created_time}}</view>
            </view>
            <!-- <view class="order-id">
                <view class="order-title">支付类型</view>
                <view class="id">微信支付</view>
            </view> -->
            <!-- <view class="order-id">
                <view class="order-title">支付时间</view>
                <view class="id">2023-01-09</view>
            </view>
            <view class="order-id">
                <view class="order-title">取消时间</view>
                <view class="id">2023-01-09</view>
            </view>
            <view class="order-id">
                <view class="order-title">完成时间</view>
                <view class="id">2023-01-09</view>
            </view> -->
        </view>
        <view class="order-code">
            <view class="order-id">
                <view class="order-title">账户余额</view>
                <view class="id">{{ remainBalance }}</view>
            </view>
            <view class="order-id">
                <view class="order-title">剩余积分</view>
                <view class="id">{{ remainPoints }}</view>
            </view>
        </view>
        <view class="btns" v-if="checkItem.status==0">
            <view class="cancle" v-if="checkItem.status==0" @click="cancelServiceOrder(checkItem.id)">取消订单</view>
            <view class="pay" v-if="checkItem.status==0" @click="goPay(checkItem.id)">去支付</view>
        </view>
        <u-popup v-model="showPayPopup" mode="bottom" border-radius="24" height="450rpx" closeable="true">
            <view class="pay-box">
                <view class="pay-title">支付</view>
                <view class="amount">￥{{ checkItem.price/100 }}</view>
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
                <view v-if='!loading' class="pay-btn" @click="handlePay(checkItem.id)">支付</view>
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
	data() {
		return {
            checkItem:{},
            id:'',
            store:'',
            showDetail:false,
            product_order_items:[],
            showPayPopup:false,
            wechatSelected:false,
            remainSelected:false,
            payType:'', // 支付类型
            storeArr:[],
            showDetail:false,
            remainPoints:'',
            remainBalance:'',
            created_time:''
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
    onLoad(){
        this.getStoreList()
        let orderId=this.$Route.query.checkItem.id
        this.getProductOrderDetail(orderId)
    },
	mounted(){
    },
	methods: {
        // 获取门店列表
        getStoreList(){
            this.$api.getStoreList().then((res)=>{
                this.storeArr=res.data.data
            })
        },
        // 产品订单详情
        getProductOrderDetail(id){
            this.$api.getProductOrderDetail(id).then((res)=>{
                this.checkItem=res.data.data
                this.product_order_items=res.data.data.product_order_items
                 if(this.storeArr.length>0){
                    this.storeArr.forEach(e=>{
                        if(e.id===this.checkItem.store_id){
                            this.checkItem.store_id=e.name
                        }else{
                            this.checkItem.store_id='四季铭源健康管理有限公司'
                        }
                    })
                 }
                 console.log('this.checkItem----->',this.checkItem)
                 let utc=this.checkItem.created_at
                 console.log('utc----->',utc)
                 let dateA=new Date(utc)
                 let localDateString=dateA.toLocaleDateString()
                 let localDateArr=localDateString.split('/')
                 let y=localDateArr[2]
                 let m=localDateArr[0]
                 let d=localDateArr[1]
                 let localDate=y+'-'+m+'-'+d
                 let localTimeString=dateA.toLocaleTimeString('chinese',{hour12:false})
                 this.created_time=localDate+' '+localTimeString
                 this.userPoints()
                 if(this.product_order_items.length>0){
                    this.showDetail=true
                }
            })
        },
        // 取消订单
        cancelServiceOrder(id){
            this.id=id
            let params={
                order_id:this.id
            }
            this.$api.cancelServiceOrder(params).then((res)=>{
                if(res.data.message==='操作成功'){
                   this.$Router.push({
                        path: '/serviceOrderList',
                    })
                }
               
            })
        },
        // 弹出支付弹框
        goPay(id){
            this.id=id
            this.showPayPopup=true
        },
        selectWechat(){
            this.wechatSelected=!this.wechatSelected
        },
        selectRemain(){
            this.remainSelected=!this.remainSelected
        },
        handlePay(id){
            let params={
                order_id:id,
                type: this.payType
            }
            this.$api.payProductOrder(params).then((res)=>{
                this.loading=true
                if(this.payType=='1'){
                    if(res.data.message==='操作成功'){
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
                            console.log('success---res-------->',res)
                            uni.redirectTo({
                                url: 'pages/productsOrderList/productsOrderList'
                            });
                        },
                        fail (res) { 
                            console.log('fail---res-------->',res)
                            uni.redirectTo({
                                url: 'pages/productsOrderList/productsOrderList'
                            });
                        },
                    })
                }
                }
            })
        },
        userPoints(){
            this.$api.userPoints().then((res)=>{
                this.remainBalance=res.data.data.balance/100
                this.remainPoints=res.data.data.points
            })
        },
	},
}
</script>
<style lang="scss">
.products-detail{
    width:100%;
    min-height:100vh;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
        width: 100%;
        height: 140rpx;
        background: #d9c1a5;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 34rpx;
        padding:30rpx 30rpx;
    }
    .detail{
        width: 680rpx;
        position: relative;
        top: -40rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        .store{
            height: 70rpx;
            margin-left: 30rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 70rpx;
            vertical-align: middle;
            image{
                width: 40rpx;
                height: 40rpx;
            }
        }
        .line{
            width: 620rpx;
            height: 2rpx;
            background: #F6F6F6;
            margin-left: 30rpx;
        }
        .services{
            display: flex;
            flex-direction: column;
            margin: 20rpx;
            .service-item{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin: 30rpx 0;
                .item-name{
                    font-size: 28rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 34rpx;
                }
                .item-price{
                    font-size: 28rpx;
                    font-family: HarmonyOS_Sans_Medium;
                    color:  #333333;;
                    line-height: 28rpx;
                }
            }
        }
        .coupon{
            width: 620rpx;
            margin: 30rpx 30rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .coupon-title{
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 34rpx;
            }
            .coupon-name{
                font-size: 28rpx;
                font-family: HarmonyOS_Sans_Medium;
                color: #FD4A2C;
                line-height: 28rpx;
            }
        }
        .point{
            width: 620rpx;
            margin: 30rpx 30rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .point-title{
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 34rpx;
            }
            .point-price{
                font-size: 28rpx;
                font-family: HarmonyOS_Sans_Medium;
                color: #FD4A2C;
                line-height: 28rpx;
            }
        }
        .total{
            width: 620rpx;
            margin: 30rpx 30rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .total-people{
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 34rpx;
            }
            .total-price{
                font-size: 32rpx;
                font-family: HarmonyOS_Sans_Medium;
                color: #FD4A2C;
                line-height: 32rpx;
            }
        }
    }
    .order-code{
        width: 680rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 40rpx;
        .order-id{
            width: 620rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 10rpx 30rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 32rpx;
        }
    }
    .btns{
        width: 680rpx;
        height: 100rpx;
        margin: 30rpx 0;
        background: #FFFFFF;
        border-radius: 16rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .cancle{
            width: 176rpx;
            height: 56rpx;
            border-radius: 28rpx;
            border: 2rpx solid #999999;
            text-align: center;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 56rpx;
            margin: 0 20rpx;
        }
        .pay{
            width: 176rpx;
            height: 56rpx;
            background: #D9C1A5;
            border-radius: 28rpx;
            font-size: 28rpx;
            text-align: center;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 56rpx;
            margin: 0 20rpx;
        }
        .refund{
            width: 176rpx;
            height: 56rpx;
            border-radius: 28rpx;
            border: 2rpx solid #999999;
            text-align: center;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 56rpx;
            margin: 0 20rpx;
        }
        .check{
            width: 176rpx;
            height: 56rpx;
            border-radius: 28px;
            border: 2rpx solid #D9C1A5;
            font-size: 28rpx;
            text-align: center;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #CC975A;
            line-height: 56rpx;
            margin: 0 20rpx;
        }
        .comment{
            width: 176rpx;
            height: 56rpx;
            border-radius: 28px;
            border: 2rpx solid #D9C1A5;
            font-size: 28rpx;
            text-align: center;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #CC975A;
            line-height: 56rpx;
            margin: 0 20rpx;
        }
    }
    .pay-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .pay-title{
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
<style>
page{
	background: #faf7f2;
}
</style>

