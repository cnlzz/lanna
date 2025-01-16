<template>
	<view class="order-list">
        <view class='tabs'>
            <view style="680rpx">
                <u-tabs name="cate_name" count="cate_count" :list="list" :is-scroll="false" :current="current" :bg-color='d9c1a5' @change="change" :show-bar='false' font-size="28" active-color="#303133"></u-tabs>
            </view>
        </view>
        <view class="service-list">
            <view class="service-item" v-for="(item,index) in serviceOrderLogs" :key="index">
                <view class="title">
                    <view class="store">
                        <view class="store-name">
                            <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_activity%20place%402x.png"></image>
                            {{item.store_id}}  
                        </view>
                        <view class="arrival-time">
                            {{item.arrival_started_at}} 
                        </view>
                    </view>
                    <view class="status">
                        <view v-if="item.paid==0">待付款</view>
                        <view v-if="item.paid==1 && item.status==0">待使用</view>
                        <view v-if="item.paid==1 && item.status==2">服务进行中</view>
                        <view v-if="item.paid==1 && item.status==3">已完成</view>
                        <view v-if="item.paid==1 && item.status==4">已取消</view>
                    </view>
                </view>
                <view class="line"></view>
                <view class="detail">
                    <view class="detail-item" v-for="(item,index) in item.services" :key="index">
                        <view class="item-name">{{item.service_name}}</view>
                        <view class="item-price">¥{{item.mem_price/100}}</view>
                    </view>
                </view>
                <view class="btns">
                    <view class="cancle" v-if="item.paid==0" @click="checkDetail(item.id)">取消订单</view>
                    <view class="pay" v-if="item.paid==0" @click="checkDetail(item.id)">去支付</view>
                    <!-- <view class="refund" v-if="item.paid==1 && item.status==0">申请退款</view> -->
                    <view class="check" v-if="item.paid==1 && item.status==0" @click="checkDetail(item.id)">查看订单</view>
                    <view class="check" v-if="item.paid==1 && item.status==2" @click="checkDetail(item.id)">查看订单</view>
                    <view class="check" v-if="item.paid==1 && item.status==3 && item.evaluations_count==1" @click="checkDetail(item.id)">查看订单</view>
                    <view class="comment" v-if="item.paid==1 && item.status==3 && item.evaluations_count==0" @click="goComment(item.store_id,item.id)">去评价</view>
                </view>
            </view>
        </view>
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
					name: '待使用',
				},
                {
					name: '已完成'
				},
            ],
            current: 0,
            type:'0',
            serviceOrderLogs:[],
            showPayPopup:false,
            wechatSelected:false,
            remainSelected:false,
            payType:'', // 支付类型
            checkeItem:{}
		}
	},
    watch:{
        current(value,oldvalue){
            this.type=value
        },
        type(value,oldvalue){
            if(value!==oldvalue){
                this.getServiceOrderLogs()
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
        this.getStoreList()
        this.getServiceOrderLogs()
    },
	methods: {
        getStoreList(){
            this.$api.getStoreList().then((res)=>{
                this.storeArr=res.data.data
            })
        },
        change(index){
            this.current = index;
        },
        getServiceOrderLogs(){
            let params={
                type:this.type
            }
            this.$api.getServiceOrderLogs(params).then((res)=>{
                this.serviceOrderLogs=res.data.data.data
                if(this.serviceOrderLogs.length>0){
                    this.serviceOrderLogs.forEach(e=>{
                        if(this.storeArr.length>0){
                            this.storeArr.forEach(item=>{
                                if(item.id===e.store_id){
                                    e.store_id=e.name
                                }else{
                                    e.store_id='四季铭源健康管理有限公司'
                                }
                            })
                        }
                    })
                   
                }
            })
            
        },
        checkDetail(id){
            this.id=id
            this.serviceOrderLogs.forEach(e=>{
                if(e.id===id){
                    this.checkeItem=e
                }
            })
            if(JSON.stringify(this.checkeItem) !== "{}"){
                this.$Router.push({
                    path: '/serviceOrderDetail',
                    query: {
                        checkItem: JSON.stringify(this.checkeItem),
                    },
                })
            }
            
        },
        goComment(store,id){
            this.$Router.push({
                path: '/commentService',
                query: {
                    store: store,
                    id:id
                },
            })
        }
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
    .service-list{
        width: 680rpx;
        display: flex;
        flex-direction: column;
        .service-item{
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
                .store{
                    display: flex;
                    flex-direction: row;
                    .store-name{
                        width: 220rpx;
                        overflow:hidden;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        image{
                            width: 40rpx;
                            height: 40rpx;
                        }
                    }
                }
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
                        color: #FD4A2C;
                        line-height: 28rpx;
                    }
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
