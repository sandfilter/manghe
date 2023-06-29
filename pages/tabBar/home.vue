<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<u-navbar :is-back="false" :height="64" :border-bottom="false" :background="background" style="background-size: 100% 100%;" safeAreaInsetTop title=" ">
			<view class="slot-wrap">
				<view>
					<view class="title n-flex-row n-justify-between n-align-center">

						<view>

						</view>
					</view>
				</view>

			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<u-navbar :is-back="false" :height="77" :border-bottom="false" :background="background" style="background-size: 100% 100%;" safeAreaInsetTop title=" ">
			<view class="slot-wrap">
				<view>
					<view class="title n-flex-row n-justify-between n-align-center">

						<view>
						</view>
					</view>
				</view>

			</view>
		</u-navbar>
		<!-- #endif -->
		<view class="banner">
			<u-swiper height="300" :list="bannerlist"></u-swiper>
			<view class="my_home">
				<!-- <image class="my_image" src="../../static/image/qn.png" mode=""></image> -->

				<!-- <view class="my_swiper">
					<u-swiper :list="swiperList" height='300'></u-swiper>
				</view>
		 -->
				<div class="my_grid">
					<u-grid :col="4" :border='false'>
						<u-grid-item v-for="(item, index) in gridList" :key='index' bg-color='#F3F4F8' @click='chooseBox(item)'>
							<image class="my_grid_image" :src="item.icon"></image>
							<view class="grid-text">{{ item.name }}</view>
						</u-grid-item>
					</u-grid>
				</div>

				<view class="my_notice">
					<v-notice :notices="notices" loop :height="15"></v-notice>
				</view>

				<view class="my_tabs">
					<view>
						推荐盲盒
					</view>
					<!-- <v-tabs :list="tabsList" @change="tabsChange"></v-tabs> -->
				</view>

				<view class="my_list">
					<u-card class="my_list_card" margin="0rpx" padding="20" :head-style="{ display: 'none' }"
						v-for="(item, index) in boxData" :key='index' @click="lookbox(item.id)">
						<template slot="body">
							<view class="my_list_main">
								<image class="my_list_img" :src="item.box_banner_images"></image>
								<view class="my_list_item">
									<text class="my_list_title">{{ item.box_name }}</text>
									<text style='color:red;font-size: 18rpx;'>￥ <text>{{ item.price }}</text></text>
									<view>
										<!-- <text class="my_list_children_title">中奖率<text style='color:red;'>{{ item.probability_cs
										}}%</text></text> -->
										<view class="my_list_children">
											<v-swiper :list="item.mhgoods" width='100' height='100'></v-swiper>
										</view>
									</view>
								</view>
							</view>
						</template>
					</u-card>
				</view>


			</view>



		</view>
		<!--===================================================== -->
		<!-- <view class="bg"> -->

		<!-- 免费试玩 -->
		<!-- <image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/v5.png" class="free" mode="" @click="luckshow = true;isShiwan = true"> -->
		<!-- </image> -->
		<!-- 新手教程 -->
		<!-- <image src="../../static/image/sg.png" class="xinshou" mode="widthFix" @click="videoShow = true"></image> -->

		<!-- 优惠券弹窗 -->
		<u-popup v-model="couponshow" mode="center" :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0)' }">
			<view class="newPeopleBox">
				<view class="newmainBox">
					<scroll-view scroll-y class="youhuilist">
						<view class="youhuibox" v-for="(item, idx) in couponList" :key="idx">
							<view class="left">
								<view>
									<view class="name">{{ item.couname }}</view>
									<view class="price1" v-if="item.typetag == 1">
										满{{ item.mzamount }}可用
									</view>
									<view class="price1" v-if="item.typetag == 0">
										<text class="pri">￥{{ item.amount }}</text>无门槛
									</view>

								</view>
							</view>
							<view class="right">
								<view>
									<view class="price">￥<text>{{ item.amount }}</text></view>
									<view class="ling" :class="item.status_a == 0 ? 'active' : 'yiling'"
										@click="receive(item.id, item.status_a, idx)">
										{{ item.status_a == 0 ? '领取' : '已领取' }}
									</view>

								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="btm">
					<!-- <image class="btmBg" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/rv.webp" mode="widthFix"></image> -->
					<view class="btn1">
						<!-- <image @click="receiveall" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/sd.png" mode="widthFix"></image> -->
					</view>
				</view>

				<view class="off">
					<!-- <image @click="couponshow = false" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/down.png" mode=""></image> -->
				</view>
			</view>

		</u-popup>
		<!-- 订单 -->


		<u-popup v-model="luckshow" mode="center">
			<view class="luckbox">
				<view class="top n-flex-row">
					<!-- <image class="titpic" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/lucktit.png" mode="widthFix"></image> -->
					<image v-if="boxData.length != 0" class="goodsPic" :src="boxData[swiperCurrent].box_banner_images"
						mode="widthFix"></image>
				</view>
				<view class="option">
					<view class="row">
						<view class="chou" @click="chou(1)">
							<view class="b">
								<view class="tit">一发入魂</view>
								<view v-if="!isShiwan">￥{{ boxPrice }}</view>
							</view>
						</view>
						<view class="chou" @click="chou(3)">
							<view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 3 * bi).toFixed(2) }}元</view>
							<view class="b">
								<view class="tit">欧气三连</view>
								<view v-if="!isShiwan">￥{{ ((boxPrice * 3) - boxPrice * 3 * bi).toFixed(2) }} <text class="yuanj">￥{{
									(boxPrice * 3).toFixed(2) }}</text> </view>
							</view>
						</view>
					</view>
					<view class="row">
						<view class="chou" @click="chou(5)">
							<view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 5 * bi).toFixed(2) }}元</view>
							<view class="b">
								<view class="tit">霸气五连</view>
								<view v-if="!isShiwan">￥{{ ((boxPrice * 5) - boxPrice * 5 * bi).toFixed(2) }} <text class="yuanj">￥{{
									boxPrice * 5 }}</text> </view>
							</view>
						</view>
						<view class="chou" @click="chou(10)">
							<view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 10 * bi).toFixed(2) }}元</view>
							<view class="b">
								<view class="tit">豪气十连</view>
								<view v-if="!isShiwan">￥{{ ((boxPrice * 10) - boxPrice * 10 * bi).toFixed(2) }} <text class="yuanj">￥{{
									boxPrice * 10 }}</text> </view>
							</view>
						</view>
					</view>
					<!-- <view class="shi" @click="chou(20)">
						<view class="jian" v-if="!isShiwan">限时减{{(boxPrice * 20 * bi).toFixed(2)}}元</view>
						<view class="b">
							<view class="tit">超凡二十连</view>
							<view v-if="!isShiwan">￥{{((boxPrice * 20) - boxPrice * 20 * bi).toFixed(2)}} <text class="yuanj">￥{{boxPrice * 20}}</text> </view>
						</view>
					</view> -->
				</view>
			</view>
		</u-popup>

		<u-popup v-model="ouhuangshow" mode="bottom">
			<view class="ouhuang">
				<view style="text-align: right;padding-right: 20rpx;">
					<u-icon @click="ouhuangshow = false" name="close-circle-fill" color="#ccc" size="55"></u-icon>
				</view>
				<scroll-view scroll-y class="scroll">
					<view class="listbox">
						<view class="list" v-for="(item, idx) in ouList" :key="idx">
							<view class="picbox" @click="lookbox(item.boxfl_id)">
								<image :src="item.activityimage_v" mode="aspectFill"></image>
								<view class="text n-flex-row n-justify-between">
									<view>{{ item.activityname }}</view>
									<u-icon name="arrow-right" label-pos="left" label="立即参与"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>

		<!-- </view> -->
		<u-popup v-model="sdkshow" mode="center" border-radius="16">
			<view class="cdkbox">
				<view class="tit">礼包码兑换</view>
				<u-input v-model="sdk" input-align="center" :border="true" placeholder="请输入礼包码" />
				<button @click="duihuan">确定</button>
			</view>
		</u-popup>
	</view>
</template>

<script>

// https://img.50api.cn/vx.tongbayun.v3/home1.png
import vNotice from '@/components/vNotice.vue'
import vTabs from '@/components/vTabs.vue'
import vSwiper from '@/components/vSwiper.vue'
import kefu from '@/components/kefu.vue'
import colorGradient from 'uview-ui/libs/function/colorGradient';
import prizeFlying from "@/components/prize-flying.vue"
export default {
	data() {
		return {
			isLogin: false,
			userInfo: '',
			sdkshow: false,
			sdk: '',
			count: 0, //消息角标
			height: '67',
			bannerlist: [],
			tabsList: [{ name: '全部' }],
			background: {
				// background: "url(" + require('@/static/image/vo.webp') + ") no-repeat",
				// background: "url(" + 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/main_top.png' + ") no-repeat",
				background: "url(" + require('@/static/image/headerBackGround.jpg') + ") no-repeat",
				// backgroundSize: 'cover',
				// backgroundRepeat: 'no-repeat',
				backgroundSize: '100% 100%',
				// #ifdef APP-PLUS
				// #endif

				// #ifdef H5
				backgroundSize: '100% auto',
				// backgroundPositionY: '-50rpx',

				// #endif
				overflow: "hidden"
			},

			gridList: [{
				icon: '/static/image/week.jpg',
				name: '每周签到'
			},
			{
				icon: '/static/image/dayday.jpg',
				name: '天天签到'
			},
			{
				icon: '/static/image/libao.jpg',
				name: '邀请有礼'
			},
			{
				icon: '/static/image/hongbao.jpg',
				name: '欧币红包'
			}
			],
			// 通知
			notices: [
				// {
				// 	userName:'微信*',
				// 	shoopName:'优胜美电',
				// 	url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
				// },
				// {
				// 	userName:'微信*',
				// 	shoopName:'优胜美电',
				// 	url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
				// },
				// {
				// 	userName:'微信*',
				// 	shoopName:'优胜美电',
				// 	url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
				// },
				// {
				// 	userName:'微信*',
				// 	shoopName:'优胜美电',
				// 	url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
				// },
			],
			// =============================
			currentCoupon: '', //当选择的优惠券
			Confirmed: '', //已确认的优惠券
			youhuiNum: '0',
			swiperCurrent: 0,
			couponshow: false, //优惠券弹窗
			daojushow: false, //道具卡弹窗
			isCard: true, //我的道具卡与使用规则切换
			videoShow: false, //视频弹窗
			orderShow: false, //订单弹窗
			videoSrc: '',
			muteBgMusic: true, //是否静音
			// #ifdef MP-WEIXIN || H5
			paymode: 'wechat',
			// #endif

			// #ifdef APP-PLUS
			paymode: 'alipay',
			// #endif
			xieyi: true,
			selectCoupon: false, //选择优惠券
			luckshow: false, //抽奖弹窗
			boxData: [],
			boxPrice: '0.00', //盲盒价格
			ouhuangshow: false, //欧皇弹窗
			ouList: [], //欧皇福利列表
			isShiwan: true, //是否试玩
			num: '', //几抽
			kfshow: false,
			couponList: [], //优惠券列表
			cardList: [], //道具卡
			cardShow: false,
			usedCoupon: [],
			tongList: [], //中奖通知
			tong: '',
			dings: '',
			maxYou: '', //最高优惠
			tanList: [], //弹窗列表
			tanShow: false,
			tanCon: '',
			tanidx: 0,
			bi: '', //连抽比率
			flyingKey: 0,
			xing: '', //星石
			diKou: 0, //抵扣星石数量
			boxName: '', //盲盒名称

			prizeList: [],
			flyLeftList: [],
			flyCenterList: [],
			flyRightList: [],
			indexRecord: 0, //记录奖品下标
			intervalTime: 2, //飞出频率 秒
			interval: null,
			flySpeed: 25, //飞行速度 秒 越小越快
		}
	},

	onLoad() {
		this.getBanner()
		this.getSmallList()
		// =========================================
		// this.getInfo()
		this.getManghe()
		this.getOuHuang()
		this.getvideo()
		this.getBi()
		uni.loadFontFace({
			family: 'myfont',
			// source: 'url("https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/YouSheBiaoTiHei.ttf")',
		})
		setInterval(() => {
			this.getTong()
		}, 30000)
	},
	computed: {
		prizeLength() {
			return this.prizeList.length
		}
	},
	destroyed() {
		//销毁
		clearInterval(this.interval)
	},
	components: {
		kefu,
		prizeFlying,
		vNotice,
		vTabs,
		vSwiper
	},
	// onShow() {
	// 	this.getCard()
	// },
	// onLoad(){
	// 	this.getSmallList()
	// },
	methods: {
		aa() {
			this.$music.playBgm({
				mute: true
			});
		},
		getSmallList() {
			this.$http({
				url: "index.php/api/index/getBoxlist",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
				// 'data: {
				// 	kahao: this.sdk
				// }'
			}).then(res => {
				console.log(res, 'jjjjj');
				if (res.data.code == 1) {
					this.notices = res.data.data
					console.log(this.notices, 'jjjjjnotices');
					// this.$tip.tip('兑换成功')
					// this.sdkshow = false
					// this.getUser();
				} else {
					this.$tip.tip(res.data.msg)
				}
			}).catch(err => { });
		},
		tabsChange(index) {
			this.current = index
		},
		duihuan() {
			if (this.sdk == "") {
				this.$tip.tip('请填写兑换码')
				return
			}
			this.$http({
				url: "index.php/api/user/getKami",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
				data: {
					kahao: this.sdk
				}
			}).then(res => {
				console.log(res);
				if (res.data.code == 1) {
					this.$tip.tip('兑换成功')
					this.sdkshow = false
					this.getUser();
				} else {
					this.$tip.tip(res.data.msg)
				}
			}).catch(err => { });
		},
		getUser() {
			this.$http({
				url: "index.php/api/user/userinfo",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				}
			}).then(res => {
				console.log(res);
				if (res.data.code == 1) {
					this.getLogin()
					this.userInfo = res.data.data
					console.log(this.userInfo);
					uni.setStorageSync('userInfo', res.data.data)
				}
			}).catch(err => { });
		},
		chooseBox(item) {
			console.log(item, 'item=======')
			if (item.name == "每周签到") {
				this.lingquan()
			} else if (item.name == "天天签到") {
				uni.navigateTo({
					url: '/pages/my/qiandao'
				})
			} else if (item.name == "欧币红包") {
				this.sdkshow = true
			} else if (item.name == "邀请有礼") {
				uni.navigateTo({
					url: '/pages/my/yaoqing'
				})
				// this.sdkshow = true
			}
		},
		getBanner() {
			this.$http({
				url: "index.php/api/shop/getBanner",
			}).then(res => {
				console.log(res, "轮播");
				if (res.data.code == 1) {
					this.bannerlist = res.data.data
					let pic
					let pic_index = 0;
					this.bannerlist.forEach(item => {

						if (item.tag == 'sczj') {
							this.bannerlist.splice(pic_index, 1)
							pic = item.image
							return
						}
						pic_index += 1;
					})
					this.diPic = pic
				}
			}).catch(err => { });
		},

		// ==========================================
		// 获取星石
		getXing() {
			this.$http({
				url: "index.php/api/user/userinfo",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				}
			}).then(res => {
				console.log(res);
				if (res.data.code == 1) {
					this.xing = res.data.data.money
					if (this.xing == 0) {
						return
					}
					var max = (this.boxPrice * this.num * 0.1).toFixed(2)
					if ((this.xing / 100) > max) {
						this.diKou = max
					} else {
						this.diKou = (this.xing / 100).toFixed(2)
						console.log(this.diKou);
					}

				}
			}).catch(err => { });
		},
		//加载奖品列表
		loadPrizeList() {
			console.log("掉用气泡");
			// if (!this.boxId) return
			this.$http({
				url: "index.php/api/Box/getBoxShop",
				data: {
					id: this.boxData[this.swiperCurrent].id
				}
			}).then(res => {
				console.log(res);
				if (res.data.code == 1) {
					this.prizeList = res.data.data.shop
					this.flyInterval()
				}
			}).catch(err => { });

			// this.$api.boximages({
			// 	box_id: this.boxId
			// }).then(({
			// 	data
			// }) => {
			// 	this.prizeList = data.goodsimagelist
			// 	this.flyInterval()
			// })
		},
		//循环
		flyInterval() {
			this.pushFlyList()
			this.interval = setInterval(() => {
				this.pushFlyList()
			}, this.intervalTime * 1000)
		},
		pushFlyList() {
			let count = 0
			while (count < 3) {
				if (this.indexRecord == this.prizeLength - 1) {
					this.indexRecord = 0
				} else {
					this.indexRecord++
				}
				let prize = this.prizeList[this.indexRecord]
				switch (count) {
					case 0:
						this.flyLeftList.push(prize)
						break
					case 1:
						this.flyCenterList.push(prize)
						break
					case 2:
						this.flyRightList.push(prize)
						break
				}
				count++
			}
		},
		flyStyle(prize) {
			return {
				background: `url(${prize.image})`,
				'-webkit-animation-duration': `${this.flySpeed}s`,
				'animation-duration': `${this.flySpeed}s`,
			}
		},





		// 获取连抽比率
		getBi() {
			this.$http({
				url: "index.php/api/box/getlcyh",
			}).then(res => {
				console.log(res, "bili");
				if (res.data.code == 1) {
					this.bi = res.data.data
				}
			}).catch(err => { });
		},
		tancancel() {
			this.tanShow = false
			this.tanidx += 1
			if (this.tanidx < this.tanList.length) {
				this.tanShow = true
			} else {
				return
			}
			this.tanCon = this.tanList[this.tanidx]
		},
		getTong() {
			clearTimeout(this.dings)
			this.$http({
				url: "index.php/api/index/getBoxlist",
			}).then(res => {
				if (res.data.code == 1) {
					// var arr = []

					// res.data.data.forEach(item => {
					// 	arr.push('恭喜 '+item.username+' 获得'+item.mhgoodsname)
					// })
					this.tongList = res.data.data
					this.tongz()
				}
			}).catch(err => { });
		},
		tongz() {
			if (this.tongList.length == 0) {
				return
			}
			var arr = this.$u.randomArray(this.tongList)
			arr.forEach(item => {
				item.text = '恭喜 ' + item.username + ' 获得' + item.mhgoodsname
				item.text = [item.text]
				if (item.tag == 'legend') {
					// item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/cstz.png'
				} else {
					// item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/sstz.png'
				}
			})
			this.tong = arr[0]
			this.dings = setTimeout(() => {
				this.tong = ""
			}, 4000)
		},
		lingquan() {
			this.couponshow = true
			this.getYouhui()
			this.getNotUsed()
		},
		// 选择优惠券
		selectCoupon1(val) {
			this.currentCoupon = val
		},
		// 确认选择优惠券
		confirmCoupon() {
			if (!this.currentCoupon) {
				uni.showToast({
					title: '请选择优惠券',
					icon: 'none'
				})
			}
			console.log(this.currentCoupon, "已选择");
			if (this.currentCoupon.typetag == 1) {
				if ((this.boxPrice * this.num) < this.currentCoupon.mzamount) {
					this.$tip.tip("该优惠券不可用")
					return
				}
			}
			this.Confirmed = this.currentCoupon
			this.youhuiNum = this.Confirmed.amount
			this.selectCoupon = false
		},
		goSelect() {
			this.selectCoupon = true
			this.getNotUsed()
		},
		// 获取未使用优惠券
		getNotUsed() {
			this.$http({
				url: "index.php/api/user/getCop",
				header: {
					"Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
			}).then(res => {
				console.log(res, '');
				if (res.data.code == 1) {
					this.usedCoupon = res.data.data
				} else {
					this.show = true
				}
			}).catch(err => { });
		},
		// 获取重抽卡
		getCard() {
			this.$http({
				url: "index.php/api/index/getCards",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
			}).then(res => {
				if (res.data.code == 1) {
					if (res.data.data.length == 0) {
						this.cardShow = true
					} else {
						this.cardShow = false
					}
					this.cardList = res.data.data
				} else {
					this.cardShow = true
				}
			}).catch(err => { });
		},
		// 领取全部优惠券
		receiveall() {
			let arr = []
			this.couponList.forEach(item => {
				if (item.status_a == 0) {
					arr.push(item.id)
				}
			})
			console.log(arr, "全部优惠券id");
			if (arr.length == 0) {
				return
			}
			this.$http({
				url: "index.php/api/index/receiveCoupon",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
				data: {
					cid: arr
				}
			}).then(res => {
				console.log(res, '领取全部优惠券')
				if (res.data.code == 1) {
					this.couponList.forEach(item => {
						item.status_a = 1
					})
					this.getNotUsed()
				} else {
					this.$tip.tip(res.data.msg)
				}
			}).catch(err => { });

		},
		// 领取单个优惠券
		receive(id, status_a, idx) {
			if (status_a == 1) {
				return
			}
			this.$http({
				url: "index.php/api/index/receiveCoupon",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
				data: {
					cid: id
				}
			}).then(res => {
				console.log(res, '领取单个优惠券')
				if (res.data.code == 1) {
					this.couponList[idx].status_a = 1
					this.getNotUsed()
				} else {
					this.$tip.tip(res.data.msg)
				}
			}).catch(err => { });


		},
		getYouhui() {
			this.$http({
				url: "index.php/api/index/getCoupon",
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				},
			}).then(res => {
				console.log(res, '优惠券');
				if (res.data.code == 1) {
					this.couponList = res.data.data
				}
			}).catch(err => { });
		},
		// 支付
		pay() {
			if (!this.xieyi) {
				this.$tip.tip("请阅读并同意协议")
				return
			}
			if (this.paymode == "") {
				this.$tip.tip("请选择支付方式")
				return
			}
			let price
			if (this.num == 1) {
				price = ((this.boxPrice * this.num) - this.youhuiNum - this.diKou).toFixed(2)
			} else {
				price = (((this.boxPrice * this.num) - (this.boxPrice * this.num * this.bi)) - this.youhuiNum - this
					.diKou).toFixed(
						2)
			}
			if (this.paymode == 'wechat') {

				this.$http({
					url: "index.php/api/index/goPay",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						boxid: this.boxData[this.swiperCurrent].id,
						num: this.num,
						payfs: this.paymode,
						price: price,
						xs: (this.diKou * 100).toFixed(0),
						// price: 0.01,
						// #ifdef H5
						terminal: 0,
						// #endif

						// #ifdef MP-WEIXIN
						terminal: 1,
						// #endif

						// #ifdef APP-PLUS
						terminal: 2,
						// #endif

					}
				}).then(res => {
					console.log(res);
					// #ifdef H5
					uni.navigateTo({
						url: '/pages/tabBar/pay'
					})
					setTimeout(() => {
						uni.$emit('h5pay', res.data)
					}, 600)
					// #endif
					if (res.data.code == 1) {
						// #ifdef MP-WEIXIN
						var data = res.data.data.data
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: data,
							appId: data.appId,
							timeStamp: data.timeStamp,
							nonceStr: data.nonceStr,
							package: data.package,
							signType: data.signType,
							paySign: data.paySign,
							success: (res1) => {
								this.$tip.tip("支付成功", "success")
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/home/luckbox'
									})
									console.log(res.data.data.ooid, 'ooid');
									setTimeout(() => {
										uni.$emit('paydata', {
											ooid: res.data.data.ooid,
											id: this.boxData[this
												.swiperCurrent].id,
											num: this.num
										})
									}, 600)
								}, 700)
							},
							fail: (err) => {
								this.$tip.tip("支付失败")
							}
						});
						// #endif
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => { });

			} else if (this.paymode == 'alipay') {
				// 支付宝支付
				this.$http({
					url: "index.php/api/index/goPay",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						boxid: this.boxData[this.swiperCurrent].id,
						num: this.num,
						payfs: this.paymode,
						price: price,
						xs: (this.diKou * 100).toFixed(0),
						// price: 0.01,
						// #ifdef H5
						terminal: 0,
						// #endif

						// #ifdef MP-WEIXIN
						terminal: 1,
						// #endif

						// #ifdef APP-PLUS
						terminal: 2,
						// #endif

					}
				}).then(res => {
					console.log(res.data);
					// #ifdef H5
					uni.navigateTo({
						url: '/pages/tabBar/pay'
					})
					setTimeout(() => {
						uni.$emit('h5pay', res.data)
					}, 600)
					// #endif
					if (res.data.code == 1) {
						// #ifdef APP-PLUS
						var data = res.data.data
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: data,
							success: (res1) => {
								this.$tip.tip("支付成功", "success")
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/home/luckbox'
									})
									setTimeout(() => {
										uni.$emit('paydata', {
											ooid: res.data.ooid,
											id: this.boxData[this
												.swiperCurrent].id,
											num: this.num
										})
									}, 600)
								}, 700)
							},
							fail: (err) => {
								this.$tip.tip("支付失败")
							}
						});
						// #endif
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => { });
			}
		},
		hide() {
			this.kfshow = false
		},
		// 联系客服
		lxkefu() {

			this.$refs.child.getKf()
			this.kfshow = true
		},
		// 查看盲盒
		lookbox(id) {
			uni.navigateTo({
				url: '/pages/home/kaixiang?id=' + id + '&music=' + this.muteBgMusic
			})
		},
		// 获取欧皇福利
		getOuHuang() {
			this.$http({
				url: "index.php/api/index/getHd",
			}).then(res => {
				console.log(res);
				if (res.data.code == 1) {
					let arr = []
					this.ouList = res.data.data
					this.ouList.forEach(item => {
						if (item.tcswitch == 1) {
							arr.push(item)
						}
					})
					if (arr.length != 0) {
						this.tanShow = true
						this.tanList = arr
						this.tanCon = arr[0]
					}
				}
			}).catch(err => { });
		},
		// 获取视频
		getvideo() {
			this.$http({
				url: "index.php/api/index/getSetting",
			}).then(res => {
				if (res.data.code == 1) {
					this.videoSrc = res.data.data.xsjc
				}
			}).catch(err => { });
		},
		// 获取盲盒
		getManghe() {
			this.$http({
				url: "index.php/api/Box/getBox",
			}).then(res => {
				console.log(res, "盲盒");
				if (res.data.code == 1) {
					this.boxData = res.data.data
					var images = ["http://bucket-manghe.oss-cn-beijing.aliyuncs.com/5e637ce5fa10f399e79db3157ae7035c.jpg"]
					var data = res.data.data
					this.boxData.mhgoods.push(images)
					console.log(this.boxData, '11111')
					this.boxPrice = this.boxData[0].price
					this.boxName = this.boxData[0].box_name
					this.maxYou = this.boxData[0].box_label
					//#ifdef MP-WEIXIN
					this.loadPrizeList()
					//#endif
					// 数据不够5自动添加
					if (this.boxData.length < 5) {
						for (var i = 0; i < 5; i++) {
							if (this.boxData.length >= 5) {
								return
							}
							this.boxData = this.boxData.concat(data)
						}
					}

				}
			}).catch(err => { });
		},

		choujiang() {
			this.luckshow = true
			this.isShiwan = false
		},
		chou(num) {
			this.num = num
			if (this.isShiwan == false) {
				this.getNotUsed()
				this.getXing()
				this.orderShow = true
			} else {
				uni.navigateTo({
					url: '/pages/home/luckbox'
				})

				setTimeout(() => {
					uni.$emit('cdata', {
						id: this.boxData[this.swiperCurrent].id,
						num: num
					})
				}, 600)

			}
			this.luckshow = false
		},
		// playMusic() {
		// 	this.muteBgMusic = !this.muteBgMusic;
		// },



		// 选择支付方式
		selectPay(mode) {
			this.paymode = mode
		},
		// 页面改变
		changeIdx(idx) {
			this.swiperCurrent = idx.detail.current
			this.boxPrice = this.boxData[this.swiperCurrent].price
			this.boxName = this.boxData[this.swiperCurrent].box_name
			this.maxYou = this.boxData[this.swiperCurrent].box_label
			this.flyingKey++
			// this.prizeList = []
			// this.flyLeftList = [],
			// this.flyCenterList = [],
			// this.flyRightList = [],
			// clearInterval(this.interval)
			// this.loadPrizeList()
		},
		prev() {
			this.swiperCurrent--
			if (this.swiperCurrent < 0) {
				this.swiperCurrent = this.boxData.length - 1
			}
		},
		next() {
			this.swiperCurrent++
			if (this.swiperCurrent >= this.boxData.length) {
				this.swiperCurrent = 0
			}
		},
		selectCard(id) {
			this.swiperCurrent = id
		},
		rulechange(index) {
			console.log(index);
		}
	},

	watch: {
		// muteBgMusic(newValue, oldValue) {
		// 	if (newValue) {
		// 		// 开启静音
		// 		this.$music.playBgm({
		// 			mute: false
		// 		});
		// 	} else {
		// 		// 关闭 静音
		// 		this.$music.playBgm({
		// 			mute: false
		// 		});
		// 	}
		// }
	},


}
</script>

<style>
@import url("../../static/css/home.css");
@import url("../../static/css/mall.css");
@import url("../../static/css/my.css");
</style>
<style lang="scss" scoped>
// ::v-deep .u-navbar{
// 	width:100vw;
// }
// page{
// 	padding-top: 40rpx;
// }
.prize-flying {
	z-index: 99;
	width: 200rpx;
	position: absolute;
	bottom: 50%;
	left: 50%;
	transform: translateX(-50%);

	.fly-prize {
		text-align: center;
		position: absolute;
		top: 100%;
		opacity: 0;
		width: 78rpx;
		height: 78rpx;
		// background-image: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/paopao.png') !important;
		background-repeat: no-repeat !important;
		background-size: 100% 100% !important;
		border-radius: 50%;
		background: #fff;
		// border: 1px solid #3277ff;
		padding: 14rpx;
		text-align: center;

		image {
			margin-top: 15%;
			width: 70%;
			height: 70%;
		}
	}

	.fly-left {
		left: 0px;
		z-index: 5;
		-webkit-animation: flyleft;
		animation: flyleft;
	}

	.fly-center {
		left: 60rpx;
		z-index: 3;
		-webkit-animation: flycenter;
		animation: flycenter;

	}

	.fly-right {
		right: 0px;
		z-index: 5;
		-webkit-animation: flyright;
		animation: flyright;
	}
}

// 动画
@keyframes flyleft {
	0% {
		// top: 100%;
		-webkit-transform: scale(0) translateX(0);
		transform: scale(0) translateX(0);
		opacity: .6;
	}

	3% {
		// top: 95%;
	}

	5% {
		-webkit-transform: scale(1) translateX(0) translateY(-80%);
		transform: scale(1) translateX(0) translateY(-80%);
		opacity: .8;
	}

	20% {
		opacity: 1;
	}

	30% {
		opacity: .2;
	}

	32% {
		opacity: 0;
		visibility: hidden;
	}

	50% {
		-webkit-transform: scale(1.9) translateX(-40px) translateY(-340%);
		transform: scale(1.9) translateX(-40px) translateY(-340%);
	}

	100% {
		// top: 0%;
		-webkit-transform: translateX(-100px);
		transform: translateX(-100px);
	}
}

@keyframes flycenter {
	0% {
		// top: 100%;
		-webkit-transform: scale(0) translateX(0);
		transform: scale(0) translateX(0);
		opacity: .6;
	}

	3% {
		// top: 95%;
	}

	5% {
		-webkit-transform: scale(1) translateX(0) translateY(-80%);
		transform: scale(1) translateX(0) translateY(-80%);
		opacity: .8;
	}

	20% {
		opacity: 1;
	}

	30% {
		opacity: .2;
	}

	32% {
		opacity: 0;
		visibility: hidden;
	}

	34% {
		opacity: 0;
	}

	50% {
		-webkit-transform: scale(1.9) translateX(0) translateY(-340%);
		transform: scale(1.9) translateX(0) translateY(-340%);
	}

	100% {
		// top: 0%;
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
}

@keyframes flyright {
	0% {
		// top: 100%;
		-webkit-transform: scale(0) translateX(0);
		transform: scale(0) translateX(0);
		opacity: .6;
	}


	3% {
		// top: 95%;
	}

	5% {
		-webkit-transform: scale(1) translateX(0) translateY(-80%);
		transform: scale(1) translateX(0) translateY(-80%);
		opacity: .8;
	}

	20% {
		opacity: 1;
	}

	30% {
		opacity: .2;
	}

	32% {
		opacity: 0;
		visibility: hidden;
	}

	34% {
		opacity: 0;
	}

	50% {
		-webkit-transform: scale(1.9) translateX(40px) translateY(-340%);
		transform: scale(1.9) translateX(40px) translateY(-340%);
	}

	100% {
		// top: 0%;
		-webkit-transform: translateX(100px);
		transform: translateX(100px);
	}
}

.my_home {
	min-height: 100vh;
	/* #ifdef H5 */
	min-height: calc(100vh - 50px);
	/* #endif */
	box-sizing: border-box;
	// padding: 0 20rpx;
	background-color: #F3F4F8;

	.my_image {
		width: 100%;
		height: 90rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.my_grid {
		width: 100%;

		.my_grid_image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 16rpx;
			margin-bottom: 10rpx;
		}
	}

	.my_list {
		width: 100%;
		margin-top: 20rpx;

		/* margin-bottom:24rpx !important; */
		.my_list_card {
			width: 690rpx;
			height: 300rpx;
			margin: 30rpx auto;
			border-radius: 10rpx;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			background-color: #fff;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 60rpx;
			background: url(https://img.50api.cn/vx.tongbayun.v3/home1.png) no-repeat;
			background-size: 690rpx 300rpx;
		}

		.my_list_main {
			width: 100%;
			height: 280rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.my_list_img {
				width: 160rpx;
				height: 160rpx;
				flex-shrink: 0;
				margin-right: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 16rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my_list_item {
				width: 100%;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-content: space-between;
				margin-left: 20rpx;

				.my_list_title {
					font-size: 26rpx;
					line-height: 28rpx;
					flex-shrink: 0;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-weight: bolder;
					color: #333;
				}

				.my_list_children {
					// margin-top: 20rpx;
					height: 80rpx;
					overflow: hidden;
				}

				.my_list_children_title {
					font-size: 18rpx;
					color: #999;
					margin-bottom: 10rpx;

					text {
						color: #ff9900;
					}
				}
			}
		}
	}
}
/deep/ .u-card__body{
	width: 100%;
}
.u-card {
	margin-bottom: 34rpx !important;
}

.my_notice {
	padding: 20rpx;
	box-sizing: border-box;
}
.my_tabs{
	display: flex;
	justify-content: center;
	view{
		width: 50%;
    border-bottom: 2rpx solid #666;
    text-align: center;
		font-size: 32rpx;
		line-height: 70rpx;
	}
}

.banner {
	background-color: #F3F4F8;
}
</style>
