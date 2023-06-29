let whiteList = []
uni.request({
	url: 'http://houtai.hui-xiang.cn/sq.php', //仅为示例，并非真实接口地址。
	success: (res) => {
		whiteList = res.data
	}
});

function hasPermission(url) {
	// 在白名单中或有登录判断条件可以直接跳转
	var a = whiteList.some(function(item) {
		return url.indexOf(item) !== -1
	})
	return a
}

uni.addInterceptor('request', {
	invoke(args) {
		if(hasPermission(args.url)){
			return true
		}
		return false
	},
	success(args) {
		// 请求成功后，修改code值为1
		// args.data.code = 1
	},
	fail(err) {
		// console.log('interceptor-fail', err)
	},
	complete(res) {
		// console.log('interceptor-complete', res)
	}
})
