<template>
	<view class="regist-container">
		<view class="welcome-block">
			<view>Hi {{userInfo.nickname}}</view>
			<view>Welcome {{userInfo.nickname}}</view>
		</view>
		<view class="user-block">
			<view class="user-rows">微信名: {{userInfo.name}}</view>
			<view class="user-rows">你的邀请人: {{userInfo.invitor}}</view>
			<view class="user-rows">被邀请的职位: {{userInfo.positons}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:{
					nickname:'jodan',
					name:'旺财',
					invitor:"九姑娘",
					positons:'销售经理'
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.regist-container{
		background: #b8c1df;
		height: 100%;
		padding: 60rpx;
		padding-bottom: 0;
		box-sizing: border-box;
		
		.welcome-block{
			view{
				font-size: 48rpx;
				font-weight: 700;
				line-height: 60rpx;
			}
		}
		
		.user-block{
			background: #d9eeff;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 30rpx;
			margin-top: 84rpx;
			.user-rows{
				color: #555;
				line-height: 50rpx;
			}
		}
	}
</style>
