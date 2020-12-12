<template>
	<view class="card-container">
		<view class="card-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="card-content">
			<view class="card-block">
				<view class="card-title">我的卡</view>
				<view class="card-list">
					<view class="card-item" v-for="(item,index) in cardList" :key="index">
						<text class="card-num">{{replaceName(item.number)}}</text>
						<text class="card-name">{{item.bank_name}}</text>
						<text class="card-user">用户名 {{item.real_name}}</text>
					</view>
				</view>
				<view class="btn-block">
					<view class="add-btn card-btn" @click="skipPage('../addCard/index')">添加银行卡</view>
					<view class="cash-btn card-btn" @click="skipPage('../cash/index')">前往提现</view>
				</view>
			</view>
		</view>
		<wyb-loading ref="loading"/>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default{
		data(){
			return{
				cardList:[]
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
			},
			replaceName(num){
				let firstStr=num.slice(0,3);
				let lastStr=num.slice(-3,num.length);
				return `${firstStr}***${lastStr}`
			},
			async getCardList(){
				const token=uni.getStorageSync('appToken');
				const uid=uni.getStorageSync('uid');
				
				let params={
					url:'/api/user/UserBankList',
					data:{
						token,
						uid
					}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.cardList=result.data.data;
					this.$refs.loading.hideLoading();
				}else{
					this.$refs.loading.hideLoading();
					this.showToast(result.data.message);
				}
			}
		},
		mounted(){
			this.$refs.loading.showLoading();
			this.getCardList()
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/scss/common.scss';
	.card-container{
		height: 100%;
		position: relative;
		background: #EAEEFC;
		.card-header{
			height: 360rpx;
			background: #eaeefc;
		}
		.back-btn{
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			left: 20rpx;
			top:80rpx;
			z-index: 50;
		}
		.card-content{
			height: calc(100% - 50rpx);
			width: 100%;
			background: url('../../static/images/card_bg.png') no-repeat;
			background-position:0px 20rpx;
			background-size: 100% 100%;
			position: absolute;
			top: 50rpx;
			left: 0;
			z-index: 10;
			padding: 0 60rpx;
			padding-top: 310rpx;
			box-sizing: border-box;
			.card-block{
				.card-title{
					color: #707070;
					font-size: 32rpx;
					margin-bottom: 48rpx;
				}
				.card-list{
					border-bottom:1px solid #eaeaea;
					.card-item{
						height: 94rpx;
						line-height: 94rpx;
						border-top:1px solid #eaeaea;
						box-sizing: border-box;
						color: #707070;
						font-size: 28rpx;
						.card-name{
							margin-right: 44rpx;
							margin-left: 52rpx;
						}
					}
				}
				.btn-block{
					display: flex;
					margin-top: 62rpx;
					.card-btn{
						width: 144rpx;
						height: 54rpx;
						text-align: center;
						line-height: 54rpx;
						color: #fff;
						font-size: 22rpx;
						border-radius: 10rpx;
						margin: 0;
					}
					.add-btn{
						background: #BBCAFF;
						margin-right: 116rpx;
					}
					.cash-btn{
						background: #FEC4D6;
					}
				}
			}
		}
	}
	@media screen and (min-height: $minH+px) {
		.card-container{
			.card-content{
				padding-top: 350rpx;
			}
		}
	}
</style>
