<template>
	<view class="share-container">
		<!-- <view class="share-header">
			<view class="share-code-block">
				<input type="text" v-model="share_code" disabled class="share-input">
				<view class="copy-btn">复制</view>
			</view>
		</view> -->
		<view class="share-content-block">
			<view class="qrcode">
				<view class="qrcode-wraps">
					<tki-qrcode
					    ref="qrcode"
					    :val="shareUrl"
						:loadMake="loadMake"
						:showLoading="showLoading"
						@result="getResult"
					   />
				</view>
				 <text>扫描二维码关注我吧</text>
			</view>
		</view>
		<view class="btn-block">
			<button class="save-btn" @click="savePic" :disabled="isSave">保存图片</button>
			<button class="copy-btn" :disabled="isCopy" @click="copyUrl">复制链接</button>
		</view>
		<mosowe-canvas-image ref="mosoweCanvasImageRef" :lists="picList" 
		 width="200" height="300" @canvasImage="canvasImage" imgType="png"/>
			
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import mosoweCanvasImage from "@/components/mosowe-canvas-image/mosowe-canvas-image.vue"
	export default{
		data(){
			return{
				share_code:"",
				shareUrl:"",
				loadMake:true,
				isSave:false,
				isCopy:false,
				showLoading:false,
				picList:[
					{
						type: 'image',
						content: '../../static/images/share_bg.png', 
						width: 200, 
						height: 300, 
						x: 0, 
						y: 0, 
					},
					{
						type: 'image',
						content: '', 
						width: 55, 
						height: 55, 
						x: 30, 
						y: 180, 
					},
					 {
						type: 'text',
						content: '扫描二维码关注我吧', 
						x: 30, 
						y: 245, 
						color: '#75758C', 
						size: 6, 
					}
					 
				]
			}
		},
		components:{
			tkiQrcode,
			mosoweCanvasImage
		},
		methods:{
			async getShareParams(callBack){
				let token=uni.getStorageSync('token')
				let uid=uni.getStorageSync('uid')
				let params={
					url:'/api/user/UserShare',
					data:{token,uid}
				}
				const result=await this.$http(params);
				if(result.data.code===200){
					this.shareUrl=`http://${result.data.data.referee_url}`;
					this.share_code=result.data.data.share_code;
					callBack&&callBack()
				}else if(result.data.code===401){
					this.showToast(result.data.message);
					setTimeout(()=>{
						uni.reLaunch({
							url:'../login/index'
						})
					},800)
				}else{
					this.showToast(result.data.message)
				}
			},
			savePic(){
				this.$refs.mosoweCanvasImageRef.createCanvas();
				this.isSave=true;
			},
			canvasImage(e){
				this.savePicToLocal(e)
			},
			getResult(res){
				this.picList[1].content=res;
			},
			copyUrl(){
				const { shareUrl }=this
				uni.setClipboardData({
					data:shareUrl,
					success:res=>{
					  uni.showToast({
							title:'复制成功',
							icon:'success',
							duration: 1000
						});
					}
				})
			},
			savePicToLocal(canvasUrl){
				uni.saveImageToPhotosAlbum({//保存图片到系统相册。
					filePath: canvasUrl,//图片文件路径
					success: ()=> {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
						});
						this.isSave=false
					},
					fail: (e)=> {
						uni.showToast({
							title: '图片保存失败',
							icon: 'none',
						});
						this.isSave=false
					}
				});
			}
		},
		created(){
			this.getShareParams(()=>{
				setTimeout(()=>{
					this.$refs.qrcode._makeCode()
				},300)
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/common/common.scss';
	
	.share-container{
		min-height: 100%;
		background-image: url('../../static/images/bg_login.png');
		background-repeat: no-repeat;
		background-size: 100%;
		// padding-bottom: 134rpx;
		box-sizing: border-box;
		.share-header{
			padding-top: 120rpx;
			.share-code-block{
				width: 684rpx;
				height: 76rpx;
				border-radius: 22rpx;
				background:url('../../static/images/tool.png') no-repeat;
				background-size: 100% 100%;
				margin: 0 auto;
				display: flex;
				.copy-btn{
					height: 100%;
					width: 168rpx;
					background: #8FA8FF;
					border-radius: 22rpx;
					color: #fff;
					font-size: 28rpx;
					text-align: center;
					line-height: 76rpx;
				}
				.share-input{
					flex: 1;
					height: 100%;
					line-height: 76rpx;
					padding-left: 30rpx;
					box-sizing: border-box;
				}
			}
		}
		.share-content-block{
			position: relative;
			height: 1100rpx;
			background: url('../../static/images/share_bg.png') no-repeat;
			background-size: 100% 100%;
			.qrcode {
				position: absolute;
				left: 100rpx;
				bottom: 260rpx;
				width: 220rpx;
				text-align: center;
				.qrcode-wraps{
					width: 220rpx;
					height: 220rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #fff;
					border-radius: 10rpx;
					padding: 10rpx;
					box-sizing: border-box;
					margin-bottom: 6rpx;
				}
				text{
					font-size: 20rpx;
					color: #75758C;
					text-align: center;
				}
			}
		}
		
		.btn-block{
			display: flex;
			margin-top: 80rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			button{
				flex: 1;
				height: 132rpx;
				text-align: center;
				line-height: 132rpx;
				border-radius: 32rpx;
				color: #fff;
				font-size: 34rpx;
			}
			.save-btn{
				background: #8FA8FF;
				margin-right: 26rpx;
			}
			.copy-btn{
				background: #FEC4D6;
			}
		}
	}
	
	@media screen and (max-height: $screenH+'px') {
		.share-container{
			padding-bottom: 0;
			.share-content-block{
				height: 960rpx;
				.qrcode{
					width: 260rpx;
					bottom:200rpx;
					left: 80rpx;
					.qrcode-wraps{
						width: 220rpx;
						height: 220rpx;
						margin: 0 auto;
					}
				}
			}
		}
	}
</style>
