import { BASE_URL } from './config.js';

export default (postData,callback)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
		    url:BASE_URL+postData.url ,
		    data:postData.data||{},
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