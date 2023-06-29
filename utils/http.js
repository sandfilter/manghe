import config from "./config.js"
let http = (option = {}) => {
	return new Promise((resolve, reject) => {
		
		uni.request({
			url: config.baseUrl + option.url || "",
			data: option.data || {},
			method: option.method || "POST",
			header: option.header || {
				"Content-Type": "application/json",
				"token": uni.getStorageSync("user").token || ''
			},
			timeout:option.timeout || 60000,
			success: res => {
				resolve(res)
				if(res.data.code == 401){
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					uni.redirectTo({
						url:'/pages/my/login'
					})
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export default http