<template>
	<view class="coupe-container">
		<view class="coupe-content">
			<textarea placeholder-style="color:#75758C" placeholder="请输入您的反馈内容" maxlength="300" 
			auto-height show-confirm-bar class="coupe-txt" v-model="info"/>
			<view class="btn-block">
				<button class="button" :disabled="isUse" @click="submits">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isUse:false,
				info:""
			}
		},
		methods:{
			async submits(){
				const { info } =this
				let token=uni.getStorageSync('token')
				let uid=uni.getStorageSync('uid')
				if(!info){
					this.showToast('请输入反馈内容')
					return false;
				}
				this.isUse=true
				let params={
					url:'/api/user/feedback',
					data:{uid,token,info}
				}
				
				const result=await this.$http(params)
				
				if(result.data.code===200){
					this.showToast('反馈成功')
					this.info=""
					this.isUse=false
				}else if(result.data.code===401){
					uni.navigateTo({
						url:'../login/index'
					})
				}else{
					this.showToast(result.data.message)
					this.isUse=false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupe-container{
		height: 100%;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		.coupe-txt{
			width: 100%;
			border: 1px solid #eaeaea;
			border-radius: 10rpx;
			min-height: 300rpx;
			padding: 10rpx;
			box-sizing: border-box;
			font-size: 26rpx;
			color: #2F2F51;
		}
		.btn-block{
			margin-top: 100rpx;
			.button{
				font-size: 38rpx;
			}
		}
	}
</style>
