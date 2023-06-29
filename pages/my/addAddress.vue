<template>
	<view class="addbox">
		<u-navbar :title="title"></u-navbar>
		<view class="row">
			<u-field v-model="name" :border-bottom="false" label="收件人" placeholder="请填写收货人姓名">
			</u-field>
		</view>
		<view class="row">
			<u-field v-model="phone" type="number" :border-bottom="false" maxlength="11" label="手机号"
				placeholder="请填写手机号">
			</u-field>
		</view>
		<view class="row" @click="show = true">
			<u-field v-model="address" disabled right-icon="arrow-right" :border-bottom="false" label="所在地区"
				placeholder="点击选择地址">
			</u-field>
		</view>
		<view class="row">
			<u-field type="textarea" v-model="addressInfo" :border-bottom="false" label="详细地址"
				placeholder="详细的地址，如道路、小区、门牌号等">
			</u-field>
		</view>
		<view class="row">
			<u-field disabled :border-bottom="false" label="默认">
				<view slot="right" class="">
					<u-switch v-model="isdefault" active-color="#2AC2B3" inactive-color="#E6E6E6"></u-switch>
				</view>
			</u-field>
		</view>
		<button class="btn" @click="add" v-if="type == 1">保存地址</button>
		<button class="btn" @click="edit" v-else>修改地址</button>
		<u-picker mode="region" v-model="show" @confirm="confirm"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				name: '',
				phone: '',
				address: '',
				addressInfo: '',
				isdefault: false,
				show: false,
				province: '',
				city: '',
				area: '',
				id: '',
				type:'',
			}
		},
		onLoad(option) {
			this.type = option.type
			if (option.type == 1) {
				this.title = "新增地址"
			} else if (option.type == 2) {
				this.id = option.id
				this.getData()
				this.title = "地址编辑"
			}

		},
		methods: {
			getData() {
				this.$http({
					url: "index.php/api/user/getAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						addresid: this.id
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						let data = res.data.data
						this.name = data.name
						this.phone = data.mobile
						this.address = data.province + ' ' + data.city + ' ' + data.area
						this.addressInfo = data.detail
						this.isdefault = data.is_default == 1 ? true : false
					}
				}).catch(err => {});
			},
			edit() {
				this.$http({
					url: "index.php/api/user/editAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						name: this.name,
						mobile: this.phone,
						province: this.province,
						city: this.city,
						area: this.area,
						detail: this.addressInfo,
						is_default: this.isdefault ? '1' : '0',
						addressid:this.id
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("修改成功")
						setTimeout(() => {
							uni.navigateBack()
						}, 500)
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			add() {
				if (this.name == "") {
					this.$tip.tip("请输入姓名")
					return
				}
				if (this.$tip.phoneReg.test(this.phone) == false) {
					this.$tip.tip('请填写正确的手机号')
					return
				}
				if (this.address == "") {
					this.$tip.tip("请选择地址")
					return
				}
				if (this.addressInfo == "") {
					this.$tip.tip("请输入详细地址")
					return
				}
				this.$http({
					url: "index.php/api/user/addAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						name: this.name,
						mobile: this.phone,
						province: this.province,
						city: this.city,
						area: this.area,
						detail: this.addressInfo,
						is_default: this.isdefault ? '1' : '0'
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("添加成功")
						setTimeout(() => {
							uni.navigateBack()
						}, 500)
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			confirm(val) {
				this.address = val.province.label + ' ' + val.city.label + ' ' + val.area.label
				this.province = val.province.label
				this.city = val.city.label
				this.area = val.area.label
			},
		}
	}
</script>

<style>
	page {
		background-color: #F4F4FC;
	}

	.addbox {
		position: relative;
		min-height: 100vh;
	}

	.row {
		width: 710rpx;
		padding: 10rpx 0;
		background-color: #fff;
		margin: 20rpx auto;
		border-radius: 10rpx;
	}

	.btn {
		width: 710rpx;
		position: absolute;
		left: 20rpx;
		bottom: 40rpx;
		background-color: #2AC2B3;
		color: #fff;
	}
</style>
