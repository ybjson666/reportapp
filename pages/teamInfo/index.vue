<template>
	<view class="team-container">
		<view class="tab-list-wraps">
			<view class="tab-list">
				<view class="tab-item" v-for="(item,index) in tabList" :key="index" @click="seleStatus(item)">
					<text class="tab-name">{{item.name}}</text>
					<view class="tab-icon" :class="{active:item.status==='0'}"></view>
				</view>
			</view>
		</view>
		<view class="team-list">
			<view class="team-item" v-for="(item,index) in teamList" :key="index" @click="skipPage(item.user_id)">
				<text class="team-name">{{item.nickname |subName}}</text>
				<text class="team-time">{{item.addtime | subsTime}}</text>
				<text class="team-nums">{{item.team_count}}</text>
				<text class="team-sell">{{item.total_count}}</text>
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
				cid:"",
				tabList:[
					{
						name:'用户昵称',
						status:'1',
						status_name:'nick_status'
					},
					{
						name:'注册时间',
						status:'1',
						status_name:'time_status'
					},
					{
						name:'团队人数',
						status:'1',
						status_name:'num_status'
					},
					{
						name:'团队销量',
						status:'1',
						status_name:'sell_status'
					}
				],
				nick_status:'1',
				time_status:'1',
				num_status:'1',
				sell_status:'1'
			}
		},
		methods:{
			seleStatus(item){
				if(item.status=='1'){
					item.status='0'
				}else{
					item.status='1'
				}
				this[item.status_name]=item.status;
				this.getDatas();
			},
			skipPage(teamid){
				const { down_task,goal_task }=this
				uni.navigateTo({
					url:`../teamSecond/index?down_task=${down_task}&goal_task=${goal_task}&team_type=1&team_id=${teamid}`
				})
			},
			async getDatas(types){
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				const { nick_status,time_status,num_status,sell_status,page,cid }=this
				
				let params={
					url:"/api/achieve/TeamList",
					data:{uid,token,nick_status,time_status,num_status,sell_status,cid}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					let list=result.data.data;
					this.teamList=list;
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
			this.cid=options.cid
			this.getDatas()
		},
		filters:{
			subsTime(str){
				return str.slice(0,10)
			},
			subName(str){
				if(str.length<=4){
					return str
				}else{
					return str.slice(0,1)+'**'+str.slice(-2)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team-container{
		min-height: 100%;
		padding: 20rpx 30rpx;
		// padding-bottom: 20rpx;
		box-sizing: border-box;
		.tab-list-wraps{
			height: 88rpx;
			width: 100%;
			//padding: 0 30rpx;
			//padding-top: 30rpx;
			//box-sizing: border-box;
			//position: fixed;
			//left: 0;
			// top:0rpx;
			//top:80rpx;
			//z-index: 20;
			background: #fff;
			.tab-list{
				display: flex;
				background: #F5F6FA;
				border-radius: 16rpx;
				.tab-item{
					flex: 1;
					text-align: center;
					height: 88rpx;
					line-height: 88rpx;
					.tab-icon{
						display: inline-block;
						width: 8rpx;
						height: 20rpx;
						background: url('../../static/images/order_down.png') no-repeat;
						background-size: 100%;
						margin-left: 20rpx;
					}
					.active{
						background: url('../../static/images/order_up.png') no-repeat;
						background-size: 100%;
					}
					.tab-name{
						color: #75758C;
						font-size: 28rpx;
					}
				}
			}
		}
		.team-list{
			//padding-top: 100rpx;
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
