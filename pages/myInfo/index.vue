<template>
	<view class="myinfo-container">
		<view class="myinfo-content">
			<view class="info-header">
				<text class="fl title">千翻壹号</text>
				<view class="cash-block fr">
					<view class="cicle"></view>
					<text>提现</text>
				</view>
				<view class="cl"></view>
			</view>
			
			<view class="balance-block">
				<view class="balance-header">
					<view class="balance-icon"><image src="../../static/images/balance.png"></image></view>
					<text>Balance / 余额</text>
				</view>
				<view class="balance-val">{{balance}}</view>
			</view>
			
			<view class="share-block">
				<view class="share-item">
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
				balance:"95842400.00",
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
						name:'基础设置',
						path:'../setting/index'
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
					uni.removeStorageSync('appToken');
					uni.removeStorageSync('uid');
					uni.removeStorageSync('phone');
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../static/scss/common.scss';
.myinfo-container{
	height: 100%;
	background-image: url('../../static/images/info_bg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	padding-top: 360rpx;
	box-sizing: border-box;
	.myinfo-content{
		padding: 0 32rpx;
		padding-bottom: 130rpx;
		box-sizing: border-box;
		.info-header{
			padding: 0 20rpx;
			box-sizing: border-box;
			height: 90rpx;
			line-height: 90rpx;
			.title{
				font-size: 56rpx;
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
				font-size: 48rpx;
				color: #2F2F51;
				margin-top: 24rpx;
			}
		}
		
		.share-block{
			display: flex;
			margin-top: 48rpx;
			view{
				width: 328rpx;
				height: 198rpx;
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
			margin-top: 40rpx;
			.menu-item{
				margin-bottom: 12rpx;
				height:100rpx;
				line-height: 100rpx;
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
@media screen and (min-height: $minH+px) {
		.myinfo-container{
			padding-top: 390rpx;
		}
		.info-header{
			.title{
				font-size: 68rpx;
			}
		}
		.balance-block{
			margin-top: 40rpx;
			.balance-val{
				font-size: 56rpx;
			}
		}
		.share-block{
			margin-top: 56rpx;
		}
	}
</style>
