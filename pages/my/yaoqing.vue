<template>
	<view>
		<u-navbar title="邀请有奖"></u-navbar>
		<view class="con">
			<image class="bg" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/yaoqing.png" mode="widthFix"></image>

			<!-- #ifdef MP-WEIXIN -->
			<view class="btn">
				<button hover-class="none" open-type="share"></button>
			</view>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<view class="btn1">
				<image @click="yao" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/yaoqinganniu.png" mode="widthFix"></image>
			</view>
			<!-- #endif -->
			
		</view>
		<u-popup v-model="show" mode="bottom">
			<view class="shar">
				<view class="list" @click="appShare('WXSceneSession')">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/weixin.png" mode=""></image>
					<view class="tit">微信</view>
				</view>
				<view class="list" @click="appShare('WXSenceTimeline')">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/quan.png" mode=""></image>
					<view class="tit">朋友圈</view>
				</view>
				<view class="list" @click="copy">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/url.png" mode=""></image>
					<view class="tit">复制链接</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invitation: '',
				show: false,
				url: '',
			}
		},
		onLoad() {
			if (!uni.getStorageSync("userInfo")) {
				uni.redirectTo({
					url: '/pages/my/login'
				})
			} else {
				this.invitation = uni.getStorageSync("userInfo").invitation
			}
		},
		methods: {
			appShare(scene) {
				if (this.url == "") {
					this.$tip.tip("出错了，请稍后再试")
					return
				}
				let dizhi = decodeURIComponent(this.url + '/#/?sharecode=' + this.invitation)
				uni.share({
					provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
					scene: scene, //场景，可取值参考下面说明。
					type: 0, //分享形式
					href:dizhi,
					title:'邀你一起开盲盒~',
					imageUrl: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/share.png', //图片地址
					success: (res) => {
						this.show = false //成功后关闭底部弹框
					},
					fail: (err) => {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						this.show = false
					}
				});
			},
			yao() {
				this.show = true
				this.$http({
					url: "index.php/api/index/getDomain",
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.url = res.data.data
					}
				}).catch(err => {});
			},

			// 复制链接
			copy() {
				if (this.url == "") {
					this.$tip.tip("出错了，请稍后再试")
					return
				}
				let dizhi = decodeURIComponent(this.url + '/h5/#/?sharecode=' + this.invitation)
				uni.setClipboardData({
					data: dizhi,
					success: () => {

					}
				});

			},



			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: '邀请好友得豪礼',
					path: '/pages/my/login?id=' + this.invitation
				}
			}
		}
	}
</script>

<style>
	.con {
		position: relative;
	}

	.bg {
		width: 100%;
	}

	/deep/.u-drawer-bottom {
		background-color: transparent !important;
	}

	.list {
		text-align: center;
	}

	.list .tit {
		border: 4rpx solid #fff;
		background-color: #1DEFFD;
		line-height: 50rpx;
		box-sizing: border-box;
		width: 150rpx;
		position: relative;
		top: -30rpx;
		font-size: 32rpx;
		left: 6rpx;
		border-radius: 50rpx;
	}

	.list image {
		width: 160rpx;
		height: 160rpx;
	}

	.shar {
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/shar.png') no-repeat;
		background-size: 100%;
		height: 360rpx;
		padding: 120rpx 70rpx 0;
		display: flex;
		justify-content: space-between;
	}

	.btn1 image {
		position: absolute;
		left: 100rpx;
		bottom: 80rpx;
		width: 550rpx;
	}

	button {
		position: absolute;
		left: 100rpx;
		bottom: 80rpx;
		width: 550rpx;
		height: 146rpx;
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/yaoqinganniu.png') no-repeat;
		background-size: 100%;
		outline: none;
		border: none;
	}
</style>
