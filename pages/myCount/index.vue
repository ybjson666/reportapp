<template>
	<view class="mycount-container">
		<uni-table  emptyText="暂无数据">
			<uni-tr class="table-header">
				<uni-th>昵称</uni-th>
				<uni-th>业绩</uni-th>
				<uni-th>时间</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in countList" :key="index">
				<uni-th>{{item.nick_name}}</uni-th>
				<uni-th>{{item.grade}}</uni-th>
				<uni-th>{{item.add_time}}</uni-th>
			</uni-tr>
		</uni-table>
		<uni-load-more :status="loadStatus" iconType="circle" v-show="isLoadMore"></uni-load-more>
		<wyb-loading ref="loading"/>
	</view>
</template>

<script>
	import uniTable from '@/components/uni-table/uni-table.vue';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default{
		data(){
			return{
				countList:[
					{
						id:'001',
						nick_name:'阿珂',
						grade:'1589台',
						add_time:'2020.03.25'
					},
					{
						id:'002',
						nick_name:'阿珂',
						grade:'1589台',
						add_time:'2020.03.25'
					},
					{
						id:'003',
						nick_name:'阿珂',
						grade:'1589台',
						add_time:'2020.03.25'
					},
					{
						id:'004',
						nick_name:'阿珂',
						grade:'1589台',
						add_time:'2020.03.25'
					},
					{
						id:'005',
						nick_name:'阿珂',
						grade:'1589台',
						add_time:'2020.03.25'
					}
				],
				loadStatus:'',
				isLoadMore:false
			}
		},
		components:{
			uniTable,
			uniLoadMore,
			wybLoading
		},
		mounted(){
			this.$refs.loading.showLoading();
			setTimeout(()=>{
				this.$refs.loading.hideLoading();
			},800)
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
