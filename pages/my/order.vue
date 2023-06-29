<template>
	<view>
		<u-navbar title="我的订单" :border-bottom="false"></u-navbar>
		<u-sticky>
			<u-tabs active-color="#01DFD7" name="cate_name" :list="navList" :is-scroll="false" :current="current"
				@change="change"></u-tabs>
		</u-sticky>
		<view class="orderList">
			<view class="list" v-for="(item,idx) in orderList" :key="idx" @click="details(item.status,item.out_trade_no)">
				<view class="tit n-flex-row n-justify-between">
					<view class="num">订单编号：{{item.out_trade_no}}</view>
					<view class="state">{{item.status}}</view>
				</view>
				<view class="goods">
					<image :src="item.image" mode=""></image>
					<view class="info">
						<view class="gtit">
							{{item.shop_name}}
						</view>
						<view class="peice n-flex-row n-justify-between">
							<view class="p">￥{{item.price}}</view>
							<view class="num">x{{item.num}}</view>
						</view>
					</view>
				</view>
				<view class="total">
					<text class="shu">共{{item.num}}件 | </text><text style="margin-left: 10rpx;">合计：￥</text><text class="pri">{{item.pay_rmb}}</text>
				</view>
			</view>
		</view>
		<u-empty text="暂无订单" :show="show" mode="order" margin-top="400"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
					cate_name: '全部'
				}, {
					cate_name: '待付款'
				}, {
					cate_name: '待发货',
				}, {
					cate_name: '待收货',
				}, {
					cate_name: '已完成',
				}],
				current: 0,
				orderList:[],
				show:false,
			}
		},
		onLoad(option) {
			if(!uni.getStorageSync("userInfo")){
				uni.redirectTo({
					url:'/pages/my/login'
				})
			}
			this.current = option.idx
			this.getData()
			uni.$on('uporder',()=> {
				console.log("调用");
				this.getData()
			})
		},
		onUnload() {
			uni.$off('uporder')
		},
		methods: {
			change(index) {
				this.current = index;
				this.getData()
			},
			details(state,ooid){
				var type
				if(state == "待支付"){
					type = '1'
				}else if(state == "待发货"){
					type = '2'
				}else if(state == "待收货"){
					type = '3'
				}else if(state == "已完成"){
					type = '4'
				}else if(state == "已关闭"){
					type = '5'
				}
				uni.navigateTo({
					url:'/pages/my/orderDetails?idx='+type+'&ooid='+ooid
				})
			},
			getData(){
				uni.showLoading({
					title:"加载中"
				})
				this.$http({
					url: "index.php/api/order/getOrders",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						zt:this.current
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					if (res.data.code == 1) {
						if(res.data.data.length == 0){
							this.show = true
						}else{
							this.show = false
						}
						this.orderList = res.data.data
					}else{
						this.$tip.tip(res.data.msg)
						this.show = true
					}
				}).catch(err => {});
			},
		}
	}
</script>

<style>
@import url("../../static/css/order.css");
</style>
