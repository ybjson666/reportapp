<template>
	<view class="order-container">
		<view class="banners"></view>
		<view class="order-infos"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				device:{
					name:"贩卖机&产品",
					price:"180",
					pic:"../../static/images/goods.png",
					num:2,
					add_time:'2020.10.20 10:10:25'
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.order-container{
		min-height: 100%;
		padding: 38rpx 40rpx 0 40rpx;
		box-sizing: border-box;
		.banners{
			height: 416rpx;
			background: #eaeaea;
		}
		.order-infos{
			margin-top: 40rpx;
			padding: 44rpx 40rpx 48rpx 32rpx;
			box-sizing: border-box;
			background: #F9FAFC;
			border-radius: 32px;
		}
	}
</style>
