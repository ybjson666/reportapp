<template>
	<view class="login-container" id="container">
		<view class="tip"><image src="../../static/images/tip.png"></image></view>
		<view class="login-section">
			<view class="logo-section"><image src="../../static/images/logo_login.png" mode=""></image></view>
			<view class="login-form-section">
				<view class="login-rows-block">
					<view class="row-label">账号</view>
					<view class="login-rows" :class="{activeAccount:seleRows=='account'}">
						<view class="row-icon acc-icon"></view>
						<input class="uni-input" type="number" placeholder="请输入账号" v-model="phone" @focus="focusEnv('account')"/>
					</view>
				</view>
			<!-- 	<view class="login-rows-block">
					<view class="row-label">密码</view>
					<view class="login-rows" :class="{activePwd:seleRows=='pwd'}">
						<view class="row-icon pwd-icon"></view>
						<input class="uni-input" type="password" placeholder="请输入密码" v-model="pwd" @focus="focusEnv('pwd')"/>
					</view>
				</view> -->
				<view class="login-rows-block">
					<view class="row-label">验证码</view>
					<view class="login-rows very-rows" :class="{activeCode:seleRows=='code'}">
						<view class="row-icon code-icon"></view>
						<input class="uni-input" type="number" placeholder="请输入验证码" v-model="code" @focus="focusEnv('code')"/>
						<button class="code-btn" :disabled="isUse" @click="getCode">{{codeTxt}}</button>
					</view>
				</view>
				<button class="login-btn button" @click="login" :disabled="isLogin">登陆</button>
				<!-- <view class="forget-rows"><text @click="goFindPwd">忘记密码?</text></view> -->
			</view>
		</view>
		
		<view class="wx-login-block" @click="wxLogin">
			<view class="wx-logo"><image src="../../static/images/ic_wx.png"></image></view>
			<view class="wx-txt">授权登陆</view>
		</view>
	</view>
</template>

<script>
	import { reg_phone } from '../../utils/regexs.js'
	export default{
		data(){
			return{
				phone:"",
				code:"",
				seleRows:"",
				isFail:false,
				isLogin:false,
				codeTxt:"获取验证码",
				isUse:false
			}
		},
		methods:{
			focusEnv(type){
				this.seleRows=type;
			},
			async getCode(){
				const { phone }=this;
				if(!phone){
					this.showToast('请输入手机号')
					return false;
				}else if(!reg_phone.test(phone)){
					this.showToast('手机号格式错误')
					return false;
				}
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
					this.showToast('发送成功')
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
			async login(){
				const {phone,code}=this;
				if(!phone){
					this.showToast("请输入账号");
					return;
				}else if(!code){
					this.showToast("请输入验证码");
					return;
				}
				this.isLogin=true;
				let params={
					url:'/api/user/UserLogin',
					data:{
						phone,
						code
					}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.isLogin=false;
					this.showToast('登陆成功');
					uni.setStorageSync('token', result.data.data.token);
					uni.setStorageSync('uid', result.data.data.user_id);
					uni.setStorageSync('phone', result.data.data.phone);
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/home/index'
						})
					},1500)
				}else{
					this.showToast(result.data.message);
					this.isLogin=false;
				}
			},
			wxLogin(){
				uni.getProvider({
				    service: 'oauth',
				    success: (res)=> {
				        //支持微信、qq和微博等
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
				              provider: 'weixin',
				              success: (loginRes)=> {
				  				console.log(loginRes)
				              },
				              fail:(res)=>{
				              	console.log("App微信获取用户信息失败",res);
				              }
				
				            })
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/common/common.scss';
	
	.login-container{
		background-color: #fff;
		background-image: url("../../static/images/bg_login.png");
		background-repeat: no-repeat;
		background-size: contain;
		min-height: 100%;
		padding-top: 160rpx;
		box-sizing: border-box;
		position: relative;
		.tip{
			width: 252rpx;
			height: 82rpx;
			position: absolute;
			left: 50%;
			margin-left: -126rpx;
			top:80rpx;
		}
		.login-section{
			background: rgba(246,247,253,.6);
			box-shadow: 0 0 20px 15px #f3f5fc;
			width: 620rpx;
			padding: 60rpx 60rpx 96rpx 60rpx;
			box-sizing: border-box;
			margin:0 auto;
			border-radius: 40rpx;
			background-size: 100% 100%;
			.logo-section{
				width: 142rpx;
				height: 174rpx;
				margin: 0 auto;
			}
			.login-form-section{
				.login-rows-block{
					margin-bottom: 40rpx;
					.row-label{
						font-size: 24rpx;
						color: #1F1F39;
					}
					.login-rows{
						margin-top: 20rpx;
						border-bottom: 1px solid #fff;
						padding-bottom:32rpx;
						display: flex;
						.row-icon{
							margin-right: 48rpx;
							width:48rpx;
							height: 48rpx;
						}
						.acc-icon{
							background: url('../../static/images/ic_acc.png') no-repeat;
							background-size: 100% 100%;
						}
						.pwd-icon{
							background: url('../../static/images/ic_pwd.png') no-repeat;
							background-size: 100% 100%;
						}
						.code-icon{
							background: url('../../static/images/ic_code.png') no-repeat;
							background-size: 100% 100%;
						}
						.uni-input{
							flex: 1;
							font-size: 26rpx;
							height: 48rpx;
							line-height: 48rpx;
						}
					}
					.activeAccount{
						border-bottom: 1px solid #8FA8FF;
						.acc-icon{
							background: url('../../static/images/ic_acc_sel.png') no-repeat;
							background-size: 100% 100%;
						}
					}
					.activePwd{
						border-bottom: 1px solid #8FA8FF;
						.pwd-icon{
							background: url('../../static/images/ic_pwd_sel.png') no-repeat;
							background-size: 100% 100%;
						}
					}
					.activeCode{
						border-bottom: 1px solid #8FA8FF;
						.code-icon{
							background: url('../../static/images/ic_code_sel.png') no-repeat;
							background-size: 100% 100%;
						}
					}
					.very-rows{
						position: relative;
						.code-btn{
							position: absolute;
							right: 0;
							width: 160rpx;
							height: 80rpx;
							text-align: center;
							line-height: 80rpx;
							border-radius: 14rpx;
							background: #ffe5e6;
							color: #ff94b4;
							top:-20rpx;
							font-size: 20rpx;
						}
					}
				}
				.login-btn{
					margin-top: 60rpx;
				}
				uni-button:after{
					border: none;
				}
				.forget-rows{
					text-align: right;
					margin-top: 40rpx;
					font-size: 24rpx;
					color: #666;
				}
			}
		}
		
		.wx-login-block{
			width: 150rpx;
			margin: 0 auto;
			margin-top: 160rpx;
			.wx-logo{
				width: 68rpx;
				height: 68rpx;
				margin: 0 auto;
				margin-bottom: 24rpx;
			}
			.wx-txt{
				text-align: center;
				color: #666;
			}
			
		}
	}
	
	@media screen and (min-height: $screenH+'px') {
		
		.login-container{
			padding-top: 240rpx;
			padding-bottom: 0;
			.tip{
				top:170rpx;
			}
			.wx-login-block{
				margin-top: 160rpx;
			}
		}
	}
</style>
