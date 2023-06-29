<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<view class="wrap">
			<view class="top">
				<view>
					<view class="tit">
						{{sta == 1?'幸运币总额':'星石总额'}}
					</view>
					<view class="num">
						{{num}}
					</view>
				</view>
			</view>

			<view class="billbox">
				<view class="title">{{sta == 1?'幸运币':'星石'}}获取记录</view>
			</view>
			
			<view class="billList">
				<view class="list" v-for="(item,idx) in list" :key="idx">
					<view class="tit">{{item.create_time}}</view>
					<view class="bill n-flex-row n-justify-between">
						<view>{{item.status}}</view>
						<view class="shu">{{item.change>0?'+'+item.change:item.change}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-empty text="暂无记录" mode="list" :show="show" margin-top="200"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				page: 1,
				sta: '',
				num: '0',
				list:[],
				show:true,
			}
		},
		// 触底
		onReachBottom() {
			if (this.list.length < this.page * 10) {
				return
			}
			this.page++;
			if(this.sta == 1){
				this.getbi()
			}else{
				this.getShi()
			}
			console.log("触底");
		},
		onLoad(option) {
			this.sta = option.sta
			if (option.sta == 1) {
				this.title = "幸运币"
				this.getbi()
			} else {
				this.title = "星石"
				this.getShi()
			}
		},

		methods: {
			getbi() {
				this.$http({
					url: "index.php/api/user/myCoin",
					header: {
						"Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						page: this.page
					}
				}).then(res => {
					console.log(res, '');
					if (res.data.code == 1) {
						if(res.data.data.record.length == 0){
							this.show = true
						}else{
							this.show = false
						}
						res.data.data.record.forEach(item => {
							item.change = item.after - item.before
						})
						this.list = this.list.concat(res.data.data.record);
						this.num = res.data.data.balance
						
					}
				}).catch(err => {});
			},
			getShi() {
				this.$http({
					url: "index.php/api/user/myBalance",
					header: {
						"Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						page: this.page
					}
				}).then(res => {
					console.log(res, '');
					if (res.data.code == 1) {
						if(res.data.data.record.length == 0){
							this.show = true
						}else{
							this.show = false
						}
						res.data.data.record.forEach(item => {
							item.create_time = item.addtime
							// item.coin = item.money
							item.change = item.aftermoney - item.beforemoney
						})
						this.list = this.list.concat(res.data.data.record);
						this.num = res.data.data.balance
					}
				}).catch(err => {});
			},
		}
	}
</script>

<style>
	page {
		background-color: #F3F8FC;
	}

	.wrap {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.top {
		background: url(https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/qh.png);
		background-size: 100%;
		display: flex;
		align-items: center;
		text-align: center;
		height: 200rpx;
		justify-content: center;
		color: #fff;
	}

	.num {
		font-weight: bold;
		font-size: 46rpx;
		margin-top: 20rpx;
	}

	.billbox {
		margin-top: 20rpx;
	}
	.billList .list{
		margin-top: 10rpx;
		background-color: #fff;
		border-radius: 4rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.list .tit{
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #efefef;
	}
	.bill{
		padding: 30rpx 0 10rpx;
	}
	.bill .shu{
		color: #05B2B5;
		font-weight: bold;
	}
</style>
