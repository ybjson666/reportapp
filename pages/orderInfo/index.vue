<template>
	<view class="order-container" :class="{noScorll:showPay}">
		<view class="banners">
			<text class="goods-name">{{orderInfo.device_name}}</text>
			<view class="goods-pic"><image :src="orderInfo.device_pic"></image></view>
		</view>
		<view class="order-infos">
			<view class="user-block">
				<view class="user-pic"><image :src="orderInfo.head_pic"></image></view>
				<text class="user-nick">{{orderInfo.nickname}}</text>
			</view>
			<view class="device-name-rows"><text>{{orderInfo.device_name}}</text></view>
			<view class="device-rows">
				<text class="rows-label fl">数量</text>
				<text class="rows-val fr">x{{orderInfo.num}}</text>
				<view class="cl"></view>
			</view>
			<view class="device-rows">
				<text class="rows-label fl">订单价格</text>
				<text class="rows-val fr">{{orderInfo.total_money}}元</text>
				<view class="cl"></view>
			</view>
			<view class="device-rows last-rows">
				<text class="rows-label fl">下单时间</text>
				<text class="rows-val fr">{{fTime(orderInfo.addtime)}}</text>
				<view class="cl"></view>
			</view>
		</view>
		<view class="pay-block">
			<text class="pay-label fl">选择支付方式</text>
			<view class="pay-infos fr" @click="choosePay">
				<text>{{payMetName}}</text>
				<view class="pay-icon"><image src="../../static/images/right.png"></image></view>
			</view>
			<view class="cl"></view>
		</view>
		<view class="btn-block"><button class="button" @click="goPay" :disabled="isUse">确认订单，前往支付</button></view>
		<uni-transition :mode-class="modelClass" :show="showPay" :styles="maskClass" 
		:duration="durations">
			<view class="modal-wraps" @click="closeModal('mask')">
				<view class="pay-container" @click.stop="closeModal('other')">
					<view class="pay-header"><view class="pay-rect"></view></view>
					<view class="payList">
						<view class="pay-item" v-for="(item,index) in payList" 
						:key="index" @click="selePay(item,index)" :class="{active:curIndex===index}">
							<text class="pay-name fl">{{item.name}}</text>
							<view class="pay-icon fr" v-show="curIndex===index"><image src="../../static/images/gou.png"></image></view>
							<view class="cl"></view>
						</view>
					</view>
				</view>
			</view>
		</uni-transition>
		<!-- <wyb-loading ref="loading"/> -->
	</view>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	import { maskStyle,formatTimeStr }  from '../../utils/tool.js'
	// import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default{
		data(){
			return{
				payMetName:'支付宝',
				payTypes:'1',
				payList:[
					{
						name:'支付宝',
						types:'1'
					},
					{
						name:'微信',
						types:'2'
					},
					{
						name:'账户余额',
						types:'3'
					}
				],
				maskClass: maskStyle,
				modelClass:['fade'],
				showPay:false,
				durations:100,
				curIndex:null,
				orderInfo:{},
				order_id:"",
				isUse:false,
				payorder:{}
			}
		},
		components:{
			uniTransition,
			// wybLoading
		},
		onLoad(options){
			this.order_id=options.order_id;
		},
		methods:{
			choosePay(){
				this.showPay=true;
			},
			selePay(item,index){
				this.curIndex=index;
				this.payMetName=item.name;
				this.payTypes=item.types;
				this.showPay=false;
			},
			closeModal(type){
				if(type==='mask'){
					this.showPay=false;
				}
			},
			goPay(){
				const { payTypes,orderInfo }=this;
				
				if(payTypes==='3'){
					const {order_num,total_money,order_id,addtime}=orderInfo;
					const payOrder={order_num,total_money,order_id,payTypes,addtime};
					uni.navigateTo({
						url:`../pay/index?orderInfo=${JSON.stringify(payOrder)}`
					})
				}else{
					this.getPayData();
				}
			},
			fTime(str){
				return formatTimeStr(str)
			},
			async getPayData(){
				const { payTypes,order_id }=this;
				const uid=uni.getStorageSync('uid');
				const token=uni.getStorageSync('token');
				let params={
					url:'/api/work/payorder',
					data:{uid,token,type:payTypes,order_id}
				}
				this.isUse=true;
				 const result=await this.$http(params);
				 if(result.data.code===200){
					 if(payTypes==='1'){
						this.payorder=result.data.data.alipay;
					 }
					 this.pay();
				 }else{
					 this.showToast(result.data.message);
					 this.isUse=false;
				 }
				
			},
			pay(){
				const {payTypes,payorder,orderInfo}=this;
				uni.requestPayment({
				    provider: payTypes=='2'?'wxpay':'alipay',
				    orderInfo: payorder, //微信、支付宝订单数据
				    success: (res) =>{
						this.isUse=false
				        setTimeout(()=>{
							uni.navigateTo({
								url:`../paySucc/index?addtime=${orderInfo.addtime}`
							})
						},500)
				    },
				    fail:(err)=> {
						this.isUse=false
				        setTimeout(()=>{
				        	uni.navigateTo({
				        		url:`../payFail/index?payTypes=${payTypes}&order_id=${orderInfo.order_id}`
				        	})
				        },500)
				    }
				});
			},
			async getOrderInfo(){
				const { order_id }=this
				let token=uni.getStorageSync('token')
				let uid=uni.getStorageSync('uid')
				let params={
					url:'/api/work/orderinfo',
					data:{uid,token,order_id}
				}
				
				let result=await this.$http(params);
				if(result.data.code===200){
					this.orderInfo=result.data.data;
					// this.$refs.loading.hideLoading();
				}else{
					// this.$refs.loading.hideLoading();
					this.showToast(result.data.message);
				}
			}
		},
		created(){
			// this.$refs.loading.showLoading();
			this.getOrderInfo()
		}
	}
</script>

<style lang="scss" scoped>
	.order-container{
		min-height: 100%;
		padding: 38rpx 40rpx 60rpx 40rpx;
		box-sizing: border-box;
		.banners{
			height: 416rpx;
			background: url('../../static/images/goods_bg.png') no-repeat;
			background-size: cover;
			box-shadow: 0px 16rpx 28rpx rgba(111, 143, 234, 0.13);
			border-radius: 32rpx;
			width: 100%;
			overflow: hidden;
			position: relative;
			.goods-name{
				position: absolute;
				left: 50rpx;
				bottom: 50rpx;
				color: #2F2F51;
				font-size: 28rpx;
			}
			.goods-pic{
				position: absolute;
				width: 200rpx;
				height: 240rpx;
				right: 50rpx;
				bottom: 60rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}
		}
		.order-infos{
			margin-top: 40rpx;
			padding: 44rpx 40rpx 48rpx 32rpx;
			box-sizing: border-box;
			background: #F9FAFC;
			border-radius: 32px;
			.user-block{
				display: flex;
				margin-bottom: 44rpx;
				.user-pic{
					width: 44rpx;
					height: 44rpx;
					margin-right: 18rpx;
					border-radius: 8rpx;
					overflow: hidden;
				}
				.user-nick{
					font-size: 28rpx;
					color: #333;
					line-height: 44rpx;
				}
			}
			.device-name-rows{
				font-size: 32rpx;
				line-height: 44rpx;
				color: #2F2F51;
				margin-bottom: 52rpx;
			}
			.device-rows{
				margin-bottom: 64rpx;
				color: #2F2F51;
				font-size: 32rpx;
			}
			.last-rows{
				margin-bottom: 0;
			}
		}
		.pay-block{
			margin-top: 40rpx;
			padding: 26rpx 32rpx;
			box-sizing: border-box;
			background: #F9FAFC;
			border-radius: 32px;
			color: #2F2F51;
			font-size: 32rpx;
			.pay-infos{
				text{
					vertical-align: middle;
				}
				.pay-icon{
					width: 48rpx;
					height: 48rpx;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		.btn-block{
			margin-top: 130rpx;
			.button{
				font-size: 38rpx;
			}
		}
		.modal-wraps{
			width: 100%;
			height: 100%;
			position: relative;
			.pay-container{
				background: #fff;
				position: absolute;
				width: 100%;
				left: 0;
				bottom: 0;
				border-radius: 40rpx 40rpx 0 0;
				height: 540rpx;
				.pay-header{
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					.pay-rect{
						width: 76rpx;
						height: 12rpx;
						display: inline-block;
						background: #8A96AD;
						border-radius: 10rpx;
					}
				}
				.payList{
					padding: 32rpx;
					padding-bottom: 0;
					box-sizing: border-box;
					.pay-item{
						margin-bottom: 32rpx;
						height: 90rpx;
						.pay-name{
							font-size: 32rpx;
							color: #2F2F51;
							line-height: 90rpx;
							margin-left: 26rpx;
						}
						.pay-icon{
							width: 36rpx;
							height: 28rpx;
							margin-right: 32rpx;
							margin-top: 30rpx;
						}
					}
					.active{
						background: #8FA8FF;
						border-radius: 28rpx;
						.pay-name{
							color: #6F8FEA;
						}
					}
				}
			}
		}
	}
	.noScorll{
		height: 100%;
		overflow: hidden;
	}
</style>
