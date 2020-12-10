<template>
	<view class="market-container">
		<view class="logo"><image src="../../static/images/bg_manage.png"></image></view>
		<view class="menu-list">
			<view class="menu-item" @click="skipPage('../report/index')">
				<view class="menu-icon fl"><image src="../../static/images/files.png" mode=""></image></view>
				<text class="fl">报单中心</text>
				<view class="right-icon fr"><image src="../../static/images/right.png"></image></view>
				<view class="cl"></view>
			</view>
			<view class="menu-item" @click="skipPage('../count/index')">
				<view class="menu-icon fl"><image src="../../static/images/files.png" mode=""></image></view>
				<text class="fl">业绩统计</text>
				<view class="right-icon fr"><image src="../../static/images/right.png"></image></view>
				<view class="cl"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			skipPage(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.market-container{
		height: 100%;
		padding: 0 34rpx;
		padding-top: 34rpx;
		box-sizing: border-box;
		background: #fff;
		border-bottom:30rpx solid #fbfcfe;
		.logo{
			height: 600rpx;
		}
		.menu-list{
			.menu-item{
				height: 168rpx;
				margin-bottom: 32rpx;
				padding: 60rpx 54rpx 60rpx 48rpx;
				box-sizing: border-box;
				background: #F5F6FA;
				border-radius: 32rpx;
				.menu-icon{
					width: 48rpx;
					height: 48rpx;
					margin-right: 28rpx;
				}
				text{
					font-size: 36rpx;
					color: #75758C;
				}
				.right-icon{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>
