<template>
	<view class="card-container">
		<view class="card-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="card-content">
			<view class="card-block">
				<view class="card-rows">
					<text class="rows-label">银行卡所属行：</text>
					<input type="text" class="rows-input" v-model="seleBank" disabled @click="openCardModal"
					placeholder="选择银行卡"/>
				</view>
				<view class="card-rows">
					<text class="rows-label">请输入银行卡号：</text>
					<input type="number" class="rows-input" v-model="back_num" 
					@focus="focusEnv('back_num')" :class="{active:focusTxt==='back_num'}"/>
				</view>
				<view class="card-rows">
					<text class="rows-label">请输入持卡人姓名：</text>
					<input type="text" class="rows-input" v-model="name" 
					@focus="focusEnv('name')" :class="{active:focusTxt==='name'}"/>
				</view>
				<view class="card-rows">
					<text class="rows-label">开户行：</text>
					<input type="text" class="rows-input" v-model="address" 
					@focus="focusEnv('address')" :class="{active:focusTxt==='address'}"/>
				</view>
				<view class="card-rows code-rows">
					<text class="rows-label">绑定手机动态验证码：</text>
					<input type="number" class="rows-input" v-model="code" 
					@focus="focusEnv('code')" :class="{active:focusTxt==='code'}" maxlength="6"/>
					<button class="code-btn" :disabled="isUse" @click="getCode">{{codeTxt}}</button>
				</view>
				<view class="btn-rows">
					<button class="button" @click="save" :disabled="isSave">保  存</button>
				</view>
			</view>
		</view>
		<lb-picker ref="picker" :list="cardList" @confirm="confirm"></lb-picker>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import { reg_card } from '../../utils/regexs.js'
	export default{
		data(){
			return{
				cardList:[],
				bank_id:"",
				back_num:"",
				name:"",
				address:"",
				code:"",
				codeTxt:"获取验证码",
				isUse:false,
				focusTxt:"",
				isSave:false
			}
		},
		components:{
			LbPicker
		},
		computed:{
			seleBank(){
				const { bank_id,cardList }=this;
				let bankName=""
				cardList.map(item=>{
					if(item.value==bank_id){
						bankName=item.label
					}
				})
				return bankName
			}
		},
		methods:{
			goback(){
				uni.navigateBack()
			},
			async getBanks(){
				let params={
					url:'/api/other/banklist'
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					let arr=result.data.data;
					this.cardList=arr.map((item)=>{
						return {
							label:item.bank_name,
							value:item.bank_id
						}
					})
				}else{
					this.showToast(result.data.message);
				}
			},
			confirm(picker){
				this.bank_id=picker.value;
			},
			openCardModal(){
				this.$refs.picker.show() 
			},
			focusEnv(txt){
				this.focusTxt=txt;
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
				const { bank_id,back_num,name,address,code } =this
				
				if(!bank_id){
					this.showToast("请选择银行卡")
					return
				}else if(!back_num){
					this.showToast("请填写银行卡卡号")
					return
				}else if(!reg_card.test(back_num)){
					this.showToast("请填写正确的银行卡")
					return
				}else if(!name){
					this.showToast("请填写持卡人姓名")
					return
				}else if(!address){
					this.showToast("请填写开户行")
					return
				}else if(!code){
					this.showToast("请填写验证码")
					return
				}
				
				this.isSave=true;
				
				let params={
					url:"/api/user/BindBankCard",
					data:{token,uid,bank_id,back_num,name,address,code}
				}
				
				const result=await this.$http(params);
				if(result.data.code===200){
					this.showToast("添加成功")
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
		created(){
			this.getBanks()
		}
	}
</script>

<style lang="scss" scoped>
	.card-container{
		height: 100%;
		position: relative;
		background: #EAEEFC;
		.card-header{
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
		.card-content{
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
			.card-block{
				.card-rows{
					display: flex;
					margin-bottom: 46rpx;
					.rows-label{
						color: #707070;
						font-size: 28rpx;
						width: 300rpx;
					}
					.rows-input{
						flex: 1;
						border-bottom: 1px solid #eaeaea;
						color: #333;
						font-size: 28rpx;
					}
					.active{
						border-bottom: 1px solid #8FA8FF;
					}
				}
				.code-rows{
					margin-bottom: 0;
					position: relative;
					.code-btn{
						position: absolute;
						width: 166rpx;
						font-size: 24rpx;
						height: 60rpx;
						right: 0;
						top:0;
						line-height: 60rpx;
						padding: 0 !important;
					}
				}
				.btn-rows{
					margin-top: 180rpx;
					.button{
						font-size: 38rpx;
					}
				}
			}	
		}
	}
	// @media screen and (min-height: $minH+px) {
	// 	.card-container{
	// 		.card-content{
	// 			padding-top: 350rpx;
	// 		}
	// 	}
	// }
</style>
