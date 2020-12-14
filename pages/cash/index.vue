<template>
	<view class="cash-container">
		<view class="cash-header"></view>
		<view class="back-btn" @click="goback"><image src="../../static/images/left.png"></image></view>
		<view class="cash-content">
			<view class="cash-content-top">
				<text class="titles fl">千翻壹号</text>
				<view class="fr">
					<view class="circle"></view>
					<text class="tags">提现</text>
				</view>
				<view class="cl"></view>
			</view>
			
			<view class="content-bottom">
				<view class="down-icon"><image src="../../static/images/down.png"></image></view>
				<view class="form-block">
					<view class="cash-rows">
						<text class="rows-label">可用余额:</text>
						<input type="text" disabled v-model="balance" class="rows-input"/>
					</view>
					<view class="cash-rows">
						<text class="rows-label">申请款项:</text>
						<input type="number"  v-model="money" class="rows-input" placeholder="请输入提现金额"/>
						<text class="money">元</text>
					</view>
					<view class="cash-rows">
						<text class="rows-label">安全密码:</text>
						<input type="password" v-enter-number v-model="pwd" maxlength="6" class="rows-input" placeholder="请输入6位安全密码"/>
					</view>
					<view class="cash-rows card-rows">
						<text class="rows-label">提现至:</text>
						<input type="text"  v-model="seleBank" class="rows-input" placeholder="选择银行卡" disabled @click="openCardModal"/>
						<view class="seleIcon"><image src="../../static/images/san.png"></image></view>
					</view>
				</view>
				
				<view class="rule-block">
					<view class="rule-title">提现条款</view>
					<view class="rule-list">
						<view class="rule-item" v-for="(item,index) in rules" :key="index"><text>{{item}}</text></view>
					</view>
				</view>
				
				<view class="agree-block">
					 <checkbox-group @change="checkChange">
						<label>
							<checkbox value="1" :checked="limitAgree"/> 
							<text class="label-txt">同意并接受上述条款</text>
						</label>
					</checkbox-group>
				</view>
				
				<view class="btn-block">
					<button class="button" :disabled="isUse" @click="submit" :class="{active:limitAgree}">提 现</button>
				</view>
			</view>
		</view>
		<lb-picker ref="picker" :list="cardList" @confirm="confirm"></lb-picker>
		<wyb-loading ref="loading"/>
		<uni-transition :mode-class="modelClass" :show="showError" :styles="maskClass">
			<view class="erro-model">
				<view class="error-top">
					<view class="error-icon" @click="closeModal('showError')"><image src="../../static/images/icon_cose.png"></image></view>
				</view>
				<view class="error-content">
					<view class="error-title">出错了</view>
					<view class="error-pic"><image src="../../static/images/error.png"></image></view>
					<view class="error-txt">请先同意提现条款，再进行操作。</view>
				</view>
			</view>
		</uni-transition>
		<uni-transition :mode-class="modelClass" :show="showAddCard" :styles="maskClass">
			<view class="erro-model">
				<view class="error-top">
					<view class="error-icon" @click="closeModal('showAddCard')"><image src="../../static/images/icon_cose.png"></image></view>
				</view>
				<view class="error-content">
					<view class="error-title">出错了</view>
					<view class="error-txt card-txt">您未添加银行卡。请添加后重新提交</view>
					<button class="button" @click="goAdd">前往添加</button>
				</view>
			</view>
		</uni-transition>
		
		<uni-transition :mode-class="modelClass" :show="showSucc" :styles="maskClass">
			<view class="succ-model">
				<view class="succ-title">提交成功</view>
				<view class="succ-txt">你所提交的信息已经提交至后台进行申请，<br/>请耐心等待后台工作人员审核。</view>
			</view>
		</uni-transition>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	import { maskStyle }  from '../../utils/tool.js'
	export default{
		data(){
			return{
				balance:"",
				money:"",
				pwd:"",
				card_id:"",
				cardList:[],
				rules:["1.提现审核一般情况下3个工作日内进行审核处理",
				"2.如遇银行卡信息错误或其他预留可能会被拒绝提现",
				"3.如遇不可能抗拒因素导致无法进行审核将在恢复后 最快的时间内进行处理",
				"4.补充条例"],
				showError:false,
				showAddCard:false,
				maskClass: maskStyle,
				modelClass:['fade'],
				showSucc:false,
				isUse:false,
				port:"",
				limitAgree:false
			}
		},
		components:{
			LbPicker,
			wybLoading,
			uniTransition
		},
		computed:{
			seleBank(){
				const { card_id,cardList }=this;
				let bankName=""
				cardList.map(item=>{
					if(item.value==card_id){
						bankName=item.label
					}
				})
				return bankName
			}
		},
		methods:{
			goback(){
				uni.switchTab({
					url:'/pages/myInfo/index'
				})
			},
			async submit(){
				const { limitAgree,card_id,money,pwd,cardList}=this;
				const uid=uni.getStorageSync('uid')
				const token=uni.getStorageSync('token')
				
				if(!limitAgree){
					return
				}
				if(!money){
					this.showToast('请填写提现金额')
					return
				}else if(!pwd){
					this.showToast('请输入支付密码')
					return
				}else if(!card_id){
					if(!cardList.length){
						this.showAddCard=true;
						return
					}else{
						this.showToast('请选择银行卡')
						return
					}
					return
				}
				this.isUse=true;
				
				let params={
					url:'/api/user/Withdraw',
					data:{uid,token,card_id,money,pwd}
				}
				const result=await this.$http(params);
				
				if(result.data.code==200){
					this.showToast('提现成功');
					this.isUse=false
					this.card_id=""
					this.money=""
					this.pwd=""
					this.limitAgree=false
					this.refreshUser();
				}else{
					this.showToast(result.data.message)
					this.isUse=false
				}
			},
			async getBanks(){
				const uid=uni.getStorageSync('uid');
				const token=uni.getStorageSync('token');
				let params={
					url:'/api/user/UserBankList',
					data:{
						uid,
						token
					}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					let arr=result.data.data;
					this.$refs.loading.hideLoading();
					this.cardList=arr.map((item)=>{
						return {
							label:item.bank_name,
							value:item.bank_id
						}
					})
				}else{
					this.$refs.loading.hideLoading();
					this.showToast(result.data.message);
				}
			},
			confirm(picker){
				this.card_id=picker.value;
			},
			openCardModal(){
				this.$refs.picker.show() 
			},
			checkChange(e){
				if(e.target.value[0]){
					this.limitAgree=true
				}else{
					this.limitAgree=false
				}
			},
			closeModal(types){
				this[types]=false;
			},
			goAdd(){
				uni.navigateTo({
					url:'../addCard/index'
				})
			},
			judgeEnviron(){//判断环境
			    var u = navigator.userAgent;
			    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
			    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			    if (isAndroid) {
			        return 'android';
			    }else if (isIOS) {
			    　　return 'ios';
			    }else{
			        return 'pc';
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
		mounted(){
			this.$refs.loading.showLoading();
			this.getBanks()
		},
		created(){
			let env=this.judgeEnviron();
			if(env==='android'){
				this.port='1';
			}else if(env==='ios'){
				this.port='2';
			}
			this.balance=uni.getStorageSync('balance');
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/scss/common.scss';
	
	.cash-container{
		min-height: 100%;
		background: #EAEEFC;
		height: auto;
		position: relative;
		.erro-model{
			width: 616rpx;
			background: #F4F6FD;
			border-radius: 24rpx;
			padding: 30rpx 38rpx 64rpx 38rpx;
			box-sizing: border-box;
			.error-icon{
				width: 32rpx;
				height: 32rpx;
			}
			.error-title{
				text-align: center;
				color: #84A0FF;
				font-size: 36rpx;
			}
			.error-pic{
				width: 88rpx;
				height: 88rpx;
				margin: 22rpx auto;
			}
			.error-txt{
				text-align: center;
				color:#84A0FF;
				font-size: 24rpx;
			}
			.card-txt{
				margin: 40rpx 0;
				font-size: 28rpx;
			}
		}
		.succ-model{
			width: 616rpx;
			background: #84A0FF;
			border-radius: 24rpx;
			padding: 60rpx 0 56rpx 0;
			box-sizing: border-box;
			color: #fff;
			.succ-title{
				font-size: 36rpx;
				text-align: center;
				margin-bottom: 30rpx;
			}
			.succ-txt{
				font-size: 24rpx;
				line-height: 40rpx;
				text-align: center;
			}
		}
		.cash-header{
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
		.cash-content{
			width: 100%;
			background: url('../../static/images/card_bg.png') no-repeat;
			background-size: 100% 100%;
			position: absolute;
			top: 50rpx;
			left: 0;
			z-index: 10;
			padding-top: 320rpx;
			box-sizing: border-box;
			.cash-content-top{
				line-height: 100rpx;
				margin-bottom: 20rpx;
				height: 100rpx;
				padding: 0 60rpx;
				box-sizing: border-box;
				.titles{
					font-size: 60rpx;
					color: #2F2F51;	
				}
				.tags{
					font-size: 32rpx;
					color: #2F2F51;
				}
				.circle{
					width: 22rpx;
					height: 22rpx;
					border-radius: 50%;
					background: #FE5E8F;
					margin-right: 20rpx;
					display: inline-block;
					vertical-align: middle;
				}
			}
			.content-bottom{
				height: calc(100% - 120rpx);
				background: #EAEEFC;
				padding: 44rpx 68rpx 100rpx 68rpx;
				box-sizing: border-box;
				.down-icon{
					width: 30rpx;
					height: 18rpx;
					margin: 0 auto;
				}
				.form-block{
					margin-top: 52rpx;
					.cash-rows{
						display: flex;
						margin-bottom: 46rpx;
						.rows-label{
							width: 142rpx;
							font-size: 28rpx;
							color: #707070;
							line-height: 48rpx;
						}
						.rows-input{
							width: 380rpx;
							height: 48rpx;
							line-height: 48rpx;
							border-bottom: 1px solid #DEDEDE;
							box-sizing: border-box;
							color: #333;
						}
						.rows-input::-webkit-input-placeholder{
							color: #666;
							font-size: 28rpx;
						}
					}
					.card-rows{
						position: relative;
						.seleIcon{
							width: 18rpx;
							height: 16rpx;
							position: absolute;
							right: 100rpx;
							top:0;
						}
					}
				}
				
				.rule-block{
					padding: 38rpx 22rpx 50rpx 34rpx;
					box-sizing: border-box;
					border:1px solid #ccc;
					border-radius: 18rpx;
					.rule-title{
						font-size: 24rpx;
						color: #707070;
					}
					.rule-list{
						.rule-item{
							font-size: 24rpx;
							color: #707070;
							line-height: 44rpx;
						}
					}
				}
				
				.agree-block{
					margin-top: 36rpx;
					text-align: center;
					.label-txt{
						line-height: 32rpx;
						vertical-align: middle;
					}
				}
				
				.btn-block{
					margin-top: 86rpx;
					.button{
						background: #f7f7f7;
						color: rgba(0,0,0,.3);
					}
					.active{
						background: #8FA8FF;
						color: #fff;
					}
					uni-button:after{
						border: none;
					}
				}
			}
		}
	}
	@media screen and (min-height: $minH+px) {
		.cash-container{
			.cash-content{
				padding-top: 340rpx;
				.cash-content-top{
					line-height: 140rpx;
					height: 140rpx;
					.titles{
						font-size: 68rpx;		
					}
				}
				.content-bottom{
					height: calc(100% - 160rpx);
				}
			}
		}
	}
	
</style>
