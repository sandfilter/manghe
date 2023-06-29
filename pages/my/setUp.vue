<template>
	<view>
		<u-navbar title="设置"></u-navbar>
		<view class="box">
			
			<!-- #ifdef APP-PLUS -->
			<view class="list" @click="$.to('/pages/my/accountSettings')">
				<view>账号设置</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<!-- #endif -->
			
			<view class="list" @click="$.to('/pages/my/about')">
				<view>关于我们</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<!-- <view class="list">
				<view>日志上传</view>
				<u-icon name="arrow-right"></u-icon>
			</view> -->
			<view class="list">
				<view>消息通知</view>
				<view class="text">已开启</view>
			</view>
			<view class="btn" @click="logOut">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 退出登录
			logOut(){
				uni.removeStorageSync('user');
				uni.removeStorageSync('userInfo');
				uni.navigateTo({
					url:'/pages/my/login'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4FC;
	}

	.box {
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.list {
		background-color: #fff;
		margin: 20rpx auto;
		padding: 34rpx 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list .text{
		color: #999;
		font-size: 26rpx;
	}
	.btn{
		background-color: #fff;
		margin: 20rpx auto;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		text-align: center;
		font-size: 32rpx;
	}
</style>
