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
							<li v-if="has3D"  @click="show3D" class="transitionImg threedImg"  style="margin-right:1.88rem;">
								<div v-for="(item,index) in styleImg" :key="index" :class='{"active": imgActive}' v-if="item.IsMain">
									<img :src="http.imgUrl+item.ImageCode+config.detailImgSize" v-if="item.IsMain" v-show="item.loading" @load='loadingImg(index)'>
									<img :src="imgLoading" v-show="!item.loading" v-if="item.IsMain">
								</div>
							</li>
							<li class="transitionImg" :class="{'moreshow': (has3D && styleImg.length >= 3) || (!has3D && styleImg.length >= 4)}">
								<div style="display:flex;">
									<div class="normalImg" :class='{"active":item.ImageCode == curCode && !imgActive}' @click="getCurImg(item.ImageCode)" v-for="(item,index) in styleImg" :key="index">
										<img :src="http.imgUrl+item.ImageCode+config.detailImgSize" v-show="item.loading" @load='loadingImg(index)'>
										<img :src="imgLoading" v-show="!item.loading">
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="right">
				<p class="product_name transition">{{detailData.StyleName}}<span>{{detailData.Category}} 款号{{detailData.StyleNo}}</span></p>
				<p class="product_price transition" v-if="detailData.MinPrice">￥{{(detailData.MinPrice).toFixed(2)|money}}<em>（戒托价格）</em></p>
				<div class="product_params_container">
					<div class="product_params">
						<ul v-if='detailData.Data'>
							<li class="differ transition" >
								<span>成色</span>
								<div class="finness" v-if="detailData.Data[0].DataName == 'Condition'">
									<em :class="{'active':item.active}" @click="selFinness(item.Id,item.Name)" v-for="item in detailData.Data[0].DataList" :key="item.Id">{{item.Name}}</em>
								</div>
							</li>
							<li class="transition">
								<span>适配镶口</span><em v-if="detailData.Data[1].DataName == 'Weight'" v-for="(item,index) in detailData.Data[1].DataList" :key="item.Id">{{item.Name}}ct{{index==detailData.Data[1].DataList.length-1?"":'、'}}</em>
							</li>
							<li class="differ transition"><span>尺寸</span><em>{{detailData.RingSize}}</em></li>
							<li class="differ transition"><span>金重</span><em>约{{detailData.TotalWeight}}g</em></li>
						</ul>
					</div>
					<div class="subValue transition">
						<ul>
							<li><span>镶石</span><em v-if="detailData.AuxiliaryStoneType">{{detailData.AuxiliaryStoneType}}</em><em v-else>无</em></li>
							<li><span>镶石粒数</span><em v-if="detailData.AuxiliaryStoneQuantity">{{detailData.AuxiliaryStoneQuantity}}</em><em v-else>无</em></li>
							<li><span>镶石总重</span><em v-if="detailData.AuxiliaryStoneWeight">{{detailData.AuxiliaryStoneWeight}}ct</em><em v-else>无</em></li>
						</ul>
					</div>
				</div>
				<div class="btn" v-if="$store.state.relate.isSroneOrStyle && !fromSeries">
					<div class="lookDetail" @click="lookDetail()" v-if="imgArrBanner.length>0">查看图文详情</div>
					<div class="next_step only" @click="next_step()">选购配石</div>
					<div class="next_step only blue" @click="addToCart()">单买戒托</div>
				</div>
				<div class="btn" v-else>
					<div class="lookDetail" @click="lookDetail()" v-if="imgArrBanner.length>0">查看图文详情</div>
					<div class="next_step" @click="next_step()">选定此款</div>
				</div>
				<div class="tips">* 款式最终价格是根据款式、SKU属性、配石等信息综合定价</div>
			</div>
		</div>
		<div class="detailSlide" v-show="isLookDetail">
			<swiper :options="swiperOption" ref="mySwiper" style="margin-top:6.25rem;">

				<swiper-slide :key="index" v-for="(item,index) in imgArrBanner" >
					<img :src="http.imgUrl+item.url+config.defaultImgSize" style="width:100%;height:-webkit-fill-available;" alt="" v-show="item.loading" @load='loadingSwiper(index)'>
					<!-- <img :src="imgLoading" v-show="!item.loading"> -->
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
				<div class="swiper-scrollbar"  slot="scrollbar"></div>

			</swiper>
		</div>
		<prompt-box :msg="msg" v-show="ispromptBox"></prompt-box>
		<v-videoPlayer v-if="videoIsShow" @videoClose="videoIsShow=false" :options="videoOptions"></v-videoPlayer>
        <v-footer :flag="flag" :finishParams="finishParams" v-if="!isLookDetail" :header="header"></v-footer>
		<v-loading v-show="isloading"></v-loading>
    </div>
</template>

<script>
import footer from "./footer";
import header from "./header";
import slide from "./detailSlide";
import loading from "@/components/isLoading/isloading";
import threeD from "components/threeD/threeD";
import promptBox from "components/promptBox/promptBox";
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
		const img1 = require("../../assets/assetsFinal/thumbnail-2.png");
		const img2 = require("../../assets/assetsFinal/thumbnail-3.png");
		const img3 = require("../../assets/assetsFinal/thumbnail-1.png");
		const mainImg = require("../../assets/assetsFinal/bigPic.png");
		return {
			finishParams: {
				isStyleListFinshed: true,
				isDetail: true,
				isShow: true,
				footerWord: {
					firstStep: "款式列表",
					secondStep: "款式详情",
					thirdStep: "配石",
					fourStep: "确认信息"
				}
			},
			header: {
				title: "款式详情",
				isShow: true,
				return: {
					name: "finalFashion",
					params: {
						id: this.$route.params.id,
						index: this.$route.params.index, //这个参数是列表的第几行索引
						tableRow: this.$route.params.tableRow,
						letter: {
							isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
							lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
						},
						size: this.$route.params.size,
						inlay: this.$route.params.size
					}
				},
				showRight: ""
			},

			imgLoading: imgLoading,
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
			imgActive: false,

			fullHeight: document.documentElement.clientHeight,
			imgArr: [],

			curCode: "",
			mainImg: "",
			detailData: {},
			styleImg: [],

			isShow3D: false,
			videoIsShow: false,
			videoOptions: {
				src: "",
				title: ""
			},
			Video: {},
			threeD: {},
			isLookDetail: false, //是否查看详情
			imgUrlDetail: "",

			isloading: false,
			ispromptBox: false,
			msg: {
				text: "",
				time: "",
				show: false
			},
			loadMainImg: false,
			flag: {
				isNextStep: false,
				name: 'detail',
				isNextSettlement: false
			},
			has3D: false,
			img3DList: [],
			fromSeries: false
		};
	},
	created() {
		window.vm = this
		if (!this.$store.state.relate.isSroneOrStyle) {
			this.finishParams.isStyleListFinshed = true;
			this.finishParams.isDetailFinshed = true;
			this.finishParams.isStone = true;
			this.finishParams.isDetail = false;
			this.finishParams.footerWord.firstStep = "配石列表";
			this.finishParams.footerWord.secondStep = "款式列表";
			this.finishParams.footerWord.thirdStep = "款式详情";
			this.finishParams.footerWord.fourStep = "确认信息";
			this.$store.commit("SET_STONE", true);
		} else {
			this.$store.commit("SET_DETAIL", true);
		}
		this.getInit();
		if (this.$route.params.lastPage || this.$route.query.lastPage == 'series') {
			this.fromSeries = true
			let query = this.$route.query
			query.lastPage = 'series'
			this.header.return = {
				name: 'series',
				params: this.$route.params,
				query
			}
		}
		if (this.$route.query.from == 'orderList') {
			let query = this.$route.query
			this.header.return = {
				name: 'finalFashionList',
				params: this.$route.params,
				query
			}
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (from.name == "finalFashion") {
				vm.$store.commit("SET_DISTINGUISH_FASHION_OR_SUITS", "finalFashion");

			}
			if (from.name == "series") {
				vm.$store.commit("SET_DISTINGUISH_FASHION_OR_SUITS", "series");
			}
			if (vm.$store.state.relate.distinguishFashionOrSuits == "finalFashion") {
				vm.header.return.name = "finalFashion"
			}
			if (vm.$store.state.relate.distinguishFashionOrSuits == "series") {
				vm.header.return.name = "series"
			}
			// if (vm.$store.state.relate.distinguishFashionOrSuits == "") { //页面刷新再点击返回，直接返回至home页
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
				this.header.showRight = this.$store.state.relate.isSroneOrStyle ?
					"选择配石" :
					"确认信息";
			}
		},
		close3D() {
			this.isShow3D = false;
		},
		getBack(val) {
			if (val) {
				this.isLookDetail = false;
				this.header.showRight = false;
			}
		},
		next_step() {
			//index: this.$route.params.index,
			let len = false; //判断是否点击了成色
			this.detailData.Data.forEach(item => {
				if (item.DataName == "Condition") {
					item.DataList.forEach((item1, index) => {
						if (item1.active) {
							len = true;
							this.flag.isNextStep = false;
						}
					});
				}
			});

			if (!len) {
				this.flag.isNextStep = true;
				this.ispromptBox = true;
				this.$nextTick(() => {
					this.msg.text = "请选择成色！";
				});
				setTimeout(() => {
					this.msg.time = 500;
				}, 1000);
				setTimeout(() => {
					this.ispromptBox = false;
					this.msg.time = null;
					this.msg.text = null;
				}, 1500)

				return false;
			}
			let routeName = 'finalFashionStone',
				tableRow,
				index
			if (!this.$store.state.relate.isSroneOrStyle) {
				routeName = 'finalFashionSettlement'
				tableRow = this.$route.params.tableRow
				index = this.$route.params.index
			}
			this.$router.push({
				name: routeName,
				params: {
					id: this.$route.params.id,
					index, //列表索引
					tableRow,
					letter: {
						isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
						lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
					},
					size: this.$route.params.size,
					inlay: this.$route.params.inlay
				},
				query: this.$route.query
			});
		},
		addToCart() {
			let len = false; //判断是否点击了成色
			this.detailData.Data.forEach(item => {
				if (item.DataName == "Condition") {
					item.DataList.forEach((item1, index) => {
						if (item1.active) {
							len = true;
							this.flag.isNextStep = false;
						}
					});
				}
			});
			if (!len) {
				this.flag.isNextStep = true;
				this.ispromptBox = true;
				this.$nextTick(() => {
					this.msg.text = "请选择成色！";
				});
				setTimeout(() => {
					this.msg.time = 500;
				}, 1000);
				setTimeout(() => {
					this.ispromptBox = false;
					this.msg.time = null;
					this.msg.text = null;
				}, 1500)

				return false;
			}
			let routeName = 'finalFashionSettlement'
			this.$store.commit("SET_STONE", false);
			this.$router.push({
				name: routeName,
				params: {
					id: this.$route.params.id,
					index: this.$route.params.index, //列表索引
					tableRow: null,
					letter: {
						isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
						lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
					},
					size: this.$route.params.size,
					ProType: 11,
					inlay: ''
				}
			});
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
			if(this.has3D){
				this.isShow3D = true;
			}
		},
		selFinness(id, name) {
			let obj = {
				stylePrice: this.detailData.MinPrice, //价格
				finness: "" //成色
			};
			this.detailData.Data.forEach(item => {
				if (item.DataName == "Condition") {
					item.DataList.forEach((item1, index) => {
						if (item1.Id == id) {
							item1.active = true;
							this.flag.isNextStep = false;
						} else {
							item1.active = false;
						}
						if (item1.active) {
							obj.finness = item1.Name;
						}
					})
				}
			})

			this.$store.commit("SET_FASHION", obj); //保存
			if (this.detailData.FinenessImageList && this.detailData.FinenessImageList.length > 0) {
				this.detailData.FinenessImageList.forEach(item => {
					//成色对应的成色图片
					if (item.FinenessName == name) {
						this.mainImg = this.http.imgUrl + item.ImageCode;
					}
				});
			}
			if(obj.finness){
				this.searchSku()
			}
		},
		searchSku(){
			let filterFinness = this.detailData.SkuList.filter(sku => sku.finness == this.$store.state.relate.fashioinObj.finness)
			let list = []
			filterFinness.forEach(item => {
				let price = item.DiscountPrice > 0 ? item.DiscountPrice : item.TotalPrice
				list.push(price)
			})
			this.detailData.MinPrice = Math.min.apply(null, list)
		},
		getInit() {
			let that = this;
			let options = {
				url: "/purchase_Api_FashionStyle_GetInfo",
				// url : "http://192.168.101.41/videoFile/style.php",
				params: {
					StyleId: this.$route.params.id,
					PlatId: "a61e9fbf-1722-4b28-aba5-56afa901f68c"
				}
			};
			this.isloading = true;
			let cbok = res => {
				this.isloading = false;
				let data = res.data.data;
				this.detailData = data;
				// 保存形状到vuex
				if (this.$store.state.relate.isSroneOrStyle) {
					this.$store.commit("SET_SHAPE", this.detailData.MainStoneShape);
				} else {
					this.$store.commit("SET_SHAPE", "");
				}
				for (let key in this.detailData) {
					if (key == "Data") {
						this.detailData[key].forEach(item => {
							let len = 0;
							item.DataList.forEach((item1, index) => {
								if (item.DataName == "Condition") {
									this.$set(item1, "active", false);
									if (this.$store.state.relate.fashioinObj.finness) {
										if (this.$store.state.relate.fashioinObj.finness == item1.Name) {
											this.flag.isNextStep = false;
											this.$set(item1, "active", true);
										}
									} else {
										this.flag.isNextStep = true;
									}
								} else if (item.DataName == "Weight") { //判断重新选托配石是否存在
									if (this.$route.params.tableRow) {
										if (item1.Name != this.$route.params.tableRow.Weight) {
											len++
										}
									}
								}
							});
							if (len == item.DataList.length && item.DataName == "Weight") {
								this.flag.isNextSettlement = true;
							}
						});
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
						});
						if (this.styleImg.length >= 4) {
							let imgWrap = this.$refs.product_img;
							imgWrap.style.width = "100%";
							imgWrap.style.overflow = "scroll";
						}
					} else if (key == "CopyWriting") {
						let arr = []
						if (this.detailData[key]) {
							arr = this.detailData[key].split(",");
						}
						let imgArrList = []
						imgArrList = arr.map(item => {
							return {url: item, loading: false}
						})
						this.imgArrBanner = imgArrList
					} else if (key == "SkuList") {
						let finness = this.$store.state.relate.fashioinObj.finness
						this.detailData.SkuList.forEach(item => {
							this.$set(item, 'finness', '')
							this.$set(item, 'inlay', '')
							this.$set(item, 'size', '')
							item.SkuAttrList.forEach(attr => {
								if(attr.StyleAttrName == '成色'){
									this.$set(item, 'finness', attr.StyleAttrValueName)
								}
								if(attr.StyleAttrName == '戒指手寸'){
									this.$set(item, 'size', attr.StyleAttrValueName)
								}
								if(attr.StyleAttrName == '镶口大小'){
									this.$set(item, 'inlay', attr.StyleAttrValueName)
								}
								if(finness){
									this.searchSku()
								}
							})
						})
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
				let obj = {
					stylePrice: this.detailData.MinPrice, //价格
					finness: "" //成色
				};
				this.detailData.Data.forEach(item => {
					//把价格和选择的成色保存到vuex
					if (item.DataName == "Condition") {
						item.DataList.forEach(item1 => {
							if (item1.active) {
								obj.finness = item1.Name;
							}
						});
					}
				});
				this.$store.commit("SET_FASHION", obj); //保存
				this.$nextTick(() => {
					// 左下角图片
					let transitionImg = document.getElementsByClassName("transitionImg");
					for (let i = 0; i < transitionImg.length; i++) {
						transitionImg[i].style.opacity = 0;
						transitionImg[i].style.transform = "translateX(5rem)";
					}
					for (let i = 0; i < transitionImg.length; i++) {
						transitionImg[i].style.animation = "imgFadeIn 0.2s ease forwards";
						transitionImg[i].style["animation-delay"] = i * 0.1 + 0.2 + "s";
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
					// 选择此款
					let btn = document.getElementsByClassName('btn')[0];
					let tips = document.getElementsByClassName('tips')[0];
					btn && (btn.style.animation = 'upDown 0.2s 0.7s ease forwards')
					tips && (tips.style.animation = 'upDown 0.2s 0.7s ease forwards')
				})
			};
			let cbnull = res => {
				this.isloading = false;
			};
			let cbno = res => {
				this.isloading = false;
				this.tips(res.data.message || "服务开小差！")
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
		"v-slide": slide,
		"v-loading": loading,
		promptBox: promptBox,
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

.finalFashionDetail {
	background: #ffffff;
	height: 100%; // margin-top: 3.75rem;
	.detailSlide {
		width: 100%;
		height: 100%;
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
	.imgDetail {
		font-size: 1.88rem;
		color: #333;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.detail_wrap {
		display: flex;
		padding-top: 6.25rem;
		.left {
			width: 50%;
			.video_wrap {
				padding: 2rem 2rem 1.88rem 1.88rem;
				box-sizing: border-box;
				position: relative;
				.img_default {
					// width: 100%;
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
				width: 100%; // box-sizing: border-box;
				display: flex;
				justify-content: center;
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
				em {
					font-size: 1.25rem;
					font-weight: normal;
				}
			}
			.product_params_container {
				// padding-right:1.25rem;
				box-sizing: border-box;
				.product_params {
					padding: 2.5rem 0 0 0;
					box-sizing: border-box;
					border-top: 1px solid rgba(0, 0, 0, 0.2);
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					li {
						font-size: 1.88rem;
						margin-bottom: 1.5rem; // transform: translateX(5rem);
						opacity: 1;
						display: flex;
						align-items: center;
						color: #333;
						li {
							margin: 0;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						span {
							opacity: 0.5;
							margin-right: 2em;
						}
						em {
							display: inline-block;
						}
						.finness {
							flex: 1;
							margin-bottom: 0;
							em {
								margin-right: 3.63rem;
								display: inline-block;
								border: 1px solid #e5e5e5;
								border-radius: 0.25rem;
								height: 4.38rem;
								text-align: center;
								line-height: 4.38rem;
								padding: 0 0.81rem;
								&.active {
									background: #ff7b7b;
									border-radius: 0.25rem;
									color: #ffffff; // border: none;
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
					ul {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						li {
							display: flex;
							align-items: center;
							margin-right: 3.75rem;
							margin-top: 2.5rem;
							span {
								background: rgba(0, 0, 0, 0.2);
								color: #ffffff;
								padding: 0.31rem 0.69rem;
								box-sizing: border-box;
							}
							em {
								color: #333;
								background: #ffffff;
								border: 1px solid #e5e5e5;
								padding: 0.31rem 0.69rem;
								box-sizing: border-box;
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
				&.only {
					width: 12.5rem;
					margin-right: 1.5rem;
				}
				&.green {
					background-image: linear-gradient(-134deg, #d3e9d5 0%, #39d732 100%);
				}
				&.blue {
					background-image: linear-gradient(-134deg, #9bbeed 0%, #2286e3 100%);
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
				&.only {
					margin-right: 1.5rem;
				}
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
