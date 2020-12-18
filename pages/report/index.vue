<template>
	<view class="report-container">
		<view class="banners">
			<image :src="device.pic"></image>
		</view>
		<view class="device-block">
			<view class="device-list">
				<view class="device-item">
					<view class="device-pic"><image :src="device.pic"></image></view>
					<view class="device-info">
						<view class="device-name">{{device.cate_name}}</view>
						<view class="device-price">￥{{device.price}}</view>
					</view>
					<view class="device-num-block">
						<view class="add-btn" @click="addNum">+</view>
						<view class="device-num" v-show="num>0">{{num}}</view>
						<view class="reduce-btn" v-show="num>0" @click="reduceNum">-</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-block"><button class="button" @click="submitOrder" :disabled="isUse">提交订单</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				device:{},
				num:0,
				isUse:false,
				cate_id:""
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
					this.device=result.data.data;
					this.cate_id=result.data.data.dcata_id;
				}else{
					this.showToast(result.data.message);
				}
				
			},
			addNum(){
				this.num++;
			},
			reduceNum(){
				this.num--;
			},
			async submitOrder(){
				const { num,cate_id }=this
				let token=uni.getStorageSync('token')
				let uid=uni.getStorageSync('uid')
				
				if(!this.num){
					this.showToast('请添加订单数量')
					return;
				}
				
				let params={
					url:'/api/work/order',
					data:{uid,token,num,cate_id}
				}
				
				let result=await this.$http(params);
				if(result.data.code===200){
					this.showToast('下单成功')
					setTimeout(()=>{
						uni.navigateTo({
							url:`../orderInfo/index?order_id=${result.data.data.order_id}`
						})
					},1000)
				}
			},
			back(){
				uni.switchTab({
					url:'/pages/market/index'
				})
			}
		},
		created(){
			this.getDatas()
		},
		onBackPress() {
		    this.back();
		    return true;
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
			height: 416rpx;
			box-shadow: 0px 16rpx 28rpx rgba(111, 143, 234, 0.13);
			border-radius: 32rpx;
			width: 100%;
			overflow: hidden;
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
