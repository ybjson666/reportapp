<template>
	<view class="order-container">
		<uni-table  :emptyText="emptys">
			<uni-tr class="table-header">
				<uni-th>订单编号</uni-th>
				<uni-th>购买时间</uni-th>
				<uni-th>总计费用</uni-th>
				<uni-th>购买数据</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in orderList" :key="index">
				<uni-th>{{item.order_num | formatOrder}}</uni-th>
				<uni-th>{{formatTimeStr(item.addtime)}}</uni-th>
				<uni-th>{{item.total_money}}</uni-th>
				<uni-th>{{item.num}}单</uni-th>
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
				loadStatus:'',
				isLoadMore:false,
				page:1,
				state:"",
				type:"",
				orderList:[],
				emptys:""
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
				const { page,state,type }=this
				
				let params={
					url:'/api/achieve/orderList',
					data:{uid,token,page,type,state}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					this.page++
					if(types=='refresh'){
						this.orderList=result.data.data.data;
						uni.stopPullDownRefresh();
					}else{
						this.orderList=this.orderList.concat(result.data.data.data)
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
			},
			formatTimeStr(str){
				if(!str){
			        return;
			    }
			    return str.slice(0,10)
			}
		},
		onLoad(options){
			this.state=options.state;
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
			formatOrder(str){
				let first=str.slice(0,3);
				let middle="***";
				let last=str.slice(-3);
				return first+middle+last;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-container{
		height: 100%;
		padding: 18rpx 30rpx;
		padding-bottom: 0;
		box-sizing: border-box;
		.uni-table{
			.uni-table-tr{
				display: flex;
				.uni-table-th{
					text-align: center!important;
					color: #2F2F51;
					padding: 32rpx 0rpx;
					font-size: 28rpx;
				}
				.uni-table-th:nth-child(1){
					width: 160rpx;
				}
				.uni-table-th:nth-child(2){
					width: 170rpx;
				}
				.uni-table-th:nth-child(3){
					flex: 1;
				}
				.uni-table-th:nth-child(4){
					width: 150rpx;
				}
			}
		}
		.table-header{
			.uni-table-th{
				background: #F5F6FA;
				border-bottom: none;
				color: #75758C !important;
				font-size: 28rpx;
				padding: 32rpx 0rpx;
			}
			.uni-table-th:nth-child(1){
				border-radius: 16rpx 0 0 16rpx;
				width: 160rpx;
			}
			.uni-table-th:nth-child(2){
				width: 170rpx;
			}
			.uni-table-th:nth-child(3){
				flex: 1;
			}
			.uni-table-th:nth-child(4){
				border-radius: 0 16rpx 16rpx 0;
				width: 150rpx;
			}
		}
	}
</style>
