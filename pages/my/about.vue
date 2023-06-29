<template>
	<view>
		<u-navbar title="关于我们"></u-navbar>
		<view class="top">
			<view class="box">
				<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/qh.png" mode=""></image>
				<view class="tit">{{appName}}</view>
			</view>
		</view>
		<view class="box1">
			<!-- #ifdef APP-PLUS -->
			<view class="list">
				<view>检查更新</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<!-- #endif -->
			<!-- <view class="list">
				<view>问题反馈</view>
				<u-icon name="arrow-right"></u-icon>
			</view> -->
			<view class="list" @click="$.to('/pages/my/agreement?type=user_agreement')">
				<view>用户协议</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="list" @click="$.to('/pages/my/agreement?type=privacy_policy')">
				<view>隐私政策</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<!-- <view class="list">
				<view>平台资质</view>
				<u-icon name="arrow-right"></u-icon>
			</view> -->
			<!-- #ifdef APP-PLUS -->
			<view class="banben">当前版本1.0.0</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appName:''
			}
		},
		onLoad() {
			this.getName()
		},
		methods: {
			getName(){
				this.$http({
					url: "index.php/api/index/getSite",
				}).then(res => {
					console.log(res,'1111');
					if (res.data.code == 1) {
						console.log(111);
						this.appName = res.data.data
					}
				}).catch(err => {});
			},
		}
	}
</script>

<style>
	page{
		background-color: #F3F8FC;
	}
	.top {
		background: url('../../static/image/vo.webp');
		background-size: cover;
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 30rpx;
	}
	.box{
		padding: 40rpx 0 60rpx;
		text-align: center;
	}
	.box .tit{
		font-size: 50rpx;
		font-family: myfont;
		margin-top: 20rpx;
	}
	.box1 {
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: -30rpx;
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
	.box1 .list:first-child{
		margin-top: 0;
	}
	.banben{
		text-align: center;
	}
</style>
