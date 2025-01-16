<template>
	<view class="order-detail">
        <view class="title"></view>
        <view class="detail">
            <view class="store">
                <image class="" src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/introduce_icon_activity%20place%402x.png"></image>
                {{ store }}
            </view>
            <view class="line"></view>
            <view class="stars">
                <view class="star-item">
                    <view class="star-title">总体</view>
                    <view class="star-num">
                        <image v-if='commonFirst' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getCommonStars('1')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unCommonStars"></image>
                        <image v-if='commonSecond' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getCommonStars('2')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unCommonStars"></image>
                        <image v-if='commonThird' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getCommonStars('3')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unCommonStars"></image>
                        <image v-if='commonForth' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getCommonStars('4')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unCommonStars"></image>
                        <image v-if='commonFifth' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getCommonStars('5')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unCommonStars"></image>
                    </view>
                </view>
                <view class="star-item">
                    <view class="star-title">服务</view>
                    <view class="star-num">
                        <image v-if='serviceFirst' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getServiceStars('1')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unServiceStars"></image>
                        <image v-if='serviceSecond' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getServiceStars('2')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unServiceStars"></image>
                        <image v-if='serviceThird' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getServiceStars('3')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unServiceStars"></image>
                        <image v-if='serviceForth' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getServiceStars('4')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unServiceStars"></image>
                        <image v-if='serviceFifth' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getServiceStars('5')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unServiceStars"></image>
                    </view>
                </view>
                <view class="star-item">
                    <view class="star-title">效果</view>
                    <view class="star-num">
                        <image v-if='effectFirst' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getEffectStars('1')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unEffectStars"></image>
                        <image v-if='effectSecond' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getEffectStars('2')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unEffectStars"></image>
                        <image v-if='effectThird' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getEffectStars('3')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unEffectStars"></image>
                        <image v-if='effectForth' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getEffectStars('4')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unEffectStars"></image>
                        <image v-if='effectFifth' src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star-un.png" @click="getEffectStars('5')"></image>
                        <image v-else src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/star.png" @click="unEffectStars"></image>
                    </view>
                </view>
            </view>
            <view class="comments">
                <u-input v-model="comment" type="textarea" :border="true" :height="200" :placeholder="placeholder" maxlength="150" clearable="false"/>
            </view>
            <view class="photoes">
				<uni-file-picker 
                    v-model="fileList"
                    limit="1" 
                    title="最多选择3张图片" 
                    mode="grid" 
                    :image-styles="imageStyles" 
                    @select="select" 
                    fileMediatype="image" 
                    @progress="progress" 
                    :auto-upload="true"
                ></uni-file-picker>
            </view>
        </view>
        <view v-if='comment=="" && overall_score=="0" && service_score=="0" && effect_score=="0" && img.length=="0"' class="submit" @click="submit">
            提交评论
        </view>
        <view v-else class="submit submitA" @click="submit">
            提交评论
        </view>
	</view>
</template>

<script>
import OSS from 'ali-oss'
import {uniFilePicker} from '@dcloudio/uni-ui'
export default {
	components: {
		uniFilePicker,
	},
	data() {
		return {
            checkItem:{},
            id:'',
            store:'',
            placeholder:'满意您就夸一夸，点击这里输入评价～',
            fileList:[],
            action:'',
            imageStyles:{
				width:98,
				height:98,
				border:{
					width:1,
					style:'solid'
				}
			},
            commonFirst:true,
            commonSecond:true,
            commonThird:true,
            commonForth:true,
            commonFifth:true,
            serviceFirst:true,
            serviceSecond:true,
            serviceThird:true,
            serviceForth:true,
            serviceFifth:true,
            effectFirst:true,
            effectSecond:true,
            effectThird:true,
            effectForth:true,
            effectFifth:true,
            overall_score:'0',
            service_score:'0',
            effect_score:'0',
            comment:'',
            img:[],
            storeArr:[]
		}
	},
    watch:{
       
    },
    onLoad(){
        this.store=this.$Route.query.store
        this.id=this.$Route.query.id
        this.getStoreList()
    },
	mounted(){
    },
	methods: {
        // 获取门店列表
        getStoreList(){
            this.$api.getStoreList().then((res)=>{
                this.storeArr=res.data.data
                this.storeArr.forEach(e=>{
                    if(e.id===this.store){
                        this.store=e.name
                    }
                })
            })
        },
        uploadPhoto(name,file){
            console.log('name------>',name)
            console.log('file------>',file)
            this.$api.getOssToken().then((res)=>{
                console.log('res--token----->',res.data.data.Credentials)
                let credentials=res.data.data.Credentials
                let client=new OSS({
                    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
                    region: 'oss-cn-shanghai',
                    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
                    accessKeyId: credentials.AccessKeyId,
                    accessKeySecret: credentials.AccessKeySecret,
                    // 从STS服务获取的安全令牌（SecurityToken）。
                    stsToken: credentials.SecurityToken,
                    // 填写Bucket名称。
                    bucket: 'lanna-product'
                })
                client.put(name,file).then(function (r1){
                    console.log('put success------->', r1);
                    return client.get('object');
                }).then(function (r2){
                    console.log('get success------>', r2);
                }).catch(function (err) {
                    console.log('error------->', err);
                });                    
            })
        },
        select(e){
            console.log('e---select------>',e)
            this.imageFile=e.tempFiles[0].url
            this.imageName=e.tempFiles[0].name
            console.log('this.imageFile------->',this.imageFile)
            console.log('this.imageName------->',this.imageName)
            this.uploadPhoto(this.imageName,this.imageFile)
        },
        progress(e){
            console.log('e---progress------>',e)
        },
        // 提交评论
        submit(){
           if(this.comment=="" && this.overall_score=="0" && this.service_score=="0" && this.effect_score=="0" && this.img.length=="0"){
             this.comment="非常赞～推荐推荐～"
             this.overall_score=="5"
             this.service_score=="5"
             this.effect_score=="5"
           }
           let params={
                order_id:this.id,
                overall_score:this.overall_score,
                service_score:this.service_score,
                effect_score:this.effect_score,
                comment:this.comment,
                img:this.img
            }
            this.$api.setServiceEvaluation(params).then((res)=>{
                if(res.data.message=="操作成功"){
                    this.$Router.replace({
                        path: '/serviceOrderList',
                    })
                }
            })
        },
        // 总体分数
        getCommonStars(index){
            if(index==='1'){
                this.commonFirst=false
                this.overall_score=index
            }
            if(index==='2'){
                this.commonFirst=false
                this.commonSecond=false
                this.overall_score=index
            }
            if(index==='3'){
                this.commonFirst=false
                this.commonSecond=false
                this.commonThird=false
                this.overall_score=index
            }
            if(index==='4'){
                this.commonFirst=false
                this.commonSecond=false
                this.commonThird=false
                this.commonForth=false
                this.overall_score=index
            }
            if(index==='5'){
                this.commonFirst=false
                this.commonSecond=false
                this.commonThird=false
                this.commonForth=false
                this.commonFifth=false
                this.overall_score=index
            }
        },
        unCommonStars(){
            this.commonFirst=true
            this.commonSecond=true
            this.commonThird=true
            this.commonForth=true
            this.commonFifth=true
            this.overall_score='0'
        },
        // 服务分数
        getServiceStars(index){
            if(index==='1'){
                this.serviceFirst=false
                this.service_score=index
            }
            if(index==='2'){
                this.serviceFirst=false
                this.serviceSecond=false
                this.service_score=index
            }
            if(index==='3'){
                this.serviceFirst=false
                this.serviceSecond=false
                this.serviceThird=false
                this.service_score=index
            }
            if(index==='4'){
                this.serviceFirst=false
                this.serviceSecond=false
                this.serviceThird=false
                this.serviceForth=false
                this.service_score=index
            }
            if(index==='5'){
                this.serviceFirst=false
                this.serviceSecond=false
                this.serviceThird=false
                this.serviceForth=false
                this.serviceFifth=false
                this.service_score=index
            }
        },
        unServiceStars(){
            this.serviceFirst=true
            this.serviceSecond=true
            this.serviceThird=true
            this.serviceForth=true
            this.serviceFifth=true
            this.service_score='0'
        },
        // 效果分数
        getEffectStars(index){
            if(index==='1'){
                this.effectFirst=false
                this.effect_score=index
            }
            if(index==='2'){
                this.effectFirst=false
                this.effectSecond=false
                this.effect_score=index
            }
            if(index==='3'){
                this.effectFirst=false
                this.effectSecond=false
                this.effectThird=false
                this.effect_score=index
            }
            if(index==='4'){
                this.effectFirst=false
                this.effectSecond=false
                this.effectThird=false
                this.effectForth=false
                this.effect_score=index
            }
            if(index==='5'){
                this.effectFirst=false
                this.effectSecond=false
                this.effectThird=false
                this.effectForth=false
                this.effectFifth=false
                this.effect_score=index
            }
        },
        unEffectStars(){
            this.effectFirst=true
            this.effectSecond=true
            this.effectThird=true
            this.effectForth=true
            this.effectFifth=true
            this.effect_score='0'
        }
	},
}
</script>
<style lang="scss">
.order-detail{
    width:100%;
    min-height:100vh;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
        width: 100%;
        height: 100rpx;
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
        top: -60rpx;
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
        .stars{
            display: flex;
            flex-direction: column;
            margin-left: 40rpx;
            .star-item{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 30rpx 0;
                .star-title{
                    font-size: 30rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 50rpx;
                    margin-right: 70rpx;
                }
                .star-num{
                    width: 350rpx;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    image{
                        width: 50rpx;
                        height: 50rpx;
                    }
                }
            }
        }
        .comments{
            margin: 20rpx 30rpx 40rpx 30rpx;
        }
        .photoes{
            display: flex;
            flex-direction: row;
            margin-left: 20rpx;
            margin-bottom: 70rpx;
        }
        
    }
    .submit{
        width: 600rpx;
        height: 88rpx;
        background: #EEEEEE;
        border-radius: 44rpx;
        text-align: center;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 88rpx;
    }
    .submitA{
        background: #D9C1A5 ;
        color: #333333;
    }
}
</style>
<style>
page{
	background: #faf7f2;
}
</style>

