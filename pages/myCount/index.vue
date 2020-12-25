<template>
	<view class="mycount-container">
		<uni-table  :emptyText="emptys">
			<uni-tr class="table-header">
				<uni-th>昵称</uni-th>
				<uni-th>业绩</uni-th>
				<uni-th>时间</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in countList" :key="index">
				<uni-th>{{item.nickname}}</uni-th>
				<uni-th>{{item.num}}台</uni-th>
				<uni-th>{{item.addtime | fomatTime}}</uni-th>
			</uni-tr>
		</uni-table>
		<uni-load-more :status="loadStatus" iconType="circle" v-show="isLoadMore"></uni-load-more>
	</view>
</template>

<script>
	import uniTable from '@/components/uni-table/uni-table.vue';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				cid:"",
				count:"",
				countList:[],
				loadStatus:'',
				isLoadMore:false,
				emptys:"",
				page:1
			}
		},
		components:{
			uniTable,
			uniLoadMore
		},
		methods:{
			async getDatas(types){
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				const { page,cid,type }=this
				
				let params={
					url:'/api/achieve/UserAchievementsStatistical',
					data:{uid,token,page,type,cid}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					this.page++
					if(types=='refresh'){
						console.log(result.data.data.data)
						this.countList=result.data.data.data;
						uni.stopPullDownRefresh();
					}else{
						this.countList=this.countList.concat(result.data.data.data)
					}
					
				}else if(result.data.code===204){
					if(types=='refresh'){
						this.emptys="暂无数据"
						uni.stopPullDownRefresh();
					}
					this.loadStatus='noMore'
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
			}
		},
		onLoad(options){
			this.cid=options.cid;
			this.type=options.type;
			this.getDatas('refresh')
		},
		onPullDownRefresh() {
			this.page=1;
			setTimeout(()=>{
				this.getDatas('refresh');
			},500)
		},
		onReachBottom(){
			this.loadStatus='loading'
			this.isLoadMore=true
			setTimeout(()=>{
				this.getDatas('loadMore');
			},500)
		},
		filters:{
			fomatTime(str){
				if(str.length){
					return str.slice(0,10)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mycount-container{
		height: 100%;
		padding: 20rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		.uni-table{
			.uni-table-tr{
				display: flex;
				.uni-table-th{
					flex: 1;
					text-align: center!important;
					color: #75758C;
				}
			}
		}
		.table-header{
			.uni-table-th{
				background: #F5F6FA;
				border-bottom: none;
				color: #75758C;
				font-size: 32rpx;
			}
			.uni-table-th:nth-child(1){
				border-radius: 16rpx 0 0 16rpx;
			}
			.uni-table-th:nth-child(3){
				border-radius: 0 16rpx 16rpx 0;
			}
		}
	}
</style>
