<template>
	<view class="team-container">
		<view class="title">团队详情</view>
		<view class="tab-list">
			<view class="tab-item" @click="goTeamList">
				<view class="item-top">
					<text>团队总人数</text>
					<view class="team-icon"></view>
				</view>
				<view class="item-bottom">
					<text class="team-val">{{teamInfo.user_total}}</text>人
				</view>
			</view>
			<view class="tab-item last-tab">
				<view class="item-top">
					<text>本周变动</text>
					<view class="team-icon"><image src="../../static/images/up_icon.png"></image></view>
				</view>
				<view class="item-bottom">
					<text class="team-val">{{teamInfo.team_week_count}}</text>人
				</view>
			</view>
		</view>
		
		<view class="team-content">
			<view class="team-content-top" @click="seekInfo" v-if="down_task>=goal_task">
				已达到升级标准<text class="count">{{goal_task||0}}</text>单
				<view class="sun-icon"><image src="../../static/images/sun.png"></image></view>
			</view>
			<view class="team-list">
				<view class="team-item" @click="skipPage('1')">
					<text class="team-lable fl">今日销量</text>
					<text class="team-val fr">{{teamInfo.today_count}}单</text>
					<view class="cl"></view>
				</view>
				<view class="team-item" @click="skipPage('2')">
					<text class="team-lable fl">本周销量</text>
					<text class="team-val fr">{{teamInfo.week_count}}单</text>
					<view class="cl"></view>
				</view>
				<view class="team-item" @click="skipPage('3')">
					<text class="team-lable fl">本月销量</text>
					<text class="team-val fr">{{teamInfo.count_sum}}单</text>
					<view class="cl"></view>
				</view>
				<view class="team-item last-item" @click="skipPage('0')">
					<text class="team-lable fl">总计销量</text>
					<text class="team-val fr">{{teamInfo.total_count}}单</text>
					<view class="cl"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				down_task:"",
				goal_task:"",
				type:"",
				teamInfo:{},
				cid:""
			}
		},
		onBackPress(event){
			uni.navigateTo({
				url:'../team/index'
			})
			return true;
		},
		methods:{
			skipPage(type){
				const { cid }=this;
				uni.navigateTo({
					url:`../myCount/index?type=${type}&cid=${cid}`
				})
			},
			seekInfo(){
				uni.navigateTo({
					url:"../levelInfo/index"
				})
			},
			goTeamList(){
				let { down_task=0,goal_task=0,teamInfo,cid }=this
				if(teamInfo.user_total>1){
					uni.navigateTo({
						url:`../teamInfo/index?down_task=${down_task}&goal_task=${goal_task}&cid=${cid}`
					})
				}
			},
			async getDatas(){
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				const { team_id,type,cid}=this;
				let params={
					url:"/api/achieve/TeamInfo",
					data:{uid,token,type,cid}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.teamInfo=result.data.data;
				}else if(result.data.code===401){
					this.showToast(result.data.message);
					setTimeout(()=>{
						uni.reLaunch({
							url:'../login/index'
						})
					},800)
				}else{
					this.showToast(result.data.message);
				}
			}
		},
		onLoad(options){
			this.down_task=options.down_task
			this.goal_task=options.goal_task
			this.type=options.team_type
			this.cid=options.team_id
			this.getDatas()
		}
	}
</script>

<style lang="scss" scoped>
	.team-container{
		min-height: 100%;
		padding: 40rpx;
		box-sizing: border-box;
		.title{
			color: #2F2F51;
			font-size:32rpx;
		}
		.tab-list{
			display: flex;
			margin-top: 42rpx;
			.tab-item{
				background: #F9FAFC;
				border-radius: 32rpx;
				padding: 52rpx 0 38rpx 46rpx;
				box-sizing: border-box;
				margin-right: 38rpx;
				flex: 1;
				.item-top{
					text{
						color: #75758C;
						font-size: 28rpx;
					}
					.team-icon{
						width: 30rpx;
						height: 30rpx;
						display: inline-block;
						vertical-align: middle;
						margin-left: 20rpx;
					}
				}
				.item-bottom{
					margin-top: 30rpx;
					font-size: 28rpx;
					.team-val{
						color: #474AD9;
						font-size: 62rpx;
					}
				}
			}
			.last-tab{
				margin-right: 0;
			}
		}
		.team-content{
			margin-top: 38rpx;
			background: #F9FAFC;
			.team-content-top{
				font-size: 32rpx;
				padding: 40rpx 0 40rpx 32rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eaeaea;
				.sun-icon{
					display: inline-block;
					vertical-align: middle;
					width: 34rpx;
					height: 34rpx;
					margin-left: 6rpx;
				}
				.count{
					color: #6F8FEA;
				}
			}
			.team-list{
				padding: 0 28rpx;
				box-sizing: border-box;
				.team-item{
					padding: 40rpx 0 46rpx 0;
					border-bottom: 1px solid #eaeaea;
					.team-label{
						color: #2F2F51;
						font-size: 28rpx;
					}
					.team-val{
						color: #2F2F51;
						font-size: 28rpx;
					}
				}
				.last-item{
					border: none;
				}
			}
		}
	}
</style>
