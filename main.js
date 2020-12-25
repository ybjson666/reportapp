import Vue from 'vue'
import App from './App'
import {showModal} from './utils/tool.js'
import request from './utils/request.js'


Vue.config.productionTip = false
Vue.prototype.showToast=showModal
Vue.prototype.$http=request
Vue.prototype.refreshUser=async(that)=>{
	
	const uid=uni.getStorageSync('uid')
	const token=uni.getStorageSync('token')
	let params={
		url:'/api/user/UserRefresh',
		data:{port:'',app_version:'1.0',uid,token}
	}
	const result=await request(params);
	if(result.data.code===200){
		that.balance=result.data.data.money;
		that.nickname=result.data.data.nickname;
	}else if(result.data.code===401){
		that.showToast(result.data.message);
		setTimeout(()=>{
			uni.reLaunch({
				url:'../login/index'
			})
		},800)
	}else{
		that.showToast(result.data.message);
	}
}
App.mpType = 'app'

var token  = uni.getStorageSync('token');
if(!token){
	uni.redirectTo({
		url:'/pages/login/index'
	})
}


const app = new Vue({
    ...App
})
app.$mount()
