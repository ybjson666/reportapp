<template>
	<view class="home-container">
		<view class="goods-list">
			<view class="goods-item" v-for="(item,index) in goodList" :key="index" @click="seekInfo(item.news_id)">
				<view class="goods-name">{{item.title}}</view>
				<view class="goods-desc">{{item.info}}</view>
				<view class="goods-pic"><image :src="item.pic"></image></view>
			</view>
		</view>
		<uni-load-more :status="loadStatus" iconType="circle" v-show="isLoadMore"></uni-load-more>
		<wyb-loading ref="loading"/>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				page:1,
				goodList:[],
				loadStatus:'',
				isLoadMore:true
			}
		},
		components:{
			wybLoading,
			uniLoadMore
		},
		methods: {
			async getList(type){
				const { page }=this;
				let params={
					url:'/api/news/NewsList',
					data:{
						page
					},
					types:'GET'
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					let list=result.data.data.data;
					// this.$refs.loading.hideLoading();
					this.page++
					//this.shouldLoad=result.data.data.data.length>=result.data.dataper_page;//判断是否加载下一页，如果请求的数据的条数大于等于每页的条数就可以加载下一页，否则就不加载下一页
					if(type==='fresh'){
						this.goodList=list;
						uni.stopPullDownRefresh();
					}else{
						this.goodList=this.goodList.concat(list);
					}
				}else if(result.data.code===204){
					this.loadStatus='noMore'
					uni.stopPullDownRefresh();
					// this.$refs.loading.hideLoading();
				}else if(result.data.code===401){
					uni.redirectTo({
						url:'../login/index'
					})
				}else{
					// this.$refs.loading.hideLoading();
					this.showToast(result.data.message);
				}
			},
			seekInfo(news_id){
				uni.navigateTo({
					url:`../newsInfo/index?news_id=${news_id}`
				})
			}
		},
		mounted(){
			// this.$refs.loading.showLoading();
			this.getList('fresh');
		},
		onPullDownRefresh() {
			this.page=1;
			setTimeout(()=>{
				this.getList('fresh');
			},500)
		},
		onReachBottom(){
			this.loadStatus='loading'
			setTimeout(()=>{
				this.getList('loadMore');
			},500)
		}
	}
</script>

<style lang="scss" scoped>
	.home-container{
		min-height: 100%;
		padding: 0 32rpx;
		padding-top: 100rpx;
		padding-bottom: 110rpx;
		box-sizing: border-box;
		.goods-list{
			.goods-item{
				margin-bottom: 40rpx;
				.goods-name{
					color: #4E4E4E;
					font-size: 28rpx;
				}
				.goods-desc{
					font-size: 24rpx;
					color: #9797A8;
					line-height: 36rpx;
				}
				.goods-pic{
					height: 406rpx;
					border-radius: 12rpx;
					overflow: hidden;
				}
			}
		}
	}
</style>
