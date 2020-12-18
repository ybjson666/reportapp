<template>
	<view class="paySucc-container">
		<view class="succ-icon-block">
			<view class="succ-icon">
				<image src="../../static/images/succ_icon.png"></image>
			</view>
			<view class="succ-txt">支付成功</view>
		</view>
		<view class="pay-status-block">
			<text class="add-time">{{fTime(addtime)}}</text>
		</view>
		<view class="btn-block"><view class="button" @click="goHome">返回首页</view></view>
	</view>
</template>

<script>
	import { formatTimeStr }  from '../../utils/tool.js'
	export default{
		data(){
			return{
				addtime:''
			}
		},
		methods:{
			goHome(){
				uni.navigateTo({
					url:'../report/index'
				})
			},
			fTime(str){
				return formatTimeStr(str)
			}
		},
		onLoad(options){
			this.addtime=options.addtime;
		}
	}
</script>

<style lang="scss" scoped>
	.paySucc-container{
		height: 100%;
		padding-top:76rpx;
		box-sizing: border-box;
		.succ-icon-block{
			.succ-icon{
				width: 108rpx;
				height: 108rpx;
				margin: 0 auto;
				margin-bottom:40rpx;
			}
			.succ-txt{
				text-align: center;
				font-size: 36rpx;
				color: #333;
			}
		}
		
		.pay-status-block{
			height: 480rpx;
			background: url('../../static/images/time_icon.png') no-repeat;
			background-size: 100%;
			position: relative;
			margin-top: 40rpx;
			.add-time{
				position: absolute;
				left: 140rpx;
				top:110rpx;
				color: #999;
				font-size: 30rpx;
			}
		}
		.btn-block{
			width: 494rpx;
			margin: 0 auto;
			.button{
				text-align: center;
				font-size: 28rpx;
			}
		}
	}
</style>
