<template>
    <div class="couplesListt">
		<v-header :header="header"></v-header>
        <!-- 筛选条件 -->
		<div class="couplesListtContent">
			<div class="screen_wrap">
				<ul class="screen_container"  ref="filter">
					<li class="screen_title">
						<span @click="getValue(item.Id,item)" v-for="(item,index) in selectList" :key="index" :class="{'active' : item.active}">{{item.Name}}</span>
					</li>
				</ul>
			</div>
			<!-- 商品 -->
			<div class="product_wrap">
				<ul class="product_container" v-if="goodsList.length>0">
					<li class="product_box" @click="goDetail(item)" v-for="item in goodsList" :key="item.Id">
						<div class="product">
							<img :src="radioImg" alt="">
						</div>
						<div class="product_content">
							<p class="goodsPrice"><span>{{item.Title}}</span></p>
							<p class="goodsName">{{item.Subtitle}}</p>
						</div>
					</li>
				</ul>

				<div v-if="goodsList.length == 0" class="nodata">
					<nodata msg="搜索无结果"></nodata>
				</div>
				
			</div>
		</div>

		<v-videoPlayer v-if="videoIsShow" @videoClose="videoIsShow=false" :options="videoOptions"></v-videoPlayer>
		<v-loading v-show="isLoadingImg"></v-loading>
		<shopMenu></shopMenu>
  </div>
</template>

<script>
const radioPlay = require("@/assets/radioPlay.png");

import shopMenu from "@/components/menu/index";
import nodata from "@/components/nodata/newnodata";
import header from "@/components/finalFashion/header";
import loading from "@/components/isLoading/isloading";


export default {
  data() {
    return {
      isShowMore: false,
      isNodata: false,
      isLoadingImg: false,

      header: {
        title: "定制小课堂",
        isShow: true,
		return: {
          name: "home"
        },
      },

	  radioImg : radioPlay,
      videoIsShow: false,
      videoOptions: {
		src: "",
		title : ""
      },

      isShow: false,
      isNoShow: false,
      selectList: [],
      curId: "",
      page: {
        PageIndex: 1,
        PageSize: 10
      },

      goodsList: [],
	  selectItem : ''
    };
  },
  methods: {
    goDetail(obj) {
      this.videoIsShow = true;
      if (obj.VideoUrl) {
			let videoSrc = this.http.videoUrl + obj.VideoUrl
			if(self.isApp){ //判断是否在app模式
				videoSrc = self.getLocalVideo(obj.Title) || videoSrc;
			}
			this.videoOptions = {
				src: videoSrc,
				title : "定制小课堂"
			};
      }
    },
    clearSelect() {
      this.$refs.priceSlide.clearPrice();
      this.selectList.forEach((item, index) => {
        item.AttrValueList.forEach((item1, index) => {
          if (item1.active) {
            item1.active = false;
          }
        });
      });
    },
    getInit() {
      //初始化
      let that = this;

      this.isLoadingImg = true;
      let options = {
        // url: "/purchase_Api_FashionStyle_Init"
        url: "/cms_Api_CategroyMenu_GetList"
      };
      let cbok = res => {
        let data = res.data.data.data_list;
        data.forEach((item, index) => {
          item.active = false;
        });
        if (data) {
          this.selectList = data;
        }
      };
      let cbno = res => {
        this.isLoadingImg = false;
      };
      let cbnull = res => {
        this.isLoadingImg = false;
      };
      this.http.get(options, cbok);
    },
    getValue(id, item) {
      let flag = true,
        ids = "";
      if (id) {
        ids = id;
      }
      if (!flag) {
        return false;
      }
      this.selectList.forEach(item => {
        item.active = false;
        if (item.Id == id) {
			if(this.selectItem == item.Id){
          		item.active = false;
				this.selectItem = '';
				ids = '';
			}else{
				this.selectItem = item.Id;
				item.active = true;
			}
        }
      });
      let SortType = "";
      let params = {
        PageIndex: this.page.PageIndex,
        PageSize: this.page.PageSize,
        CategoryId: ids,
        Name: ""
      };

      this.isLoadingImg = true;
      let options = {
        url: "/cms_Api_Content_GetList",
        params: params
      };
      let cbok = res => {
        this.isLoadingImg = false;
        let data = res.data.data.data_list;
        this.isNodata = false;
        if (data && data.length > 0) {
          this.goodsList = data;
        } else {
          this.goodsList = [];
        }
      };
      let cbno = res => {
        this.isLoadingImg = false;
        this.goodsList = [];
        this.isNodata = true;
      };
      let cbnull = res => {
        this.isLoadingImg = false;
        this.goodsList = [];
        this.isNodata = true;
      };
      this.http.get(options, cbok, cbno, cbnull);
    }
  },
  created() {
    window.vm = this;
    this.getInit(); //筛选条件列表
    this.getValue();
  },
  components: {
    shopMenu,
    nodata,
    "v-header": header,
	"v-loading" : loading
  }
};
</script>

<style lang="scss">
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  html,
  body {
    font-size: 8px !important;
  }
}
@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
  html,
  body {
    font-size: 11px;
  }
}
#app {
  height: 100%;
}
.couplesListt {
  background: #ffffff;
  height: 100%;
  // overflow-y: scroll;
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
  .couplesListtContent {
    height: 100%;
    overflow-y: scroll;
  }
  .screen_wrap {
    background: #ffffff;
    box-shadow: 0 1px 6px 0 rgba(51, 51, 51, 0.2);
    padding-bottom: 2rem;
    position: relative;
    padding-top: 6.25rem;

    .clear_select {
      position: absolute;
      right: 2.8rem;
      bottom: 1.88rem;
      border: solid 1px #ff7b7b;
      color: #ff7b7b;
      padding: 1.2rem 1.6rem;
      border-radius: 10px;
      font-size: 1.2rem;
    }
    .screen_container {
      &:first-child {
        padding: 2.5rem 2.5rem 0 2.5rem;
      }
      &:nth-of-type(2) {
        padding: 0 2.5rem;
        // height: 0;
        // overflow: hidden;
      }
      &.moreThing {
        transform: translateY(8rem);
      }
      // height: 25rem;
      .screen_title {
        font-size: 1.88rem;
        color: #333333;
        display: flex;
        align-items: center;
        line-height: 2.63rem;
        margin-bottom: 1.63rem;
        position: relative;
        // transition: height 0.5s ease;
        &:last-child {
          margin-bottom: 0;
        }
        span {
          float: left;
          // height: 1.75rem;
          text-align: left;
          margin-right: 3.38rem;
		  padding : 0.4rem 0.6rem;
          &.active {
            background-color: #ff7b7b;
			color:#fff;
          }
        }
        .screen_text {
          display: flex;
          align-items: center;
          li {
            margin-right: 1.25rem;
            padding: 0 0.25rem;
          }
          .active {
            background: #ff7b7b;
            border-radius: 0.25rem;
            color: #fff;
          }
          .noItem {
            color: #999999;
          }
        }
      }
      .sumbit_btn {
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        div {
          font-size: 1.88rem;
          width: 10rem;
          height: 3.5rem;
          border: 1px solid #bbbbbb;
          text-align: center;
          line-height: 3.5rem;
          border-radius: 0.25rem;
          margin-right: 3rem;
        }
      }
    }
    .arrow_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999999;
      font-size: 1.5rem;
      height: 4rem;
      span {
        line-height: 4rem;
      }
      .arrow {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        background-size: 4rem 4rem;
        &.arrowUp {
          transform: rotate(180deg);
          transition: transform 0.2s ease;
        }
      }
    }
  }
  .line_dashed {
    padding: 0 13rem 0 8rem;
    box-sizing: border-box;
    &:before {
      content: "";
      display: block;
      // border: 1px dashed #bbbbbb;
    }
  }
  .condition_screen {
    position: absolute;
    right: 0;
    top: 1rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 42rem;
      li {
        background: #ff7b7b;
        border-radius: 0.25rem;
        text-align: center;
        width: 8rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.88rem;
        color: #ffffff;
        margin-right: 1.5rem;
        margin-bottom: 1.88rem;
      }
    }
    .again_condition {
      font-size: 1.88rem;
      position: absolute;
      right: 5.5rem;
      margin-top: 4rem;
      &:active {
        opacity: 0.8;
      }
    }
  }
  .product_wrap {
    .sort {
      padding-right: 1.88rem;
      box-sizing: border-box;
      margin-top: 1.25rem;
      display: flex;
      justify-content: flex-end;
      ul {
        display: flex;
        li {
          border-top: 1px solid #e5e5e5;
          border-left: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          font-size: 1.88rem;
          line-height: 2.63rem;
          padding: 0.69rem 0 0.94rem 1.25rem;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 0.7rem;
            height: 0.7rem;
            border-right: 1px solid #666;
            border-top: 1px solid #666;
            margin: 0 1.17rem;
            &.up {
              transform: rotate(-45deg);
            }
            &.down {
              transform: rotate(135deg);
            }
          }
        }
        li:last-child {
          border-right: 1px solid #e5e5e5;
        }
      }
    }
    .nodata {
      position: fixed;
      top: 38rem;
    }
    .product_container {
      display: flex;
      flex-wrap: wrap;
      padding-top: 1.06rem;
      margin-bottom: 14rem;
      .product_box {
        width: 20%;
        border: 0.06rem solid rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        // transform: translateY(5rem);
        // animation: goods 0.5s ease ;
        // animation-fill-mode: forwards;
        .product_content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #333333;
          .goodsName {
            font-size: 1.88rem;
            line-height: 2.63rem;
            margin-bottom: 1.25rem;
            text-align: center;
          }
          .goodsPrice {
            text-align: center;
            line-height: 3.63rem;
            color: #ff7b7b;
            margin-bottom: 1.5rem;
            margin-top: 1.06rem;
            font-size: 1.5rem;
            span {
              font-family: "fontNameRegular";
              font-size: 2.8rem;
            }
          }
        }
        .product {
          // animation: fadeIn 0.5s ease;
          width: 4rem;
          height: 4rem;
		  margin: 5rem auto;
          box-sizing: border-box;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .leftMenuTitle {
    width: 4.25rem;
    height: 15rem;
    background-image: linear-gradient(-139deg, #ffe999 0%, #ff9485 100%);
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: -4.25rem;
    margin-top: -7.5rem;
    z-index: 10;
    animation: leftFade 0.5s 0.5s ease;
    animation-fill-mode: forwards;
    div {
      width: 1.6rem;
      text-align: center;
      word-wrap: break-word;
      word-wrap: normal;
      font-size: 1.5rem;
      color: #ffffff;
    }
    &.leftMenuSlideOut {
      animation: leftMenuSlideOut 0.5s ease;
      animation-fill-mode: forwards;
    }
    &.leftMenuSlideIn {
      animation: leftMenuSlideIn 0.5s ease;
      animation-fill-mode: forwards;
    }
  }
  .leftMenu {
    position: absolute;
    z-index: 10;
    top: 3.75rem;
    left: -25.63rem;
    height: 100%;
    background: #ffffff;
    .group_menu {
      li {
        width: 25.63rem;
        height: 29.38rem;
        img {
          width: 100%;
        }
      }
    }
    &.leftSlideOut {
      animation: leftSlideOut 0.5s ease;
      animation-fill-mode: forwards;
    }
    &.leftSlideIn {
      animation: leftSlideIn 0.5s ease;
      animation-fill-mode: forwards;
    }
  }

  // 左侧菜单
  @keyframes leftSlideOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(25.63rem);
    }
  }
  @keyframes leftSlideIn {
    0% {
      transform: translateX(25.63rem);
    }
    100% {
      transform: translateX(0);
    }
  }
  // 组合定制
  @keyframes leftMenuSlideOut {
    0% {
      transform: translateX(4.25rem);
    }
    100% {
      transform: translateX(29.88rem);
    }
  }
  @keyframes leftMenuSlideIn {
    0% {
      transform: translateX(29.88rem);
    }
    100% {
      transform: translateX(4.25rem);
    }
  }
  @keyframes leftFade {
    0% {
      left: -4.25rem;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 1;
    }
  }
  // 遮罩层
  @keyframes maskOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes maskOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  // 商品
  @keyframes goods {
    0% {
      transform: translateY(5rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(5rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0rem);
    }
  }
  @keyframes updown {
    0% {
      height: 2.25rem;
    }
    100% {
      height: 0rem;
    }
  }
  @keyframes downUp {
    0% {
      height: 0rem;
    }
    100% {
      height: 2.25rem;
    }
  }
}
</style>
