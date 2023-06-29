<template>
	<view>
		<u-navbar :title="title">
			<view slot="right" style="padding-right: 20rpx;color: #2AC2B3;" @click="submit">保存</view>
		</u-navbar>
		<view class="box">
			<u-input v-model="value" :maxlength="maxlength" />
		</view>
		<view class="xiandu">
			{{value.length + '/' + maxlength}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				value:'',
				maxlength:10,
				state:'',
			}
		},
		onLoad(option) {
			this.state = option.state
			if(option.state == 1){
				this.title = "修改昵称"
				this.maxlength = 12
				this.value = uni.getStorageSync('userInfo').nickname
			}else if(option.state == 2){
				this.title = "修改邮箱"
				this.maxlength = 50
				this.value = uni.getStorageSync('userInfo').email
			}
			
		},
		methods: {
			submit(){
				var data
				if(this.state == 1){
					data={nickname:this.value}
				}else if(this.state == 2){
					data={email:this.value}
				}
				this.$http({
					url: "index.php/api/user/changeInfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:data
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip('修改成功')
						uni.$emit('updataUser')
						setTimeout(() => {
							uni.navigateBack()
						},500)
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F3F8FC;
	}
	.box{
		padding: 10rpx 20rpx;
		margin: 20rpx auto;
		background-color: #fff;
		box-sizing: border-box;
	}
	.xiandu{
		padding-right: 20rpx;
		text-align: right;
		box-sizing: border-box;
		color: #999;
	}
</style>
