<template>
	<view>
		<u-navbar :background="background" :immersive="true" title=" " :border-bottom="false">
		</u-navbar>
		<u-swiper height="650" :autoplay="false" mode="number" indicator-pos="bottomRight" :list="info.image"></u-swiper>
		<view class="wrap">
			<view class="box">
				<view class="price n-flex-row n-justify-between n-align-center">
					<view class="qian">￥{{info.pirce}}</view>
					<view class="bi">{{info.c_pirce}}幸运币</view>
				</view>
				<view style="margin-top: 10rpx;font-size: 32rpx;">
					{{info.goods_name}}
				</view>
			</view>
			<!-- <view class="box">
				<view class="pai">
					<image src="../../static/image/se.webp" mode=""></image>
					映趣
				</view>
			</view> -->
			<view class="info">
				<view class="tit">
					商品详情
				</view>
				<rich-text :nodes="formatRichText(info.gooddetails)"></rich-text>
			</view>
		</view>

		<view class="gao"></view>

		<view class="btm">
			<view class="btmbox">
				<!-- #ifndef MP-WEIXIN -->
				<view class="kefu n-shrink-0" @click="lxkefu">
					<image src="../../static/image/m_.png" mode=""></image>
					<view>客服</view>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef MP-WEIXIN -->
				<button class="kefu kefubtn n-shrink-0" open-type="contact">
					<image src="../../static/image/m_.png" mode=""></image>
					<view>客服</view>
				</button>
				<!-- #endif -->
				
				<view class="btns">
					<button class="buy" @click="show = true;isBuy = true">直接购买</button>
					<button class="huan" @click="show = true;isBuy = false">立即兑换</button>
				</view>
			</view>
		</view>

		<u-popup v-model="show" @close="close" mode="bottom" :safe-area-inset-bottom="true">
			<view class="buybox">
				<view class="goods n-flex-row">
					<view class="picbox">
						<image :src="info.goodsPic" mode=""></image>
					</view>
					<view class="textbox">
						<view class="price" v-if="isBuy">￥<text>{{info.pirce}}</text></view>
						<view class="price" style="color: #FC7802;" v-else><text>{{info.c_pirce}}</text>幸运币</view>
						<view class="stock">库存：{{info.stock}}件</view>
					</view>
				</view>
				<!-- <view class="xinghao">
					<view class="tit">型号</view>
					<view class="xhList">
						<view class="list active">128GB</view>
						<view class="list">256GB</view>
						<view class="list">512GB</view>
					</view>
				</view> -->
				<view class="selectNum">
					<view class="">购买数量</view>
					<u-number-box v-model="num" :min="1" :max="info.stock" @change="valChange"></u-number-box>
				</view>
				<button class="buy btn" v-if="isBuy" @click="buy">立即购买</button>
				<button class="huan btn" v-else @click="dui">立即兑换</button>
			</view>
		</u-popup>
		<kefu :isShow='kfshow' ref="child" @cusEvent="hide"></kefu>
	</view>
</template>

<script>
	import kefu from '@/components/kefu.vue'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '',
				},
				show: false,
				num: 1,
				isBuy:true,
				id:'',
				info:'',
				kfshow:false,
				bi: 0,
			}
		},
		components: {
			kefu
		},
		onPageScroll(e) {
			if (e.scrollTop >= 150) {
				this.background.backgroundColor = "#fff"
			} else {
				this.background.backgroundColor = ""
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
			this.getBi()
		},
		methods: {
			hide() {
				this.kfshow = false
			},
			// 联系客服
			lxkefu() {
				this.$refs.child.getKf()
				this.kfshow = true
			},
			buy(){
				var data = {
					type:1,
					id:this.info.id,
					image:this.info.goodsPic,
					name:this.info.goods_name,
					num:this.num,
					price:this.info.pirce,
					freight:this.info.freight
				}
				uni.setStorageSync('goods',data)
				uni.navigateTo({
					url:'/pages/mall/confirmOrder'
				})
			},
			getBi(){
				this.$http({
					url: "index.php/api/user/userinfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.bi = res.data.data.score
					}
				}).catch(err => {});
			},
			dui(){
				let total = this.info.c_pirce * this.num
				if(total > this.bi){
					this.$tip.tip("幸运币不足")
					return
				}
				var data = {
					type:2,
					id:this.info.id,
					image:this.info.goodsPic,
					name:this.info.goods_name,
					num:this.num,
					price:this.info.c_pirce,
					freight:this.info.freight
				}
				uni.setStorageSync('goods',data)
				uni.navigateTo({
					url:'/pages/mall/confirmOrder'
				})
			},
			getInfo(){
				this.$http({
					url: "index.php/api/shop/getShop",
					data: {
						sid:this.id
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.info = res.data.data
						this.info.goodsPic = this.info.image[0]
					}
				}).catch(err => {});
			},
			formatRichText(html) {
				if(!html){
					return
				}
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi,
						'width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="width:100%;height:auto;display:block;"');
				return newContent;
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			// 弹出层收起
			close(){
				this.num = 1
			}
		}
	}
</script>

<style>
	@import url("../../static/css/goodsInfo.css");

</style>
