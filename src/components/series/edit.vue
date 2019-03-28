<template>
	<div class="seriesSettlement">
		<div class="back-header">
			<div class="header-container">
				<div class="back-btn" @click="goback">返回</div>
				<h1 class="head-text">套装系列结算</h1>
				<div class="rightTitle" @click="getEdit(true)">编辑</div>
			</div>
		</div>
		<div class="seriesSettlement_container">
			<div class="seriesSettlement_price">
				总价格：<span>￥{{salePrice.toFixed(2)|money}}</span>
			</div>
			<ul class="seriesSettlement_list">
				<li v-for="item in suitInfo.StyleList" :key="item.StyleId">
					<div :class="currentStyle[item.StyleId] ? 'seriesSettlement_editList' : 'seriesSettlement_editList_cancel'" v-show="showFlag" @click="changeActive(item)">
						<div :class="currentStyle[item.StyleId] ? 'seriesSettlement_editList_content' : 'seriesSettlement_editList_cancel_cancel'"></div>
					</div>
					<img :src="item.MainImage.indexOf('http')>-1?item.MainImage+config.listImgSize:http.imgUrl+item.MainImage+config.listImgSize" alt="">
					<div class="seriesSettlement-box">
						<div class="seriesSettlement_params">
							<div class="seriesSettlement_params_content" style="font-size:1.5rem;color:#999;">{{suitInfo.SuitName}} &nbsp; {{item.StyleName}} &nbsp; {{item.StyleNo}}</div>
						</div>
						<div class="seriesSettlement_params" v-if="item.GoldWeight">
							<div class="seriesSettlement_params_title">金重 ：</div>
							<div class="seriesSettlement_params_content">{{item.GoldWeight}}</div>
						</div>
						<div class="seriesSettlement_params" v-if="item.RingSize">
							<div class="seriesSettlement_params_title">尺寸</div>
							<select placeholder="点击选择" v-model="currentRingSize[item.StyleId]" @change="getPrice(item)">
									<option :value="item1.AttrValueName" v-for="(item1 , index1) in item.RingSize" :key="index1">
										{{item1.AttrValueName}}
									</option>
								</select>
						</div>
						<div class="seriesSettlement_params" v-if="item.Condition">
							<div class="seriesSettlement_params_title">成色</div>
							<select placeholder="点击选择" v-model="currentCondition[item.StyleId]" @change="getPrice(item)">
									<option :value="item1.AttrValueName" v-for="(item1 , index1) in item.Condition" :key="index1">
										{{item1.AttrValueName}}
									</option>
								</select>
						</div>
					</div>
					<div class="seriesSettlement-box" style="margin-top:6.03rem;">
						<div class="seriesSettlement_params" v-if="item.SetStoneType">
							<div class="seriesSettlement_params_title">镶石 ：</div>
							<div class="seriesSettlement_params_content">{{item.SetStoneType}}</div>
						</div>
						<div class="seriesSettlement_params" v-if="item.SetStoneQuantity">
							<div class="seriesSettlement_params_title">镶石粒数：</div>
							<div class="seriesSettlement_params_content">{{item.SetStoneQuantity}}</div>
						</div>
						<div class="seriesSettlement_params" v-if="item.SetWeight">
							<div class="seriesSettlement_params_title">镶石总重：</div>
							<div class="seriesSettlement_params_content">{{item.SetWeight}}</div>
						</div>
					</div>
					<div class="seriesSettlement_stone" v-if="item.IsSelectStone">
						<div class="seriesSettlement_params_btn" v-if="!currentStone[item.StyleId]" @click="gotoStone(item.StyleId)">选择配石</div>
						<ul class="cell_value" v-if="currentStone[item.StyleId]">
							<li v-if="currentStone[item.StyleId].Shape"><span>形状</span><em>{{currentStone[item.StyleId].Shape}}</em></li>
							<li v-if="currentStone[item.StyleId].CertificateType"><span>证书</span><em>{{currentStone[item.StyleId].CertificateType}}</em></li>
							<li v-if="currentStone[item.StyleId].Weight"><span>重量</span><em>{{currentStone[item.StyleId].Weight}}ct</em></li>
							<li v-if="currentStone[item.StyleId].Color"><span>颜色</span><em>{{currentStone[item.StyleId].Color}}</em></li>
							<li v-if="currentStone[item.StyleId].Cleanliness"><span>净度</span><em>{{currentStone[item.StyleId].Cleanliness}}</em></li>
							<li v-if="currentStone[item.StyleId].Cut"><span>切工</span><em>{{currentStone[item.StyleId].Cut}}</em></li>
							<li><span>荧光</span><em>无</em></li>
							<li v-if="currentStone[item.StyleId].SalesPrice" style="border-right: 1px solid #e5e5e5;"><span>价格</span><em>{{(currentStone[item.StyleId].SalesPrice).toFixed(2) | money}}</em></li>
						</ul>
						<div class="seriesSettlement_params_newbtn" v-if="currentStone[item.StyleId]" @click="gotoStone(item.StyleId)">重新选石</div>
					</div>
				</li>
			</ul>
			<div class="seriesSettlement_special">
				<div class="seriesSettlement_special_title">特殊定制</div>
				<div class="seriesSettlement_special_container" :style="{opacity: lettering[0].opacity}">
					<div style="float:left;">
						<input v-model="lettering[0].isabled" type="checkbox" value="刻字定制" style="margin-left:-0.3rem;" class="client-radio" />
						<label for="" style="width:15%;margin-left:-2rem;" @click="lettering[0].isabled = !lettering[0].isabled">
							<span>刻字</span>
						</label>
						<div>
							<input maxlength="6" type="value" placeholder="输入刻字信息" v-model="lettering[0].word" style="width:11.25rem;height:4.38rem;margin-top:1.06rem;" :disabled="!lettering[0].isabled">
						</div>
					</div>
				</div>
			</div>
			<div class="seriesSettlement_shopCar">
				<div class="seriesSettlement_shopCar_btn" @click="buyNow('add')">加入购物车</div>
				<div class="seriesSettlement_shopCar_btn" @click="buyNow('buy')">立即购买</div>
			</div>
		</div>
		<shopMenu></shopMenu>
		<v-loading v-show="isloading"></v-loading>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
		<!-- 弹窗 -->
		<transition name="fadeShopping">
			<div class="alert_shopping" v-if="isShowSuccessful">
				<div class="shopping">
					<img src="../../assets/assetsFinal/shoppingSuccess.png" alt="">
					<p>成功放入购物车</p>
					<div class="subit">
						<router-link tag="div" to="/finalFashion/shoppingCar">前往购物车</router-link>
						<div @click="continueShpping()">继续购物</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="opacityLeave">
			<div class="mask" v-show="isShowSuccessful"></div>
		</transition>
	</div>
</template>

<script>
	import header from "./header";
	import upload from "components/upload/upload";
	import loading from "@/components/isLoading/isloading";
	import promptBox from "components/promptBox/promptBox";
	export default {
		data() {
			return {
				finishParams: {
					isStyleListFinshed: true,
					isDetailFinshed: true,
					isStoneFinshed: true,
					isMessage: true,
					isShow: true,
					footerWord: {
						firstStep: "款式列表",
						secondStep: "款式详情",
						thirdStep: "配石",
						fourStep: "确认信息"
					}
				},
				header: {
					title: "套装系列结算",
					isShow: true,
					showRight: "编辑",
					return: {}
				},
				isNext: true,
				isLast: false,
				isSelectHand: true,
				isSelect: true,
				isShow: false,
				firstPrice: false, //是否显示“起”
				settleData: {},
				mainImg: "",
				selectSizeHand: "",
				tableList: {},
				styleObj: this.$store.state.relate.fashioinObj,
				ImgUrl: "",
				isloading: false,
				lettering: "",
				params: {
					ProType: 1,
					SkuId: "",
					Quantity: 1,
					Specification: "",
					Lettering: "",
					Stones: []
				},
				formData: {},
				showFlag: false, //是否编辑
				selectColor: false, //是否要选色
				selectColorArr: [],
				skuFlag: false,
				oldSkuId: [], //存储旧SKUID
				firstSetPrice: 0, //存储旧总价钱
				writeMessage: "",
				fontMessage: false,
				additional: {
					ImgUrl: ""
				},
				editMale: {},
				ispromptBox: false,
				msg: {
					//提示框信息
					text: "",
					time: "",
					show: false
				},
				suitInfo: {}, //套装信息
				currentStyle: {}, //已选的款
				currentStylePrice: {}, //款式价格
				currentRingSize: {}, //已选的手寸
				currentStone: {}, //已选的石头
				currentCondition: {}, //已选的成色
				suitPrice: 0,
				lettering: [
					//刻字、指纹
					{
						isabled: true,
						word: "",
						imgUrl: "",
						opacity: 1
					},
					{
						isabled: true,
						word: "",
						imgUrl: "",
						opacity: 1
					}
				],
				isShowSuccessful: false
			};
		},
		computed: {
			salePrice() {
				let price = 0;
				let stonePrice = 0;
				let selectedStyleCount = 0,
					isAllStyleSelected = true;
				for (let key in this.currentStyle) {
					if (this.currentStyle[key]) {
						selectedStyleCount++;
					}
				}
				if (this.suitInfo.StyleList) {
					if (this.suitInfo.StyleList.length > selectedStyleCount) {
						isAllStyleSelected = false;
					}
				}
				for (let key in this.currentStone) {
					let stone = this.currentStone[key];
					if (this.currentStyle[key]) {
						stonePrice += stone.SalesPrice;
					}
				}
				//this.suitPrice可能是套装折扣价，所以分开计算
				if (isAllStyleSelected) {
					price = this.suitPrice + stonePrice;
				} else {
					let selectedPrice = 0;
					for (let key in this.currentStylePrice) {
						let style = this.currentStylePrice[key];
						if (this.currentStyle[key]) {
							selectedPrice += style.price;
						}
					}
					price = selectedPrice + stonePrice;
				}
				price = Number(price.toFixed(2));
				return price;
			}
		},
		methods: {
			goback(){
				let route = {
					name: this.header.return.name,
					params:this.header.return.params,
					query: this.header.return.query
				}
				this.$router.replace(route)
			},
			set_Img(src) {
				this.lettering[0].imgUrl = src.url;
			},
			set_Img2(src) {
				this.lettering[1].imgUrl = src.url;
			},
			continueShpping() {
				this.$router.push({
					name: "home"
				});
			},
			buyNow(str) {
				let styleList = [],
					isValidateFail = false,
					ProType = "2",
					styleListForBuy = [],
					unitPriceList = [];
				let styleCount = 0;
				for (let styleId in this.currentStyle) {
					if (this.currentStyle[styleId]) {
						styleCount++;
					}
				}
				if (styleCount == 0) {
					this.ispromptBox = true;
					this.$nextTick(() => {
						this.msg.text = "至少选择一款";
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
				this.suitInfo.StyleList.some(item => {
					let RingPrice =
						this.currentStylePrice &&
						this.currentStylePrice[item.StyleId] &&
						this.currentStylePrice[item.StyleId].price,
						StonePrice = 0,
						MainStoneQty = 0,
						ViceStoneQty = 0,
						stoneDataItem = {};
					if (this.currentStyle[item.StyleId]) {
						let stoneList = [];
						if (item.IsSelectStone) {
							if (this.currentStone[item.StyleId] == null) {
								this.ispromptBox = true;
								this.$nextTick(() => {
									this.msg.text = "请挑选配石";
								});
								setTimeout(() => {
									this.msg.time = 500;
								}, 1000);
								setTimeout(() => {
									this.ispromptBox = false;
									this.msg.time = null;
									this.msg.text = null;
								}, 1500);
								isValidateFail = true;
								return true;
							} else {
								let stone = this.currentStone[item.StyleId];
								StonePrice = stone.SalesPrice || 0;
								MainStoneQty = 1;
								let stoneItem = {
									StoneId: stone.Id,
									StoneType: "0",
									StoneCategory: "钻石",
									Shape: stone.Shape,
									Color: stone.Color,
									Clarity: stone.Cleanliness,
									Cut: stone.Cut,
									Weight: stone.Weight,
									UnitPrice: stone.SalesPrice,
									Quantity: 1,
									TotalPrice: stone.SalesPrice
								};
								stoneList.push(stoneItem)
								stoneDataItem = {
									StoneId: stone.Id,
									StoneType: "0",
									Category: "钻石",
									Shape: stone.Shape,
									Color: stone.Color,
									Clarity: stone.Cleanliness,
									Cut: stone.Cut,
									Weight: stone.Weight,
									UnitPrice: stone.SalesPrice,
									Quantity: 1,
									TotalPrice: stone.SalesPrice
								}
							}
						}
						stoneDataItem.StoneCategory = item.SetStoneType
						stoneDataItem.StoneWeight = item.SetWeight && item.SetWeight.replace(/ct/g, '')
						stoneDataItem.StoneQuantity = item.SetStoneQuantity
						//辅石
						if (item.SetStoneType && item.SetStoneQuantity && item.SetWeight) {
							let nameList = item.SetStoneType.split("/"),
								qtyList = item.SetStoneQuantity.split("/"),
								weightList = item.SetWeight.split("/");
							nameList.some((name, index) => {
								let qty = qtyList[index],
									weight = weightList[index];
								if (typeof weight != "number") {
									index = weight.indexOf("ct");
									weight = Number(weight.substring(0, index));
									//重量必须是数字
								}
								if (qty && weight) {
									stoneList.push({
										StoneId: "",
										StoneType: "1",
										StoneCategory: name,
										Shape: "",
										Color: "",
										Clarity: "",
										Cut: "",
										Weight: weight,
										UnitPrice: 0,
										Quantity: qty,
										TotalPrice: 0
									});
									ViceStoneQty += Number(qty)
								} else {
									return true;
								}
							});
						}
						//刻字
						let lettering = this.lettering[0];
						if (
							lettering.isabled &&
							(lettering.word == "" || lettering.word == null)
						) {
							this.ispromptBox = true;
							this.$nextTick(() => {
								this.msg.text = "请输入刻字";
							});
							setTimeout(() => {
								this.msg.time = 500;
							}, 1000);
							setTimeout(() => {
								this.ispromptBox = false;
								this.msg.time = null;
								this.msg.text = null;
							}, 1500);
							isValidateFail = true;
							return true;
						}
						let obj = {
							StyleId: item.StyleId,
							SkuId: this.currentStylePrice[item.StyleId].skuId,
							Sort: "",
							Specification: this.currentRingSize[item.StyleId],
							Lettering: lettering.word,
							Stones: stoneList,
							RingPrice,
							StonePrice,
							MainStoneQty,
							ViceStoneQty
						},
						objForBuy = {
							StyleId: item.StyleId,
							SkuId: this.currentStylePrice[item.StyleId].skuId,
							Sort: "",
							Quantity: 1,
							IsNeedStone: item.IsSelectStone?1:0,
							Specification: this.currentRingSize[item.StyleId],
							Lettering: lettering.word,
							Stones: stoneList,
							RingPrice,
							StonePrice,
							MainStoneQty,
							ViceStoneQty,
							stoneDataItem
						}
						objForBuy.StyleNo = item.StyleNo
						objForBuy.Category = item.CategoryName
						objForBuy.StyleName = item.StyleName
						objForBuy.MainImage = item.MainImage  
						if (styleCount < this.suitInfo.StyleList.length) {
							//非全选
							obj = {
								ProType: item.IsSelectStone ? '1' : '4', //1时尚定制单品、2套系、3来图 、4轻奢定制
								SkuId: this.currentStylePrice[item.StyleId].skuId,
								Quantity: 1,
								Specification: this.currentRingSize[item.StyleId],
								Lettering: lettering.word,
								Stones: stoneList
							}
							objForBuy.ProType = obj.ProType
							objForBuy.Quantity = 1
							ProType = obj.ProType
						}

						styleList.push(obj)
		  				styleListForBuy.push(objForBuy)
					}
				});
				if (isValidateFail) {
					return;
				}
				let that = this;
				let options = {
					url: "/Order_Api_CustomizeCart_AddCartCustomizeSet",
					params: {
						StyleId: this.suitInfo.Id,
						Quantity: 1,
						UnitPrice: this.salePrice,
						TotalPrice: this.salePrice,
						SetItems: styleList
					}
				};
				if (styleCount < this.suitInfo.StyleList.length) {
					//非全选
					options = {
						url: "/Order_Api_CustomizeCart_AddCartCustomizeSingleBatch",
						params: {
							Lists: styleList
						}
					};
				}
				let cbok = res => {
					this.isloading = false;
					let data = res.data.data;
					if (data) {
						successful(data.message || "添加成功");
					} else {
						this.tips(res.message || "参数错误");
					}
				};
				let cbnull = res => {
					this.isloading = false;
				};
				let cbno = res => {
					this.isloading = false;
				};
				if(str == 'add'){
					this.isloading = true
					this.http.post(options, cbok, cbno, cbnull)
				}else{
					let selectedGoods = []
				if(ProType == '1' || ProType == '4'){
					let pro = styleListForBuy[0]
					
						styleListForBuy.forEach(pro =>{
							let {MainImg, StyleId, StyleName, StyleNo, SkuId, Quantity, IsNeedStone, Specification,
								Lettering, MainStoneQty, ViceStoneQty, RingPrice, StonePrice, Stones, stoneDataItem } = pro,
								UnitPrice = RingPrice + StonePrice,
								TotalPrice = UnitPrice
							stoneDataItem.handSize = Specification
							stoneDataItem.Lettering = Lettering
							stoneDataItem.finness = this.currentCondition[StyleId]
							let selectedGood = {
									ProType, MainImg, StyleId, StyleName, StyleNo, SkuId,
									Quantity, UnitPrice, TotalPrice, IsNeedStone, Specification,
									Lettering, MainStoneQty, ViceStoneQty, RingPrice, StonePrice, Weight: 0,
									SetItems: [],Images: [], Atts: [], ProCategory: null, ProCategoryName: null,
									Stones, stoneData: [stoneDataItem]
								}
							selectedGoods.push(selectedGood)
						})
						this.$store.commit('SET_SELECTGOOD', selectedGoods)
					}else if(ProType == '2'){
						let {StyleId, Quantity, TotalPrice, UnitPrice} = options.params,
							SetItems = [],
							stoneData = [],
							ClassName = this.suitInfo.SuitName,
							MainImg = this.mainImg
						styleList.forEach(item => {
							let {MainStoneQty, ViceStoneQty, RingPrice, StonePrice, Lettering} = item
							let stoneDataItem = {}
							stoneDataItem.finness = this.currentCondition[item.StyleId]
							stoneDataItem.Lettering = Lettering
							stoneDataItem.handSize = item.Specification
							stoneDataItem.RingPrice = RingPrice
							stoneDataItem.StonePrice = StonePrice
							stoneDataItem.couplePrice = RingPrice + StonePrice;
							(this.suitInfo.StyleList || []).forEach(style => {
								if(style.StyleId == item.StyleId){
									stoneDataItem.StoneCategory = style.SetStoneType
									stoneDataItem.StoneWeight = style.SetWeight
									stoneDataItem.StoneQuantity = style.SetStoneQuantity
									stoneDataItem.Insert = style.AutoInlaySize
								}
							});
							let stone = this.currentStone[item.StyleId]
							if(stone){
								for(let key in stone){
									if(key != 'Id' && key != 'SalesPrice'){
										stoneDataItem[key] = stone[key]
									}
								}
							}
							stoneData.push(stoneDataItem)
						})
						let selectedGood = {
							ProType, MainImg, StyleId, UnitPrice, TotalPrice, Weight: 0, Images: [], Atts: [], ProCategory: null, ProCategoryName: null,
							stoneData, SetItems: styleList
						}
						this.$store.commit('SET_SELECTGOOD', [selectedGood])
					}
					let params = this.$route.params,
						query = this.$route.query
					query.name = this.$route.name
					this.$router.push({
						name: 'finalFashionMessageNew',
						params,
						query
					})
				}
				
				function successful(message) {
					if (str == "add") {
						that.isShowSuccessful = true;
					} else if (str == "buy") {
						that.$router.push({
							name: "finalFashionShoppingCar"
						});
					}
				}
			},
			getEdit(evtValue) {
				//evtValue 是子组件传过来的值
				if (evtValue == true) {
					this.setActive();
				}
			},
			setActive() {
				this.showFlag = true;
			},
			changeActive(style) {
				this.currentStyle[style.StyleId] = !this.currentStyle[style.StyleId];
				let isSelected = false;
				for (let styleId in this.currentStyle) {
					if (this.currentStyle[styleId]) {
						isSelected = true;
					}
				}
				if (isSelected) {
					this.lettering[0].opacity = 1;
				} else {
					this.lettering[0].opacity = 0.2;
				}
			},
			getPrice() {
				let selectedStyleCount = 0,
					isAllStyleSelected = true;
				for (let key in this.currentStyle) {
					if (this.currentStyle[key]) {
						selectedStyleCount++;
					}
				}
				if (this.suitInfo.StyleList.length > selectedStyleCount) {
					isAllStyleSelected = false;
				}
				let styleParamList = [];
				for (let key in this.currentStyle) {
					let obj = {
						StyleId: key,
						RingSize: this.currentRingSize[key],
						Rabbet:
							(this.currentStone[key] && this.currentStone[key].Weight) || "",
						Condition: this.currentCondition[key]
					};
					styleParamList.push(obj);
				}
				let that = this;
				let options = {
					url: "/purchase_Api_SuitCustomize_GetSuitCalculatePrice",
					params: {
						SuitId: this.suitInfo.Id,
						StyleList: styleParamList
					}
				};
				let cbok = res => {
					this.isloading = false;
					let data = res.data.data;
					if (data) {
						that.suitPrice = data.SuitPrice;
						that.currentStylePrice = {};
						data.StyleList.forEach(item => {
							that.$set(that.currentStylePrice, item.StyleId, {
								skuId: item.SkuId,
								price: item.SalePrice
							});
						});
					}
				};
				let cbnull = res => {
					this.isloading = false;
				};
				let cbno = res => {
					this.isloading = false;
				};
				this.isloading = true;
				this.http.post(options, cbok, cbno, cbnull);
			},
			gotoStone(styleId) {
				let query = this.$route.query
				query.name = this.$route.name
				this.$router.push({
					name: "seriesStone",
					params: {
						id: styleId,
						suitId: this.$route.params.id,
						currentStyle: this.currentStyle,
						currentRingSize: this.currentRingSize,
						currentCondition: this.currentCondition,
						currentStone: this.currentStone,
						lettering: this.lettering,
						showFlag: this.showFlag,
						stone: this.$route.params.stone
					},
					query
				});
				//赋值款式的主石形状
				this.$store.commit("SET_SHAPE", "");
			},
			getInit() {
				let that = this;
				this.isloading = true;
				let options = {
					url: "/purchase_Api_SuitCustomize_GetSeries",
					params: {
						suitId: this.$route.params.id
					}
				};
				let cbok = res => {
					this.isloading = false;
					let data = res.data.data;
					if (data) {
						this.suitInfo = data;
						this.suitInfo.StyleList.forEach(item => {
							this.$set(
								this.currentStyle,
								item.StyleId,
								this.currentStyle[item.StyleId] == null ?
								true :
								this.currentStyle[item.StyleId]
							);
							if (!this.currentRingSize[item.StyleId]) {
								if (item.RingSize.length) {
									this.currentRingSize[item.StyleId] =
										item.RingSize[0].AttrValueName;
								} else {
									this.currentRingSize[item.StyleId] = 0;
								}
							}
							if (!this.currentCondition[item.StyleId]) {
								if (item.Condition.length) {
									this.currentCondition[item.StyleId] =
										item.Condition[0].AttrValueName;
								} else {
									this.currentCondition[item.StyleId] = "";
								}
							}
						});
						this.getPrice();
						//选中任意一款就显示刻字
						let isSelected = false;
						for (let styleId in this.currentStyle) {
							if (this.currentStyle[styleId]) {
								isSelected = true;
							}
						}
						if (isSelected) {
							this.lettering[0].opacity = 1;
						} else {
							this.lettering[0].opacity = 0.2;
						}
					}
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
		created() {
			window.vm = this;
			if (this.$route.params.stone && this.$route.params.styleId) {
				this.currentStyle = this.$route.params.currentStyle;
				this.currentRingSize = this.$route.params.currentRingSize;
				this.currentCondition = this.$route.params.currentCondition;
				this.currentStone = this.$route.params.currentStone;
				this.lettering = this.$route.params.lettering;
				this.showFlag = this.$route.params.showFlag;
				this.currentStone[this.$route.params.styleId] = this.$route.params.stone;
			}else{
				if(this.$route.params && this.$route.params.currentStone){
					let currentStone = this.$route.params.currentStone; //路由过来的款配石
					Object.keys(currentStone).forEach(styleId =>{
						if(styleId == this.$route.params.styleId){
							if(!this.currentStone[styleId]){
								this.currentStone[styleId] = currentStone[styleId];
							}
						}else{
							this.currentStone[styleId] = currentStone[styleId];
						}
					})
				}
			}
			this.getInit();
			this.header.return = {
				name: 'seriesDetail',
				params: this.$route.params,
				query: this.$route.query
			}
		},
		components: {
			"v-header": header,
			"v-upload": upload,
			"v-loading": loading,
			promptBox: promptBox
		}
	};
</script>

<style lang="scss">
	#app {
		height: 100%;
		width: 100%;
	}
	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		z-index: 15;
		&.active {
			display: block;
		}
	}
	.seriesSettlement {
		background: #f8f8f8;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		z-index: 9;
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
			.rightTitle{
                position: absolute;
				right: 3.75rem;
				bottom: 0;
				height: 3.75rem;
				line-height: 3.75rem;
				font-size: 1.75rem;
				letter-spacing: -0.71px;
			}
		}
		.alert_shopping {
			width: 45rem; // height: 34.63rem;
			background: #ffffff;
			position: absolute;
			left: 50%;
			top: 45%;
			transform: translate(-50%, -50%);
			z-index: 99;
			padding-top: 2.5rem;
			border-radius: 0.625rem; // animation: shoppingCar 0.5s ease;
			// animation-fill-mode: forwards;
			.shopping {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			img {
				width: 19.56rem;
				height: 19.56rem;
			}
			p {
				color: #333333;
				font-size: 1.88rem;
				text-align: center;
				padding-bottom: 3.75rem;
				line-height: 2.63rem;
			}
			.subit {
				width: 100%;
				display: flex;
				border-top: 1px solid #e5e5e5;
				height: 6.13rem;
				div {
					flex: 1;
					color: #333333;
					font-size: 1.88rem;
					opacity: 0.8;
					text-align: center;
					height: 6.13rem;
					line-height: 6.13rem;
					&:first-child {
						border-right: 1px solid #e5e5e5;
					}
				}
			}
		}
		input[type="checkbox"] {
			-webkit-appearance: radio;
			z-index: 10;
			opacity: 0;
		}
		input[type="checkbox"]+label {
			position: relative;
			margin-left: 1.2rem;
			font-size: 1.88rem;
			color: #999;
		}
		input[type="checkbox"]+label::before {
			content: "\a0";
			/*不换行空格*/
			display: inline-block;
			vertical-align: middle;
			position: absolute;
			top: 0;
			left: -3rem;
			width: 1.8rem;
			height: 1.8rem;
			border-radius: 50%;
			border: 1px solid #999;
			text-indent: 0.15em;
			line-height: 1;
		}
		input[type="checkbox"]:checked+label::before {
			border: 1px solid #ff7b7b;
			background-color: #ff7b7b;
			background-clip: content-box;
			width: 1.1rem;
			height: 1.1rem;
			padding: 0.2em;
		}
		.seriesSettlement_container {
			width: 100%;
			height: 100%;
			background-color: #f5f5f5;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
			overflow: scroll;
			padding: 6.25rem 1.88rem 0 1.88rem;
			.seriesSettlement_color {
				display: flex;
				align-items: center;
				background-color: #fff;
				padding: 2.06rem 1.25rem;
				overflow: hidden;
				border-bottom: solid 1px #e5e5e5;
				.seriesSettlement_color_title {
					float: left;
					width: 9.5rem;
					font-size: 1.88rem;
					color: #999;
				}
				.seriesSettlement_color_active,
				.seriesSettlement_color_noactive {
					padding: 0.8rem 0.88rem;
					color: #ff7b7b;
					font-size: 1.88rem;
					background-color: #fff;
					float: left;
					margin-right: 3.63rem;
					border: 1px solid #e5e5e5;
				}
				.seriesSettlement_color_active {
					color: #fff;
					background-color: #ff7b7b;
				}
			}
			.seriesSettlement_price {
				background-color: #fff;
				padding-left: 1.25rem;
				color: #333;
				font-size: 1.5rem;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				align-items: center;
				span {
					font-size: 3rem;
					color: #ff7b7b;
				}
			}
			ul {
				width: 100%;
				li {
					position: relative;
					background-color: #fff;
					padding: 0 6.2rem;
					padding-left: 24.2rem;
					overflow: hidden;
					margin-bottom: 1.25rem;
					padding-bottom: 1.25rem;
					img {
						position: absolute;
						left: 4.88rem;
						top: 0;
						bottom: 0;
						margin: auto;
						width: 16.81rem;
						height: 16.81rem;
					}
					.seriesSettlement_editList,
					.seriesSettlement_editList_cancel {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 1.44rem;
						margin: auto;
						width: 2rem;
						height: 2rem;
						border: solid 1px #ff7b7b;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 100%;
						.seriesSettlement_editList_content,
						.seriesSettlement_editList_cancel_content {
							width: 1.63rem;
							height: 1.63rem;
							background-color: #ff7b7b;
							border-radius: 100%;
						}
					}
					.seriesSettlement_editList_cancel {
						border: solid 1px #999;
						.seriesSettlement_editList_cancel_content {
							background-color: #999;
						}
					}
					.seriesSettlement_name {
						margin-top: 1.25rem;
						margin-bottom: 1.38rem;
						.male {
							font-size: 2.25rem;
							color: #333;
							margin-right: 1.25rem;
						}
						.title {
							font-size: 1.5rem;
							color: #999;
							margin-right: 1.25rem;
						}
					}
					.seriesSettlement-box {
						width: 50%;
						overflow: hidden;
						float: left;
						.seriesSettlement_params {
							height: 4.38rem;
							display: flex;
							align-items: center;
							margin-top: 1.75rem;
							.seriesSettlement_params_title {
								float: left;
								width: 9.5rem;
								font-size: 1.88rem;
								color: #999;
							}
							.seriesSettlement_params_color {
								padding: 0.8rem 0.88rem;
								color: #fff;
								font-size: 1.88rem;
								background-color: #ff7b7b;
								float: left;
							}
							.seriesSettlement_params_content {
								font-size: 1.88rem;
								color: #333;
								float: left;
								line-height: 2rem;
							}
							select {
								width: 11.25rem;
								height: 4.38rem;
								color: #333;
								font-size: 1.5rem;
							}
						}
					}
					.seriesSettlement_stone {
						display: inline-block;
						width: 100%;
						margin-top: 1.75rem;
						ul {
							li {
								width: 10.75rem;
								display: flex;
								flex-direction: column;
								padding: 0;
								float: left;
								font-size: 1.5rem;
								span {
									height: 5.5rem;
									width: 10.75rem;
									border: 1px solid #e5e5e5;
									text-align: center;
									line-height: 5.5rem;
									margin-right: 0;
									opacity: 1;
								}
								em {
									width: 10.75rem;
									height: 5.5rem;
									text-align: center;
									line-height: 5.5rem;
									border: 1px solid #e5e5e5;
								}
							}
						}
						.seriesSettlement_params_title {
							float: left;
							width: 9.5rem;
							font-size: 1.88rem;
							color: #999;
						}
						.seriesSettlement_params_btn,
						.seriesSettlement_params_newbtn {
							width: 11.25rem;
							height: 4.38rem;
							font-size: 1.5rem;
							color: #333;
							border: solid 1px #e5e5e5;
							text-align: center;
							line-height: 4.38rem;
							position: absolute;
							right: 5.13rem;
							top: 13.2rem;
						}
					}
				}
			}
			.seriesSettlement_special {
				width: 100%;
				overflow: hidden;
				background-color: #fff;
				padding: 0 3.5rem;
				position: relative;
				width: 100%;
				padding-bottom: 1.2rem;
				.seriesSettlement_special_title {
					height: 4.56rem;
					color: #333;
					font-size: 2.25rem;
					line-height: 4.56rem;
					position: relative;
					.upload-control {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						overflow: hidden;
					}
				}
				.seriesSettlement_special_container {
					float: left;
					width: 30%;
					margin-left: 2rem;
				}
				.seriesSettlement_special_male {
					font-size: 1.88rem;
					color: #333;
					margin-bottom: 1.25rem;
				}
				.seriesSettlement_special_finger {
					float: left;
					margin-left: 5rem;
					position: relative;
					width: 12rem;
					font-size: 1.88rem;
					color: #999;
					input {
						width: 11.25rem;
						height: 5.28rem;
						margin-top: 1.06rem;
						font-size: 1.5rem;
					}
				}
				.seriesSettlement_special_title:before {
					content: "";
					width: 1rem;
					height: 2.25rem;
					background-color: #f760be;
					position: absolute;
					top: 1.1rem;
					left: -2.25rem;
				}
			}
		}
		.seriesSettlement_shopCar {
			width: 100%;
			overflow: hidden;
			padding-top: 1.38rem;
			display: flex;
			justify-content: center;
			margin-bottom: 6rem;
			.seriesSettlement_shopCar_btn {
				width: 25rem;
				height: 5.5rem;
				background-color: #fff;
				font-size: 1.5rem;
				color: #ff7b7b;
				text-align: center;
				line-height: 5.5rem;
				border: solid 1px #ff7b7b;
				float: left;
				margin-right: 3.75rem;
				border-radius: 0.6rem;
			}
		}
		.fadeShopping-enter-active,
		.fadeShopping-leave-active {
			//购物车购买成功的弹窗
			transition: all 0.5s ease;
		}
		.fadeShopping-enter,
		.fadeShopping-leave-active {
			top: 80%;
			opacity: 0;
		}
	}
</style>
