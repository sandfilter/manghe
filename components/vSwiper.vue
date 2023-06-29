<template>
    <view class="v-swiper" :class="{ 'v-swiper-small': size == 'small', 'v-swiper-normal': size == 'normal' }">
        <swiper :autoplay="autoplay" :circular='circular' :acceleration="acceleration" :interval="3000"
            :indicator-dots="false" indicator-color="#fff" indicator-active-color="#ff0000"
            :previous-margin="previousMargin" :next-margin="previousMargin">
            <template v-if="Object.prototype.toString.call(list) == '[object Array]'">
                <swiper-item v-for="(item, index) in list" :key="index" class="v-swiper-item">
                    <view class="v-swiper-image" @click='changes(item.id)'>
                        <image v-if='item.image' :src="item.image"></image>
                        <image v-if='item.goods_images' :src="item.goods_images"></image>
                    </view>
                </swiper-item>
            </template>
            <template v-if="Object.prototype.toString.call(list) == '[object Object]'">
				<!-- gj cs ss xy -->
                <swiper-item class="v-swiper-item" v-for="(child, indexChild) in list.gj" :index="indexChild">
                    <view class="v-swiper-image" @click='changes(child.id)'>
                        <view class="bg_image" :style="{ backgroundImage: `url(${bgImages['gj']})`,backgroundSize:'100% 100%' }">
                            <image :src="child.image"></image>
                        </view>
                    </view>
                </swiper-item>
				<swiper-item class="v-swiper-item" v-for="(child, indexChild) in list.cs" :index="indexChild">
				    <view class="v-swiper-image" @click='changes(child.id)'>
				        <view class="bg_image" :style="{ backgroundImage: `url(${bgImages['cs']})`,backgroundSize:'100% 100%' }">
				            <image :src="child.image"></image>
				        </view>
				    </view>
				</swiper-item>
				<swiper-item class="v-swiper-item" v-for="(child, indexChild) in list.ss" :index="indexChild">
				    <view class="v-swiper-image" @click='changes(child.id)'>
				        <view class="bg_image" :style="{ backgroundImage: `url(${bgImages['ss']})`,backgroundSize:'100% 100%' }">
				            <image :src="child.image"></image>
				        </view>
				    </view>
				</swiper-item>
				<swiper-item class="v-swiper-item" v-for="(child, indexChild) in list.xy" :index="indexChild">
				    <view class="v-swiper-image" @click='changes(child.id)'>
				        <view class="bg_image" :style="{ backgroundImage: `url(${bgImages['xy']})`,backgroundSize:'100% 100%' }">
				            <image :src="child.image"></image>
				        </view>
				    </view>
				</swiper-item>
            </template>
        </swiper>
    </view>
</template>
<script>
export default {
    props: {
        list: {
            type: [Array, Object],
            default() {
                return []
            }
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
        width: {
            type: [String, Number],
            default: "100%",
        },
        height: {
            type: [String, Number],
            default: "100%",
        },
        circular: {
            type: Boolean,
            default: true
        },
        acceleration: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "small"
        },
        previousMargin: {
            type: [String, Number],
            default: "0px"
        },

    },
    data() {
        return {
            current: 0,
            bgImages: {
				// cs: '/static/image/5⭐.png")', // 初始
				// gj: '/static/image/2⭐.png")', // 高级
				// gj: 'require("@/static/image/4⭐.png")' ,// 传说
				// xy:' require("@/static/image/3⭐.png")', // 稀有
				cs: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/5⭐.png', // 初始
				gj: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/2⭐.png', // 高级
				ss: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/4⭐.png', // 传说
				xy: 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/3⭐.png', // 稀有
			
				
				
				 
            }
        }
    },
    mounted() {
		console.log(this.bgImages,'list')
        console.log(Object.prototype.toString.call(this.list))
        console.log(this.list)
    },
    methods: {
        changes(item) {
            console.log(item, '00000000ooooiii')
            this.$emit('details', item)
        },
        change(index) {
            this.current = index
            this.$emit('change', index)
        }
    }
}
</script>
<style lang="scss" scoped>
.v-swiper-small {
    position: relative;
    width: 100%;
    height: 100%;

    .v-swiper-item {
        width: 30% !important;
        height: 100% !important;
    }

    .v-swiper-image {
        width: 100% !important;
        height: 100% !important;
        overflow: hidden;
        padding-right: 20rpx;

        image {
            width: 100%;
            height: 100%;
            border-radius: 16rpx;
        }

    }

    uni-swiper {
        width: 100% !important;
        height: 80rpx;
    }
}

.v-swiper-normal {
    height: 400rpx;


    .v-swiper-item {
        box-sizing: border-box;
        padding: 0 20px;
        .v-swiper-image{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

    uni-swiper {
        width: 100%;
        height: 100%;
    }

    .bg_image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        image {
            width: 160rpx;
            height: 160rpx;
            border-radius: 16rpx;
        }
    }
}
</style>