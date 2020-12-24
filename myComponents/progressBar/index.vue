<template>
	<view class="progress-container">
		<view class="progress-icon"><image :src="proIcon"></image></view>
		<view class="inner-progress" :style="{'background':activeColor,'width':percent+'%'}"></view>
		<text class="cur-nums" :style="{'left':(percent-5)+'%'}"
		v-show="percent<100">{{curNums}}单</text>
		<text class="total-nums">{{totalNums}}单</text>
	</view>
</template>

<script>
	export default{
		props:{
			proIcon:{
				type:String
			},
			activeColor:{
				type:String
			},
			percent:{
				type:Number
			},
			curNums:{
				type:Number
			},
			totalNums:{
				type:Number
			}
		}
	}
</script>

<style lang="scss" scoped>
	.progress-container{
		width: 100%;
		height: 10rpx;
		position: relative;
		background: #D2DCFD;
		border-radius: 4rpx;
		.progress-icon{
			width: 50rpx;
			height: 60rpx;
			position: absolute;
			right: -30rpx;
			top:-16rpx;
			z-index: 30;
		}
		.inner-progress{
			position: absolute;
			left: 0;
			top:0;
			height: 100%;
			z-index: 10;
			border-radius: 4rpx 0 0 4rpx;
		}
		.total-nums{
			position: absolute;
			color: #fff;
			font-size: 20rpx;
			right: -14rpx;
			bottom: -40rpx;
		}
		.cur-nums{
			position: absolute;
			color: #fff;
			font-size: 20rpx;
			top: -40rpx;
			display: block;
			width: 70rpx;
		}
	}
</style>
