<template>
	<view class="myinfo-container">
		<view class="myinfo-content">
			<view class="info-header">
				<text class="fl title">{{nickname}}</text>
				<view class="cash-block fr">
					<view class="cicle"></view>
					<text>提现</text>
				</view>
				<view class="cl"></view>
			</view>
			
			<view class="balance-block" @click="skipPage('../income/index')">
				<view class="balance-header">
					<view class="balance-icon"><image src="../../static/images/balance.png"></image></view>
					<text>Balance / 余额</text>
				</view>
				<view class="balance-val">{{balance}}</view>
			</view>
			
			<view class="share-block">
				<view class="share-item" @click="skipPage('../share/index')">
					<text>推广分享</text>
				</view>
				<view class="manger-item" @click="skipPage('../message/index')">
					<text>消息管理</text>
				</view>
			</view>
			
			<view class="menu-list">
				<view class="menu-item" v-for="(item,index) in menuList" :key="index" @click="skipPage(item.path)">
					<text>{{item.name}}</text>
				</view>
			</view>
			
			<view class="rect"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance:"",
				nickname:"",
				service_phone:"",
				menuList:[
					{
						name:'银行卡',
						path:'../card/index'
					},
					{
						name:'密码设置',
						path:'../pwdset/index'
					},
					{
						name:'意见反馈',
						path:'../coupe/index'
					},
					{
						name:'联系客服',
						path:'../service/index'
					},
					{
						name:'退出登录',
						path:'../login/index'
					}
				]
			}
		},
		methods: {
			skipPage(url){
				if(url==='../login/index'){
					uni.removeStorageSync('token');
					uni.removeStorageSync('uid');
					uni.removeStorageSync('phone');
					uni.redirectTo({
						url
					})
				}else if(url==='../service/index'){
					uni.makePhoneCall({
						phoneNumber:this.service_phone
					})
					return false;
				}
				uni.navigateTo({
					url
				})
			},
			async getPhone(){
				let params={
					url:'/api/other/ServicePhone',
					types:'GET'
				}
				const result =await this.$http(params)
				if(result.data.code===200){
					this.service_phone=result.data.data
				}else{
					this.showToast(result.data.message)
				}
			}
		},
		onShow(){
			this.getPhone()
			this.refreshUser(this)
		}
	}
</script>

<style lang="scss" scoped>
@import '../../static/common/common.scss';

.myinfo-container{
	height: 100%;
	background-image: url('../../static/images/info_bg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	padding-top: 340rpx;
	box-sizing: border-box;
	position: relative;
	.scan-block{
		position: absolute;
		right: 40rpx;
		top: 80rpx;
		font-size: 20rpx;
		text-align: center;
		.scan-icon{
			width: 40rpx;
			height: 40rpx;
			margin: 0 auto;
			margin-bottom: 10rpx;
		}
	}
	.myinfo-content{
		padding: 0 32rpx;
		box-sizing: border-box;
		.info-header{
			padding: 0 20rpx;
			box-sizing: border-box;
			height: 80rpx;
			line-height: 80rpx;
			.title{
				font-size: 50rpx;
				color: #2F2F51;
			}
			.cash-block{
				.cicle{
					display: inline-block;
					width: 24rpx;
					height: 24rpx;
					background: #84A0FF;
					border-radius: 50%;
					margin-right: 20rpx;
					vertical-align: middle;
				}
				text{
					font-size: 32rpx;
					color: #2F2F51;
				}
			}
		}
		.balance-block{
			margin-top: 30rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			.balance-header{
				display: flex;
				.balance-icon{
					width: 44rpx;
					height: 44rpx;
					margin-right: 16rpx;
				}
				text{
					line-height: 44rpx;
					color: #9797A8;
					font-size: 22rpx;
				}
			}
			
			.balance-val{
				font-size: 56rpx;
				color: #2F2F51;
				margin-top: 24rpx;
			}
		}
		
		.share-block{
			display: flex;
			margin-top: 30rpx;
			view{
				width: 328rpx;
				height: 170rpx;
				position: relative;
				color: #fff;
				font-size: 32rpx;
				text{
					position: absolute;
					left: 36rpx;
					bottom: 48rpx;
				}
			}
			.share-item{
				background: url('../../static/images/my_share.png') no-repeat;
				background-size: 100% 100%;
				margin-right: 30rpx;
			}
			.manger-item{
				background: url('../../static/images/my_mess.png') no-repeat;
				background-size: 100% 100%;
			}
		}
		
		.menu-list{
			margin-top: 30rpx;
			.menu-item{
				margin-bottom: 12rpx;
				height:70rpx;
				line-height: 70rpx;
				border-bottom: 1px solid #eaeaea;
				font-size: 28rpx;
				color: #75758C;
				padding-left: 36rpx;
				box-sizing: border-box;
			}
			.menu-item:last-child{
				margin-bottom: 0;
			}
		}
		
		.rect{
			background: #f9fbfe;
			height: 24rpx;
		}
	}
}

@media screen and (min-height:$screenH+'px'){
	.myinfo-container{
		padding-top: 380rpx;
		.myinfo-content{
			padding-bottom: 0;
			.info-header{
				line-height: 80rpx;
				height: 80rpx;
				.title{
					font-size: 50rpx;
				}
			}
			.balance-block{
				margin-top: 10rpx;
			}
			.balance-block{
				.balance-val{
					font-size: 48rpx;
					margin-top: 20rpx;
				}
			}
			.share-block{
				margin-top: 30rpx;
				.share-item{
					height: 198rpx;
				}
				.manger-item{
					height: 198rpx;
				}
			}
			.menu-list{
				margin-top: 40rpx;
				.menu-item{
					line-height: 100rpx;
					height: 100rpx;
					font-size: 26rpx;
				}
			}
			
		}
		
	}
}
</style>
