<template>
    <view class="v-tabs">
        <view class="v-tabs__list">
            <view class="v-tabs__item" v-for="(item, index) in list" :key="index"
                :class="{ 'v-tabs__item--active': index === current }" @tap="change(index)">
                {{ item.name }}
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            current: 0
        }
    },
    methods: {
        change(index) {
            this.current = index
            this.$emit('change', index)
        }
    }
}
</script>
<style scoped>
.v-tabs {
    position: relative;
    width: 100%;
    /* height: 60rpx; */
    /* margin-top: 20rpx; */
	margin-bottom: 34rpx;
}
.v-tabs__list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    align-items: center;
}

.v-tabs__item {
	width: 120rpx;
    height: 100%;
    font-size: 18px;
    color: #999;
    margin-right: 30rpx;
    font-weight:bolder;
	text-align: center;
}
.v-tabs__item:nth-child(1){
	width: 100rpx;
	margin-right: 20rpx;
}

.v-tabs__item--active {
    color: #333;
    font-size: 20px;
    font-weight: bold;
    position: relative;
}
.v-tabs__item--active::after{
    content: '';
    display: block;
    width: 100%;
    height: 66rpx;
    background-image: url(@/static/image/active_tabs.svg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: -80%;
    left: 50%;
	z-index: 9999;
    transform: translateX(-50%);
}
</style>