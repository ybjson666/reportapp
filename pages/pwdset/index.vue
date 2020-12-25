<template>
	<view class="pwd-container">
		<view class="pwd-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="pwd-content">
			<view class="form-block">
				<view class="pwd-rows">
					<text class="rows-label">安全码设置：</text>
					<input type="password" v-model="pwd" class="rows-input"  maxlength="6" />
				</view>
				<view class="pwd-rows">
					<text class="rows-label">安全码确认：</text>
					<input type="password" class="rows-input" v-model="pwd2" maxlength="6" />
				</view>
				<view class="pwd-rows code-rows">
					<text class="rows-label">绑定手机动态验证码：</text>
					<input type="number" class="code-input" v-model="code" maxlength="6"/>
					<button class="code-btn" :disabled="isUse" @click="getCode">{{codeTxt}}</button>
				</view>
			</view>
			<view class="btn-block">
				<button class="button" @click="save" :disabled="isSave">保&nbsp;&nbsp;&nbsp;&nbsp;存</button>
			</view>
		</view>
	</view>
</template>

<script>

	export default{
		data(){
			return{
				pwd:"",
				pwd2:"",
				code:"",
				codeTxt:"获取验证码",
				isUse:false,
				isSave:false
			}
		},
		methods:{
			goback(){
				uni.navigateBack()
			},
			async getCode(){
				let phone =uni.getStorageSync('phone');
				this.isUse=true;
				let params={
					url:'/api/other/SmsSend',
					data:{
						phone
					}
				}
				const result=await this.$http(params);
				if(result.data.code==200){
					let sec=60
					let str=""
					let timer=setInterval(()=>{
						sec--
						str=sec+'s'
						if(sec<=0){
							sec=60;
							this.isUse=false;
							str="再次获取";
							clearInterval(timer);
						}
						this.codeTxt=str;
					},1000);
				}else{
					this.isUse=false;
					this.showToast(result.data.message);
				}
			},
			async save(){
				let uid =uni.getStorageSync('uid');
				let token =uni.getStorageSync('token');
				const { pwd,pwd2,code } =this
				
				if(!pwd){
					this.showToast("请输入密码")
					return
				}else if(!pwd2){
					this.showToast("请再次输入密码")
					return
				}else if(pwd!==pwd2){
					this.showToast("两次的密码不一致")
					return
				}else if(!code){
					this.showToast("请填写验证码")
					return
				}
				
				this.isSave=true;
				
				let params={
					url:"/api/user/UserPayPwd",
					data:{uid,token,pwd,pwd2,code}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.showToast("设置成功")
					this.isSave=false;
					setTimeout(()=>{
						uni.navigateBack()
					},800)
				}else{
					this.showToast(result.data.message);
					this.isSave=false;
				}
			}
		},
		watch:{
			pwd2(str){
				this.$nextTick(()=>{
					this.pwd2=str.replace(/[^\d]/g,'')
				})
			},
			pwd(str){
				this.$nextTick(()=>{
					this.pwd=str.replace(/[^\d]/g,'')
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	
	.pwd-container{
		height: 100%;
		position: relative;
		background: #EAEEFC;
		.pwd-header{
			height: 360rpx;
			background: #eaeefc;
		}
		.back-btn{
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			left: 20rpx;
			top:80rpx;
			z-index: 50;
		}
		.pwd-content{
			height: calc(100% - 50rpx);
			width: 100%;
			background: url('../../static/images/card_bg.png') no-repeat;
			background-position:0px 20rpx;
			background-size: 100% 100%;
			position: absolute;
			top: 50rpx;
			left: 0;
			z-index: 10;
			padding: 0 60rpx;
			padding-top: 350rpx;
			box-sizing: border-box;
			.form-block{
				margin-bottom: 160rpx;
				.pwd-rows{
					display: flex;
					margin-bottom: 40rpx;
					.rows-label{
						width: 300rpx;
						font-size: 28rpx;
						color: #707070;
					}
					.rows-input{
						flex: 1;
						border-bottom: 1px solid #eaeaea;
					}
					.code-input{
						width: 180rpx;
						border-bottom: 1px solid #eaeaea;
					}
					.code-btn{
						position: absolute;
						font-size: 24rpx;
						color: #707070;
						width: 166rpx;
						height: 60rpx;
						line-height: 60rpx;
						border-radius: 10rpx;
						right: 0;
						top:0;
						line-height: 60rpx;
						padding: 0 !important;
					}
				}
				.code-rows{
					position: relative;
				}
			}
			.button{
				font-size: 38rpx;
			}
		}
	}
</style>
