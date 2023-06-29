<template>
	<view>
		<u-navbar title="兑换成功"></u-navbar>
		<view class="jinbibox">
			<view>
				<view class="tit"> 兑换成功 </view>
				<view class="dangqian">当前幸运币</view>
				<view class="num">9999</view>
			</view>
		</view>
		<u-divider bg-color="">大家都在用幸运币兑换</u-divider>
		<view class="goodsList">
			<view class="list" v-for="(item,idx) in 10" :key="idx" @click="details">
				<view>
					<image src="" mode=""></image>
				</view>
				<view class="info">
					<view class="tit">
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
					</view>
					<view class="price">￥<text style="font-size: 34rpx;">11500</text></view>
					<view class="bi">
						1234幸运币
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view class="cardbox">
				<view class="tit jianbian">恭喜额外获得</view>
				<image class="card" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/xu.png" mode="widthFix"></image>
				<view class="chong jianbian">重抽卡*1</view>
				<view class="btn">
					开心收下(1)
				</view>
				<view class="fang">已放置个人账户</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #F4F4FC;
	}

	.jinbibox {
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/a14.png');
		width: 710rpx;
		margin: 20rpx auto;
		background-size: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		padding-left: 40rpx;
		box-sizing: border-box;
	}

	.jinbibox .tit {
		font-size: 30rpx;
		font-weight: bold;
	}

	.jinbibox .dangqian {
		font-size: 24rpx;
		margin: 10rpx 0;
	}

	.jinbibox .num {
		font-size: 40rpx;
		font-weight: bold;
	}

	.goodsList {
		background-color: #F3F8FC;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.goodsList .list {
		margin-bottom: 20rpx;
		background-color: #fff;
		width: 345rpx;

	}

	.goodsList .list image {
		width: 345rpx;
		height: 345rpx;
	}

	.goodsList .list .info {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.goodsList .list .info .tit {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 1.2;
		height: 64rpx;
	}

	.goodsList .list .info .price {
		margin: 8rpx 0;
		font-weight: bold;
		font-size: 26rpx;
	}

	.goodsList .list .info .bi {
		color: #E97B13;
		font-size: 28rpx;
	}
	.cardbox{
		text-align: center;
	}
	.cardbox .jianbian {
		background-image: linear-gradient(#fff, #C3FDFF);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		font-family: 'myfont';
	}
	.cardbox .tit{
		font-size: 70rpx;
	}
	.cardbox .card{
		width: 300rpx;
		margin: 30rpx 0;
	}
	.cardbox .chong{
		font-size: 55rpx;
	}
	.cardbox .btn{
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/a15.png') no-repeat;
		background-size: 100% 90rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #fff;
		margin-top: 40rpx;
		width: 400rpx;
	}
	.cardbox .fang{
		font-size: 22rpx;
		color: #e5e5e5;
		margin-top: 10rpx;
	}
</style>
