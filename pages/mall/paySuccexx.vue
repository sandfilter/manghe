<template>
	<view class="pay">
		<view class="box">
			<image src="../../static/image/success.png" mode=""></image>
			<view class="cg">{{tit}}</view>
			<view class="btn">
				<u-button class="btn1" :ripple="true" ripple-bg-color="#eee" @click="home">返回首页</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tit:'支付成功'
			}
		},
		onLoad() {
			
		},
		methods: {
			home(){
				uni.switchTab({
					url:'/pages/tabBar/home'
				})
			}
		}
	}
</script>

<style>
	page{
		/* background-color: #EDF5F5; */
	}
	.pay {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 100vh;
	}

	.box {
		width: 750rpx;
		text-align: center;
	}

	.box image {
		width: 150rpx;
		height: 150rpx;
	}

	.cg {
		font-size: 32rpx;
		color: #999;
		margin-top: 20rpx;
	}

	.btn {
		width: 200rpx;
		margin: 0 auto;
		margin-top: 500rpx;

	}
	.btn1{
		border: none;
		color: #999;
	}
</style>
