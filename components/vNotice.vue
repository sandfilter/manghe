<template>
	<view class="v-notice" :style="{height:height+'px'}">
		<view class="my_icon" v-if="showIcon">
			<slot name="icon">
				<u-icon name="volume" style='color:red;'></u-icon>
			</slot>
		</view>
		<view class="notice">
			<view :animation="animationData" class="notice-content" id="noticeContent" ref="noticeContent">
				<view class="notice-item"  v-for="(item, index) in noticeList" :key="index" @tap="handleClickNotice(item)">
					<view class="my_card">
						<image :src="item.mhimage" :style="{width: (height-height/3)+'px',height:(height-height/3)+'px',marginRight: '10rpx'}"></image>
						<text>恭喜{{ item.username }} 开出了<text class="my_gaoliang">{{ item.mhgoodsname }}</text></text>
					</view>
					<!-- <view style="margin-top: 8rpx;" class="my_card" v-if="noticeList[index + 1]">
						<image :src="noticeList[index + 1].mhimage" :style="{width: (height-height/3)+'px',height:(height-height/3)+'px',marginRight: '10rpx'}"></image>
						<text>恭喜{{ noticeList[index + 1].username }} 开出了<text class="my_gaoliang">{{ noticeList[index + 1].mhgoodsname }}</text></text>
					</view> -->
					<!-- <view class="my_card">
						<image :src="item.mhimage" :style="{width: (height-height/3)+'px',height:(height-height/3)+'px',marginRight: '10rpx'}"></image>
						<text>恭喜{{ item.username }} 开出了<text class="my_gaoliang">{{ item.mhgoodsname }}</text></text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "notice-bar",
		data() {
			return {
				noticeList: [], // 通知列表
				animation: null, // 动画对象
				animationData: {},
				timer: null, // 定时器
				currentIndex: -400, // 当前通知索引
				childWidth: 0,
			};
		},
		props: {
			notices: {
				// 外部传入的通知列表
				type: Array,
				default: [],
			},
			// 是否无限滚动
			loop: {
				type: Boolean,
				default: false,
			},
			// 滚动速度
			speed: {
				type: Number,
				default: 0.5, // 步长为0.5
			},
			// 组件高度
			height: {
				type: [String, Number],
				default: "20", //每次移动的步长，较小的值将导致较慢的速度
			},
			// 是否显示图标
			showIcon: {
				type: Boolean,
				default: true,
			},
			// 每帧的间隔时间，约等于 1000ms / 240fps
			interval:{
				type: Number,
				default: 4.17,
			}
		},
		//监听列表 重置滚动
		watch: {
			notices: {
				handler: function(val, oldVal){
						this.initNoticeList();
				},
				deep: true
			},
		},
		mounted() {
				// this.destroy();
				// this.initNoticeList();
		},
		methods: {
			// 初始化通知列表
			initNoticeList() {
				this.destroy();
				this.noticeList = this.notices;
				console.log(this.noticeList, '-----------------')
				this.animation = uni.createAnimation({
					duration: 0,
					timingFunction: "linear",
				});
				this.$nextTick(()=>{
					if (this.noticeList.length > 0) {
						this.timer = setInterval(() => {
							this.handleScrollNotice();
						}, this.interval);
					}
				})
			},
			// 点击通知时触发
			handleClickNotice(item) {
				this.$emit("click", item);
			},
			// 滚动通知
			handleScrollNotice() {
				if(this.loop){
					let query = null;
					try{
						query = uni.createSelectorQuery()
					}catch(e){}
					if(!query) return;
					query.selectAll('.notice-item').fields({
								rect:true,   //是否返回节点布局位置信息{left,top,right,bottom}
								size:true,  //是否返回节点尺寸信息{width，height}
								scrollOffset:true //是否返回节点滚动信息{scrollLeft,scrollTop}
							},(res)=>{
								 if(!res.length) return
								 this.childWidth = res[0].width
								// console.log(res)
								//res 可以返回第一个参数对象中指定为true的相关信息
							}).exec(function(){
								//上述节点信息获取成功后执行的回调函数
							})
							
					if (this.currentIndex >= this.childWidth) {
						this.currentIndex = 0;
						let noticeListOneCopy = JSON.parse(JSON.stringify(this.noticeList[0]));
						this.noticeList = this.noticeList.slice(1);
						this.noticeList.push(noticeListOneCopy);
					}
				}
				this.currentIndex+=this.speed;
				this.animateScroll();
			},
			// 动画滚动
			animateScroll() {
				// 动画滚动
				this.animation.translateX(-this.currentIndex).step({
					duration: 0,
				});
				this.animationData = this.animation.export();

				// 不无限滚动时 只有一条时 并且滚动到最后一条时 销毁
				if (!this.loop && this.noticeList.length === 1 && this.currentIndex >= this.$refs.noticeContent.offsetWidth) {
					this.destroy();
				}
				
				// 无限滚动时 只有一条时 并且滚动到最后一条时 重置
				if(this.noticeList.length === 1 && this.loop && this.currentIndex >= this.childWidth){
					this.destroy();
					this.initNoticeList()
				}
			},

			// 销毁 重置
			destroy() {
				if (this.timer) {
					clearInterval(this.timer);
				}
				if (this.animation) {
					this.animation = null;
				}
				this.currentIndex = -400;
			},
		},
		destroyed() {
			this.destroy()
		},
	};
</script>

<style lang="scss" scoped>
.v-notice{
	width: 100%;
	display: flex;
	.my_icon{
		width: 8%;
		display: flex;
		align-items: center;
	}
}
	.notice {
		width: 100%;
		height: 100%;
		/* 组件高度，根据实际情况调整 */
		display: flex;
		align-items: center;
		overflow: hidden;
		
	}

	.notice-scroll {
		width: 100%;
		height: 100%;
	}

	.notice-content {
		height: 100%;
		display: flex;

	}

	.notice-item {
		// height: 40%;
		padding-left: 20rpx;
		white-space: nowrap;
		/* overflow: hidden; */
		text-overflow: ellipsis;
		padding-right: 100rpx;
		.my_card{
			height: 100%;
			display: flex;
			align-items: center;
			background-color: #303133;
			padding-left: 10rpx;
			padding-right: 20rpx;
			box-sizing: border-box;
			border-radius: 30rpx;
			color: aliceblue;
			font-size:12rpx;
			>image{
				border-radius: 50%;
			}
			.my_gaoliang{
				color: #ff9900;
			}
		}
	}
</style>