<template>
    <div class="finalFashionSettlement">
        <v-header :header="header"></v-header>
        <div class="detail_wrap">
			<div class="right">
				<div class="list_wrap">
					<div class="total_price"><span>总价格：</span><em>¥{{finalMoney | money}}</em></div>
					<div class="list" style="z-index: 200;" v-if="!singleStone">
						<div class="title"><h3>戒托信息</h3><p v-if="settleData.MinPrice">¥{{(settleData.MinPrice).toFixed(2) | money}}<span>（价格）</span></p><div class="angin" @click="anginSelectStyle()" v-if="!fromSeries">重新选托</div></div>
						<ul class="cell_value ring_mes">
							<li class="style"><span>款式：</span><em>{{settleData.StyleName}}</em><em>{{settleData.Category}}</em><em>#{{settleData.StyleNo}}#</em></li>
							<li class="stone"><span>镶石：</span><em v-if="settleData.AuxiliaryStoneType">{{settleData.AuxiliaryStoneType}}</em><em v-else>无</em></li>
							<li class="finness-wrap">
								<span>成色：</span>
								<div class="finness"  v-if="settleData.Data">
									<em :class="{'active':item.active}" @click="getFinness(item.Id,item.Name)" :key="item.Id" v-for="item in settleData.Data[0].DataList" v-if="settleData.Data[0].DataName == 'Condition'">{{item.Name}}</em>
								</div>
							</li>
							<li><span>镶石粒数：</span><em v-if="settleData.AuxiliaryStoneQuantity">{{settleData.AuxiliaryStoneQuantity}}</em><em v-else>无</em></li>
							<li class="differ transition">
								<span>手寸：</span>
								<div class="sel-params">
									<p @click="isShowSize = !isShowSize">{{selectSizeHand}}</p>
									<transition name="opacityLeave">
										<div class="condition-list" v-show="isShowSize" style="z-index: 199;">
											<div class="size-wrap" v-if="settleData.Data">
												<p class="size" :class="{'active':item.active}" :key="index" v-for="(item,index) in handleSort(settleData.Data[2].DataList)"  @click="getSize(item.Id)">{{item.Name}}</p>
											</div>
										</div>
									</transition>
								</div>
							</li>
							<li><span>镶石总重：</span><em v-if="settleData.AuxiliaryStoneWeight">{{settleData.AuxiliaryStoneWeight}}ct</em><em v-else>无</em></li>
							<li class="differ transition" v-if="singleStyle">
								<span>镶口：</span>
								<div class="sel-params">
									<p @click="isShowInlay = !isShowInlay">{{selectInlay && selectInlay + 'ct'}}</p>
									<transition name="opacityLeave">
										<div class="condition-list" v-show="isShowInlay" :class="{small: settleData.Data && settleData.Data[1] && settleData.Data[1].DataList && settleData.Data[1].DataList.length<3}">
											<div class="size-wrap" v-if="settleData.Data">
												<p class="size" :class="{'active':item.active}" :key="index" v-for="(item,index) in handleSort(settleData.Data[1].DataList)"  @click="getInlay(item.Id)">{{item.Name+'ct'}}</p>
											</div>
										</div>
									</transition>
								</div>
							</li>
							<li v-else></li>						
							<li class="stone"><span>金重：</span><em v-if="settleData.TotalWeight">{{settleData.TotalWeight}}g</em><em v-else>无</em></li>
							
						</ul>
						<div class="bg-img bg1">
							<img :src="http.imgUrl+mainImg+config.detailImgSize" v-if="mainImg" alt="">
							<img :src="imgLoading" v-else>
						</div>
					</div>
					<div class="gray" v-if="!singleStone"></div>
					<div class="list table_list" v-if="!singleStyle">
						<div class="title"><h3>配石信息</h3><p v-if="tableList">¥{{Number(tableList.SalesPrice?tableList.SalesPrice:0).toFixed(2) | money}}<span>（价格）</span></p><div class="angin" @click="anginSelectStone()">重新选石</div></div>
						<ul class="cell_value">
							<li><span>形状</span><em>{{tableList.Shape}}</em></li>
							<li><span>证书</span><em>{{tableList.CertificateType}}</em></li>
							<li><span>重量</span><em>{{tableList.Weight}}ct</em></li>
							<li><span>颜色</span><em>{{tableList.Color}}</em></li>
							<li><span>净度</span><em>{{tableList.Cleanliness}}</em></li>
							<li><span>切工</span><em>{{tableList.Cut}}</em></li>
							<li><span>荧光</span><em v-if='tableList.Fluorescence'>{{tableList.Fluorescence}}</em><em v-else>None</em></li>
						</ul>
						
						<!-- <div class="bg-img bg2"></div> -->
					</div>
					<div class="gray" v-if="!singleStone && !singleStyle"></div>
					<div class="list special" v-if="!singleStone">
						<div class="title title-distance"><h3>特殊要求</h3></div>
						<ul class="cell_value">
							<li class="write_mes">
								<div class="write_inner" @click="clickWrite()">
									<div class="form-group" >
										<input type="checkbox" id="write">
										<div class="outCircle" :class="{'outCircleBorder':isSelect}">
											<div :class="{'innerCircle':isSelect}"></div>
										</div>
									</div>
									<label>刻字</label>
								</div>
								<input maxlength="6" type="text" :disabled="!isSelect" v-model="lettering" placeholder="输入刻字信息" class="input_write" @change="getWriteValue($event)">
							</li>
							<!-- <li class="write_mes">
								<div class="write_inner">
									<div class="form-group">
										<input type="checkbox" id="hand" v-model="isSelectHand">
										<div class="outCircle" :class="{'outCircleBorder':isSelectHand}">
											<div :class="{'innerCircle':isSelectHand}"></div>
										</div>
									</div>
									<label for="hand">指纹</label>
								</div>
								<div class="file_upLoad">
									<input type="button" value="已上传" v-show="ImgUrl != ''"/>
									<input type="button" value="未上传" v-show="ImgUrl == ''" />
									<v-upload :type='0' @get_img='set_Img'></v-upload>
								</div>
							</li> -->
						</ul>
					</div>
					<div class="subit_wrap">
						<div class="join_shopping" @click="joinShopping()">加入购物车</div>
						<div class="buy_now"  @click="joinShopping('rightNow')">立即购买</div>
					</div>
				</div>
			</div>
        </div>
		
		<v-loading v-show="isLoading"></v-loading>
        <v-footer :finishParams='finishParams' :header="header"></v-footer>
		<!-- 弹窗 -->
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
			<div class="mask settle_mask" v-show="isShow"></div>
		</transition>
		<prompt-box :msg="msg" v-show="ispromptBox"></prompt-box>
    </div>
</template>

<script>
    import footer from './footer'
	import header from './header'
	import upload from "components/upload/upload";
	import loading from 'components/isLoading/isloading'
	import promptBox from 'components/promptBox/promptBox'
	const imgLoading = require('@/assets/assetsFinal/imgLoading.png')
    export default {
        data () {
            return {
				imgLoading: imgLoading,
                finishParams:{
					isStyleListFinshed:true,
					isDetailFinshed: true,
					isStoneFinshed: true,
					isMessage: true,
					isShow: true,
					footerWord: {
						firstStep: '款式列表',
						secondStep: '款式详情',
						thirdStep: '配石',
						fourStep: '确认信息',
					}
                },
                header:{
					title: '结算',
					isShow: true,
					return: {
						name:"finalFashionStone",
						params: {
							id: this.$route.params.id,
							index: this.$route.params.index,//这个参数是列表的第几行索引
							tableRow: this.$route.params.tableRow,
							letter:{
								isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
								lettering: this.$route.params.letter ? this.$route.params.letter.lettering : '',
							},
							size: '',
							inlay: '',
							ProType: this.$route.params.ProType
						}
					}
                },
				isNext: true,
				isLast: false,
				isSelectHand: true,
				isSelect:false,
				isShow: false,
				settleData: {},
				mainImg: '',
				selectSizeHand: '',
				selectInlay: '',
				tableList:{},
				styleObj: this.$store.state.relate.fashioinObj,
				ImgUrl: '',
				isLoading: false,

				lettering: '',
				params:{
					ProType:1,
					SkuId: '',
					Quantity: 1,
					Specification: '',
					Lettering: '',
					Stones:[]
				},
				ispromptBox: false,
				msg: {
					text: '',
					time: '',
					show: false
				},
				Size: '选择尺寸',
				isShowSize: false,
				Inlay: '选择镶口',
				isShowInlay: false,
				singleStone: false,
				singleStyle: false,
				fromSeries: false,
				selectSkuId: '',
				weightList: []
            }
		},
		filters:{
			toFixedTwo(val) {
				if(!val) return
				return Number(val).toFixed(2);
			}
		},
		
		computed: {
			finalMoney(){
				let minPrice = Number(this.settleData.MinPrice) || 0,
					salePrice = Number(this.tableList.SalesPrice ? this.tableList.SalesPrice : 0),
					total = (minPrice + salePrice).toFixed(2)
				return total
			},
		},
        mounted () {
			this.$nextTick(() => {
                let dom = document.getElementsByClassName('transiton');
                setTimeout(function () {//延迟700ms 
                    for(let i = 0 ; i < dom.length; i ++) {
                        dom[i].style.opacity = '1'
                        dom[i].style.transform = 'translateX(0rem)'
                    }
                },800)
               
			})
		},
		created () {
			window.vm = this
			if(this.$route.params.ProType == 11){//单款
				this.params.ProType = 11
				this.finishParams.isStoneFinshed = false
				this.finishParams.disabled = true
				this.singleStyle = true
				this.header.return.name = 'finalFashionDetail'
			}else if(this.$route.params.ProType == 10){//单石
				this.params.ProType = 10
				this.finishParams.isStoneFinshed = false
				this.finishParams.isDetailFinshed = false
				this.finishParams.disabled = true
				this.singleStone = true
				this.header.return.name = 'finalFashionStoneFirst'
				this.$store.commit('SET_DETAIL', false)
				this.$store.commit('SET_STONE', false)
			}else if(!this.$store.state.relate.isSroneOrStyle){
				this.header.return.name = 'finalFashionDetail'
			}

			if(!this.singleStone){
				this.getInit()
			}

			//石料
			if(this.$route.params.tableRow){
				this.tableList = this.$route.params.tableRow
			}

			//刻字
			if(this.$route.params.letter){
				this.lettering = this.$route.params.letter.lettering
				this.isSelect = this.$route.params.letter.isSelect
			}

			if(!this.$store.state.relate.isSroneOrStyle){//false 是先选石头
				this.finishParams.footerWord.firstStep = '配石列表';
				this.finishParams.footerWord.secondStep = '款式列表';
				this.finishParams.footerWord.thirdStep = '款式详情';
				this.finishParams.footerWord.fourStep = '确认信息';
				
			}

			if (this.$route.query.lastPage == 'series') {
				this.fromSeries = true
				this.header.return.name = 'finalFashionStone'
				this.header.return.query = this.$route.query
			}
			

			this.$store.commit('SET_SETTLEMENT', true)
		},
        methods: {
			searchSku(inlay){
				let filterFinness = this.settleData.SkuList.filter(sku => sku.finness == this.$store.state.relate.fashioinObj.finness)
				let list = []
				filterFinness.forEach(item => {
					if(item.size == this.selectSizeHand){
						let price = 0,
							skuId = ''
						if(this.singleStyle){//单买戒托
							if(this.selectInlay == item.inlay){
								price = item.DiscountPrice > 0 ? item.DiscountPrice : item.TotalPrice
								skuId = item.SkuId
								list.push({
									price,
									skuId
								})
							}
						}else{
							price = item.DiscountPrice > 0 ? item.DiscountPrice : item.TotalPrice
							skuId = item.SkuId
							list.push({
								price,
								skuId
							})
						}
					}
				})
				list.sort((a, b) => {
					return a.price - b.price
				})
				let result = list[0]
				if(result){
					this.settleData.MinPrice = result.price
					this.selectSkuId = result.skuId
				}
			},
			getWriteValue (e) {
				this.$route.params.letter.lettering = e.target.value
				this.header.return.params.letter.lettering = e.target.value;
			},
			clickWrite (){
				this.isSelect = !this.isSelect;
				if(!this.isSelect){
					this.lettering = ""
				}
				this.$route.params.letter.isSelect = this.isSelect
				this.header.return.params.letter.isSelect = this.isSelect
			},
			set_Img(src) {
				this.ImgUrl = src.url;
			},
			continueShpping (){
				this.isShow = false;
				this.$router.push('/');
			},
			tips (text){
				let that = this;
				that.ispromptBox = true;
				that.$nextTick(() => {
					that.msg.text = text
				})
				setTimeout(() => {
					that.msg.time = 500
				}, 1000)
				setTimeout(() => {
					that.ispromptBox = false
					that.msg.time = null
					that.msg.text = null
				}, 1500)
			},
			anginSelectStyle (){//重新选款
				this.$store.commit('SET_STONESIZE',this.tableList.Id)
				this.$router.push({
					name:"finalFashion",
					params:{
						id: this.$route.params.id,
						index: this.$route.params.index,//这个参数是列表的第几行索引
						tableRow: this.$route.params.tableRow,
						letter:{
							isSelect: this.isSelect,
							lettering: this.lettering
						},
						size: this.selectSizeHand,//尺寸
						inlay: this.selectInlay,
						ProType: this.$route.params.ProType
					}
				})
			},
			anginSelectStone (){
				let routeName = 'finalFashionStoneFirst'
				if(this.$store.state.relate.isSroneOrStyle){
					this.$store.commit('SET_STONESIZE','')
					routeName = 'finalFashionStone'
				}
				this.$router.replace({
					name: routeName,
					params:{
						id:this.$route.params.id,
						index: this.$route.params.index,
						tableRow: this.$route.params.tableRow,
						letter:{
							isSelect: this.isSelect,
							lettering: this.lettering
						},
						size: this.selectSizeHand,//尺寸
						inlay: '',
						ProType: this.$route.params.ProType
					},
					query: this.$route.query
				})
			},
			getInit (){
				this.isLoading = true;
				let options = {
					url:'/purchase_Api_FashionStyle_GetInfo',
					params: {
						StyleId: this.$route.params.id,
						PlatId: 'a61e9fbf-1722-4b28-aba5-56afa901f68c'
					}
				}
				let cbok = (res) => {
					this.isLoading = false;
					let data = res.data.data;
					this.settleData = data;
					data.StyleImgList = data.StyleImgList || []
					data.Data = data.Data || []
					data.SkuList = data.SkuList || []
					this.settleData.StyleImgList.forEach((item)=>{
						if(item.IsMain){
							this.mainImg = item.ImageCode
						}
					})
					this.weightList = []
					this.settleData.Data.forEach((item)=>{
						item.DataList = item.DataList || []
						item.DataList.forEach((item1,index)=>{
							this.$set(item1,'active',false);
							if(item.DataName == "Condition"){
								if(item1.Name == this.$store.state.relate.fashioinObj.finness){
									this.$set(item1,'active',true);
								}
							}else if(item.DataName == 'RingSize'){
								if(this.$route.params.size) {
									if(this.$route.params.size == item1.Name){
										this.$set(item1,'active',true);
										this.selectSizeHand = item1.Name
										this.header.return.params.size = item1.Name
									}
								}else{
									if(index == 0) {
										this.$set(item1,'active',true);
										this.selectSizeHand = item1.Name;
										this.header.return.params.size = item1.Name
									}
								}
							}else if(item.DataName == 'Weight'){
								this.weightList.push(item1.Name)
								if(this.singleStyle){
									if(this.$route.params.inlay) {
										if(this.$route.params.inlay == item1.Name){
											this.$set(item1,'active',true);
											this.selectInlay = item1.Name
											this.header.return.params.inlay = item1.Name
										}
									}else{
										if(index == 0) {
											this.$set(item1,'active',true);
											this.selectInlay = item1.Name;
											this.header.return.params.inlay = item1.Name
										}
									}
								}else{
									if(this.tableList){
										this.selectInlay = this.tableList.Weight
									}
								}
							}
						})
					})
					//根据成色和尺寸和镶口获取价格
					this.settleData.SkuList.forEach(item => {
						this.$set(item, 'finness', '')
						this.$set(item, 'inlay', '')
						this.$set(item, 'size', '')
						item.SkuAttrList = item.SkuAttrList || []
						item.SkuAttrList.forEach(attr => {
							if(attr.StyleAttrName == '成色'){
								this.$set(item, 'finness', attr.StyleAttrValueName)
							}
							if(attr.StyleAttrName == '戒指手寸'){
								this.$set(item, 'size', attr.StyleAttrValueName)
							}
							if(attr.StyleAttrName == '镶口大小'){
								this.$set(item, 'inlay', attr.StyleAttrValueName)
							}
						})
					})
					this.searchSku()
					
				}
				this.http.get(options,cbok)
			},
			getFinness (id,name) {
				let obj= {
					finness: '',
					stylePrice: this.settleData.MinPrice,//价格
				}
				this.settleData.Data.forEach((item)=>{
					if(item.DataName == "Condition"){
						item.DataList.forEach((item1,index)=>{
							if(item1.Id == id) {
								item1.active = true;
								obj.finness = item1.Name;
							}else{
								item1.active = false;
							}
						})
					}
				})
				this.$store.commit('SET_FASHION', obj)
				if(obj.finness){
					this.searchSku()
				}
			},
			getSize (id){
				this.settleData.Data.forEach((item)=>{
					if(item.DataName == "RingSize"){
						item.DataList.forEach((item1,index)=>{
							if(item1.Id == id) {
								item1.active = true;
								this.selectSizeHand = item1.Name;
								this.$route.params.size = item1.Name
								this.header.return.params.size = item1.Name
							}else{
								item1.active = false;
							}
						})
					}
				})
				if(this.$store.state.relate.fashioinObj.finness){
					this.searchSku()
				}
				this.isShowSize = false
			},
			getInlay(id){//单买款才会用到这个函数
				this.settleData.Data.forEach((item)=>{
					if(item.DataName == "Weight"){
						item.DataList.forEach((item1,index)=>{
							if(item1.Id == id) {
								item1.active = true;
								this.selectInlay = item1.Name;
								this.$route.params.inlay = item1.Name
								this.header.return.params.inlay = item1.Name
							}else{
								item1.active = false;
							}
						})
					}
				})
				if(this.$store.state.relate.fashioinObj.finness){
					this.searchSku(this.selectInlay)
				}
				this.isShowInlay = false
			},
			joinShopping (type) {
				// 获取SKUid
				let Condition,
					flag = false,
					flagRing = false,
					flagStone = false,
					MainStoneQty = 1,
					ViceStoneQty = 0,
					stoneData = [],
					stoneObj = null

				if(this.tableList.Id || this.singleStyle){
					flagStone = true
				}
				
				
				this.params.Stones = []
				if(this.tableList && this.tableList.Id){
					this.params.Stones.push({
						StoneId: this.tableList.Id,
						StoneType: 0,//
						StoneCategory: '钻石',
						Shape:this.tableList.Shape,
						Color: this.tableList.Color,
						Clarity: this.tableList.Cleanliness,
						Cleanliness: this.tableList.Cleanliness,
						Cut: this.tableList.Cut,
						Weight: this.tableList.Weight,
						UnitPrice: this.tableList.SalesPrice,
						Quantity: 1,
						TotalPrice: this.tableList.SalesPrice,
					})
					stoneObj = {}
					for(let key in this.tableList){
						if(key != 'SalesPrice'){
							stoneObj[key] = this.tableList[key]
						}
					}
					stoneObj.StoneType = 0
					stoneObj.Insert = stoneObj.Weight
				}

				if(!this.singleStone){
					if(!stoneObj){
						stoneObj = {}
					}
					this.settleData.Data.forEach((item)=>{
						item.DataList.forEach((item1,index)=>{
							if(item1.active){
								if(item.DataName == "Condition"){
									Condition = item1.Name;
									flag = true;
								}else if(item.DataName == "RingSize"){
									flagRing = true;
								}
							}
						})
					})
					stoneObj.finness = Condition
					stoneObj.Lettering = this.lettering
					//获取的skuId
					this.params.SkuId = this.selectSkuId
					// this.settleData.SkuList.forEach((item) => {
					// 	let len = 0;
					// 	item.SkuAttrList.forEach((item1)=>{
					// 		if(item1.StyleAttrValueName == Condition){
					// 			len ++
					// 		}else if(item1.StyleAttrValueName == this.selectSizeHand){
					// 			len ++
					// 		}else if((this.$route.params.ProType == 11 && item1.StyleAttrValueName == this.selectInlay) || (this.$route.params.ProType != 11 && item1.StyleAttrValueName == this.tableList.Weight)){
					// 			len ++
					// 		}
					// 		if(len == 3){
					// 			this.params.SkuId = item.SkuId;
					// 		}
					// 	})
					// })
					this.params.Specification = this.selectSizeHand
					this.params.Lettering = this.lettering

					stoneObj.handSize = this.selectSizeHand
					if(this.$route.params.ProType == 11){
						stoneObj.Insert = this.selectInlay
					}

					stoneObj.StoneCategory = this.settleData.AuxiliaryStoneType
					stoneObj.StoneWeight = this.settleData.AuxiliaryStoneWeight
					stoneObj.StoneQuantity = this.settleData.AuxiliaryStoneQuantity

					if(this.settleData.AuxiliaryStoneType || this.settleData.AuxiliaryStoneWeight&&this.settleData.AuxiliaryStoneQuantity){
						
						let nameList = this.settleData.AuxiliaryStoneType.split('/'),
							qtyList = this.settleData.AuxiliaryStoneQuantity.split('/'),
							weightList = this.settleData.AuxiliaryStoneWeight.split('/');
						nameList.some((name, index) => {
							let qty = qtyList[index],
								weight = weightList[index];
							if(qty && weight){
								ViceStoneQty += qty
								this.params.Stones.push({
									StoneId: '',
									StoneType: '1',
									StoneCategory: name,
									Shape: '',
									Color: '',
									Clarity: '',
									Cut: '',
									Weight: weight,
									UnitPrice: 0,
									Quantity:  qty,
									TotalPrice: 0
								});
							}else{
								return true;
							}
						})
					}
				}else{
					MainStoneQty = 0
					flag = true
					flagRing = true
				}
				
				
				
				
				
				let options = {
					url: "/Order_Api_CustomizeCart_AddCartCustomizeSingle",
					params: this.params
				}
				let cbok = (res) => {
					this.isLoading = false
					this.isShow = true;
				}
				let cbno = (res) => {
					this.isLoading = false;
					this.tips(res.data.message ||'加入购物车失败！')
				}
				
				if(flag && flagRing && flagStone){
					if(type == 'rightNow'){
						let {Lettering, ProType, Quantity, SkuId, Specification} = this.params,
							MainImg = this.mainImg,
							StyleId = this.$route.params.id,
							{StyleName, StyleNo} = this.settleData,
							Weight = this.settleData.TotalWeight,
							IsNeedStone = this.settleData.IsSelectStone ? 1 : 0,
							StonePrice = 0,
							RingPrice = Number(this.settleData.MinPrice) || 0,
							SetItems = []
						if(this.tableList){
							StonePrice = this.tableList.SalesPrice || 0
						}
						let ProStones = this.params.Stones || []
						let UnitPrice = RingPrice + StonePrice,
							TotalPrice = UnitPrice
						stoneObj.TotalPrice = TotalPrice
						stoneData.push(stoneObj)
						let selectedGoods = {
							ProType, MainImg, StyleId, StyleName, StyleNo, SkuId,
							Quantity, Weight, UnitPrice, TotalPrice, IsNeedStone,
							Specification, Lettering, MainStoneQty, ViceStoneQty,
							RingPrice, StonePrice, SetItems, ProStones, stoneData,
							Images: [], Atts: [], Stones: ProStones,
							ProCategory: null, ProCategoryName: null
						}
						this.$store.commit('SET_SELECTGOOD', [selectedGoods])
						let params = {
							id: this.$route.params.id,
							index: this.$route.params.index,//这个参数是列表的第几行索引
							tableRow: this.$route.params.tableRow,
							letter:{
								isSelect: this.isSelect,
								lettering: this.lettering
							},
							size: this.selectSizeHand,//尺寸
							inlay: this.selectInlay,
							ProType: this.$route.params.ProType
						}
						let query = this.$route.query
						query.name = this.$route.name
						this.$router.push({
							name: 'finalFashionMessageNew',
							params,
							query
						})
					}else{
						this.isLoading = true
						this.http.post(options, cbok, cbno)
					}
				}else{
					if(!flag){
						this.tips('请选择成色！')
					}else if(!flagRing){
						this.tips('请选择尺寸！')
					}else if(!flagStone){
						this.tips('请重新选石！')
					}
				}
			},
            next_step () {
                let that = this;
                this.$nextTick(() => {
                    let dom = document.getElementsByClassName('transiton');
                    for(let i = 0 ; i < dom.length; i ++) {
                        dom[i].style.opacity = '1'
                        dom[i].style.transform = 'translateX(0rem)'
                        dom[i].style.animation = `fadeOut 0.2s ${i * 0.1}s linear`
                        dom[i].style['animation-fill-mode'] = 'forwards'
                    }
                })
                setTimeout(function () {
                    that.isNext = false;
                    that.isLast = true;
                },800)
                
            },
            last_step () {
                let that = this;
                this.$nextTick(() => {
                    let dom = document.getElementsByClassName('lastTransition');
                    for(let i = 0 ; i < dom.length; i ++) {
                        dom[i].style.opacity = '1'
                        dom[i].style.transform = 'translateX(0rem)'
                    }
                    for(let i = 0 ; i < dom.length; i ++) {
                        dom[i].style.animation = `fadeOut 0.2s ${i * 0.1}s linear`
                        dom[i].style['animation-fill-mode'] = 'forwards'
                    }
                })
                setTimeout(function () {
                    that.isNext = true;
				    that.isLast = false;
                },400)
			},
			
			handleSort (list) {
				if (list.length > 0) {
					for (let i = 0; i < list.length - 1; i++ ) {
						for (let j = i + 1; j < list.length; j++ ) {
							if (Number(list[i].Name) > Number(list[j].Name)) {
								let temp = list[i];
								list[i] = list[j];
								list[j] = temp
							}
						}
					}
				}			
				return list;
			}
        },
        components: {
            'v-footer': footer,
			'v-header': header,
			'v-upload': upload,
			'v-loading': loading
        }
    }
</script>

<style lang="scss">
    #app{
        height: 100%;
        width: 100%;
    }
	.mask{
		width: 100%;
		height: 100%;
		background:rgba(0, 0, 0, 0.1);
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		&.active{
			display: block;
		}
	}
	.settle_mask{
		z-index: 15;		
	}
	.sel-params {
		width: 16.25rem;
		height: 4.38rem;
		border-radius: 0.25rem;
		border: 1px solid #e5e5e5;
		line-height: 4.38rem;
		font-size: 1.5rem;
		color: #999999;
		position: relative;
		border-radius: 0.63rem;
		text-align: center;
		p {
			width: 16.25rem;
			height: 4.38rem;
			border-radius: 0.25rem;
			line-height: 4.38rem;
			text-align: center;
		}
		.condition-list {
			width: 30rem;
			position: absolute;
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
			left: 0;
			margin-top: 1.25rem;
			border-radius: 0.63rem;
			box-sizing: border-box;
			z-index: 99;
			&.small{
				width: auto;
			}
			.size-wrap {
				display: flex;
				flex-wrap: wrap;
				max-width: 30.3rem;
				//   border: 1px solid #e5e5e5;
				box-sizing: border-box;
				border-radius: 0.63rem;
				overflow: hidden;
			}
			.size {
				width: 7.5rem;
				// flex: 1;
				height: 4.38rem;
				color: #333;
				font-size: 1.5rem;
				box-sizing: border-box;
				text-align: center;
				padding: 0;
				margin: 0;
				border-right: 1px solid #e5e5e5;
				border-bottom: 1px solid #e5e5e5;
				margin-bottom: 0;
				&.active {
					background: #ff7b7b;
					color: #ffffff;
				}
			}
		}
    }
    .finalFashionSettlement{
        background: #ffffff;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
		box-sizing: border-box;
        .detail_wrap{
            display: flex;
            color: #ffffff;
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
			height: 100%;
			padding:  8.13rem 1.88rem;
			overflow-y: scroll;
            .left{
				width: 50%;
                .video_wrap{
                    padding: 2% 1.5%;
                    box-sizing: border-box;
					position: relative;
                    .video{
                        width: 100%;
                        height:  100%;
                    }
                    img{
                        width: 100%;
                        opacity: 0;
                        animation: imgOpacity 0.1s 0.2s linear;
                        animation-fill-mode: forwards;
					}
					.estimate{
						position: absolute;
						color: #333333;
						font-size: 2.25rem;
						line-height: 3.13rem;
						margin: auto;
						left: 50%;
						bottom: 3.25rem;
						transform: translateX(-50%);
						span{
							color: #FF7B7B;
							line-height: 2.69rem;
							margin-left: 1.25rem;
						}
					}
                }
            }
            .right{
                width: 100%;
				height: 100%;
				margin-bottom: 10rem;
				.list_wrap{
					box-sizing: border-box;
					box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
					width: 100%;
					.total_price{
						padding-left: 1.94rem;
						border-bottom: 1px solid #E5E5E5;
						height: 4.56rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						font-weight: 500;
						span{
							font-size: 1.5rem;
							color: #333333;
						}
						em{
							font-size: 3rem;
							color: #FF7B7B ;
						}
					}
					.list{
						width: 100%;
						position: relative;
						// transform: translateY(4rem);
						// opacity: 0;
						&:nth-of-type(1){
							animation: fadeInSettle 0.5s ease;
							animation-fill-mode: forwards;
						}
						&:nth-of-type(2){
							animation: fadeInSettle 0.5s 0.1s ease;
							animation-fill-mode: forwards;
						}
						&:nth-of-type(3){
							animation: fadeInSettle 0.5s 0.2s ease;
							animation-fill-mode: forwards;
						}
						&.table_list{
							.title{
								&:before{
									content: "";
									display: inline-block;
									width: 1rem;
									height: 2.25rem;
									background: #FFBE71;
									margin-right: 1.25rem;
								}
							}
							ul{
								li{
									width: 12.75rem;
									display: flex;
									flex-direction: column;
									span{
										height: 5.5rem;
										width: 12.75rem;
										border-right: 1px solid #E5E5E5;
										border-top: 1px solid #E5E5E5;
										border-bottom: 1px solid #E5E5E5;
										text-align: center;
										line-height: 5.5rem;
										margin-right: 0;
										opacity: 1;
									}
									em{
										width: 12.75rem;
										height: 5.5rem;
										text-align: center;
										line-height: 5.5rem;
										border-right: 1px solid #E5E5E5;
										border-bottom: 1px solid #E5E5E5;
									}
									&:first-child{
										em{
											border-left: 1px solid #E5E5E5;
										}
										span{
											border-left: 1px solid #E5E5E5;
										}
									}
								}
							}
						}
						&.special{
							.title{
								&:before{
									content: "";
									display: inline-block;
									width: 1rem;
									height: 2.25rem;
									background: #F760BE;
									margin-right: 1.25rem;
								}
							}
						}
						.title{
							font-size: 2.25rem;
							display: flex;
							align-items: center;
							padding: 1.25rem 1.5% 0;
							box-sizing: border-box;
							// border-bottom: 1px solid #f2f2f2;
							h3{
								color: #333333;
								line-height: 3.13rem;
								margin-right: 1.25rem;
							}
							p{
								color: #FF7B7B;
								line-height: 2.69rem;
								span{
									font-size: 1.25rem;
									line-height: 2.69rem;
								}
							}
							.angin{
								width: 11.25rem;
								height: 4.38rem;
								border: 1px solid #E5E5E5;
								background: #fff;
								color: #333333;
								font-size: 1.5rem;
								line-height: 4.38rem;
								text-align: center;
								border-radius: 0.25rem;
								margin-left: 1.25rem;
							}
							&:before{
								content: "";
								display: inline-block;
								width: 1rem;
								height: 2.25rem;
								background: #4A90E2;
								margin-right: 1.25rem;
							}
						}
						.title-distance{
							padding: 1.5rem 1.5% 0;
						}
						.cell_value{
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							padding-top: 1.25rem;
							padding-bottom: 0.13rem;
							position: relative;
							z-index: 9;
							padding-left:2.94rem;
							&.ring_mes{
								li{
									margin-bottom: 1.5rem;
									height: 4.38rem;
									&:nth-of-type(2n-1){
										width: 45%;
									}
									&:nth-of-type(2n){
										width:55%;
									}
								}
							}
							li{
								// width: 50%;
								padding-left: 1.5%;
								box-sizing: border-box;
								color: #333333;
								font-size: 1.88rem;
								display: flex;
								align-items: center;
								margin-bottom: 1.5rem;
								span{
									opacity: 0.5;
									margin-right: 2em;
								}
								&.finness-wrap{
									// align-items: center;
									height: 4.38rem;
									vertical-align: middle;
									margin-bottom: 1.5rem;
									position: relative;
									top: -0.625rem;
								}
								.finness{
									display: flex;
									flex-wrap: wrap;
									flex: 1;
									line-height: 4.38rem;
									span{
										vertical-align: middle;
									}
									em{
										margin-right: 3.63rem;
										display: inline-block;
										border: 1px solid #E5E5E5;
										border-radius: 0.25rem;
										padding: 0.2% 0.63rem;
										&.active{
											background: #FF7B7B;
											border: 1px solid #FF7B7B;
											color: #ffffff;
											box-sizing: border-box;
										}
									}
								}
								&.stone{
									span{
										margin-right: 4em;
									}
								}
								&.style{
									em{
										margin-right: 1.88rem;
									}
								}
								&.sizeHand{
									select{
										width: 12.65rem;
										height: 4.38rem;
										border-radius: 0.25rem;
										color: #333;
										font-size: 1.5rem;
										box-sizing: border-box;
										padding-left: 1.25rem;
										// appearance: select;
										
									}
									option{
										// width: 8rem;
										font-size: 1.5rem;
										background-color: rgba(255, 255, 255, 0.1);
										color: #333;
									}
								}
							}
							.write_mes{
								display: block;
								margin-right: 20.69rem;
								.write_inner{
									display: flex;
									align-items: center;
									.form-group{
										position: relative;
										display: flex;
										align-items: center;
										input[type="checkbox"]{
											appearance: checkbox;
											opacity: 0;
											z-index: 9;
										}
										.outCircle{
											width: 2rem;
											height: 2rem;
											border-radius: 100%;
											background: #fff;
											border: 0.03rem solid #999999;
											position: absolute;
											left: 0;
											top: -1px;
											z-index: 5;
											display: flex;
											justify-content: center;
											align-items: center;
											.innerCircle{
												width: 1.5rem;
												height: 1.5rem;
												border-radius: 100%;
												background: #FF7B7B;
											}
											&.outCircleBorder{
												border:1px solid #FF7B7B;
											}
										}
									}
									label{
										margin-left: 0.86rem;
										color: #333333;
										font-size: 1.88rem;
										opacity: 0.8;
									}
								}
								.input_write{
									width: 12.36rem;
									height: 4.38rem;
									margin-top: 1.63rem;
									padding: 0.44rem 0.63rem;
									box-sizing: border-box;
									border-radius: 0.25rem;
								}
								.file_upLoad{
									position: relative;
									// input[type="file"]{
									// 	position: relative;
									// 	opacity: 0;
									// 	z-index: 10;
									// 	margin-top: 1.63rem;
									// }
									input[type='button']{
										width: 11.25rem;
										height: 3rem;
										border-radius: 0.25rem;
										color: #333333;
										font-size: 1.5rem;
										text-align: center;
										line-height: 3rem;
										border: 1px solid #E5E5E5;
										margin-top: 1.63rem;
									}	
									div{
										// width: 11.25rem;
										// height: 3rem;
										// border-radius: 0.25rem;
										// color: #333333;
										// font-size: 1.5rem;
										// text-align: center;
										// line-height: 3rem;
										// border: 1px solid #E5E5E5;
										// position: absolute;
										// top: 1.63rem;
										// left: 0;
										// z-index: 3;
									}
								}
							}
						}
						.bg-img{
							width: 16.81rem;
							height: 16.81rem;
							position: absolute;
							top: 11.5rem;
							right: 3.75rem;
							z-index: 22;
							border: 1px solid #E5E5E5;
							padding: 0.4% 0.2% 0.3% 0.3%;
							box-sizing: border-box;
							img{
								width: 100%;
								height: 100%;
							}
							// &.bg1{
							// 	background: url('../../assets/assetsFinal/ringParams.png') no-repeat center;
							// 	background-size: 100%;
							// }
							// &.bg2{
							// 	background: url('../../assets/assetsFinal/stoneParams.png') no-repeat center;
							// 	background-size: 100%;	
							// }
						}
					}
				}
            }
        }
		.gray{
			height: 1.25rem;
			width: 100%;
			background: #F5F5F5;
		}
		.subit_wrap{
			background: #ffffff;
			display: flex;
			justify-content: flex-end;
			padding: 1.3rem 0 3.38rem 0;
			border-top: 1px solid #E5E5E5;
			// margin-bottom: 10rem;
			div{
				width: 25rem;
				height: 5.5rem;
				text-align: center;
				line-height: 5.5rem;
				border: 0.06rem solid #FF7B7B;
				color: #FF7B7B;
				font-size: 1.5rem;
				border-radius: 0.63rem;
				margin-right: 3.75rem;
				&:active{
					opacity: 0.8;
				}
			}
		}
		.alert_shopping{
			width: 45rem;
			// height: 34.63rem;
			background: #ffffff;
			position: absolute;
			left: 50%;
			top: 45%;
			transform: translate(-50%,-50%);
			z-index: 999;
			padding-top: 2.5rem;
			border-radius: 0.625rem;
			.shopping{
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			img{
				width: 19.56rem;
				height: 19.56rem;
			}
			p{
				color: #333333;
				font-size: 1.88rem;
				text-align: center;
				padding-bottom: 3.75rem;
				line-height: 2.63rem;
			}
			.subit{
				width: 100%;
				display: flex;
				border-top: 1px solid #E5E5E5;
				height: 6.13rem;
				div{
					flex: 1;
					color: #333333;
					font-size: 1.88rem;
					opacity: 0.8;
					text-align: center;
					height: 6.13rem;
					line-height: 6.13rem;
					&:first-child{
						border-right: 1px solid #E5E5E5;
					}
				}
			}
		}
		// 右边
		@keyframes fadeInSettle {
			// 0%{
            //     opacity: 0;
            //     transform: translateY(4rem);
            // }
            // 100%{
            //     opacity: 1;
            //     transform: translateY(0rem);
            // }
		}
		// 购物车出现
		@keyframes shoppingCar {
			0%{
				opacity: 0;
				top: 54%;
			}
			100%{
				opacity: 1;
				top: 50%;
			}
		}
		@keyframes fadeOut {
			0%{
                opacity: 1;
                transform: translateX(0rem);
            }
            100%{
                opacity: 0;
                transform: translateX(-1.88rem);
            }
		}
        @keyframes imgOpacity {
            0%{
                opacity: 0;
            }100%{
                opacity: 1;
            }
		}
		.fadeShopping-enter-active,.fadeShopping-leave-active{//购物车购买成功的弹窗
			transition: all 0.5s ease; 
		}
		.fadeShopping-enter,.fadeShopping-leave-active{
			top: 80%;
			opacity: 0;
		}
		
    }
</style>
