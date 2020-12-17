<template>
	<view class="count-container">
		<view class="achieve-item">
			<view class="item-top">
				<view class="top-left fl">
					<view class="rect"><image src="../../static/images/blue_rect.png"></image></view>
					<text class="top-tags">我的业绩</text>
				</view>
				<view class="top-right fr">
					<text class="top-right-tags">My performance</text>
					<view class="right-icon" @click="skipPage('../myCount/index')"><image src="../../static/images/go.png"></image></view>
				</view>
				<view class="cl"></view>
			</view>
			
			<view class="item-wraper">
				<view class="grade-block">
					<view class="grade-top">
						<text class="grade-tags">本月业绩</text>
						<view class="grade-icon"><image src="../../static/images/up_icon.png"></image></view>
					</view>
					<view class="grade-value">{{my_grade}}</view>
					<view class="level-block">
						<view class="star-icon"><image src="../../static/images/star.png"></image></view>
						<text class="level-txt">lv1</text>
					</view>
				</view>
				<view class="count-block">
					<view class="count-item">
						<view class="count-title">今日</view>
						<view class="count-val">{{my_tody_grade}}</view>
					</view>
					<view class="count-item">
						<view class="count-title">本周</view>
						<view class="count-val">{{my_week_grade}}</view>
					</view>
					<view class="count-item">
						<view class="count-title">历史</view>
						<view class="count-val">{{my_his_grade}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="achieve-item area-achieve-item">
			<view class="item-top">
				<view class="top-left fl">
					<view class="rect"><image src="../../static/images/red_blue.png"></image></view>
					<text class="top-tags">区域业绩</text>
				</view>
				<view class="top-right fr">
					<text class="top-right-tags">Regional performance</text>
					<view class="right-icon"><image src="../../static/images/go.png"></image></view>
				</view>
				<view class="cl"></view>
			</view>
			
			<view class="item-wraper">
				<view class="grade-block">
					<view class="grade-top">
						<text class="grade-tags">本月业绩</text>
						<view class="grade-icon"><image src="../../static/images/down_icon.png"></image></view>
					</view>
					<view class="grade-value">{{area_his_grade}}</view>
					<view class="level-block">
						<view class="star-icon"><image src="../../static/images/star.png"></image></view>
						<text class="level-txt">lv1</text>
					</view>
				</view>
				<view class="count-block">
					<view class="count-item">
						<view class="count-title">今日</view>
						<view class="count-val">{{area_toay_grade}}</view>
					</view>
					<view class="count-item">
						<view class="count-title">本周</view>
						<view class="count-val">{{area_week_grade}}</view>
					</view>
					<view class="count-item">
						<view class="count-title">历史</view>
						<view class="count-val">{{area_his_grade}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				my_grade:300.00,
				my_tody_grade:'124台',
				my_week_grade:'256台',
				my_his_grade:'1598台',
				area_grade:800,
				area_toay_grade:'200台',
				area_week_grade:'600台',
				area_his_grade:'3680台'
			}
		},
		methods:{
			skipPage(url){
				console.log(url)
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.count-container{
		min-height: 100%;
		padding: 80rpx 60rpx 60rpx 60rpx;
		box-sizing: border-box;
		.achieve-item{
			.item-top{
				.rect{
					width: 8rpx;
					height: 36rpx;
					margin-right: 16rpx;
					display: inline-block;
					vertical-align: top;
				}
				.top-tags{
					line-height: 34rpx;
					font-size: #2F2F51;
					font-size: 34rpx;
					vertical-align: top;
				}
				.right-icon{
					width: 32rpx;
					height: 32rpx;
					display: inline-block;
					vertical-align: middle;
					margin-left: 20rpx;
				}
				.top-right-tags{
					color:#9797A8;
					font-size: 22rpx;
				}
			}
			.item-wraper{
				width: 630rpx;
				background: #FFFFFF;
				box-shadow: 8rpx 32rpx 40rpx rgba(111, 143, 234, 0.16);
				border-radius: 16rpx 128rpx 16rpx 16rpx;
				margin-top: 40rpx;
				padding: 54rpx 50rpx 48rpx 48rpx;
				box-sizing: border-box;
				.grade-block{
					position: relative;
					border-bottom: 1px solid #EAEEFC;
					padding-bottom: 30rpx;
					.grade-top{
						display: flex;
						.grade-icon{
							width: 30rpx;
							height: 30rpx;	
							margin-left: 28rpx;
							margin-top: 6rpx;
						}
						.grade-tags{
							color: #75758C;
							font-size: 28rpx;
						}
					}
					.grade-value{
						color: #474AD9;
						font-size: 68rpx;
						margin-top: 10rpx;
					}
					.level-block{
						position: absolute;
						right: 0;
						bottom: 48rpx;
						display: flex;
						.star-icon{
							width: 36rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
						.level-txt{
							color: #9797A8;
							font-size: 22rpx;
							margin-top: 4rpx;
						}
					}
				}
				
				.count-block{
					display: flex;
					margin-top: 38rpx;
					.count-item{
						flex: 1;
						.count-title{
							color: #75758C;
							font-size: 32rpx;
						}
						.count-val{
							color: #2F2F51;
							font-size: 22rpx;
							margin-top: 16rpx;
						}
					}
				}
			}
		}
		.area-achieve-item{
			margin-top: 84rpx;
		}
	}
</style>
