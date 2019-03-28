<template>
    <div class="finalFashion">
        <v-header :header="header"></v-header>
        <!-- 筛选条件 -->
		<div class="finalFashionContent">
			<div class="screen_wrap">
				<ul class="screen_container"  ref="filter">
					<li class="screen_title" v-for="(item,index) in selectList" :key="index">
						<p>{{item.valueName}}</p>
						<ul class="screen_text" v-for="list in item.DataList" :key="list.Id">
							<li :class="{'active': list.active,'noItem': item.noActive}" @click="getSel(item.DataName,list.Id)">{{list.Name}}</li>
						</ul>
						<!-- <div class="clear_select">清空筛选</div> -->
					</li>
				</ul>
				<div class="arrow_wrap" @click="showMore"><span v-text="isShowMore?'收起筛选': '更多筛选'"></span><i class="arrow" :class="{'arrowUp':isShowMore,'arrowDown':!isShowMore}"></i></div>
				<div class="clear-select" @click="clear_select">清空筛选</div>
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
						<ul class="product_container" v-if="goodsList.length > 0">
							<li class="product_box" @click="goDetail(item.Id)" v-for="(item,index) in goodsList" :key="item.Id">
								<div class="product">
									<img class="imgGoods" :src="http.imgUrl+item.ImageCode+config.listImgSize" v-show="item.loading" @load='loadingImg(index)'>
									<img :src="imgLoading" v-show="!item.loading">
								</div>
								<div class="product_content">
									<p class="goodsName">{{item.StyleName}}</p>
									<p class="goodsPrice">￥<span>{{Number(item.MinPrice).toFixed(2) | money}}</span>起</p>
								</div>
							</li>
						</ul>
						<p v-show="isLoadingText" class="loading-text">{{loadingtext}}</p>
					</div>
				</div>
				
				<v-nodata v-show="isNodata" msg="搜索无结果"></v-nodata>
			</div>
		</div>
		<!-- 左边菜单栏 -->
		<div v-if="showSlideMenu" class="leftMenuTitle" :class="{'leftMenuSlideOut': showSlide,'leftMenuSlideIn': notShowSlide}" @click="showSlide = !showSlide;notShowSlide = !showSlide"><div>组合定制</div></div>
		<div v-if="showSlideMenu" class="leftMenu" :class="{'leftSlideOut': showSlide,'leftSlideIn': notShowSlide}">
			<div class="group_menu">
				<ul>
					<li @click="goCombination('series')">
						<img src="../../assets/assetsFinal/couples01.jpg">
					</li>
					<li @click="goCombination('couples')">
						<img src="../../assets/assetsFinal/couple.png">
					</li>
					<li @click="goCombination('myBrideWidget')">
						<img src="../../assets/assetsFinal/couples02.jpg">
					</li>
				</ul>
			</div>
		</div>
		<shopMenu></shopMenu>
		<div class="mask" :class="{'active': isShow}"></div>
		<v-loading v-show="isLoadingImg"></v-loading>
        <v-footer :finishParams="finishParams"></v-footer>
		<noInternet v-show="isInternet"></noInternet>
  </div>
</template>

<script>
    import footer from './footer'
    import header from './header'
	import nodata from 'components/nodata/newnodata'
	import nointernet from 'components/nodata/noInternet'
	import loading from 'components/isLoading/isloading'
	const imgLoading = require('@/assets/assetsFinal/imgLoading.png')
    export default {
        data () {
            return {
				imgLoading: imgLoading,
				isInternet: false,
				isShowMore: false,
				screenText: this.isShowMore == true ? '收起筛选': '更多筛选',

				isSortPrice: true,
				isSortTime: true,
				isSortSales: true,

				isNodata: false,
				isHaveScreen: false,

				loadingtext: '正在加载中...',
                finishParams:{
					isStyleList: true,
					isShow: true,
					footerWord: {
						firstStep: '款式列表',
						secondStep: '款式详情',
						thirdStep: '配石',
						fourStep: '确认信息',
					},
				},
				
                header:{
					title: '选择款式',
					isShow: true,
					return: {
						name: this.$store.state.relate.isSroneOrStyle ? "finalFashionFashionIndex" : 'finalFashionStoneFirst',
						params: {
							id: this.$route.params.id,
							index: this.$route.params.index,//这个参数是列表的第几行索引
							tableRow: this.$route.params.tableRow,
							letter:{
								isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
								lettering:  this.$route.params.letter ? this.$route.params.letter.lettering : '',
							},
							size: this.$route.params.size
						}
					}
                },
				isShow: false,
				isNoShow: false,
				showSlide: false,
				showSlideMenu: true,
				notShowSlide: false,
				selectList: [],
				curId: '',
				pages: {
					PageIndex: 1,
					PageSize: 15,
				},
				
				AttributeSearch:[],
				goodsList: [],

				SortName: '',

				page:1,
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
		filters: {
			moneyToFixed(val){
				if(!val) return 0
				let num = val.toFixed(2)
				return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			},
		},
		mounted () {
            let tableRefs = this.$refs.tables;
			let that = this;
			this.$nextTick(() => {
				tableRefs.addEventListener('scroll', function() {
					if(that.goodsList.length == 0){ 
						return false
					}
					if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
						if(that.isloading){
							that.isLoadingText = true;
							that.isloading = false;
							that.getValue (that.page);
						}
					}else{
					}
				}, false)
			})  
        },
        methods: {
			goCombination(name){
				let params = this.$route.params,
					query = {from: this.$route.name}
				this.$router.replace({
					name,
					params,
					query
				})
			},
			loadingImg (index){//图片加载
				this.goodsList.forEach((item,index1)=>{
					if(index == index1){
						item.loading = true;
					}
				})
			},
			getScrollTop () {//获取滚动条当前的位置 
				var scrollTop = 0; 
				if (document.documentElement && document.documentElement.scrollTop) { 
					scrollTop = this.$refs.tables.scrollTop; 
				} 
				else if (document.body) { 
					scrollTop = this.$refs.tables.scrollTop; 
				} 
				return scrollTop;
			},
			getClientHeight () {//获取当前可视范围的高度 
				var clientHeight = 0; 
				if (this.$refs.tables.clientHeight && this.$refs.tables.clientHeight) { 
					clientHeight =  this.$refs.tables.clientHeight; 
				} 
				else { 
					clientHeight =  this.$refs.tables.clientHeight; 
				} 
				return clientHeight;
			},
			getScrollHeight () {//获取文档完整的高度
				return this.$refs.tables.scrollHeight;
			},
			clear_select (){
				this.selectList.forEach(item=>{
					item.DataList.forEach(item1=>{
						item1.active = false;
					})
				})
				this.SortName = '';
				this.isSortPrice = true
				this.isSortTime = true
				this.isSortSales = true
				this.isExist = 1;
				this.pages.PageIndex = 1;
            	this.page = 1;
				this.goodsList = [];
				this.getValue ();
			},
			goDetail (id) {
				let obj = {
					stylePrice: '',//价格
					finness: ''//成色
				}
				this.$store.commit('SET_FASHION',obj)//保存
				this.$router.push({
					name: 'finalFashionDetail',
					params:{
						id: id,
						tableRow: this.$route.params.tableRow,
						index: this.$route.params.index,
						letter:{
							isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
							lettering:  this.$route.params.letter ? this.$route.params.letter.lettering : '',
						},
						size: '',
						inlay: ''
					}
				})
			},
            showMore () {
                this.isShowMore = !this.isShowMore;
				let filter = this.$refs.filter;
				let tables = this.$refs.tables
				let li = document.getElementsByClassName('screen_title');//li元素
				let liHeight = li[0].offsetHeight;
				if(this.isShowMore){
					filter.style.height = (liHeight + 13.04) * li.length + 'px';
					tables.style.height = `36rem`;
				}else{
					filter.style.height = (liHeight + 13.04) * 4 + 'px';
					tables.style.height = `58rem`;
				}
				
			},
			getSort (SortName ){//排序
				this.SortName = SortName;
				if(SortName == 'price'){
					this.isSortPrice = !this.isSortPrice;
					if(!this.isSortPrice){
						this.isSortTime = true;
						this.isSortSales = true;
					}
				}else if(SortName == 'time'){
					this.isSortTime = !this.isSortTime;
					if(!this.isSortTime){
						this.isSortPrice = true;
						this.isSortSales = true;
					}
				}else if(SortName == 'sales'){
					this.isSortSales = !this.isSortSales;
					if(!this.isSortSales){
						this.isSortPrice = true;
						this.isSortTime = true;
					}
				}else {}
				this.pages.PageIndex = 1;
            	this.page = 1;
				this.goodsList = [];
				this.isExist = 1
				this.getValue();
			},
			getInit () {//初始化
				let that = this;
				let options = {
					url: '/purchase_Api_FashionStyle_Init'
				}
				let cbok = (res) =>{
					this.isHaveScreen = true;
					let data = res.data.data;
					if(data.Data){
						// this.selectList = data.Data;
						 data.Data.forEach((item,index)=>{
							if(item.DataList && item.DataList.length > 0){
								item.DataList.forEach((item1,index)=>{
									this.$set(item1,'active', false)
								})
							}
							// if(item.DataName == 'StyleStyle'||item.DataName == 'StyleFeatures'||item.DataName == 'ArmType'||item.DataName == 'InlayCharacteristics'||item.DataName == 'Theme'){
							// 	this.$set(item,'isShowMore', false)
							// }else{
							// 	this.$set(item,'isShowMore', true)
							// }
							if(item.DataName == 'Category'){
								item.valueName = '款式'
								this.selectList.push(item)
							}else if(item.DataName == 'Condition'){
								item.valueName = '成色'
								this.selectList.push(item)
							}else if(item.DataName == 'Series'){
								item.valueName = '系列名字'
								this.selectList.push(item)
							}else if(item.DataName == 'InlaySize'){
								if(!this.$store.state.relate.isSroneOrStyle){//这里是先选配石的 不需要显示镶口大小
									item.noActive = true;
								}
								item.valueName = '镶口大小';
								this.selectList.push(item)
							}else if(item.DataName == 'StyleStyle'){
								item.valueName = '款式风格'
								this.selectList.push(item)
							}else if(item.DataName == 'StyleFeatures'){
								item.valueName = '款式特征'
								this.selectList.push(item)
							}else if(item.DataName == 'ArmType'){
								item.valueName = '戒臂类型'
							}else if(item.DataName == 'InlayCharacteristics'){
								item.valueName = '镶口特征'
								this.selectList.push(item)
							}else if(item.DataName == 'Theme'){
								item.valueName = '主题'
								this.selectList.push(item)
							}
						})
						this.$nextTick(()=>{
							let filter = this.$refs.filter;
							let li = document.getElementsByClassName('screen_title');//li元素
							let liHeight = li[0].offsetHeight;
							filter.style.height = (liHeight + 13.04) * 4 + 'px';
						})
					}
				}
				let cbno = (res) =>{
					
				}
				this.http.get(options,cbok);
			},
			getSel (name,id){
				let flag = true;
				this.selectList.forEach((item)=>{
					if(item.DataName == name){
						item.DataList.forEach((item1)=>{
							if(item1.Id == id){
								if(item.DataName == 'InlaySize' && !this.$store.state.relate.isSroneOrStyle){
									flag = false;
									return false
								}
								item1.active = !item1.active;
							}
						})
					}
				})
				if(!flag) {return false}
				this.pages.PageIndex = 1;
				this.page = 1;
				this.isExist = 1;
				this.goodsList = [];
				this.getValue ();
			},
			getValue (page) {
				if(page){
					// this.isLoadingText = true;
				}else{
					this.isLoadingImg = true;
				}
				
				this.AttributeSearch = []
				this.selectList.forEach((item)=>{
					let arr = [];
					let obj = {};
					item.DataList.forEach((item1,index)=>{
						if(item1.active){
							arr.push({
								AttrValueId: item1.Id
							})
							if(item.DataName == 'Condition' || item.DataName == 'InlaySize'){
								obj.AttributeClass = 1
							}else{
								obj.AttributeClass = 3;
							}
							obj.AttrId = item1.ParentId
							obj.AttrValueList = arr;
						}
					})
					if(obj.AttrValueList){
						this.AttributeSearch.push(obj);
					}
				})
				if(!this.$store.state.relate.isSroneOrStyle){//这里是先选配石的
					let Weight;
					if(this.$route.params.tableRow){
						Weight = this.$route.params.tableRow.Weight
					}
					this.AttributeSearch.push({
						AttributeClass:1,
						AttrId:"InlaySize",
						AttrValueList:[{AttrValueId: Weight}]
					})
				}
				let SortType = '';
				if(this.SortName == 'price'){
					SortType = this.isSortPrice ? 'desc': 'asc'
				}else if(this.SortName == 'time'){
					SortType = this.isSortTime ? 'desc': 'asc'
				}else{
					SortType = this.isSortSales ? 'desc': 'asc'
				}
				if(page){
					this.pages.PageIndex = page;
				}
				let params = {
					PageIndex: this.pages.PageIndex,
					PageSize: this.pages.PageSize,
					AttributeSearch: this.AttributeSearch,
					SortName: this.SortName,
					SortType: SortType
				}
				let options = {
					url: '/purchase_Api_FashionStyle_ResplendentDiamondList',
					params:params
				}
				let cbok = (res) =>{
					this.isNodata = false;//无数据
					this.isLoadingText = false;//加载更多
					this.isLoadingImg = false;//loading 加载中
					this.isInternet = false;//无网络
					
					let data = res.data.data.data_list;
					if(data.length % 15 == 0 && data.length) {//只有后台返回来的数据为30的倍数才选择加一
						this.page ++ ;
					}
					if(page) {
						this.isloading = true;
						if(this.isExist != page) {//这里判断的是否已经全部加载完数据了
							data.forEach(item => {
								this.$set(item,"loading",false)
								this.goodsList.push(item);
							})
							this.loadingtext = '正在加载中...'
						}else{
							this.loadingtext = '亲，已经到底啦！'
						}
						this.isExist = page;
					}else{//这里是页面刚进来的时候加载
						data.forEach(item => {
							this.$set(item,"loading",false)
							this.goodsList.push(item);
						})
					}
					this.$nextTick(()=>{
						let dom = document.getElementsByClassName('product_box');
						for(let i = 0 ; i < dom.length; i ++){
							dom[i].style.transform = "translateY(5rem)";
							dom[i].style.opacity = 0;
						}
						for(let i = 0 ; i < dom.length; i ++){
							dom[i].style.animation = "goods 0.5s ease forwards";
   						}
					})
				}
				let cbno = (res) =>{
					this.goodsList = [];
					this.isNodata = false;
					this.isLoadingImg = false;
					this.isLoadingText = false;
					this.isInternet = true;
				}
				let cbnull = (res) => {
					this.isloading = true;
					if(this.pages.PageIndex == 1){
						this.isNodata = true;
						this.goodsList = [];
					}
					this.isLoadingImg = false;
					this.isLoadingText = false;
				}
				this.http.post(options,cbok,cbno,cbnull);
			}
        },
		created () {
			this.getInit();//筛选条件列表
			this.getValue ();
			
			if(!this.$store.state.relate.isSroneOrStyle){
				this.finishParams.isStyleListFinshed = true;
				this.finishParams.isStyleList = false;
				this.finishParams.isDetail = true;
				this.finishParams.footerWord.firstStep = '配石列表';
				this.finishParams.footerWord.secondStep = '款式列表';
				this.finishParams.footerWord.thirdStep = '款式详情';
				this.finishParams.footerWord.fourStep = '确认信息';
				this.$store.commit('SET_DETAIL',true)
			}else{
				this.$store.commit('SET_STYLE',true)
			}
			if(this.$route.query.from == 'finalFashionStoneFirst'){
				this.showSlideMenu = false
			}else if(this.$route.query.from == 'combination'){
				this.showSlideMenu = true
				this.$store.commit('SET_DETAIL', false)
				this.$store.commit('SET_STONE', false)
				this.$store.commit('SET_SETTLEMENT', false)
			}else{
				this.showSlideMenu = true
			}
        },
        components: {
            'v-footer': footer,
			'v-header': header,
			'v-nodata': nodata,
			'v-loading': loading,
			'v-nointernet':nointernet
        }
    }
</script>

<style lang="scss">
	#app{
		height: 100%;
	}
    .finalFashion{
        background: #ffffff;
        height: 100%;
		.loading-text{
			height: 1.5rem;
			font-size: 1.88rem;
			color: #999;
			text-align: center;
			width: 100%;
			padding: 0.8rem;
			position: absolute;
			bottom: 2rem;
		}
		.mask{
			width: 100%;
			height: 100%;
			background:rgba(0, 0, 0, 0.1);
			position: absolute;
			left: 0;
			top: 0;
			display: none;
			&.active{
				display: block;
			}
		}
		.finalFashionContent{
			height: 100%;
			padding-top: 6.25rem;
			// overflow-y: scroll;
		}
        .screen_wrap{
            background: #ffffff;
            box-shadow: 0 1px 6px 0 rgba(51,51,51,0.20);
			// padding-bottom: 1.25rem;
            position: relative;
            .screen_container{
				overflow: hidden;
				// height: 17.02rem;
				transition: height 0.5s ease;
                &:first-child{
                    padding: 1.5rem 2.5rem 0 2.5rem;
                }
                &:nth-of-type(2){
                    padding: 0 2.5rem;
					// height: 0;
					// overflow: hidden;
                }
                &.moreThing{
                    transform: translateY(8rem);
                }
				// height: 25rem;
                .screen_title{
                    font-size: 1.88rem;
                    color: #333333;
                    display: flex;
                    align-items: center;
                    line-height: 2.63rem;
                    margin-bottom: 1.63rem;
                    position: relative;
                    // transition: height 0.5s ease;
					&:last-child{
                    	margin-bottom: 0;
					}
                    p{
                        font-weight: 500;
                        width: 4em;
                        // height: 1.75rem;
                        text-align: left;
                        margin-right: 3.38rem;
                    }
                    .clear_select {
                        position: absolute;
                        right: 0;
                        &:active{
                            opacity: 0.8;
                        }
                    }
                    .screen_text{
                        display: flex;
                        align-items: center;
                        li{
                            margin-right: 3rem;
                            padding: 0 0.25rem;
							// transition: background 0.2s linear;
                        }
                        .active{
                            background: #FF7B7B;
                            border-radius: 0.25rem;
							color: #fff;
                        }
						.noItem{
							color: #999999;
						}
                    }
				}
				.sumbit_btn{
					display: flex;
					justify-content: center;
					padding: 1rem 0;
					div{
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
			.arrow_wrap{
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999999;
				font-size: 1.5rem;
				height: 4rem;
				span{
					line-height: 4rem;
				}
				.arrow{
					display: inline-block;
					width: 4rem;
					height: 4rem;
					background: url(../../assets/assetsFinal/icon_xiala.png) no-repeat center;
					background-size: 4rem 4rem;
					transition: transform  0.2s ease;
					&.arrowUp{
						transform: rotate(180deg);
					}
					&.arrowDown{
						transform: rotate(0);
					}
				}
			}
			.clear-select{
				position: absolute;
				font-size: 1.5rem;
				color: #FF7B7B;
				width: 10rem;
				height: 4.5rem;
				text-align: center;
				line-height: 4.5rem;
				border-radius: 0.63rem;
				border: 1px solid #FF7B7B;
				bottom: 1.5rem;
				right: 1.88rem;
				&:active{
					opacity: 0.8;
				}
			}
		}
		.line_dashed{
			padding: 0 13rem 0 8rem;
			box-sizing: border-box; 
			&:before{
				content: "";
				display: block;
				// border: 1px dashed #bbbbbb;
			}
		}
		.condition_screen{
			position: absolute;
			right: 0;
			top: 1rem;
			ul{
				display: flex;
				flex-wrap: wrap;
				width: 42rem;
				li{
					background: #FF7B7B;
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
			.again_condition{
				font-size: 1.88rem;
				position: absolute;
				right: 5.5rem;
				margin-top: 4rem;
				&:active{
					opacity: 0.8;
				}
			}
		}
        .product_wrap{
			position: relative;
			.sort{
				padding-right: 1.88rem;
				box-sizing: border-box;
				margin-top: 1.25rem;
				display: flex;
				justify-content: flex-end;
				padding-bottom: 1.25rem;
				ul{
					display: flex;
					li{
						border-top: 1px solid #E5E5E5;
						border-left: 1px solid #E5E5E5;
						border-bottom: 1px solid #E5E5E5;
						font-size: 1.88rem;
						line-height: 2.63rem;
						padding: 0.69rem 0 0.94rem 1.25rem;
						display: flex;
						align-items: center;
						i{
							display: inline-block;
							width: 0.7rem;
							height: 0.7rem;
							border-right: 1px solid #666;
							border-top: 1px solid #666;
							margin: 0 1.17rem;
							transition: all .5s ease;
							&.up{
								transform: rotate(-45deg);
							}
							&.down{
								transform: rotate(135deg);
							}
						}
						&.active{
							color: #FF7B7B;
							i{
								border-color: #FF7B7B;
							}
						}
					}
					li:last-child{
						border-right: 1px solid #E5E5E5;
					}
				}			
			}
			.list-box{
				height: 58rem;
				overflow-y: scroll;
				.list-list{
					position: relative;
				}
			}
            .product_container{
                display: flex;
                flex-wrap: wrap;
				padding-bottom: 3rem;
                .product_box{
                    width: 20%;
                    border: 0.06rem solid rgba(0, 0, 0, 0.1);
					box-sizing: border-box;
					// transform: translateY(5rem);
					// animation: goods 0.5s ease ;
					// animation-fill-mode: forwards;
                    .product_content{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: #333333 ;
                        .goodsName{
                            font-size: 1.88rem;
                            line-height: 2.63rem;
                            margin-top: 1.25rem;
							text-align: center;
                        }
                        .goodsPrice{
                            text-align: center;
							line-height: 3.63rem;
							color: #FF7B7B;
							margin-bottom: 1.25rem;
							margin-top: 1.06rem;
                           	font-size: 1.5rem;
							span{
								font-family: 'fontNameRegular'; 
								font-size: 2.8rem;
							}	
                        }
                    }
					.product{
						// animation: fadeIn 0.5s ease;
						width: 100%;
						height: 17rem;
						padding: 1.5rem 5.23rem 0 5.23rem;
						box-sizing: border-box;
						img{
							width: 100%;
						}
						.imgGoods{
							animation: scaleimg 0.5s ease;
						}
					}
                }
            }
		}
		.leftMenuTitle{
			width: 4.25rem;
			height: 15rem;
			background-image: linear-gradient(-139deg, #FFE999 0%, #FF9485 100%);
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
			div{
				width: 1.6rem;
				text-align: center;
				word-wrap: break-word;
				word-wrap: normal;
				font-size: 1.5rem;
				color: #ffffff;
			}
			&.leftMenuSlideOut{
				animation: leftMenuSlideOut 0.5s ease;
				animation-fill-mode: forwards;
			}
			&.leftMenuSlideIn{
				animation: leftMenuSlideIn 0.5s ease;
				animation-fill-mode: forwards;
			}
		}
		.leftMenu{
			position: absolute;
			z-index: 10;
			top: 6.25rem;
			left: -25.63rem;
			bottom: 0;
			display: flex;
			// background: #ffffff;
			background:rgba(0, 0, 0, 0.1);
			.group_menu{
				display: flex;
				flex: 1;
				ul{
					display: flex;
					flex: 1;
					flex-direction: column;
				}
				li{
					width: 25.63rem;
					flex: 1;
					img{
						width: 100%;
						height: 100%;
					}
					&:active{
						opacity: 0.8;
					}
				}
			}
			&.leftSlideOut{
				animation: leftSlideOut 0.5s ease;
				animation-fill-mode: forwards;
			}
			&.leftSlideIn{
				animation: leftSlideIn 0.5s ease;
				animation-fill-mode: forwards;
			}
		}
		// 左侧菜单
		@keyframes leftSlideOut {
			0%{
				transform: translateX(0);
			}
			100%{
				transform: translateX(25.63rem);
			}
		}
		@keyframes leftSlideIn {
			0%{
				transform: translateX(25.63rem);
			}
			100%{
				transform: translateX(0);
			}
		}
		// 组合定制
		@keyframes leftMenuSlideOut {
			0%{
				transform: translateX(4.25rem);
			}
			100%{
				transform: translateX(29.88rem);
			}
		}
		@keyframes leftMenuSlideIn {
			0%{
				transform: translateX(29.88rem);
			}
			100%{
				transform: translateX(4.25rem);
			}
		}
		@keyframes leftFade {
			0%{
				left: -4.25rem;
				opacity: 0;
			}100%{
				left: 0;
				opacity: 1;
			}
		}
		// 遮罩层
		@keyframes maskOut {
			0%{
				opacity: 0;
			}
			100%{
				opacity: 1;
			}
		}
		@keyframes maskOut {
			0%{
				opacity: 1;
			}
			100%{
				opacity: 0;
			}
		}
		// 商品
		@keyframes goods {
			0%{
				transform: translateY(5rem);
				opacity: 0;
			}
			100%{
				transform: translateY(0);
				opacity: 1;
			}
		}






        @keyframes fadeIn {
            0%{
                opacity: 0;
                transform: translateY(5rem);
            }
            100%{
                opacity: 1;
                transform: translateY(0rem);
            }
        }
        @keyframes updown {
            0% {
                height: 2.25rem;
            }
            100%{
                height: 0rem;
            }
        }
        @keyframes downUp {
            0% {
                height: 0rem;
            }
            100%{
                height: 2.25rem;
            }
        }
    }
</style>
