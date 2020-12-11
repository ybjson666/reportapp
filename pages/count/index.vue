<template>
	<view class="count-container">
		<view class="achieve-item">
			<view class="item-top">
				<view class="rect blue fl"></view>
				<text class="top-tags fl">我的业绩</text>
				<view class="top-right fr">
					<text class="top-right-tags">My performance</text>
					<view class="right-icon"><image src="../../static/images/go.png"></image></view>
				</view>
				<view class="cl"></view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.count-container{
		height: 100%;
		padding: 80rpx 60rpx 0 60rpx;
		box-sizing: border-box;
		.achieve-item{
			.item-top{
				.rect{
					width: 6rpx;
					height: 30rpx;
					border-radius: 8rpx;
				}
				.blue{
					background: #474AD9;
					border-radius: 8rpx;
				}
			}
		}
		
	}
</style>
