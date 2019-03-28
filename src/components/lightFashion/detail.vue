<template>
	<div class="lightFashionDetail">
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
							<img :src="mainImg+'_960x960'" v-if="mainImg" @load="loadingMain()" v-show="loadMainImg">
							<img :src="imgLoading" v-show="!loadMainImg">
						</template>
						<img src="../../assets/assetsFinal/playVideo.png" alt="" class="playVideo" @click="videoIsShow = true" v-if="Video.ImageCode">
					</div>
				</div>
				<!-- 左下角的的图片 -->
				<div class="product_img_wrap">
					<div class="product_img" ref="product_img">
						<ul class="product_img_list">
							<!-- 删除v-if="threeD.ImageCode" -->
							<li @click="show3D" class="transitionImg threedImg"  style="margin-right:1.88rem;" v-if="has3D">
								<div v-for="(item,index) in styleImg" :key="index" :class='{"active": imgActive}'>
									<img :src="http.imgUrl+item.ImageCode+config.detailImgSize" v-if="item.IsMain" v-show="item.loading" @load='loadingImg(index)'>
									<img :src="imgLoading" v-show="!item.loading" v-if="item.IsMain">
								</div>
							</li>
							<li class="transitionImg" :class="{'moreshow': (has3D && styleImg.length >= 3) || (!has3D && styleImg.length >= 4)}">
								<div style="display:flex;">
									<div class="normalImg" :class='{"active":item.ImageCode == curCode && !imgActive}' @click="getCurImg(item.ImageCode)" v-for="(item,index) in styleImg" :key="index">
										<img :src="http.imgUrl+item.ImageCode+config.detailImgSize" v-if="styleImg" v-show="item.loading" @load='loadingImg(index)'>
										<img :src="imgLoading" v-show="!item.loading">
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="right">
				<p class="product_name transition all-container">{{detailData.StyleName}}<span>{{detailData.Category}} 款号{{detailData.StyleNo}}</span></p>
				<p class="product_price transition all-container" v-if="detailData.MinPrice">￥{{(detailData.MinPrice).toFixed(2) | money}}<em>（戒托价格）</em></p>
				<div class="product_params_container all-container">
					<div class="product_params">
						<ul v-if='detailData.Data'>
							<li class="differ transition" >
								<span>成色</span>
								<div class="finness" v-if="detailData.Data[0].DataName == 'Condition'">
									<em :class="{'active':item.active}" @click="selFinness(item.Id,item.Name)" v-for="item in detailData.Data[0].DataList" :key="item.Id">{{item.Name}}</em>
								</div>
							</li>
							<!-- <li class="transition">
								<span>适配镶口</span><em v-if="detailData.Data[1].DataName == 'Weight'" v-for="(item,index) in detailData.Data[1].DataList" :key="item.Id">{{item.Name*100 > 100?item.Name:item.Name*100}}{{item.Name*100 > 100?'ct':'分'}}{{index==detailData.Data[1].DataList.length-1?"":'、'}}</em>
							</li> -->
							<li class="differ transition">
								<span>尺寸</span>
								<div class="sel-params" v-if="sizeData.length>0">
									<p @click="isShowSize = !isShowSize">{{Size}}</p>
									<transition name="opacityLeave">
										<div class="condition-list" v-show="isShowSize">
											<ul>
												<li :class="{'active':item.active}" @click="getSize(item.Id)" :key="index" v-for="(item,index) in sizeData">{{item.Name}}</li>
											</ul>
										</div>
									</transition>
								</div>
								<div class="" v-else>无</div>
							</li>
							<li class="differ transition"><span>金重</span><em>约{{detailData.TotalWeight}}g</em></li>
						</ul>
					</div>
					<div class="subValue transition  all-container">
						<ul>
							<li v-if="detailData.AuxiliaryStoneType"><span>辅石</span><em class="differ">{{detailData.AuxiliaryStoneType}}</em></li>
							<li v-if="detailData.AuxiliaryStoneQuantity"><span>辅石粒数</span><em>{{detailData.AuxiliaryStoneQuantity}}</em></li>
							<li v-if="detailData.AuxiliaryStoneWeight"><span>辅石总重</span><em>{{detailData.AuxiliaryStoneWeight}}ct</em></li>
						</ul>
					</div>
				</div>
				<div class="btn">
					<!--  -->
					<div class="lookDetail" @click="lookDetail()" v-if="imgArrBanner.length">查看图文详情</div>
					<div class="next_step" @click="next_step()">选定此款</div>
				</div>
				<div class="tips">* 款式最终价格是根据款式、SKU属性、配石等信息综合定价</div>
			</div>
		</div>
		<div class="detailSlide" v-show="isLookDetail">
			<swiper :options="swiperOption" ref="mySwiper" style="margin-top:6.25rem;">

				<swiper-slide :key="index" v-for="(item,index) in imgArrBanner">
					<img :src="http.imgUrl+item.url+config.defaultImgSize" style="width:100%;height:-webkit-fill-available;" alt="" v-show="item.loading" @load='loadingSwiper(index)'>
					<!-- <img :src="imgLoading" v-show="!item.loading"> -->
				</swiper-slide>

				<div class="swiper-pagination" slot="pagination"></div>
				<div class="swiper-scrollbar"  slot="scrollbar"></div>

			</swiper>
		</div>
		
		<prompt-box :msg="msg" v-show="ispromptBox"></prompt-box>
		<v-videoPlayer v-if="videoIsShow" @videoClose="videoIsShow=false" :options="videoOptions"></v-videoPlayer>
        <v-footer :finishParams="finishParams" v-show="!isLookDetail" :header="header"></v-footer>
		<v-loading v-show="isloading"></v-loading>
    </div>
</template>

<script>
import footer from "components/lightFashion/footer";
import header from "components/lightFashion/header";
import loading from "@/components/isLoading/isloading";
import promptBox from "components/promptBox/promptBox";
import threeD from "components/threeD/threeD";

// import slide from './detailSlide'
import {
	swiper,
	swiperSlide
} from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
const page1 = require("@/assets/myBride/1.jpg");
const page2 = require("@/assets/myBride/2.jpg");
const page3 = require("@/assets/myBride/3.jpg");
const page4 = require("@/assets/myBride/4.jpg");
const page5 = require("@/assets/myBride/5.jpg");
const imgLoading = require("@/assets/assetsFinal/imgLoading.png");
export default {
	data() {
		const img1 = require("../../assets/assetsFinal/thumbnail-2.png");
		const img2 = require("../../assets/assetsFinal/thumbnail-3.png");
		const img3 = require("../../assets/assetsFinal/thumbnail-1.png");
		const mainImg = require("../../assets/assetsFinal/bigPic.png");
		return {
			imgLoading: imgLoading,
			finishParams: {
				isStyleListFinshed: true,
				isDetail: true,
				isShow: true,
				footerWord: {
					firstStep: "款式列表",
					secondStep: "款式详情",
					fourStep: "确认信息"
				}
			},
			header: {
				title: "款式详情",
				isShow: true,
				showReturn: false,
				showRight: '',
				return: {
					name: 'lightFashion',
					params: {
						id: this.$route.params.id,
						letter: {
							isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
							lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
						}
					}
				}
			},
			msg: {
				text: ""
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

			fullHeight: document.documentElement.clientHeight,
			imgArr: [],

			curCode: "",
			mainImg: '',
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
			threeD: {},
			imgActive: false,
			isShow3D: false,

			isShowSize: false,
			isloading: false,
			ispromptBox: false,

			sizeData: [],
			Size: "点击选择",
			finness: '',
			loadMainImg: false,
			img3DList: [],
			has3D: false
		}
	},
	created() {
		window.vm = this
		if (this.$route.params.lastPage == 'series') {
			this.header.return.name = 'series'
		}
		this.$store.commit("SET_DETAILLIGHT", true)
		this.getInit()
		if (this.$route.params.lastPage || this.$route.query.lastPage == 'series') {
			this.fromSeries = true
			let query = this.$route.query
			query.lastPage = 'series'
			this.header.return.name = 'series'
			this.header.return.params = this.$route.params
			this.header.return.query = query
		}
	},
	//after
	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (from.name == "lightFashion") {
				vm.$store.commit("SET_DISTINGUISH_LIGHT_OR_SUITS", "lightFashion");
			}
			if (from.name == "series") {
				vm.$store.commit("SET_DISTINGUISH_LIGHT_OR_SUITS", "series");
			}
			if (vm.$store.state.relate.distinguishLightOrSuits == "lightFashion") {
				vm.header.return.name = "lightFashion"
			}
			if (vm.$store.state.relate.distinguishLightOrSuits == "series") {
				vm.header.return.name = "series"
			}
			//订单详情
			if (from.name == "finalFashionList") {
				vm.header.return.name = "finalFashionList"
			}
			// if (vm.$store.state.relate.distinguishLightOrSuits == "") { //页面刷新再点击返回，直接返回至home页
			// 	vm.$router.replace({path:'/'})
			// }
		});
	},
	methods: {
		loadingSwiper(index) {
			this.imgArrBanner.forEach((item, index1) => {
				if (index == index1) {
					item.loading = true
				}
			})
		},
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
				this.header.showRight = '确定'
				this.header.showReturn = true;
			}
		},
		close3D() {
			this.isShow3D = false;
		},
		getBack(val) {
			if (val) {
				this.header.showRight = ''
				this.isLookDetail = false;
				this.header.showReturn = false;
			}
		},
		getSize(id) {
			this.sizeData.forEach(item => {
				if (item.Id == id) {
					item.active = true;
					this.Size = item.Name;
					this.isShowSize = false;
				} else {
					item.active = false;
				}
			});
			let obj = {
				Size: this.Size, //价格
				finness: this.finness //成色
			}
			this.$store.commit("SET_SIZELIGHT", obj)
			this.searchSku()
		},
		next_step() {
			//index: this.$route.params.index,
			let len = false;
			let that = this;
			let flag = false;
			this.detailData.Data.forEach(item => {
				if (item.DataName == "Condition") {
					item.DataList.forEach((item1, index) => {
						if (item1.active) {
							len = true;
						}
					});
				}
			});
			if (this.sizeData.length > 0) {
				if (this.Size != "点击选择") {
					flag = true;
				} else {
					flag = false;
				}
			} else {
				flag = true;
			}
			if (len && flag) {
				this.$router.push({
					name: "lightFashionSettlement",
					params: {
						id: this.$route.params.id,
						letter: {
							isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
							lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
						}
					},
					query: this.$route.query
				});
			} else {
				if (!len) {
					this.tips("请选择成色！");
				} else if (!flag) {
					this.tips("请选择尺寸！");
				}
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
		getCurImg(imgUrl) {
			this.isShow3D = false;
			this.imgActive = false;
			this.mainImg = this.http.imgUrl + imgUrl;
			this.curCode = imgUrl;
		},
		show3D() {
			this.imgActive = true;
			if (this.has3D) {
				this.isShow3D = true;
			}
		},
		selFinness(id, name) {
			let obj = {
				Size: this.Size, //价格
				finness: "" //成色
			};
			this.detailData.Data.forEach(item => {
				//把价格和选择的成色保存到vuex
				if (item.DataName == "Condition") {
					item.DataList.forEach(item1 => {
						if (item1.Id == id) {
							item1.active = true;
						} else {
							item1.active = false;
						}
						if (item1.active) {
							obj.finness = item1.Name;
							this.finness = obj.finness
						}
					})
				}
			})

			this.$store.commit("SET_SIZELIGHT", obj); //保存
			if (this.detailData.FinenessImageList && this.detailData.FinenessImageList.length > 0) {
				this.detailData.FinenessImageList.forEach(item => {
					if (item.FinenessName == name) {
						this.mainImg = this.http.imgUrl + item.ImageCode
					}
				})
			}
			if(obj.finness){
				this.searchSku()
			}
		},
		getInit() {
			let that = this;
			this.isloading = true;
			let options = {
				url: "/purchase_Api_FashionStyle_GetInfo",
				params: {
					StyleId: this.$route.params.id,
					PlatId: "cea08b0b-53c8-459e-8112-664fe48a17a8"
				}
			};
			let cbok = res => {
				this.isloading = false;
				let data = res.data.data;
				this.detailData = data;
				if (this.$store.state.relate.lightFashion.Size) {
					this.Size = this.$store.state.relate.lightFashion.Size;
				}
				this.finness = this.$store.state.relate.lightFashion.finness
				for (let key in this.detailData) {
					if (key == "Data") {
						this.detailData[key].forEach(item => {
							if(item.DataName == 'Condition'){
								item.DataList.forEach((item1, index) => {
									this.$set(item1, "active", false);
									if (this.finness == item1.Name) {
										this.$set(item1, "active", true);
									}
								})
							}else if(item.DataName == "RingSize"){
								item.DataList = item.DataList || []
								item.DataList = item.DataList.map(ring => {
									ring.Sort = Number(ring.Name)
									return ring
								})
								item.DataList.sort((a, b) => {
									return a.Sort - b.Sort
								})
								item.DataList.forEach((item1, index) => {
									this.$set(item1, "active", false);
									if (this.Size == item1.Name) {
										this.$set(item1, "active", true);
									}
								})
								this.sizeData = item.DataList
							}
						})
					} else if (key == "StyleImgList") {
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
						})
						if (this.detailData[key].length >= 4) {
							let imgWrap = this.$refs.product_img;
							imgWrap.style.width = "100%";
							imgWrap.style.overflow = "scroll";
						}
					} else if (key == "CopyWriting") {
						let arr = []
						if (this.detailData[key]) {
							arr = this.detailData[key].split(",");
						}
						arr.forEach(item => {
							let obj = {}
							obj.url = item;
							this.imgArrBanner.push(obj);
						})
						this.imgArrBanner.forEach(item => {
							this.$set(item, 'loading', false)
						})
					} else if (key == 'SkuList') {
						this.detailData.SkuList.forEach(item => {
							this.$set(item, 'finness', '')
							this.$set(item, 'size', '')
							item.SkuAttrList = item.SkuAttrList || []
							item.SkuAttrList.forEach(attr => {
								if(attr.StyleAttrName == '成色'){
									this.$set(item, 'finness', attr.StyleAttrValueName)
								}
								if(attr.StyleAttrName == '戒指手寸'){
									this.$set(item, 'size', attr.StyleAttrValueName)
								}
							})
						})
						if(this.finness){
							this.searchSku()
						}
					}
				}
				if (this.Video.ImageCode) {
					//视频
					let videoSrc = that.http.videoUrl + that.Video.ImageCode
					if (self.isApp) { //判断是否在app模式
						videoSrc = self.getLocalVideo(that.detailData.StyleNo) || videoSrc;
					}
					that.videoOptions = {
						src: videoSrc,
						title: "款式详情"
					};
				}
				// 右边
				this.$nextTick(() => {
					// 左下角图片
					let transitionImg = document.getElementsByClassName("transitionImg");
					for (let i = 0; i < transitionImg.length; i++) {
						transitionImg[i].style.opacity = 0;
						transitionImg[i].style.transform = "translateX(5rem)";
					}
					for (let i = 0; i < transitionImg.length; i++) {
						transitionImg[i].style.animation = "imgFadeIn 0.2s ease";
						transitionImg[i].style["animation-delay"] = i * 0.1 + 0.2 + "s";
						transitionImg[i].style["animation-fill-mode"] = "forwards";
					}
					let liTransition = document.getElementsByClassName("all-container");
					for (let i = 0; i < liTransition.length; i++) {
						liTransition[i].style.transform = "translateX(5rem)";
						liTransition[i].style.opacity = 0;
					}
					for (let i = 0; i < liTransition.length; i++) {
						liTransition[i].style.animation = "leftRightFade 0.2s 0.5s ease forwards";
					}

					// 选择此款
					let btn = document.getElementsByClassName('btn');
					let tips = document.getElementsByClassName('tips');
					btn[0].style.animation = 'upDown 0.2s 0.7s ease forwards'
					tips[0].style.animation = 'upDown 0.2s 0.7s ease forwards'
				})
			};
			let cbnull = res => {
				this.isloading = false;
			};
			let cbno = res => {
				this.tips(res.data.message || "服务开小差！")
				this.isloading = false;
			};
			this.http.get(options, cbok, cbno, cbnull);
		},
		searchSku(){
			let filterFinness = this.detailData.SkuList.filter(sku => sku.finness == this.$store.state.relate.lightFashion.finness),
				list = [],
				size
			if(this.Size && this.Size != '点击选择'){
				size = this.Size	
			}else{
				size = this.sizeData[0] && this.sizeData[0].Name
			}
			filterFinness.forEach(item => {
				if(item.size == size){
					let price = item.DiscountPrice>0 ? item.DiscountPrice : item.TotalPrice
					list.push(price)
				}
			})
			if(list.length > 0){
				this.detailData.MinPrice = Math.min.apply(null, list)
			}
		},
		get3DInfo() {
			let options = {
				url: "/resource_GetResource_GetVideoImgNumber",
				params: {
					Id: this.threeD.ImageCode
				}
			}
			let cbok = res => {
				let data = res.data.data
				if (data <= 10) {
					this.has3D = false
				} else {
					this.threeD.ImgQuantity = data

					let len = this.threeD.ImgQuantity - 1,
						list = [],
						count = 1;
					while (count <= len) {
						let length = count.toString().length,
							index = count;
						if (length == 1) {
							index = '00' + count;
						} else if (length == 2) {
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
			this.http.get(options, cbok, cbno, cbnull);
		}
	},
	components: {
		"v-footer": footer,
		"v-header": header,
		"v-loading": loading,
		"prompt-box": promptBox,
		"v-threeD": threeD
	}
};
</script>

<style lang="scss">
#app {
	height: 100%;
}

em {
	font-style: normal;
}

.lightFashionDetail {
	background: #ffffff;
	height: 100%; // margin-top: 3.75rem;
	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		position: absolute;
		left: 0;
		top: 0;
		display: none;
		&.active {
			display: block;
		}
	}
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
		display: flex;
		padding-top: 6.25rem;
		.sel-params {
			width: 16.25rem;
			height: 4.38rem;
			border-radius: 0.25rem;
			border: 1px solid #e5e5e5;
			line-height: 4.38rem;
			font-size: 1.5rem;
			color: #999999;
			position: relative;
			border-radius: 0.63rem;
			text-align: center;
			p {
				width: 16.25rem;
				height: 4.38rem;
				border-radius: 0.25rem;
				line-height: 4.38rem;
				text-align: center;
			}
			.condition-list {
				width: 30rem;
				position: absolute;
				background: #ffffff;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
				left: 0;
				margin-top: 1.25rem;
				border-radius: 0.63rem;
				box-sizing: border-box;
				z-index: 99;
				ul {
					display: flex;
					flex-wrap: wrap;
					max-width: 30.3rem; //   border: 1px solid #e5e5e5;
					box-sizing: border-box;
					border-radius: 0.63rem;
					overflow: hidden;
				}
				li {
					width: 7.5rem; // flex: 1;
					height: 4.38rem;
					color: #333;
					font-size: 1.5rem;
					box-sizing: border-box;
					text-align: center;
					padding: 0;
					margin: 0;
					border-right: 1px solid #e5e5e5;
					border-bottom: 1px solid #e5e5e5;
					margin-bottom: 0;
					&.active {
						background: #ff7b7b;
						color: #ffffff;
					}
				}
			}
		}
		.left {
			width: 50%;
			.video_wrap {
				padding: 2rem 2rem 1.88rem 1.88rem;
				box-sizing: border-box;
				position: relative;
				.img_default {
					width: 60.25rem;
					height: 60.25rem;
					box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
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
				padding-right: 1.88rem;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				.product_img {}
				.product_img_list {
					display: flex;
					padding: 5px 0;
					justify-content: center;
					.moreshow {
						width: 44.65rem;
						height: 14rem;
						overflow-x: scroll;
					}
					.threedImg {
						width: 13.63rem;
						height: 13.63rem;
						position: relative;
						box-sizing: border-box;
						&.active {
							border: solid 1px #ff9c9c;
						}
						div {
							border: solid 1px #e5e5e5;
						}
						img {
							width: 100%;
							height: 100%;
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
			padding-left: 1.88rem;
			box-sizing: border-box;
			.product_name {
				padding-top: 2.7%;
				font-size: 2.25rem;
				color: #333;
				box-sizing: border-box;
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
				em {
					font-size: 1.25rem;
					font-weight: normal;
				}
			}
			.product_params_container {
				// padding-right:1.25rem;
				position: relative;
				z-index: 100;
				box-sizing: border-box;
				.product_params {
					padding: 2.5rem 0 0 0;
					box-sizing: border-box;
					border-top: 1px solid rgba(0, 0, 0, 0.2);
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					.differ {
						font-size: 1.88rem;
						margin-bottom: 1.5rem; // transform: translateX(5rem);
						opacity: 1;
						display: flex;
						align-items: center;
						color: #333;
						span {
							opacity: 0.5;
							margin-right: 2em;
						}
						em {
							display: inline-block;
						}
						select {
							width: 11.25rem;
							height: 4.38rem;
							border-radius: 0.25rem;
							text-align: center;
						}
						.finness {
							flex: 1;
							margin-bottom: 0;
							em {
								margin-right: 3.63rem;
								display: inline-block;
								border: 1px solid #e5e5e5;
								border-radius: 0.25rem;
								padding: 0 0.81rem;
								height: 4.38rem;
								text-align: center;
								line-height: 4.38rem;
								transition: background 0.5s ease;
								&.active {
									background: #ff7b7b;
									border-radius: 0.25rem;
									color: #ffffff;
								}
								&:active {
									opacity: 0.8;
								}
							}
						}
						&.differ {
							span {
								margin-right: 4em;
							}
						}
					}
				}
				.subValue {
					font-size: 1.5rem;
					transform: translateX(5rem);
					opacity: 0;
					margin-top: 2.5rem;
					ul {
						li {
							color: #333;
							font-size: 1.88rem;
							display: flex;
							margin-bottom: 1.56rem;
							span {
								color: #999999;
							}
							em {
								margin-left: 2em;
								&.differ {
									margin-left: 4em;
								}
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
				margin-right: 1.88rem;
			}
			.tips {
				color: #999999;
				font-size: 1.5rem;
				margin-top: 1.63rem;
				line-height: 1.38rem;
				opacity: 0;
				transform: translateY(5rem);
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
