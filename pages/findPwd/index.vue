<template>
	<view class="findPwd-container">
		<view class="form-section">
			<view class="logo-section"><image src="../../static/images/logo_login.png" mode=""></image></view>
			<view class="form-container">
				<view v-if="step==='one'">
					<view class="find-rows-block">
						<view class="row-label">账号绑定验证码</view>
						<view class="login-rows" :class="{activePhone:seleRows=='phone'}">
							<view class="row-icon phone-icon"></view>
							<input class="uni-input" type="number" placeholder="请输入11位手机号" v-model="phone" @focus="focusEnv('phone')"/>
						</view>
					</view>
					<button class="button" :disabled="isGetCode" @click="getCode('one')">获取短信验证码</button>
				</view>
				<view v-else-if="step==='two'">
					<view class="find-rows-block">
						<view class="row-label">验证码已发送至</view>
						<view class="login-rows send-rows">
							<input class="uni-input" type="number" placeholder="请输入11位手机号" v-model="phone" disabled/>
						</view>
					</view>
					<view class="find-rows-block">
						<view class="row-label">验证码</view>
						<view class="login-rows very-rows" :class="{activeCode:seleRows=='code'}">
							<view class="row-icon code-icon"></view>
							<input class="uni-input" type="number" placeholder="请输入验证码" v-model="code" @focus="focusEnv('code')"/>
							<button class="code-btn" @click="getCode('two')" :disabled="isGetCode">{{codeTxt}}</button>
						</view>
					</view>
					<button class="button" :disabled="isGetCode2" @click="subVerfy">提交验证</button>
					<view class="error-txt"><text>无法收到验证码?</text></view>
				</view>
				<view v-else-if="step==='three'">
					<view class="find-rows-block">
						<view class="row-label">手机号码</view>
						<view class="login-rows send-rows">
							<input class="uni-input" type="number" placeholder="请输入11位手机号" v-model="phone" disabled/>
						</view>
					</view>
					<view class="find-rows-block">
						<view class="row-label">密码</view>
						<view class="login-rows" :class="{activePwd:seleRows=='pwd1'}">
							<view class="row-icon pwd-icon"></view>
							<input class="uni-input" type="password" placeholder="请输入8 — 16位密码" v-model="pwd1" @focus="focusEnv('pwd1')"/>
						</view>
					</view>
					<view class="find-rows-block">
						<view class="row-label">确认密码</view>
						<view class="login-rows" :class="{activePwd2:seleRows=='pwd2'}">
							<view class="row-icon pwd2-icon"></view>
							<input class="uni-input" type="password" placeholder="请输入8 — 16位密码" v-model="pwd2" @focus="focusEnv('pwd2')"/>
						</view>
					</view>
					<button class="button" :disabled="isGetCode" @click="sureModify">确认修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { reg_phone,reg_pwd } from '../../utils/regexs.js'
	export default {
		data(){
			return{
				//界面渲染步骤
				step:"one",
				phone:"",
				seleRows:"",
				isGetCode:false,
				isGetCode2:false,
				code:"",
				pwd1:"",
				pwd2:"",
				codeTxt:"再次获取"
			}
		},
		methods:{
			focusEnv(type){
				this.seleRows=type;
			},
			async getCode(types){
				const { phone }=this;
				if(!phone){
					this.showToast("请输入手机号码");
					return;
				}else if(!reg_phone.test(phone)){
					this.showToast("手机号格式错误");
					return;
				}
				this.isGetCode=true;
				let params={
					url:'/web/api/other/SmsSend',
					data:{
						phone
					}
				}
				const result=await this.$http(params);
				if(result.data.code==200){
					if(types==='one'){
						this.isGetCode=false;
						this.step='two';
					}else{
						let sec=60
						let str=""
						let timer=setInterval(()=>{
							sec--
							str=sec+'s'
							if(sec<=0){
								sec=60;
								this.isGetCode=false;
								str="再次获取";
								clearInterval(timer);
							}
							this.codeTxt=str;
						},1000);
					}
				}else{
					this.isGetCode=false;
					this.showToast(result.data.message);
				}
				
				
			},
			async subVerfy(){
				const { code,phone }=this;
				this.isGetCode=false;
				if(!code){
					this.showToast("请输入验证码")
					return;
				}
				
				this.isGetCode2=true;
				let params={
					url:'/web/api/other/ProofCode',
					data:{
						phone,
						code
					}
				}
				const result=await this.$http(params);
				if(result.data.code==200){
					this.isGetCode2=false;
					this.step='three';
				}else{
					this.showToast(result.data.message);
					this.isGetCode2=false;
				}
				
			},
			async sureModify(){
				const { phone,pwd1,pwd2 }=this;
				if(!pwd1){
					this.showToast("请输入密码")
					return
				}else if(!reg_pwd.test(pwd1)){
					this.showToast("密码格式错误")
					return
				}else if(!pwd2){
					this.showToast("请再次输入密码")
					return
				}else if(!reg_pwd.test(pwd2)){
					this.showToast("密码格式错误")
					return
				}else if(pwd1!==pwd2){
					this.showToast("两次密码不一致")
					return
				}
				
				this.isGetCode=true;
				let params={
					url:"/web/api/user/UserSetPwd",
					data:{
						phone,
						pwd1,
						pwd2
					}
				}
				const result=await this.$http(params)
				if(result.data.code===200){
					this.isGetCode=false
					uni.navigateTo({
						url:'../findSucc/index'
					})
				}else{
					this.showToast(result.data.message);
					this.isGetCode=false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.findPwd-container{
		background-color: #fff;
		background-image: url("../../static/images/bg_login.png");
		background-repeat: no-repeat;
		background-size: contain;
		height: 100%;
		padding-top: 100rpx;
		box-sizing: border-box;
		.form-section{
			background: rgba(246,247,253,.6);
			box-shadow: 0 0 20px 15px #f3f5fc;
			width: 620rpx;
			padding: 60rpx 60rpx 96rpx 60rpx;
			box-sizing: border-box;
			margin:0 auto;
			border-radius: 40rpx;
			.logo-section{
				width: 142rpx;
				height: 174rpx;
				margin: 0 auto;
			}
			.form-container{
				.find-rows-block{
					margin-bottom: 40rpx;
					.row-label{
						font-size: 24rpx;
						color: #1F1F39;
					}
					.login-rows{
						margin-top: 36rpx;
						border-bottom: 1px solid #fff;
						padding-bottom:32rpx;
						display: flex;
						.row-icon{
							margin-right: 48rpx;
							width:48rpx;
							height: 48rpx;
						}
						.phone-icon{
							background: url('../../static/images/ic_phone.png') no-repeat;
							background-size: 100% 100%;
						}
						.pwd-icon{
							background: url('../../static/images/ic_pwd.png') no-repeat;
							background-size: 100% 100%;
						}
						.pwd2-icon{
							background: url('../../static/images/ic_pwd.png') no-repeat;
							background-size: 100% 100%;
						}
						.code-icon{
							background: url('../../static/images/ic_phone.png') no-repeat;
							background-size: 100% 100%;
						}
						.uni-input{
							flex: 1;
							font-size: 26rpx;
							height: 48rpx;
							line-height: 48rpx;
						}
					}
					.send-rows{
						border-bottom: none;
						font-size: 30rpx;
						color: #333;
					}
					.activePhone{
						border-bottom: 1px solid #8FA8FF;
						.phone-icon{
							background: url('../../static/images/ic_phone_sel.png') no-repeat;
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
					.activePwd2{
						border-bottom: 1px solid #8FA8FF;
						.pwd2-icon{
							background: url('../../static/images/ic_pwd_sel.png') no-repeat;
							background-size: 100% 100%;
						}
					}
					.activeCode{
						border-bottom: 1px solid #8FA8FF;
						.code-icon{
							background: url('../../static/images/ic_phone_sel.png') no-repeat;
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
						.code-btn:after{
							border:none;
						}
					}
				}
				.error-txt{
					text-align: right;
					margin-top: 40rpx;
					color: #4C5D77;
				}
			}
		}
	}
</style>
