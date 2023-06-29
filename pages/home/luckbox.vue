<template>
	<view class="wrap">

		<view class="luckbox">
			<view class="ranks">
				<view v-if="num != 1" class="list" v-for="(item,idx1) in num" :key="idx1">
					<text>{{idx1+1}}</text>
					<image v-if="idx > idx1" :src="jieguo[idx1].images" mode=""></image>
				</view>
			</view>
			<view class="cbox1">
				<view class="item_contents">
					<view class="cons_list">
						<scroll-view scroll-x="true" class="scroll_list">
							<view class="lists_cons" :style="{transform: 'translateX('+moveX+'rpx)',transition: miao+'s ease-in-out'}">
								<block v-for="(item,index) in goodsDetails" :key="index">
									<view :id='item.goods_id' class="detalis" :style="{background:'url('+item.bg+')'}">
										<image :src="item.image" mode=""></image>
										<view class="tit">
											{{item.goods_name}}
										</view>

										<view class="price">
											￥{{item.goods_pirce}}
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
					</view>
					<!-- <view class="cons_list_mask"></view> -->
				</view>
			</view>

			<view class="di">
				<view class="stoppic">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/stop.png" mode="widthFix"></image>
					<text>{{daojishi}}</text>
				</view>
			</view>

			<view class="kai" @click="kaiqi">一键开启</view>
		</view>

		<u-popup v-model="show" mode="center">
			<view class="result" :style="{'background':'url('+bgurl+')','backgroundSize':'100% 100%'}">
				<u-navbar :custom-back="back" :immersive="true" back-icon-color="#fff" :border-bottom="false"
					:background="{'backgroundColor':''}" title=" "></u-navbar>
				<view class="rbox">
					<view class="tit">
						<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/cst.webp" mode="widthFix"></image>
					</view>
					<view class="goodsBox">
						<view class="cbox" :class="'c'+num">
							<view class="list" :style="{'background':'url('+item.bg+')'}" v-for="(item,idx) in jieguo"
								:key="idx">
								<image :src="item.images" mode=""></image>
								<view class="name" v-if="num != 10">
									{{item.goods_name}}
								</view>
								<view class="price">￥{{item.goods_pirce}}</view>
							</view>
						</view>
					</view>
					<view class="bottom" v-if="!isPay">
						<view class="btit" v-if="!isPay">*试玩结果仅供参考</view>
						<view class="btn" @click="jixu" v-if="istwo">
							继续开盒 x10
						</view>
						<view class="btn" @click="$.to('/pages/home/kaixiang?id='+boxId)" v-else>
							来发真的试试

						</view>
					</view>

					<view class="bottom" v-if="isPay">
						<view class="btit" v-if="!isPay">*试玩结果仅供参考</view>
						<view class="btn" @click="jixu" v-if="istwo">
							继续开盒 x10
						</view>
						<view class="btn" @click="shou" v-else>
							全部收下

						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>


</template>

<script>
	const chou = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/choujiang.mp3'
	const zhong = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/zhongjiang.mp3'
	const choumusic = uni.createInnerAudioContext();
	const zhongmusic = uni.createInnerAudioContext();
	export default {
		name: "horizontalScroll",
		data() {
			return {
				goodsDetails: [],
				winningId: '', //中奖id
				count: 5,
				winningIndex: 0, //中奖索引
				moveX: 0,

				miao:5,
				show: false,
				boxId: '',
				bgurl: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/csbg.webp', //抽奖背景
				boxUrl: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/cs.png', //抽奖商品背景
				muteBgMusic: true,
				num: '', //几抽
				idx: 0, //当前抽的第几发
				jieguo: [], //抽中的全部商品
				yichou: [], //当前已经抽到的商品
				daojishi: 5, //倒计时
				ding: '', //倒计时定时器
				isKai: false, //是否一键开启
				istwo: false, //是否有二抽
				isPay: false, //是否正式抽
				ooid: '',
				twoPay: {}, //支付二十抽全部数据
				endTime:'',
			}
		},
		watch: {
			goodsDetails: {
				handler(news) {
					this.preMove()
				},
				immediate: true
			}
		},
		
		onLoad(option) {
			console.log(option);
			// #ifdef H5
			if(option.ooid){
				this.boxId = option.boxid
				if (option.num == 20) {
					this.num = 10
					this.istwo = true
				} else {
					this.num = option.num
				}
				this.ooid = option.ooid
				this.isPay = true
				this.getData1(option.num)
				this.getBox(option.boxid)
			}
			// #endif
			choumusic.src = chou
			console.log(choumusic);
			zhongmusic.src = zhong
			uni.loadFontFace({
				family: 'myfont',
				source: 'url("https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/YouSheBiaoTiHei.ttf")',
			})
			uni.$on('cdata', (data) => {
				console.log(data, "数据接收");
				this.boxId = data.id
				if (data.num == 20) {
					this.num = 10
					this.istwo = true
				} else {
					this.num = data.num
				}
				this.isPay = false

				this.getData()
				this.getBox(data.id)
			})
			uni.$on('paydata', (data) => {
				console.log(data, '数据接收');
				this.boxId = data.id
				if (data.num == 20) {
					this.num = 10
					this.istwo = true
				} else {
					this.num = data.num
				}
				this.ooid = data.ooid
				this.isPay = true
				this.getData1(data.num)
				this.getBox(data.id)
			})
			uni.$on('kaidata', (data) => {
				console.log(data, "数据接收");
				this.boxId = data.boxfl_id
				this.num = 1
				this.isPay = true
				this.getData2(data.id)
				this.getBox(data.boxfl_id)
			})


		},
		onUnload() {
			uni.$off('cdata')
			uni.$off('paydata')
			uni.$off('kaidata')
		},
		methods: {
			back(){
				// history.back()
				uni.switchTab({
					url:'/pages/tabBar/home'
				})
			},
			shou(){
				uni.switchTab({
					url:'/pages/tabBar/cangku'
				})
			},
			getBox(id) {
				this.$http({
					url: "index.php/api/Box/getBoxShop",
					data: {
						id: id
					}
				}).then(res => {
					console.log(res);
					console.log(res,"商品");
					if (res.data.code == 1) {
						let data = res.data.data.shop
						
						let jia = []
						data.forEach((item, idx) => {
							jia.push({
								id: 10000 + idx,
								image: item.image,
								goods_name: item.goods_name,
								goods_pirce: item.goods_pirce,
								tag: item.tag
							})
						})
						let add = jia.concat()
						jia = jia.concat(data)
						if (jia.length < 40) {
							for (var i = 0; i < 40; i++) {
								if (jia.length >= 40) {
									break
								}
								jia.unshift(...add)
							}
						}
						jia = jia.concat(add)
						jia.forEach(item => {
							if (item.tag == 'legend') {
								item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/csgoodsbg.png'
							} else if (item.tag == 'supreme') {
								item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/ssgoodsbg.png'
							} else if (item.tag == 'rare') {
								item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/xygoodsbg.png'
							} else {
								item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/gjgoodsbg.png'
							}


						})
						console.log(jia,"处理数据");
						this.goodsDetails = jia

					}
				}).catch(err => {});
			},
			// 开始抽奖
			state() {
				console.log("开始抽奖");
				this.winningId = this.jieguo[this.idx].id
				console.log(this.winningId,"抽中的id");
				this.daojishi = 5
				this.preMove()
				choumusic.play();
				this.ding = setInterval(() => {
					this.daojishi -= 1
					if (this.daojishi <= 0) {
						this.daojishi = 0
					}
				}, 1000)
				this.end()
			},
			getData() {
				this.$http({
					url: "index.php/api/index/SgetOne",
					data: {
						boxid: this.boxId,
						num: this.num
					}
				}).then(res => {
					console.log(res, "抽中的商品");
					if (res.data.code == 1) {
						// this.jieguo = res.data.data
						// this.changeBg(res.data.data)
						this.changeBg(res.data.data)

					}
				}).catch(err => {});
			},
			getData1(num) {
				console.log(num, "几抽");
				this.$http({
					url: "index.php/api/index/getOne",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						ooid: this.ooid
					}
				}).then(res => {
					console.log(res, "抽中的商品");
					if (res.data.code == 1) {
						if (num == 20) {
							var data = res.data.data.data
							var one = data.slice(0, 10)
							var two = data.slice(10, 20)
							this.twoPay = {
								one: one,
								two: two
							}
							console.log(this.twoPay, '分开的数据');
							// this.jieguo = this.twoPay.one
							this.changeBg(this.twoPay.one)
						} else {
							// this.jieguo = res.data.data.data
							this.changeBg(res.data.data.data)
						}
						// console.log(this.jieguo,"抽中结果");

					}
				}).catch(err => {});
			},
			getData2(id) {
				this.$http({
					url: "index.php/api/index/getOnea",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						id: id
					}
				}).then(res => {
					console.log(res, "盲盒");
					if (res.data.code == 1) {
						this.changeBg(res.data.data.data)

					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			// 抽中商品换背景
			changeBg(data) {
				console.log(data, '换背景');
				data.forEach((item, idx) => {
					if (item.tag == 'legend') {
						item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/cs.png'
					} else if (item.tag == 'supreme') {
						item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/ss.png'
					} else if (item.tag == 'rare') {
						item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/xy.png'
					} else {
						item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/gj.png'
					}
				})
				this.jieguo = data
				console.log(this.jieguo,"结果");
				this.state()
			},
			end() {
				this.endTime = setTimeout(() => {
					clearInterval(this.ding)
					this.yichou = this.jieguo[this.idx]
					console.log(this.yichou,"一抽");
					choumusic.stop()
					zhongmusic.play()
					this.idx++
					if (this.idx >= (this.jieguo.length)) {
						this.show = true
						return
					}
					setTimeout(() => {
						this.miao = 0
						this.moveX = 0
					},900)
					if (!this.isKai) {
						
						setTimeout(() => {
							
							this.miao = 5
							this.state()
						}, 1000)
					}
				}, 5000)
			},
			
			// 一键开启
			kaiqi() {
				choumusic.stop()
				zhongmusic.play()
				this.isKai = true
				this.daojishi = 0
				this.$forceUpdate()
				this.show = true
			},
			
			// 二十发二次开盒
			jixu() {
				this.miao = 0
				this.moveX = 0
				clearTimeout(this.endTime)
				this.num = 10
				this.istwo = false
				this.idx = 0
				this.jieguo = []
				this.yichou = []
				this.daojishi = 5
				this.isKai = false
				clearInterval(this.ding)
				setTimeout(() => {
					this.miao = 5
					if (this.isPay) {
						this.jieguo = this.twoPay.two
						this.changeBg(this.twoPay.two)
					} else {
						this.getData()
					}
					// this.getBox(this.boxId)
					this.show = false
				},300)
			},

			// 拿到数据之后执行 需要保证中奖数据不在最后5条中
			preMove() {
				this.winningIndex = this.goodsDetails.findIndex(item => item.id == this.winningId)
				const randomNum = Math.floor(Math.random() * (260 - 120 + 1)) + 120; // 随机滚动补差数据确保滚动在中奖条目范围内
				console.log(this.winningIndex, 'this.winningIndex----')
				this.moveX = (-282 * this.winningIndex - 1) + randomNum + 50 //282 宽度258+右边距24
			},
		}
	}
</script>

<style scoped>
	.item_contents {
		width: 100%;
		background: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/ql.png') no-repeat;
		background-size: 100% 100%;
		padding-top: 182rpx;
		height: 662rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}

	.cons_list {
		display: inline-block;
		padding-left: 32rpx;
		box-sizing: border-box;
	}

	.scroll_list {
		width: 100%;
		height: 374rpx;

	}

	.lists_cons {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		
	}

	.detalis {
		width: 258rpx;
		height: 374rpx;
		margin-right: 24rpx;
		position: relative;
		background-size: 100% 100% !important;
		text-align: center;
	}

	.detalis image {
		width: 150rpx;
		height: 150rpx;
		margin-top: 80rpx;
	}

	.detalis .tit {
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-top: 10rpx;
		color: #fff;
		font-size: 24rpx;
		padding: 0 16rpx;
	}
	

	.detalis .price {
		color: #fff;
		margin-top: 10rpx;
		font-family: 'myfont';
	}

	/* ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	} */


	.cons_list_mask {
		width: 100%;
		height: 662rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0);
	}
</style>
<style>
	@import url("../../static/css/luckbox.css");
</style>
