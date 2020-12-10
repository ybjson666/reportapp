<template>
	<view class="home-container">
		<view class="goods-list">
			<view class="goods-item" v-for="(item,index) in goodList" :key="index">
				<view class="goods-name">{{item.name}}</view>
				<view class="goods-desc">{{item.desc}}</view>
				<view class="goods-pic"><image :src="item.pic"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodList:[
					{
						"name":"粉色记忆",
						"desc":"AMORELIE情趣xTPstudio摄影",
						"pic":"../../static/images/goods01.png"
					},
					{
						"name":"粉色记忆",
						"desc":"AMORELIE情趣xTPstudio摄影",
						"pic":"../../static/images/goods02.png"
					},
					{
						"name":"粉色记忆",
						"desc":"AMORELIE情趣xTPstudio摄影",
						"pic":"../../static/images/goods03.png"
					},
					{
						"name":"粉色记忆",
						"desc":"AMORELIE情趣xTPstudio摄影",
						"pic":"../../static/images/goods02.png"
					},
					{
						"name":"粉色记忆",
						"desc":"AMORELIE情趣xTPstudio摄影",
						"pic":"../../static/images/goods01.png"
					},
					{
						"name":"粉色记忆",
						"desc":"AMORELIE情趣xTPstudio摄影",
						"pic":"../../static/images/goods03.png"
					}
					
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.home-container{
		min-height: 100%;
		padding: 0 32rpx;
		padding-top: 100rpx;
		padding-bottom: 110rpx;
		box-sizing: border-box;
		.goods-list{
			.goods-item{
				margin-bottom: 40rpx;
				.goods-name{
					color: #4E4E4E;
					font-size: 28rpx;
				}
				.goods-desc{
					font-size: 24rpx;
					color: #9797A8;
					line-height: 36rpx;
				}
				.goods-pic{
					height: 406rpx;
					border-radius: 12rpx;
					overflow: hidden;
				}
			}
		}
	}
</style>
