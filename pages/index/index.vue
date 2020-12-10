<template>
	<view class="container">
		<view class="uni-padding-wrap">
		    <e-picker  @change="change">选择日期</e-picker>
			<view><button @click="openPicker" type="primary">选择学校</button></view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
			<view class="uni-title">我是新闻列表</view>
		</view>
		
		<uni-load-more :status="loadStatus" iconType="circle" v-show="isLoadMore"></uni-load-more>
		<wyb-loading ref="loading"/>
		<!-- <level-linkage ref="levelLinkage" 
			:pickerValueDefault="pickerValueDefault" 
			:allData="treeData"
			@onConfirm="onConfirm" 
			themeColor='#007AFF'
		/> -->
		<level-linkage ref="levelLinkage"
			:pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm" 
			themeColor='#007AFF'
		/>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import ePicker from '@/components/e-picker/e-picker.vue'
	import levelLinkage from "@/components/three-level-linkage/linkage.nvue"
	import { getContact } from '../../utils/tool.js'
	export default {
		data() {
			return {
				visible:false,
				loadStatus:'',
				isLoadMore:false,
				showOnePicker:true,
				pickerValueDefault:[0,0,0],
				treeData:[
					{
						"id":"1",
						"name":"北京",
						"code":"11",
						"children":[
							{
								"id":"1230040276324601858",
								"name":"北京大学",
								"code":"10001",
								"children":[
									{
										"id":"1219144373145477122",
										"name":"风景园林",
										"code":"fengjingyuanlin"
									}
								]
							}
						]
					},
					{
						"id":"2",
						"name":"四川",
						"code":"12",
						"children":[
							{
								"id":"1230040276324601868",
								"name":"四川大学",
								"code":"50001",
								"children":[
									{
										"id":"1219144373145477158",
										"name":"望江公园",
										"code":"fengjingyuanlin"
									}
								]
							}
						]
					}
				]
			}
		},
		components:{
			ePicker,
			uniLoadMore,
			wybLoading,
			levelLinkage
		},
		methods: {
			change(val){
				console.log(val)
			},
			onConfirm(e) {
				console.log(e)
			},
			openPicker(){
				this.$refs.levelLinkage.open();
			}
		},
		mounted(){
			this.$refs.loading.showLoading();
			setTimeout(()=>{
				this.$refs.loading.hideLoading();
				this.showToast('报名成功')
			},800)
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('触底啦...')
			this.isLoadMore=true;
			this.loadStatus='loading';
			setTimeout( ()=> {
				this.loadStatus='noMore';
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		padding-bottom: 0;
		box-sizing: border-box;
		.picker-mask{
			position: fixed;
			left: 0;
			bottom: 0;
			top:0;
			right: 0;
			background: rgba(0,0,0,.6);
			z-index: 30;
			.picker-mask-wraper{
				width: 100%;
				height: 100%;
				position: relative;
				.picker-wrapers{
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 600rpx;
					z-index: 50;
					// background: #fff;
				}
			}
		}
	}
</style>
