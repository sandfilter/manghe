<template>
	<view>
		<u-navbar :border-bottom="false" title=" " :immersive="true"
			:background="{backgroundColor: 'rgba(0, 0, 0, 0)'}">
			<!-- <view style="padding-right: 20rpx;" slot="right">
				帮助
			</view> -->
		</u-navbar>
		<view class="top">
			<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/qh.png" mode="widthFix"></image>
			<view class="text">
				<view>你好，</view>
				<view>请绑定手机号</view>
			</view>
		</view>

		<view class="biaodan">
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
			
			<button class="btn" @click="submit">绑定</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',//手机号
				num:'',//验证码
				code: '',
				codeText: '',
				
			}
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
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
							event: 'bindmobile',
							mobile: this.phone
						}
					}).then(res => {
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
			submit(){
				if (this.$tip.phoneReg.test(this.phone) == false) {
					this.$tip.tip('请填写正确的手机号')
					return
				}
				if(this.num == ''){
					this.$tip.tip('请填写验证码')
					return
				}
				this.$http({
					url: "index.php/api/user/bindMobile",
					data: {
						mobile: this.phone,
						captcha: this.num,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("绑定成功")
						this.getUser()
						setTimeout(() => {
							uni.navigateBack()
						},700)
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			getUser() {
				this.$http({
					url: "index.php/api/user/userinfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					}
				}).then(res => {
					if (res.data.code == 1) {
						uni.setStorageSync('userInfo', res.data.data)
					}
				}).catch(err => {});
			},
		}
	}
</script>

<style>
	.top {
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
	}

	.biaodan {
		padding: 40rpx 60rpx;
		box-sizing: border-box;
	}
	.huoqu{
		color: #00DAD9;
	}
	.row{
		margin-bottom: 30rpx;
	}
	.btn{
		background-color: #00DAD9;
		font-size: 32rpx;
		margin-top: 40rpx;
	}
</style>
