<template>
	<view class="message-container">
		<view class="msg-list">
			<view class="msg-item" v-for="(item,index) in msgList" :key="index">
				<view class="msg-top">
					<text class="msg-title ">{{item.msg}}</text>
					<!-- <text class="msg-title fl">{{item.msg}}</text>
					<text class="msg-status blue fr" v-if="item.read_status=='0'">未读</text>
					<text class="msg-status fr" v-else-if="item.read_status=='1'">已读</text>
					<view class="cl"></view> -->
				</view>
				<view class="msg-info">{{item.info}}</view>
				<view class="msg-bottom">
					<text class="msg-addtime ">{{fomatTime(item.addtime)}}</text>
					<!-- <text class="seek fl">点击查看详情</text>
					<text class="msg-addtime fr">{{fomatTime(item.addtime)}}</text>
					<view class="cl"></view> -->
				</view>
			</view>
		</view>
		
		<!--无消息提示-->
		<view class="no-message-block" v-show="isEmpty">
			<view class="msg-icon"><image src="../../static/images/ic_msg.png"></image></view>
			<view class="msg-txt">No information</view>
			<view class="msg-txt sec-msg">暂无信息</view>
		</view>
		<uni-load-more :status="loadStatus" iconType="circle" v-show="isLoadMore"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				msgList:[],
				loadStatus:'',
				isLoadMore:false,
				page:1,
				isEmpty:false
			}
		},
		components:{
			uniLoadMore
		},
		methods:{
			async getMsgList(type){
				const { page }=this
				let token=uni.getStorageSync('token')
				let uid=uni.getStorageSync('uid')
				let params={
					url:'/api/user/UserMsgList',
					data:{token,uid,page}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					let list=result.data.data.data;
					this.page++
					if(type==='fresh'){
						this.msgList=list;
						if(!this.msgList.length){
							this.isEmpty=true;
						}
						uni.stopPullDownRefresh();
					}else{
						this.msgList=this.msgList.concat(list);
					}
				}else if(result.data.code===204){
					this.loadStatus='noMore'
					if(type==='fresh'){
						this.isEmpty=true;
					}
					uni.stopPullDownRefresh();
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
				return time.getFullYear() + "." + month + "." + strDate + "\xa0"+hour+":"+min+":"+sec;
			}
		},
		mounted(){
			this.getMsgList('fresh');
		},
		onPullDownRefresh() {
			this.page=1;
			setTimeout(()=>{
				this.getMsgList('fresh');
			},500)
		},
		onReachBottom(){
			this.loadStatus='loading'
			this.isLoadMore=true
			setTimeout(()=>{
				this.getMsgList('loadMore');
			},500)
		}
	}
</script>

<style lang="scss" scoped>
	.message-container{
		min-height: 100%;
		padding: 44rpx 40rpx 0 40rpx;
		box-sizing: border-box;
		.no-message-block{
			width: 210rpx;
			margin: 0 auto;
			margin-top: 100rpx;
			.msg-icon{
				width: 100rpx;
				height: 100rpx;
				margin: 0 auto;
			}
			.msg-txt{
				text-align: center;
				margin-top: 28rpx;
				color: #9797A8;
				font-size: 28rpx;
			}
			.sec-msg{
				margin-top: 0;
			}
		}
		
		.msg-list{
			.msg-item{
				background: #F9FAFC;
				border-radius: 20rpx;
				padding: 26rpx 40rpx;
				box-sizing: border-box;
				margin-bottom: 50rpx;
				.msg-top{
					margin-bottom:28rpx ;
					.msg-title{
						font-size: 30rpx;
						color: #333;
					}
					.msg-status{
						color: #999;
						font-size: 28rpx;
					}
					.blue{
						color: #6F8FEA;
					}
				}
				.msg-info{
					color: #333;
					font-size: 30rpx;
					margin-bottom: 24rpx;
					line-height: 42rpx;
				}
				.msg-bottom{
					.seek{
						color: #999;
						font-size: 26rpx;
					}
					.msg-addtime{
						color: #9797A8;
						font-size: 22rpx;
					}
				}
				
			}
		}
	}
</style>
