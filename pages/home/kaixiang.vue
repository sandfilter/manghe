<template>
	<view class='conter'>

		<u-navbar :is-back="false" height="60" title=" " :border-bottom="false" :background="{ backgroundColor: '' }">
			<view class="slot-wrap">
				<view>
					<image @click="back" src="../../static/image/back.png" mode=""></image>
				</view>
				<view class="right" style="position: relative;">
					<!-- <img src="../../static/image/xq.png" @click="$.to('/pages/my/agreement?type=play_rule')"></img> -->
					<uni-icons class="kxuIcon" type="help" size="30"
						@click="$.to('/pages/my/agreement?type=play_rule')"></uni-icons>
					<uni-icons class="kxuIcon" type="gift-filled" size="30" @click="gotocangku"></uni-icons>
					<uni-icons class="kxuIcon" type="paperplane" size="30" @click="$.to('/pages/my/yaoqing')"></uni-icons>
					<!-- <image src="../../static/image/kxsm.png" @click="$.to('/pages/my/agreement?type=play_rule')" mode="">
					</image>
					<image src="../../static/image/kxbox.png" @click="gotocangku" mode=""></image>
					<image src="../../static/image/kxexport.png"  @click="$.to('/pages/my/yaoqing')" mode=""></image> -->
					<!-- <button class="kefu" open-type="contact"></button>
					<image :class="muteBgMusic ? 'music stop' : 'music'"
						:src="muteBgMusic ? '../../static/image/ug.png' : '../../static/image/uh.png'" mode=""
						@click="playMusic"></image> -->
				</view>
			</view>
		</u-navbar>

		<view class="goods" :class="{ hide: !zIndexBool }">
			<kaix-swiper size="normal" previous-margin="150rpx" :autoplay="false" :list="fGoods" circular mode='none' />
		</view>
		<scroll-view @scroll="scrollChange" scroll-y="true" class="flex_scroll">
			<view class="my_btn">
				<view class="my_btn_item" :class="{ active: flags == true }" @click="aa">赏品一览</view>
				<view class="my_btn_item" :class="{ active: flags == false }" @click="bb">中赏记录</view>
			</view>
			<!-- <view class="my_btn">
				<view class="my_btn_item" @click="aa">
						
					<image v-show='flags == true' style='width: 100%;height: 100%;' src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/active-shangpin.jpg" alt=""></image>
					<image v-show='flags == false' style='width: 100%;height: 100%;' src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/white-shangpin.jpg" alt=""></image>
				</view>
				
				<view class="my_btn_item" @click="bb">
					<image v-show='flags == false' style='width: 100%;height: 100%;' src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/active-zhongshang.jpg"
						alt=""></image>
					<image v-show='flags == true' style='width: 100%;height: 100%;' src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/white-zhongshang.jpg" alt=""></image>
				</view>
			</view> -->
			<view class="my_list" v-show='flags == false'>
				<!-- 重伤记录 -->
				<view class='column-small' v-if='flags == false'>
					<!--  linear-gradient(to right, rgba(27, 201, 145, .1) 0%, rgba(0, 0, 0, 1) 50%, rgba(27, 201, 145, .1) 100%); -->
					<view class='small-box'
						:style="{ 'background': cuType == 'all' ? 'linear-gradient(to right, rgba(27, 201, 145, .1) 0%, rgba(0, 0, 0, 1) 50%, rgba(27, 201, 145, .1) 100%)' : '' }"
						@click='getRecordList("all")'>
						全部
					</view>
					<view class='small-box'
						:style="{ 'background': cuType == 'supreme' ? 'linear-gradient(to right, rgba(27, 201, 145, .1) 0%, rgba(0, 0, 0, 1) 50%, rgba(27, 201, 145, .1) 100%)' : '' }"
						@click='getRecordList("supreme")'>
						史诗
					</view>
					<view class='small-box'
						:style="{ 'background': cuType == 'legend' ? 'linear-gradient(to right, rgba(27, 201, 145, .1) 0%, rgba(0, 0, 0, 1) 50%, rgba(27, 201, 145, .1) 100%)' : '' }"
						@click='getRecordList("legend")'>
						传说
					</view>
					<view class='small-box'
						:style="{ 'background': cuType == 'rare' ? 'linear-gradient(to right, rgba(27, 201, 145, .1) 0%, rgba(0, 0, 0, 1) 50%, rgba(27, 201, 145, .1) 100%)' : '' }"
						@click='getRecordList("rare")'>
						稀有
					</view>
				</view>

				<view class='detail-content'>
					<view class='detail-box' v-for='(item, index) in recordList'>
						<view class='detail-img1'>
							<image class='detail-img1' :src='item.mhimage'></image>
						</view>
						<view class='detail-img2' v-if='item.tag == "supreme"'><img class='detail-img2'
								src='../../static/image/kxcs.png'></img></view>
						<view class='detail-img2' v-if='item.tag == "legend"'><img class='detail-img2'
								src='../../static/image/kxss.png'></img></view>
						<view class='detail-img2' v-if='item.tag == "rare"'><img class='detail-img2'
								src='../../static/image/kxxy.png'></img></view>
						<view class='detail-img2' v-if='item.tag == "normal"'><img class='detail-img2'
								src='../../static/image/kxgj.png'></img></view>
						<view class="detail-box-text1">{{ item.mhgoodsname }}</view>
						<view class='detail-img3'>
							<image class='detail-img3' :src='item.avatar'></image>
						</view>
						<view class="detail-box-text2">微信*</view>
					</view>

				</view>
			</view>
			<view class="my_list" v-show='flags == true'>
				<view class="my_mythic">
					<view class='my_list_title'>
						<!-- <view class="my_list_title_item" v-for="(item,index) in fGoods"> -->
						<view class="my_list_title_item">
							<view class="my_list_title_item_text" v-if='fGoods.cs.length'>
								<img v-if='fGoods.ss.length' style='width:128rpx;height:44rpx;' src='../../static/image/kxcs.png'></img>
								<view class="my_list_margin ratebg0">
									{{ boxInfo.probability_cs }}%
								</view>
							</view>
							<view class="my_list_title_item_text" v-if='fGoods.ss.length'>
								<img style='width:128rpx;height:44rpx;' src='../../static/image/kxss.png'></img>
								<view class="my_list_margin ratebg1">
									{{ boxInfo.probability_ss }}%
								</view>
							</view>
							<view class="my_list_title_item_text" v-if='fGoods.xy.length'>
								<img style='width:128rpx;height:44rpx;' src='../../static/image/kxxy.png'></img>
								<view class="my_list_margin ratebg2">
									{{ boxInfo.probability_xy }}%
								</view>
							</view>
							<view class="my_list_title_item_text">
								<img v-if='fGoods.gj.length' style='width:128rpx;height:44rpx;' src='../../static/image/kxgj.png'></img>
								<view class="my_list_margin ratebg3">
									{{ boxInfo.probability_gj }}%
								</view>
							</view>
						</view>
					</view>
					<view class="my_list_scrll">
						<template v-for="(item, index) in fGoods">
							<view class="my_list_scrll_item" v-for="(child, sIndex) in item">
								<view class="my_list_scrll_item_list">
									<image :src="child.image" @click="previewImage(child.image)"></image>
									<view class="my_list_scrll_item_list_text">{{ child.goods_name }}</view>
									<image class="mh-goods-rate" v-if='item == fGoods.cs' style='width:128rpx;height:44rpx;'
										src='../../static/image/kxcs.png'></image>
									<image class="mh-goods-rate" v-if='item == fGoods.ss' style='width:128rpx;height:44rpx;'
										src='../../static/image/kxss.png'></image>
									<image class="mh-goods-rate" v-if='item == fGoods.xy' style='width:128rpx;height:44rpx;'
										src='../../static/image/kxxy.png'></image>
									<image class="mh-goods-rate" v-if='item == fGoods.gj' style='width:128rpx;height:44rpx;'
										src='../../static/image/kxgj.png'></image>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>

			<view class="hei100"></view>
			<!-- 9999999999999999999 -->
			<image class="free" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/v5.png"
				@click="luckshow = true; isShiwan = true" mode="">
			</image>
			<!-- @click="luckshow = true; isShiwan = true" mode="" -->
			<!-- <view class="lunbo">
				<view class="dizuobox">
					<image class="dizuo" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/dizuo.png" mode="widthFix"></image>
					<text class="price">￥<text class="num">{{ goodsPrice }}</text></text>
				</view>
				<view class="numbox">
					<view class="num11">
						{{ swiperCurrent + 1 + '/' + boxList.length }}
					</view>
				</view>
			
			</view> -->

			<view class="info1">
				<!-- <view class="name">
					{{ name }}
				</view>
				<view class="price">
					<text class="red">
						￥<text class="num">{{ boxPrice }}</text>/个</text>
					<text class="del">￥99元/个</text>
				</view> -->
			</view>
		</scroll-view>

		<view class="btm">
			<view style="display: none;" class="haoyangmao" @click="goodsshow = true; getFgoods()">
				<!-- <view class="tit">
					<view>
						<text class="hao">薅羊毛</text>
						<text class="jia">100%必中价值<text>{{ min == max ? min : (min + '-' + max) }}</text>元</text>
					</view>
					<view class="n-flex-row n-justify-between">
						<view class="shuoming">真实概率/必中无空包/三件包邮/正品保障</view>
						<view class="lookAll">
							<text class="arrow">
								<u-icon color="#A2C2BD" name="arrow-left-double"></u-icon>
							</text>
							点击查看全部
						</view>
					</view>

				</view> -->
				<!-- ttt66 -->
				<!-- 	<view class="gailv">
					<view class="list">
						<image src="../../static/image/chuanshuo.png" mode=""></image>
						{{ boxInfo.probability_cs }}%
					</view>
					<view class="list">
						<image src="../../static/image/shisi.png" mode=""></image>
						{{ boxInfo.probability_ss }}%
					</view>
					<view class="list">
						<image src="../../static/image/xiyou.png" mode=""></image>
						{{ boxInfo.probability_xy }}%
					</view>
					<view class="list">
						<image src="../../static/image/gaoji.png" mode=""></image>
						{{ boxInfo.probability_gj }}%
					</view>

				</view> -->
				<!-- <swiper class="swiper" :autoplay="true" previous-margin="275rpx" next-margin="275rpx" :acceleration="true"
					:circular="true" :interval="1000" :duration="5000">
					<swiper-item v-for="(item, idx) in gunList" :key="idx">
						<view class="swiper-item">
							<image :src="item.image" mode=""></image>
							<view class="price">
								￥{{ item.goods_pirce }}
							</view>
						</view>
					</swiper-item>

				</swiper> -->
				<view class="tip">谢绝未成年人使用或在监护人的监督指导下体验</view>
			</view>
			<view class="btmbox" style='height: 120rpx;'>
				<view class="btmbox_item" @click="chou(1, 1)">一发入魂</view>
				<view class="btmbox_item" @click="chou(3, 1)">欧气三连</view>
				<view class="btmbox_item" @click="chou(5, 1)">霸气五连</view>
				<!-- <view class='btmbox-column' @click="chou(1,1)">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/one.jpg" alt="" style='width:140rpx;height: 60rpx;'></image>
				</view>
				<view class='btmbox-column' @click="chou(3,1)">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/two.jpg" alt="" style='width:140rpx;height: 60rpx;'></image>
				</view>
				<view class='btmbox-column' @click="chou(5,1)">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/three.jpg" alt="" style='width:140rpx;height: 60rpx;'></image>
				</view> -->

				<!-- <view class="left" @click="$.to('/pages/my/yaoqing')">
					<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/y6.png" mode=""></image>
					<view>分享有奖</view>
				</view> -->
				<!-- <view class="btn" @click="choujiang">
					<view class="biankuang">
						立即开盒
						<text></text>
						<text></text>
						<text></text>
						<text></text>
					</view>
				</view> -->

			</view>

		</view>

		<!-- 商品列表 -->
		<u-popup v-model="goodsshow" mode="bottom" border-radius="16" :safe-area-inset-bottom="true" :closeable="true">
			<view class="goodsbg">
				<view class="title">
					开盒必出以下宝贝之一
				</view>
				<view class="twotit">
					共{{ total }}款({{ xyTotal }}个稀有/史诗/传说)
				</view>
				<view class="jilv">
					<view class="list" @click="ding('cs')">
						<image src="../../static/image/kxcs.png" mode=""></image>
						<view class="num">
							{{ boxInfo.probability_cs }}%
						</view>
					</view>
					<view class="list" @click="ding('ss')">
						<image src="../../static/image/kxss.png" mode=""></image>
						<view class="num">
							{{ boxInfo.probability_ss }}%
						</view>
					</view>
					<view class="list" @click="ding('xy')">
						<image src="../../static/image/kxxy.png" mode=""></image>
						<view class="num">
							{{ boxInfo.probability_xy }}%
						</view>
					</view>
					<view class="list" @click="ding('gj')">
						<image src="../../static/image/kxgj.png" mode=""></image>
						<view class="num">
							{{ boxInfo.probability_gj }}%
						</view>
					</view>
				</view>

				<!-- <view class="pinzhi">
					传说
				</view> -->
				<scroll-view scroll-with-animation :scroll-into-view='dian' style="height: 800rpx;" scroll-y>
					<view class="goodsList">
						<view class="cs list" id="cs" v-for="(item, idx) in fGoods.cs" :key="item.id" @click="details(item.id)">
							<view class="dengbox">
								<image src="../../static/image/kxcs.png" class="dengji" mode="widthFix"></image>
							</view>
							<view>
								<image :src="item.image" mode=""></image>
							</view>
							<view class="info">
								<view class="tit">
									{{ item.goods_name }}
								</view>
								<view class="price">￥<text style="font-size: 34rpx;">{{ item.goods_pirce }}</text></view>
							</view>
						</view>

						<view class="ss list" id="ss" v-for="(item, idx) in fGoods.ss" :key="item.id" @click="details(item.id)">
							<view class="dengbox">
								<image src="../../static/image/kxss.png" class="dengji" mode="widthFix"></image>
							</view>
							<view>
								<image :src="item.image" mode=""></image>
							</view>
							<view class="info">
								<view class="tit">
									{{ item.goods_name }}
								</view>
								<view class="price">￥<text style="font-size: 34rpx;">{{ item.goods_pirce }}</text></view>
							</view>
						</view>

						<view class="xy list" id='xy' v-for="(item, idx) in fGoods.xy" :key="item.id" @click="details(item.id)">
							<view class="dengbox">
								<image src="../../static/image/kxxy.png" class="dengji" mode="widthFix"></image>
							</view>
							<view>
								<image :src="item.image" mode=""></image>
							</view>
							<view class="info">
								<view class="tit">
									{{ item.goods_name }}
								</view>
								<view class="price">￥<text style="font-size: 34rpx;">{{ item.goods_pirce }}</text></view>
							</view>
						</view>

						<view class="gj list" id="gj" v-for="(item, idx) in fGoods.gj" :key="item.id" @click="details(item.id)">
							<view class="dengbox">
								<image src="../../static/image/kxgj.png" class="dengji" mode="widthFix"></image>
							</view>
							<view>
								<image :src="item.image" mode=""></image>
							</view>
							<view class="info">
								<view class="tit">
									{{ item.goods_name }}
								</view>
								<view class="price">￥<text style="font-size: 34rpx;">{{ item.goods_pirce }}</text></view>
							</view>
						</view>
					</view>
				</scroll-view>


			</view>
		</u-popup>

		<!-- 商品详情 -->
		<u-popup v-model="infoshow" mode="bottom" height="1000" :safe-area-inset-bottom="true">
			<view class="infobg">
				<u-swiper height="650" :autoplay="false" mode="number" indicator-pos="bottomRight" :list="goodsDetails.image">
				</u-swiper>
				<view class="wrap">
					<view class="box">
						<view class="price n-flex-row n-justify-between n-align-center">
							<view class="qian">￥{{ goodsDetails.goods_pirce }}</view>
							<view class="bi">{{ goodsDetails.luckycoin }}幸运币</view>
						</view>
						<view style="margin-top: 10rpx;font-size: 32rpx;">
							{{ goodsDetails.goods_name }}
						</view>
					</view>
					<!-- <view class="box">
						<view class="pai">
							<image src="../../static/image/se.webp" mode=""></image>
							映趣
						</view>
					</view> -->
					<view class="info" v-if="goodsDetails.ms != null">
						<view class="tit">
							商品详情
						</view>
						<view class="infopic">
							<rich-text :nodes="formatRichText(goodsDetails.ms)"></rich-text>
						</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 订单 -->
		<u-popup v-model="orderShow" mode="bottom" :closeable="!selectCoupon">
			<view class="orderbox" v-if="!selectCoupon">
				<view class="tit">确认订单</view>
				<view class="con">
					<view class="box1">
						<view class="goods n-flex-row">
							<image :src="boxInfo.box_banner_images" mode="">
							</image>
							<view class="info">
								<view class="t">硬核潮品</view>
								<view class="two">
									<view class="price">￥{{ boxPrice }}</view>
									<view class="num">x{{ num }}</view>
								</view>
							</view>
						</view>
						<view v-if="usedCoupon.length != 0" @click="goSelect" class="rowitem n-flex-row n-justify-between"
							style="margin-top: 10rpx;">
							<view class="l">
								<image src="../../static/image/quanlogo.png" mode=""></image>
								优惠券
							</view>
							<u-icon label-pos="left" :label-color="youhuiNum == '0' ? '#999' : '#d81e06'" color="#999"
								name="arrow-right" :label="youhuiNum == '0' ? '未选择优惠券' : '-￥' + youhuiNum">
							</u-icon>
						</view>
						<view class="rowitem n-flex-row n-justify-between">
							<view class="l">
								<image src="../../static/image/y2.png" mode=""></image>
								星石
							</view>
							<view class="" style="color: #999;">
								{{ diKou == 0 ? '无可抵扣数量' : '使用' + (diKou * 100).toFixed(0) + '星石抵扣￥' + diKou }}</view>
							<!-- <u-icon label-pos="left" label-color="#d81e06" color="#999" name="arrow-right" label="-￥10"></u-icon> -->
						</view>
						<view class="total" v-if="youhuiNum > 0">
							共计优惠：<text>￥{{ youhuiNum }}</text>
						</view>
					</view>

					<view class="box1" style="margin-top: 20rpx;">
						<u-radio-group style="display: block;" width="34rpx" v-model="paymode" active-color="#70DDE0">
							<!-- #ifdef MP-WEIXIN || H5 -->
							<view class="rowitem payrow" @click="selectPay('wechat')">
								<view class="l">
									<image src="../../static/image/weixinf.png" mode=""></image>
									微信
								</view>
								<u-radio name="wechat"></u-radio>
							</view>
							<!-- #endif -->

							<!-- #ifdef APP-PLUS || H5 -->
							<view class="rowitem payrow" @click="selectPay('alipay')">
								<view class="l">
									<image src="../../static/image/zhifubao.png" mode=""></image>
									支付宝
								</view>
								<u-radio name="alipay"></u-radio>
							</view>
							<!-- #endif -->
						</u-radio-group>
					</view>
				</view>
				<view class="obtm">
					<button @click="pay" v-if="num == 1">立即支付<text>￥{{ ((boxPrice * num) - youhuiNum -
						diKou).toFixed(2) }}</text></button>
					<button @click="pay" v-else>立即支付<text>￥{{ (((boxPrice * num) - (boxPrice * num * bi)) - youhuiNum -
						diKou).toFixed(2) }}</text></button>
				</view>
				<view class="xieyi">
					<u-checkbox v-model="xieyi" shape="circle" active-color="#70DDE0" label-size="22">
						我已满18岁，已阅读并同意<text @click.stop="$.to('/pages/my/agreement?type=wfashuiming')">《支付服务协议》</text>
					</u-checkbox>
				</view>
			</view>

			<view class="syouhui" v-else>
				<view class="youtit">
					<view class="back" @click="selectCoupon = false">
						<u-icon size="40" name="arrow-left"></u-icon>
					</view>
					<view class="youhuit">
						优惠详情
					</view>
				</view>
				<view class="youhuicon">
					<scroll-view scroll-y class="shitu">
						<radio-group>
							<view class="couList" v-for="(item, idx) in usedCoupon" :key="idx" @click="selectCoupon1(item)">
								<view class="l">
									<view class="aa">
										￥<text class="pri">{{ item.amount }}</text>
										<view class="tiao" v-if="item.typetag == 0">无门槛</view>
										<view class="tiao" v-if="item.typetag == 1">满{{ item.mzamount }}减{{ item.amount }}
										</view>
									</view>
								</view>
								<view class="r">
									<view class="ll">
										<view class="t">{{ item.couname }}</view>
										<!-- <view class="use">可用</view> -->
										<view class="qi" style="margin-top: 20rpx;">有效期至
											{{ $u.timeFormat(item.end_time, 'yyyy-mm-dd hh:MM:ss') }}
										</view>
									</view>
									<view class="rr">
										<radio :value="item.id + ''" :checked="currentCoupon.id == item.id" color="#63D7D6"
											style="transform:scale(0.8)" />
									</view>
								</view>
							</view>
						</radio-group>
					</scroll-view>
					<view class="btn" @click="confirmCoupon">
						确认
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup v-model="luckshow" mode="center">
			<view class="luckbox">
				<view class="top n-flex-row">
					<image class="titpic" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/lucktit.png"
						mode="widthFix"></image>
					<image class="goodsPic" :src="boxInfo.box_banner_images" mode="widthFix"></image>
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
		<kefu :isShow='kfshow' ref="child" @cusEvent="hide"></kefu>
	</view>
</template>

<script>
import kefu from '@/components/kefu.vue'
import kaixSwiper from '@/components/kaixSwiper.vue'
export default {
	components: {
		kaixSwiper,
		kefu
	},
	data() {
		return {
			zIndexBool: true,
			bgImages: {
				cs: "https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/5⭐.png", // 初始

				ss: "https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/4⭐.png",// 传说
				xy: "https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/3⭐.png", // 稀有
				gj: "https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/image/2⭐.png", // 高级
				// cs: '/static/image/5⭐.png', // 初始
				// gj: '/static/image/2⭐.png', // 高级
				// ss: '/static/image/4⭐.png', // 传说
				// xy: '/static/image/3⭐.png', // 稀有


				// cs: '/static/image/5⭐.png', // 初始
				// gj: '/static/image/2⭐.png', // 高级
				// ss: '/static/image/4⭐.png', // 传说
				// xy: '/static/image/3⭐.png', // 稀有

			},
			flags: true,
			usedCoupon: [],
			currentCoupon: '', //当选择的优惠券
			Confirmed: '', //已确认的优惠券
			youhuiNum: '0',
			swiperCurrent: 0,
			infoshow: false, //商品详情弹出层
			goodsshow: false,
			id: '', //盲盒id
			boxList: [],
			gunList: [],
			muteBgMusic: false,//false,
			name: '', //盲盒名字
			totalGoods: [], //没循环的商品
			goodsPrice: '0.00', //商品价格
			boxPrice: '0.00', //盲盒价格
			boxInfo: '', //盲盒详情
			goodsDetails: '', //商品详情
			orderShow: false, //订单弹窗
			luckshow: false, //抽奖弹窗
			isShiwan: true, //是否试玩
			num: '', //几抽
			xieyi: true,
			// #ifdef MP-WEIXIN || H5
			paymode: 'wechat',
			// #endif

			// #ifdef APP-PLUS
			paymode: 'alipay',
			// #endif
			selectCoupon: false, //选择优惠券
			kfshow: false,
			max: '',
			min: '',
			bi: '',
			total: '',
			xyTotal: '',
			recordList: [],
			fGoods: {
				cs: [],
				ss: [],
				xy: [],
				gj: []
			},
			dian: 'cs',
			xing: '', //星石
			diKou: 0, //抵扣星石数量
			cuType: 'all'
		}
	},
	onLoad(option) {
		this.getBi()
		this.getNotUsed()
		this.id = option.id
		this.getBox()
		this.muteBgMusic = option.music == 'true' ? true : false
		this.getFgoods()
		uni.loadFontFace({
			family: 'myfont',
			source: 'url("https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/YouSheBiaoTiHei.ttf")',
		})
	},

	methods: {
		previewImage(url){
			uni.previewImage({
					urls: [url]
				})
		},
		scrollChange(event) {
			const { scrollTop } = event.detail
			if (scrollTop > 20) {
				this.zIndexBool = false
			} else {
				this.zIndexBool = true
			}
		},
		gotocangku() {
			uni.switchTab({

				url: '/pages/tabBar/cangku'

			});


			// alert(1)
			// uni.navigateTo({
			// 	url:"~/pages/tabBar/cangku"
			// })
		},
		aa() {
			this.flags = true
		},
		bb() {
			this.flags = false
			this.getRecordList("all")
		},
		getRecordList(item) {
			this.cuType = item
			this.$http({
				url: `index.php/api/index/getBoxlistbuyid?id=${this.id}&tag=${item}`,
				header: {
					// "Content-Type": "application/json",
					"token": uni.getStorageSync("user").token
				}
			}).then(res => {
				console.log(res, 'kkkkkkkkkkkk');
				if (res.data.code == 1) {
					this.recordList = res.data.data
				}
			}).catch(err => { });

		},
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
		// 定位锚点
		ding(val) {
			this.dian = val
		},

		// 获取商品列表
		getFgoods() {
			this.$http({
				url: "index.php/api/box/getBoxs",
				data: {
					id: this.id
				}
			}).then(res => {
				console.log(res, "商品");
				if (res.data.code == 1) {
					this.fGoods = res.data.data
					console.log(this.fGoods, ';;;;');
				}
			}).catch(err => { });
		},
		// 获取连抽比率
		getBi() {
			this.$http({
				url: "index.php/api/box/getlcyh",
			}).then(res => {
				if (res.data.code == 1) {
					this.bi = res.data.data
				}
			}).catch(err => { });
		},
		// 选择优惠券
		selectCoupon1(val) {
			this.currentCoupon = val
			console.log(val);
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
		hide() {
			this.kfshow = false
		},
		// 联系客服
		lxkefu() {
			this.$refs.child.getKf()
			this.kfshow = true
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
						boxid: this.id,
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
					console.log(res, "支付");
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
											id: this.id,
											num: this.num
										})
									}, 300)
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
				console.log(111);
				// 支付宝支付
				this.$http({
					url: "index.php/api/index/goPay",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						boxid: this.id,
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
					console.log(res, "支付");
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
									console.log(res.data.ooid, 'ooid');
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
		choujiang() {
			this.luckshow = true
			this.isShiwan = true
		},
		chou(num, item) {
			this.luckshow = true
			if (item == 1) {
				this.isShiwan = false
			} else {
				this.isShiwan = true
			}

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
						id: this.id,
						num: num
					})
				}, 300)

			}
			this.luckshow = false
		},
		// 查看详情
		details(id) {
			// alert(0)
			this.infoshow = true
			uni.showLoading({
				title: '加载中'
			})
			this.$http({
				url: "index.php/api/Box/getShop",
				data: {
					id: id
				}
			}).then(res => {
				console.log(res, '');
				uni.hideLoading()
				if (res.data.code == 1) {
					this.goodsDetails = res.data.data
				}
			}).catch(err => { });
		},
		formatRichText(html) {
			let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi,
					'width:100%;');
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi,
				'<img style="width:100%;height:auto;display:block;"');
			return newContent;
		},
		//盲盒商品
		getBox() {
			this.$http({
				url: "index.php/api/Box/getBoxShop",
				data: {
					id: this.id
				}
			}).then(res => {
				console.log(res, "商品");
				if (res.data.code == 1) {
					this.boxList = res.data.data.shop
					this.boxList.unshift({
						goods_name: res.data.data.mh.box_name,
						goods_pirce: res.data.data.mh.price,
						image: res.data.data.mh.box_banner_images
					})
					this.name = this.boxList[this.swiperCurrent].goods_name
					this.goodsPrice = this.boxList[this.swiperCurrent].goods_pirce
					this.boxPrice = res.data.data.mh.price
					this.boxInfo = res.data.data.mh
					this.max = res.data.data.zg
					this.min = res.data.data.zd
					this.total = res.data.data.znum
					this.xyTotal = res.data.data.xynum
					// 数据不够5自动添加
					var data = res.data.data.shop
					this.totalGoods = data
					this.gunList = res.data.data.shop.concat()
					this.gunList.shift()
					console.log(this.gunList, '滚动数据');
					if (this.gunList.length < 8) {
						for (var i = 0; i < 8; i++) {
							if (this.gunList.length >= 8) {
								return
							}
							this.gunList = this.gunList.concat(data)
							console.log(this.gunList);
						}
					}
				}
			}).catch(err => { });
		},
		// 页面改变
		changeIdx(idx) {
			this.swiperCurrent = idx.detail.current
			this.name = this.boxList[this.swiperCurrent].goods_name
			this.goodsPrice = this.boxList[this.swiperCurrent].goods_pirce
		},
		back() {
			uni.navigateBack()
			uni.$emit('music', this.muteBgMusic)
		},
		playMusic() {
			this.muteBgMusic = !this.muteBgMusic;
		},
		// 选择支付方式
		selectPay(mode) {
			this.paymode = mode
		},
	},
	watch: {
		muteBgMusic(newValue, oldValue) {
			if (newValue) {
				// 开启静音
				this.$music.playBgm({
					mute: true
				});
			} else {
				// 关闭 静音
				this.$music.playBgm({
					mute: false
				});
			}
		}
	},
}
</script>

<style lang="scss" scoped>
@import url("../../static/css/kaixiang.css");

page {
	// background: linear-gradient(to bottom, rgba(183, 75, 29, 1), rgba(245, 139, 55, 1));
	background-position: top center;
	background-size: 100% 70%;
}

.goods {
	margin-top: 40rpx;
	margin-bottom: 40rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 100;
}

.goods.hide {
	z-index: 0;
	position: inherit;
}

.my_btn {
	padding: 600rpx 20rpx 0;
	// border: 1px solid red;
	margin-top: 32rpx;
	margin-bottom: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	z-index: 20;

	.my_btn_item {
		margin-right: 24rpx;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		// border: 1px solid red;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #5b46c6;
		border: none;
		color: #fff;
		border-radius: 20rpx;
		background: rgba(0, 0, 0, .2);
	}

	.my_btn_item.active {
		background: #5b46c6;
	}
}

.my_list {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 690rpx;
	background-color: #5b46c6;
	border-radius: 20rpx;
	overflow: hidden;
	margin: 30rpx auto;
	// min-height: 100vh;

	// min-height: calc(100vh - 60px);
	.my_mythic {
		display: flex;
		flex-direction: column;
		display: block;

		.my_list_scrll {
			width: 690rpx;
			padding: 30rpx 20rpx 20rpx 20rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;

			.my_list_scrll_item:nth-child(3n) {
				margin-right: 0;
			}

			.my_list_scrll_item {
				position: relative;
				flex: 1;
				margin: 0 20rpx 30rpx 0;
				background-color: rgba(0, 0, 0, .2);
				width: calc((100% - 40rpx) / 3);
				min-width: calc((100% - 40rpx) / 3);
				max-width: calc((100% - 40rpx) / 3);
				text-align: center;
				padding: 14rpx 6rpx;
				border-radius: 10rpx;

				.my_list_scrll_item_list {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					>image {
						width: 180rpx;
						height: 180rpx;
					}

					.my_list_scrll_item_list_text {
						// 超出隐藏 
						color: #fff;
						width: 100%;
						font-size: 24rpx;
						margin-top: 14rpx;
						display: -webkit-box;
						text-align: left;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						word-break: break-all;
					}
				}
			}
		}

		.my_list_item {
			width: 100%;
			height: 218rpx;
			// border: 1px solid red;
			align-items: center;

			.my_list_children {
				// border: 1px solid blue;
				// padding-top:24rpx;
				// padding-bottom:24rpx;
				padding: 24rpx;
				width: 100%;
				height: 100%;

				.v-swiper-item {
					// border: 1px solid purple;
					width: 100%;
					height: 100% !important;

				}

				::v-deep .v-swiper uni-swiper {
					height: 100%;
				}
			}
		}
	}

	.my_list_title {
		background-color: rgba(166, 171, 191, .2);
		// display: flex;
		// justify-content: space-between;
		padding: 30rpx 10rpx;
		// width: 100%;
		// height: 100rpx;
		// display: flex;
		// align-items: center;
		// background: url(@/static/image/qiantit.png);
		// background-repeat: no-repeat;
		// background-size:90% 20%;
		// background-position-x: 100%;
		// background-position-y: 100%;
		// position: relative;

		.my_list_title_image {
			width: 120rpx;
			height: 100rpx;
			background: conic-gradient(from 180deg at center, #ff0000, #00ff00, #0000ff);
		}

		>image {
			width: 120rpx;
			height: 100rpx;
		}

		.my_list_title_text {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			padding: 4px;
			overflow: hidden;
			box-sizing: border-box;
			font-size: 22rpx;
			padding-bottom: 4px;
			background: radial-gradient(at center, yellow 0%, transparent 75%);
			background-position: bottom;
			background-repeat: no-repeat;
			background-size: 100% 4px;
		}

		.my_list_title_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.my_list_margin {
			width: 80%;
			text-align: center;
			margin-top: 5px;
		}

		.my_list_title_item_text {
			padding: 2px 4px;
			margin: 2px 6rpx 0;
			font-size: 9px;
			border-radius: 3px;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}

		.ratebg0 {
			background-image: linear-gradient(270deg, brown, #d2691e);
		}

		.ratebg1 {
			background-image: linear-gradient(270deg, #9400d3, #8a2be2);
		}

		.ratebg2 {
			background-image: linear-gradient(270deg, #ee7600, #ee9a00);
		}

		.ratebg3 {
			background-image: linear-gradient(270deg, #cdad00, #ee0);
		}

	}


}

::v-deep .u-navbar-inner {
	z-index: 10000;
}

.column-small {
	align-items: center;
	width: 100%;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;

	.small-box {
		text-align: center;
		align-items: center;
		width: 100rpx;
		// height: 50rpx;
		// border: 1px solid #fff;
		opacity: 0.5;
		color: #ffffff;
		// background: linear-gradient(to right, rgba(27, 201, 145, .1) 0%, rgba(0, 0, 0, 1) 50%, rgba(27, 201, 145, .1) 100%);
	}
}

.detail-content {
	width: 100%;
	box-sizing: border-box;

	.detail-box {
		margin-bottom: 20rpx;
		width: 100%;
		height: 120rpx;
		// border: 1px solid red;
		background-color: rgba(0, 0, 0, .2);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		display: flex;
		justify-content: space-between;
		color: white;
		padding: 20rpx 32rpx;

		.detail-img1,
		.detail-img2,
		.detail-img3 {
			width: 90rpx;
			height: 90rpx;
			display: block;
			// background-color: #00ff00;
			margin-right: 30rpx;

			>img {
				width: 90rpx;
				height: 90rpx;
			}
		}

		.detail-img2 {
			display: flex;
			align-items: center;

			img {
				height: 40rpx;
			}
		}

		.detail-img3 {
			border-radius: 50%;
			margin-right: 0rpx;
		}

		.detail-box-text2 {
			min-width: 100rpx;
			margin-left: 20rpx;
		}

		.detail-box-text1 {
			// 超出省略
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 12rpx;
			margin-right: 30rpx;
		}
	}
}
.btm{
	border-bottom: 0;
}
.conter {
	min-height: 100vh;
	padding-bottom: 124rpx;
	// background: linear-gradient(to bottom, rgba(183, 75, 29, 1), rgba(245, 139, 55, 1));
	background: url(@/static/image/cbg2.png) no-repeat;
	background-size: 100% 100%;
	overflow: hidden;
}

.btm {
	bottom: -1px;
}

.btmbox-column {
	height: 100%;
}

.btmbox {
	background: transparent;
	// bottom: 60rpx;

	.btmbox_item {
		margin-right: 24rpx;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		// border: 1px solid red;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #5b46c6;
		border: none;
		color: #fff;
		border-radius: 20rpx;
		background: #ffd301;
	}

}

.hei100 {
	height: 150rpx;
}

.flex_scroll {
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
}

.mh-goods-rate {
	width: 60px;
	position: absolute;
	top: 1px;
	left: 1px;
	z-index: 9;
}

.goodsbg {
	background-color: #5b46c6;
	color: #fff;
}

.goodsbg .twotit {
	color: #fff;
}

.goodsList {
	background: transparent;
}

.goodsList .list {
	background: rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	overflow: hidden;
}

.goodsList .list .info .tit {
	background-color: transparent;
}

.goodsbg .jilv uni-image {
	height: 44rpx;
	width: 128rpx;
}

.goodsbg .jilv .num {
	margin: 0 auto;
}

.dengbox {
	width: 128rpx;
	height: 44rpx;
}

.dengbox .dengji {
	width: 100% !important;
	height: 100% !important;
}

.kxuIcon {
	color: #fff !important;
	margin: 0 10rpx;
}</style>
