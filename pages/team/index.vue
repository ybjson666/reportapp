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
								<text class="pro-label">小区{{(gradeInfo.little_sum-gradeInfo.little_team)>=0?(gradeInfo.little_sum-gradeInfo.little_team):0}}单</text>
								<view class="pro-bar">
									<progress :percent="smallPer" stroke-width="8" backgroundColor="#cfd9fe" activeColor="#8FA8FF"/>
								</view>
								<view class="pro-val"><text>{{gradeInfo.little_team}} / {{gradeInfo.little_sum}}</text></view>
							</view>
							<view class="progress-rows second">
								<text class="pro-label">大区{{(gradeInfo.main_sum-gradeInfo.main_team)>=0?(gradeInfo.main_sum-gradeInfo.main_team):0}}单</text>
								<view class="pro-bar">
									<progress :percent="teamPer" stroke-width="8" backgroundColor="#cfd9fe" activeColor="#8FA8FF"/>
								</view>
								<view class="pro-val"><text>{{gradeInfo.main_team}} / {{gradeInfo.main_sum}}</text></view>
							</view>
							
						</view>
					</view>
					<view class="item-bottom">
						<view class="sell-block">
							<view class="sell-item first-item" @click="skipListSmall">
								<text>小区销售额</text>
								<view>{{gradeInfo.little_team}}单</view>
							</view>
							<view class="sell-item" @click="skipListTeam">
								<text>大区销售额</text>
								<view>{{gradeInfo.main_team}}单</view>
							</view>
						</view>
					</view>
				</view>
				<view class="team-section">
					<view class="team-item-header">
						<text class="item-header-tags fl">团队销售额</text>
						<view class="item-header-direct fr" @click="skipOrder('1','0')">
							<text>My performance</text>
							<view class="direct-icon"><image src="../../static/images/go.png"></image></view>
						</view>
						<view class="cl"></view>
					</view>
					<view class="team-item">
						<view class="item-top">
							<view class="item-tips" @click="skipOrder('1','0')">
								<text class="tip-txt">总计销售额</text>
								<view class="trigle"><image src="../../static/images/up_icon.png"></image></view>
							</view>
							<view class="count-blcok">
								<text class="count-val">{{gradeInfo.total_count}}</text><text>单</text>
							</view>
						</view>
						<view class="item-bottom">
							<view class="ranks-block">
								<view class="rank-item" @click="skipOrder('1','1')">
									<view>今日</view>
									<text>{{gradeInfo.today_count}}单</text>
								</view>
								<view class="rank-item" @click="skipOrder('1','2')">
									<view>本周</view>
									<text>{{gradeInfo.week_count}}单</text>
								</view>
								<view class="rank-item last-item" @click="skipOrder('1','3')">
									<view>本月</view>
									<text>{{gradeInfo.count_sum}}单</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="team-section">
					<view class="team-item-header">
						<text class="item-header-tags fl">我的销售额</text>
						<view class="item-header-direct fr" @click="skipOrder('0','0')">
							<text>My performance</text>
							<view class="direct-icon"><image src="../../static/images/go.png"></image></view>
						</view>
						<view class="cl"></view>
					</view>
					<view class="team-item">
						<view class="item-top">
							<view class="item-tips" @click="skipOrder('0','0')">
								<text class="tip-txt">总计销售额</text>
								<view class="trigle"><image src="../../static/images/down_icon.png"></image></view>
							</view>
							<view class="count-blcok">
								<text class="count-val">{{gradeInfo.self_total_count}}</text><text>单</text>
							</view>
						</view>
						<view class="item-bottom">
							<view class="ranks-block second-rank">
								<view class="rank-item" @click="skipOrder('0','1')">
									<view>今日</view>
									<text>{{gradeInfo.self_today_count}}单</text>
								</view>
								<view class="rank-item" @click="skipOrder('0','2')">
									<view>本周</view>
									<text>{{gradeInfo.self_week_count}}单</text>
								</view>
								<view class="rank-item last-item" @click="skipOrder('0','3')">
									<view>本月</view>
									<text>{{gradeInfo.self_count_sum}}单</text>
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
	export default{
		data(){
			return{
				gradeInfo:{},
				userid:""
			}
		},
		computed:{
			smallPer(){
				let { little_team=0,little_sum=0 }=this.gradeInfo
				little_sum=parseInt(little_sum)
				little_team=parseInt(little_team)
				let num=0
				if(little_sum==0){
					num=0
				}if(little_team>=little_sum){
					num=100
				}else{
					num=Math.round((little_team/little_sum)*100)
				}
				return num;
			},
			teamPer(){
				let { main_team=0,main_sum=0 }=this.gradeInfo
				main_sum=parseInt(main_sum)
				main_team=parseInt(main_team)
				let num=0
				if(main_sum==0){
					num=0
				}else if( main_team>=main_sum){
					num=100
				}else{
					num=Math.round((main_team/main_sum)*100)
				}
				return num;
			}
		},
		methods:{
			goback(){
				uni.switchTab({
					url:'/pages/market/index'
				})
			},
			skipOrder(state,type){
				uni.navigateTo({
					url:`../orderList/index?state=${state}&type=${type}`
				})
			},
			skipListSmall(){
				let { little_team=0,little_sum=0 }=this.gradeInfo
				const { userid }=this
				uni.navigateTo({
					url:`../teamSecond/index?down_task=${little_team}&goal_task=${little_sum}&type=0&team_id=${userid}`
				})
			},
			skipListTeam(){
				let { main_team=0,main_sum=0 }=this.gradeInfo
				uni.navigateTo({
					url:`../teamInfo/index?down_task=${main_team}&goal_task=${main_sum}`
				})
			},
			async getDatas(){
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				
				let params={
					url:"/api/achieve/TotalReport",
					data:{uid,token}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.gradeInfo=result.data.data;
				}else if(result.data.code===401){
					this.showToast(result.data.message);
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/index'
						})
					},800)
				}else{
					this.showToast(result.data.message);
				}
			}
		},
		onLoad(){
			this.userid=uni.getStorageSync('uid')
		},
		onShow(){
			this.getDatas()
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
				.item-header-direct{
					text{
						color:#9797A8;
						font-size: 22rpx;
					}
					.direct-icon{
						width: 36rpx;
						height: 32rpx;
						display: inline-block;
						vertical-align: middle;
						margin-left: 20rpx;
					}
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
