<template>
<div class="couplesListt">
	<v-header :header="header"></v-header>
	<!-- 筛选条件 -->
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
					<ul class="product_container" v-if="goodsList.length>0">
						<li class="product_box" @click="goDetail(item.Id)" v-for="(item,index) in goodsList" :key="item.Id">
							<div class="product">
								<img :src="http.imgUrl+item.MainImage+config.listImgSize" v-show="item.loading" @load="loadingImg(index)">
								<img :src="imgLoading" v-show="!item.loading">
							</div>
							<div class="product_content">
								<p class="goodsName">{{item.SuitName}}</p>
								<p class="goodsPrice"><span>￥</span><span>{{item.MinPrice.toFixed(2)|money}}</span>起</p>
							</div>
						</li>
					</ul>
				</div>
				<p v-show="isLoadingText" class="loading-text">{{loadingtext}}</p>
			</div>
			<nodata msg="搜索无结果" v-show="isNodata"></nodata>
		</div>
	</div>

	<shopMenu></shopMenu>
	<v-loading v-show="isLoadingImg"></v-loading>
	<v-footer :finishParams='finishParams'></v-footer>
	<noInternet v-show="isInternet"></noInternet>
</div>
</template>

<script>
import shopMenu from "@/components/menu/index";
import slideDoble from "@/components/dbSlide/slideDoble";
import nodata from "@/components/nodata/newnodata";
import header from "@/components/couples/header";
import footer from "@/components/couples/footer";
import nointernet from 'components/nodata/noInternet';
import loading from '@/components/isLoading/isloading';
const imgLoading = require('@/assets/assetsFinal/imgLoading.png');

export default {
	data() {
		return {
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
					firstStep: "情侣款列表",
					secondStep: "情侣款详情",
					fourStep: "确认信息"
				}
			},
			header: {
				title: "情侣款列表",
				isShow: true
			},
	  		unlimitedValue: 1000000,
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
			isShow: false,
			isNoShow: false,
			selectList: [],
			curId: "",
			pages: {
				PageIndex: 1,
				PageSize: 15
			},

			startPrice: 1000,
			endPrice: 30000,
			AttributeSearch: [],
			goodsList: [],

			SortName: "",
			page: 1,
			isloading: true,
			isExist: 1,
			isNodata: false,
			isLoadingText: false,
			isLoadingImg: false,
			loadingtext: '正在加载中...',
			isInternet: false
		};
	},
	methods: {
		loadingImg(index) { //图片加载
			this.goodsList.forEach((item, index1) => {
				if (index == index1) {
					item.loading = true;
				}
			})
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
		goDetail(id) {
			this.$router.push({
				name: "couplesDetail",
				params: {
					id: id,
					tableRow: this.$route.params.tableRow,
					index: this.$route.params.index
				},
				query: vm.$route.query
			})
		},
		getTouchVal(val, type) {
			if (type == "price") {
				if (val[0] == 1000) {
					val[0] = 0;
				}
				//如果价格起始值等于视觉上的最大值，那么价格区间是10万-100万(同时居右：100万以上)
				//如果价格终止值等于视觉上的最大值，那么价格区间是 起始值-100万
				if(val[0] == this.obj.max || val[1] == this.obj.max){
					val[1] = this.unlimitedValue;
				}
				this.startPrice = parseInt(val[0]);
				this.endPrice = parseInt(val[1]);
			}
			this.pages.PageIndex = 1;
			this.page = 1;
			this.goodsList = [];
			this.isExist = 1
			this.getValue();
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
			this.goodsList = [];
			this.isExist = 1
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
			this.SortName = '';
			this.isSortPrice = true
			this.isSortTime = true
			this.isSortSales = true
			this.isExist = 1;
			this.pages.PageIndex = 1;
			this.page = 1;
			this.goodsList = [];
			this.getValue();
		},
		getInit() {
			//初始化
			let that = this;
			let options = {
				// url: "/purchase_Api_FashionStyle_Init"
				url: "/purchase_Api_SuitCustomize_InitCouplesSearch"
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
			//处理价格的请求：1.默认是0-100万；2.滑块都在左侧是：0-1000；3.滑块都在右侧是：100万以上
			if((!params.MinPrice && !params.MaxPrice) || (params.MinPrice == this.obj.min && params.MaxPrice == this.obj.max)){
				params.MaxPrice = this.unlimitedValue;
				params.MinPrice = 0;
			}
			let options = {
				url: "/purchase_Api_SuitCustomize_SearchCouplesList",
				params: params
			};
			let cbok = res => {
				this.isLoadingText = false;
				this.isLoadingImg = false;
				this.isInternet = false;

				let data = res.data.data.data_list;

				if (data.length % 15 == 0 && data.length) { //只有后台返回来的数据为30的倍数才选择加一
					this.page++;
				}
				if (page) {
					this.isloading = true;
					if (this.isExist != page) { //这里判断的是否已经全部加载完数据了
						data.forEach(item => {
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
						this.$set(item, "loading", false)
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
				this.isNodata = false;
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
		window.vm = this;
		this.getInit(); //筛选条件列表
		this.getValue()
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
		"v-header": header,
		'v-loading': loading,
		'v-nointernet': nointernet
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			let name = from.name,
				query = vm.$route.query
			if ('finalFashion' == from.name || (query && query.from == 'finalFashion')) {
				vm.header.return = {
					name: 'finalFashion',
					params: vm.$route.params,
					query
				}
			} else {
				vm.header.return = {
					name: 'personal'
				}
			}
		})
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
	height: 100%; // overflow-y: scroll;
	.loading-text {
		height: 1.5rem;
		font-size: 1.88rem;
		color: #999;
		text-align: center;
		width: 100%;
		padding: 0.8rem;
		position: absolute;
		bottom: 2rem;
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
			font-size: 1.5rem;
		}
		.screen_container {
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
	.list-box {
		height: 58rem;
		overflow-y: scroll;
		.list-list {
			position: relative;
		}
	}
	.product_wrap {
		position: relative;
		.sort {
			padding-right: 1.88rem;
			box-sizing: border-box;
			margin-top: 1.25rem;
			display: flex;
			justify-content: flex-end;
			padding-bottom: 1.25rem;
			ul {
				display: flex;
				li {
					border-top: 1px solid #E5E5E5;
					border-left: 1px solid #E5E5E5;
					border-bottom: 1px solid #E5E5E5;
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
					border-right: 1px solid #E5E5E5;
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
			padding-bottom: 3rem;
			.product_box {
				width: 20%;
				border: 0.06rem solid rgba(0, 0, 0, 0.1);
				box-sizing: border-box; // transform: translateY(5rem);
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
						margin-top: 1.25rem;
						text-align: center;
					}
					.goodsPrice {
						text-align: center;
						line-height: 3.63rem;
						color: #FF7B7B;
						margin-bottom: 1.25rem;
						margin-top: 1.06rem;
						font-size: 1.5rem;
						span {
							font-family: 'fontNameRegular';
							font-size: 2.8rem;
						}
					}
				}
				.product {
					// animation: fadeIn 0.5s ease;
					width: 100%;
					height: 17rem;
					padding: 1.5rem 5.23rem 0 5.23rem;
					box-sizing: border-box;
					img {
						width: 100%;
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
