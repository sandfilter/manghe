<template>
	<view>
		<u-navbar title="订单详情" :border-bottom="false"></u-navbar>
		<view class="top">
			<view class="title">
				{{info.status}}
			</view>
			
		</view>
		
		<view class="address">
			<view class="left">
				<image src="../../static/image/a1_.png" mode=""></image>
				<view class="info">
					<view class="name">
						{{info.username}} <text>{{info.mobile}}</text>
					</view>
					<view class="add">
						{{info.address}}
					</view>
				</view>
			</view>
			<!-- <u-icon name="arrow-right" color="#ccc"></u-icon> -->
		</view>
		
		<view class="orderList">
			<view class="list">
				<view class="tit">
					<view class="num">商品信息</view>
				</view>
				<view class="goods">
					<image :src="info.image" mode=""></image>
					<view class="info">
						<view class="gtit">
							{{info.shop_name}}
						</view>
						<view class="peice n-flex-row n-justify-between">
							<view class="p">￥{{info.price}}</view>
							<view class="num">x{{info.num}}</view>
						</view>
					</view>
				</view>
				<view class="row">
					<view>商品总价</view>
					<view class="r">￥{{info.pay_rmb}}</view>
				</view>
				<view class="row">
					<view>运费</view>
					<view class="r">￥{{info.delivery_fee}}</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="wuliu" v-if="info.status == '已发货' || info.status == '已完成'">
			<view class="tit">
				物流动态
			</view>
			<view class="kuaidi n-flex-row n-justify-between">
				<view class="name">
					<view class="">
						<text style="margin-right: 20rpx;">{{info.kdgs_v}}</text>
						<text>{{info.kddh}}</text>
					</view>
				</view>
				<view class="copy" @click="copy">
					复制
				</view>
			</view>
			<view class="con">
				<u-time-line>
					<!-- 其他 -->
					<u-time-line-item nodeTop="2" v-for="(item,index) in wuliuInfo" :key="index">
						<!-- <template v-slot:node>
							<view class="u-node">
								<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template> -->
						<template v-slot:content>
							<view>
								<view class="u-order-title" v-if="item.status == '签收'">已签收</view>
								<view class="u-order-title" v-if="item.status == '派件'">派件中</view>
								<view class="u-order-title" v-if="item.status == '在途'">运输中</view>
								<view class="u-order-title" v-if="item.status == '揽收'">已揽收</view>
								<view class="u-order-desc">{{item.context}}</view>
								<view class="u-order-time">{{item.time}}</view>
							</view>
						</template>
					</u-time-line-item>
					
					<!-- <u-time-line-item nodeTop="2" v-for="(item,index) in qianshou" :key="index">
						<template v-slot:node>
							<view class="u-node">
								<u-icon name="account-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title unacive" v-if="index == 0">已签收</view>
								<view class="u-order-desc">【深圳市】快件已到达目的地，派件员为国产锦衣卫007号，电话：<text class="tel">13833882438</text>，请留意快递信息</view>
								<view class="u-order-time">2019-05-08 06:03</view>
							</view>
						</template>
					</u-time-line-item>
					
					<u-time-line-item nodeTop="2" v-for="(item,index) in paijin" :key="index">
						<template v-slot:node>
							<view class="u-node">
								<u-icon v-if="index == 0" name="car-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title unacive" v-if="index == 0">派件中</view>
								<view class="u-order-desc">【深圳市】快递已到达 深圳固戍一部</view>
								<view class="u-order-time">2019-05-07 08:05</view>
							</view>
						</template>
					</u-time-line-item>
					
					<u-time-line-item nodeTop="2" v-for="(item,index) in zaitu" :key="index">
						<template v-slot:node>
							<view class="u-node" v-if="index == 0">
								<u-icon name="car-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title unacive">派件中</view>
								<view class="u-order-desc">【深圳市】快递已到达 深圳固戍一部</view>
								<view class="u-order-time">2019-05-07 08:05</view>
							</view>
						</template>
					</u-time-line-item> -->
					
					
					
					<!-- <u-time-line-item nodeTop="0">
						<template v-slot:node>
							<view class="u-node">
								<u-icon name="file-text-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-desc">您购买的商品【尚方宝剑，先斩后奏】，经由北京军区仓库发货，国内快递承运人【中南海保镖】。</view>
								<view class="u-order-time">2019-12-01 07:00</view>
							</view>
						</template>
					</u-time-line-item> -->
				</u-time-line>
			</view>
		</view>
		
		
		
		<view class="obox">
			<view class="tit">
				订单信息
			</view>
			<view class="row" style="margin-top: 10rpx;">
				<view>订单编号</view>
				<view class="r1">{{info.out_trade_no}}</view>
			</view>
			<view class="row">
				<view>创建时间</view>
				<view class="r1">{{$u.timeFormat(info.create_time, 'yyyy-mm-dd hh:MM:ss')}}</view>
			</view>
			<view class="row">
				<view>支付方式</view>
				<view class="r1" v-if="info.pay_method == 'wechat'">微信支付</view>
				<view class="r1" v-if="info.pay_method == 'alipay'">支付宝支付</view>
				<view class="r1" v-if="info.pay_method == 'lucyk'">幸运币支付</view>
			</view>
		</view>
		<view style="height: 250rpx;" v-if="(info.status == '待支付') || (info.status == '已发货')">
			
		</view>
		<view class="btm" v-if="(info.status == '待支付') || (info.status == '已发货')">
			<view class="btmbox">
				<view class="n-flex-row n-align-center">
					<view class="">
						<view>共{{info.num}}件 | 合计：￥<text>{{(info.pay_rmb*1) + (info.delivery_fee*1)}}</text></view>
						<view class="yun" v-if="info.delivery_fee != 0">(含运费￥{{info.delivery_fee}})</view>
					</view>
					<button @click="pay" v-if="info.status == '待支付'">立即支付</button>
					<button @click="shouhuo" v-if="info.status == '已发货'">确认收货</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ooid:'',
				info:'',
				wuliuInfo:[],
				lanshou:[],
				zaitu:[],
				paijin:[],
				qianshou:[],
				other:[],
			}
		},
		onLoad(option) {
			this.ooid = option.ooid
			this.getDetails(option.ooid)
		},
		methods: {
			// 单号
			getNum(com,kddh){
				this.$http({
					url: "index.php/api/user/getWl",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						com:this.info.kdgs,
						kddh:this.info.kddh,
					}
				}).then(res => {
					console.log(res,"物流");
					if (res.data.code == 1) {
						this.wuliuInfo = res.data.data.data
						// this.wuliuInfo.forEach(item => {
						// 	if(item.status == "揽收"){
						// 		this.lanshou.push(item)
						// 	}else if(item.status == "在途"){
						// 		this.zaitu.push(item)
						// 	}else if(item.status == "派件"){
						// 		this.paijin.push(item)
						// 	}else if(item.status == "签收"){
						// 		this.qianshou.push(item)
						// 	}else{
						// 		this.other.push(item)
						// 	}
						// })
					}else{
						
					}
				}).catch(err => {});
			},
			shouhuo(){
				this.$http({
					url: "index.php/api/user/mallOrderConfirmReceipt",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						ooid:this.ooid
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("收货成功")
						setTimeout(() => {
							uni.navigateBack()
							uni.$emit('uporder')
						},500)
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			pay(){
				uni.showLoading({
					title:"加载中"
				})
				if(this.info.pay_method == 'wechat'){
					this.weiPay()
				}else if(this.info.pay_method == 'alipay'){
					this.zhiPay()
				}else if(this.info.pay_method == 'lucyk'){
					// #ifdef MP-WEIXIN
					this.weiPay()
					// #endif
					
					// #ifdef APP-PLUS
					this.zhiPay()
					// #endif
					
					
				}
				
			},
			weiPay(){
				this.$http({
					url: "index.php/api/shop/dzfOrder",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						ooid:this.ooid
					}
				}).then(res => {
					uni.hideLoading()
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
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			zhiPay(){
				this.$http({
					url: "index.php/api/shop/dzfOrder",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						ooid:this.ooid
					}
				}).then(res => {
					uni.hideLoading()
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
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			getDetails(ooid){
				this.$http({
					url: "index.php/api/order/getOrder",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						ooid:ooid
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					if (res.data.code == 1) {
						this.info = res.data.data
						this.getNum()
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			copy(){
				uni.setClipboardData({
					data: this.info.kddh,
					success: () => {
						console.log('success');
					}
				});
			},
		}
	}
</script>

<style>
@import url("../../static/css/orderDetails.css");
</style>
