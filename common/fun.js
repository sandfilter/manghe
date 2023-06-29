// 不含icon提示框
const toast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "none",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve
				}, 2000)
			}
		})
	});
};
// 成功提示框
const successToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "success",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 2000)
			}
		})
	})
};
// 失败提示框
const errorToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "error",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 2000)
			}
		})
	})
};
// 确定框
const modal = (content, showCancel = false, confirmText = "确定", cancelText = "取消") => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '提示',
			content: content,
			showCancel: showCancel,
			confirmText: confirmText,
			cancelText: cancelText,
			success: function(res) {
				if (res.confirm) {
					resolve();
				} else if (res.cancel) {
					reject();
				}
			}
		});
	})
};
// loading
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			success: () => {
				resolve()
			}
		})
	})
};
// tipLoading ==>提示loading
const tipLoading = str => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: str,
			success: () => {
				resolve()
			}
		})
	})
};
// 隐藏loading
const hideLoading = () => {
	return new Promise((resolve, reject) => {
		uni.hideLoading({
			success: () => {
				resolve()
			}
		})
	})
};
// 去登陆
const toLogin = (title = "您未登录，请登录！") => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: title,
			icon: 'none'
		});
		setTimeout(function() {
			uni.navigateTo({
				url: '/pages/shop/user/login'
			});
		}, 1500);
	})
};

// 回退界面
const back = () => {
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			uni.navigateBack();
		}, 500);

	})
};
// 跳转界面
const to = url => {
	return new Promise((resolve, reject) => {
		uni.navigateTo({
			url: url
		});
	})
};
// 跳转界面 关闭所有界面
const re = (url, title) => {
	return new Promise((resolve, reject) => {
		if (title != null && title != "" && title != undefined) {
			toast(title);
			setTimeout(function() {
				uni.reLaunch({
					url: url
				});
			}, 500);
		} else {
			uni.reLaunch({
				url: url
			});
		}

	})
};
// 跳转界面 重定向
const reTo = (url, title) => {
	return new Promise((resolve, reject) => {
		if (title != null && title != "" && title != undefined) {
			toast(title);
			setTimeout(function() {
				uni.redirectTo({
					url: url
				});
			}, 500);
		} else {
			uni.redirectTo({
				url: url
			});
		}

	})
};
// 回退界面  显示toast
const t_back = title => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: title,
			icon: 'none'
		});
		setTimeout(function() {
			uni.navigateBack();
		}, 1500);
	})
};
// 跳转界面
const t_to = (url, title) => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: title,
			icon: 'none'
		});
		setTimeout(function() {
			uni.navigateTo({
				url: url
			});
		}, 1500);
	})
};

const pre = (urls, current = 0) => {
	return new Promise((resolve, reject) => {
		uni.previewImage({
			current: current,
			urls: urls
		});
	})
};
const callPhone = (phoneNumber) => {
	return new Promise((resolve, reject) => {
		uni.makePhoneCall({
			phoneNumber: phoneNumber
		});
	})
};
const check = (str, type) => {
	return new Promise((resolve, reject) => {
		switch (type) {
			case 'mobile': //手机号码
				/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str) ? resolve() : reject();
			case 'tel': //座机
				/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str) ? resolve() : reject();
			case 'card': //身份证
				/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str) ? resolve() : reject();
			case 'mobileCode': //6位数字验证码
				/^[0-9]{6}$/.test(str) ? resolve() : reject();
			case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
				/^([a-zA-Z0-9_]){6,18}$/.test(str) ? resolve() : reject();
			case 'payPwd': //支付密码 6位纯数字
				/^[0-9]{6}$/.test(str) ? resolve() : reject();
			case 'postal': //邮政编码
				/[1-9]\d{5}(?!\d)/.test(str) ? resolve() : reject();
			case 'QQ': //QQ号
				/^[1-9][0-9]{4,9}$/.test(str) ? resolve() : reject();
			case 'email': //邮箱
				/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str) ? resolve() : reject();
			case 'money': //金额(小数点2位)
				/^\d*(?:\.\d{0,2})?$/.test(str) ? resolve() : reject();
			case 'URL': //网址
				/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
				.test(str) ? resolve() : reject();
			case 'IP': //IP
				/((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/
				.test(str) ? resolve() : reject();
			case 'date': //日期时间
				/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
					/^(\d{4})\-(\d{2})\-(\d{2})$/
					.test(str) ? resolve() : reject();
			case 'number': //数字
				/^[0-9]$/.test(str) ? resolve() : reject();
			case 'english': //英文
				/^[a-zA-Z]+$/.test(str) ? resolve() : reject();
			case 'chinese': //中文
				/^[\\u4E00-\\u9FA5]+$/.test(str) ? resolve() : reject();
			case 'lower': //小写
				/^[a-z]+$/.test(str) ? resolve() : reject();
			case 'upper': //大写
				/^[A-Z]+$/.test(str) ? resolve() : reject();
			case 'HTML': //HTML标记
				/<("[^"]*"|'[^']*'|[^'">])*>/.test(str) ? resolve() : reject();
			default:
				reject();
		}
	})
};

export default {
	toast: toast,
	successToast: successToast,
	errorToast: errorToast,
	showLoading: showLoading,
	tipLoading: tipLoading,
	hideLoading: hideLoading,
	toLogin: toLogin,
	back: back,
	modal: modal,
	to: to,
	re: re,
	t_back: t_back,
	t_to: t_to,
	pre: pre,
	reTo: reTo,
	callPhone: callPhone,
	check: check,
}
