import { BASE_URL } from './config.js';

const baseData={
	access_token:uni.getStorageSync('appToken')||""
}
export default (postData,callback)=>{
	let reqData=Object.assign({},baseData,postData.data)
	return new Promise((resolve,reject)=>{
		uni.request({
		    url:postData.url ,
		    data:reqData||{},
			header:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			dataType:"json",
			method:postData.types||'post',
		    success: (res) => {
		        resolve(res)
		    },
			fail:(error)=>{
				uni.showToast({
					title:'请求接口失败',
					icon:'none'
				})
				reject(error)
			}
		});
	})
	
}