<template>
	<view class="report-container">
		<view class="banners">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<view class="swiper-wraps">
						<view class="swiper-pic"><image :src="item.device_img"></image></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				swiperList:[],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods:{
			async getDatas(){
				const uid=uni.getStorageSync('uid');
				const token=uni.getStorageSync('appToken');
				let params={
					url:'/web/api/work/goodsInfo',
					data:{
						uid,
						token
					}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					this.swiperList=result.data.data.devecie_list;
				}else{
					this.showToast(result.data.message);
				}
				
			}
		},
		created(){
			this.getDatas()
		}
	}
</script>

<style lang="scss" scoped>
	.report-container{
		height: 100%;
		padding: 38rpx 30rpx 0 34rpx;
		box-sizing: border-box;
		.banners{
			.swiper{
				height: 416rpx;
				swiper-item {
					height: 416rpx;
					.swiper-wraps{
						height: 100%;
						overflow: hidden;
						border-radius: 32rpx;
						.swiper-pic{
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>
