<template>
	<view class="team-container">
		<view class="team-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="team-content">
			<view class="section">
				<view class="team-item-header">
					<text class="item-header-tags">区域销售额</text>
					<view class="question fr"><image src="../../static/images/ic_back.png"></image></view>
					<view class="cl"></view>
				</view>
				<view class="team-item area-item">
					<view class="item-top">
						<view class="item-tips">
							<text class="tip-txt">距离升级</text>
						</view>
						<view class="progress-block">
							<view class="progress-rows">
								<text class="pro-label">小区1单</text>
								<view class="pro-bar">
									<progress percent="60" stroke-width="8" backgroundColor="#cfd9fe" activeColor="#8FA8FF"/>
								</view>
								<view class="pro-val"><text>30 / 50</text></view>
							</view>
							<view class="progress-rows second">
								<text class="pro-label">大区2单</text>
								<view class="pro-bar">
									<progress percent="50" stroke-width="8" backgroundColor="#cfd9fe" activeColor="#8FA8FF"/>
								</view>
								<view class="pro-val"><text>10 / 20</text></view>
							</view>
							
						</view>
					</view>
					<view class="item-bottom">
						<view class="sell-block">
							<view class="sell-item first-item" @click="skipPage('../teamInfo/index')">
								<text>小区销售额</text>
								<view>124单</view>
							</view>
							<view class="sell-item" @click="skipPage('../teamInfo/index')">
								<text>大区销售额</text>
								<view>12单</view>
							</view>
						</view>
					</view>
				</view>
				<view class="team-section">
					<view class="team-item-header">
						<text class="item-header-tags">团队销售额</text>
					</view>
					<view class="team-item">
						<view class="item-top">
							<view class="item-tips">
								<text class="tip-txt">总计销售额</text>
								<view class="trigle"><image src="../../static/images/up_icon.png"></image></view>
							</view>
							<view class="count-blcok">
								<text class="count-val">208</text><text>单</text>
							</view>
						</view>
						<view class="item-bottom">
							<view class="ranks-block">
								<view class="rank-item" @click="skipPage('../myCount/index')">
									<view>今日</view>
									<text>124单</text>
								</view>
								<view class="rank-item" @click="skipPage('../myCount/index')">
									<view>本周</view>
									<text>360单</text>
								</view>
								<view class="rank-item last-item" @click="skipPage('../myCount/index')">
									<view>本月</view>
									<text>1200单</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="team-section">
					<view class="team-item-header">
						<text class="item-header-tags">我的销售额</text>
					</view>
					<view class="team-item">
						<view class="item-top">
							<view class="item-tips">
								<text class="tip-txt">总计销售额</text>
								<view class="trigle"><image src="../../static/images/down_icon.png"></image></view>
							</view>
							<view class="count-blcok">
								<text class="count-val">20</text><text>单</text>
							</view>
						</view>
						<view class="item-bottom">
							<view class="ranks-block second-rank">
								<view class="rank-item" @click="skipPage('../myCount/index')">
									<view>今日</view>
									<text>124单</text>
								</view>
								<view class="rank-item" @click="skipPage('../myCount/index')">
									<view>我的</view>
									<text>12单</text>
								</view>
								<view class="rank-item" @click="skipPage('../myCount/index')">
									<view>本周</view>
									<text>360单</text>
								</view>
								<view class="rank-item last-item" @click="skipPage('../myCount/index')">
									<view>本月</view>
									<text>1200单</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			wybLoading
		},
		methods:{
			goback(){
				uni.switchTab({
					url:'/pages/myInfo/index'
				})
			},
			skipPage(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team-container{
		height: 100%;
		position: relative;
		.team-header{
			height: 360rpx;
			background-image: url('../../static/images/team_bg.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-color: #eaeefc;
		}
		.back-btn{
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			left: 20rpx;
			top:80rpx;
			z-index: 50;
		}
		.team-content{
			height: calc(100% - 340rpx);
			background: #fff;
			margin-top: -20rpx;
			border-radius: 30rpx 30rpx 0 0;
			padding: 80rpx 40rpx 108rpx 40rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			.team-item-header{
				.item-header-tags{
					font-size: 32rpx;
					color: #2F2F51;
					line-height: 50rpx;
				}
				.question{
					width: 48rpx;
					height: 50rpx;
				}
			}
			.team-item{
				margin-top: 42rpx;
				background: #F9FAFC;
				padding: 54rpx 46rpx 48rpx 50rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				.item-top{
					border-bottom:1px solid #EAEEFC;
					padding-bottom: 20rpx;
					.item-tips{
						margin-bottom: 30rpx;
						.tip-txt{
							color: #75758C;
							font-size: 26rpx;
						}
						.trigle{
							display: inline-block;
							vertical-align: middle;
							width: 30rpx;
							height: 30rpx;
							margin-left: 20rpx;
						}
					}
					.count-blcok{
						.count-val{
							color: #474AD9;
							font-size: 66rpx;
						}
					}
				}
				.item-bottom{
					margin-top: 38rpx;
					.ranks-block{
						display: flex;
						.rank-item{
							flex: 1;
							text-align: center;
							margin-right: 160rpx;
							view{
								color: #75758C;
								font-size: 32rpx;
								margin-bottom: 6rpx;
							}
							text{
								color: #2F2F51;
								font-size: 22rpx;
							}
						}
						.last-item{
							margin-right: 0;
						}
					}
					.second-rank{
						.rank-item{
							margin-right: 80rpx;
						}
						.last-item{
							margin-right: 0;
						}
					}
				}
			}
			.area-item{
				.progress-block{
					.progress-rows{
						display: flex;
						margin-bottom: 18rpx;
						.pro-label{
							flex: 1;
							line-height: 36rpx;
							color: #333;
							font-size: 26rpx;
						}
						.pro-bar{
							width: 156rpx;
							margin-right: 62rpx;
							padding-top: 10rpx;
							margin-left: 160rpx;
							box-sizing: border-box;
						}
						.pro-val{
							line-height: 36rpx;
							color: #1F1F39;
							font-size: 22rpx;
						}
					}
					.second{
						margin-bottom: 0;
					}
				}
				.item-bottom{
					.sell-block{
						display: flex;
						.sell-item{
							flex: 1;
							text-align: center;
							text{
								font-size: 32rpx;
								font-weight: 400;
								color: #75758C;
							}
							view{
								color: #2F2F51;
								font-size: 22rpx;
								margin-top: 16rpx;
							}
						}
						.first-item{
							margin-right: 240rpx;
						}
					}
				}
			}
			.team-section{
				margin-top: 80rpx;
			}
			
		}
	}
</style>
