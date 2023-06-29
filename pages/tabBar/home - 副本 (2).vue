<template>
	<view>
		<!--  -->
		<u-navbar :is-back="false" :border-bottom="false" :background="background" title=" ">
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
		<view class="my_home">
				<!-- <image class="my_image" src="../../static/image/qn.png" mode=""></image> -->
		
				<!-- <view class="my_swiper">
					<u-swiper :list="swiperList" height='300'></u-swiper>
				</view>
		 -->
				<div class="my_grid">
					<u-grid :col="4" :border='false' >
						<u-grid-item v-for="(item,index) in gridList" :key='index' bg-color='#F3F4F8' @click='chooseBox(item)'>
							<image class="my_grid_image" :src="item.icon"></image>
							<view class="grid-text">{{item.name}}</view>
						</u-grid-item>
					</u-grid>
				</div>
		
				<view class="my_notice">
					<v-notice :notices="notices" loop :height="25"></v-notice>
				</view>
		
				<view class="my_tabs">
					<v-tabs :list="tabsList" @change="tabsChange"></v-tabs>
				</view>
		
				<view class="my_list">
					<u-card margin="0rpx" padding="20" :head-style="{display:'none'}" v-for="(item,index) in boxData" :key='index'
					@click="lookbox(item.id)">
						<template slot="body">
							<view class="my_list_main" >
								<image :src="item.box_banner_images"></image>
								<view class="my_list_item">
									<text class="my_list_title">{{ item.box_name }}</text>
									<text style='color:red;'>￥ <text>{{item.price}}</text></text>
									<view>
										<text class="my_list_children_title">中奖率<text style='color:red;'>{{item.probability_cs}}</text></text>
										<view class="my_list_children" >
											<v-swiper :list="item.goods" width='100' height='100'></v-swiper>
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
	<view class="bg">
		<!-- #ifndef H5 -->
		<view class="" style="height: 40px;"></view>
		<!-- #endif -->

		<view class="top">
			<view class="left n-flex-row">
				<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/wg.png" mode="" @click="daojushow = true;getCard()"></image>
				<!-- <image src="../../static/image/wy.webp" mode=""></image> -->
				<image src="../../static/image/sf.png" mode="" @click="lingquan"></image>
			</view>
			<view class="right">
				<image src="../../static/image/sk.png" mode="" @click="$.to('/pages/my/agreement?type=play_rule')">
				</image>

				<!-- #ifndef MP-WEIXIN -->
				<image src="../../static/image/so.png" @click="lxkefu" mode=""></image>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<button class="kefu" open-type="contact"></button>
				<!-- #endif -->

				<image :class="muteBgMusic ? 'music stop' : 'music'"
					:src="muteBgMusic?'../../static/image/jing.png':'../../static/image/se.png'" mode=""
					@click="playMusic"></image>
			</view>
		</view>

		<view v-if="tong" class="tong" :style="{'background':'url('+tong.bg+')'}">
			<view class="text">
				<u-notice-bar :volume-icon="false" color="#fff" type="none" mode="horizontal" :list="tong.text">
				</u-notice-bar>
			</view>
			<image :src="tong.mhimage" mode="widthFix"></image>
		</view>

		<!-- <audio src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3" :loop="true"></audio> -->

		<view class="lunbo">
			<view class="goods">
				<swiper circular style="height: 600rpx;" :current="swiperCurrent" @change="changeIdx">
					<swiper-item class="lunboitem" v-for="(item,idx) in boxData" :key="idx">
						<image @click="lookbox(item.id)" :src="item.box_banner_images" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="qipao">
				<!-- #ifndef MP-WEIXIN -->
				<!-- <prize-flying ref="qipao" v-if="boxData[this.swiperCurrent]" :key="`flying-${flyingKey}`" :box-id="boxData[this.swiperCurrent].id"></prize-flying> -->
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<view class="prize-flying">
					<template v-for="(item, index) in flyLeftList">
						<view :key="index" :class="['fly-prize', 'fly-left']"
							:style="{  animationDuration: flySpeed + 's'}">
							<image :src="item.image" mode=""></image>
						</view>
						<!-- <view :key="index" :class="['fly-prize', 'fly-left']" :style="flyStyle(flyLeft)"></view> -->
					</template>
					<template v-for="(item, index) in flyCenterList">
						<view :key="index" :class="['fly-prize', 'fly-center']"
							:style="{  animationDuration: flySpeed + 's'}">
							<image :src="item.image" mode=""></image>
						</view>
					</template>
					<template v-for="(item, index) in flyRightList">
						<view :key="index" :class="['fly-prize', 'fly-right']"
							:style="{ animationDuration: flySpeed + 's'}">
							<image :src="item.image" mode=""></image>
						</view>
					</template>
				</view>
				<!-- #endif -->


			</view>
			<view class="arrow n-flex-row n-justify-between">
				<image @click="prev" src="../../static/image/arrow-left.png" mode=""></image>
				<image @click="next" src="../../static/image/arrow-right.png" mode=""></image>
			</view>
			<image src="../../static/image/sz.png" mode="widthFix" class="shou"></image>
			<view class="dizuobox">
				<image class="dizuo" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/ro.png" mode="widthFix"></image>
				<text class="price">￥<text class="num">{{boxPrice}}</text>/个</text>
			</view>
			<view class="maxBox">
				<view class="maxyou" v-if="maxYou">
					{{maxYou}}
				</view>
			</view>
		</view>

		<view class="card">
			<swiper circular active-class="active" style="height: 210rpx;" previous-margin="270rpx" next-margin="270rpx"
				:current="swiperCurrent" @change="changeIdx">
				<swiper-item @click="selectCard(idx)" class="cardItem" :class="swiperCurrent == idx?'active':''"
					v-for="(item,idx) in boxData" :key="idx">
					<!-- <image src="../../static/image/float.jpg" mode="widthFix"></image> -->
					<view class="car">
						<image :src="item.box_foot_images" mode=""></image>
						<view class="boxname">{{item.box_name}}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="qbtn n-flex-row n-justify-between">
			<view class="left">
				<image @click="ouhuangshow = true" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/xz.png" mode="heightFix"></image>
			</view>
			<view class="kaixiang" @click="choujiang">
				<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/button.png" mode="widthFix"></image>

			</view>
		</view>
		<view class="tip">
			谢绝未成年人使用或在监护人的监督指导下体验
		</view>

		<!-- 免费试玩 -->
		<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/v5.png" class="free" mode="" @click="luckshow = true;isShiwan = true">
		</image>
		<!-- 新手教程 -->
		<!-- <image src="../../static/image/sg.png" class="xinshou" mode="widthFix" @click="videoShow = true"></image> -->

		<!-- 优惠券弹窗 -->
		<u-popup v-model="couponshow" mode="center" :custom-style="{backgroundColor: 'rgba(0, 0, 0, 0)'}">
			<view class="newPeopleBox">
				<view class="newmainBox">
					<scroll-view scroll-y class="youhuilist">
						<view class="youhuibox" v-for="(item,idx) in couponList" :key="idx">
							<view class="left">
								<view>
									<view class="name">{{item.couname}}</view>
									<view class="price1" v-if="item.typetag == 1">
										满{{item.mzamount}}可用
									</view>
									<view class="price1" v-if="item.typetag == 0">
										<text class="pri">￥{{item.amount}}</text>无门槛
									</view>

								</view>
							</view>
							<view class="right">
								<view>
									<view class="price">￥<text>{{item.amount}}</text></view>
									<view class="ling" :class="item.status_a == 0?'active':'yiling'"
										@click="receive(item.id,item.status_a,idx)">
										{{item.status_a == 0?'领取':'已领取'}}
									</view>

								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="btm">
					<image class="btmBg" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/rv.webp" mode="widthFix"></image>
					<view class="btn1">
						<image @click="receiveall" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/sd.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="off">
					<image @click="couponshow = false" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/down.png" mode=""></image>
				</view>
			</view>

		</u-popup>

		<!-- 道具卡 -->
		<u-popup v-model="daojushow" mode="center">
			<view class="box11">
				<view class="daojubox">
					<view class="top">
						<image :src="isCard?'../../static/image/qp.png':'../../static/image/qn.png'" mode="widthFix">
						</image>
						<view class="rulebox" v-if="isCard" @click="isCard = false">
							<view class="wen">
								?
							</view>
							使用规则
						</view>
					</view>
					<view v-if="isCard">
						<scroll-view scroll-y style="height: 755rpx;width: 100%;margin-top: 30rpx;">
							<view class="cardList">
								<view class="list" v-for="(item,idx) in cardList" :key="idx">
									<view class="goods n-flex-row">
										<view class="picbox">
											<image src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/xu.png" mode=""></image>
										</view>
										<view class="textbox">
											<view class="tit">
												{{item.lqsm}}
											</view>
											<view class="two">开盒时免费重抽1次</view>
											<view class="qi n-flex-row n-justify-between">
												<view>领取时间:{{$u.timeFormat(item.lqtime, 'yyyy-mm-dd hh:MM:ss')}}</view>
												<!-- <u-icon color="#999" label-color="#999" label-size="24"
													label-pos="left" name="arrow-down" label="适用盲盒">
												</u-icon> -->
											</view>
										</view>
									</view>
									<!-- <view class="tip1">
										适用范围适用范围适用范围适用范围适用范围适用范围适用范围
									</view> -->
								</view>
							</view>
							<u-empty text="暂无道具卡" mode="favor" color="#766ed0" icon-color="#766ed0" :show="cardShow">
							</u-empty>
						</scroll-view>
						<!-- <custom-tabs type="c1" tabSpacing="60" :tabCenter="true" :value="0" @change="rulechange">
							<custom-tab-pane label="未使用(0)" name="c1_1">
								<view>
									<view class="nodata">
										<view>
											<image src="../../static/image/um.webp" mode=""></image>
											<view class="tit"> 如何获取道具卡？ </view>
											<view class="fun"> 参与平台活动有机会获得道具卡 </view>
											<view class="fun"> 道具卡加持，更有机会获得心仪款哦~ </view>
										</view>
									</view>
									<scroll-view scroll-y style="height: 680rpx;width: 100%;">
										<view class="cardList">
											<view class="list" v-for="(item,idx) in 6" :key="idx">
												<view class="goods n-flex-row">
													<view class="picbox">
														<image src="../../static/image/xu.webp" mode=""></image>
													</view>
													<view class="textbox">
														<view class="tit">
															首次兑换赠送-重抽卡
														</view>
														<view class="two">开盒时免费重抽1次</view>
														<view class="qi n-flex-row n-justify-between">
															<view>有效期至:2022.10.10</view>
															<u-icon color="#999" label-color="#999" label-size="24"
																label-pos="left" name="arrow-down" label="适用盲盒">
															</u-icon>
														</view>
													</view>
												</view>
												<view class="tip1">
													适用范围适用范围适用范围适用范围适用范围适用范围适用范围
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</custom-tab-pane>
							<custom-tab-pane label="不可用" name="c1_2">
								<view>
									<view class="nodata">
										<view>
											<image src="../../static/image/um.webp" mode=""></image>
											<view class="tit"> 如何获取道具卡？ </view>
											<view class="fun"> 参与平台活动有机会获得道具卡 </view>
											<view class="fun"> 道具卡加持，更有机会获得心仪款哦~ </view>
										</view>
									</view>
								</view>
							</custom-tab-pane>
						</custom-tabs> -->
					</view>

					<view v-else class="explain">
						<view class="tit">♦<text>重抽卡</text>♦</view>
						<scroll-view scroll-y class="text" style="height: 560rpx;">
							内容
						</scroll-view>
						<view class="btm">
							<view class="btn2" @click="isCard = true">
								我知道了
							</view>
						</view>
					</view>
				</view>
				<view class="off">
					<image @click="daojushow = false" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/down.png" mode=""></image>
				</view>
			</view>
		</u-popup>

		<!-- 视频 -->
		<u-popup v-model="videoShow" mode="center">
			<view class="vbox">
				<video id="myVideo" class="v" :src="videoSrc" :show-mute-btn="true"></video>
				<view class="btm">
					<button @click="videoShow = false">我知道了</button>
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
							<image v-if="boxData.length != 0" :src="boxData[swiperCurrent].box_banner_images" mode="">
							</image>
							<view class="info">
								<view class="t">{{boxName}}</view>
								<view class="two">
									<view class="price">￥{{boxPrice}}</view>
									<view class="num">x{{num}}</view>
								</view>
							</view>
						</view>
						<view v-if="usedCoupon.length != 0" @click="goSelect"
							class="rowitem n-flex-row n-justify-between" style="margin-top: 10rpx;">
							<view class="l">
								<image src="../../static/image/quanlogo.png" mode=""></image>
								优惠券
							</view>
							<u-icon label-pos="left" :label-color="youhuiNum == '0'?'#999':'#d81e06'" color="#999"
								name="arrow-right" :label="youhuiNum == '0'?'未选择优惠券':'-￥'+youhuiNum">
							</u-icon>
						</view>
						<view class="rowitem n-flex-row n-justify-between">
							<view class="l">
								<image src="../../static/image/y2.png" mode=""></image>
								星石
							</view>
							<view class="" style="color: #999;">
								{{diKou == 0? '无可抵扣数量' : '使用'+(diKou*100).toFixed(0)+'星石抵扣￥'+diKou}}</view>
							<!-- <u-icon label-pos="left" label-color="#d81e06" color="#999" name="arrow-right" label="-￥10"></u-icon> -->
						</view>
						<view class="total" v-if="youhuiNum>0">
							共计优惠：<text>￥{{youhuiNum}}</text>
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
					<button @click="pay"
						v-if="num == 1">立即支付<text>￥{{((boxPrice * num) - youhuiNum - diKou).toFixed(2)}}</text></button>
					<button @click="pay"
						v-else>立即支付<text>￥{{(((boxPrice * num) - (boxPrice * num * bi)) - youhuiNum - diKou).toFixed(2)}}</text></button>
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
							<view class="couList" v-for="(item,idx) in usedCoupon" :key="idx"
								@click="selectCoupon1(item)">
								<view class="l">
									<view class="aa">
										￥<text class="pri">{{item.amount}}</text>
										<view class="tiao" v-if="item.typetag == 0">无门槛</view>
										<view class="tiao" v-if="item.typetag == 1">满{{item.mzamount}}减{{item.amount}}
										</view>
									</view>
								</view>
								<view class="r">
									<view class="ll">
										<view class="t">{{item.couname}}</view>
										<!-- <view class="use">可用</view> -->
										<view class="qi" style="margin-top: 20rpx;">有效期至
											{{$u.timeFormat(item.end_time, 'yyyy-mm-dd hh:MM:ss')}}
										</view>
									</view>
									<view class="rr">
										<radio :value="item.id+''" :checked="currentCoupon.id == item.id"
											color="#63D7D6" style="transform:scale(0.8)" />
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
					<image class="titpic" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/lucktit.png" mode="widthFix"></image>
					<image v-if="boxData.length != 0" class="goodsPic" :src="boxData[swiperCurrent].box_banner_images"
						mode="widthFix"></image>
				</view>
				<view class="option">
					<view class="row">
						<view class="chou" @click="chou(1)">
							<view class="b">
								<view class="tit">一发入魂</view>
								<view v-if="!isShiwan">￥{{boxPrice}}</view>
							</view>
						</view>
						<view class="chou" @click="chou(3)">
							<view class="jian" v-if="!isShiwan">限时减{{(boxPrice * 3 * bi).toFixed(2)}}元</view>
							<view class="b">
								<view class="tit">欧气三连</view>
								<view v-if="!isShiwan">￥{{((boxPrice * 3) - boxPrice * 3 * bi).toFixed(2)}} <text
										class="yuanj">￥{{(boxPrice * 3).toFixed(2)}}</text> </view>
							</view>
						</view>
					</view>
					<view class="row">
						<view class="chou" @click="chou(5)">
							<view class="jian" v-if="!isShiwan">限时减{{(boxPrice * 5 * bi).toFixed(2)}}元</view>
							<view class="b">
								<view class="tit">霸气五连</view>
								<view v-if="!isShiwan">￥{{((boxPrice * 5) - boxPrice * 5 * bi).toFixed(2)}} <text
										class="yuanj">￥{{boxPrice * 5}}</text> </view>
							</view>
						</view>
						<view class="chou" @click="chou(10)">
							<view class="jian" v-if="!isShiwan">限时减{{(boxPrice * 10 * bi).toFixed(2)}}元</view>
							<view class="b">
								<view class="tit">豪气十连</view>
								<view v-if="!isShiwan">￥{{((boxPrice * 10) - boxPrice * 10 * bi).toFixed(2)}} <text
										class="yuanj">￥{{boxPrice * 10}}</text> </view>
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
					<u-icon @click="ouhuangshow=false" name="close-circle-fill" color="#ccc" size="55"></u-icon>
				</view>
				<scroll-view scroll-y class="scroll">
					<view class="listbox">
						<view class="list" v-for="(item,idx) in ouList" :key="idx">
							<view class="picbox" @click="lookbox(item.boxfl_id)">
								<image :src="item.activityimage_v" mode="aspectFill"></image>
								<view class="text n-flex-row n-justify-between">
									<view>{{item.activityname}}</view>
									<u-icon name="arrow-right" label-pos="left" label="立即参与"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<!-- <show-result :key="0" ref="result-popup" :num="boxNum" @accept="toMyBox()" @recycle="recycle"
			:type="type" @close="resultKey++"></show-result> -->
		<kefu :isShow='kfshow' ref="child" @cusEvent="hide"></kefu>
		<u-popup v-model="tanShow" mode="center">
			<view class="tanBox">
				<view class="pic">
					<image @click="lookbox(tanCon.boxfl_id)" :src="tanCon.tcimage" mode="widthFix"></image>
				</view>
				<view class="off">
					<image @click="tancancel" src="https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/down.png" mode=""></image>
				</view>
			</view>
		</u-popup>

	</view>
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
	import vNotice from '@/components/vNotice.vue'
	import vTabs from '@/components/vTabs.vue'
	import vSwiper from '@/components/vSwiper.vue'
	import kefu from '@/components/kefu.vue'
	import colorGradient from 'uview-ui/libs/function/colorGradient';
	import prizeFlying from "@/components/prize-flying.vue"
	export default {
		components:{
			vNotice,
			vTabs,
			vSwiper
		},
		data() {
			return {
				isLogin: false,
				userInfo: '',
				sdkshow: false,
				sdk: '',
				count: 0, //消息角标
				
				bannerlist: [],
				gridList: [{
						icon: 'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
						name: '每周签到'
					},
					{
						icon: 'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
						name: '天天签到'
					},
					{
						icon: 'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
						name: '惊喜礼包'
					},
					{
						icon: 'https://hellorfimg.zcool.cn/provider_image/preview260/2238325939.jpg?x-oss-process=image/format,webp',
						name: '欧币红包'
					}
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
				muteBgMusic: false, //是否静音
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
			// =========================================
			// this.getInfo()
			this.getManghe()
			this.getOuHuang()
			this.getvideo()
			this.getBi()
			uni.$on('music', (data) => {
				this.muteBgMusic = data
			})
			uni.loadFontFace({
				family: 'myfont',
				source: 'url("https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/YouSheBiaoTiHei.ttf")',
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
			prizeFlying
		},
		// onShow() {
		// 	this.getCard()
		// },
		methods: {
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
				}).catch(err => {});
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
				}).catch(err => {});
			},
			chooseBox(item){
				console.log(item,'item=======')
				if(item.name=="每周签到"){
					this.lingquan()
				}else if(item.name=="天天签到"){
					uni.navigateTo({
						url:'/pages/my/qiandao'
					})
				}else if(item.name=="欧币红包"){
					this.sdkshow = true
				}
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
				}).catch(err => {});
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
				}).catch(err => {});

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
				}).catch(err => {});
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
				}).catch(err => {});
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
						item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/cstz.png'
					} else {
						item.bg = 'https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/sstz.png'
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
				}).catch(err => {});
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
				}).catch(err => {});
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
				}).catch(err => {});

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
				}).catch(err => {});


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
				}).catch(err => {});
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
							uni.$emit('h5pay',res.data)
						},600)
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
					}).catch(err => {});

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
							uni.$emit('h5pay',res.data)
						},600)
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
					}).catch(err => {});
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
				}).catch(err => {});
			},
			// 获取视频
			getvideo() {
				this.$http({
					url: "index.php/api/index/getSetting",
				}).then(res => {
					if (res.data.code == 1) {
						this.videoSrc = res.data.data.xsjc
					}
				}).catch(err => {});
			},
			// 获取盲盒
			getManghe() {
				this.$http({
					url: "index.php/api/Box/getBox",
				}).then(res => {
					console.log(res, "盲盒");
					if (res.data.code == 1) {
						this.boxData = res.data.data
						var data = res.data.data
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
				}).catch(err => {});
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
			playMusic() {
				this.muteBgMusic = !this.muteBgMusic;
			},



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

<style>
	@import url("../../static/css/home.css");
	@import url("../../static/css/mall.css");
	@import url("../../static/css/my.css");
</style>
<style lang="scss">
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
			background-image: url('https://bucket-manghe.oss-cn-beijing.aliyuncs.com/hipinsoft.com1/paopao.png') !important;
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
		padding: 0 20rpx;
		background-color: #F3F4F8;
	
		.my_image {
			width: 100%;
			height: 90rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
	
		.my_grid {
			.my_grid_image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 16rpx;
				margin-bottom: 10rpx;
			}
		}
		.my_list{
			width: 100%;
			margin-top: 20rpx;
			/* margin-bottom:24rpx !important; */
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
	}
	.u-card{
		margin-bottom:24rpx !important;
	}
</style>
