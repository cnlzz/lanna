<template>
	<view class="perference-detail">
        <view class="part-one">
            <view class="one-title">基本健康评估(1/3)</view>
            <view class="one-recode">
                <view class="recode-item">
                    <!-- skin_type -->
                    <view class="title">您的皮肤类型?</view>
                    <view class="options">
                        <view v-for="(item,index) in skinType" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="skinTypeClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="skinTypeClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- skin_sick -->
                    <view class="title">您的皮肤正在过敏或起红疹吗?</view>
                    <view class="options">
                        <view v-for="(item,index) in skinSick" :key="index" style="margin-bottom:20rpx">
                            <view v-if="item.isActive" class="option-itemA" @click="skinSickClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="skinSickClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                    <u-input v-model="skin_sick_thing" :border="true" type="textarea" height="300rpx" :placeholder="placeholderA"></u-input>
                </view>
                <view class="recode-item">
                    <!-- more_time_massage_parts -->
                    <view class="title">需要加强或花更多时间按摩的部位</view>
                    <view class="options">
                        <view v-for="(item,index) in moreTimeMassageParts" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="moreTimeMassagePartsClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="moreTimeMassagePartsClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- health_problem -->
                    <view class="title">健康问题请事先告知</view>
                    <view class="options">
                        <view v-for="(item,index) in healthProblem" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="healthProblemClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="healthProblemClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- in_six_month_operation -->
                    <view class="title">是否六个月内接受过手术?</view>
                    <view class="options" style="margin-bottom:20rpx">
                        <view v-for="(item,index) in inSixMonthOperation" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="inSixMonthOperationClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="inSixMonthOperationClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                    <u-input v-model="in_six_month_operation_problem" :border="true" type="textarea" height="300rpx" :placeholder="placeholderB"></u-input>
                </view>
                <view class="recode-item">
                    <!-- in_six_month_operation -->
                    <view class="title" style="margin-bottom:20rpx;">您还有什么其他需要告知我们的健康问题吗？</view>
                    <u-input v-model="tell_us_other_health_problem" :border="true" type="textarea" height="300rpx" :placeholder="placeholderC"></u-input>
                </view>
            </view>
        </view>
        <view class="part-one">
            <view class="one-title">女性健康评估(2/3)</view>
            <view class="one-recode">
                <view class="recode-item">
                    <!-- in_menstruation -->
                    <view class="title">是否处于经期?</view>
                    <view class="options">
                        <view v-for="(item,index) in inMenstruation" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="inMenstruationClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="inMenstruationClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- in_pregnancy -->
                    <view class="title">是否处于孕期?</view>
                    <view class="options">
                        <view v-for="(item,index) in inPregnancy" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="inPregnancyClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="inPregnancyClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- pregnancy_time -->
                    <view class="title">怀孕几周</view>
                    <view class="options">
                        <view v-for="(item,index) in pregnancyTime" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="pregnancyTimeClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="pregnancyTimeClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="part-one">
            <view class="one-title">偏好设置(3/3)</view>
            <view class="one-recode">
                <view class="recode-item">
                    <!-- temperature -->
                    <view class="title">喜欢的环境温度</view>
                    <view class="options">
                        <view v-for="(item,index) in temperatureList" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="temperatureClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="temperatureClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- food -->
                    <view class="title">餐饮喜好</view>
                    <view class="options">
                        <view v-for="(item,index) in foodList" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="foodClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="foodClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- intensity -->
                    <view class="title">喜欢的力度</view>
                    <view class="options">
                        <view v-for="(item,index) in intensityList" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="intensityClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="intensityClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- avoid_parts -->
                    <view class="title">需要避开的部位</view>
                    <view class="options">
                        <view v-for="(item,index) in avoidParts" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="avoidPartsClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="avoidPartsClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- massage_oil_fragrance -->
                    <view class="title">心仪的按摩油香味</view>
                    <view class="options">
                        <view v-for="(item,index) in massageOilFragrance" :key="index">
                            <view v-if="item.isActive" class="option-itemA maxlength" @click="massageOilFragranceClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item maxlength" @click="massageOilFragranceClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- contact_lens_case -->
                    <view class="title">是否需要隐形眼镜盒</view>
                    <view class="options">
                        <view v-for="(item,index) in contactLensCase" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="contactLensCaseClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="contactLensCaseClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
                <view class="recode-item">
                    <!-- steam_eye_mask -->
                    <view class="title">是否需要一次性蒸汽眼罩</view>
                    <view class="options">
                        <view v-for="(item,index) in steamEyeMask" :key="index">
                            <view v-if="item.isActive" class="option-itemA" @click="steamEyeMaskClick(item.name)">{{item.name}}</view>
                            <view v-else class="option-item" @click="steamEyeMaskClick(item.name)">{{item.name}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="confirm-btn" @click="confirm">确认喜好</view>
    </view>
</template>
<script>
import lannaTimeTabs from '../../components/time-tab/index.vue'
export default {
	data() {
		return {
            value:"",
            skin_sick_thing:"",
            in_six_month_operation_problem:"",
            tell_us_other_health_problem:"",
            placeholderA:"若是，请告诉我们您对什么过敏",
            placeholderB:"若是，请告诉我们您的伤口是否已经愈合",
            placeholderC:"请告知我们您的其他健康问题",
            //皮肤类型
            skinType: [
                {
                    name:'干燥',
                    isActive:false
                },
                {
                    name:'中性',
                    isActive:false
                },
                {
                    name:'油性',
                    isActive:false
                },
                {
                    name:'敏感',
                    isActive:false
                },
             ],
             //正在过敏或起红疹
             skinSick: [ 
                {
                    name: "是",
                    isActive:false
                }, 
                {
                    name: "否",
                    isActive:false
                }, 
            ],
             //需要加强或花更多时间按摩的部位
             moreTimeMassageParts: [
                {
                    name:"头部",
                    isActive:false
                },
                {
                    name: "颈肩",
                    isActive:false
                },
                {
                    name:"背部",
                    isActive:false
                },
                {
                    name: "臀部",
                    isActive:false
                },
                {
                    name:  "腹部",
                    isActive:false
                },
                {
                    name:  "腿",
                    isActive:false
                },
                {
                    name:  "腰部",
                    isActive:false
                },
                {
                    name:  "脚",
                    isActive:false
                },
             ],
              //健康问题请事先告知
              healthProblem: [
                {
                    name:"偏头痛",
                    isActive:false
                },
                {
                    name: "心脏病",
                    isActive:false
                },
                {
                    name:"皮肤病",
                    isActive:false
                },
                {
                    name: "高血压",
                    isActive:false
                },
                {
                    name: "静脉曲张",
                    isActive:false
                },
                {
                    name: "肩颈疼痛",
                    isActive:false
                },
                {
                    name: "癫痫",
                    isActive:false
                },
                {
                    name: "糖尿病",
                    isActive:false
                },
                {
                    name:  "癌症",
                    isActive:false
                },
                {
                    name:  "关节骨骼",
                    isActive:false
                },
             ],
             //是否六个月接受手术
             inSixMonthOperation: [ 
                {
                    name: "是",
                    isActive:false
                }, 
                {
                    name: "否",
                    isActive:false
                }, 
            ],
             //是否处于经期
             inMenstruation: [ 
                {
                    name: "是",
                    isActive:false
                }, 
                {
                    name: "否",
                    isActive:false
                }, 
            ],
            //是否处于经期
            inPregnancy: [ 
                {
                    name: "是",
                    isActive:false
                }, 
                {
                    name: "否",
                    isActive:false
                }, 
            ],
              //怀孕几周
            pregnancyTime: [ 
                {
                    name: "少于15周",
                    isActive:false
                }, 
                {
                    name: "16-24周",
                    isActive:false
                }, 
                {
                    name: "超过25周",
                    isActive:false
                }, 
            ],
             //喜欢的环境温度
             temperatureList: [ 
                {
                    name: "凉快",
                    isActive:false
                }, 
                {
                    name: "暖和",
                    isActive:false
                }, 
                {
                    name: "适中",
                    isActive:false
                }, 
            ],
             //餐饮喜好
             foodList: [ 
                {
                    name: "含糖",
                    isActive:false
                }, 
                {
                    name: "无糖",
                    isActive:false
                }
            ],
             //喜欢的力度
             intensityList: [ 
                {
                    name: "标准",
                    isActive:false
                }, 
                {
                    name: "轻柔",
                    isActive:false
                },
                {
                    name: "重力",
                    isActive:false
                }
            ],
             //需要避开的部位
             avoidParts: [
                {
                    name:"头部",
                    isActive:false
                },
                {
                    name: "颈肩",
                    isActive:false
                },
                {
                    name:"背部",
                    isActive:false
                },
                {
                    name: "臀部",
                    isActive:false
                },
                {
                    name:  "腹部",
                    isActive:false
                },
                {
                    name:  "腿",
                    isActive:false
                },
                {
                    name:  "腰部",
                    isActive:false
                },
                {
                    name:  "脚",
                    isActive:false
                },
             ],
             //心仪的按摩油香味
             massageOilFragrance:[
                {
                    name: "奢宠美肌(茉莉花调)",
                    isActive:false
                }, 
                {
                    name:  "清新沁悦(柠檬草调)",
                    isActive:false
                },
                {
                    name:"苦夏甘橙(橙花调)",
                    isActive:false
                },
                {
                    name:"柑橘淡雅(洋甘菊调)",
                    isActive:false
                },
                {
                    name: "天竺依情(天竺葵调)",
                    isActive:false
                },
                {
                    name: "初榨椰子油(椰子调)",
                    isActive:false
                },
                {
                    name: "冷榨甜杏仁油(无味)",
                    isActive:false
                }
             ],
              //是否需要隐形眼镜盒
              contactLensCase: [ 
                {
                    name: "是",
                    isActive:false
                }, 
                {
                    name: "否",
                    isActive:false
                }
            ],
             //是否需要一次性蒸汽眼罩
             steamEyeMask: [ 
                {
                    name: "是",
                    isActive:false
                }, 
                {
                    name: "否",
                    isActive:false
                }
            ],
            skin_type:'',
            skin_sick:'',
            skin_sick_thing:'',
            more_time_massage_parts:[],
            health_problem:[],
            in_six_month_operation:'',
            in_six_month_operation_problem:'',
            tell_us_other_health_problem:'',
            in_menstruation:'',
            in_pregnancy:'',
            pregnancy_time:'',
            temperature:'',
            food:'',
            intensity:'',
            avoid_parts:[] ,
            massage_oil_fragrance:'',
            contact_lens_case: '',
            steam_eye_mask:'',
		}
	},
	onLoad() {
        this.getPreference()
	},
    methods:{
        skinTypeClick(name){
            this.skinType.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.skinType,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.skin_type=e.name
                }
                let filterLength=this.skinType.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.skin_type=''
                }
            })
            console.log('this.skinType------>',this.skinType)
            console.log('this.skin_type------>',this.skin_type)
        },
        skinSickClick(name){
            this.skinSick.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.skinSick,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.skin_sick=e.name
                }
                let filterLength=this.skinSick.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.skin_sick=''
                }
            })
            console.log('this.skinSick------>',this.skinSick)
            console.log('this.skin_sick------>',this.skin_sick)
        },
        moreTimeMassagePartsClick(name){
            this.moreTimeMassageParts.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }
                this.$set(this.moreTimeMassageParts,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.more_time_massage_parts.push(e.name)
                }
                if(e.isActive===false){
                    this.more_time_massage_parts=this.more_time_massage_parts.filter((item)=>{return item !== e.name})
                }
                let filterLength=this.moreTimeMassageParts.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.more_time_massage_parts=[]
                }
            })
            console.log('this.moreTimeMassageParts------>',this.moreTimeMassageParts)
            console.log('this.more_time_massage_parts------>',this.more_time_massage_parts)
        },
        healthProblemClick(name){
            this.healthProblem.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }
                this.$set(this.healthProblem,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.health_problem.push(e.name)
                }
                if(e.isActive===false){
                    this.health_problem=this.health_problem.filter((item)=>{return item !== e.name})
                }
                let filterLength=this.healthProblem.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.health_problem=[]
                }
            })
            console.log('this.healthProblem------>',this.healthProblem)
            console.log('this.health_problem------>',this.health_problem)
        },
        inSixMonthOperationClick(name){
            this.inSixMonthOperation.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.inSixMonthOperation,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.in_six_month_operation=e.name
                }
                let filterLength=this.inSixMonthOperation.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.in_six_month_operation=''
                }
            })
            console.log('this.inSixMonthOperation------>',this.inSixMonthOperation)
            console.log('this.in_six_month_operation------>',this.in_six_month_operation)
        },
        inMenstruationClick(name){
            this.inMenstruation.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.inMenstruation,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.in_menstruation=e.name
                }
                let filterLength=this.inMenstruation.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.in_menstruation=''
                }
            })
            console.log('this.inMenstruation------>',this.inMenstruation)
            console.log('this.in_menstruation------>',this.in_menstruation)
        },
        inPregnancyClick(name){
            this.inPregnancy.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.inPregnancy,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.in_pregnancy=e.name
                }
                let filterLength=this.inPregnancy.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.in_pregnancy=''
                }
            })
            console.log('this.inPregnancy------>',this.inPregnancy)
            console.log('this.in_pregnancy------>',this.in_pregnancy)
        },
        pregnancyTimeClick(name){
            this.pregnancyTime.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.pregnancyTime,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.pregnancy_time=e.name
                }
                let filterLength=this.pregnancyTime.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.pregnancy_time=''
                }
            })
            console.log('this.pregnancyTime------>',this.pregnancyTime)
            console.log('this.pregnancy_time------>',this.pregnancy_time)
        },
        temperatureClick(name){
            this.temperatureList.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.temperatureList,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.temperature=e.name
                }
                let filterLength=this.temperatureList.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.temperature=''
                }
            })
            console.log('this.temperatureList------>',this.temperatureList)
            console.log('this.temperature------>',this.temperature)
        },
        foodClick(name){
            this.foodList.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.foodList,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.food=e.name
                }
                let filterLength=this.foodList.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.food=''
                }
            })
            console.log('this.foodList------>',this.foodList)
            console.log('this.food------>',this.food)
        },
        intensityClick(name){
            this.intensityList.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.intensityList,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.intensity=e.name
                }
                let filterLength=this.intensityList.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.intensity=''
                }
            })
            console.log('this.intensityList------>',this.intensityList)
            console.log('this.intensity------>',this.intensity)
        },
        avoidPartsClick(name){
            this.avoidParts.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }
                this.$set(this.avoidParts,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.avoid_parts.push(e.name)
                }
                if(e.isActive===false){
                    this.avoid_parts=this.avoid_parts.filter((item)=>{return item !== e.name})
                }
                let filterLength=this.avoidParts.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.avoid_parts=[]
                }
            })
            console.log('this.avoidParts------>',this.avoidParts)
            console.log('this.avoid_parts------>',this.avoid_parts)
        },
        massageOilFragranceClick(name){
            this.massageOilFragrance.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.massageOilFragrance,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.massage_oil_fragrance=e.name
                }
                let filterLength=this.massageOilFragrance.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.massage_oil_fragrance=''
                }
            })
            console.log('this.massageOilFragrance------>',this.massageOilFragrance)
            console.log('this.massage_oil_fragrance------>',this.massage_oil_fragrance)
        },
        contactLensCaseClick(name){
            this.contactLensCase.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.contactLensCase,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.contact_lens_case=e.name
                }
                let filterLength=this.contactLensCase.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.contact_lens_case=''
                }
            })
            console.log('this.contactLensCase------>',this.contactLensCase)
            console.log('this.contactLensCase------>',this.contact_lens_case)
        },
        steamEyeMaskClick(name){
            this.steamEyeMask.forEach(e=>{
                if(e.name===name){
                    e.isActive=!e.isActive
                }else{
                    e.isActive=false
                }
                this.$set(this.steamEyeMask,e.isActive,!e.isActive)
                if(e.isActive===true){
                    this.steam_eye_mask=e.name
                }
                let filterLength=this.steamEyeMask.filter((item)=>{return item.isActive !== false})
                if(filterLength==0){
                    this.steam_eye_mask=''
                }
            })
            console.log('this.steamEyeMask------>',this.steamEyeMask)
            console.log('this.steam_eye_mask------>',this.steam_eye_mask)
        },
        confirm(){
            this.more_time_massage_parts_set=Array.from(new Set(this.more_time_massage_parts))
            this.health_problem_set=Array.from(new Set(this.health_problem))
            this.avoid_parts_set=Array.from(new Set(this.avoid_parts))
            let parmas={
                skin_type:this.skin_type,
                skin_sick:this.skin_sick,
                skin_sick_thing:this.skin_sick_thing,
                more_time_massage_parts:this.more_time_massage_parts_set.toString(),
                health_problem:this.health_problem_set.toString(),
                in_six_month_operation:this.in_six_month_operation,
                in_six_month_operation_problem:this.in_six_month_operation_problem,
                tell_us_other_health_problem: this.tell_us_other_health_problem,
                in_menstruation:this.in_menstruation ,
                in_pregnancy:this.in_pregnancy,
                pregnancy_time:this.pregnancy_time,
                temperature:this.temperature,
                food:this.food,
                intensity:this.intensity,
                avoid_parts:this.avoid_parts_set.toString(),
                massage_oil_fragrance:this.massage_oil_fragrance,
                contact_lens_case: this.contact_lens_case,
                steam_eye_mask:this.steam_eye_mask,
            }
            console.log('parmas------->',parmas)
            this.$api.setPreference(parmas).then((res)=>{
                if(res.data.message=='操作成功'){
                    this.$Router.push({
                        path: '/',
                    })
                }
            })
        },
        getPreference(){
            this.$api.getPreference().then((res)=>{
                this.preferenceresList=res.data.data 
                if(this.preferenceresList.length==0){
                    this.skin_type=''
                    this.skin_sick=''
                    this.skin_sick_thing=''
                    this.more_time_massage_parts=[]
                    this.health_problem=[]
                    this.in_six_month_operation=''
                    this.in_six_month_operation_problem=''
                    this.tell_us_other_health_problem=''
                    this.in_menstruation=''
                    this.in_pregnancy=''
                    this.pregnancy_time=''
                    this.temperature=''
                    this.food=''
                    this.intensity=''
                    this.avoid_parts=[] 
                    this.massage_oil_fragrance=''
                    this.contact_lens_case=''
                    this.steam_eye_mask=''
                }
                if(JSON.stringify(this.preferenceresList) !== "{}"){
                    this.skin_type=this.preferenceresList.basic_health.skin_type
                    this.skin_sick=this.preferenceresList.basic_health.skin_sick
                    this.skin_sick_thing=this.preferenceresList.basic_health.skin_sick_thing
                    if(this.preferenceresList.basic_health.more_time_massage_parts===""){
                        this.more_time_massage_parts=[]
                    }else{
                        this.more_time_massage_parts=this.preferenceresList.basic_health.more_time_massage_parts.split(',')
                    }
                    if(this.preferenceresList.basic_health.health_problem===""){
                        this.health_problem=[]
                    }else{
                        this.health_problem=this.preferenceresList.basic_health.health_problem.split(',')
                    }
                    this.in_six_month_operation=this.preferenceresList.basic_health.in_six_month_operation
                    this.in_six_month_operation_problem=this.preferenceresList.basic_health.in_six_month_operation_problem
                    this.tell_us_other_health_problem=this.preferenceresList.basic_health.tell_us_other_health_problem
                    this.in_menstruation=this.preferenceresList.women_health.in_menstruation
                    this.in_pregnancy=this.preferenceresList.women_health.in_pregnancy
                    this.pregnancy_time=this.preferenceresList.women_health.pregnancy_time
                    this.temperature=this.preferenceresList.preference.temperature
                    this.food=this.preferenceresList.preference.food
                    this.intensity=this.preferenceresList.preference.intensity
                    if(this.preferenceresList.preference.avoid_parts===""){
                        this.avoid_parts=[]
                    }else{
                        this.avoid_parts=this.preferenceresList.preference.avoid_parts.split(',')
                    }
                    this.massage_oil_fragrance=this.preferenceresList.preference.massage_oil_fragrance
                    this.contact_lens_case=this.preferenceresList.preference.contact_lens_case
                    this.steam_eye_mask=this.preferenceresList.preference.steam_eye_mask
                    this.skinType.forEach(e=>{
                        if(e.name===this.skin_type){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.skinSick.forEach(e=>{
                        if(e.name===this.skin_sick){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.moreTimeMassageParts.forEach(e=>{
                        this.more_time_massage_parts.forEach(item=>{
                            if(e.name===item){
                                e.isActive=true
                            }
                        })
                    })
                    this.healthProblem.forEach(e=>{
                        this.health_problem.forEach(item=>{
                            if(e.name===item){
                                e.isActive=true
                            }
                        })
                    })
                    this.inSixMonthOperation.forEach(e=>{
                        if(e.name===this.in_six_month_operation){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.inMenstruation.forEach(e=>{
                        if(e.name===this.in_menstruation){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.inPregnancy.forEach(e=>{
                        if(e.name===this.in_pregnancy){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.pregnancyTime.forEach(e=>{
                        if(e.name===this.pregnancy_time){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.temperatureList.forEach(e=>{
                        if(e.name===this.temperature){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.foodList.forEach(e=>{
                        if(e.name===this.food){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.intensityList.forEach(e=>{
                        if(e.name===this.intensity){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.avoidParts.forEach(e=>{
                        this.avoid_parts.forEach(item=>{
                            if(e.name===item){
                                e.isActive=true
                            }
                        })
                    })
                    this.massageOilFragrance.forEach(e=>{
                        if(e.name===this.massage_oil_fragrance){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.contactLensCase.forEach(e=>{
                        if(e.name===this.contact_lens_case){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                    this.steamEyeMask.forEach(e=>{
                        if(e.name===this.steam_eye_mask){
                            e.isActive=true
                        }else{
                            e.isActive=false
                        }
                    })
                }
            })
        }
       
    }
}
</script>
<style lang="scss">
.perference-detail{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    background: #FAF7F2;
    .part-one{
        width: 686rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .one-title{
            width: 100%;
            font-size: 32rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 44rpx;
            margin:40rpx 0;
        }
        .one-recode{
            width: 100%;
            background: #FFFFFF;
            border-radius: 16rpx;
            margin-bottom: 30rpx;
            .recode-item{
                width: 90%;
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items: center;
                margin-left: 30rpx;
                margin-bottom:30rpx ;
                .title{
                    width: 100%;
                    font-size: 28rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    line-height: 34rpx;
                    margin-top: 20rpx;
                }
                .options{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    .option-item{
                        width: 135rpx;
                        height: 56rpx;
                        background: #EBDFD0;
                        border-radius: 28rpx;
                        font-size: 26rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #333333;
                        line-height: 56rpx;
                        text-align: center;
                        margin-right: 20rpx;
                        margin-top:20rpx;
                    }
                    .option-itemA{
                        width: 135rpx;
                        height: 56rpx;
                        background: #D9C1A5;
                        border-radius: 28rpx;
                        font-size: 26rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #333333;
                        line-height: 56rpx;
                        text-align: center;
                        margin-right: 20rpx;
                        margin-top:20rpx;
                    }
                    .maxlength{
                        width: 260rpx;
                    }
                }
            }
        }
    }
    .confirm-btn{
        width: 686rpx;
        height: 88rpx;
        background: #D9C1A5;
        border-radius: 44rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 88rpx;
        margin-top: 40rpx;
        margin-bottom: 80rpx;
    }
}
</style>
<style>
page{
	background: #faf7f2;
}
.u-input__textarea{
    width: 560rpx !important;
    height: 220rpx !important;
}
</style>
