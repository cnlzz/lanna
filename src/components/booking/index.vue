<template>
	<view class="booking" v-if="showBooking">	
        <view class="people">
            <view class="title">
                <view class="icon">
                    <image v-if="peopleChecked" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_sel%402x.png"></image>
                    <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_unsel%402x.png"></image>
                </view>
                <view class="text">
                    选择到店人数
                </view>
            </view>
            <scroll-view class="people-check" scroll-x="true" scroll-y="false" scroll-top="0" scroll-left="0" scroll-into-view="" scroll-with-animation="false">
                <view class="num-box" v-for="(item,index) in people" :key="index" @click="handlePeople(item.num,item.isActive)">
                    <view v-if=item.isActive class="num-box-checked">{{item.num}}</view>
                    <view v-else>{{item.num}}</view>
                </view>
            </scroll-view>
        </view>
        <view class="services">
            <view class="title">
                <view class="icon">
                    <image v-if="serviceChecked" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_sel%402x.png"></image>
                    <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_unsel%402x.png"></image>
                    选择项目
                </view>
                <view class="service-btn" @click="getServeList">去选择<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/icon_go%402x.png"></image></view>
            </view>
            <scroll-view v-if="(checkedServices.length>0)" class="service-detail" scroll-x="true" scroll-y="false" scroll-top="0" scroll-left="0" scroll-into-view="" scroll-with-animation="false">
                <view class="service-box" v-for="(item,index) in checkedServices" :key="index">{{item}}</view>
            </scroll-view>
        </view>
        <view class="time">
            <view class="title">
                <view class="icon">
                    <image v-if="timeChecked" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_sel%402x.png"></image>
                    <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_unsel%402x.png"></image>
                    选择到店时间
                </view>
            </view>
            <view  v-if='showDateList' style="margin-bottom:30rpx;">
                <lanna-tabs :list="dateList" :show-bar="false" :current="current" @change="changeTab" :active-item-style="activityColor"></lanna-tabs>
            </view>
            <view  v-else style="margin-bottom:30rpx;" @click="clickTab">
                <lanna-tabs :list="dateList" :current="current" :show-bar="false"></lanna-tabs>
            </view>
            <view style="margin-bottom:30rpx;" @click="clickTab">
                <view v-if="tips!==''">
                    {{tips}}
                </view>
                <view v-else>
                    <view  v-if='showTimeList' style="margin-bottom:30rpx;">
                        <lanna-time-tabs v-if='showTimeList' :current="timeCurrent" :list="timeList" @change="changeTimeTab" :show-bar="false" :active-item-style="activityColor"></lanna-time-tabs>
                    </view>
                    <view  v-else style="margin-bottom:30rpx;" @click="clickTab">
                        <lanna-time-tabs :list="timeList" :current="timeCurrent" :show-bar="false"></lanna-time-tabs>
                    </view>                
                </view>
            </view>
        </view>
        <lanna-services-list v-if="showServicesList" :storeId="storeId" :servicesItem="servicesItem" @getServices="getServices" @getServicesIdList="getServicesIdList" @getTotalPrice="getTotalPrice"></lanna-services-list>
        <view class="cart-box">
            <lanna-service-cart ref="cart" :totalServicesPeople="totalServicesPeople" :totalServicesPrice="totalServicesPrice" :storeId="storeId" :shop="shop" :servicesIdList="servicesIdList" :checkedDate="checkedDate" :checkedTime="checkedTime"></lanna-service-cart>
        </view>
	</view>
</template>
<script>
import lannaServicesList from '../services-list/index.vue'
import lannaTabs from '../../components/u-tabs/u-tabs.vue'
import lannaTimeTabs from '../../components/time-tab/index.vue'
import lannaServiceCart from '../../components/services-cart/index.vue'
export default {
	components: {
        lannaServicesList,
        lannaTabs,
        lannaTimeTabs,
        lannaServiceCart
    },
	props: {
        shop:{
            type: String,
            defult: '四季铭源健康管理有限公司'
        }
    },
	data() {
		return {
           showBooking:false,
           storeId:'', // 店铺id
           servicesItem:[], // 服务列表
           showServicesList:false, // 显示服务popup
           serveList:[], // 服务列表
           checkedServices:[], // 已选中的服务
           peopleNum:'', // 选择的人数
           peopleChecked:false, // 人数是否选择
           serviceChecked:false, // 服务是否选择
           timeChecked:false, // 时间是否选择
           checkedDate:'', // 选中的日期
           checkedTime:'', // 选中的时间
           people:[
                {
                    num:'1',
                    isActive:false
                },
                {
                    num:'2',
                    isActive:false
                },
                {
                    num:'3',
                    isActive:false
                },
                {
                    num:'4',
                    isActive:false
                },
                {
                    num:'5',
                    isActive:false
                },
                {
                    num:'6',
                    isActive:false
                },
                {
                    num:'7',
                    isActive:false
                },
                {
                    num:'8',
                    isActive:false
                },
                {
                    num:'9',
                    isActive:false
                },
                {
                    num:'10',
                    isActive:false
                },
                {
                    num:'11',
                    isActive:false
                },
                {
                    num:'12',
                    isActive:false
                },
            ],
            activeColor:'#D9C1A5',
            dateList:[], // 日期列表
            timeList:[], // 时间列表
            activityColor:{
                background:'#D9C1A5',
            },
            current:0, // 选中的日期下标
            timeCurrent:0, // 选中的时间下标
            tips:'', //提示
            showDateList:false, // 显示日期
            showTimeList:false, // 显示时间
            servicesIdList:[], // 服务id列表
            totalPrice:'', // 服务总价格
            totalServicesPeople:'', // 传入购物车的总人数
            totalServicesPrice:'', // 传入购物车的总服务价格
            shopList:[],
            shopNameList:[]
		}
	},
    watch:{
        storeId(value,oldvalue){
            if(value!==oldvalue){
                this.getDatesList()
            }
        },
        peopleNum(value,oldvalue){
            if(value!==""){
                this.peopleChecked=true
                if(value!==oldvalue){
                    this.totalServicesPeople=value
                }
            }
        },
        checkedServices(value,oldvalue){
            if(value.length>0){
                this.serviceChecked=true
                this.totalServicesPeople=this.peopleNum
                this.totalServicesPrice=this.totalPrice
            }else{
                this.serviceChecked=false
            }
        },
        current(value,oldvalue){
            if(value!==oldvalue){
                this.timeCurrent=0
            }
        },
        checkedDate(value,oldvalue){
            if(value && this.checkedTime){
                this.timeChecked=true
            }else{
                this.timeChecked=false
            }
        }
    },
    mounted(){
        if(uni.getStorageSync('checkedServices').length>0){
            this.checkedServices=uni.getStorageSync('checkedServices')
        }
        if(uni.getStorageSync('servicesIdList').length>0){
            this.servicesIdList=uni.getStorageSync('servicesIdList')
        }
        if(uni.getStorageSync('totalPrice')){
            this.totalPrice=uni.getStorageSync('totalPrice')
        }
        if(!this.peopleChecked){
            this.peopleChecked=false 
            this.serviceChecked=false
            this.timeChecked=false
            this.checkedServices=[]
            uni.removeStorageSync('checkedServices')
            uni.removeStorageSync('servicesIdList')
            uni.removeStorageSync('totalPrice')
        }
        if(uni.getStorageSync('shopList').length>0){
            this.shopList=uni.getStorageSync('shopList')
        }else{
            this.$api.getStoreList().then((res)=>{
                res.data.data.forEach(e=>{
                    this.shopList.push({
                        id:e.id,
                        name:e.name
                    })
                    this.shopNameList.push(e.name)
                })
                if(this.shop===''){
                    this.shop=this.shopNameList[0]
                }
                uni.setStorageSync('shopList',this.shopList)
                uni.setStorageSync('shopNameList',this.shopNameList)
            })
        }
        this.formateShop(this.shop)
        this.getDatesList()
    },
	methods: {
        // 去选择服务列表
        getServeList(){
            if(!this.peopleChecked){
                uni.showToast({
                    title: '请选择人数',
                    icon:'none',
                    duration: 2000
                });
            }else{
                let params={
                    store_id:Number(this.storeId)
                }
                this.$api.getServeList(params).then((res)=>{
                    if(res.data.code===401){
                        this.$Router.replace({
                            path: '/auth',
                        })
                    }else{
                        this.serveList=res.data.data
                        this.storeId=this.storeId
                        this.servicesItem=this.serveList
                        this.showServicesList = true
                    }
                })
            }
        },
        // 选择到店人数
        handlePeople(num,isActive){
            this.people.forEach(e=>{
                if(e.num===num){
                    e.isActive=true
                }else{
                    e.isActive=false
                }
            })
            this.peopleNum=num
        },
        // 获取服务项目列表
        getServices(e){
            console.log('e==getServices===>',e)
            this.showServicesList=false
            if(e.length>0){
                this.checkedServices=e
            }
        },
        // 获取日期列表
        getDatesList(){
            if(this.storeId){
                let params={
                    store_id:Number(this.storeId)
                }
                this.$api.getDatesList(params).then((res)=>{
                    if(res.data.code===401){
                        this.$Router.replace({
                            path: '/auth',
                        })
                    }else{
                        this.showBooking=true
                        this.dateList=res.data.data
                        this.dateList.forEach(item=>{
                            item.items.forEach(e=>{
                                let date=new Date(e.timestamp * 1000)
                                let Y = date.getFullYear() + '-';
                                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                                let D = date.getDate() + ' ';
                                let h = date.getHours() + ':';
                                let m = date.getMinutes();
                                e.timestamp=h+(m<10?'0'+m:m)
                            })
                            if(item.weekday===1){
                                item.weekday='周一'
                            }
                            if(item.weekday===2){
                                item.weekday='周二'
                            }
                            if(item.weekday===3){
                                item.weekday='周三'
                            }
                            if(item.weekday===4){
                                item.weekday='周四'
                            }
                            if(item.weekday===5){
                                item.weekday='周五'
                            }
                            if(item.weekday===6){
                                item.weekday='周六'
                            }
                            if(item.weekday===0){
                                item.weekday='周日'
                            }
                        })
                        if(this.dateList){
                            let time= this.dateList[0].items
                            // console.log('time-------->',time)
                            this.formateTime(time,this.dateList[0].days)
                        }
                    }
                })
            }
           
        },
        // 点击未选中的日期tab
        clickTab(){
            if(!this.serviceChecked){
                uni.showToast({
                    title: '请选择服务',
                    icon:'none',
                    duration: 2000
                });
            }else{
                if(this.showDateList===false){
                    this.showDateList=true
                    this.showTimeList=true
                    this.changeTab(0)
                    this.changeTimeTab(0)
                }
            }
        },
        // 选择日期
        changeTab(index){
            this.current=index
            let time= this.dateList[index].items
            // console.log('time-------->',time)
            this.formateTime(time,this.dateList[index].days)
            this.checkedDate=this.dateList[index].days
            if(this.checkedDate){
                this.$refs.cart.getDate(this.checkedDate)
            }
        },
        // 选择时间
        changeTimeTab(index){
            this.timeCurrent=index
            this.checkedTime=this.timeList[index].timestamp
            if(this.checkedTime){
                this.$refs.cart.getTime(this.checkedTime)
            }
        },
        // 获取时间列表
        formateTime(list,days){
            // console.log('list-------->',list)
            this.timeList=[]
            list.forEach(e=>{
                if(e.timestamp==='0:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "00:00"},
                        {stock: e.stock,timestamp: "00:15"},
                        {stock: e.stock,timestamp: "00:30"},
                        {stock: e.stock,timestamp: "00:45"},
                    )
                }
                if(e.timestamp==='1:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "01:00"},
                        {stock: e.stock,timestamp: "01:15"},
                        {stock: e.stock,timestamp: "01:30"},
                        {stock: e.stock,timestamp: "01:45"},
                    )
                }
                if(e.timestamp==='2:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "02:00"},
                        {stock: e.stock,timestamp: "02:15"},
                        {stock: e.stock,timestamp: "02:30"},
                        {stock: e.stock,timestamp: "02:45"},
                    )
                }
                if(e.timestamp==='3:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "03:00"},
                        {stock: e.stock,timestamp: "03:15"},
                        {stock: e.stock,timestamp: "03:30"},
                        {stock: e.stock,timestamp: "03:45"},
                    )
                }
                if(e.timestamp==='4:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "04:00"},
                        {stock: e.stock,timestamp: "04:15"},
                        {stock: e.stock,timestamp: "04:30"},
                        {stock: e.stock,timestamp: "04:45"},
                    )
                }
                if(e.timestamp==='5:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "05:00"},
                        {stock: e.stock,timestamp: "05:15"},
                        {stock: e.stock,timestamp: "05:30"},
                        {stock: e.stock,timestamp: "05:45"},
                    )
                }
                if(e.timestamp==='6:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "06:00"},
                        {stock: e.stock,timestamp: "06:15"},
                        {stock: e.stock,timestamp: "06:30"},
                        {stock: e.stock,timestamp: "06:45"},
                    )
                }
                if(e.timestamp==='7:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "07:00"},
                        {stock: e.stock,timestamp: "07:15"},
                        {stock: e.stock,timestamp: "07:30"},
                        {stock: e.stock,timestamp: "07:45"},
                    )
                }
                if(e.timestamp==='8:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "08:00"},
                        {stock: e.stock,timestamp: "08:15"},
                        {stock: e.stock,timestamp: "08:30"},
                        {stock: e.stock,timestamp: "08:45"},
                    )
                }
                if(e.timestamp==='9:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "09:00"},
                        {stock: e.stock,timestamp: "09:15"},
                        {stock: e.stock,timestamp: "09:30"},
                        {stock: e.stock,timestamp: "09:45"},
                    )
                }
                if(e.timestamp==='10:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "10:00"},
                        {stock: e.stock,timestamp: "10:15"},
                        {stock: e.stock,timestamp: "10:30"},
                        {stock: e.stock,timestamp: "10:45"},
                    )
                }
                if(e.timestamp==='11:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "11:00"},
                        {stock: e.stock,timestamp: "11:15"},
                        {stock: e.stock,timestamp: "11:30"},
                        {stock: e.stock,timestamp: "11:45"},
                    )
                }
                if(e.timestamp==='12:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "12:00"},
                        {stock: e.stock,timestamp: "12:15"},
                        {stock: e.stock,timestamp: "12:30"},
                        {stock: e.stock,timestamp: "12:45"},
                    )
                }
                if(e.timestamp==='13:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "13:00"},
                        {stock: e.stock,timestamp: "13:15"},
                        {stock: e.stock,timestamp: "13:30"},
                        {stock: e.stock,timestamp: "13:45"},
                    )
                }
                if(e.timestamp==='14:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "14:00"},
                        {stock: e.stock,timestamp: "14:15"},
                        {stock: e.stock,timestamp: "14:30"},
                        {stock: e.stock,timestamp: "14:45"},
                    )
                }
                if(e.timestamp==='15:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "15:00"},
                        {stock: e.stock,timestamp: "15:15"},
                        {stock: e.stock,timestamp: "15:30"},
                        {stock: e.stock,timestamp: "15:45"},
                    )
                }
                if(e.timestamp==='16:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "16:00"},
                        {stock: e.stock,timestamp: "16:15"},
                        {stock: e.stock,timestamp: "16:30"},
                        {stock: e.stock,timestamp: "16:45"},
                    )
                }
                if(e.timestamp==='17:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "17:00"},
                        {stock: e.stock,timestamp: "17:15"},
                        {stock: e.stock,timestamp: "17:30"},
                        {stock: e.stock,timestamp: "17:45"},
                    )
                } if(e.timestamp==='18:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "18:00"},
                        {stock: e.stock,timestamp: "18:15"},
                        {stock: e.stock,timestamp: "18:30"},
                        {stock: e.stock,timestamp: "18:45"},
                    )
                } if(e.timestamp==='19:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "19:00"},
                        {stock: e.stock,timestamp: "19:15"},
                        {stock: e.stock,timestamp: "19:30"},
                        {stock: e.stock,timestamp: "19:45"},
                    )
                } if(e.timestamp==='20:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "20:00"},
                        {stock: e.stock,timestamp: "20:15"},
                        {stock: e.stock,timestamp: "20:30"},
                        {stock: e.stock,timestamp: "20:45"},
                    )
                } if(e.timestamp==='21:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "21:00"},
                        {stock: e.stock,timestamp: "21:15"},
                        {stock: e.stock,timestamp: "21:30"},
                        {stock: e.stock,timestamp: "21:45"},
                    )
                } if(e.timestamp==='22:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "22:00"},
                        {stock: e.stock,timestamp: "22:15"},
                        {stock: e.stock,timestamp: "22:30"},
                        {stock: e.stock,timestamp: "22:45"},
                    )
                } if(e.timestamp==='23:00'){
                    this.timeList.push(
                        {stock: e.stock,timestamp: "23:00"},
                        {stock: e.stock,timestamp: "23:15"},
                        {stock: e.stock,timestamp: "23:30"},
                        {stock: e.stock,timestamp: "23:45"},
                    )
                }
            })
            if(this.timeList.length===0){
                this.tips=`${days}当天已约满，请选择其他日期`
            }
        },
        // 获取项目id及列表
        getServicesIdList(e){
            this.servicesIdList=e
            // console.log('this.servicesIdList----->',this.servicesIdList)
            if(this.servicesIdList.length>0){
                this.$refs.cart.getlist(this.servicesIdList)
            }
        },
        // 获取服务总额
        getTotalPrice(e){
            this.totalPrice=e
        },
        // 动态获取门店
        getShop(shopList,shop){
            this.shopList=shopList
            this.formateShop(shop)
        },
        getShopList(shopList){
            this.shopList=shopList
        },
        formateShop(shop){
            this.shopList.forEach(e=>{
                if(e.name===shop){
                    this.storeId=e.id
                }
            })
        }
      
	},
}
</script>
<style lang="scss">
.booking {
	width: 100%;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
    margin: 30rpx 0;
    .people{
        width: 686rpx;
        display: flex;
        flex-direction: column;
        margin:0 30rpx;
        .title{
            width: 680rpx;
            font-size: 32rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 20rpx;
            .icon{
                width: 45rpx;
                height: 45rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
            }
        }
        .people-check{
            width: 720rpx;
            height: 86rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            // border-radius: 16rpx 0 0 16rpx;
            .num-box{
                width: 120rpx;
                height: 86rpx;
                line-height: 86rpx;
                text-align: center;
                display: inline-block;
                border-left: 1rpx solid #D9C1A5;
                background: #EBDFD0;
            }
            .num-box-checked{
                background: #D9C1A5;
                display: flex;
                flex-direction: column;
            }
        }
    }
    .services{
        width: 686rpx;
        display: flex;
        flex-direction: column;
        margin:30rpx 30rpx;
        .title{
            width: 680rpx;
            font-size: 32rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;          
            margin-bottom: 20rpx;
            .icon{
                width: 300rpx;
                image{
                    width: 45rpx;
                    height: 45rpx;
                }
                .text{
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 40rpx;
                }
            }
            .service-btn{
                width: 200rpx;
                height: 56rpx;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                background: #D9C1A5;
                border-radius: 30rpx;
                font-size: 26rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 56rpx;
                image{
                    width: 38rpx;
                    height: 38rpx;
                };
            }
        }
        .service-detail{
            width: 720rpx;
            height: 86rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            // border-radius: 16rpx 0 0 16rpx;
            .title{
                width: 680rpx;
                font-size: 32rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
                margin-bottom: 20rpx;
            }
            .service-box{
                width: 340rpx;
                height: 86rpx;
                line-height: 86rpx;
                text-align: center;
                display: inline-block;
                // border-left: 1rpx solid #D9C1A5;
                background: #EBDFD0;
                border-radius: 16rpx;
                margin-left: 10rpx;
            }
        }
       
    }
    .time{
        width: 686rpx;
        display: flex;
        flex-direction: column;
        margin:0 30rpx;
        .title{
            width: 680rpx;
            font-size: 32rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;          
            margin-bottom: 20rpx;
            .icon{
                width: 300rpx;
                image{
                    width: 45rpx;
                    height: 45rpx;
                }
            }
        }
        .date-detail{
            width: 720rpx;
            height: 106rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            // border-radius: 16rpx 0 0 16rpx;
            margin-bottom: 20rpx;
            .date-box{
                width: 135rpx;
                height: 106rpx;
                text-align: center;
                display: inline-block;
                border-left: 1rpx solid #D9C1A5;
                background: #EBDFD0;
                .date-box-checked{
                    width: 135rpx;
                    height: 106rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 26rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 26rpx;
                    .days{
                        margin-bottom: 10rpx;
                    }
                }
            }
        }
        .time-detail{
            width: 720rpx;
            height: 86rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            // border-radius: 16rpx 0 0 16rpx;
            .time-box{
                width: 135rpx;
                height: 86rpx;
                line-height: 86rpx;
                text-align: center;
                display: inline-block;
                border-left: 1rpx solid #D9C1A5;
                background: #EBDFD0;
            }
        }
    }
    .cart-box{
        width: 100%;
        height: 210rpx;
        position: fixed;
		left: 0;
		bottom: 0;
    }
}
</style>
<style>
</style>
