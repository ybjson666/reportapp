<template>
	<view class="card-container">
		<view class="card-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="card-content">
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goback(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-container{
		height: 100%;
		position: relative;
		.card-header{
			height: 360rpx;
			background: #eaeefc;
		}
		.back-btn{
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			left: 20rpx;
			top:20rpx;
			z-index: 20;
		}
		.card-content{
			height: calc(100% - 50rpx);
			width: 100%;
			background: url('../../static/images/card_bg.png') no-repeat 12rpx;
			background-size: 100% 100%;
			position: absolute;
			top: 50rpx;
			left: 0;
			z-index: 10;
		}
	}
</style>
