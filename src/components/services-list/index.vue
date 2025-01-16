<template>
	<view>
        <u-popup v-model="showPopup" width="100%" height="100%">
            <view class="services">
                <view class="time-list">
                    <view  v-for="(item, index) in timeList" :key="index">
                        <view v-if=item.isActive class="time active" @click="handleTime(item.duration)">{{item.duration}}min</view>
                        <view v-else class="time" @click="handleTime(item.duration)">{{item.duration}}min</view>
                    </view>
                </view>
                <view v-if="showServices" class="services-list">
                    <!-- <view class="service-detail" v-for="(item, index) in servicesList[0]" :key="index">
                        <view class="detail">
                            <view class="name">{{item.name}}<image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_explain%402x.png"></image></view>
                            <view class="price">¥{{item.price}}.00</view>
                        </view>
                        <view class="icon" @click="checkChange(item.name,item.id)">
                           <image v-if="item.checked" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_sel%402x.png"></image>
                           <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_unsel%402x.png"></image>
                        </view>
                    </view> -->
                    <!-- <u-checkbox-group>
                        <u-checkbox 
                            @change="checkboxChange" 
                            class="service-detail"
                            shape="circle"
                            v-model="item.checked" 
                            v-for="(item, index) in services[0]" :key="index" 
                            :name="item.name"
                            :active-color="activeColor"
                        >
                            <view class="detail">
                                <view class="name">{{item.name}}<image  @click="checkServiceDeatil(item.name,item.desc)" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_explain%402x.png"></image></view>
                                <view class="price">¥{{item.mem_price/100}}</view>
                            </view>
                        </u-checkbox>
                    </u-checkbox-group> -->
                    <view class="service-detail" v-for="(item, index) in services[0]" :key="index">
                        <view class="detail">
                            <view class="name">{{item.name}}<image  @click="checkServiceDeatil(item.name,item.desc)" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/appointment_icon_explain%402x.png"></image></view>
                            <view class="price">¥{{item.mem_price/100}}</view>
                        </view>
                        <view class="service-num">
                            <view class="minus" @click="handleMinus(item.name,item.id,item.num)">
                                <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/product_icon_reduce_default%402x.png"></image>
                            </view>
                            <view class="num">{{item.num}}</view>
                            <view class="add" @click="handleAdd(item.name,item.id,item.num)">
                                <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/product_icon_add_default%402x.png"></image>
                            </view>
                        </view>
                    </view>
                    <view class="" style="width:100rpx; height:150rpx;"></view>
                    <view class="finish-btn">
                        <view class="btn" @click="handleChecked">
                            完成
                        </view>
                    </view>
                </view>
            </view>
        </u-popup>
        <u-popup v-model="showDetailPopup" mode="center" width="640rpx" height="780rpx" closeable="true" border-radius="16">
            <view class="services-detail">
                <view class="services-title">服务项目</view>
                <view class="services-intro">
                    <view class="services-name">项目名称：{{serviceName}}</view>
                    <view class="services-image"><image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/service.jpg"></image></view>
                    <view class="services-desc">{{serviceDesc}}</view>
                </view>
            </view>
        </u-popup>
	</view>
</template>
<script>
export default {
	components: {},
	props: {
        servicesItem:{
            type:Array,
            default:[]
        },
        storeId:{
            type:String,
            default:'1'
        }
    },
	data() {
		return {
            showPopup:true,
            serveList:[],
            showServices:true,
            timeList:[],
            servicesList:[],
            services:[],
            active:false,
            activeColor:'#D9C1A5',
            checkedServices:[],
            servicesIdList:[],
            totalPrice:'',
            time:'',
            showDetailPopup:false,
            serviceName:'',
            serviceDesc:''
		}
	},
    watch:{
       
    },
    mounted(){
        // console.log('checkedServices----->',this.checkedServices)
        // console.log('servicesIdList----->',this.servicesIdList)
        // console.log('totalPrice----->',this.totalPrice)
        // 获取本地缓存中的checkedServices和servicesIdList
        if(uni.getStorageSync('checkedServices').length>0){
            this.checkedServices=uni.getStorageSync('checkedServices')
        }
        console.log('uni.getStorageSync checkedServices----->',uni.getStorageSync('servicesIdList'))
        if(uni.getStorageSync('servicesIdList').length>0){
            this.servicesIdList=uni.getStorageSync('servicesIdList')
        }
        console.log('uni.getStorageSync servicesIdList----->',uni.getStorageSync('servicesIdList'))
        if(uni.getStorageSync('totalPrice')){
            this.totalPrice=uni.getStorageSync('totalPrice')
        }
        // 增加被选状态
        if(this.servicesItem.length>0){
            this.servicesItem.forEach(e=>{
                this.timeList.push({duration:e.duration,isActive:false})
            })
            if(this.timeList.length>0){
                this.timeList[0].isActive=true
                this.showPopup=true
            }
            this.handleTime(this.timeList[0].duration)
        }
    },
	methods: {
        // 点击时间tab
        handleTime(time){
            this.time=time
            this.servicesList=[]
            this.servicesItem.forEach(e=>{
                if(e.duration===time){
                    this.servicesList.push(e.items)
                }
            })
            this.timeList.forEach(e=>{
                if(e.duration===time){
                    e.isActive=true
                }else{
                    e.isActive=false
                }
            })
            for(let i=0; i<this.servicesList[0].length; i++){
                this.servicesList[0][i].checked=false
                this.servicesList[0][i].num=0
            }
            console.log('this.checkedServices------->',this.checkedServices)
            console.log('this.servicesList------->',this.servicesList)
            if(this.checkedServices.length>0){
                this.checkedServices.forEach(e=>{
                    this.servicesList[0].forEach(i=>{
                        if(e===i.name){
                            i.checked=true
                            i.num++
                        }
                    })
                })
            }
            this.services=this.$u.deepClone(this.servicesList)
            this.$set(this.services,this.services.index,this.servicesList[0])
            console.log('this.services------->',this.services)
            if(this.services.length>0){
                this.showServices=true
            }
        },
        // 点击复选框
        // checkboxChange(e){
            // this.name=e.name
            // let id=''
            // let price=''
            // if(uni.getStorageSync('checkedServices').length>0){
            //     this.checkedServices=uni.getStorageSync('checkedServices')
            // }
            // if(uni.getStorageSync('servicesIdList').length>0){
            //     this.servicesIdList=uni.getStorageSync('servicesIdList')
            // }
            // if(uni.getStorageSync('totalPrice')){
            //     this.totalPrice=uni.getStorageSync('totalPrice')
            // }
            // console.log('this.services---checkboxChange-->',this.services)
            // this.services[0].forEach(item=>{
            //     if(item.name===e.name){
            //         id=item.id
            //         price=item.mem_price
            //     }
            // })
            // if(e.value===true){
            //     this.checkedServices.push(e.name)
            //     this.servicesIdList.push({id:id,price:price,time:this.time,name:this.name})
            //     this.totalPrice=Number(this.totalPrice)+ Number(price)
            // }
            // if(e.value===false){
            //     this.checkedServices= this.checkedServices.filter(item=>item!==e.name)
            //     this.servicesIdList=this.servicesIdList.filter(item=>item.id!==id)
            //     this.totalPrice=Number(this.totalPrice)- Number(price)
            // } 
            // uni.setStorageSync('checkedServices', this.checkedServices)
            // uni.setStorageSync('servicesIdList', this.servicesIdList)
            // uni.setStorageSync('totalPrice', this.totalPrice)
        // },
        handleChecked(){
            this.$emit('getServices', this.checkedServices)
            this.$emit('getServicesIdList', this.servicesIdList)
            this.$emit('getTotalPrice', this.totalPrice)
        },
        checkServiceDeatil(name,desc){
            this.serviceName=name
            this.serviceDesc=desc
            this.showDetailPopup=true
        },
        handleAdd(itemName,itemId,itemNum){
            let id=''
            let price=''
            this.name=itemName
            this.services[0].forEach(item=>{
                if(item.name===itemName){
                    id=item.id
                    price=item.mem_price
                    item.num++
                }
            })
            this.checkedServices.push(itemName)
            this.servicesIdList.push({id:id,price:price,time:this.time,name:this.name})
            this.totalPrice=Number(this.totalPrice)+ Number(price)
            uni.setStorageSync('checkedServices', this.checkedServices)
            uni.setStorageSync('servicesIdList', this.servicesIdList)
            uni.setStorageSync('totalPrice', this.totalPrice)
        },
        handleMinus(itemName,itemId,itemNum){
            this.services[0].forEach(item=>{
                if(item.name===itemName){
                    if(item.num===0){
                        uni.showToast({
                            title: '本项目不能再减少了～',
                            icon:'none',
                            duration: 2000
                        });
                    }
                    else{
                        if(item.name===itemName){
                            item.num--
                        }
                        let index=this.checkedServices.map(item=>item).indexOf(itemName)
                        delete this.checkedServices[index]
                        this.checkedServices=this.checkedServices.filter((item)=>{return item !== undefined})
                        let i=this.servicesIdList.map(item=>item.name).indexOf(itemName)
                        delete this.servicesIdList[index]
                        this.servicesIdList=this.servicesIdList.filter((item)=>{return item !== undefined})
                        this.totalPrice=Number(this.totalPrice)-Number(item.mem_price)
                        uni.setStorageSync('checkedServices', this.checkedServices)
                        uni.setStorageSync('servicesIdList', this.servicesIdList)
                        uni.setStorageSync('totalPrice', this.totalPrice)
                    }
                }
            })
        }
	},
}
</script>
<style lang="scss">
.services {
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	display: flex;
	flex-direction: row;
    justify-content: space-between;
    .time-list{
        width: 148rpx;
        display: flex;
        flex-direction: column;
        background: #EBDFD0 ;
        .time{
            width: 148rpx;
            height: 100rpx;
            text-align: center;
            line-height: 100rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            border-radius: 0rpx 16rpx 16rpx 0rpx;
        }
        .active{
            background: #D9C1A5;
        }
    }
    .services-list{
        width: calc(100% - 248rpx);
        display: flex;
	    flex-direction: column;
        margin: 0 auto;
        .service-detail{
            width: 100%;
            height: 150rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2rpx solid #F6F6F6;
            .detail{
                display: flex;
                flex-direction: column;
                .name{
                    font-size: 28rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 36rpx;
                    margin-bottom: 10rpx;
                    image{
                        width: 24rpx;
                        height: 24rpx;
                        margin-left: 10rpx;
                    }
                }
                .price{
                    font-size: 20rpx;
                    font-family: HarmonyOS_Sans_Medium;
                    color: #333333;
                    line-height: 24rpx;
                }
            }
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
                margin-right:20rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .add{
                width: 32rpx;
                height: 32rpx;
                margin-left:20rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .icon{
                width: 40rpx;
                height: 40rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .service-num{
                display: flex;
                flex-direction: row;

            }
        }
        .finish-btn{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 120rpx;
            background: #ffffff;
            .btn{
                width: 500rpx;
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
}
.services-detail{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60rpx;
    .services-title{
        width: 85%;
        height: 100rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 100rpx;
        border-bottom: 2rpx solid #F6F6F6;
    }
    .services-intro{
        width: 85%;
        display: flex;
        flex-direction: column;
        margin-top: 30rpx;
        .services-name{
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 28rpx;
            margin-bottom: 30rpx;
        }
        .services-image{
            width: 528rpx;
            height: 296rpx;
            margin-bottom: 30rpx;
            image{
                width: 100%;
                height: 100%;
            }
        }
        .services-desc{
            width: 100%;
            height: 220rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 44rpx;
            white-space: normal;
            word-wrap: break-word;
            word-break: break-all;
        }
    }
}
</style>
<style>
</style>
