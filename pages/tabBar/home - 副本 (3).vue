<template>
	<view>
		<u-navbar :is-back="false" :height="height" :border-bottom="false" :background="background" title=" ">
			<view class="slot-wrap">
				<view>
					<view class="title n-flex-row n-justify-between n-align-center">
						<view>
							<view class="tit">商城</view>
							<view class="text n-flex-row">
								<view>全新正品</view>
								<view class="line"></view>
								<view>精选好物</view>
								<view class="line"></view>
								<view>急速发货</view>
							</view>
						</view>
						<view style="text-align: center;" @click="$.to('/pages/mall/sort')">
							<view class="all">ALL</view>
							<view>分类</view>
						</view>
					</view>

					<view class="saixuan" v-if="saixuanShow">
						<view class="mybi">我的幸运币 <text>{{bi}}</text></view>
						<!-- <view class="nav">
							<u-tabs :list="navlist" bg-color="" active-color="#01E0DB" inactive-color="#698286"
								:is-scroll="true" :current="current" @change="change"></u-tabs>
						</view> -->
					</view>

				</view>

			</view>
		</u-navbar>

		<view class="banner">
			<u-swiper height="300" :list="bannerlist"></u-swiper>
		</view>

		<!-- <view class="menu n-flex-row n-wrap"> -->
			
		<div class="my_grid">
			<u-grid :col="4" :border='false'>
				<u-grid-item v-for="(item,index) in navList" :key='index'>
					<image class="my_grid_image" :src="item.image"></image>
					<view class="grid-text">{{item.flname}}</view>
				</u-grid-item>
			</u-grid>
		</div>
		
			<!-- <view class="list" @click="$.to('/pages/my/qiandao')">
				<image src="../../static/image/qiandao.png" mode=""></image>
				<view>签到领盲盒</view>
			</view> -->
			<!-- <view class="list">
				<image src="../../static/image/libao.png" mode=""></image>
				<view>天天免费领</view>
			</view> -->
			<!-- <view class="list" v-for="(item,idx) in navList" :key="idx"
				@click="$.to('/pages/mall/list?id='+item.id+'&name='+item.flname)">
				<image :src="item.image" mode=""></image>
				<view>{{item.flname}}</view>
			</view> -->
			<!-- <view class="list">
				<image src="../../static/image/quan.png" mode=""></image>
				<view>包邮券</view>
			</view> -->
		<!-- </view> -->
		
		<!-- <image :src="diPic" class="dipic" mode="widthFix"></image> -->

		<view class="my_notice">
			<v-notice :notices="notices" loop :height="25"></v-notice>
		</view>
		
		<view class="my_tabs">
			<v-tabs :list="tabsList" @change="tabsChange"></v-tabs>
		</view>
		
		<view class="my_list">
			<u-card margin="0rpx" padding="20" :head-style="{display:'none'}" v-for="(item,index) in goodsList" :key='index'>
				<template slot="body">
					<view class="my_list_main" >
						<image :src="item.images"></image>
						<view class="my_list_item">
							<text class="my_list_title">{{ item.goods_name }}</text>
							<view class="price">￥<text style="font-size: 34rpx;">{{item.pirce}}</text></view>
							<view>
								<text class="my_list_children_title">距上次传说款已开<text>{{ item.number }}发</text></text>
								<view class="my_list_children">
									<v-swiper :list="item.children" width='100' height='100'></v-swiper>
								</view>
							</view>
						</view>
					</view>
				</template>
			</u-card>
		</view>

		<!-- <view class="goodsList">
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
		</view> -->

	</view>
</template>

<script>
	import vNotice from '@/components/vNotice.vue'
	import vTabs from '@/components/vTabs.vue'
	import vSwiper from '@/components/vSwiper.vue'
	export default {
		components:{
			vNotice,
			vTabs,
			vSwiper
		},
		data() {
			return {
				
				tabsList:[{name:'全部'},{name:'欧皇赏'},{name:'魔王赏'}],
				
				background: {
					background: "url(" + require('@/static/image/vo.webp') + ") no-repeat",
					backgroundSize: 'cover',
				},
				// 通知
				notices: [
					{
						userName:'微信*',
						shoopName:'优胜美电',
						url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
					},
					{
						userName:'微信*',
						shoopName:'优胜美电',
						url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
					},
					{
						userName:'微信*',
						shoopName:'优胜美电',
						url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
					},
					{
						userName:'微信*',
						shoopName:'优胜美电',
						url:'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
					},
				],
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
			this.getManghe()
		},
		onShow() {
			this.getBi()
		},
		methods: {
			tabsChange(index){
				this.current = index
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
					console.log(res,'-----------------');
					if(res.data.data){
						this.navList = res.data.data
					}
					// if (res.data.code == 1) {
					// 	if(res.data.data.length > 9){
					// 		this.navList = res.data.data.slice(0,9)
					// 	}else{
					// 		this.navList = res.data.data
					// 	}
						
					// }
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
						console.log(this.goodsList,'0000');
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
			// 获取盲盒
			getManghe() {
				this.$http({
					url: "index.php/api/Box/getBox",
				}).then(res=>{
					console.log(res,'；；；；；；；；；；；；')
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/mall.css");
	.my_grid {
		width: 100%;
		background-color: #fff;
		.my_grid_image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 16rpx;
			margin-bottom: 10rpx;
		}
	}
	.my_notice{
		padding: 20rpx;
		box-sizing: border-box;
	}
	.my_tabs{
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.my_list{
		width: 100%;
		margin-top: 20rpx;
		.my_list_main{
			width: 100%;
			height: 280rpx;
			display: flex;
			>image{
				width: 40%;
				height: 100%;
				border-radius: 16rpx;
			}
			.my_list_item{
				width: 60%;
				height: 100%;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-content: space-between;
				margin-left: 20rpx;
				.my_list_title{
					font-size: 18px;
					font-weight: bolder;
					color: #333;
				}
				.my_list_children{
					margin-top: 20rpx;
					height: 80rpx;
					overflow: hidden;
				}
				.my_list_children_title{
						font-size: 14px;
						color: #999;
						margin-bottom: 10rpx;
						text{
							color: #ff9900;
						}
					}
			}
		}
	}
</style>
