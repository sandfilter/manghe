<template>
	<view>
		<u-navbar title="优惠券"></u-navbar>
		<!-- <view class="title">
			<view class="btn" :class="current == item.id?'active':''" @click="select(item.id)" v-for="(item,idx) in btnList" :key="idx"> {{item.name}}(1) </view>
		</view> -->
		<view class="youhuicon">
			<view class="couList" v-for="(item,idx) in list" :key="idx">
				<!-- <view class="l" :style="1?'background:#9c9c9c':'background:#63D7D6'"> -->
				<view class="l" style="'background:#63D7D6'">
					<view class="aa">
						<text class="pri">￥{{item.amount}}</text>
						<view class="tiao" v-if="item.typetag == 0">无门槛</view>
						<view class="tiao" v-if="item.typetag == 1">满{{item.mzamount}}减{{item.amount}}</view>
					</view>
				</view>
				<view class="r">
					<view class="ll">
						<view class="t" :style="1?'color:#999':'color:#333'">{{item.couname}}</view>
						<!-- <view class="use">可用</view> -->
						<view class="qi">有效期至 {{$u.timeFormat(item.end_time, 'yyyy-mm-dd hh:MM:ss')}}</view>
					</view>
					<view class="rr"></view>
				</view>
			</view>
		</view>
		<u-empty text="暂无优惠券" mode="coupon" :show="show" margin-top="400"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// current:0,
				// btnList: [{
				// 	id: 0,
				// 	name: '全部'
				// }, {
				// 	id: 1,
				// 	name: '满减券'
				// }, {
				// 	id: 2,
				// 	name: '无门槛券'
				// }],
				show:false,
				list: [],
			}
		},
		onLoad() {
			this.getList()
		},
		
		methods: {
			select(id) {
				this.current = id
			},
			getList() {
				this.$http({
					url: "index.php/api/user/getCop",
					header: {
						"Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					
				}).then(res => {
					console.log(res, '');
					if (res.data.code == 1) {
						if(res.data.data.length == 0){
							this.show = true
						}else{
							this.show = false
						}
						this.list = res.data.data
					}else{
						this.show = true
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

	.title {
		padding: 20rpx;
		display: flex;
	}

	.title .btn {
		padding: 5rpx 15rpx;
		margin-right: 20rpx;
		background-color: #E3E4E8;
		color: #909195;
		border-radius: 8rpx;
	}

	.title .active {
		background-color: #2AC2B3;
		color: #F4F4FC;
	}

	.youhuicon {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.no {
		text-align: center;
		margin-top: 100rpx;
		font-size: 38rpx;
	}

	.youhuicon .couList {
		display: flex;
		height: 160rpx;
		border-radius: 6rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.youhuicon .couList .l {
		flex-shrink: 0;
		width: 160rpx;
		height: 160rpx;
		background-color: #63D7D6;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.youhuicon .couList .l .aa {
		font-size: 30rpx;
		color: #fff;
	}

	.youhuicon .couList .l .pri {
		font-size: 46rpx;
		color: #fff;
		text-align: center;
	}

	.youhuicon .couList .l .tiao {
		color: #fff;
		text-align: center;
		font-size: 24rpx;
	}

	.youhuicon .couList .r {
		background-color: #fff;
		width: 100%;
		padding: 20rpx;
		height: 160rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.youhuicon .couList .r .ll .t {
		font-size: 32rpx;
	}

	.youhuicon .couList .r .use {
		margin: 8rpx 0;
	}

	.youhuicon .couList .r .qi {
		font-size: 24rpx;
		color: #999;
		margin-top: 20rpx;
	}
</style>
