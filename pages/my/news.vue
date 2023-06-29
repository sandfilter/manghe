<template>
	<view>
		<u-navbar title="系统消息">
			<!-- <view slot="right" class="yidu">
				<image src="../../static/image/qingchu.png" mode=""></image>
				一键已读
			</view> -->
		</u-navbar>
		<view class="box">
			<view class="list n-flex-row n-justify-between" v-for="(item,idx) in list" :key="idx" @click="$.to('/pages/my/newsDetails?id='+item.id)">
				<view class="left">
					<view class="tit">
						<!-- <view class="yuan"></view> -->
						<text>{{item.name}}</text>
					</view>
					<view class="con">
						{{item.jianjie}}
					</view>
				</view>
				
				<view class="time n-shrink-0">{{item.creattime}}</view>
			</view>
		</view>
		<u-empty text="暂无通知" :show="show" mode="message" margin-top="400"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				show:true,
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				this.$http({
					url: "/index.php/api/user/getNotices",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						let data = res.data.data
						if(data.length == 0){
							this.show = true
						}else{
							this.show = false
						}
						data.forEach(item => {
							item.creattime = this.$u.timeFormat(item.creattime, 'mm-dd hh:MM');
						})
						this.list = data
					} else {
						this.$tip.tip(res.data.msg)
						this.show = true
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
.yidu{
	color: #999;
	padding-right: 20rpx;
}
.yidu image{
	width: 40rpx;
	height: 40rpx;
	vertical-align: -10%;
	margin-right: 10rpx;
}
.box{
	padding: 20rpx;
	box-sizing: border-box;
}
.box .list{
	padding: 26rpx 0;
	border-bottom: 1rpx solid #EAEAEA;
}
.box .yuan{
	display: inline-block;
	width: 26rpx;
	height: 26rpx;
	border-radius: 50%;
	background-color: #FD322C;
	margin-right: 20rpx;
}
.box .con{
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	line-height: 1.2;
	color: #999;
	margin-top: 10rpx;
}
.box .time{
	color: #999;
}
</style>
