<template>
	<view class="loginbox">
		<u-navbar :border-bottom="false" title=" " :immersive="true"
			:background="{backgroundColor: 'rgba(0, 0, 0, 0)'}">
			<!-- <view style="padding-right: 20rpx;" slot="right">
				帮助
			</view> -->
		</u-navbar>
		<view class="top">
			<!-- <view class='denglulogo'>
				<image src='static/image/qiyuan.jpg'></image>
			</view> -->
			<!-- <image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/qh.png" mode="widthFix"></image>
			<view class="text">
				<view>你好，</view>
				<view>欢迎来到{{appName}}</view>
			</view> -->
		</view>

		<view class="biaodan">
			
			<view class='denglulogo'>
							<view  class='denimg'>
								<image class='imgs' src='/static/image/qiyuan.jpg'></image>
							</view>
							
						</view>
			
			
			<!-- #ifndef MP-WEIXIN -->
			<view class="row">
				<u-field v-model="phone" type="number" label="+86" maxlength="11" placeholder="请填写手机号">
				</u-field>
			</view>

			<view class="row">
				<u-field v-model="num" type="number" label="验证码" placeholder="清输入验证码">
					<text class="huoqu" slot="right" @click="getCode">{{codeText}}</text>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange" change-text="xs"></u-verification-code>
			</view>
			<button class="btn" @click="submit" :style="{'background-color':(number!=''&&phone!='')?'#000000':'#cccccc'}">同意协议并注册</button>
			<view style='text-align: center;'><label class="radio"><radio :checked="chckeds" value="r2" />我已阅读并同意 <span style='color:blue;'>《用户协议》</span>和<span style='color:blue;'>《隐私协议》</span></label></view>	
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<!-- <button class="btn" @click="weixin">点击登录</button> -->
			<view class="" style="text-align: center;margin-bottom: 20rpx;" v-if="id">邀请人为：{{id}}</view>
			<button open-type="getPhoneNumber" @getphonenumber="login" class="btn">点击登录</button>
			<!-- #endif -->

		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="other">
			<u-divider color="#999">其他登录方式</u-divider>
			<image @click="applogin" src="../../static/image/weixin.png" mode=""></image>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				chckeds:true,
				phone: '', //手机号
				num: '', //验证码
				code: '',
				codeText: '',
				nickName: '',
				headImage: '',
				id: '',
				appName: '',
				pnoneNum: '',
				
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
			console.log(this.id, "邀请码");
			this.getName()

		},
		methods: {

			applogin() {
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: (event) => {
						const {
							code
						} = event
						//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
						this.$http({
							url: "index.php/api/user/getWechatInfoByAPP",
							data: {
								"code": event.code
							}
						}).then(result => {
							console.log(result, '1111');
							if (result.data.code == 1) {
								uni.setStorageSync('user', result.data.data)
								this.getUser()
							}
						}).catch(err => {});
					},
					fail: (err) => {
						this.$tip.tip("授权失败")
						// 登录授权失败  
						// err.code是错误码
					}
				})
			},

			login(e) {
				console.log(e);
				if (e.detail.encryptedData) {
					let {
						code,
						encryptedData,
						iv
					} = e.detail
					console.log(code);
					this.$http({
						url: "index.php/api/user/getPhoneNumber",
						data: {
							"code": code,
						}
					}).then(result => {
						console.log(result, '1111');
						if (result.data.code == 1) {
							this.pnoneNum = result.data.phoneNumber
							this.weixin()

						}
					}).catch(err => {});
				} else {
					this.$tip.tip("授权失败")
				}
			},

			codeChange(text) {
				this.codeText = text;
			},
			weixin() {
				uni.login({
					success: (request) => {
						if (request.code) {
							console.log(this.id, "id");
							this.$http({
								url: "index.php/api/user/mpWxLogin",
								data: {
									"code": request.code,
									"nickName": this.pnoneNum,
									"avatarUrl": 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/head.jpg',
									"invitecode": this.id,
								}
							}).then(result => {
								console.log(result, '1111');
								if (result.data.code == 1) {
									uni.setStorageSync('user', result.data.data)
									this.getUser()


								}
							}).catch(err => {});
						}
					}
				})
			},

			getUser() {
				this.$http({
					url: "index.php/api/user/userinfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						uni.setStorageSync('userInfo', res.data.data)
						console.log(this.$tip.tip("登录成功"));
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabBar/home'
							})
						}, 700)
					}
				}).catch(err => {});
			},
			getName() {
				this.$http({
					url: "index.php/api/index/getSite",
				}).then(res => {
					console.log(res, '1111');
					if (res.data.code == 1) {
						console.log(111);
						this.appName = res.data.data
					}
				}).catch(err => {});
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (this.$tip.phoneReg.test(this.phone) == false) {
						this.$tip.tip('请填写正确的手机号')
						return
					}
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$http({
						url: "index.php/api/sms/send",
						data: {
							event: 'login',
							mobile: this.phone
						}
					}).then(res => {
						console.log(res);
						if (res.data.code == 1) {
							uni.hideLoading();
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}
					}).catch(err => {});

				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			submit() {
				if (this.$tip.phoneReg.test(this.phone) == false) {
					this.$tip.tip('请填写正确的手机号')
					return
				}
				if(this.num == ''){
					this.$tip.tip('请填写验证码')
					return
				}
				this.$http({
					url: "index.php/api/user/mobilelogin",
					data: {
						mobile: this.phone,
						captcha: this.num,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						uni.setStorageSync('user', res.data.data)
						uni.$emit('updataUser');
						uni.switchTab({
							url: '/pages/tabBar/home'
						})
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
		}
	}
</script>

<style lang='scss' scoped>
	::v-deep .uni-radio-input{
		width: 20rpx;
		height: 20rpx;
	}
	.radio{
		font-size: 18rpx;
		/* margin-top:48rpx; */
	}
	::v-deep .uni-radio-input-checked{
		background-color:#cccccc !important;
		border-color:#cccccc !important;
	}
	.denglulogo{
		width: 100%;
		height: 200rpx;
	text-align: center;
	align-items: center;
	   text-align: center;
		/* border:1px solid red; */
		margin-top:200rpx;
		margin-bottom:100rpx;
		.denimg{
		position: relative;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
			width: 100rpx;
			height: 100rpx;
			/* border:1px solid blue; */
			.imgs{
				width: 100rpx;
				height: 100rpx;
			}
			
		}
		/* margin */
	}
	
	/* .top{
		text-align: center;
		margin :auto;
	} */
	/* .top {
		position: relative;
		
	}

	.top image {
		width: 750rpx;
	}

	.top .text {
		position: absolute;
		left: 60rpx;
		top: 170rpx;
		font-size: 50rpx;
	} */

	.biaodan {
		padding: 40rpx 60rpx;
		box-sizing: border-box;
	}

	.huoqu {
		color: #000000;//#00DAD9;
	}

	.row {
		margin-bottom: 30rpx;
	}

	.btn {
		/* background-color: #cccccc;//#00DAD9; */
		font-size: 32rpx;
		margin-top: 40rpx;
		border-radius: 80rpx;
		color:#ffffff;
		margin-bottom:32rpx;
	}

	.loginbox {
		position: relative;
		min-height: 100vh;
	}

	.other {
		position: absolute;
		width: 750rpx;
		left: 0;
		bottom: 100rpx;
		text-align: center;
	}

	.other image {
		width: 80rpx;
		height: 80rpx;
		margin-top: 30rpx;
	}
</style>
