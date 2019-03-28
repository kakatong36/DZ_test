<template>
<div class="BrideContainer" ref="BrideBox">
	<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
	<div class="back-header" v-show="hideTitle">
		<div class="header-container">
			<div class="back-btn" @click="goback">返回</div>
			<h1 class="head-text">{{title}}</h1>
		</div>
	</div>
	<div class="fixedBox">
		<div class="fixedParents">
			<div class="cus-inner attribute" ref="cusInner">
				<div class="right attrMain">
					<div class="imgs">
						<ul ref="detailImgArr">
							<li v-for="(item, index) in detailList.ImageList" :key="item.Id" :class="{active: currentRightLi == index}">
								<a class="img">
                                        <img :src="item.ImageCode.indexOf('http')>-1?item.ImageCode+config.defaultImgSize:http.imgUrl+item.ImageCode+config.defaultImgSize" :alt="rightInfo.GroupName" v-if="item.ImageCode">
                                        <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                                        <p>{{rightInfo.GroupName}}</p>
                                    </a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="price" ref="priceList">
				<div class="mixPrice">
					<span>￥{{skuPrice.salePrice.toFixed(2)|money}}</span>
					<div>戒托价格</div>
				</div>
				<div class="symbol">
					+
				</div>
				<div class="mixPrice">
					<span>￥{{skuPrice.stonePrice.toFixed(2)|money}}</span>
					<div>配石价格</div>
				</div>
				<div class="symbol">
					=
				</div>
				<div class="mixPrice">
					<span>￥{{allPrice.toFixed(2)|money}}</span>
					<div>总价格</div>
				</div>
				<span class="explain" style="display: none">*此价格为预估价格</span>
			</div>

			<div class="suitProto">
				<span> ( 辅石类别：{{suitProto.suitType}}</span>
				<span v-if="suitProto.suitType != '无'"> | 辅石粒数：{{suitProto.suitNum}} </span>
				<span v-if="suitProto.suitType != '无'"> | 辅石总重：{{suitProto.suitWeight}} )</span>
				<span v-if="suitProto.suitType == '无'"> )</span>
			</div>

			<div class="line mainPage"></div>
			<div class="flex_row">
				<div class="attrList" ref="attrLists">
					<div class="list-wrap">
						<div class="attrs">
							<div class="attrs-title">
								戒托参数
							</div>
							<ul class="conditionList">
								<li class="conditionList-li" @click="activeShow = true">
									<span class="value" @click="selectActive('condition')">{{conditionItem.condition}}</span>
									<span class="name" @click="selectActive('condition')">成色</span>
									<div class="valueList" :class="{active: conditionActive.condition && activeShow == true}">
										<div class="arrow"></div>
										<ol class="valueInner">
											<li v-for="item in detailList.ConditionList" :key="item.Id" @click="selectCondition(item,'condition')"><span>{{item}}</span></li>
										</ol>
									</div>
								</li>

								<li class="conditionList-li" @click="activeShow = true">
									<span class="value" @click="selectActive('size')">{{conditionItem.size}}</span>
									<span class="name" @click="selectActive('size')">尺寸</span>
									<div class="valueList" :class="{active: conditionActive.size && activeShow == true}">
										<div class="arrow"></div>
										<ol class="valueInner">
											<li v-for="item in detailList.RingSizeList" :key="item.Id" @click="selectCondition(item,'size')"><span>{{item}}</span></li>
										</ol>
									</div>
								</li>

								<li class="conditionList-li" @click="activeShow = true">
									<span class="value" @click="selectActive('rabbet')">{{conditionItem.rabbet}}ct</span>
									<span class="name" @click="selectActive('rabbet')">镶口</span>
									<div class="valueList" :class="{active: conditionActive.rabbet && activeShow == true}">
										<div class="arrow"></div>
										<ol class="valueInner">
											<li v-for="item in detailList.RabbetList" :key="item.Id" @click="selectCondition(item,'rabbet',true)"><span>{{item}}</span></li>
										</ol>
									</div>
								</li>

							</ul>

						</div>
					</div>

				</div>
				<div class="stoneList">
					<div class="stone-wrap">
						<div class="attrs">
							<div class="attrs-title">
								配石参数
								<span v-if="stoneItem.tableRow" @click="openSelectStone" style="float:right;font-size:1.5rem;color:#ff7b7b;line-height:4rem;">重新选石</span>
							</div>
							<ul class="conditionList" v-if="stoneItem.tableRow">
								<li class="conditionList-li">
									<span class="value" v-if="stoneItem.tableRow.Color">{{stoneItem.tableRow.Color}}</span>
									<span class="name">颜色</span>
								</li>

								<li class="conditionList-li">
									<span class="value" v-if="stoneItem.tableRow.Cleanliness">{{stoneItem.tableRow.Cleanliness}}</span>
									<span class="name">净度</span>
								</li>

								<li class="conditionList-li">
									<span class="value" v-if="stoneItem.tableRow.Cut">{{stoneItem.tableRow.Cut}}</span>
									<span class="name">切工</span>
								</li>

								<li class="conditionList-li">
									<span class="value" v-if="stoneItem.tableRow.Fluorescence">{{stoneItem.tableRow.Fluorescence}}</span>
									<span class="value" v-else>无</span>
									<span class="name">荧光</span>
								</li>
							</ul>

							<div class="stoneList-empty" @click="openSelectStone" v-else>
								选择配石
							</div>
						</div>
					</div>

				</div>
			</div>



			<myBrideList :message="requestList" ref="letter" class="myBride_Letter"></myBrideList>

			<div class="sure-btn-container">
				<div class="sure-btn" @click="goBuy('add')">加入购物车</div>
				<div class="sure-btn" @click="goBuy('buy')">立即购买</div>
			</div>

		</div>
	</div>
	<stoneList ref="stoneList" :stone="detailList.Rabbet" @finish="finishStone" @select="selectStone" v-if="showStone"></stoneList>
	<transition name="fadeShopping">
		<div class="alert_shopping" v-if="isShow">
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
		<div class="mask" v-show="isShow"></div>
	</transition>
	<v-loading v-show="isloading"></v-loading>
</div>
</template>

<script>
import myBrideList from "@/components/myBride/list";
import stoneList from "@/components/myBride/stone";
import promptBox from "@/components/promptBox/promptBox";
import loading from "@/components/isLoading/isloading";

export default {
	name: "myBrideDetail",
	data() {
		return {
			ispromptBox: false,
			isShow: false,
			isloading: false,
			msg: {
				text: "",
				time: "",
				show: false
			},
			hideTitle: true,
			flowerId: "",
			armId: "",
			showStone: false, //显示配石
			closeFlag: true,
			stonePrice: 0,
			goldPrice: 0,
			btnShow: true,
			currentRightLi: "",
			priceShow: true, //价钱显示
			formShow: false, //表单显示
			rightInfo: {
				ImagesList: []
			},
			Fineness: "",
			currentAttr: "",
			currentAttrVal: {},
			attrInfo: {
				attrList: []
			},
			MainImg: "",
			requestList: [], //请求数据数组
			attrList: [],
			activeShow: true,
			groupId: "",
			groupName: "",
			detailList: [], //所有数据
			conditionItem: {
				condition: "",
				rabber: "",
				size: ""
			}, //选项存储
			conditionActive: {
				condition: false,
				rabbet: false,
				size: false
			},
			skuPrice: {
				styleId: "",
				salePrice: 0,
				stonePrice: 0
			},
			stoneItem: {
				id: "",
				index: 0,
				tableRow: null
			},
			parets: {
				flowerId: "",
				armId: ""
			},
			paretsSku: {
				flowerSku: "",
				armSku: ""
			},
			suitProto: {},
			lastPage: '',
			header: {
				return: {
					name: 'myBride'
				}
			}

		};
	},
	computed: {
		title() {
			return this.$store.state.header.title;
		},
		allPrice() {
			return this.skuPrice.salePrice + this.skuPrice.stonePrice;
		}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			let id = vm.$route.params.id;
			vm.parets.flowerId = vm.$route.params.flowerId;
			vm.parets.armId = vm.$route.params.armId;
			vm.suitProto = vm.$route.params.proto;

			if (id) {
				vm.getDetail(id); //获取初始自由女神数据
			}
			let stoneItem = vm.$route.params.stoneItem
			if(stoneItem){
				vm.stoneItem = stoneItem
				vm.skuPrice.stonePrice = Number(vm.stoneItem.tableRow.SalesPrice);
			}
			let name = from.name,
				query = vm.$route.query
			if(name == 'finalFashionMessageNew'){
				name = query.lastPage || 'myBride'
			}else{
				name = from.name 
				query.lastPage = from.name
			}
			delete query.name
			vm.header.return.name = name
			vm.header.return.query = query
			vm.header.return.params = vm.$route.params
		})

	},
	created() {
		window.vm = this
	},

	mounted() {
		this.$store.state.header.title = "款式详情";
		let letter = this.$route.params.letter
		if(letter){
			this.$refs.letter.writeMessage = letter
			this.$refs.letter.fontMessage = true
		}
	},
	methods: {
		getDetail(id) {
			//获取自由女神详情
			this.isloading = true;
			const options = {
				url: "/Purchase_Api_SuitCustomize_GetFree",
				params: {
					suitId: id
				}
			};
			const cbok = res => {
				this.isloading = false;
				this.detailList = res.data.data;
				this.getInitVal(); //得到初始戒托参数
			};
			const cbno = res => {
				this.isloading = false;
			};
			const cbnull = res => {
				this.isloading = false;
			};
			this.http.get(options, cbok, cbno, cbnull);
		},
		finishStone() {
			this.showStone = false;
			this.hideTitle = true;
			this.$store.commit("SET_SHAPE", "");
		},

		selectStone(params) {
			//得到石头数据
			this.showStone = false;
			this.hideTitle = true;
			this.stoneItem = params;
			this.skuPrice.stonePrice = Number(this.stoneItem.tableRow.SalesPrice);
		},

		selectCondition(item, name, flag) {
			if (flag) {
				this.stoneItem = [];
				this.skuPrice.stonePrice = 0;
			}
			this.conditionItem[name] = item;
			this.conditionActive[name] = false;

			let id = this.detailList.Id,
				condition = this.conditionItem.condition,
				rabbet = this.conditionItem.rabbet,
				size = this.conditionItem.size;
			this.getSkuPrice(id, size, rabbet, condition);
			this.conditionActive[name] = false;
		},

		selectActive(name) {
			//修改active
			this.conditionActive.condition = false;
			this.conditionActive.size = false;
			this.conditionActive.rabbet = false;

			this.conditionActive[name] = true;
		},

		getInitVal() {
			let id = this.detailList.Id,
				condition = "",
				rabbet = "",
				size = "";
			if (this.detailList.ConditionList) {
				let val = this.detailList.ConditionList[0];
				condition = val;
				this.conditionItem.condition = val;
			}
			if (this.detailList.RabbetList) {
				let val = this.detailList.RabbetList[0];
				rabbet = val;
				this.conditionItem.rabbet = val;
			}
			if (this.detailList.RingSizeList) {
				let val = this.detailList.RingSizeList[0];
				size = val;
				this.conditionItem.size = val;
			}

			this.getSkuPrice(id, size, rabbet, condition);
		},

		getSkuPrice(id, size, rabbet, condition) {
			//获取新sku价格和id
			this.isloading = true;

			let StyleLi = [{
					StyleId: this.parets.flowerId,
					RingSize: "",
					Rabbet: rabbet,
					Condition: condition
				},
				{
					StyleId: this.parets.armId,
					RingSize: size,
					Rabbet: "",
					Condition: condition
				}
			];
			const options = {
				url: "/Purchase_Api_SuitCustomize_GetSuitCalculatePrice",
				params: {
					SuitId: id,
					StyleList: StyleLi
				}
			};
			const cbok = res => {
				//放置sku
				let data = res.data;
				this.isloading = false;
				this.skuPrice.salePrice = data.data.SuitPrice;
				this.skuPrice.styleId = data.data.SuitId;
				this.paretsSku.flowerSku = data.data.StyleList[0].SkuId;
				this.paretsSku.armSku = data.data.StyleList[1].SkuId;
			};
			const cbno = res => {
				this.isloading = false;
			};
			const cbnull = res => {
				this.isloading = false;
			};
			this.http.post(options, cbok, cbno, cbnull);
		},
		getBuyCar(type) {
			let stoneDataItem = {};
			if (!this.skuPrice.styleId) {
				this.tips("款号错误");
				return;
			} else if (!this.stoneItem.tableRow) {
				this.tips("请选择配石");
				return;
			} else if (!this.paretsSku.flowerSku || !this.paretsSku.armSku) {
				this.tips("参数有误");
				return;
			} else {
				let letter = this.$refs.letter.writeMessage;
				stoneDataItem.Lettering = letter;
				let formData = {
					StyleId: this.skuPrice.styleId,
					Quantity: 1,
					UnitPrice: this.skuPrice.salePrice,
					TotalPrice: this.skuPrice.salePrice + this.stoneItem.tableRow.SalesPrice,
					SetItems: [{
							//花头
							StyleId: this.parets.flowerId,
							SkuId: this.paretsSku.flowerSku,
							Sort: 1,
							Specification: this.conditionItem.size,
							Lettering: "",
							Stones: [{
								StoneId: this.stoneItem.tableRow.Id,
								StoneType: "0",
								StoneCategory: "钻石",
								Shape: this.stoneItem.tableRow.Shape,
								Color: this.stoneItem.tableRow.Color,
								Clarity: this.stoneItem.tableRow.Cleanliness,
								Cut: this.stoneItem.tableRow.Cut,
								Weight: this.stoneItem.tableRow.Weight,
								UnitPrice: this.stoneItem.tableRow.SalesPrice,
								Quantity: 1,
								TotalPrice: this.stoneItem.tableRow.SalesPrice * 1
							}]
						},
						{
							//戒臂
							StyleId: this.parets.armId,
							SkuId: this.paretsSku.armSku,
							Sort: 1,
							Specification: "",
							Lettering: letter,
							Stones: []
						}
					]
				};

				const options = {
					url: "/Order_Api_CustomizeCart_AddCartCustomizeSet",
					params: formData
				};
				const cbok = res => {
					//放置sku;
					if (type == "add") {
						this.isloading = false;
						let data = res.data;
						this.isShow = true;
					} else {
						this.$router.push({
							name: "finalFashionShoppingCar"
						});
					}
				};
				const cbno = res => {
					this.tips(data.message);
					this.isloading = false;
				};
				const cbnull = res => {
					this.tips(data.message);
					this.isloading = false;
				};
				if (type == "add") {
					this.isloading = true;
					this.http.post(options, cbok, cbno, cbnull);
				} else {
					//立即购买
					let {
						StyleId,
						Quantity,
						TotalPrice,
						UnitPrice
					} = formData,
					StonePrice = this.skuPrice.stonePrice,
					RingPrice = this.skuPrice.salePrice,
					ClassName = '自由女神',
					MainImg;
					(this.detailList.ImageList || []).forEach(img => {
						if (img.IsMain) {
							MainImg = img.ImageCode;
						}
					})
					stoneDataItem.RingPrice = RingPrice
					stoneDataItem.StonePrice = StonePrice
					stoneDataItem.TotalPrice = TotalPrice
					stoneDataItem.UnitPrice = UnitPrice
					stoneDataItem.couplePrice = RingPrice + StonePrice
					stoneDataItem.handSize = this.conditionItem.size
					stoneDataItem.finness = this.conditionItem.condition
					stoneDataItem.Insert = this.conditionItem.rabbet
					stoneDataItem.StoneCategory = this.suitProto.suitType
					this.suitProto.suitWeight = this.suitProto.suitWeight == '无' ? '' : this.suitProto.suitWeight
					stoneDataItem.StoneWeight = this.suitProto.suitWeight && this.suitProto.suitWeight.replace(/ct/g, '')
					stoneDataItem.StoneQuantity = this.suitProto.suitNum
					let stone = this.stoneItem.tableRow
					if(stone){
						for(let key in stone){
							if(key != 'Id' && key != 'SalesPrice'){
								stoneDataItem[key] = stone[key]
							}
						}
						stoneDataItem.StoneId = stone.Id
					}
					let selectedGood = {
						ProType: '2', MainImg, StyleId, UnitPrice, TotalPrice, Weight: 0, Images: [], Atts: [], ProCategory: null, ProCategoryName: null,
						stoneData: [stoneDataItem], SetItems: formData.SetItems, ClassName
					}
					this.$store.commit('SET_SELECTGOOD', [selectedGood])
					let params = this.$route.params
					params.stoneItem = this.stoneItem
					params.letter = letter
					let query = this.$route.query
					query.name = this.$route.name
					this.$router.push({
						name: 'finalFashionMessageNew',
						params,
						query
					})
				}
			}
		},
		goBuy(type) {
			if (type == "add") {
				this.getBuyCar(type);
			} else if (type == "buy") {
				this.getBuyCar(type);
			}
		},
		openSelectStone() {
			this.stoneItem = [];
			this.skuPrice.stonePrice = 0;
			this.showStone = true;
			this.hideTitle = false;
			//处理配石的形状赋值问题
			this.$store.commit("SET_SHAPE", "");
		},

		closeStone() {
			this.showStone = false;
			this.hideTitle = true;
		},

		continueShpping() {
			this.isShow = false;
			this.$router.push({
				name: "home"
			});
			//  window.location.reload()
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
		goback() {
			let {name, params, query} = this.header.return
			delete query.lastPage
			this.$router.replace({
				name,
				params,
				query
			})
		}
	},
	components: {
		myBrideList,
		stoneList,
		promptBox,
		"v-loading": loading
	}
};
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
		html,body {
			font-size: 8px !important;
		}
	}
	@media only screen and (min-device-width: 1025px) and (max-device-width: 1366px) and (orientation: landscape) {
		html,body {
			font-size: 11px !important;
		}
	}

#app {
	width: 100%;
	height: 100%;
}

.fadeOut-enter-active,
.fadeOut-leave-active {
	transition: opacity 0.5s;
}

.fadeOut-enter,
.fadeOut-leave-active {
	opacity: 0;
}

.BrideContainer {
	width: 100%;
	height: 100%;
	// height: 100vh;
	// border: 1px solid red;
	margin: auto;
	z-index: 8;
	background-image: url("bg.jpg");
	background-size: cover;
	.back-header {
		background: #ffffff;
		width: 100%;
		height: 6.25rem;
		z-index: 9999;
		padding-top: 2.5rem;
		.header-container {
			width: 100%;
			height: 3.75rem;
			box-shadow: 0 1px 0 0 #e5e5e5;
			.back-btn {
				// position: absolute;
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
	.fixedBox {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		.fixedParents {
			width: 100%;
			height: 100%;
		}
	}
}

.BrideContainer {
	.price {
		text-align: center;
		display: flex;
		justify-content: center;
		margin-left: 11rem;
		.mixPrice {
			float: left;
			font-size: 1.88rem;
			span {
				color: #ff7b7b;
				font-size: 3rem;
			}
		}
		.symbol {
			float: left;
			display: flex;
			align-items: center;
			color: #333;
			margin: 0 5.56rem;
			font-weight: bold;
			font-size: 2.5rem;
		}
		.explain {
			color: #999;
			font-size: 1.5rem;
			margin-top: 4.3rem;
		}
	}
	.suitProto {
		width: 100%;
		text-align: center;
		margin-top: 2rem;
		font-size: 1.5rem;
		color: #999;
	}
	.line.mainPage {
		margin: 1rem 0 2rem;
		width: 100%;
		height: 1.25rem;
		background-color: #f5f5f5;
		opacity: 0.5;
	}
}

.cus-inner {
	display: flex;
	margin-top: 8.13rem;
	justify-content: center;
	width: 100%;
	box-sizing: border-box;
	// overflow-x: hidden;
	// overflow-y: auto;
	padding-bottom: 0;
	animation: fadeIn 0.2s ease;
	animation-delay: 0.4s;
	animation-fill-mode: backwards;
	&.attribute {
		flex-direction: column;
	}
	.left {
		flex: 1;
		width: 50%;
		.left-wrap {
			display: flex;
			height: 100%;
			flex-direction: column;
		}
	}
	.left-top,
	.left-bottom,
	.right {
		// overflow-y: hidden;
		// overflow-x: scroll;
		ul {
			position: relative;
			height: 100%;
			text-align: center;
			&:before {
				content: "";
				display: inline-block;
				height: 100%;
				vertical-align: middle;
			}
			li {
				display: inline-block;
				vertical-align: middle;
				margin: 0 1.405rem;
				float: left;
			}
		}
		.img {
			display: block;
			p {
				display: none;
				text-align: center;
			}
		}
	}
	.right {
		div.imgs {
			height: calc(100% - 7em);
			// overflow-y: hidden;
			// overflow-x: scroll;
			ul {
				padding: 0 30rem;
				width: 100%;
				display: inline-flex;
				justify-content: center;
			}
			.img {
				img {
					width: 18.75rem;
					height: 18.75rem;
					border: solid 1px #e5e5e5;
				}
				p {
					display: none;
					text-align: center;
				}
			}
		}
	}
	.attrMain {
		div.imgs {
			height: 21.19rem;
		}
	}
}

.flex_row{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.attrList {
	// margin-left: 8.56rem;
	display: inline-block;
	margin-right: 2.75rem;
	margin-bottom: 2rem;
	.list-wrap {
		margin: auto;
		width: 46.75rem;
		height: 17.06rem;
		background: #fff;
		border-radius: 10px;
		border: solid 1px #e5e5e5;
		box-shadow: 0 0 20px rgba(255, 123, 123, 0.2);
		.attrs {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			padding: 2.69rem 2.97rem;
			.attrs-title {
				width: 100%;
				text-align: center;
				font-size: 2.25rem;
				margin-bottom: 2rem;
			}
		}
		ul {
			text-align: center;
			line-height: 2rem;
			display: flex;
			justify-content: space-between;
			&>li {
				position: relative;  //仅是为了点击sku属性，浮窗展示对应的sku信息
				float: left;
				min-width: 3rem;
				white-space: nowrap; // padding: 0 6rem;
			}
		}
		.value {
			display: block;
			color: #ff7b7b;
			font-size: 3rem;
			text-align: center;
		}
		.name {
			display: block;
			margin-top: 1rem;
			font-size: 1.88rem;
			color: #333;
		}
		.valueList {
			position: absolute;
			left: 50%;
			bottom: 8rem;
			border: 1px solid #e5e5e5;
			border-radius: 8px;
			display: none;
			transform: translateX(-50%);
			animation: fadeIn 0.2s ease;
			animation-fill-mode: backwards;
			z-index: 10;
			&.active {
				display: block;
			}
			.arrow {
				position: absolute;
				left: 50%;
				bottom: -1em;
				margin-left: -1em;
				width: 2em;
				height: 2em;
				border: 1px solid #e5e5e5;
				background: #fff;
				z-index: 1;
				transform: rotate(45deg);
			}
			.valueInner {
				display: table;
				position: relative;
				padding: 2.25rem 0;
				border-radius: 4px;
				background: #fff;
				z-index: 2;
				li {
					display: table-cell;
					&.active {
						span {
							color: #e2aa6f;
							border-bottom: 1px solid #e2aa6f;
						}
					}
				}
				span {
					display: inline-block;
					margin: 0 1.5rem;
					padding: 0 0.5rem;
					font-size: 1.5rem;
					border-bottom: 1px solid #999;
					white-space: nowrap;
				}
			}
		}
	}
	.btn {
		position: absolute;
		bottom: 1.75rem;
		left: 50%;
		padding: 0.94rem 11.25rem;
		font-size: 1.25rem;
		border-radius: 4px;
		transform: translate(-50%, 0);
		background: #e2aa6f;
		color: #fff;
	}
}
.stoneList {
	// margin-right: 9rem;
	margin-bottom: 2rem;
	display: inline-block;
	.stone-wrap {
		margin: auto;
		width: 61.31rem;
		height: 17.06rem;
		background: #fff;
		border-radius: 10px;
		border: solid 1px #e5e5e5;
		box-shadow: 0 0 20px rgba(255, 123, 123, 0.2);
		.attrs {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			padding: 2.69rem 2.97rem;
			.attrs-title {
				width: 100%;
				text-align: center;
				font-size: 2.25rem;
				margin-bottom: 0.8rem;
			}
			.stoneList-empty {
				width: 25rem;
				height: 5.5rem;
				text-align: center;
				line-height: 5.5rem;
				border: 1px dashed #ff7b7b;
				margin: 0 auto;
				margin-top: 2.5rem;
				font-size: 1.5rem;
				color: #ff7b7b;
			}
		}
		ul {
			text-align: center;
			width: 200%;
			display: flex;
			justify-content: space-around;
			width: 100%;
			line-height: 2.8rem;
			&>li {
				white-space: nowrap; // padding: 0 6rem;
			}
		}
		.value {
			display: block;
			color: #ff7b7b;
			font-size: 3rem;
			text-align: center;
		}
		.name {
			display: block;
			font-size: 1.88rem;
			color: #333;
			margin-top: 0.2rem;
		}
		.valueList {
			position: absolute;
			left: 50%;
			bottom: 8rem;
			border: 1px solid #e5e5e5;
			border-radius: 8px;
			display: none;
			transform: translateX(-50%);
			animation: fadeIn 0.2s ease;
			animation-fill-mode: backwards;
			z-index: 10;
			&.active {
				display: block;
			}
			.arrow {
				position: absolute;
				left: 50%;
				bottom: -1em;
				margin-left: -1em;
				width: 2em;
				height: 2em;
				border: 1px solid #e5e5e5;
				background: #fff;
				z-index: 1;
				transform: rotate(45deg);
			}
			.valueInner {
				display: table;
				position: relative;
				padding: 2.25rem 0;
				border-radius: 4px;
				background: #fff;
				z-index: 2;
				li {
					display: table-cell;
					&.active {
						span {
							color: #e2aa6f;
							border-bottom: 1px solid #e2aa6f;
						}
					}
				}
				span {
					display: inline-block;
					margin: 0 1.5rem;
					padding: 0 0.5rem;
					font-size: 1.5rem;
					border-bottom: 1px solid #999;
					white-space: nowrap;
				}
			}
		}
	}
	.btn {
		position: absolute;
		bottom: 1.75rem;
		left: 50%;
		padding: 0.94rem 11.25rem;
		font-size: 1.25rem;
		border-radius: 4px;
		transform: translate(-50%, 0);
		background: #e2aa6f;
		color: #fff;
	}
}
.myBride_Letter{
	width: auto !important;
	margin: 0 9.5rem !important;
	position: static !important;
	.client-form{
		padding-left: 0 !important;
		.client-detail{
			width: auto;
			&>div{
				text-align: center;
				&>input{
					margin-left: -1.3rem !important;
				}
				&>label::before{
					left: -2.8rem !important;
				}
			}
			&>input{
				margin-right: 0;
				margin-left: 1.88rem;
			}
		}
	}
}
.conditionList-li {
	transition: all 2s;
	-moz-transition: all 2s;
	/* Firefox 4 */
	-webkit-transition: all 2s;
	/* Safari 和 Chrome */
	-o-transition: all 2s;
	/* Opera */
}

.sure-btn-container {
	height: 5.5rem;
	margin: 4.25rem auto 5rem;
	width: 100%;
	display: flex;
	justify-content: center;
	.sure-btn {
		float: left;
		width: 25rem;
		height: 5.5rem;
		background-color: #fff;
		border: solid 1px #ff7b7b;
		color: #ff7b7b;
		font-size: 1.5rem;
		border-radius: 10px;
		text-align: center;
		line-height: 5.5rem;
		margin-right: 2.33rem;
	}
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

.alert_shopping {
	width: 45rem; // height: 34.63rem;
	background: #ffffff;
	position: absolute;
	left: 50%;
	top: 45%;
	transform: translate(-50%, -50%);
	z-index: 99;
	padding-top: 2.5rem;
	border-radius: 0.625rem; //   animation: shoppingCar 0.5s ease;
	//   animation-fill-mode: forwards;
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
</style>