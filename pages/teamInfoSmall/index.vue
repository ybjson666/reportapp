<template>
	<view class="team-container">
		<view class="tab-list-wraps">
			<view class="tab-list">
				<view class="tab-item" v-for="(item,index) in tabList" :key="index" @click="seleStatus(item)">
					<text class="tab-name">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="team-list">
			<view class="team-item" v-for="(item,index) in teamList" :key="index" @click="skipPage(item.user_id)">
				<text class="team-name">{{item.nickname}}</text>
				<text class="team-time">{{item.addtime | subsTime}}</text>
				<text class="team-nums">{{item.total_count}}</text>
				<text class="team-sell">{{item.team_count}}</text>
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
				teamList:[],
				tabList:[
					{
						name:'用户昵称'
					},
					{
						name:'注册时间'
					},
					{
						name:'团队人数'
					},
					{
						name:'团队销量'
					}
				]
			}
		},
		methods:{
			skipPage(teamid){
				const { down_task,goal_task }=this
				uni.navigateTo({
					url:`../teamSecond/index?down_task=${down_task}&goal_task=${goal_task}&team_type=0&team_id=${teamid}`
				})
			},
			async getDatas(){
				const type=0;
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				
				let params={
					url:"/api/achieve/TeamList",
					data:{uid,token,type}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.teamList=result.data.data;
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
		onLoad(options){
			this.down_task=options.down_task
			this.goal_task=options.goal_task
		},
		created(){
			this.getDatas()
		},
		filters:{
			subsTime(str){
				return str.slice(0,10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team-container{
		min-height: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		.tab-list-wraps{
			height: 88rpx;
			.tab-list{
				display: flex;
				background: #F5F6FA;
				border-radius: 16rpx;
				.tab-item{
					flex: 1;
					text-align: center;
					height: 88rpx;
					line-height: 88rpx;
				}
			}
		}
		.team-list{
			padding-top: 10rpx;
			box-sizing: border-box;
			.team-item{
				display: flex;
				border-bottom: 1px solid #eaeaea;
				padding: 40rpx 0 46rpx 0;
				box-sizing: border-box;
				text{
					flex: 1;
					color: #2F2F51;
					font-size: 28rpx;
					text-align: center;
				}
			}
		}
	}
</style>
