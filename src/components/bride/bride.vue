<template>
	<div class="bride" style="padding:0;">
		<div class="bride-inner scroller-outer">
			<div class="zuo">
				<section class="huatou">
						<div class="insert-wrap">
							<ul class="scroll-list">
								<li v-for="(insert, index1) in insertList" :class='{active:curSuit.Id == insert.Id}' @click="flower(insert)" :key="index1">
									<div class="imgbox scroll-item">
								<!-- <img :src="insert.MainImg" alt=""> -->
										<img src="/static/img/pic6@3x.a095a46.png">
									</div>
									
								</li>
							</ul>
						</div>
				</section>
			<!-- <section v-show="ringArmList.length>0"> -->
				<section class="jiebi">
						<div class="insert-wrap">
							<ul class="scroll-list">	
								<li v-for="(Flowerheads, index2) in FlowerheadsList" :class='{active:curRing && curRing.Id == Flowerheads.Id}'  @click="Ringarm(Flowerheads)" :key="index2">
									<div class="imgbox scroll-item">
								<!-- <img :src="insert.MainImg" alt=""> -->
									<img src="/static/img/pic6@3x.a095a46.png">
									</div>
									
								</li>
							</ul>
						</div>
				</section>
			</div>
			<section class="xiaoguo" v-if="isShows">
					<div class="insert-wrap">
						<ul class="scroll-list scroll">
							<li v-for="(item, index3) in combinationList.ImagesList"  :key="index3">
								<div class="imgbox ">
									<img :src="item.ImageCode">
								</div>
							</li>
						</ul>
					</div>	
					<div class="button">
						<router-link v-if="combinationList.Id" :to='"/bride/ringparameters/"+combinationList.Id' class="Nextstep">下一步</router-link>
					</div>
			</section>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
				return {
					isShow: this.$store.state.header.isShow = true,
					title: this.$store.state.header.title = '我的新娘',
					isShowF: this.$store.state.footer.isShow = true,
					textBtn: '选择此款',
					insertList: [],
					FlowerheadsList:[],
					combinationList:{},
					ringArmList: [],
					testData: [],
					styleSkuList: [],
					suitID: null,
					selectSkuData: [],
					recList: [],
					suit: {},
					// imgUrl: this.$store.state.header.imgUrl + JSON.parse(localStorage.getItem('user')).SelUser.SellerId + "/Seller/image/",
					mainStyle: {},
					recommendStyle: {},
					curSuit: {},
					curRing:{},
					curSku:{},
					isShows: false
				}
			},

			/*返回上级页面的时候清除vuex-->personal-->bride数据*/
			beforeRouteLeave(to, from, next) {
				if(to.name == 'personal') {
					var suitParams = {
						sign: 'bride',
						data: {}
					};
					this.$store.dispatch('set_suit', suitParams);
					var params = {
						sign: 'bride',
						data: {
							main: {},
							recommend: {}
						}
					};
					this.$store.dispatch('set_suit_product', params);
				};
				next();
			},
			mounted() {
				this.getInsertList();
				this.getFlowerheadsList();
				
					
			},
			watch: {
				styleSkuList: {
					handler(val, oval) {
						this.selectSkuData = [];
						this.styleSkuList.map(value => {
							value.attrChildren.map(value1 => {
								const selectValue = JSON.parse(value1.select);
								if(selectValue !== null) {
									this.selectSkuData.push(selectValue)
								}
							});
						});
						/*设置sku*/
						var skuparams = {
							sign: 'bride',
							data: this.styleSkuList
						};

						this.$store.dispatch('set_suit_sku', skuparams);
						/*设置skucontent*/
						var skuContent = {
							sign: 'bride',
							data: this.selectSkuData
						};
					},
					deep: true
				}
			},
			methods: {
				scroller_animate(){
					for(var i = 0; i < this.len; i++) {
						if(i == this.cindex) {
							this.list[i].classList.add("active");
						} else {
							this.list[i].classList.remove("active");
						}
					}
				},
				flower (insert){
					if(this.curSuit.Id !== insert.Id){
						this.curSuit = insert;
						this.getcombinationList();
					}else{
						this.curSuit = {}
					}
				},
				Ringarm(Flowerheads){
					if(this.curRing.Id !== Flowerheads.Id){
						this.curRing = Flowerheads;
						this.getcombinationList();
					}else{
						this.curRing = {}
					}
					
				},
				//获取花头列表InsertList
				getInsertList() {
					this.loading();
					const options = {
						url:'/Purchase_Api_MyBride_GetFlowerList'
					};
					const cbok = res => {
						this.insertList = res.data.data.data_list;
						this.closeLoad()
					};
					this.http.get(options, cbok);
				},

				//获取戒臂列表
				getFlowerheadsList(){
					this.loading();
					const options = {
						url:'/Purchase_Api_MyBride_GetRingArmsList'
					};
					const cbok = res => {
						this.FlowerheadsList = res.data.data.data_list;
						this.closeLoad()
					};
					this.http.get(options,cbok);
				},
				//组合图列表
				getcombinationList(){
					if(!this.curSuit.Id || !this.curRing.Id){
						this.isShows = false;
						return
					}else{
						this.isShows = true;
					} 
					this.loading();
					const options = {
						url:'/Purchase_Api_MyBride_GetGroupInfo',
						params:{
							flowerId: this.curSuit.Id,
							ringArmsId: this.curRing.Id
						}
					};
					const cbok = res =>{
						this.combinationList = res.data.data;

						this.closeLoad()
					};
					this.http.get(options,cbok);
				},
				/*选择戒臂*/
				getRingArm(style, data, type) {
					var lis = document.querySelectorAll(".arm");
					if(lis[0].style.transitionDelay != '0s') {
						lis.forEach(function(item) {
							item.style.transitionDelay = "0s";
						});
					}
			
					/*检车是否有已选择了的属性*/
					if(this.$store.state.personal.bride.styleSkuList.length > 0 && type == 'init') {
						this.styleSkuList = this.$store.state.personal.bride.styleSkuList;
						return;
					}

					/*判断事件的触发条件*/
					if(type != 'init') {
						if(this.recommendStyle.Id == style.id) {
							this.recommendStyle = {};
							this.styleSkuList = [];
							return;
						};
					}
					var recstyle = {};
					this.recommendStyle = style.itemData;
					const attrFroupObj = {},
						styleSkyAttrData = [];

					/*选择戒臂，更新vuex的personal-->bride状态*/
					/*设置选择的款式*/
					var params = {
						sign: 'bride',
						data: {
							main: this.suit,
							recommend: this.recommendStyle
						}
					};
					this.$store.dispatch('set_suit_product', params);

					var Sku_Attr_list = [];
					this.recommendStyle.SuitSKU.map(function(item,index,array){
						item.AttrList.map(function(item,index,array){
							if(Sku_Attr_list.indexOf(item)<0){
								Sku_Attr_list.push(item);
							}
						});
					})		    
					Sku_Attr_list.map(value1 => {
						attrFroupObj[value1.AttributeGroupName] = attrFroupObj[value1.AttributeGroupName] === undefined ? [] : attrFroupObj[value1.AttributeGroupName];
						attrFroupObj[value1.AttributeGroupName][value1.AttrName] = attrFroupObj[value1.AttributeGroupName][value1.AttrName] === undefined ? {} : attrFroupObj[value1.AttributeGroupName][value1.AttrName];
						attrFroupObj[value1.AttributeGroupName][value1.AttrName][value1.AttrValue] = attrFroupObj[value1.AttributeGroupName][value1.AttrName][value1.AttrValue] === undefined ? "" : attrFroupObj[value1.AttributeGroupName][value1.AttrName][value1.AttrValue];
						attrFroupObj[value1.AttributeGroupName][value1.AttrName][value1.AttrValue] = value1;
					});
					 console.log(styleSkyAttrData);
	
					for(let key of Object.keys(attrFroupObj)) {
						const attrArray = {};
						styleSkyAttrData.push(attrArray);
						attrArray.name = key;
						attrArray.attrChildren = [];
						for(let attrKey of Object.keys(attrFroupObj[key])) {
							const attrChildren = {};
							attrChildren.name = attrKey;
							attrChildren.select = null;
							attrChildren.attrChildren = [];
							for(let attrValueKey of Object.keys(attrFroupObj[key][attrKey])) {
								attrChildren.attrChildren.push(attrFroupObj[key][attrKey][attrValueKey])
							}
							attrArray.attrChildren.push(attrChildren);
						}
					}
					this.styleSkuList = styleSkyAttrData;

				},

				/*下一步*/
				go_to_next() {

					/*判断是否选择了戒臂*/
					if(!this.suit.Id) {
						this.bombox.tomast({
							msg: '请选择花头',
							type: 'warning'
						});
						return;
					}
					if(!this.recommendStyle.Id) {
						this.bombox.tomast({
							msg: '请选择戒臂',
							type: 'warning'
						});
						return;
					}
				}		
			}
		}
		
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';
	.bride-inner {
		margin-bottom: 25px;
		padding: 25px;
		background-color: #fff;
		height: 100%;
	}
	.bride-inner .zuo{
		float: left;
		width: 50%;
		height: 100%;
	}
	.bride-inner .huatou{
		width: 100%;
		height: 50%;
		display: inline-block;
		
	}
	.bride-inner .jiebi{
		width: 100%;
		height:50%;
		display: inline-block;
	}
	.bride .xiaoguo{
		width: 50%;
		height: 90%;
		float: right;
		
	}
	.bride .xiaoguo .insert-wrap{
		height: 80%;
		ul{
			height: 100%;
			li{
				height: 100%;
				border:none
			}
		}
	}
	.button{
		width: 50%;
		height: 3rem;
		margin: 0 auto;
		background: #C1996A;
		border-radius: 30px;
	}
	.Nextstep{
		display: block;
		width: 30%;
		font-size: 24px;
		font-family: MicrosoftJhengHeiRegular;
		color: #FFFFFF;
		margin: 0 auto;
		line-height:3rem;
	}
	.bride-inner> section:last-of-type {
		margin-bottom: 0;
	}
	
	section> h4 {
		position: relative;
		margin-top: 0;
		padding-left: 20px;
	}
	
	section> h4:after {
		content: "";
		position: absolute;
		left: 0;
		height: 100%;
		width: 10px;
		background-color: #dfb077;
	}
	
	.bride {
		position: absolute;
		top: 57px;
		bottom: 0px;
		left: 0;
		width: 100%;
		background-color: #f5f5f5;
	}
	
	.bride-inner {
		position: absolute;
		top: 0;
		width: 100%;
		bottom: 60px;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
		padding-bottom: 0;
	}
	
	.insert-wrap {
		overflow-x: auto;
		white-space: nowrap;
		height: 100%;
		width: 100%;
		li {
			.imgbox {
				line-height: 200px;
				img {
					vertical-align: middle;
				}
			}
		}
		.scroll-list{
			height: 100%;
			width: 100%;
		}
	}
	
	.arm:nth-child(1) {
		transition-delay: 0.4s;
	}
	
	.arm:nth-child(2) {
		transition-delay: 0.8s;
	}
	
	.arm:nth-child(3) {
		transition-delay: 1.2s;
	}
	
	.arm:nth-child(4) {
		transition-delay: 1.6s;
	}
	
	.arm:nth-child(5) {
		transition-delay: 2s;
	}
	
	.insert-wrap li {
		display: inline-block;
		width: 80%;
		height: 80%;
		overflow: hidden;
		text-align: center;
		box-shadow: 0 6px 8px -3px rgba(0, 0, 0, 0.1);

		.imgbox {
		width: 100%;
		height: 200px;
		padding: 5px;
		box-sizing: border-box;
		}
	}
	.insert-wrap li {
		opacity: 0.5;
		width: 50%;
		height: 100%;
    }
	.insert-wrap li.active {
		transform: scale(1);
        opacity: 1;
		width: 70%;
		height: 100%;
	}
	.insert-wrap li.one {
		border-color: none;
	}
	.insert-wrap li img {
		width: auto;
		max-width: 100%;
		max-height: 200px;
	}
	
	.insert-wrap li p {
		line-height: 50px;
		font-size: 18px;
	}
	
	.insert-wrap li:nth-child(even) {
		margin: 0 15px;
	}
	
	.property {
		font-weight: 900;
	}
	
	.bride .plans-property:after,
	.parameter-wrapper:after {
		content: "";
		clear: both;
		display: block;
	}
	
	.bride .plans-property> .list {
		float: left;
		width: 50%;
		padding-right: 20px;
	}
	
	@media (max-width: 480px) {
		.bride .plans-property> .list {
			width: 100%;
		}
	}
	.bride footer .info{
		visibility: hidden;
	}
	.bride .xiaoguo .insert-wrap ul li{
		width: 100%;
		
	}
	.bride .xiaoguo .insert-wrap ul li .imgbox{
		height: 80%;
		margin: 0 auto;
		img{
			display: inline;
			max-height:100% ;
			width: 100%;
		}
	}
	.xiaoguo .insert-wrap .scroll li{
		box-shadow:none !important;
	}
</style>