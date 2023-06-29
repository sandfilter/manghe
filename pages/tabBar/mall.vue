<template>
	<view>
		<u-navbar :is-back="false" height='64'  :border-bottom="false" safeAreaInsetTop :background="background" title=" ">
			<view class="slot-wrap">
				<view>
					<view class="title n-flex-row n-justify-between n-align-center">
						<view>
							<!-- <view class="tit">商城</view>
							<view class="text n-flex-row">
								<view>全新正品</view>
								<view class="line"></view>
								<view>精选好物</view>
								<view class="line"></view>
								<view>急速发货</view>
							</view> -->
						</view>
						<!-- <view style="text-align: center;" @click="$.to('/pages/mall/sort')">
							<view class="all">ALL</view>
							<view>分类</view>
						</view> -->
					</view>

					<!-- <view class="saixuan" v-if="saixuanShow">
						<view class="mybi">我的幸运币 <text>{{bi}}</text></view>
						
					</view> -->

				</view>

			</view>
		</u-navbar>

		<!-- <view class="banner">
			<u-swiper height="300" :list="bannerlist"></u-swiper>

		</view> -->

		<view class="menu n-flex-row n-wrap" styel='margin-top:12rpx;'>
		<!-- 	<view class="list" @click="$.to('/pages/my/qiandao')">
				<image src="../../static/image/qiandao.png" mode=""></image>
				<view>签到领盲盒</view>
			</view> -->
		
			<view class="list" v-for="(item,idx) in navList" :key="idx"
				@click="$.to('/pages/mall/list?id='+item.id+'&name='+item.flname)">
				<image :src="item.image" mode=""></image>
				<view>{{item.flname}}</view>
			</view>
		
		</view>
		<!-- <image :src="diPic" class="dipic" mode="widthFix"></image> -->
		<view class="goodsList">
					<view class="my_input">
						<u-input class="my_input_input" :clearable='false' v-model="inputClearValue" type="text" />
						<text class="my_input_txt" @click="onInput">{{inputFlag?"搜索":'清除'}}</text>
					</view>
	
							
				</view>
		<!-- <view class="goodsList">
		
<input style='border:1rpx solid #ccc;width: 100%;height: 32rpx;background-color: #ffffff;' confirm-type='search' class="uni-input" placeholder="带清除按钮的输入框" v-model="inputClearValue" @input="clearInput" />
<text  style='position: relative;
    top: -26px;
    left: 328px;'>搜索</text>

					
		</view> -->
		<!-- <image :src="diPic" class="dipic" mode="widthFix"></image> -->

		<view class="goodsList" >
			<view class="list" v-for="(item,idx) in goodsList" :key="idx" @click="details(item.id)">
				<view>
					<image :src="item.images" mode=""></image>
				</view>
				<view class="info">
					<view class="tit">
						{{item.goods_name}}
					</view>
					<view class="price">￥<text style="font-size: 34rpx;">{{item.pirce}}</text></view>
					<view class="bi">
						{{item.c_pirce}}幸运币
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					// background: "url(" + require('@/static/image/vo.webp') + ") no-repeat",
					background: "url(" + 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/shop_top.png' + ") no-repeat",
					backgroundSize: '100% auto',
					// #ifdef H5
					backgroundPositionY: '-70rpx',
					// #endif
					// #ifdef APP-PLUS
					backgroundPositionY: '-20rpx',
					// #endif
					//
				},
				inputClearValue:'',
				showClearIcon:false,
					inputFlag:true,
				//====
				// background: {

				// 	background: "url(" + require('@/static/image/vo.webp') + ") no-repeat",
				// 	backgroundSize: 'cover',

				// },
				navlist: [{
					name: '全部'
				}, {
					name: '0-4w'
				}, {
					name: '4-8w'
				}, {
					name: '8-20w'
				}, {
					name: '20-80w'
				}, {
					name: '80w以上'
				}],
				current: 0,
				bannerlist: [],
				saixuanShow: false,
				height: '67',
				goodsList: [],
				page: 1,
				navList: [],
				bi: '',
				diPic:'',
			}
		},
		onPageScroll(e) {
			if (e.scrollTop >= 300) {
				this.height = '145'
				this.saixuanShow = true
			} else {
				this.height = '67'
				this.saixuanShow = false
			}
		},
		// 触底
		onReachBottom() {
			if (this.goodsList.length < this.page * 10) {
				return
			}
			this.page++;
			this.getGoods()
		},
		onLoad() {
			this.getBanner()
			this.getNav()
			this.getGoods()
		},
		onShow() {
			this.getBi()
		},
		methods: {
			onInput(){
				this.goodsList=[]
							if(this.inputClearValue){
								this.$http({
									url: "index.php/api/shop/getShoplist",
									data: {
										p: this.page,
										keyword:this.inputClearValue
									}
								}).then(res => {
									console.log(res);
									if (res.data.code == 1) {
										var data = res.data.data
										data.forEach(item => {
											item.images = item.images[0]
										})
										this.goodsList = this.goodsList.concat(data);
										console.log(this.goodsList);
									}
								}).catch(err => {});
								this.inputFlag = !this.inputFlag
							}
							if(this.inputFlag){
								this.getGoods()
								this.inputClearValue = ''
							}
							
							
						},
			
			clearInput(e){
				this.showClearIcon=true
				// this.showClearIcon=true
				console.log(this.inputClearValue,'kkkkkk77889',this.showClearIcon,e)
			},
			getBanner() {
				this.$http({
					url: "index.php/api/shop/getBanner",
				}).then(res => {
					console.log(res,"轮播");
					if (res.data.code == 1) {
						this.bannerlist = res.data.data
						let pic
						let pic_index = 0;
						this.bannerlist.forEach(item => {
							
							if(item.tag == 'sczj'){
								this.bannerlist.splice(pic_index, 1)
								pic = item.image
								return
							}
							pic_index +=1;
						})
						this.diPic = pic
					}
				}).catch(err => {});
			},
			getNav() {
				this.$http({
					url: "index.php/api/shop/getShopsy",
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						if(res.data.data.length > 9){
							this.navList = res.data.data.slice(0,9)
						}else{
							this.navList = res.data.data
						}
						
					}
				}).catch(err => {});
			},
			getGoods() {
				this.$http({
					url: "index.php/api/shop/getShoplist",
					data: {
						p: this.page
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						var data = res.data.data
						data.forEach(item => {
							item.images = item.images[0]
						})
						this.goodsList = this.goodsList.concat(data);
						console.log(this.goodsList);
					}
				}).catch(err => {});
			},
			// 获取幸运币
			getBi() {
				this.bi = uni.getStorageSync('userInfo').score
			},
			change(idx) {
				this.current = idx;
			},
			details(id) {
				uni.navigateTo({
					url: '/pages/mall/goodsInfo?id=' + id
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	@import url("../../static/css/mall.css");
	::v-deep .u-navbar{
		width:100vw;
	}
	.menu{
		padding:12rpx 20rpx;
	}
	.uni-input{
		height: 56rpx !important;
		.uni-input-wrapper{
			height: 56rpx;
		}
	}
	.uni-input-placeholder{
		font-size:12rpx;
		padding-left:24rpx;
	}
	.my_input{
			width: 100%;
			display: flex;
			align-items: center;
			border-radius: 8rpx;
			background-color: white;
			padding-left: 20rpx;
			box-sizing: border-box;
			.my_input_input{
				width: 100%;
			}
			.my_input_txt{
				width: 80rpx;
			}
		}
		  ::v-deep .menu {
		  	    padding: 12rpx 20rpx !important;
		  	    margin: 12rpx 20rpx !important;
		  	}
</style>
