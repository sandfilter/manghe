<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<view class="box">
			<rich-text :nodes="data"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				data: '',
			}
		},
		onLoad(option) {
			this.getDat(option.type)
		},
		methods: {
			getDat(type) {
				this.$http({
					url: "index.php/api/common/agreement",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						name: type
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.data = res.data.data.content
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
	.box {
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
