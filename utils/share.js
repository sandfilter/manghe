export default {
	// #ifdef MP-WEIXIN
	onShareAppMessage(res) {
		return {
			path: "/pages/tabBar/home", //不设置默认当前页面
			title: "嗨品盲盒"
		}
	},
	onShareTimeline() {
		return {
			path: "/pages/tabBar/home", //不设置默认当前页面
			title: "嗨品盲盒"
		}
	},
	// #endif
}
