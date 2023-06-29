<template>
	<view>
		<u-navbar title="系统消息"></u-navbar>
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
		onLoad(option) {
			this.getData(option.id)
		},
		methods: {
			getData(id){
				this.$http({
					url: "index.php/api/user/getNotice",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						nid:id
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.data = res.data.data.desc
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
.box{
	padding: 30rpx;
	box-sizing: border-box;
}
</style>
