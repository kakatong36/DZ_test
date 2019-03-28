<template>
    <div class="finalFashionDetail">
        <v-header :header="header" @getBack="getBack"></v-header>
        <div class="detail_wrap" v-show="!isLookDetail">
            <div class="left">
                <div class="video_wrap">
                    <div class="img_default">
						<!-- <div class="container3D" v-if="isShow3D">
							<div class="imgs">
							<img :src="img" 
							v-for="(img,index) in img3DList" 
							:key="index"
							:style="{opacity:current3DIndex==index?1:0}"
							>
							</div>
							<div class="control">
								<div class="bar">
									<div class="thumb" @touchstart="startTouch"></div>
								</div>
							</div>
						</div> -->
						<v-threeD v-if="isShow3D" :list="img3DList"></v-threeD>
						<template v-else>
                        <img :src="mainImg" v-if="mainImg">
                        <img :src="imgLoading" v-else>
						</template>
						<img src="../../assets/assetsFinal/playVideo.png" alt="" class="playVideo" @click="videoIsShow = true" v-if="Video.ImageCode">
                    </div>
                </div>
				<!-- 左下角的的图片 -->
                <div class="product_img_wrap">
					<div class="product_img" ref="product_img">
						<ul class="product_img_list">
							<li class="transitionImg threedImg" @click="show3D">
								{{styleImg}}
							</li>
							<li class="transitionImg" :class='{"active":item.ImageCode == curCode}' @click="getCurImg(item.ImageCode)" v-for="(item,index) in styleImg" :key="index"><img :src="http.imgUrl+item.ImageCode" v-if="styleImg"><img :src="imgLoading" v-else></li>
						</ul>
					</div>
                </div>
            </div>
            <div class="right">
                <p class="product_name">{{detailData.StyleName}}<span>{{detailData.Category}} 款号{{detailData.StyleNo}}</span></p>
                <p class="product_price" v-if="detailData.MinPrice">￥{{(detailData.MinPrice).toFixed(2)}}<em>（戒托价格）</em></p>
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
				<div class="btn">
					<!--  -->
					<div class="lookDetail" @click="lookDetail()">查看图文详情</div>
                	<div class="next_step" @click="next_step()" v-text="$store.state.relate.isSroneOrStyle ? '选定此款，去选配石':'选定此款'"></div>
				</div>
                <div class="tips">* 款式最终价格是根据款式、SKU属性、配石等信息综合定价</div>
            </div>
        </div>
		<div class="detailSlide" v-show="isLookDetail">
			<swiper :options="swiperOption" ref="mySwiper" style="">

				<swiper-slide :key="index" v-for="(item,index) in imgArrBanner">
				<img :src="http.imgUrl+item" style="width:100%;" :style="{height: fullHeight + 'px'}" alt="">
				</swiper-slide>

				<div class="swiper-pagination" slot="pagination"></div>
				<div class="swiper-scrollbar"  slot="scrollbar"></div>

			</swiper>
		</div>
		<prompt-box :msg="msg" v-show="ispromptBox"></prompt-box>
		<v-videoPlayer v-if="videoIsShow" @videoClose="videoIsShow=false" :options="videoOptions"></v-videoPlayer>
        <v-footer :finishParams="finishParams" v-show="!isLookDetail"></v-footer>
		<v-loading v-show="isloading"></v-loading>
    </div>
</template>

<script>
import footer from "./footer";
import header from "./header";
import slide from "./detailSlide";
import loading from "@/components/isLoading/isloading";
import threeD from "components/threeD/threeD"
import promptBox from "components/promptBox/promptBox";
import { swiper, swiperSlide } from "vue-awesome-swiper";
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
            tableRow: this.$route.params.tableRow
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
      bannerArr: [
        { src: page1 },
        { src: page2 },
        { src: page3 },
        { src: page4 },
        { src: page5 }
      ],

      imgArrBanner: [],

      fullHeight: document.documentElement.clientHeight,
      imgArr: [],

      curCode: "",
      mainImg: "",
      detailData: {},
      styleImg: [],

      videoIsShow: false,
      videoOptions: {
		src: "",
		title : ""
      },
      Video: {},
      isLookDetail: false, //是否查看详情
      imgUrlDetail: "",

      isloading: false,
      ispromptBox: false,
      msg: {
        text: "",
        time: "",
        show: false
      },
	  isShow3D: false,
	  current3DIndex: 0,
	  img3DList: []
    };
  },
  created() {
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
  },
  mounted() {window.vm = this;
    // 右边
    this.$nextTick(() => {
      let liTransition = document.getElementsByClassName("transition");
      for (let i = 0; i < liTransition.length; i++) {
        liTransition[i].style.animation = "leftRightFade 0.2s ease";
        liTransition[i].style["animation-delay"] = 0.5 + "s";
        liTransition[i].style["animation-fill-mode"] = "forwards";
      }
      // 左下角图片
      let transitionImg = document.getElementsByClassName("transitionImg");
      for (let i = 0; i < transitionImg.length; i++) {
        transitionImg[i].style.animation = "imgFadeIn 0.2s ease";
        transitionImg[i].style["animation-delay"] = i * 0.1 + 0.2 + "s";
        transitionImg[i].style["animation-fill-mode"] = "forwards";
      }
    });
  },
  methods: {

    lookDetail() {
      this.isLookDetail = true;
      if (this.lookDetail) {
        this.header.showRight = this.$store.state.relate.isSroneOrStyle
          ? "选择配石"
          : "确认信息";
      }
    },
    getBack(val) {
      if (val) {
        this.isLookDetail = false;
        this.header.showRight = false;
      }
    },
    next_step() {
      //index: this.$route.params.index,
      let len = 0; //判断是否点击了成色
      this.detailData.Data.forEach(item => {
        if (item.DataName == "Condition") {
          item.DataList.forEach((item1, index) => {
            if (item1.active) {
              len++;
            }
          });
        }
      });

      if (!len) {
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
        }, 1500);
        return;
      }
      if (this.detailData.IsSelectStone) {
        if (!this.$store.state.relate.isSroneOrStyle) {
          this.$router.push({
            name: "finalFashionSettlement",
            params: {
              id: this.$route.params.id,
              index: this.$route.params.index, //列表索引
              tableRow: this.$route.params.tableRow
            }
          });
        } else {
          this.$router.push({
            name: "finalFashionStone",
            params: {
              id: this.$route.params.id,
              index: this.$route.params.index //列表索引
            }
          });
        }
      }
	},
	startTouch($event) {
		let that = this;
		let startX = $event.touches[0].pageX,
			lastX = startX;
		let el = $event.target;
		let left = el.style.left.replace('px','');
		let maxLength = 200;
		let maxIndex = 545;
		if(left){
			left = Number(left);
		}else{
			left = 0;
		}
		let move = function(event){
			let interval = event.touches[0].pageX - lastX;
			let length = Math.round(left + interval);
			if(length < 0){
				length = 0;
			}else if(length > maxLength){
				length = maxLength;
			}


			el.style.left = length + 'px';
			that.current3DIndex = Math.floor(length*(maxIndex/maxLength));
		};
		let up = function(event){
			document.removeEventListener('touchmove', move);
			document.removeEventListener('touchend', up);
		};
		document.addEventListener('touchmove', move);
		document.addEventListener('touchend', up);
	},
	show3D() {
		let imgBase = 'http://192.168.101.41/videoFile/videoImg/'
		let list = [];
		let len = 545,
			count = 0
		while(count <= len){
			let length = count.toString().length,
				index = count;
			if(length == 1){
				index = '00' + count;
			}else if(length == 2){
				index = '0' + count;
			}
			let img = imgBase + `RRC6999${index}.jpg`;
			list.push(img);
			count++;
		}
		
		this.img3DList = list;
		this.isShow3D = true;
	},
    getCurImg(imgUrl) {
		this.isShow3D = false;
      this.mainImg = this.http.imgUrl + imgUrl;
      this.curCode = imgUrl;
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
            } else {
              item1.active = false;
            }
            if (item1.active) {
              obj.finness = item1.Name;
            }
          });
        }
      });
      this.detailData.SkuList.forEach(item => {
        item.SkuAttrList.forEach(item1 => {
          if (item1.StyleAttrValueName == name) {
            if (item.DiscountPrice > 0) {
              this.detailData.MinPrice = item.DiscountPrice;
            } else {
              this.detailData.MinPrice = item.TotalPrice;
            }
          }
        });
      });
      this.$store.commit("SET_FASHION", obj); //保存
      if (
        this.detailData.FinenessImageList &&
        this.detailData.FinenessImageList.length > 0
      ) {
        this.detailData.FinenessImageList.forEach(item => {
          //成色对应的成色图片
          if (item.FinenessName == name) {
            this.mainImg = this.http.imgUrl + item.ImageCode;
          }
        });
      }
    },
    getInit() {
      let that = this;
      // this.isloading = true;
      let options = {
        url: "/purchase_Api_FashionStyle_GetInfo",
        params: {
          StyleId: this.$route.params.id,
          PlatId: "a61e9fbf-1722-4b28-aba5-56afa901f68c"
        }
      };
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
              if (item.DataName == "Condition") {
                item.DataList.forEach((item1, index) => {
                  this.$set(item1, "active", false);
                  if (this.$store.state.relate.fashioinObj.finness) {
                    if (
                      this.$store.state.relate.fashioinObj.finness == item1.Name
                    ) {
                      this.$set(item1, "active", true);
                    }
                  }
                });
              }
            });
          } else if (key == "StyleImgList") {
            this.detailData[key].forEach(item => {
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
              }
            });
            if (this.styleImg.length >= 4) {
              let imgWrap = this.$refs.product_img;
              imgWrap.style.width = "100%";
              imgWrap.style.overflow = "scroll";
            }
          } else if (key == "CopyWriting") {
            if (this.detailData[key])
              this.imgArrBanner = this.detailData[key].split(",");
          } else if (key == "SkuList") {
            if (this.$store.state.relate.fashioinObj.finness) {
              this.detailData.SkuList.forEach(item => {
                item.SkuAttrList.forEach(item1 => {
                  if (
                    item1.StyleAttrValueName ==
                    this.$store.state.relate.fashioinObj.finness
                  ) {
                    if (item.DiscountPrice > 0) {
                      this.detailData.MinPrice = item.DiscountPrice;
                    } else {
                      this.detailData.MinPrice = item.TotalPrice;
                    }
                  }
                });
              });
            }
          }
        }
        if (this.Video.ImageCode) {
          //视频
          that.videoOptions = {
			src: this.http.videoUrl + that.Video.ImageCode,
			title : "款式详情"
            // src:'http://192.168.101.44/a.php',
            // src:'http://192.168.101.44/a.php'
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
      };
      let cbnull = res => {
        this.isloading = false;
      };
      let cbno = res => {
        this.isloading = false;
      };
      this.http.get(options, cbok, cbno, cbnull);
    }
  },
  components: {
    "v-footer": footer,
    "v-header": header,
    "v-slide": slide,
    "v-loading": loading,
	promptBox: promptBox,
	"v-threeD" : threeD
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
  height: 100%;
  // margin-top: 3.75rem;
  .detail_wrap {
    display: flex;
    padding-top: 6.25rem;
    .left {
      width: 50%;
      .video_wrap {
        padding: 2rem 3.83rem 1.88rem 1.88rem;
        box-sizing: border-box;
        position: relative;
        .img_default {
          // width: 100%;
          width: 60.25rem;
          height: 60.25rem;
          box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
          // opacity: 0;
          // animation: imgScale 0.2s ease ;
          // animation-fill-mode: forwards;
          img {
            width: 100%;
            height: 100%;
          }
		  .container3D {
			  height: 100%;
			  .imgs{
				position: relative;
				height: 100%;
				img {
					position: absolute;
					top: 50%;
					height: auto;
					transform: translate(0, -60%);
					/*transition: opacity 2s;*/
				}
			  }
			  .control{
				position: absolute;
				left: 50%;
				bottom: 4rem;
			    transform: translateX(-50%);
				.bar{
					position: relative;
					width: 200px;
					height: 2px;
					background: rgb(229,229,229);
					.thumb{
						position: absolute;
						left: 0;
						top: 0;
						width: 3.4rem;
						height: 1.7rem;
						border-radius: 3px;
						background: rgb(255,123,123);
						transform: translate(-50%, -50%);
					}
				}
			  }
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
        padding-right: 2rem;
        padding-left: 1.88rem;
        width: 100%;
        // box-sizing: border-box;
        display: flex;
        justify-content: center;
        .product_img {
        }
        .product_img_list {
          display: flex;
          padding: 5px;
          .threedImg {
            width: 13.63rem;
            height: 13.63rem;
			margin-right: 1.5rem;
			border: solid 1px #FF9C9C;
          }
          li {
            // transform: translateX(5rem);
            // opacity: 0;
            margin-right: 1.5rem;
            img {
              width: 13.63rem;
              height: 13.63rem;
            }
            &.active {
              box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
            }
          }
        }
      }
    }
    .right {
      width: 50%;
      .product_name {
        padding-top: 2.7%;
        font-size: 2.25rem;
        color: #333;
        box-sizing: border-box;
        transform: translateX(5rem);
        opacity: 0;
        animation: leftRightFade 0.2s 0.5s ease;
        animation-fill-mode: forwards;
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
        animation: leftRightFade 0.2s 0.5s ease;
        animation-fill-mode: forwards;
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
            margin-bottom: 1.5rem;
            // transform: translateX(5rem);
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
                  color: #ffffff;
                  // border: none;
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
  }
  // 右边的动画
  @keyframes leftRightFade {
    0% {
      opacity: 0;
      transform: translateX(5rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0rem);
    }
  }
  //选定此款
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
  }
  // 左下角四个图片的
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
