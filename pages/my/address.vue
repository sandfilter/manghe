<template>
	<view class="addbox">
		<u-navbar title="地址管理"></u-navbar>
		<view class="addressList">
			<radio-group>
				<view class="list" v-for="(item,idx) in addList" :key="idx" @click="select(item.id)">
					<view class="info">
						<view class="name">
							{{item.name}} <text class="phone">{{item.mobile}}</text>
						</view>
						<view class="add">
							{{item.province + ' ' + item.city + ' ' + item.area + ' ' + item.detail}}
						</view>
					</view>
					<view class="setup n-flex-row n-justify-between n-align-center">
						<view>
							<radio style="transform:scale(0.8)" @click.native.stop="def(item)" color="#10B0B0"
								:checked="item.is_default == 1"></radio>
							<text style="font-size: 26rpx;">设为默认</text>
						</view>
						<view class="edit n-flex-row">
							<view class="text" @click.stop="$.to('/pages/my/addAddress?type=2&id='+item.id)">编辑</view>
							<view class="line"></view>
							<view class="text" @click.stop="del(item.id,idx)">删除</view>
						</view>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="" style="height: 200rpx;">

		</view>
		<button class="btn" @click="$.to('./addAddress?type=1')">+新增地址</button>
		<u-empty text="暂无收货地址" :show="show" margin-top="400" mode="address"></u-empty>
		<u-modal v-model="delshow" :show-cancel-button="true" @confirm="confirmDel" content="是否要删除该地址" confirm-text="删除"
			confirm-color="#fa3534"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addList: [],
				show: false,
				id: '',
				idx: '',
				delshow: false,
				state: '',
			}
		},
		onShow() {
			this.getList()
		},
		onLoad(option) {
			this.state = option.state
		},
		methods: {
			//选择地址
			select(id) {
				if (this.state != 1) {
					return
				}
				
				uni.navigateBack()
				setTimeout(() => {
					uni.$emit('changeAddress', id);
				},300)
			},
			getList() {
				this.$http({
					url: "index.php/api/user/myAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						if (res.data.data.length == 0) {
							this.show = true
						} else {
							this.show = false
						}
						this.addList = res.data.data
					} else {
						this.$tip.tip(res.data.msg)
						this.show = true
					}
				}).catch(err => {});
			},

			// 修改默认地址
			def(item) {
				console.log(item);
				if (item.is_default == 1) {
					return
				}
				this.$http({
					url: "index.php/api/user/editAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						name: item.name,
						mobile: item.mobile,
						province: item.province,
						city: item.city,
						area: item.area,
						detail: item.detail,
						is_default: 1,
						addressid: item.id
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("设置成功")
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},

			// 删除地址
			del(id, idx) {
				this.id = id
				this.idx = idx
				this.delshow = true
			},
			confirmDel() {
				this.$http({
					url: "index.php/api/user/deleteAddress",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						address_id: this.id
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("删除成功")
						this.addList.splice(this.idx, 1)
						if (this.addList.length == 0) {
							this.show = true
						}
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			}
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

	.addressList {
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.list {
		margin: 20rpx 0;
		background-color: #fff;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}

	.info {
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #ddd;
	}

	.info .phone {
		font-weight: bold;
		margin-left: 20rpx;
	}

	.info .add {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #999;
	}

	.setup {
		margin-top: 20rpx;
	}

	.edit .text {
		width: 90rpx;
		text-align: center;
		color: #999;
	}

	.line {
		width: 1rpx;
		height: 40rpx;
		border-left: 1rpx solid #999;
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
