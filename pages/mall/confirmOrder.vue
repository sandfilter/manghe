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
						<!-- <view class="xinghao">
							型号：128GB;颜色：暗紫色（请勿现金支付）
						</view> -->
						<view class="price" style="margin-top: 20rpx;" v-if="info.type == 1">￥{{info.price}}</view>
						<view class="price" style="margin-top: 20rpx;color: #fc7802;" v-else>{{info.price}}幸运币</view>
					</view>
				</view>
				<view class="row">
					<view>购买数量</view>
					<view>x{{info.num}}</view>
				</view>
				<view class="row">
					<view>运费</view>
					<view class="hui" v-if="info.freight == 0">免运费</view>
					<view class="hui" v-else>￥{{info.freight}}</view>
				</view>
				<!-- <view class="row">
					<view>优惠券</view>
					<view class="hui n-flex-row">
						暂无可使用优惠券
						<u-icon name="arrow-right" ></u-icon>
					</view>
				</view> -->
				<view class="row">
					<view>商品总价</view>
					<view class="pri">￥{{info.price * info.num}}</view>
				</view>
				<view class="beizhu">
					<view class="">备注信息</view>
					<u-input v-model="remarks" type="textarea" height="50" placeholder="选填备注信息" />
				</view>
			</view>

			<view class="box1" style="margin-top: 20rpx;" v-if="info.type == 1">
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
		</view>
		<view class="btm">
			<view class="btmbox">
				<view class="n-flex-row n-align-center">
					<view class="">
						<view v-if="info.type == 1">共{{info.num}}件 | 合计：￥<text class="text">{{(info.price * info.num) + info.freight*1}}</text></view>
						<view v-else>共{{info.num}}件 | 合计：<text class="text" style="color: #fc7802;">{{info.price * info.num}}</text> <text style="color: #fc7802;">幸运币</text></view>
						<view class="yun" v-if="info.freight != 0">(含运费￥{{info.freight}})</view>
					</view>
					<button v-if="info.type == 1" @click="submit">提交订单</button>
					<button v-else @click="biPay">确认支付</button>
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
				paymode: '',
				info: '',
				address: '',
				isAdd: false, //是否有地址
				// #ifdef MP-WEIXIN || H5
				paymode:'wechat',
				// #endif
				
				// #ifdef APP-PLUS
				paymode:'alipay',
				// #endif
			}
		},
		onLoad() {
			this.info = uni.getStorageSync('goods')
			this.getAddress()
			uni.$on('changeAddress', (addId) => {
				console.log(addId, 'id');
				this.upDataAddress(addId);
			})
		},
		onUnload() {
			uni.removeStorageSync('goods')
			uni.$off('changeAddress');
		},
		methods: {
			// 钱购买
			submit() {
				if (!this.address) {
					this.$tip.tip("请选择地址")
					return
				}
				if (this.paymode == "") {
					this.$tip.tip("请选择支付方式")
					return
				}
				if(this.paymode == 'wechat'){
					// 微信支付
					this.$http({
						url: "index.php/api/shop/goPay",
						header: {
							// "Content-Type": "application/json",
							"token": uni.getStorageSync("user").token
						},
						data: {
							shopid: this.info.id,
							num: this.info.num,
							payfs: this.paymode,
							addresid: this.address.id,
							desc: this.remarks,
							// #ifdef H5
							terminal: 0,
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
				}else if(this.paymode == 'alipay'){
					// 支付宝支付
					this.$http({
						url: "index.php/api/shop/goPay",
						header: {
							// "Content-Type": "application/json",
							"token": uni.getStorageSync("user").token
						},
						data: {
							shopid: this.info.id,
							num: this.info.num,
							payfs: this.paymode,
							addresid: this.address.id,
							desc: this.remarks,
							// #ifdef H5
							terminal: 0,
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
			// 幸运币购买
			biPay() {
				if (!this.address) {
					this.$tip.tip("请选择地址")
					return
				}
				this.$http({
					url: "index.php/api/shop/goPay",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						shopid: this.info.id,
						num: this.info.num,
						payfs: 'lucyk',
						desc: this.remarks,
						addresid: this.address.id,
						// #ifdef H5
						terminal: 0,
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
					if (res.data.code == 1) {
						// 免运费
						if(this.info.freight == 0){
							uni.redirectTo({
								url: '/pages/mall/paySuccexx'
							})
						}
						// 小程序微信支付
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
						
						// APP支付宝支付
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
						
						// h5
						// #ifdef H5
						uni.navigateTo({
							url: '/pages/tabBar/pay'
						})
						setTimeout(() => {
							uni.$emit('h5pay', res.data)
						}, 600)
						// #endif
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
