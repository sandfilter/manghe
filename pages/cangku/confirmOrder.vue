<template>
	<view>
		<u-navbar title="确认订单"></u-navbar>
		<view class="wrap">
			<view class="address" @click="$.to('/pages/my/address?state=1')">
				<view class="left">
					<image src="../../static/image/a1_.png" mode=""></image>
					<view v-if="!isAdd">添加收货地址</view>
					<view class="info" v-else>
						<view class="name">
							{{address.name}} <text>{{address.mobile}}</text>
						</view>
						<view class="add">
							{{address.province + ' ' + address.city + ' ' + address.area + ' ' + address.detail}}
						</view>
					</view>
				</view>
				<u-icon name="arrow-right" color="#ccc"></u-icon>
			</view>

			<view class="goodsBox">
				<view class="goods">
					<image :src="info.image" mode=""></image>
					<view class="goodsInfo">
						<view class="tit">{{info.name}}</view>

						<view class="price n-flex-row n-justify-between" style="margin-top: 10rpx;">
							<view>￥0</view>
							<view style="color: #999;font-size: 28rpx;">x1</view>
						</view>
					</view>
				</view>
				<view class="row">
					<view>订单类型</view>
					<view>提货订单</view>
				</view>

				<view class="row">
					<view>运费</view>
					<view class="pri" v-if="info.yunfei == 0">免运费</view>
					<view class="pri" v-else>￥{{info.yunfei}}</view>
				</view>
				<!-- <view class="beizhu">
					<view class="">备注信息</view>
					<u-input v-model="remarks" type="textarea" height="50" placeholder="选填备注信息"/>
				</view> -->
			</view>
		</view>
		
		<view class="box1" style="margin-top: 20rpx;" v-if="info.yunfei > 0">
			<u-radio-group style="display: block;" width="34rpx" v-model="paymode" active-color="#70DDE0">
				<!-- #ifdef MP-WEIXIN || H5 -->
				<view class="rowitem payrow" @click="selectPay('wechat')">
					<view class="l">
						<image src="../../static/image/weixinf.png" mode=""></image>
						微信
					</view>
					<u-radio name="wechat"></u-radio>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS || H5 -->
				<view class="rowitem payrow" @click="selectPay('alipay')">
					<view class="l">
						<image src="../../static/image/zhifubao.png" mode=""></image>
						支付宝
					</view>
					<u-radio name="alipay"></u-radio>
				</view>
				<!-- #endif -->
			</u-radio-group>
		</view>
		
		<view class="btm">
			<view class="btmbox">
				<view class="n-flex-row n-align-center">
					<view class="">
						<view>共1件 | 合计：￥<text>{{info.yunfei}}</text></view>
						<view class="yun" v-if="info.yunfei != 0">(含运费￥{{info.yunfei}})</view>
					</view>
					
					<button @click="pay">提交订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarks: '',
				address: '',
				isAdd: false, //是否有地址
				info: '',
				id: '',
				// #ifdef MP-WEIXIN || H5
				paymode:'wechat',
				// #endif
				
				// #ifdef APP-PLUS
				paymode:'alipay',
				// #endif
			}
		},
		onLoad(option) {
			this.id = option.id
			this.info = uni.getStorageSync('tihuo')
			this.getAddress()
			uni.$on('changeAddress', (addId) => {
				console.log(addId, 'id');
				this.upDataAddress(addId);
			})
		},
		onUnload() {
			uni.removeStorageSync('tihuo')
			uni.$off('changeAddress');
		},
		methods: {
			pay() {
				if (!this.address) {
					this.$tip.tip("请选择地址")
					return
				}

				if(this.info.yunfei > 0){
					if (this.paymode == "") {
						this.$tip.tip("请选择支付方式")
						return
					}
				}
				
				if(this.paymode == "wechat"){
					this.$http({
						url: "index.php/api/order/sqfh",
						header: {
							// "Content-Type": "application/json",
							"token": uni.getStorageSync("user").token
						},
						data: {
							id: this.id,
							addresid: this.address.id,
							// #ifdef H5
							terminal: 0,
							payfs:this.paymode,
							// #endif
					
							// #ifdef MP-WEIXIN
							terminal: 1,
							// #endif
					
							// #ifdef APP-PLUS
							terminal: 2,
							// #endif
						}
					}).then(res => {
						console.log(res);
						if(this.info.yunfei == 0){
							this.$tip.tip("支付成功", "success")
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/mall/paySuccexx'
								})
							}, 700)
							return
						}
						// #ifdef H5
						uni.navigateTo({
							url: '/pages/tabBar/pay'
						})
						setTimeout(() => {
							uni.$emit('h5pay', res.data)
						}, 600)
						// #endif
						if (res.data.code == 1) {
							// #ifdef MP-WEIXIN
							var data = res.data.data.data
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: data,
								appId: data.appId,
								timeStamp: data.timeStamp,
								nonceStr: data.nonceStr,
								package: data.package,
								signType: data.signType,
								paySign: data.paySign,
								success: (res1) => {
									this.$tip.tip("支付成功", "success")
									setTimeout(() => {
										uni.redirectTo({
											url: '/pages/mall/paySuccexx'
										})
									}, 700)
								},
								fail: (err) => {
									this.$tip.tip("支付失败")
								}
							});
							// #endif
						} else {
							this.$tip.tip(res.data.msg)
						}
					}).catch(err => {});
				}else if(this.paymode == "alipay"){
					this.$http({
						url: "index.php/api/order/sqfh",
						header: {
							// "Content-Type": "application/json",
							"token": uni.getStorageSync("user").token
						},
						data: {
							id: this.id,
							addresid: this.address.id,
							// #ifdef H5
							terminal: 0,
							payfs:this.paymode,
							// #endif
					
							// #ifdef MP-WEIXIN
							terminal: 1,
							// #endif
					
							// #ifdef APP-PLUS
							terminal: 2,
							// #endif
						}
					}).then(res => {
						console.log(res);
						if(this.info.yunfei == 0){
							this.$tip.tip("支付成功", "success")
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/mall/paySuccexx'
								})
							}, 700)
							return
						}
						// #ifdef H5
						uni.navigateTo({
							url: '/pages/tabBar/pay'
						})
						setTimeout(() => {
							uni.$emit('h5pay', res.data)
						}, 600)
						// #endif
						if (res.data.code == 1) {
							// #ifdef APP-PLUS
							var data = res.data.data
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: data,
								success: (res1) => {
									this.$tip.tip("支付成功", "success")
									setTimeout(() => {
										uni.redirectTo({
											url: '/pages/mall/paySuccexx'
										})
									}, 700)
								},
								fail: (err) => {
									this.$tip.tip("支付失败")
								}
							});
							// #endif
						} else {
							this.$tip.tip(res.data.msg)
						}
					}).catch(err => {});
				}
				
				
				
			},
			getAddress() {
				this.$http({
					url: "index.php/api/user/myAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						if (res.data.data.length == 0) {
							this.isAdd = false
						} else {
							this.isAdd = true
						}
						this.address = res.data.data[0]
						console.log(this.address);
					} else {
						this.$tip.tip(res.data.msg)
						this.isAdd = false
					}
				}).catch(err => {});
			},
			// 更新收货地址
			upDataAddress(id) {
				this.$http({
					url: "index.php/api/user/getAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						addresid: id
					}
				}).then(res => {
					console.log(res, "dizhi");
					if (res.data.code == 1) {
						this.address = res.data.data
						this.isAdd = true
					}

				}).catch(err => {});
			},
			// 选择支付方式
			selectPay(mode) {
				this.paymode = mode
			},
		}
	}
</script>

<style>
	@import url("../../static/css/confirmOrder.css");
</style>
