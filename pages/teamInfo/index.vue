<template>
	<view class="team-container">
		<view class="tab-list-wraps">
			<view class="tab-list">
				<view class="tab-item" v-for="(item,index) in tabList" :key="index" @click="seleStatus(item)">
					<text class="tab-name">{{item.name}}</text>
					<view class="tab-icon" :class="{active:item.status==='1'}"></view>
				</view>
			</view>
		</view>
		<view class="team-list">
			<view class="team-item" v-for="(item,index) in teamList" :key="index" @click="skipPage">
				<text class="team-name">{{item.team_name}}</text>
				<text class="team-time">{{item.add_time}}</text>
				<text class="team-nums">{{item.nums}}</text>
				<text class="team-sell">{{item.sell}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				teamList:[
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					},
					{
						team_name:'团队A',
						add_time:'2020.10.25',
						nums:'20',
						sell:'20单'
					}
				],
				tabList:[
					{
						name:'用户昵称',
						status:'0',
						status_name:'nick_status'
					},
					{
						name:'注册时间',
						status:'0',
						status_name:'time_status'
					},
					{
						name:'团队人数',
						status:'0',
						status_name:'num_status'
					},
					{
						name:'团队销量',
						status:'0',
						status_name:'sell_status'
					}
				],
				nick_status:'0',
				time_status:'0',
				num_status:'0',
				sell_status:'0'
			}
		},
		methods:{
			seleStatus(item){
				if(item.status=='0'){
					item.status='1'
				}else{
					item.status='0'
				}
				this[item.status_name]=item.status;
				console.log(this.nick_status)
				console.log(this.time_status)
				console.log(this.num_status)
				console.log(this.sell_status)
			},
			skipPage(){
				uni.navigateTo({
					url:'../teamSecond/index'
				})
			}
		},
		onReachBottom(){
			console.log(111)
		}
	}
</script>

<style lang="scss" scoped>
	.team-container{
		min-height: 100%;
		padding: 10rpx 30rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		.tab-list-wraps{
			height: 88rpx;
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top:98rpx;
			z-index: 20;
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
			margin-top: 20rpx;
			padding-top: 70rpx;
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
