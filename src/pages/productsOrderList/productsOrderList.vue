<template>
	<view class="order-list">
        <view class='tabs'>
            <view style="680rpx">
                <u-tabs name="cate_name" count="cate_count" :list="list" :is-scroll="false" :current="current" :bg-color='d9c1a5' @change="change" :show-bar='false' font-size="28" active-color="#303133"></u-tabs>
            </view>
        </view>
        <view v-if="showList" class="products-list">
            <view class="products-item" v-for="(item,index) in productOrderLogs" :key="index">
                <view class="title">
                    <view class="order-code">
                        订单编号:{{item.product_order_no}}
                    </view>
                    <view class="status">
                        <view v-if="item.status==0">待付款</view>
                        <view v-if="item.status==1">待收货</view>
                        <view v-if="item.status==2">已完成</view>
                        <view v-if="item.status==-1">已取消</view>
                    </view>
                    <!-- <view class="status">
                        <view>待付款</view>
                    </view> -->
                </view>
                <view class="line"></view>
                <!-- <view class="detail">
                    <view class="detail-item" v-for="(item,index) in item.services" :key="index">
                        <view class="item-name">{{item.service_name}}</view>
                        <view class="item-price">¥{{item.mem_price}}</view>
                    </view>
                </view> -->
                <view class="detail">
                    <view class="store">
                        <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_activity%20place%402x.png"></image>
                        {{ item.store_id }}
                    </view>
                    <view class="detail-item" v-for="(i,v) in item.product_order_items" :key="v">
                        <view class="item-name">{{i.product.name}} x {{i.num}}</view>
                        <view class="item-price">¥{{i.product.price/100*i.num}}</view>
                        <!-- <view class="item-price">¥{{i.product.price/100*i.num}}</view>
                        <view class="item-price">¥{{i.product.price/100*i.num}}</view>
                        <view class="item-price">¥{{i.product.price/100*i.num}}</view> -->
                    </view>
                    <view v-if="item.price>0 && item.points==0" class="totalPrice">共实付:¥{{item.price/100}}</view>
                    <view v-if="item.price==0 && item.points>0" class="totalPrice">共实付:{{item.points}}积分</view>
                    <view v-if="item.price>0 && item.points>0" class="totalPrice">共实付:¥{{item.price/100}} + {{item.points}}积分</view>
                </view>
                <view class="btns">
                    <view class="cancle" v-if="item.status==0" @click="checkDetail(item.id)">取消订单</view>
                    <view class="pay" v-if="item.status==0" @click="checkDetail(item.id)">去支付</view>
                    <view class="check" v-if="item.status==1 || item.status==2" @click="checkDetail(item.id)">查看订单</view>
                </view>
            </view>
        </view>
        <!-- <u-popup v-model="showPayPopup" mode="bottom" border-radius="24" height="450rpx" closeable="true">
            <view class="pay-box">
                <view class="title">支付</view>
                <view class="amount">￥99999</view>
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
                <view v-if='!loading' class="pay-btn" @click="handlePay()">支付</view>
                <view v-else class="pay-btn">
                <u-loading mode="circle" ></u-loading>
                </view>
            </view>
	  </u-popup> -->
	</view>
</template>

<script>
export default {
	components: {
		
	},
	data() {
		return {
            list: [
                {
					name: '全部'
				}, 
                {
					name: '待付款'
				}, 
                {
					name: '待收货',
				},
                {
					name: '已完成'
				},
            ],
            current: 0,
            type:'200',
            productOrderLogs:[],
            showPayPopup:false,
            payType:'', // 支付类型
            checkeItem:{},
            showList:false,
            id:''
		}
	},
    watch:{
        // tab的index
        current(value,oldvalue){
            if(value===0){
                this.type='200'
            }
            else if(value===1){
                this.type='0'
            }
            else if(value===2){
                this.type='1'
            }
            else if(value===3){
                this.type='2'
            }
        },
        // 查询的类型 0待付款 1待收货 2已完成 200全部
        type(value,oldvalue){
            if(value!==oldvalue){
                this.getProductOrderLogs()
            }
        },
    },
	mounted(){
        this.getStoreList()
        this.getProductOrderLogs()
    },
	methods: {
         // 获取门店列表
         getStoreList(){
            this.$api.getStoreList().then((res)=>{
                this.storeArr=res.data.data
                console.log('this.storeArr----->',this.storeArr)
            })
        },
        // tab切换
        change(index){
            this.current = index;
        },
        // 获取列表
        getProductOrderLogs(){
            let params={
                status:this.type
            }
            this.$api.getProductOrderLogs(params).then((res)=>{
                this.productOrderLogs=res.data.data.data
                console.log('this.productOrderLogs------>',this.productOrderLogs)
                this.productOrderLogs.forEach(item=>{
                    if(this.storeArr.length>0){
                        this.storeArr.forEach(e=>{
                            if(e.id===item.store_id){
                                item.store_id=e.name
                            }else{
                                item.store_id='四季铭源健康管理有限公司'
                            }
                        })
                    }
                })
                
                if(this.productOrderLogs.length>0){
                    this.showList=true
                }
            })
        },
        // 订单详情
        checkDetail(id){
            this.id=id
            this.productOrderLogs.forEach(e=>{
                if(e.id===id){
                    this.checkeItem=e
                }
            })
            if(JSON.stringify(this.checkeItem) !== "{}"){
                this.$Router.push({
                    path: '/productOrderDetail',
                    query: {
                        checkItem: JSON.stringify(this.checkeItem),
                    },
                })
            }
            
        },
	},
}
</script>
<style lang="scss">
.order-list{
    width:100%;
    min-height:100vh;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabs{
        width: 100%;
        height: 100rpx;
        background: #d9c1a5;
    }
    .products-list{
        width: 680rpx;
        display: flex;
        flex-direction: column;
        .products-item{
            width: 100%;
            background: #FFFFFF;
            border-radius: 16rpx;
            margin: 20rpx 0;
            .title{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin: 20rpx;
                .status{
                    font-size: 26rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #999999;
                    line-height: 32rpx;
                }
            }
            .line{
                width: 620rpx;
                height: 2rpx;
                background: #F6F6F6;
                margin-left: 30rpx;
            }
            .detail{
                display: flex;
                flex-direction: column;
                margin: 20rpx;
                .store{
                    margin-bottom: 20rpx;
                    image{
                        width: 40rpx;
                        height: 40rpx;
                    }
                }
                .detail-item{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin: 20rpx 0;
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
                        color: #333333;
                        line-height: 28rpx;
                    }
                }
                .totalPrice{
                    margin-top: 20rpx;
                    text-align: right;
                    font-size: 30rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FD4A2C;
                    line-height: 30rpx;
                }
            }
            .btns{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-bottom: 30rpx;
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
<style>
page{
	background: #faf7f2;
}
</style>

