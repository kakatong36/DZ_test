<template>
<div class="finalFashionStone">
	<!-- <v-header :header="header"></v-header> -->
	<div class="back-header">
		<div class="header-container">
			<div class="back-btn" @click="goback">返回</div>
			<h1 class="head-text">选择配石</h1>
		</div>
	</div>
	<!-- 属性 -->
	<div class="finalFashionStoneContent">
		<div class="stone_value_wrap">
			<ul class="stone_value">
				<li class="stone_value_box">
					<p>价格</p>
					<v-slide :dataslide='obj' key="price" @touchValue="getTouchVal" ref="priceSlide"></v-slide>
				</li>
				<li class="stone_value_box">
					<p>重量</p>
					<v-slide :dataslide='objweight' @touchValue="getTouchVal" ref="weightSlide"></v-slide>
				</li>
				<li class="stone_value_box" v-for="item in groupList" :key="item.Id" v-if='item.DictionaryName == "形状" || item.DictionaryName == "切工"'>
					<p>{{item.DictionaryName}}</p>
					<ul class="stone_value_list small_box">
						<li :class="{'activeStone': cell.active,'noItem':cell.noActive}" @click="getVal(cell.Id)" v-for="cell in item.AttrValueList" :key="cell.Id">{{cell.DictionaryValueName}}</li>
					</ul>
				</li>
				<li class="stone_value_box">
					<p>颜色</p>
					<v-slide :dataslide='objcolor' @touchWordValue="getColorValue" key="one" ref="colorSlide"></v-slide>
				</li>
				<li class="stone_value_box ">
					<p>净度</p>
					<v-slide :dataslide='objclear' @touchWordValue="getColorValue" ref="clearnessSlide"></v-slide>
				</li>

			</ul>
			<div class="clear_btn">
				<div @click="clearSelect()">清空选择</div>
			</div>
		</div>
		<!-- 选择石头 -->
		<div class="select_stone">
			<div class="sort">
				<ul>
					<li @click="getSort('price')" :class="{'active':SortName == 'price'}">价格<i :class="{'down':isSortPrice,'up':!isSortPrice}"></i></li>
					<li @click="getSort('weight')" :class="{'active':SortName == 'weight'}">重量<i :class="{'down':isSortWeight,'up':!isSortWeight}"></i></li>
					<li @click="getSort('color')" :class="{'active':SortName == 'color'}">颜色<i :class="{'down':isSortColor,'up':!isSortColor}"></i></li>
				</ul>
			</div>
			<div class="table">
				<ul class="table_title">
					<li>序号</li>
					<li>形状</li>
					<li>证书</li>
					<li>重量</li>
					<li>颜色</li>
					<li>净度</li>
					<li>切工</li>
					<li>荧光</li>
					<li>售价</li>
					<li>选择</li>
				</ul>
				<div class="scroll_wrap" ref="tables">
					<ul class="table_body" v-for="(item,index) in stoneList" :key="item.Id" v-if="stoneList">
						<li>{{index+1}}</li>
						<li>{{item.Shape}}</li>
						<li>{{item.CertificateType}}</li>
						<li>{{item.Weight}}ct</li>
						<li>{{item.Color}}</li>
						<li>{{item.Cleanliness}}</li>
						<li>{{item.Cut}}</li>
						<li>{{item.Fluorescence?item.Fluorescence:'None'}}</li>
						<li class="stone_price">¥{{(item.SalesPrice).toFixed(2)|money}}</li>
						<li @click="next_step(item)">
							<div class="group-input">
								<input type="radio" name="stone" />
								<div class="outCircle" :class="{'outCircleBorder':curId == item.Id}">
									<div :class="{'innerCircle':curId == item.Id}"></div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<v-nodata v-show="isNodata" msg="搜索无结果"></v-nodata>
			</div>
		</div>
	</div>

	<shopMenu></shopMenu>
	<v-loading v-show="isLoadingImg"></v-loading>
	<p v-show="isLoadingText" class="loading-text">正在加载中...</p>
	<v-footer :finishParams='finishParams'></v-footer>
</div>
</template>

<script>
import header from './header'
import footer from './footer'
import dbSlide from '../dbSlide/slideDoble'
import loading from 'components/isLoading/isloading'
import nodata from 'components/nodata/newnodata'
export default {
	data() {
		return {
			finishParams: {
				isStyleListFinshed: true,
				isDetailFinshed: true,
				isStone: true,
				isShow: true,
				footerWord: {
					firstStep: '套装列表',
					secondStep: '套装详情',
					thirdStep: '配石',
					fourStep: '确认信息',
				}
			},
			header: {
				title: '选择配石',
				isShow: true
			},
			isSortPrice: true,
			isSortWeight: true,
			isSortColor: true,

			curId: '',
	  		unlimitedValue: 1000000,
			obj: { //价格滑块的
				type: 'init',
				step: 1000,
				min: 1000,
				max: 100000,
				areaData: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000],
				attr: 'price',
				float: 0, //保留几位小数
				initLeft: 0,
				initRight: 0,
			},
			objcolor: {
				type: 'word',
				step: 1000,
				areaData: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M'],
				attr: 'color',
				initLeft: 0,
				initRight: 0,
			},
			objclear: {
				type: 'word',
				step: 1000,
				areaData: ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3'],
				attr: 'clear',
				initLeft: 0,
				initRight: 0,
			},
			objweight: {
				type: 'init',
				min: 0.3,
				max: 3.0,
				step: 0.1,
				areaData: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
				attr: 'weight',
				float: 1,
				initLeft: 0,
				initRight: 0,
			},
			groupList: [],
			page: {
				PageIndex: 1,
				PageSize: 10,
			},
			stoneList: [],
			params: {
				Shape: '',
				Color: '',
				Cleanliness: '',
				Cut: '',
				StartWeight: '',
				EndWeight: '',
				StartPrice: '',
				EndPrice: '',
				PageIndex: 1,
				PageSize: 20,
			},
			page: 1,
			isloading: true,
			isExist: 1,
			isNodata: false,
			isLoadingText: false,
			isLoadingImg: false,
			noActive: false,
			SortName: ''
		}
	},
	created() {
		window.vm = this
		this.formData = this.$store.state.couple.formData;
		this.getInit();
		this.getList();
		if (this.$store.state.relate.isSroneOrStyle) {
			this.$store.commit('SET_STONE', true)
		}
		let stone = this.$route.params.stone
		if (stone) {
			this.curId = stone.Id
		}
	},
	mounted() {
		// let table = document.getElementsByClassName('table_body');
		// for (let i = 0; i < table.length; i++) {
		// 	table[i].style.animation = 'upDown 0.2s ease';
		// 	table[i].style['animation-delay'] = i * 0.1 + 0.1 + 's';
		// 	table[i].style['animation-fill-mode'] = 'forwards';
		// }
		let tableRefs = this.$refs.tables;
		let that = this;
		this.$nextTick(() => {
			tableRefs.addEventListener('scroll', function() {
				if (that.stoneList.length == 0) {
					return false
				}
				if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
					if (that.isloading) {
						that.isloading = false;
						that.getList(that.page);
					}
				} else {}
			}, false)
		})
	},
	methods: {
		goback() {
			let name = this.$route.query.name
			if (name) {
				let params = this.$route.params
				if (name == 'seriesEdit') {
					params.styleId = params.id
					params.id = params.suitId
					delete params.stone
				}
				this.$router.replace({
					name,
					params,
					query: this.$route.query
				})
			} else {
				delete params.stone
				this.$router.replace({
					name: 'seriesEdit',
					params,
					query: this.$route.query
				})
			}
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
		getVal(id) {
			let flag = true;
			this.groupList.forEach((item) => {
				item.AttrValueList.forEach((item1) => {
					if (item1.Id == id) {
						if (this.$store.state.relate.shape && item1.DictionaryValueName != this.$store.state.relate.shape && item.DictionaryName == '形状') {
							flag = false;
							return false
						} else if(this.$store.state.relate.shape && item1.DictionaryValueName == this.$store.state.relate.shape && item.DictionaryName == '形状'){
							flag = false;
							return false
						}else {
							item1.active = !item1.active;
						}
					}
				})
			})
			if (!flag) {
				return false
			}
			this.params.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.stoneList = [];
			this.getList();
		},
		clearSelect() { //清空选择
			this.$refs.priceSlide.clearPrice(); //这几个是通过父组件来调用子组件的方法
			this.$refs.weightSlide.clearPrice();
			this.$refs.colorSlide.clearPrice();
			this.$refs.clearnessSlide.clearPrice();
			this.SortName = '';
			this.isSortPrice = true
			this.isSortWeight = true
			this.isSortColor = true
			for (let key in this.params) {
				this.params[key] = ''
			}
			let shape = this.$store.state.relate.shape;
			this.groupList.forEach((item) => {
				if (item.DictionaryName == "形状") {
					item.AttrValueList.forEach((item1) => {
						if (item1.DictionaryValueName == shape && shape) {
							this.$set(item1, 'active', true)
							item1.noActive = false;
						} else if(item1.DictionaryValueName != shape && shape){
							this.$set(item1, 'active', false);
							item1.noActive = true;
						}else if(!shape){
							this.$set(item1, 'active', false);
							item1.noActive = false;
						}
					})
				} else if (item.DictionaryName == "切工") {
					item.AttrValueList.forEach((item1) => {
						this.$set(item1, 'active', false);
					})
				}
			})
			this.params.PageSize = 20;
			this.params.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.stoneList = [];
			this.getList();
		},
		getSort(SortName) { //排序
			this.SortName = SortName;
			if (SortName == 'price') {
				this.isSortPrice = !this.isSortPrice;
				if (!this.isSortPrice) {
					this.isSortWeight = true;
					this.isSortColor = true;
				}
			} else if (SortName == 'weight') {
				this.isSortWeight = !this.isSortWeight;
				if (!this.isSortWeight) {
					this.isSortPrice = true;
					this.isSortColor = true;
				}
			} else if (SortName == 'color') {
				this.isSortColor = !this.isSortColor;
				if (!this.isSortColor) {
					this.isSortPrice = true;
					this.isSortWeight = true;
				}
			} else {}
			this.params.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.stoneList = [];
			this.getList();
		},
		next_step(singleStone) {
			this.$router.push({
				name: "seriesEdit",
				params: {
					id: this.$route.params.suitId,
					styleId: this.$route.params.id,
					stone: singleStone,

					currentStyle: this.$route.params.currentStyle,
					currentRingSize: this.$route.params.currentRingSize,
					currentCondition: this.$route.params.currentCondition,
					currentStone: this.$route.params.currentStone,
					lettering: this.$route.params.lettering,
					showFlag: this.$route.params.showFlag
				},
				query: this.$route.query
			})
		},
		getTouchVal(val, type) {
			if (type == 'price') {
				if (val[0] == 1000) {
					val[0] = 0;
				}
				//如果价格起始值等于视觉上的最大值，那么价格区间是10万-100万(同时居右：100万以上)
				//如果价格终止值等于视觉上的最大值，那么价格区间是 起始值-100万
				if(val[0] == this.obj.max || val[1] == this.obj.max){
					val[1] = this.unlimitedValue;
				}
				this.params.StartPrice = val[0];
				this.params.EndPrice = val[1];
			} else if (type == 'weight') {
				this.params.StartWeight = val[0];
				this.params.EndWeight = val[1];
			}

			this.params.PageIndex = 1;
			this.page = 1;
			this.isExist = 1;
			this.stoneList = [];
			this.getList();
		},
		getColorValue(val, type) {
			if (type == 'color') {
				this.params.Color = val;
			} else if (type == 'clear') {
				this.params.Cleanliness = val
			}
			this.params.PageIndex = 1;
			this.page = 1;
			this.stoneList = [];
			this.isExist = 1;
			this.getList();
		},
		getInit() { //石头筛选条件
			let options = {
				url: '/system_Api_StoneCost_SelectInit'
			}
			let cbok = (res) => {
				let data = res.data.data;
				this.groupList = data.GroupList[0].AttrList
				let shape = this.$store.state.relate.shape;
				this.groupList.forEach((item) => {
					if (item.DictionaryName == "形状") {
						item.AttrValueList.forEach((item1) => {
							if (item1.DictionaryValueName == shape && shape) {
								this.$set(item1, 'active', true)
								item1.noActive = false;
							}else if(item1.DictionaryValueName != shape && shape){
								this.$set(item1, 'active', false);
								item1.noActive = true;
							} else {
								
							}
						})
					} else if (item.DictionaryName == "切工") {
						item.AttrValueList.forEach((item1) => {
							this.$set(item1, 'active', false);
						})
					}
				})

			}
			this.http.get(options, cbok);
		},
		getList(page) {

			if (page) {
				this.isLoadingText = true;
			} else {
				this.isLoadingImg = true;
			}

			let shapeArr = [],
				CutArr = [],
				params = {};

			this.groupList.forEach((item) => {
				item.AttrValueList.forEach((item1) => {
					if (item1.active) {
						if (item.DictionaryName == '形状') {
							shapeArr.push(item1.DictionaryValueName);
						} else if (item.DictionaryName == "切工") {
							CutArr.push(item1.DictionaryValueName)
						}
					}
				})
			})
			let SortType = '';
			if (this.SortName == 'price') {
				SortType = this.isSortPrice ? 'desc' : 'asc'
			} else if (this.SortName == 'weight') {
				SortType = this.isSortWeight ? 'desc' : 'asc'
			} else {
				SortType = this.isSortColor ? 'desc' : 'asc'
			}

			if (page) {
				this.params.PageIndex = page;
			}

			this.params.Shape = shapeArr.join(',');
			this.params.Cut = CutArr.join();
			this.params.StyleId = this.$route.params.id;
			this.params.SortName = this.SortName;
			this.params.SortType = SortType
			for (let key in this.params) {
				if (this.params[key]) {
					params[key] = this.params[key]
				}
			}
			//处理价格的请求：1.默认是0-100万；2.滑块都在左侧是：0-1000；3.滑块都在右侧是：100万以上
			if(!params.StartPrice && !params.EndPrice){
				params.EndPrice = this.unlimitedValue;
				params.StartPrice = 0;
			}
			if(!params.StartPrice){
				params.StartPrice = 0;
			}
			let options = {
				url: '/system_Api_StoneCost_GetResplendentDiamondStoneCost',
				params: params
			}
			// this.stoneList = []
			let cbok = (res) => {
				this.isLoadingText = false;
				this.isLoadingImg = false;
				this.isNodata = false;
				let data = res.data.data;
				if (data.data_list) {
					// this.stoneList = data.data_list

				}
				if (data.data_list.length % 20 == 0 && data.data_list.length) { //只有后台返回来的数据为30的倍数才选择加一
					this.page++;
				}
				if (page) {
					this.isloading = true;
					if (this.isExist != page) { //这里判断的是否已经全部加载完数据了
						data.data_list.forEach(item => {
							this.stoneList.push(item);
						})
					}
					this.isExist = page;
				} else { //这里是页面刚进来的时候加载
					data.data_list.forEach(item => {
						this.stoneList.push(item);
					})
				}
				if (this.$route.params.index !== undefined) { //这里记得需要写全等于或者不等于
					this.stoneList.forEach((item, index) => {
						if (index == this.$route.params.index) {
							this.curId = item.Id;
						}
					})
				}
				// 动画
				this.$nextTick(()=>{
					let table = document.getElementsByClassName('table_body');
					let a = 0;//用a来取代变量i每次的动画只需要从加载更多的开始，不需要重新开始
					for (let i = (this.isExist-1)*20 ; i < table.length; i ++) {
						table[i].style.animation = 'upDown 0.2s ease forwards';
						table[i].style['animation-delay'] = a*0.1 + 0.1 +'s';
						a++
					}
				})
			}
			let cbno = (res) => {
				this.isLoadingImg = false;
				this.isLoadingText = false;
			}
			let cbnull = (res) => { //没有数据的时候
				this.isLoadingImg = false;
				this.isLoadingText = false;
				this.isNodata = true;
				this.stoneList = [];
			}
			this.http.get(options, cbok, cbno, cbnull);
		}
	},
	components: {
		'v-footer': footer,
		'v-header': header,
		'v-slide': dbSlide,
		'v-loading': loading,
		'v-nodata': nodata
	}
}
</script>

<style lang="scss">
#app {
	height: 100%;
}

.finalFashionStone {
	background: #ffffff;
	height: 100%; // overflow-y: scroll;
	.noItem {
		color: #999999;
	}
	.nodata {
		top: 10%;
	}
	.back-header {
		background: #ffffff;
		width: 100%;
		height: 6.25rem;
		position: absolute;
		z-index: 9999;
		padding-top: 2.5rem;
		.header-container {
			width: 100%;
			height: 3.75rem;
			box-shadow: 0 1px 0 0 #e5e5e5;
			.back-btn {
				position: absolute;
				left: 3.75rem;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				height: 3.75rem;
				line-height: 3.75rem;
				font-size: 1.75rem;
				letter-spacing: -0.71px;
			}
			.back-btn:before {
				content: "";
				display: inline-block;
				width: 1.1rem;
				height: 1.1rem;
				border-left: 2px solid #333;
				border-top: 2px solid #333;
				-webkit-transform: rotate(-45deg);
				transform: rotate(-45deg);
			}
			.head-text {
				text-align: center;
				line-height: 3.75rem;
				height: 3.75rem;
				color: #333;
				font-size: 2.25rem;
			}
			.cusIndex {
				width: 100%;
				height: 100%;
			}
		}
	}
	.loading-text {
		font-size: 1.5rem;
		color: #999;
		text-align: center;
		width: 100%;
		padding: 0.8rem;
		position: absolute;
		bottom: 6.5rem;
	}
	.finalFashionStoneContent {
		height: 100%;
		padding-top: 6.25rem;
	}
	.stone_value_wrap {
		background: #ffffff;
		box-shadow: 0 4px 10px 0 rgba(51, 51, 51, 0.20);
		.stone_value {
			color: #333333;
			font-size: 1.88rem;
			line-height: 2.63rem;
			display: flex;
			flex-wrap: wrap;
			padding: 1.63rem 0 0;
			.stone_value_box {
				display: flex;
				width: 50%;
				margin-bottom: 3rem;
				padding: 0 0 0 1.88rem;
				box-sizing: border-box;
				align-items: center;
				&:nth-of-type(3),
				&:nth-of-type(4) {
					margin-bottom: 2.94rem;
				}
				&:nth-of-type(3),
				&:nth-of-type(4) {
					margin-bottom: 2.56rem;
				}
				p {
					font-weight: 600;
					margin-right: 3.68rem;
				}
				.stone_value_list {
					display: flex;
					li {
						height: 2.88rem;
						text-align: center;
						line-height: 2.88rem;
						padding: 0 0.63rem;
						display: flex;
						justify-content: center;
						margin-right: 5.25rem;
						&.activeStone {
							background: #FF7B7B;
							border-radius: 0.25rem;
							color: #ffffff;
						}
					}
				}
			}
		}
		.clear_btn {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			padding-right: 2.81rem;
			padding-bottom: 2.5rem;
			box-sizing: border-box;
			div {
				font-size: 1.5rem;
				color: #FF7B7B;
				width: 10rem;
				height: 4.5rem;
				text-align: center;
				line-height: 4.5rem;
				border-radius: 0.63rem;
				border: 1px solid #FF7B7B;
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
	.select_stone {
		height: 100%;
		.sort {
			padding-right: 1.88rem;
			box-sizing: border-box;
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			display: flex;
			justify-content: flex-end;
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
					border-top-right-radius: 0.25rem;
					border-bottom-right-radius: 0.25rem;
				}
				li:first-child {
					border-top-left-radius: 0.25rem;
					border-bottom-left-radius: 0.25rem;
				}
			}
		}
		.table {
			position: relative;
			.scroll_wrap {
				height: 45rem;
				overflow-y: scroll;
			}
			.table_title,
			.table_body {
				width: 100%;
				display: flex;
				height: 5.5rem;
				li {
					flex: 1;
					height: 5.5rem;
					font-size: 1.5rem;
					color: #333333;
					display: flex;
					align-items: center;
					justify-content: center;
					.group-input {
						position: relative;
						input[type="radio"] {
							appearance: radio;
							z-index: 100;
							opacity: 0;
							position: relative;
							width: 2rem;
							height: 2rem;
						}
						.outCircle {
							width: 2rem;
							height: 2rem;
							border-radius: 50%;
							background: #ffffff;
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							border: 1px solid #999999;
							top: -1px;
							z-index: 5;
							.innerCircle {
								width: 1.5rem;
								height: 1.5rem;
								border-radius: 50%;
								background: #FF7B7B;
							}
							&.outCircleBorder {
								border: 1px solid #FF7B7B;
							}
						}
					}
					&.stone_price {
						color: #FF7B7B;
						font-weight: bold;
					}
				}
			}
			.table_title {
				background: #F5F5F5;
			}
			.table_body {
				transform: translateY(5rem);
				opacity: 0;
			}
			.table_body:nth-of-type(2n-1) {
				background: #FBFBFB;
			}
			.table_body:nth-of-type(2n) {
				background: #ffffff;
			}
		}
	}
	@keyframes upDown {
		0% {
			opacity: 0;
			transform: translateY(5rem);
		}
		100% {
			opacity: 1;
			transform: translateX(0rem);
		}
	}
}
</style>
