<template>
  <view v-if='show' class="products">
    <!-- <view class="text">产品相关文案</view> -->
    <view class="product-list">
      <view class="product-box" v-for='(item,index) in productList' :key='index'>
        <view class="product-detail" @click="toDetail(item.id)">
          <view class="product-img">
            <image
              :src="item.cover_img[0]"
              mode="scaleToFill"
            />
          </view>
          <view class="product-title">{{item.name}}</view>
          <view v-if='item.redeem==0' class="product-price">￥{{item.price/100}}</view>
          <view v-if='item.price==0' class="product-price">{{item.redeem}}积分</view>
          <view v-if='item.redeem!==0 && item.price!==0' class="product-price">￥{{item.price/100}}+{{item.redeem}}积分</view>
          <view class="product-intro">{{item.desc}}</view>
          <view class="product-line"></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
	components: {},
	props: {
    productList:{
      type:Array,
      default:[]
    },
  },
	data() {
		return {
      show:false
		}
	},
  watch:{
    // productList(value,oldvalue){
    //   console.log('value------>',value)
    //   console.log('oldvalue------>',oldvalue)
    //   if(value.length>0){
    //     this.show=true
    //   }
    // }
  },
  mounted(){
    this.getProductList()
  },
	methods: {
    getProductList(){
      this.$api.getProductList().then((res)=>{
        if(res.data.code===401){
          this.$Router.replace({
						path: '/auth',
					})
        }else{
          this.productList=res.data.data.data
          if(this.productList.length>0){
            this.show=true
          }
        }
      })
    },
    toDetail(id){
      this.$Router.push({
				path: '/productDetail',
				query: {
					id: id,
				},
			})
    }
  },
}
</script>
<style lang="scss">
.products {
	background: #FAF7F2;
  .text{
    width: 60%;
    margin: 0 auto;
  }
  .product-list{
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .product-detail{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 60rpx 0;
      .product-img{
        width: 452rpx;
        height: 452rpx;
        margin-bottom: 20rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .product-title{
        margin-bottom: 20rpx;
        font-size:40rpx;
        font-weight: 500;
      }
      .product-price{
        margin-bottom: 20rpx;
        font-size:40rpx;
        font-weight: 500;
      }
      .product-line{
        width: 50rpx;
        height: 4rpx;
        background: #CC975A;
        margin-top:40rpx;
      }
    }
  }
}
</style>
