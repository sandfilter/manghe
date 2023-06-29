<template>
	<view>
		<u-navbar :title="title" :border-bottom="false"></u-navbar>
	<!-- #ifndef H5 -->
		<zero-filter-bar ref="zeroFilterBar" selectColor="#00E1DB" :offsetTop="88" :extraBtn="false"
			:dataList="filterList" @filter='handleFilterItem'></zero-filter-bar>
		
		<!-- #endif -->
	<!-- #ifdef H5 -->
		<zero-filter-bar ref="zeroFilterBar" selectColor="#00E1DB" :offsetTop="44" :extraBtn="false"
			:dataList="filterList" @filter='handleFilterItem'></zero-filter-bar>
		<!-- #endif -->
		<view class="goodsList">
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
		<u-empty text="暂无商品" :show="show" mode="list" margin-top="400"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				filterList: [{
					id: 0,
					name: '综合',
				}, {
					id: 1,
					name: '价格',
					sort: true
				}, {
					id: 2,
					name: '幸运币',
					sort: true
				}],
				id:'',
				page:1,
				goodsList:[],
				index:0,
				desc:'',
				show:false,//是否为空数据
			}
		},
		onLoad(option) {
			this.title = option.name
			this.id = option.id
			this.getList(0,'')
		},
		// 触底
		onReachBottom() {
			if (this.goodsList.length < this.page * 10) {
				return
			}
			this.page++;
			this.getList(this.index,this.desc)
		},
		methods: {
			details(id) {
				uni.navigateTo({
					url: '/pages/mall/goodsInfo?id=' + id
				})
			},
			handleFilterItem(index, desc, item) {
				console.log(index, desc, item)
				this.page = 1
				this.index = index
				this.desc = desc
				if(index == 0){
					this.desc = ""
				}
				this.goodsList = []
				this.getList(this.index, this.desc)
			},
			getList(order,type){
				console.log(order,type);
				uni.showLoading({
					title:"加载中"
				})
				this.$http({
					url: "index.php/api/shop/getShops",
					data:{
						p:this.page,
						fid:this.id,
						order:order,
						type:type,
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					if (res.data.code == 1) {
						this.show = false
						var data = res.data.data
						data.forEach(item => {
							item.images = item.images[0]
						})
						this.goodsList = this.goodsList.concat(data);
					}else{
						this.show = true
					}
				}).catch(err => {});
			}
		}
	}
</script>

<style>
	page{
		background-color: #F3F8FC;
	}
.goodsList{
	background-color: #F3F8FC;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 20rpx;
	box-sizing: border-box;
}
.goodsList .list{
	margin-bottom: 20rpx;
	background-color: #fff;
	width: 345rpx;
	
}
.goodsList .list image{
	width: 345rpx;
	height: 345rpx;
}
.goodsList .list .info{
	padding: 20rpx;
	box-sizing: border-box;
}
.goodsList .list .info .tit{
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	line-height: 1.2;
	height: 64rpx;
}
.goodsList .list .info .price{
	margin: 8rpx 0;
	font-weight: bold;
	font-size: 26rpx;
}
.goodsList .list .info .bi{
	color: #E97B13;
	font-size: 28rpx;
}
</style>
