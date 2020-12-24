<template>
	<view class="income-container">
		<view class="income-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="income-content">
			<view class="balance-block">
				<view class="balance-title">可用余额 （元）</view>
				<view class="balance-wraps">
					<view class="money-icon"><text>RMB</text></view>
					<text class="balance">{{balance}}</text>
				</view>
			</view>
			<view class="income-block">
				<view class="tab-bars">
					<view class="time-tab"><text>时间</text></view>
					<view class="type-tab"><text>类型</text></view>
					<view class="money-tab"><text>金额</text></view>
				</view>
				<view class="income-show-block">
					<s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData" v-if="incomeList.length">
						<view class="income-list">
							<view class="income-item" v-for="(item,index) in incomeList" :key="index">
								<text class="item-time">{{item.addtime}}</text>
								<text class="item-type">{{item.source_type}}</text>
								<text class="item-money">{{item.op}}</text>
							</view>
						</view>
					</s-pull-scroll>
					<view v-show="!incomeList.length" class="none-data">暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sPullScroll from '../../components/s-pull-scroll/index.vue';
	export default{
		data(){
			return{
				balance:"",
				page:1,
				incomeList:[]
			}
		},
		components:{
			sPullScroll
		},
		methods:{
			goback(){
				uni.navigateBack()
			},
			refresh () {
			  this.$nextTick(() => {
			    this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  this.page=1;
			  this.getData('refresh',pullScroll)
			},
			loadData (pullScroll) {
			  this.getData('load',pullScroll)
			},
			async getData(types,pullScroll){
				const { page }=this;
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				
				let params={
					url:'/api/achieve/BonusLog',
					data:{uid,token,page}
				}
				
				let result=await this.$http(params);
				if(result.data.code===200){
					if(types==='refresh'){
						this.incomeList=result.data.data.data;
					}else{
						this.incomeList=this.incomeList.concat(result.data.data.data);
					}
					this.page++;
					setTimeout(()=>{
						pullScroll&&pullScroll.success();
					},500)
				}else if(result.data.code===204){
					setTimeout(()=>{
						pullScroll.finish()
					},500)
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
		created(){
			this.getData('refresh');
			this.refreshUser(this)
		}
	}
</script>

<style lang="scss" scoped>
	.income-container{
		height: 100%;
		position: relative;
		.income-header{
			height: 360rpx;
			background-color: #eaeefc;
			background-image:url('../../static/images/team_bg.png');
			background-repeat: no-repeat;
			background-size: 100%;
		}
		.back-btn{
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			left: 20rpx;
			top:80rpx;
			z-index: 50;
		}
		.income-content{
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			height: calc(100% - 280rpx);
			margin-top: -80rpx;
			padding: 100rpx 40rpx;
			padding-bottom: 40rpx;
			box-sizing: border-box;
			.balance-block{
				background: #f2f3fa;
				border:1px solid #f2f0f0;
				box-shadow: 0px 4rpx 40rpx rgba(35, 52, 208, 0.2);
				border-radius: 32rpx;
				padding: 48rpx 0 88rpx 44rpx;
				box-sizing: border-box;
				.balance-title{
					color: #2F2F51;
					font-size: 32rpx;
				}
				.balance-wraps{
					margin-top: 60rpx;
					display: flex;
					height: 72rpx;
					.money-icon{
						background: #EC6A8F;
						border-radius: 16rpx;
						width: 78rpx;
						height: 52rpx;
						line-height: 52rpx;
						text-align: center;
						color: #fff;
						font-size: 24rpx;
						margin-right: 22rpx;
						margin-top: 20rpx;
					}
					.balance{
						color: #474AD9;
						font-size: 68rpx;
					}
				}
			}
			.income-block{
				margin-top: 40rpx;
				height: calc(100% - 354rpx);
				.tab-bars{
					display: flex;
					height: 88rpx;
					border-radius: 16rpx;
					background: #F5F6FA;
					margin-bottom: 40rpx;
					view{
						line-height: 88rpx;
						text-align: center;
						font-size: 32rpx;
						color: #75758C;
					}
					.time-tab{
						width: 280rpx;
					}
					.type-tab{
						width: 230rpx;
					}
					.money-tab{
						flex: 1;
					}
				}
				.income-show-block{
					height: calc(100% - 128rpx);
					.income-list{
						.income-item{
							display: flex;
							padding: 40rpx 0 46rpx 0;
							border-bottom: 1px solid #eaeaea;
							box-sizing: border-box;
							text{
								color: #2F2F51;
								font-size: 28rpx;
								text-align: center;
							}
							.item-time{
								width: 280rpx;
							}
							.item-type{
								width: 230rpx;
							}
							.item-money{
								flex: 1;
							}
						}
					}
				}
			}
		}
	}
</style>
