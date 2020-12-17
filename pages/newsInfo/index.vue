<template>
	<view class="news-container">
		<view class="news-title">{{news.title}}</view>
		<view class="authous">作者：{{news.author}}</view>
		<view class="add-time">{{fomatTime(news.addtime)}}</view>
		<!-- <view class="news-pic"><image :src="news.pic"></image></view> -->
		<view class="news-content" v-html="news.content"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				news:{},
				news_id:""
			}
		},
		methods:{
			async getNews(){
				const { news_id }=this;
				let params={
					url:"/api/news/NewsInfo",
					data:{
						news_id
					},
					types:'GET'
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					this.news=result.data.data;
				}else{
					this.showToast(result.data.errMsg);
				}
			},
			fomatTime(str){
				if(!str){
				    return;
				}
				var time = new Date(str*1000);
				var month = time.getMonth() + 1;
				var strDate = time.getDate();
				var hour=time.getHours();
				var min=time.getMinutes();
				var sec=time.getSeconds();
				if (month >= 1 && month <= 9) {
				    month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
				    strDate = "0" + strDate;
				}
				if (hour >= 0 && hour <= 9) {
				    hour = "0" + hour;
				}
				if (min >= 0 && min <= 9) {
				    min = "0" + min;
				}
				if (sec >= 0 && sec <= 9) {
				    sec = "0" + sec;
				}
				//获取日期对象 time 的年、月、日，并拼接为字符串 yyyy-mm-dd ,再返回
				return time.getFullYear() + "-" + month + "-" + strDate + "\xa0"+hour+":"+min+":"+sec;
			}
		},
		onLoad(options){
			this.news_id=options.news_id;
			this.getNews()
		}
	}
</script>

<style lang="scss" scoped>
	.news-container{
		min-height: 100%;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		.news-title{
			text-align: center;
			font-size: 36rpx;
			margin-bottom: 20rpx;
			color: #2F2F51;
		}
		.add-time{
			color:#75758C;
			font-size: 24rpx;
			text-align: center;
		}
		.authous{
			color:#75758C;
			font-size: 28rpx;
			text-align: center;
			margin-bottom: 20rpx;
		}
		.news-pic{
			width: 100%;
			height: 300rpx;
			border-radius: 10rpx;
			overflow: hidden;
			margin-top: 80rpx;
			margin-bottom: 30rpx;
		}
		.news-content{
			margin-top: 80rpx;
			/deep/ p{
				line-height: 40rpx;
				color: #75758C;
				font-size: 28rpx;
				text-align: justify;
				margin: 20rpx 0;
				img{
					border-radius: 10rpx;
					width: 100%;
				}
			}
			/deep/ .img-container{
				width: 100%;
				img{
					border-radius: 10rpx;
					width: 100%;
				}
			}
		}
		
		/deep/ img{
					border-radius: 10rpx;
					width: 100%;
				}
		
	}
</style>
