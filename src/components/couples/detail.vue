<template>
	<div class="finalFashionDetail">
		<v-header :header="header" @getBack="getBack"></v-header>
		<div class="threeD-container" v-if="isShow3D">
			<div class="threeD-content">

				<div style="position:relative;width:100%;height:100%;">
					<div class="close" @click="close3D"></div>
					<v-threeD :list="img3DList"></v-threeD>
				</div>
			</div>
		</div>
		<div class="detail_wrap" v-show="!isLookDetail">
			<div class="left">
				<div class="video_wrap">
					<div class="img_default">
						<template>
							<img :src="mainImg+config.detailMainImgSize" v-if="mainImg" @load="loadingMain()" v-show="loadMainImg">
							<img :src="imgLoading" v-show="!loadMainImg">
						</template>
						<img src="../../assets/assetsFinal/playVideo.png" alt="" class="playVideo" @click="videoIsShow = true" v-if="Video.ImageCode">
					</div>
				</div>
				<!-- 左下角的的图片 -->
				<div class="product_img_wrap">
					<div class="product_img" ref="product_img">
						<ul class="product_img_list">
							<li class="transitionImg threedImg" v-if="has3D" style="margin-right:1.88rem;">
								<div @click="show3D" v-for="(item,index) in styleImg" :key="index" :class='{"active": imgActive}'>
									<img :src="http.imgUrl+item.ImageCode+config.detailImgSize" v-if="item.IsMain" @load='loadingImg(index)' v-show="item.loading">
									<img :src="imgLoading" v-show="!item.loading" v-if="item.IsMain">
								</div>
							</li>
							<li class="transitionImg" :class="{'moreshow': (has3D && styleImg.length >= 3) || (!has3D && styleImg.length >= 4)}">
								<div style="display:flex;">
									<div class="normalImg" :class='{"active":item.ImageCode == curCode && !imgActive}' @click="getCurImg(item.ImageCode)" v-for="(item,index) in styleImg" :key="index">
										<img :src="http.imgUrl+item.ImageCode+config.detailImgSize" @load='loadingImg(index)' v-show="item.loading">
										<img :src="imgLoading" v-show="!item.loading">
									</div>
								</div>

							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="right">
				<p class="product_name transitionImg">{{detailData.SuitName}}
					<span>
						情侣戒
					</span>
				</p>
				<p class="product_price transitionImg">￥{{(salePrice).toFixed(2)|money}}(价格)</p>

				<div class="product_params_container">
					<div class="couples_list" v-for="(item,index) in detailData.StyleList" :key="item.StyleId">
						<div class="couples_list_title">
							<div class="couples_list_male" v-if="item.Gender == 1">男款</div>
							<div class="couples_list_lady" v-if="item.Gender == 2">女款</div>
							<span>情侣戒 款号{{item.StyleNo}}</span>
							￥{{(item.MinPrice).toFixed(2)|money}}起
						</div>
						<div class="couples_list_content">
							<template v-if="item.IsSelectStone">
								<div style="width:50%;overflow:hidden;float:left">
									<div class="couples_list_proto" v-if="item.MainStoneType && item.SetStoneType"><span>主石类别</span>{{item.MainStoneType}}</div>
									<div class="couples_list_proto" v-if="item.MainStoneQuantity && item.SetStoneType"><span>主石粒数</span>{{item.MainStoneQuantity}}</div>
									<div class="couples_list_proto" v-if="item.GoldWeight"><span>金重</span>{{item.GoldWeight}}</div>
									<div class="couples_list_proto" v-if="item.RingSize.length > 0">
										<span>适配手寸</span>

										<div class="couples_list_container">
											<div class="couples_list_value" v-for="(item1 ,index1) in item.RingSize" :key="index1">
												{{item1.AttrValueName}}{{index1==detailData.StyleList[index].RingSize.length-1?"":'、'}}
											</div>
										</div>
									</div>
									<div class="couples_list_proto" v-if="item.Condition.length > 0">
										<span>成色</span>

										<div class="couples_list_container">
											<div class="couples_list_value" v-for="(item1 ,index1) in item.Condition" :key="index1">
												{{item1.AttrValueName}}{{index1==detailData.StyleList[index].Condition.length-1?"":'、'}}
											</div>
										</div>
									</div>

								</div>

								<div style="width:50%;overflow:hidden;float:left">
									<div class="couples_list_proto" v-if="item.AutoInlaySize && item.SetStoneType"><span>适配镶口</span>{{item.AutoInlaySize}}</div>
									<div class="couples_list_proto" v-if="item.SetStoneType"><span>镶石类别</span>{{item.SetStoneType}}</div>
									<div class="couples_list_proto" v-if="item.SetStoneQuantity"><span>镶石粒数</span>{{item.SetStoneQuantity}}</div>
									<div class="couples_list_proto" v-if="item.SetWeight"><span>镶石重量</span>{{item.SetWeight}}</div>


									<div class="couples_list_proto" v-if="item.MainStoneType && !item.SetStoneType"><span>主石类别</span>{{item.MainStoneType}}</div>
									<div class="couples_list_proto" v-if="item.MainStoneQuantity && !item.SetStoneType"><span>主石粒数</span>{{item.MainStoneQuantity}}</div>
									<div class="couples_list_proto" v-if="item.AutoInlaySize && !item.SetStoneType"><span>适配镶口</span>{{item.AutoInlaySize}}</div>
								</div>
							</template>
							<template v-else>
								<div style="width:50%;overflow:hidden;float:left">
									<div class="couples_list_proto" v-if="item.GoldWeight"><span>金重</span>{{item.GoldWeight}}</div>
									<div class="couples_list_proto" v-if="item.RingSize.length > 0">
										<span>适配手寸</span>
										<div class="couples_list_container">
											<div class=""></div>
											<div class="couples_list_value" v-for="(item1 ,index1) in item.RingSize" :key="index1">
												{{item1.AttrValueName}}{{index1==detailData.StyleList[index].RingSize.length-1?"":'、'}}
											</div>
										</div>
									</div>
									<div class="couples_list_proto" v-if="item.Condition.length > 0">
										<span>成色</span>
										<div class="couples_list_container">
											<div class="couples_list_value" v-for="(item1 ,index1) in item.Condition" :key="index1">
												{{item1.AttrValueName}}{{index1==detailData.StyleList[index].Condition.length-1?"":'、'}}
											</div>
										</div>
									</div>
								</div>

								<div style="width:50%;overflow:hidden;float:left">
									<div class="couples_list_proto" v-if="item.SetStoneType"><span>镶石</span>{{item.SetStoneType}}</div>
									<div class="couples_list_proto" v-if="item.SetStoneQuantity"><span>镶石粒数</span>{{item.SetStoneQuantity}}</div>

									<div class="couples_list_proto" v-if="item.SetWeight"><span>镶石重量</span>{{item.SetWeight}}</div>
								</div>
							</template>
						</div>
					</div>
				</div>
				<div class="btn">
					<div class="lookDetail" @click="lookDetail()" v-if="imgArrBanner.length">查看图文详情</div>
					<div class="next_step" @click="next_step()" v-text="'选定此款'"></div>
				</div>
			</div>
		</div>
		<div class="detailSlide" v-show="isLookDetail">
			<swiper :options="swiperOption" ref="mySwiper" style="margin-top:6.25rem;">

				<swiper-slide :key="index" v-for="(item,index) in imgArrBanner">
					<img :src="http.imgUrl+item+config.defaultImgSize" style="width:100%;" :style="{height: fullHeight + 'px'}" alt="">
					<img :src="http.imgUrl+item+config.defaultImgSize" style="width:100%;height:-webkit-fill-available;" alt="">
				</swiper-slide>

				<div class="swiper-pagination" slot="pagination"></div>
				<div class="swiper-scrollbar"  slot="scrollbar"></div>

			</swiper>
		</div>
		
		
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
		<v-videoPlayer v-if="videoIsShow" @videoClose="videoIsShow=false" :options="videoOptions"></v-videoPlayer>
        <v-footer :finishParams="finishParams" v-show="!isLookDetail"></v-footer>
		<v-loading v-show="isloading"></v-loading>
    </div>
</template>

<script>
import footer from "./footer";
import header from "./header";
// import slide from './detailSlide'
import threeD from "components/threeD/threeD";
import promptBox from "@/components/promptBox/promptBox";
import loading from "@/components/isLoading/isloading";
import {
	swiper,
	swiperSlide
} from "vue-awesome-swiper";


const imgLoading = require("@/assets/assetsFinal/imgLoading.png");
require("swiper/dist/css/swiper.css");
const page1 = require("@/assets/myBride/1.jpg");
const page2 = require("@/assets/myBride/2.jpg");
const page3 = require("@/assets/myBride/3.jpg");
const page4 = require("@/assets/myBride/4.jpg");
const page5 = require("@/assets/myBride/5.jpg");
export default {
	data() {
		const mainImg = require("../../assets/assetsFinal/bigPic.png");
		return {
			finishParams: {
				isStyleListFinshed: true,
				isDetail: true,
				isShow: true,
				footerWord: {
					firstStep: "情侣款列表",
					secondStep: "情侣款详情",
					thirdStep: "配石",
					fourStep: "确认信息"
				}
			},
			header: {
				title: "款式详情",
				isShow: true,
				return: {
					name: "couples",
					params: ""
				},
				showRight: ""
			},

			swiperOption: {
				notNextTick: true,
				direction: "horizontal",
				grabCursor: true,
				setWrapperSize: true,
				autoHeight: true,
				paginationClickable: true,
				mousewheelControl: false,
				observeParents: true,
				debugger: true
			},
			bannerArr: [{
					src: page1
				},
				{
					src: page2
				},
				{
					src: page3
				},
				{
					src: page4
				},
				{
					src: page5
				}
			],

			imgArrBanner: [],
			conditionList: [],
			msg: {
				text: "",
				time: "",
				show: false
			},
			salePrice: 0, //价格

			loadMainImg: false,
			isShow3D: false,
			fullHeight: document.documentElement.clientHeight,
			imgArr: [],
			imgActive: false,
			imgLoading: imgLoading,
			threeD: {},

			curCode: "",
			mainImg: "",
			detailData: {},
			styleImg: [],

			videoIsShow: false,
			videoOptions: {
				src: "",
				title: ""
			},
			Video: {},
			isLookDetail: false, //是否查看详情
			imgUrlDetail: "",

			isloading: false,
			ispromptBox: false,

			AttrName: '', //选中的成色
			conditionSkuId: '',
			has3D: false,
			img3DList: []
		};
	},
	created() {
		window.vm = this
		this.getInit()
	},
	beforeRouteEnter(to, from, next){
		next(vm => {
			let name = from.name,
				query = vm.$route.query,
				params = vm.$route.params
			if(name == 'couplesEdit'){
				name = 'couples'
			}
			vm.header.return = {
				name,
				params,
				query
			}
		})
		

	},
	methods: {
		loadingMain() {
			this.loadMainImg = true;
		},
		loadingImg(index) { //图片加载
			this.styleImg.forEach((item, index1) => {
				if (index == index1) {
					item.loading = true;
				}
			})
		},
		lookDetail() {
			this.isLookDetail = true;
			if (this.lookDetail) {
				this.header.showRight = "确认信息";
			}
		},
		getBack(val) {
			if (val) {
				this.isLookDetail = false;
				this.header.showRight = false;
			}
		},
		tips(text) {
			let that = this;
			that.ispromptBox = true;
			that.$nextTick(() => {
				that.msg.text = text;
			});
			setTimeout(() => {
				that.msg.time = 1500;
			}, 1000);
			setTimeout(() => {
				that.ispromptBox = false;
				that.msg.time = null;
				that.msg.text = null;
			}, 1500);
		},
		next_step() {

			this.$router.push({
				name: "couplesEdit",
				params: {
					id: this.$route.params.id
				},
				query: this.header.return.query
			});
			//   this.detailData.
		},
		show3D() {
			this.imgActive = true;
			if(this.has3D){
				this.isShow3D = true;
			}
		},
		close3D() {
			this.isShow3D = false;
		},
		getCurImg(imgUrl) {
			this.isShow3D = false;
			this.imgActive = false;
			this.mainImg = this.http.imgUrl + imgUrl;
			this.curCode = imgUrl;
		},
		selFinness(id, name) {
			this.conditionList.forEach((item, index) => {
				if (item.SuitSkuId == id) {
					item.active = true;
					this.AttrName = item.AttrValueName;
					this.conditionId = id;
					let options = {
						url: "/purchase_Api_SuitCustomize_GetSuitSkuPrice",
						params: {
							skuId: item.SuitSkuId
						}
					};
					let cbok = res => {
						this.isloading = false;
						let data = res.data.data;
						if (data) {
							this.salePrice = data.SalePrice;
							this.conditionSkuId = data.SkuId;
						}
					};
					let cbnull = res => {
						this.isloading = false;
					};
					let cbno = res => {
						this.isloading = false;
					};
					this.http.get(options, cbok, cbno, cbnull);
				} else {
					item.active = false;
				}
			});
		},
		getInit() {
			let that = this;
			this.isloading = true;
			let options = {
				url: "/purchase_Api_SuitCustomize_GetCouples",
				params: {
					suitId: this.$route.params.id
				}
			};
			let cbok = res => {
				this.isloading = false;
				let data = res.data.data;
				this.detailData = data;
				this.salePrice = data.MinSuitPrice;
				for (let key in this.detailData) {
					if (key == "ImageList") {
						this.detailData[key].forEach(item => {
							this.$set(item, 'loading', false)
							if (item.ImageType == 1) {
								if (item.IsMain) {
									this.styleImg.unshift(item); //把主图放在第一位
									this.mainImg = this.http.imgUrl + item.ImageCode;
									this.curCode = item.ImageCode;
								} else {
									this.styleImg.push(item);
								}
							} else if (item.ImageType == 2) {
								this.Video = item;
							} else if (item.ImageType == 3) {
								this.threeD = item;
								this.get3DInfo()
							}
						});
						if (this.detailData[key].length >= 4) {
							let imgWrap = this.$refs.product_img;
							imgWrap.style.width = "100%";
							imgWrap.style.overflow = "scroll";
						}
					} else if (key == "SuitCopy") {
						if (this.detailData[key])
							this.imgArrBanner = this.detailData[key].split(",");
					}
				}
				if (this.Video.ImageCode) {
					//视频
					let videoSrc = that.http.videoUrl + that.Video.ImageCode
					if (self.isApp) { //判断是否在app模式
						videoSrc = self.getLocalVideo(that.detailData.SuitName) || videoSrc;
					}
					that.videoOptions = {
						src: videoSrc,
						title: "款式详情"
					};
				}
				this.$nextTick(() => {
					// 左下角图片
					let transitionImg = document.getElementsByClassName("transitionImg");
					for (let i = 0; i < transitionImg.length; i++) {
						transitionImg[i].style.opacity = 0;
						transitionImg[i].style.transform = "translateX(5rem)";
					}
					for (let i = 0; i < transitionImg.length; i++) {
						transitionImg[i].style.animation = "imgFadeIn 0.2s ease";
						transitionImg[i].style["animation-delay"] = i * 0.3 + 0.2 + "s";
						transitionImg[i].style["animation-fill-mode"] = "forwards";
					}
					let liTransition = document.getElementsByClassName("transition");
					for (let i = 0; i < liTransition.length; i++) {
						liTransition[i].style.transform = "translateX(5rem)";
						liTransition[i].style.opacity = 0;
					}
					for (let i = 0; i < liTransition.length; i++) {
						liTransition[i].style.animation = "leftRightFade 0.2s 0.5s ease forwards";
					}
					// // 选择此款
					let btn = document.getElementsByClassName('btn')[0];
					btn.style.animation = 'upDown 0.2s 1s ease forwards'
				})
			};
			let cbnull = res => {
				this.isloading = false;
			};
			let cbno = res => {
				this.isloading = false;
			};
			this.http.get(options, cbok, cbno, cbnull);
		},
		get3DInfo(){
			let options = {
				url: "/resource_GetResource_GetVideoImgNumber",
				params: {
					Id : this.threeD.ImageCode
				}
			}
			let cbok = res => {
				let data = res.data.data
				if(data <= 10){
					this.has3D = false
				}else{
					this.threeD.ImgQuantity = data
									
					let len = this.threeD.ImgQuantity - 1,
						list = [],
						count = 1;
					while(count <= len){
						let length = count.toString().length,
							index = count;
						if(length == 1){
							index = '00' + count;
						}else if(length == 2){
							index = '0' + count;
						}
						
						let img = this.http.threeDImgUrl + this.threeD.ImageCode + `_${index}`
						list.push(img)
						count++
					}
					this.img3DList = list
					this.has3D = true
				}
			}
			let cbnull = res => {
				this.has3D = false
			}
			let cbno = res => {
				this.has3D = false
			}
			this.http.get(options, cbok, cbno, cbnull)
		}
	},
	components: {
		"v-footer": footer,
		"v-header": header,
		// 'v-slide': slide,
		"v-loading": loading,
		"v-threeD": threeD,
		promptBox
	}
};
</script>

<style lang="scss" scoped>
#app {
	height: 100%;
}

em {
	font-style: normal;
}

.finalFashionDetail {
	background: #ffffff;
	height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	.threeD-container {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
		z-index: 9999999;
		position: fixed;
		top: 0;
		left: 0;
		.threeD-content {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 75rem;
			height: 75rem;
			display: flex;
			align-items: center;
			.close {
				position: absolute;
				background-image: url("../../assets/close.png");
				background-size: cover;
				top: 2rem;
				right: 2rem;
				color: #fff;
				font-size: 3rem;
				z-index: 99999999;
				width: 6rem;
				height: 6rem;
			}
		}
	}
	.detail_wrap {
		padding-top: 6rem;
		display: flex;
		.left {
			width: 50%;
			.video_wrap {
				padding: 2rem 3.83rem 1.88rem 1.88rem;
				box-sizing: border-box;
				position: relative;
				.img_default {
					width: 60.25rem;
					height: 60.25rem;
					box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2); // opacity: 0;
					// animation: imgScale 0.2s ease ;
					// animation-fill-mode: forwards;
					img {
						width: 100%;
						height: 100%;
					}
					.playVideo {
						width: 4.25rem;
						height: 4.25rem;
						position: absolute;
						right: 6.68rem;
						top: 4.68rem;
					}
				}
			}
			.product_img_wrap {
				padding-left: 1.88rem;
				padding-right: 0.88rem;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				.product_img_list {
					display: flex;
					padding: 5px;
					justify-content: center;
					.moreshow {
						width: 47rem;
						height: 14rem;
						overflow-x: scroll;
					}
					.threedImg {
						width: 13.63rem;
						height: 13.63rem;
						position: relative;
						&.active {
							border: solid 1px #ff9c9c;
						}
						div {
							border: solid 1px #e5e5e5;
						}
					}
					.threedImg::before {
						content: "";
						position: absolute;
						width: 70%;
						height: 4.4rem;
						background-image: url("../../assets/threeD.png");
						background-size: cover;
						bottom: 1rem;
						left: 0;
						right: 0;
						margin: auto;
						z-index: 9;
					}
					li {
						box-sizing: border-box;
						.normalImg {
							width: 13.63rem;
							height: 13.63rem;
							box-sizing: border-box;
							border: solid 1px #e5e5e5;
							margin-right: 1.88rem;
							&:nth-last-child(1) {
								margin-right: 0;
							}
						}
						div {
							float: left;
							background-color: #fff;
							&.active {
								// box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
								border: solid 1px #ff9c9c;
							}
						}
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		.right {
			width: 50%;
			.couples_color {
				float: left;
				font-size: 1.88rem;
				color: #999;
				margin-right: 2.5rem;
				margin-top: 1.9rem;
			}
			.finness {
				flex: 1;
				em {
					margin-right: 3.63rem;
					margin-top: 1.5rem;
					display: inline-block;
					border: 1px solid #e5e5e5;
					border-radius: 0.25rem;
					padding: 0.88rem 0.81rem;
					box-sizing: border-box;
					&.active {
						background: #ff7b7b;
						border-radius: 0.25rem;
						color: #ffffff;
						border: none;
					}
				}
			}
			.product_name {
				padding-top: 2.7%;
				font-size: 2.25rem;
				color: #333;
				box-sizing: border-box;
				transform: translateX(5rem);
				opacity: 0;
				span {
					color: #999999;
					font-size: 1.5rem;
					margin-left: 0.63rem;
				}
			}
			.product_price {
				color: #ff9c9c;
				font-size: 3rem;
				padding: 1.25rem 0;
				transform: translateX(5rem);
				opacity: 0;
				border-bottom: 1px solid #e5e5e5;
				em {
					font-size: 1.25rem;
					font-weight: normal;
				}
			}
			.product_params_container {
				// padding-right:1.25rem;
				box-sizing: border-box;
				.couples_list {
					margin-top: 1.2rem;
					border: 1px solid #e5e5e5;
					.couples_list_title {
						border-bottom: 1px solid #e5e5e5;
						height: 5.14rem;
						font-size: 1.88rem;
						color: #ff7b7b;
						line-height: 5.14rem;
						span {
							font-size: 1.5rem;
							color: #999;
							margin-left: 0.94rem;
						}
						.couples_list_male,
						.couples_list_lady {
							float: left;
							width: 7.2rem;
							text-align: right;
							font-size: 1.88rem;
							position: relative;
						}
						.couples_list_male::before,
						.couples_list_lady::before {
							content: "";
							position: absolute;
							top: 1.3rem;
							left: 1.3rem;
							width: 1rem;
							height: 2.25rem;
							background-color: #4a90e2;
						}
						.couples_list_lady::before {
							background-color: #ff9c9c;
						}
					}
					.couples_list_content {
						width: 100%;
						overflow: hidden;
						padding-bottom: 1.56rem;
						.couples_list_proto {
							width: 100%;
							float: left;
							margin-top: 1.56rem;
							margin-left: 1.25rem;
							font-size: 1.5rem;
							line-height: 1.88rem;
							.couples_list_container {
								float: left;
								width: 20rem;
								.couples_list_value {
									display: inline-block;
									font-size: 1.5rem;
									line-height: 1.88rem;
								}
							}
							span {
								display: inline-block;
								width: 10rem;
								float: left;
								font-size: 1.88rem;
								color: #999;
							}
						}
					}
				}
			}
			.btn {
				margin-top: 5rem;
				display: flex;
				align-items: center;
				opacity: 0;
				transform: translateY(5rem);
				animation: upDown 0.2s 0.5s ease;
				animation-fill-mode: forwards;
			}
			.next_step {
				color: #ffffff;
				font-size: 1.5rem;
				width: 25rem;
				height: 5.5rem;
				line-height: 5.5rem;
				text-align: center;
				background-image: linear-gradient(-134deg, #ffbaba 0%, #f27474 100%);
				border-radius: 0.625rem;
				margin-left: 1.88rem;
				&:active {
					opacity: 0.8;
				}
			}
			.lookDetail {
				width: 12.5rem;
				height: 5.5rem;
				border: 1px solid #e5e5e5;
				border-radius: 0.63rem;
				font-size: 1.5rem;
				color: #333;
				text-align: center;
				line-height: 5.5rem;
			}
			.tips {
				color: #999999;
				font-size: 1.5rem;
				margin-top: 1.63rem;
				line-height: 1.38rem;
				opacity: 0;
				transform: translateY(5rem);
				animation: upDown 0.2s 0.5s ease;
				animation-fill-mode: forwards;
			}
		}
	} // 右边的动画
	@keyframes leftRightFade {
		0% {
			opacity: 0;
			transform: translateX(5rem);
		}
		100% {
			opacity: 1;
			transform: translateX(0rem);
		}
	} //选定此款
	@keyframes upDown {
		0% {
			opacity: 0;
			transform: translateY(5rem);
		}
		100% {
			opacity: 1;
			transform: translateY(0rem);
		}
	}
	@keyframes imgScale {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes imgOpacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	} // 左下角四个图片的
	@keyframes imgFadeIn {
		0% {
			transform: translateX(5rem);
			opacity: 0;
		}
		100% {
			transform: translateX(0.1rem);
			opacity: 1;
		}
	}
}
</style>
