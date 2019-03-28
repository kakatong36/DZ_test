<template>
    <div class="finalFashion">
        <v-header :header="header"></v-header>
        <!-- 筛选条件 -->
		<div class="finalFashionContent">
			<div class="screen_wrap">
				<ul class="screen_container"  ref="filter">
					<li class="screen_title slide">
						<p>价格</p>
						<v-slide :dataslide='obj' key="price" @touchValue="getTouchVal" ref="priceSlide"></v-slide>
					</li>
					<li class="screen_title" v-for="(item,index) in selectList" :key="index" >
						<p>{{item.valueName}}</p>
						<ul class="screen_text" v-for="list in item.DataList" :key="list.Id">
							<li :class="{'active': list.active,'noItem': item.noActive}" @click="getSel(item.DataName,list.Id)">{{list.Name}}</li>
						</ul>
						<!-- <div class="clear_select">清空筛选</div> -->
					</li>
				</ul>
				<div class="arrow_wrap" @click="showMore"><span v-text="isShowMore?'收起筛选': '更多筛选'"></span><i class="arrow" :class="{arrowUp:isShowMore,arrowDown:!isShowMore}"></i></div>
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
						<ul class="product_container" v-if="goodsList.length>0">
							<li class="product_box" @click="goDetail(item.Id)" v-for="(item,index) in goodsList" :key="item.Id">
								<div class="product">
									<img class="imgGoods" :src="http.imgUrl+item.ImageCode+config.listImgSize"  v-show="item.loading" @load='loadingImg(index)'>
									<img :src="imgLoading" v-show="!item.loading" alt="">
								</div>
								<div class="product_content">
									<p class="goodsName">{{item.StyleName}}</p>
									<p class="goodsPrice">￥<span>{{item.MinPrice.toFixed(2) | money}}</span>起</p>
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
		<div v-show="false" class="leftMenuTitle" :class="{'leftMenuSlideOut': isShow,'leftMenuSlideIn': isNoShow}" @click="isShow = !isShow;isNoShow = !isShow"><div>组合定制</div></div>
		<div class="leftMenu" :class="{'leftSlideOut': isShow,'leftSlideIn': isNoShow}">
			<div class="group_menu">
				<ul>
					<li>
						<img src="../../assets/assetsFinal/couple.png" alt="">
					</li>
					<li>
						<img src="../../assets/assetsFinal/couple.png" alt="">
					</li>
					<li>
						<img src="../../assets/assetsFinal/couple.png" alt="">
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
    import footer from 'components/lightFashion/footer'
    import header from 'components/lightFashion/header'
	import nodata from 'components/nodata/newnodata'
	import loading from "@/components/isLoading/isloading";
	import dbSlide from '../dbSlide/slideDoble'
	const imgLoading = require('@/assets/assetsFinal/imgLoading.png')
    export default {
        data () {
            return {
				imgLoading: imgLoading,
				isShowMore: false,
				screenText: this.isShowMore == true ? '收起筛选': '更多筛选',

				isSortPrice: true,
				isSortTime: true,
				isSortSales: true,
				isInternet: false,

				isNodata: false,

                finishParams:{
					isStyleList: true,
					isShow: true,
					footerWord: {
						firstStep: '款式列表',
						secondStep: '款式详情',
						fourStep: '确认信息',
					},
				},
	 		 	unlimitedValue: 1000000,
				obj: {//价格滑块的
					type: 'init',
					step: 1000,
					min:1000,
					max: 30000,  //款的价格默认3万
					areaData: [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000],
					attr: 'price',
					float:0,//保留几位小数
					initLeft: 0,
					initRight: 0,
				},
                header:{
					title: '选择款式',
					isShow: true,
					return:{
						name: 'home',
					}
                },
				isShow: false,
				isNoShow: false,
				selectList: [],
				curId: '',
				pages: {
					PageIndex: 1,
					PageSize: 15,
				},
				
				AttributeSearch:[],
				goodsList: [],

				SortName: '',
				loadingtext: '正在加载中...',

				page:1,
				isloading: true,
				isExist: 1,
				isNodata: false,
				isLoadingText: false,
				isLoadingImg: false,
				isloadingFinished: false,
				StartPrice: 1000,
				EndPrice: 30000,

            }
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
			getTouchVal (val,type){
				if(type == 'price') {
					if(val[0] == 1000){
						val[0] = 0; 
					}
					//如果价格起始值等于视觉上的最大值，那么价格区间是10万-10万(同时居右：10万以上)
					//如果价格终止值等于视觉上的最大值，那么价格区间是 起始值-10万
					if(val[0] == this.obj.max || val[1] == this.obj.max){
						val[1] = this.unlimitedValue;
					}
					this.StartPrice = Number(val[0]);
					this.EndPrice = Number(val[1]);
				}
				this.pages.PageIndex = 1;
				this.page = 1;
				this.isExist = 1;
				this.goodsList = [];
				this.getValue ();
			},
			clear_select (){
				this.$refs.priceSlide.clearPrice();
				this.SortName = '';
				this.isSortPrice = true
				this.isSortTime = true
				this.isSortSales = true
				this.selectList.forEach(item=>{
					item.DataList.forEach(item1=>{
						item1.active = false;
					})
				})
				this.pages.PageSize = 15;
				this.pages.PageIndex = 1;
				this.page = 1;
				this.isExist = 1;
				this.goodsList = [];
				this.getValue ();
			},
			goDetail (id) {
				let obj = {
					Size:'',//价格
					finness: ''//成色
				}
				this.$store.commit('SET_SIZELIGHT',obj)
				this.$router.push({
					name: 'lightFashionDetail',
					params:{
						id: id,
						tableRow: this.$route.params.tableRow,
						index: this.$route.params.index,
						letter:{
							isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
							lettering:  this.$route.params.letter ? this.$route.params.letter.lettering : '',
						}
					}
				})
			},
            showMore () {
                this.isShowMore = !this.isShowMore;
				let filter = this.$refs.filter;
				let li = document.getElementsByClassName('screen_title');//li元素
				let liHeight = li[0].offsetHeight;
				let tableRefs = this.$refs.tables;
				if(this.isShowMore){
					filter.style.height = (liHeight + 14.04) * li.length + 'px';
					tableRefs.style.height = `50rem`;
				}else{
					filter.style.height = (liHeight + 14.04) * 3 + 'px';
					tableRefs.style.height = `58rem`;
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
				this.isExist = 1;
				this.goodsList = [];
				this.getValue();
			},
			getInit () {//初始化
				let that = this;
				let options = {
					url: '/purchase_Api_FashionStyle_SmallFreshInit'
				}
				let cbok = (res) =>{
					let data = res.data.data;
					if(data.Data){
						this.selectList = data.Data;
						this.selectList.forEach((item,index)=>{
							if(item.DataName == 'Category'){
								item.valueName = '品类'
							}else if(item.DataName == 'InlaidStone'){
								item.valueName = '镶石'
							}else if(item.DataName == 'Series'){
								item.valueName = '系列'
							}else if(item.DataName == 'InlaySize'){
								if(!this.$store.state.relate.isSroneOrStyle){//这里是先选配石的 不需要显示镶口大小
									item.noActive = true;
								}else{

								}
								item.valueName = '镶口大小';
							}else if(item.DataName == 'Theme'){
									item.valueName = '主题'
							}else if(item.DataName == 'StyleFeatures'){
								item.valueName = '款式特征'
							}else if(item.DataName == 'ArmType'){
								item.valueName = '戒臂类型'
							}else if(item.DataName == 'InlayCharacteristics'){
								item.valueName = '镶口特征'
							}else {}
							if(item.DataList && item.DataList.length > 0){
								item.DataList.forEach((item1,index)=>{
									this.$set(item1,'active', false)
								})
							}
							// if(item.DataName == 'Series'||item.DataName == 'Theme'||item.DataName == 'ArmType'||item.DataName == 'InlayCharacteristics'){
							// 	this.$set(item,'isShowMore', false)
							// }else{
							// 	this.$set(item,'isShowMore', true)
							// }
						})
					}
					// 排序
					let arr = []
					this.selectList.forEach((item,index)=>{
						if(item.DataName == 'Category'){
							item.valueName = '品类'
							arr.push(item)
						}
					})
					this.selectList.forEach((item,index)=>{
						if(item.DataName == 'InlaidStone'){
							item.valueName = '镶石'
							arr.push(item)
						}
					})
					this.selectList.forEach((item,index)=>{
						if(item.DataName == 'Series'){
							item.valueName = '系列'
							arr.push(item)
						}
					})
					this.selectList.forEach((item,index)=>{
						if(item.DataName == 'Theme'){
							item.valueName = '主题'
							arr.push(item)
						}
					})
					this.selectList = arr;
					this.$nextTick(()=>{
						let filter = this.$refs.filter;
						let li = document.getElementsByClassName('screen_title');//li元素
						let liHeight = li[0].offsetHeight;
						filter.style.height = (liHeight + 14.04) * 3 + 'px';
					})
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
					this.isLoadingText = true;
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
				if(this.$route.params.index && !this.$store.state.relate.isSroneOrStyle){//这里是先选配石的
					this.AttributeSearch.push({
						AttributeClass:1,
						AttrId:"InlaySize",
						AttrValueList:[{AttrValueId: this.$route.params.tableRow.Weight}]
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
					SortType: SortType,
					StartPrice: this.StartPrice,
					EndPrice:this.EndPrice
				}
				//处理价格的请求：1.默认是0-10万；2.滑块都在左侧是：0-1000；3.滑块都在右侧是：10万以上
				if((!params.StartPrice && !params.EndPrice) || (params.StartPrice== this.obj.min && params.EndPrice == this.obj.max)){
					params.EndPrice = this.unlimitedValue;
					params.StartPrice = 0;
				}
				let options = {
					url: '/purchase_Api_FashionStyle_SmallFreshList',
					params:params
				}
				let cbok = (res) =>{
					this.isLoadingText = false;
					this.isLoadingImg = false;
					this.isInternet = false
					let data = res.data.data.data_list;
					this.isNodata = false;
					if(data.length % 15 == 0 && data.length) {//只有后台返回来的数据为30的倍数才选择加一
						this.page ++ ;
					}
					if(page) {
						this.isloading = true;
						if(this.isExist != page) {//这里判断的是否已经全部加载完数据了
							data.forEach(item => {
								this.$set(item,'loading',false)
								this.goodsList.push(item);
							})
							this.loadingtext = '正在加载中...'
						}else{
							this.loadingtext = '亲，已经到底啦！'
						}
						this.isExist = page;
					}else{//这里是页面刚进来的时候加载
						data.forEach(item => {
							this.$set(item,'loading',false)
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
					this.isNodata = true;
					this.isLoadingImg = false;
					this.isLoadingText = false;
					this.isInternet = true
				}
				let cbnull = (res) => {
					this.isloading = true;
					if(this.pages.PageIndex == 1){
						this.isNodata = true;
						this.goodsList = [];
					}
					this.isLoadingImg = false;
					this.isLoadingText = false;
					this.isInternet = false
				}
				this.http.post(options,cbok,cbno,cbnull);
			}
        },
        created () {
			this.getInit();//筛选条件列表
			this.getValue ();
			this.$store.commit('SET_STYLELIGHT',true)
        },
        components: {
            'v-footer': footer,
			'v-header': header,
			'v-nodata': nodata,
			'v-loading': loading,
			'v-slide': dbSlide
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
        // overflow-y: scroll;
		// margin-top: 3.75rem;
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
				transition: height 0.5s ease;
                overflow: hidden;
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
                    margin-bottom: 1.56rem;
                    position: relative;
                    // transition: height 0.5s ease;
					&.slide{
						margin-bottom: 2.63rem;
					}
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
			top: 3.75rem;
			left: -25.63rem;
			height: 100%;
			background: #ffffff;
			.group_menu{
				li{
					width: 25.63rem;
					height: 29.38rem;
					img{
						width: 100%;
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
