<template>
	<view>
		<u-navbar title="兑换"></u-navbar>
		<view class="goodsList">
			<view class="list">
				<view class="goods">
					<image :src="data.image" mode=""></image>
					<view class="info">
						<view class="tit">{{data.name}}</view>
						<!-- <view class="shengyu">剩余：1</view> -->
					</view>
				</view>
				<view class="tip">
					<view class="bi">
						兑换价格：<text>{{data.price}}</text>幸运币
					</view>
					<!-- <u-number-box v-model="value" min="1" @change="valChange"></u-number-box> -->
				</view>
			</view>
		</view>
		<view class="rule">
			<!-- <view class="tit">
				兑换规则
			</view> -->
			<rich-text :nodes="rule"></rich-text>
		</view>

		<view class="btm">
			<view class="btmbox">
				<view class="n-flex-row n-align-center">
					共1件 | 合计：<text class="bi"><text class="num">{{data.price}}</text>幸运币</text> <button @click="duihuan">立即兑换</button>
				</view>
			</view>
		</view>
		<!-- <view class="newagain">
			新人首次兑换，额外得重抽卡*1
		</view> -->
		<u-popup v-model="oneshow" mode="center">
			<view class="onebox">
				<view class="bg">
					<view class="tit">新人首次兑换得</view>
					<view class="num">重抽卡*1</view>
				</view>
				<view class="text">
					<view class="tip1">
						幸运币兑换根据市场成本变化，一经兑换无法撤销，请确认是否兑换？
					</view>
					<view class="btns">
						<view class="qu" @click="oneshow = false">取消</view>
						<view class="que" @click="success">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="show" @confirm="confirm" content="幸运币兑换根据市场成本变化，一经兑换无法撤销，请确认是否兑换？" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '1',
				oneshow: false,
				rule:'',
				data:'',
				show:false,
				id:'',
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getRule()
			this.data = uni.getStorageSync('dui')
			console.log(this.data);
		},
		methods: {
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			duihuan(){
				// this.oneshow = true
				this.show = true
			},
			success(){
				uni.navigateTo({
					url:'/pages/cangku/successduihuan'
				})
			},
			confirm(){
				this.$http({
					url: "index.php/api/user/exchange",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						id: this.id
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.$tip.tip("兑换成功")
						// uni.$emit('cang')
						uni.navigateBack()
						
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			getRule(){
				this.$http({
					url: "index.php/api/common/agreement",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						name: 'recharge_introduction'
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.rule = res.data.data.content
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

	.goodsList {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.goodsList .list {
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.goodsList .list .goods {
		display: flex;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #F3F3F3;
	}

	.goodsList .list .goods image {
		width: 150rpx;
		height: 150rpx;
		flex-shrink: 0;
	}

	.goods .info {
		margin-left: 20rpx;
		width: 100%;
	}

	.goods .info .shengyu {
		color: #999;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.tip {
		padding-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tip .bi {
		color: #F87A01;
		margin-top: 10rpx;
	}

	.tip .bi text {
		font-size: 34rpx;
		margin-right: 10rpx;
		font-weight: bold;
	}

	.rule {
		padding: 20rpx;
		background-color: #fff;
		margin: 0 auto;
		box-sizing: border-box;
		width: 710rpx;
	}

	.rule .tit {
		color: #999;
		font-size: 24rpx;
	}

	.btm {
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.btmbox {
		display: flex;
		justify-content: flex-end;
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* .btmbox text{
		font-size: 36rpx;
		font-weight: bold;
	} */
	.btmbox button {
		background-color: #00E1DB;
		color: #fff;
		margin-left: 20rpx;
		width: 250rpx;
	}

	.btmbox .bi {
		color: #F87A01;
	}

	.btmbox .num {
		font-size: 36rpx;
		font-weight: bold;
	}

	.newagain {
		position: fixed;
		left: 0;
		bottom: 180rpx;
		color: #21616A;
		background-image: linear-gradient(#8DE7EC, #e6ffff);
		border: 1rpx solid #D1FBFE;
		padding: 20rpx 40rpx;
		border-radius: 60rpx;
		box-shadow: 0 10rpx 30rpx #BFD7DB;
	}

	.onebox {
		width: 600rpx;
		background-color: #fff;
	}

	.onebox .bg {
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/pf.png') no-repeat;
		background-size: 100%;
		height: 270rpx;
		padding-top: 60rpx;
		padding-left: 40rpx;
		box-sizing: border-box;
	}

	.onebox .bg .tit {
		color: #63A8A6;
		font-size: 50rpx;
		font-family: 'myfont';
	}

	.onebox .bg .num {
		font-family: 'myfont';
		font-size: 60rpx;
		color: #EF662D;
	}

	.onebox .text {
		padding: 20rpx 50rpx;
		box-sizing: border-box;
	}

	.onebox .text .tip1 {
		color: #999;
	}

	.onebox .text .btns {
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
	}

	.onebox .text .btns view {
		padding: 25rpx 80rpx;
	}

	.onebox .text .btns .qu {
		background-color: #F2F2F2;
	}

	.onebox .text .btns .que {
		background-color: #6EDEDF;
	}
</style>
