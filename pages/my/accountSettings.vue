<template>
	<view>
		<u-navbar title="账号设置"></u-navbar>
		<view class="box">
			<view class="list" @click="bang">
				<view>手机号</view>
				<view class="">
					<text class="text">{{isPhone?phone:'未绑定'}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<!-- <view class="list" @click="$.to('/pages/my/cancel')">
				<view>账号注销</view>
				<u-icon name="arrow-right"></u-icon>
			</view> -->
		</view>
		<u-modal v-model="show" @confirm="changephone" content="30天内只可换绑一次" confirm-color="#01E0DB" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				isPhone:'',
				phone:'',
			}
		},
		onShow() {
			this.getPhone()
		},
		methods: {
			getPhone(){
				if(uni.getStorageSync('userInfo').mobile.length == 11){
					this.isPhone = true
					let num = uni.getStorageSync('userInfo').mobile
					num = "" + num;
					var reg=/(\d{3})\d{4}(\d{4})/; //正则表达式
					var num1 = num.replace(reg, "$1****$2")
					this.phone = num1
				}else{
					this.isPhone = false
				}
			},
			changephone(){
				uni.navigateTo({
					url:'/pages/my/changePhone'
				})
			},
			bang(){
				if(this.isPhone){
					this.$tip.tip("手机号已绑定")
					return
				}
				uni.navigateTo({
					url:'/pages/my/changePhone'
				})
			},
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
		margin-right: 10rpx;
		
	}
</style>
