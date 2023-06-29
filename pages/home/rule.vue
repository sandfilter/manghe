<template>
	<view>
		<u-navbar title="玩法规则"></u-navbar>
		<view class="box">
			<rich-text :nodes="data"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:''
			}
		},

		onLoad() {
			this.getRule()
		},
		methods: {
			getRule() {
				this.$http({
					url: "index.php/api/index/getSetting",
					// header: {
					// 	"Content-Type": "application/json",
					// 	"token": '72739283-5ca9-4655-bd06-dfd46fe6d811'
					// },
					// data: {
					// 	token: '72739283-5ca9-4655-bd06-dfd46fe6d811'
					// }
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.data = res.data.data.wfgz
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
.box{
	padding: 20rpx;
	box-sizing: border-box;
}
</style>
