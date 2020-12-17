<template>
	<view class="pay-container">
		<view class="pay-item first-item">
			<view class="pay-rows">
				<text class="rows-label fl">订单编号</text>
				<text class="rows-info fr">{{order.order_num}}</text>
				<view class="cl"></view>
			</view>
			<view class="pay-rows">
				<text class="rows-label fl">支付金额</text>
				<text class="rows-info fr">{{order.total_money}}元</text>
				<view class="cl"></view>
			</view>
			<view class="pay-rows last-rows">
				<text class="rows-label fl">账户余额</text>
				<text class="rows-info fr">{{banlance}}</text>
				<view class="cl"></view>
			</view>
		</view>
		<view class="pay-item">
			<view class="pay-rows last-rows">
				<text class="rows-label fl">安全密码</text>
				<input type="password" v-enter-number class="rows-input fr" 
				v-model="pwd" maxlength="6" placeholder="请输入密码"/>
				<view class="cl"></view>
			</view>
		</view>
		<view class="btn-block"><button class="button" @click="goPay" :disabled="isUse">提交订单</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				order:{},
				banlance:"",
				pwd:"",
				isUse:false
			}
		},
		created(){
			this.banlance=uni.getStorageSync('balance');
		},
		methods:{
			async goPay(){
				const { total_money,payTypes,order_id }=this.order
				const { balance,pwd }=this
				const uid=uni.getStorageSync('uid');
				const token=uni.getStorageSync('token');
				if(balance<total_money){
					this.showToast('您的余额不足');
					return false
				}else if(!pwd){
					this.showToast('请输入支付密码');
					return false
				}
				this.isUse=true
				let params={
					url:'/api/work/payorder',
					data:{uid,token,type:payTypes,order_id,pwd}
				}
				 const result=await this.$http(params)
				 
				 if(result.data.code===200){
					 this.isUse=false;
					 this.showToast('支付成功');
					 this.refreshUser();
					 setTimeout(()=>{
						 uni.navigateTo({
						 	url:'../report/index'
						 })
					 },1000)
				 }else{
					 this.showToast(result.data.message);
					 this.isUse=false;
				}
			},
			async refreshUser(){
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				const { port }=this;
				let params={
					url:'/api/user/UserRefresh',
					data:{port,app_version:'1.0',uid,token}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					this.balance=result.data.data.money;
					uni.setStorageSync('balance',result.data.data.money)
				}else{
					this.showToast(result.data.message);
				}
			}
		},
		onLoad(options){
			this.order=JSON.parse(options.orderInfo);
		}
	}
</script>

<style lang="scss" scoped>
	.pay-container{
		min-height: 100%;
		padding: 40rpx;
		position: relative;
		box-sizing: border-box;
		.pay-item{
			padding:32rpx 40rpx;
			box-sizing: border-box;
			background: #F9FAFC;
			border-radius: 32rpx;
			.pay-rows{
				margin-bottom: 52rpx;
				color: #333;
				font-size: 32rpx;
				.rows-input{
					width: 140rpx;
					font-size: 24rpx;
				}
			}
			.last-rows{
				margin-bottom: 0;
			}
		}
		.first-item{
			margin-bottom: 40rpx;
		}
		.btn-block{
			position: absolute;
			left:56rpx;
			width: 616rpx;
			bottom: 300rpx;
			.button{
				font-size: 38rpx;
			}
		}
	}
</style>
