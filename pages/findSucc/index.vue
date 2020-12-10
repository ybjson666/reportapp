<template>
	<view class="succ-container">
		<view class="succ-logo"><image src="../../static/images/succ.png"></image></view>
		<view class="succ-txt"><text>密码修改成功</text></view>
		<button class="button" @click="goLogin">返回登陆</button>
	</view>
</template>

<script>
	export default{
		methods:{
			goLogin(){
				uni.navigateTo({
					url:"../login/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.succ-container{
		height: 100%;
		padding-top: 114rpx;
		box-sizing: border-box;
		.succ-logo{
			width: 320rpx;
			height: 212rpx;
			margin: 0 auto;
		}
		.succ-txt{
			text-align: center;
			font-weight: 600;
			color: #1F1F39;
			font-size: 36rpx;
			margin-top: 56rpx;
		}
		.button{
			width: 494rpx;
			margin: 0 auto;
			margin-top: 88rpx;
		}
	}
</style>
