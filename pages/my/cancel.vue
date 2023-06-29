<template>
	<view>
		<u-navbar title="账号注销"></u-navbar>
		<view class="box">
			<rich-text :nodes="data"></rich-text>
		</view>
		<view class="gao"> </view>
		<view class="btm">
			<u-checkbox :label-disabled="true" active-color="#00DAD9" v-model="checked" shape="circle">我已知晓注销行为不可恢复，切自愿放弃所有</u-checkbox>
			<view class="btns n-flex-row n-justify-between">
				<button class="hui" @click="zhuxiao">继续注销</button>
				<button class="lan" @click="back">暂不注销</button>
			</view>
		</view>
		<u-modal v-model="show" confirm-color="#00DAD9" confirm-text="确认注销" :show-cancel-button="true" content="账号一经注销无法挽回! 清谨慎操作!"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:'注销',
				checked:false,
				show:false,
			}
		},
		methods: {
			zhuxiao(){
				if(!this.checked){
					this.$tip.tip('请勾选且同意注销')
					return
				}
				this.show = true
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
.box{
	padding: 20rpx;
	box-sizing: border-box;
}
.gao{
	height: 250rpx;
}
.btm{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 750rpx;
	padding: 20rpx;
	background-color: #fff;
	box-sizing: border-box;
}
.btns button{
	width: 45%;
	color: #fff;
	margin-top: 20rpx;
}
.hui{
	background-color: #E6E6E6;
}
.lan{
	background-color: #00DAD9;
}
</style>
