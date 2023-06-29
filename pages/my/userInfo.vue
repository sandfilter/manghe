<template>
	<view>
		<u-navbar title="编辑个人资料"></u-navbar>
		<view class="box">
			<u-cell-group>
				<u-cell-item title="头像" :arrow="true" @click="upImg">
					<image slot="right-icon" class="head" :src="headImg" mode=""></image>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="box">
			<u-cell-group>
				<u-cell-item :arrow="false" title="ID" :value="userInfo.id"></u-cell-item>
				<u-cell-item :arrow="false" title="手机号码" :value="userInfo.mobile"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="box">
			<u-cell-group>
				<u-cell-item title="昵称" :value="userInfo.nickname" @click="$.to('./editInfo?state=1')"></u-cell-item>
				<u-cell-item title="电子邮箱" :value="userInfo.email" @click="$.to('./editInfo?state=2')"></u-cell-item>
				<u-cell-item title="性别" :value="gender" @click="gendershow = true"></u-cell-item>
				<u-cell-item title="生日" :value="time" @click="timeshow = true"></u-cell-item>
			</u-cell-group>
		</view>

		<u-action-sheet :list="genserlist" :safe-area-inset-bottom="true" @click="editgender" v-model="gendershow"></u-action-sheet>
		<u-picker v-model="timeshow" mode="time" confirm-color="#2AC2B3" confirm-text="保存" @confirm="confirmtime"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				genserlist: [{
					text: '男',
				}, {
					text: '女'
				}],
				gendershow:false,
				timeshow:false,
				gender:'未设置',
				time:'未设置',
				headImg:'',
				userInfo:'',
			}
		},
		onShow() {
			this.getUser()
		},
		onUnload() {
			uni.$emit('updataUser')
		},
		methods: {
			getUser(){
				this.userInfo = uni.getStorageSync('userInfo')
				this.headImg = this.userInfo.avatar
				this.gender = this.userInfo.gender == 0 ? '女':'男'
				this.time = this.userInfo.birthday || "未设置"
				console.log(this.userInfo);
			},
			// 修改性别
			editgender(val){
				this.gender = this.genserlist[val].text
				var gen = this.gender == "女"?'0':'1'
				this.$http({
					url: "index.php/api/user/changeInfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						gender:gen
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip('修改成功')
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			confirmtime(val){
				this.time = val.year + '-' + val.month + '-' + val.day
				this.$http({
					url: "index.php/api/user/changeInfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						birthday:this.time
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip('修改成功')
					}else{
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			// 上传头像
			upImg() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: (res) => {
						uni.showLoading({
							title: '图片上传中'
						});
						this.uploadImage(res.tempFilePaths)
					}

				})
			},
			uploadImage(tempFilePaths) {
				console.log(tempFilePaths);
				let _this = this;
				uni.uploadFile({
					url: this.$baseUrl.baseUrl + 'index.php/api/index/upload', //接口地址
					filePath: tempFilePaths[0],
					name: 'file',
					success: (res) => {
						let data = JSON.parse(res.data);
						console.log(data);
						this.headImg = data.data.url
						uni.hideLoading();
						this.upData(data.data.data,"")
					}
				});
			},
			
			upData(url){
				this.$http({
					url: "index.php/api/user/changeInfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						avatar:url
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip('修改成功')
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

	.box {
		background-color: #fff;
		margin: 20rpx auto;
		border-radius: 16rpx;
	}

	.head {
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
	}
</style>
