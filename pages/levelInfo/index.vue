<template>
	<view class="level-container">
		<view class="level-header">
			<view class="level-header-top">
				<view class="brand"><image src="../../static/images/icon_group.png"></image></view>
				<view class="level-detail">
					<view class="levels-wraps">
						<text class="levl-nums">L{{levelInfo.name}}</text>/
						<text class="user">{{nickname}}</text>
					</view>
					<view class="prize-wraps">
						<text>获得的奖励</text>
						<text class="prize">{{(levelInfo.range)*100}}%</text>
						<text class="prize-name">团队销售奖</text>
					</view>
				</view>
			</view>
			<view class="level-header-middle">
				<view class="level-rows">
					<view class="level-icon"><image src="../../static/images/icon_gou.png"></image></view>
					<view class="team-name">小团任务：</view>
					<view class="level-progress"><my-progress  :activeColor="actvColor01" 
					:proIcon="proIcon01" :percent="percent01" :totalNums="total01" :curNums="curNum01"/></view>
				</view>
				<view class="level-rows">
					<view class="level-icon"><image src="../../static/images/icon_gou.png"></image></view>
					<view class="team-name">大团任务：</view>
					<view class="level-progress"><my-progress :activeColor="actvColor02" 
					:proIcon="proIcon02" :percent="percent02" :totalNums="total02" :curNums="curNum02"/></view>
				</view>
			</view>
			<view class="level-header-bottom">
				温馨提示：您的小团任务已经完成，大团还差2单即可升级将享受到 4%销售奖。
			</view>
		</view>
		<view class="level-content">
			<view class="rules"><text>销售奖规则说明</text></view>
			<view class="level-tab-block">
				<text>等级</text>
				<text class="middel-tab">升级条件</text>
				<text>提升比例</text>
			</view>
			<view class="team-block">
				<view class="team-list">
					<view class="team-item" v-for="(item,index) in teamList" :key="index">
						<text>{{item.name}}</text>
						<text class="item-middle">达到目标{{item.target}}单</text>
						<text>{{(item.range)*100}}%</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myProgress from '../../myComponents/progressBar/index.vue'
	export default{
		data(){
			return{
				actvColor01:"linear-gradient(135deg, #FEB497 0%, #F96C7C 100%)",
				actvColor02:"linear-gradient(90deg, #FFDD60 0%, #FFB743 100%)",
				curNum01:0,
				curNum02:0,
				total01:0,
				total02:0,
				levelInfo:{},
				teamList:[],
				nickname:""
			}
		},
		components:{
			myProgress
		},
		computed:{
			percent01(){
				const {curNum01,total01 }=this
				if(total01==0){
					return 0
				}else if(curNum01>total01){
					return 100
				}else{
					return Math.round((curNum01/total01)*100)
				}
			},
			percent02(){
				const {curNum02,total02 }=this
				if(total02==0){
					return 0
				}else if(curNum02>total02){
					return 100
				}else{
					return Math.round((curNum02/total02)*100)
				}
			},
			proIcon01(){
				const {curNum01,total01 }=this
				if(total01==0){
					return '../../static/images/arrow02.png'
				}else{
					return Math.round((curNum01/total01)*100)<100?'../../static/images/arrow02.png':'../../static/images/arrow03.png'
				}
				
			},
			proIcon02(){
				const {curNum02,total02 }=this
				if(total02==0){
					return '../../static/images/arrow02.png'
				}else{
					return Math.round((curNum02/total02)*100)<100?'../../static/images/arrow02.png':'../../static/images/arrow01.png'
				}

			}
		},
		methods:{
			async getData(){
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				let params={
					url:'/api/achieve/TeamStage',
					data:{uid,token}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					let { little_team,main_team,little_sum,main_sum,stage,stage_list }=result.data.data;
					this.levelInfo=stage
					this.curNum01=parseInt(little_team) 
					this.curNum02=parseInt(main_team) 
					this.total01=parseInt(little_sum)
					this.total02=parseInt(main_sum)
					this.teamList=stage_list
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
		created(){
			this.getData()
		},
		onLoad(){
			this.nickname=uni.getStorageSync('nickname')
		}
	}
</script>

<style lang="scss" scoped>
	.level-container{
		height: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		.level-header{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			background: url("../../static/images/bg_blue.png") no-repeat;
			background-size: 100% 100%;
			border-radius: 32rpx;
			box-shadow: 0 0 6px  rgba(35,52,208,.3);
			.level-header-top{
				display: flex;
				.brand{
					width: 140rpx;
					height: 150rpx;
					margin-right: 20rpx;
				}
				.level-detail{
					height: 140rpx;
					color: #fff;
					.levels-wraps{
						line-height: 80rpx;
						height: 80rpx;
						.levl-nums{
							font-size: 56rpx;
							margin-right: 16rpx;
						}
					}
					.prize-wraps{
						height: 60rpx;
						line-height: 60rpx;
						font-size: 22rpx;
						.prize{
							margin: 0 20rpx;
						}
					}
				}
			}
			.level-header-middle{
				margin-top: 20rpx;
				border-bottom: 1px solid #b6c6ff;
				.level-rows{
					display: flex;
					margin-bottom: 64rpx;
					.level-icon{
						width: 20rpx;
						height: 26rpx;
						margin-right: 16rpx;
					}
					.team-name{
						color: #fff;
						line-height: 28rpx;
						height: 24rpx;
					}
					.level-progress{
						width: 420rpx;
						margin-left: 24rpx;
						height:28rpx;
						padding-top: 12rpx;
						box-sizing: border-box;
					}
				}
			}
			
			.level-header-bottom{
				margin-top: 18rpx;
				color: #fff;
				font-size: 20rpx;
				line-height: 30rpx;
			}
		}
		
		.level-content{
			margin-top: 40rpx;
			padding-bottom: 40rpx;
			// height: calc(100% - 500rpx);
			.rules{
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				background: #F5F6FA;
				color: #75758C;
				font-size: 28rpx;
				border-radius: 12rpx 12rpx 0 0;
			}
			.level-tab-block{
				display: flex;
				padding: 0 40rpx;
				box-sizing: border-box;
				text{
					flex: 1;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					color: #75758C;
					font-size: 28rpx;
				}
				.middel-tab{
					flex: 2;
				}
			}
			.team-block{
				// height: calc(100% - 176rpx);
				.team-list{
					padding: 0 40rpx;
					padding-bottom: 40rpx;
					border-radius: 0 0 12rpx 12rpx;
					box-sizing: border-box;
					background: #F5F6FA;
					.team-item{
						display: flex;
						border-bottom: 1px solid #eaeaea;
						text{
							flex: 1;
							text-align: center;
							height: 114rpx;
							line-height: 114rpx;
							font-size: 28rpx;
							color: #2F2F51;
						}
						.item-middle{
							flex: 2;
						}
					}
				}
			}
			
		}
	}
</style>
