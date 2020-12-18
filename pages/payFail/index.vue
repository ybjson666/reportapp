<template>
	<view class="payFail-container">
		<view class="status-block">
			<view class="fail-icon"><image src="../../static/images/fail_icon.png"></image></view>
			<view class="fail-txt">支付失败</view>
			<view class="again">支付失败了，再试一次吧</view>
		</view>
		<view class="btn-block">
			<button class="button" :disabled="isUse" @click="getPayData">重新支付</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				orderInfo:{},
				isUse:false,
				payTypes:"",
				order_id:"",
				payOrder:{}
			}
		},
		methods:{
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
					 if(payTypes=='1'){
						this.payorder=result.data.data.alipay;
					 }
					 this.pay();
				 }else{
					 this.showToast(result.data.message);
					 this.isUse=false;
				 }
				
			},
			pay(){
				const {payTypes,payOrder,orderInfo}=this;
				this.isUse=true;
				uni.requestPayment({
				    provider: payTypes=='2'?'wxpay':'alipay',
				    orderInfo: payOrder, //微信、支付宝订单数据
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
			}
		},
		onLoad(options){
			this.payTypes=options.payTypes;
			this.order_id=options.order_id;
		}
	}
</script>

<style lang="scss" scoped>
	.payFail-container{
		height: 100%;
		padding-top:76rpx;
		box-sizing: border-box;
		.status-block{
			.fail-icon{
				width: 108rpx;
				height: 108rpx;
				margin: 0 auto;
			}
			.fail-txt{
				margin: 40rpx 0 8rpx 0;
				font-size: 36rpx;
				color: #333;
				text-align: center;
			}
			.again{
				color: #999;
				font-size: 16rpx;
				text-align: center;
			}
		}
		.btn-block{
			width: 494rpx;
			margin: 0 auto;
			margin-top: 74rpx;
			.button{
				font-size: 28rpx;
			}
		}
	}
</style>
