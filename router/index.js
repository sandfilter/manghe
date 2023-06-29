//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页
// 页面白名单，不受拦截
const whiteList = [
	'/pages/tabBar/home',
	'/pages/tabBar/viewWeb'
]

function hasPermission(url) {
	let islogin = sessionStorage.getItem("isLogin"); //在这可以使用token、vuex
	islogin = Boolean(Number(islogin)); //返回布尔值
	// 在白名单中或有登录判断条件可以直接跳转
	if (whiteList.indexOf(url) !== -1 || islogin) {
		return true
	}
	return false
}
uni.addInterceptor('navigateTo', {
	// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.reLaunch({
				url: '/pages/tabBar/viewWeb'
			})
			return false
		}
		return true
	},
	success(e) {}
})

uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.reLaunch({
				url: '/pages/tabBar/viewWeb'
			})
			return false
		}
		return true
	},
	success(e) {}
})
