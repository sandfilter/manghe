<template>
	<view>
		<u-navbar title="我的团队">
			<view class="righttit" slot="right" @click="$.to('/pages/my/yaoqing')">
				邀请好友
			</view>
		</u-navbar>
		<view class="wrap">
			<view class="chengyuan">
				<view class="yi">团队成员：<text>{{renNum}}</text>人</view>
				<view class="yaoNum">邀请码：{{num}}</view>
			</view>

			<!-- <u-tabs :list="list" active-color="#10B0B0" bg-color="" :is-scroll="false" :current="current" @change="change"></u-tabs> -->
			<view class="box" v-if="!show">
				<view class="list" v-for="(item,idx) in dataList" :key="idx">
					<image :src="item.avatar" mode=""></image>
					{{item.nickname}}
				</view>
			</view>
			<u-empty text="暂无成员" margin-top="200" mode="list" :show="show"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '一级成员'
				}, {
					name: '二级成员'
				}],
				current: 0,
				cylist:[],//数据
				show:true,
				num:'',
				renNum:0,
				dataList:[]
			}
		},
		onLoad() {
			this.getData()
			this.num = uni.getStorageSync("userInfo").invitation
		},
		methods: {
			getData(){
				this.$http({
					url: "index.php/api/user/getTuand",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						if(res.data.data.length == 0){
							this.show = true
						}else{
							this.show = false
						}
						this.dataList = res.data.data
						this.renNum = res.data.data.length
					}else{
						this.show = true
					}
				
				}).catch(err => {});
			},
			change(index) {
				this.current = index;
				if(index == 0){
					if(this.data.frist.length>0){
						this.show = false
					}else{
						this.show = true
					}
					this.cylist = this.data.frist
					
				}else{
					if(this.data.two.length>0){
						this.show = false
					}else{
						this.show = true
					}
					this.cylist = this.data.two
				}
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #EDF5F5;
	}
	.righttit{
		margin-right: 20rpx;
	}
	.wrap{
		padding: 0 20rpx;
		box-sizing: border-box;
		 padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */ 	
		 padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */ 
	}
	.chengyuan{
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/tuanduiBg.jpg') no-repeat;
		width: 710rpx;
		height: 190rpx;
		background-size: 710rpx 192rpx;
		border-radius: 16rpx;
		margin: 20rpx 0;
		color: #fff;
		text-align: center;
		padding-top: 2rpx;
	}
	.chengyuan .yi{
		margin-top: 40rpx;
	}
	.chengyuan text{
		font-size: 38rpx;
	}
	.chengyuan .yaoNum{
		margin-top: 20rpx;
	}
	.box{
		margin: 20rpx 0;
		border-radius: 16rpx;
		background-color: #fff;
		padding: 1rpx 20rpx;
		box-sizing: border-box;
	}
	.box .list{
		margin: 20rpx 0;
	}
	.box .list image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 20rpx;
	}
</style>
