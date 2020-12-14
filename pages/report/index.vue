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
		<view class="device-block">
			<view class="device-list">
				<view class="device-item">
					<view class="device-pic"><image :src="device.pic"></image></view>
					<view class="device-info">
						<view class="device-name">{{device.name}}</view>
						<view class="device-price">￥{{device.price}}</view>
					</view>
					<view class="device-num-block">
						<view class="add-btn" @click="addNum">+</view>
						<view class="device-num" v-show="device_nums>0">{{device_nums}}</view>
						<view class="reduce-btn" v-show="device_nums>0" @click="reduceNum">-</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-block"><button class="button" @click="submitOrder">提交订单</button></view>
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
				duration: 500,
				device:{
					name:"贩卖机&产品",
					price:"180",
					pic:"../../static/images/goods.png"
				},
				device_nums:0
			}
		},
		methods:{
			async getDatas(){
				const uid=uni.getStorageSync('uid');
				const token=uni.getStorageSync('token');
				let params={
					url:'/api/work/goodsInfo',
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
				
			},
			addNum(){
				this.device_nums++;
			},
			reduceNum(){
				this.device_nums--;
			},
			submitOrder(){
				if(!this.device_nums){
					this.showToast('请添加订单数量')
					return;
				}
				
				uni.navigateTo({
					url:'../orderInfo/index'
				})
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
		position: relative;
		.banners{
			.swiper{
				height: 416rpx;
				box-shadow: 0px 16rpx 28rpx rgba(111, 143, 234, 0.13);
				border-radius: 32rpx;
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
		.device-block{
			margin-top: 90rpx;
			.device-list{
				.device-item{
					background: #F9FAFC;
					border-radius: 32rpx;
					padding: 20rpx 22rpx;
					box-sizing: border-box;
					display: flex;
					.device-pic{
						width: 180rpx;
						height: 180rpx;
						border-radius: 32rpx;
						margin-right: 40rpx;
						overflow: hidden;
					}
					.device-info{
						height: 180rpx;
						flex: 1;
						.device-name{
							font-size: 32rpx;
							color: #2F2F51;
							line-height: 90rpx;
						}
						.device-price{
							font-size: 32rpx;
							color: #2F2F51;
							line-height: 90rpx;
						}
					}
					.device-num-block{
						width: 65rpx;
						.add-btn{
							color: #8EA7FD;
							font-size: 50rpx;
							text-align: center;
							height: 60rpx;
							line-height: 50rpx;
						}
						.reduce-btn{
							color: #8EA7FD;
							height: 60rpx;
							line-height: 60rpx;
							font-size: 50rpx;
							text-align: center;
						}
						.device-num{
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							text-align: center;
							line-height: 60rpx;
							background: #FFE5E6;
							color: #FF90B2;
							font-size: 28rpx;
						}
					}
				}
			}
		}
		.btn-block{
			position: absolute;
			width: 626rpx;
			height: 94rpx;
			left: 56rpx;
			bottom: 88rpx;
			.button{
				font-size: 38rpx;
			}
		}
	}
</style>
