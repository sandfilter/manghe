<template>
	<view>
		<u-navbar title="签到"></u-navbar>
		<view class="top">
			<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/pf.png" mode="widthFix"></image>
			<view class="title">
				签到领好礼
			</view>
			<view class="rule" @click="show = true">
				签到规则
			</view>
		</view>
		<view class="qianbox">
			<view class="listbox">
				<view class="list" :class="idx < num?'active':''" v-for="(item,idx) in list" :key="idx">
					<view class="tit">
						<text>第{{idx+1}}天</text>
						<image src="../../static/image/qiantit.png" mode=""></image>
					</view>
					<view class="goods">
						<image src="../../static/image/y2.png" mode="widthFix"></image>
					</view>
					<view class="name">
						{{item.name}}星石
					</view>
					<view class="state">
						{{idx < num?'已领取':'未领取'}}
					</view>
				</view>
				<view class="qi list" :class="num == 7?'active':''">
					<view class="tit">
						<text>第7天</text>
						<image src="../../static/image/qiantit.png" mode=""></image>
					</view>
					<view class="qibox">
						<view class="goods">
							<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/box1.png" mode="widthFix"></image>
						</view>
						<view class="">
							<view class="name">
								随机赠送盲盒
							</view>
							<view class="state">
								{{num == 7?'已领取':'未领取'}}
							</view>
						</view>
					</view>


				</view>
			</view>
		</view>

		<view class="btn" @click="qian">
			点我签到
		</view>

		<u-popup v-model="show" mode="center" border-radius="16">
			<view class="rulebox">
				<view class="ruletit">签到领福利规则</view>
				<scroll-view class="scroll" scroll-y>
					<rich-text :nodes="data"></rich-text>
				</scroll-view>
				<view class="btn1" @click="show = false">
					确定
				</view>
			</view>

		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				data: '',
				num: '0',
				list: []
			}
		},
		onLoad() {
			if (!uni.getStorageSync("userInfo")) {
				uni.redirectTo({
					url: '/pages/my/login'
				})
			}
			uni.loadFontFace({
				family: 'myfont',
				source: 'url("https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/YouSheBiaoTiHei.ttf")',
			})

			this.getDat()
			this.getQian()
		},
		methods: {
			getQian() {
				this.$http({
					url: "index.php/api/user/getSign",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},

				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						if(res.data.data.sign != null){
							this.num = res.data.data.sign.count
							let data = res.data.data.signjl
							var arr = []
							console.log(data,"data");
							arr.push({name:data.sign_1},{name:data.sign_2},{name:data.sign_3},{name:data.sign_4},{name:data.sign_5},{name:data.sign_6})
							arr.forEach((item,idx) => {
								item.img = require('../../static/image/y2.png')
							})
							console.log(arr,'arr');
							this.list = arr
						}
						
						
					}
				}).catch(err => {});
			},
			qian() {
				// if(this.num == 1)
				this.$http({
					url: "index.php/api/user/signList",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},

				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip("签到成功")
						this.getQian()
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			getDat(type) {
				this.$http({
					url: "index.php/api/common/agreement",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						name: 'recharge_agreement'
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.data = res.data.data.content

					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/qiandao.css");
</style>
