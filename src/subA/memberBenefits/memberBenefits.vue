<template>
	<view class="member-benefits">
        <view class="title">
            <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/logo%402x.png"></image>
        </view>
        <view class="rules">
            <image src="https://lanna-product.oss-cn-shanghai.aliyuncs.com/member-intro.jpeg"></image>
        </view>
	</view>
</template>

<script>
export default {
	components: {
		
	},
	data() {
		return {
		}
	},
	mounted(){
    },
	methods: {
	},
}
</script>
<style lang="scss">
.member-benefits{
    width:100%;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
        width: 100%;
        height: 280rpx;
        background: #D9C1A5;
        display: flex;
        flex-direction: column;
        align-items: center;
        image{
            width: 160rpx;
            height: 160rpx;
            margin-top: 30rpx;
        }
    }
    .rules{
        width: 100%;
        height: 1606rpx;
        image{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<style>
page{
	background: #faf7f2;
}
</style>

