<template>
<div class="couplesListt">
	<!-- 筛选条件 -->
	<v-header :header="header"></v-header>
	<div class="couplesListtContent">
		<div class="screen_wrap">
			<ul class="screen_container" ref="filter" :class="{active: !selectList || !selectList.length}">
				<li class="screen_title">
					<p>价格</p>
					<slideDoble :dataslide='obj' key="price" @touchValue="getTouchVal" ref="priceSlide"></slideDoble>
				</li>
				<li class="screen_title" v-for="(item,index) in selectList" :key="index">
					<p>{{item.AttrName}}</p>
					<ul class="screen_text" v-for="list in item.AttrValueList" :key="list.Id">
						<li :class="{'active': list.active,'noItem': item.noActive}" @click="getSel(item.AttrValueName,list.Id)">{{list.AttrValueName }}</li>
					</ul>
				</li>
			</ul>
			<div class="clear_select" @click="clearSelect()">清空筛选</div>
		</div>
		<!-- 商品 -->
		<div class="product_wrap">
			<!-- 排序条件 -->
			<div class="sort">
				<ul>
					<li @click="getSort('price')" :class="{'active':SortName == 'price'}">价格<i :class="{'down':isSortPrice,'up':!isSortPrice}"></i></li>
					<li @click="getSort('time')" :class="{'active':SortName == 'time'}">上线时间<i :class="{'down':isSortTime,'up':!isSortTime}"></i></li>
					<li @click="getSort('sales')" :class="{'active':SortName == 'sales'}">销量<i :class="{'down':isSortSales,'up':!isSortSales}"></i></li>
				</ul>
			</div>
			<div class="list-box" ref="tables">
				<div class="list-list">
					<ul class="series_container" v-if="goodsList.length>0">
						<li class="series_box" v-for="(item,index) in goodsList" :key="item.Id">
							<div class="series_mainImg" @click="goDetail(item)">
								<img :src="http.imgUrl+item.MainImage+config.seriesImgSize" v-show="item.loading" @load='loadingMainImg(index)'>
								<img :src="imgLoading" v-show="!item.loading">
								<div class="series_title">
									<div class="series_title_name">{{item.SuitName}}</div>
									<div class="series_title_price">￥{{(item.MinPrice).toFixed(2)|money}}起</div>

								</div>
							</div>
							<ul class="series_listUl" v-if="item.StyleList">
								<div class="series_list_box">
									<li class="series_list" v-for="(item1,index1) in item.StyleList" @click="goShopDetail(item1)" :key="item1.StyleId">
										<div class="series_list_img">
											<img :src="http.imgUrl+item1.MainImage+config.detailImgSize" v-show="item1.loading" @load='loadingImg(index,index1)'>
											<img :src="imgLoading" v-show="!item1.loading">
										</div>
										<div class="series_list_title">
											{{item1.StyleName}}
										</div>
										<div class="series_list_price">
											￥{{(Number(item1.SalePrice)).toFixed(2) | money}}
										</div>
									</li>
								</div>
							</ul>
						</li>
					</ul>
					<p v-show="isLoadingText" class="loading-text">{{loadingtext}}</p>
				</div>
			</div>
			<div v-if="goodsList.length == 0" class="nodata">
				<nodata msg="搜索无结果"></nodata>
			</div>
		</div>
	</div>

	<shopMenu></shopMenu>
	<v-footer :finishParams='finishParams'></v-footer>
</div>
</template>

<script>
const testImg = require("@/assets/myBride/1.jpg");
const ring = require("@/assets/ring.png");

import shopMenu from "@/components/menu/index";
import slideDoble from "@/components/dbSlide/slideDoble";
import nodata from "@/components/nodata/newnodata";
import header from "@/components/series/header";
import footer from "@/components/series/footer";
const imgLoading = require('@/assets/assetsFinal/imgLoading.png')

export default {
	name: 'series',
	data() {
		return {
			test: {
				data: {
					total_count: 0,
					page: 0,
					page_size: 0,
					page_count: 0
				},
				code: 0,
				message: "OKOK"
			},
			imgLoading: imgLoading,
			isShowMore: false,
			screenText: this.isShowMore == true ? "收起筛选" : "更多筛选",

			isSortPrice: true,
			isSortTime: true,
			isSortSales: true,

			isNodata: false,

			finishParams: {
				isStyleList: true,
				isShow: true,
				footerWord: {
					firstStep: "套装列表",
					secondStep: "套装详情",
					fourStep: "确认信息"
				}
			},
			obj: {
				//价格滑块的
				type: "init",
				step: 1000,
				min: 1000,
				max: 30000,
				attr: "price",
				float: 0, //保留几位小数
				initLeft: 0,
				initRight: 0
			},
			header: {
				title: "套装列表",
				isShow: true,
				return: {
					name: 'personal',
				}
			},
			isShow: false,
			isNoShow: false,
			selectList: [],
			curId: "",
			pages: {
				PageIndex: 1,
				PageSize: 3
			},
			startPrice: 1000,
			endPrice: 30000,
			AttributeSearch: [],
			goodsList: [],

			SortName: "",

			loadingtext: '正在加载中...',
			page: 1,
			isloading: true,
			isExist: 1,
			isNodata: false,
			isLoadingText: false,
			isLoadingImg: false,
			isloadingFinished: false,
			loadingImgNum: 0,
			isloadingFinishedImg: false,
		}
	},
	methods: {
		loadingMainImg(index) {
			this.goodsList.forEach((item, index1) => {
				if (index == index1) {
					item.loading = true;
				}
			})
		},
		loadingImg(index, index1) { //图片加载
			// this.goodsList[index].item.StyleList.forEach((item2,index2) => {
			// 	if(index == index2){
			// 		console.log(index2);
			// 		item2.loading = true;
			// 	}
			// });
			this.goodsList[index].StyleList[index1].loading = true;
		},
		goDetail(suit) {
			this.$router.push({
				name: "seriesDetail",
				params: {
					id: suit.Id,
				},
				query: this.$route.query
			});
		},
		goShopDetail(style) {
			let routerName = 'lightFashionDetail';
			this.$store.commit("SET_SIZELIGHT", {
				Size: '',
				finness: ''
			}); //清空
			if (style.IsSelectStone) {
				routerName = 'finalFashionDetail';
			}
			this.$router.push({
				name: routerName,
				params: {
					id: style.StyleId,
					lastPage: 'series'
				},
				query: this.$route.query
			});
		},
		getListValue(name, id, ParentId) {
			let flag = true;
			this.selectList.forEach(item => {
				if (item.AttrName == name) {
					item.AttrValueList.forEach(item1 => {
						if (item1.Id == id) {
							item1.active = !item1.active;
						}
					});
				}
			});
			if (!flag) {
				return false;
			}
			this.AttributeSearch = [];
			this.selectList.forEach(item => {
				let arr = [];
				let obj = {};
				item.AttrValueList.forEach((item1, index) => {
					if (item1.active) {
						this.AttributeSearch.push(item1.Id);
					}
				});
			});

			let SortType = "";
			if (this.SortName == "price") {
				SortType = this.isSortPrice ? "desc" : "asc";
			} else if (this.SortName == "time") {
				SortType = this.isSortTime ? "desc" : "asc";
			} else {
				SortType = this.isSortSales ? "desc" : "asc";
			}


			let params = {
				PageIndex: this.page.PageIndex,
				PageSize: this.page.PageSize,
				AttrValueIds: this.AttributeSearch,
				SortName: this.SortName,
				SortType: SortType,
				MinPrice: this.startPrice,
				MaxPrice: this.endPrice
			};
			let options = {
				url: "/purchase_Api_SuitCustomize_SearchSeriesList",
				params: params
			};
			let cbok = res => {
				let data = res.data.data.data_list;
				this.isNodata = false;
				if (data && data.length > 0) {
					this.goodsList = data;
				} else {
					this.goodsList = [];
				}
			};
			let cbno = res => {
				this.goodsList = [];
				this.isNodata = true;
			};
			let cbnull = res => {
				this.goodsList = [];
				this.isNodata = true;
			};
			this.http.post(options, cbok, cbno, cbnull);
		},
		getTouchVal(val, type) {
			if (type == "price") {
				if (val[0] == 1000) {
					val[0] = 0;
				}
				this.startPrice = parseInt(val[0]);
				this.endPrice = parseInt(val[1]);
			}
			this.pages.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.goodsList = [];
			this.getValue();
		},
		showMore() {
			this.isShowMore = !this.isShowMore;
			let filter = this.$refs.filter;
			let liHeight = document.getElementsByClassName("screen_title")[0]
				.offsetHeight;
			if (this.isShowMore) {
				filter.style.height =
					liHeight * 4 + 13 * 4 + filter.offsetHeight + "px";
				filter.style.transition = "height 0.5s ease";
				this.selectList.forEach(item => {
					item.isShowMore = true;
				});
			} else {
				filter.style.height = liHeight * 4 + 12 * 5 + "px";
				this.selectList.forEach(item => {
					if (
						item.DataName == "StyleStyle" ||
						item.DataName == "StyleFeatures" ||
						item.DataName == "ArmType" ||
						item.DataName == "InlayCharacteristics"
					) {
						this.$set(item, "isShowMore", false);
					} else {
						this.$set(item, "isShowMore", true);
					}
				});
			}
		},
		getSort(SortName) {
			//排序
			this.SortName = SortName;
			if (SortName == "price") {
				this.isSortPrice = !this.isSortPrice;
				if (!this.isSortPrice) {
					this.isSortTime = true;
					this.isSortSales = true;
				}
			} else if (SortName == "time") {
				this.isSortTime = !this.isSortTime;
				if (!this.isSortTime) {
					this.isSortPrice = true;
					this.isSortSales = true;
				}
			} else if (SortName == "sales") {
				this.isSortSales = !this.isSortSales;
				if (!this.isSortSales) {
					this.isSortPrice = true;
					this.isSortTime = true;
				}
			} else {}
			this.pages.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.goodsList = [];
			this.getValue();
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
			this.pages.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.goodsList = [];
			this.getValue();

		},
		getSel(name, id) {
			this.selectList.forEach((item) => {
				if (item.AttrValueName == name) {
					item.AttrValueList.forEach((item1) => {
						if (item1.Id == id) {
							item1.active = !item1.active;
						}
					})
				}
			})
			this.pages.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.goodsList = [];
			this.getValue();
		},
		getInit() {
			//初始化
			let that = this;
			let options = {
				// url: "/purchase_Api_FashionStyle_Init"
				url: "/purchase_Api_SuitCustomize_InitSeriesSearch"
			};
			let cbok = res => {
				let data = res.data.data;
				if (data) {
					this.selectList = data;
					this.selectList.forEach((item, index) => {
						if (item.AttrValueList && item.AttrValueList.length > 0) {
							item.AttrValueList.forEach((item1, index) => {
								this.$set(item1, "active", false);
							});
						}
					});
				}
			};
			this.http.get(options, cbok);
		},
		getScrollTop() { //获取滚动条当前的位置 
			var scrollTop = 0;
			if (document.documentElement && document.documentElement.scrollTop) {
				scrollTop = this.$refs.tables.scrollTop;
			} else if (document.body) {
				scrollTop = this.$refs.tables.scrollTop;
			}
			return scrollTop;
		},
		getClientHeight() { //获取当前可视范围的高度 
			var clientHeight = 0;
			if (this.$refs.tables.clientHeight && this.$refs.tables.clientHeight) {
				clientHeight = this.$refs.tables.clientHeight;
			} else {
				clientHeight = this.$refs.tables.clientHeight;
			}
			return clientHeight;
		},
		getScrollHeight() { //获取文档完整的高度
			return this.$refs.tables.scrollHeight;
		},
		getValue(page) {
			if (page) {
				// this.isLoadingText = true;
			} else {
				this.isLoadingImg = true;
			}
			this.AttributeSearch = [];
			this.selectList.forEach(item => {
				let arr = [];
				let obj = {};
				item.AttrValueList.forEach((item1, index) => {
					if (item1.active) {
						arr.push({
							AttrValueId: item1.Id
						})
						if (item.DataName == 'Condition' || item.DataName == 'InlaySize') {
							obj.AttributeClass = 1
						} else {
							obj.AttributeClass = 3;
						}
						obj.AttrId = item.Id
						obj.AttrValueList = arr;
					}
				});
				if (obj.AttrValueList) {
					this.AttributeSearch.push(obj);
				}
			});

			let SortType = "";
			if (this.SortName == "price") {
				SortType = this.isSortPrice ? "desc" : "asc";
			} else if (this.SortName == "time") {
				SortType = this.isSortTime ? "desc" : "asc";
			} else {
				SortType = this.isSortSales ? "desc" : "asc";
			}
			if (page) {
				this.pages.PageIndex = page;
			}
			let params = {
				PageIndex: this.pages.PageIndex,
				PageSize: this.pages.PageSize,
				SearchAttrList: this.AttributeSearch,
				SortName: this.SortName,
				SortType: SortType,
				MinPrice: this.startPrice,
				MaxPrice: this.endPrice
			};
			let options = {
				url: "/purchase_Api_SuitCustomize_SearchSeriesList",
				params: params
			};
			let cbok = res => {
				this.isLoadingText = false;
				this.isLoadingImg = false;
				this.isInternet = false;

				let data = res.data.data.data_list;
				this.isNodata = false;
				if (data.length % 3 == 0 && data.length) { //只有后台返回来的数据为30的倍数才选择加一
					this.page++;
				}
				if (page) {
					this.isloading = true;
					if (this.isExist != page) { //这里判断的是否已经全部加载完数据了
						data.forEach(item => {
							item.StyleList.forEach((item1, index1) => {
								this.$set(item1, "loading", false)
							});
							this.$set(item, "loading", false);
							this.goodsList.push(item);
						})
						this.loadingtext = '正在加载中...'
					} else {
						this.loadingtext = '亲，已经到底啦！'
					}
					this.isExist = page;
				} else { //这里是页面刚进来的时候加载
					data.forEach(item => {
						item.StyleList.forEach((item1, index1) => {
							this.$set(item1, "loading", false)
						});
						this.$set(item, "loading", false);
						this.goodsList.push(item);
					})
				}
				if (this.goodsList.length == 0) {
					this.isNodata = true;
				} else {
					this.isNodata = false;
				}
				this.$nextTick(() => {
					let dom = document.getElementsByClassName('product_box');
					for (let i = 0; i < dom.length; i++) {
						dom[i].style.transform = "translateY(5rem)";
						dom[i].style.opacity = 0;
					}
					for (let i = 0; i < dom.length; i++) {
						dom[i].style.animation = "goods 0.5s ease forwards";
					}
				})
			};
			let cbno = res => {
				this.goodsList = [];
				this.isNodata = true;
				this.isLoadingImg = false;
				this.isLoadingText = false;
				this.isInternet = true;
			};
			let cbnull = res => {
				this.isloading = true;
				if (this.pages.PageIndex == 1) {
					this.isNodata = true;
					this.goodsList = [];
				}
				this.isLoadingImg = false;
				this.isLoadingText = false;
			};
			this.http.post(options, cbok, cbno, cbnull);
		}
	},
	created() {
		window.vm = this
		this.getInit(); //筛选条件列表
		this.getValue();
		if (this.$route.query.from == 'finalFashion') {
			this.header.return = {
				name: 'finalFashion',
				params: this.$route.params,
				query: {
					from: 'combination'
				}
			}
		}
	},
	mounted() {
		let tableRefs = this.$refs.tables;
		let that = this;
		this.$nextTick(() => {
			tableRefs.addEventListener('scroll', function() {
				if (that.goodsList.length == 0) {
					return false
				}
				if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
					if (that.isloading) {
						that.isLoadingText = true;
						that.isloading = false;
						that.getValue(that.page);
					}
				} else {}
			}, false)
		})
	},
	components: {
		shopMenu,
		slideDoble,
		nodata,
		"v-footer": footer,
		"v-header": header
	}
}
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
	height: 100%; // overflow-y: scroll;
	.loading-text {
		height: 1.5rem;
		font-size: 1.88rem;
		color: #999;
		text-align: center;
		width: 100%;
		padding: 0.8rem;
		position: absolute;
		bottom: -2rem;
	}
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
		padding-bottom: 1.25rem;
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
			font-size: 1.5rem;
		}
		.screen_container {
			overflow: hidden;
			&:first-child {
				padding: 2.5rem 2.5rem 0 2.5rem;
				&.active {
					padding: 2.5rem;
				}
			}
			&:nth-of-type(2) {
				padding: 0 2.5rem; // height: 0;
				// overflow: hidden;
			}
			&.moreThing {
				transform: translateY(8rem);
			} // height: 25rem;
			.screen_title {
				font-size: 1.88rem;
				color: #333333;
				display: flex;
				align-items: center;
				line-height: 2.63rem;
				margin-bottom: 1.63rem;
				position: relative; // transition: height 0.5s ease;
				&:last-child {
					margin-bottom: 0;
				}
				p {
					font-weight: bold;
					width: 4em; // height: 1.75rem;
					text-align: left;
					margin-right: 3.38rem;
				}
				.screen_text {
					display: flex;
					align-items: center;
					li {
						margin-right: 3rem;
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
			display: block; // border: 1px dashed #bbbbbb;
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
						transition: all .5s ease;
						&.up {
							transform: rotate(-45deg);
						}
						&.down {
							transform: rotate(135deg);
						}
					}
					&.active {
						color: #FF7B7B;
						i {
							border-color: #FF7B7B;
						}
					}
				}
				li:last-child {
					border-right: 1px solid #e5e5e5;
				}
				.nodata {
					position: fixed;
					top: 38rem;
				}
			}
		}
		.list-box {
			height: 55rem;
			overflow-y: scroll;
			.list-list {
				position: relative;
			}
		}
		.series_container {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 8rem;
			.series_box {
				width: 97%;
				margin: 0.75rem auto;
				border: 0.06rem solid rgba(0, 0, 0, 0.1);
				box-sizing: border-box;
				.series_mainImg {
					float: left;
					width: 43.75rem;
					height: 25rem;
					margin-right: 3.75rem;
					position: relative;
					display: flex;
					justify-content: center;
					img {
						max-width: 43.75rem;
						max-height: 25rem;
					}
					.series_title {
						position: absolute;
						left: 1.88rem;
						bottom: 1.81rem;
						font-size: 1.88rem;
						color: #ff7b7b;
						.series_title_name,
						.series_title_price {
							float: left;
							margin-right: 1.88rem;
						}
					}
				}
				ul {
					padding: 1.88rem 0;
					float: left;
					width: 76rem;
					height: 100%;
					overflow: scroll;
					.series_list_box {
						height: 100%;
						display: inline-flex;
						li {
							float: left;
							width: 17.5rem;
							height: 100%;
							border: 1px solid #e5e5e5;
							margin-right: 3.75rem;
							white-space: nowrap;
							.series_list_img {
								width: 100%;
								height: 12.5rem;
								display: flex;
								justify-content: center;
								img {
									width: 13rem;
									height: 100%;
								}
							}
							.series_list_title {
								font-size: 1.5rem;
								margin: 1.25rem 0;
								text-align: center;
								overflow: hidden;
							}
							.series_list_price {
								font-size: 1.88rem;
								color: #ff7b7b;
								text-align: center;
							}
						}
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
	} // 左侧菜单
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
	} // 组合定制
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
	} // 遮罩层
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
	} // 商品
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
