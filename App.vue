<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		height: 100%;
	}
	uni-page-body{
		height: 100%;
		font-size: 26rpx;
	}
	uni-image{
		width: 100%;
		height: 100%;
	}
	.button{
		background: #8FA8FF;
		color: #fff;
		border-radius: 24rpx;
		font-size: 28rpx;
		height: 96rpx;
		line-height: 96rpx;
	}
	uni-tabbar .uni-tabbar__icon.uni-tabbar__icon__diff {
		width: 30px;
	}
	
	.fl{
		float:left;
	}
	.fr{
		float: right;
	}
	.cl{
		clear: both;
	}
	
	.uni-checkbox-input{
		width: 32rpx !important;
		height: 32rpx !important;
	}
	.uni-label-pointer{
		color: #707070;
		font-size: 24rpx;
	}
	.uni-table{
		min-width: 200px!important;
	}
	.uni-progress-bar{
		border-radius: 18rpx;
	}
	.uni-progress-inner-bar{
		border-radius: 18rpx;
	}
</style>
