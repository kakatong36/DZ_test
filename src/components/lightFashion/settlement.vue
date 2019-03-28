<template>
    <div class="finalFashionSettlement">
        <v-header :header="header"></v-header>
        <div class="detail_wrap">
			<div class="right">
				<div class="list_wrap">
					<div class="list">
						<div class="total_price"><span>总价格：</span><em v-if="settleData.MinPrice">¥{{settleData.MinPrice.toFixed(2) | money}}</em></div>
						<div class="title"><h3>戒托信息</h3><p  v-if="settleData.MinPrice">¥{{(settleData.MinPrice).toFixed(2) | money}}<span>（此价格为售价）</span></p></div>
						<ul class="cell_value ring_mes">
							<li class="style"><span>款式：</span><em>{{settleData.Category}}</em><em>款号{{settleData.StyleNo}}</em><em>{{settleData.StyleName}}</em></li>
							<li class="stone"><span>镶石：</span><em v-if='settleData.AuxiliaryStoneType'>{{settleData.AuxiliaryStoneType}}</em><em v-else>无</em></li>
							<li class="finness-wrap">
								<span>成色：</span>
								<div class="finness"  v-if="settleData.Data">
									<em :class="{'active':item.active}" @click="getFinness(item.Id,item.Name)" :key="item.Id" v-for="item in settleData.Data[0].DataList" v-if="settleData.Data[0].DataName == 'Condition'">{{item.Name}}</em>
								</div>
							</li>
							<li v-if="settleData.AuxiliaryStoneQuantity"><span>镶石粒数：</span><em>{{settleData.AuxiliaryStoneQuantity}}</em></li>
							<li class="sizeHand">
								<span>手寸：</span>
								<div class="sel-params" v-if="sizeData.length">
									<p @click="isShowSize = !isShowSize">{{Size}}</p>
									<div class="condition-list" v-show="isShowSize">
										<div class="size-wrap">
											<div :class="{'active':item.active}" @click="getSize(item.Id)" :key="index" v-for="(item,index) in sizeData">{{item.Name}}</div>
										</div>
									</div>
								</div>
								<div class="" v-else>无</div>
							</li>
							<li v-if="settleData.AuxiliaryStoneWeight"><span>镶石总重：</span><em>{{settleData.AuxiliaryStoneWeight}}ct</em></li>
							<li></li>
							<li class="final-weight" v-if="settleData.TotalWeight"><span>金重：</span><em>{{settleData.TotalWeight}}g</em></li>
						</ul>
						<div class="bg-img bg1">
							<img :src="http.imgUrl+mainImg+config.detailImgSize" v-if="mainImg" alt="">
							<img :src="imgLoading" v-else alt="">
						</div>
					</div>
					<div class="gray"></div>
					<div class="list special">
						<div class="title title-distance"><h3>特殊要求</h3></div>
						<ul class="cell_value">
							<li class="write_mes">
								<div class="write_inner"  @click="clickWrite()">
									<div class="form-group">
										<input type="checkbox" id="write" >
										<div class="outCircle" :class="{'outCircleBorder':isSelect}">
											<div :class="{'innerCircle':isSelect}"></div>
										</div>
									</div>
									<label>刻字</label>
								</div>
								<input maxlength="6" type="text" :disabled="!isSelect" v-model="lettering" placeholder="输入刻字信息" class="input_write" @change="getWriteValue($event)">
							</li>
						</ul>
					</div>
					<div class="subit_wrap">
						<div class="join_shopping" @click="joinShopping('add')">加入购物车</div>
						<div class="buy_now" @click="joinShopping('buy')">立即购买</div>
					</div>
				</div>
			</div>
        </div>
		
		<v-loading v-show="isLoading"></v-loading>
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
			<div class="mask" v-show="isShow"></div>
		</transition>
		<v-footer :finishParams='finishParams' :header="header"></v-footer>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
    </div>
</template>

<script>
    import footer from './footer'
	import header from './header'
	import upload from "components/upload/upload";
	import loading from "@/components/isLoading/isloading";
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
						fourStep: '确认信息',
					}
                },
                header:{
					title: '结算',
					isShow: true,
					return: {
						name: 'lightFashionDetail',
						params: {
							id: this.$route.params.id,
							letter:{
								isSelect: this.$route.params.letter ? this.$route.params.letter.isSelect : '',
								lettering:  this.$route.params.letter ? this.$route.params.letter.lettering : '',
							}
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
				tableList:{},
				ImgUrl: '',
				isLoading: false,
				ispromptBox:false,
				msg: {
					text: '',
					time: '',
					show: false
				},
				lettering: '',
				params:{
					ProType:4,
					SkuId: '',
					Quantity: 1,
					Specification: '',
					Lettering: '',
					Stones:[]
				},
				isShowSize: false,
				Size: '',
				sizeData: [],
				fromSeries: false,
				selectSkuId: '',
				finness: ''
            }
		},
		filters:{
			toFixedTwo(val) {
				if(!val) return
				return Number(val).toFixed(2);
			}
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
			window.vm = this;
			this.getInit ();
			if(this.$route.params.letter){
				this.lettering = this.$route.params.letter.lettering
				this.isSelect = this.$route.params.letter.isSelect
			}
			this.$store.commit('SET_SETTLEMENTLIGHT',true)

			if (this.$route.query.lastPage == 'series') {
				this.fromSeries = true
				this.header.return.name = 'lightFashionDetail'
				this.header.return.query = this.$route.query
			}
		},
        methods: {
			getWriteValue (e) {
				this.$route.params.letter.lettering = e.target.value;
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
				let obj = {
					Size:'',//价格
					finness: ''//成色
				}
				this.$store.commit('SET_SIZELIGHT',obj)
				this.$store.commit('SET_STYLELIGHT',false)
				this.$store.commit('SET_DETAILLIGHT',false)
				this.$store.commit('SET_SETTLEMENTLIGHT',false)
				this.$router.push({
					name:'home'
				}) 
				 
			},
            sumbit () {
                this.$router.push('/finalFashion/message')
			},
			getSize (id){
				this.sizeData.forEach(item=>{
					if(item.Id == id) {
						item.active = true;
						this.Size = item.Name;
						this.isShowSize = false;
					}else{
						item.active = false
					}
				})
				let obj = {
					Size: this.Size,//价格
					finness: this.finness//成色
				}
				this.$store.commit('SET_SIZELIGHT',obj)
				this.searchSku()
			},
			getFinness (id,name) {
				this.settleData.Data.forEach((item)=>{
					if(item.DataName == "Condition"){
						item.DataList.forEach((item1,index)=>{
							if(item1.Id == id) {
								item1.active = true
								this.finness = item1.Name
							}else{
								item1.active = false;
							}
						})
					}
				})
				
				let obj= {
					finness: this.finness,
					Size: this.Size,
				}
				this.$store.commit('SET_SIZELIGHT',obj)
				this.searchSku()
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
					this.settleData.StyleImgList.forEach((item)=>{
						if(item.IsMain){
							this.mainImg = item.ImageCode;
						}
					})
					this.finness = this.$store.state.relate.lightFashion.finness
					this.Size = this.$store.state.relate.lightFashion.Size
					let finnessData = []
					this.settleData.Data.forEach((item)=>{
						if(item.DataName == "Condition"){
							item.DataList.forEach((item1,index)=>{
								if(item1.Name == this.$store.state.relate.lightFashion.finness){
									this.$set(item1,'active',true);
								}else{
									this.$set(item1,'active',false);
								}
							})
							finnessData = item.DataList
						}else if(item.DataName == 'RingSize'){
							let sizeData = []
							sizeData = item.DataList.map((item1,index)=>{
								item1.Sort = Number(item1.Name) || 0
								item1.active = false
								if(item1.Name == this.Size){
									item1.active = true;
								}
								return item1
							})
							sizeData.sort((a, b) => {
								return a.Sort - b.Sort
							})
							this.sizeData = sizeData
						}
					})
					if(!this.Size || !this.finness){
						this.Size = this.sizeData[0] && this.sizeData[0].Name
						this.sizeData[0].active = true
						this.finness = finnessData[0] && finnessData[0].Name
						this.$store.commit("SET_SIZELIGHT", {
							Size: this.Size,
							finness: this.finness
						})
					}
					this.settleData.SkuList.forEach(item=>{
						this.$set(item, 'finness', '')
						this.$set(item, 'size', '')
						item.SkuAttrList = item.SkuAttrList || []
						item.SkuAttrList.forEach(attr => {
							if(attr.StyleAttrName == '成色'){
								this.$set(item, 'finness', attr.StyleAttrValueName)
							}
							if(attr.StyleAttrName == '戒指手寸'){
								this.$set(item, 'size', attr.StyleAttrValueName)
							}
						})
					})
					this.searchSku()
				}
				this.http.get(options,cbok)
			},
			searchSku(inlay){
				let filterFinness = this.settleData.SkuList.filter(sku => sku.finness == this.$store.state.relate.lightFashion.finness),
					list = []
				filterFinness.forEach(item => {
					if(item.size == this.$store.state.relate.lightFashion.Size){
						let price = 0,
							skuId = ''
						price = item.DiscountPrice > 0 ? item.DiscountPrice : item.TotalPrice
						skuId = item.SkuId
						list.push({
							price,
							skuId
						})
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
			joinShopping (str) {
				// 获取SKUid
				//存信息
				let ImmediateBuy = {
					IsNeedStone: 0,
					Lettering: this.lettering || "",
					MainImg: "",
					MainStoneQty: 0,
					ProCategory: "",
					ProCategoryName: "",
					ProStones: [],
					ProType: "4",	//轻奢定制
					Quantity: 1,
					RingPrice: 0,
					SetItems: [],	//套装
					SkuId: "",
					// SpecialAtts: [],
					// SpecialImages: [],
					Specification: this.Size,
					StonePrice: 0,
					StoneType: 1, //有副石，无主石
					StyleId: this.$route.params.id,
					StyleName: this.settleData.StyleName,
					StyleNo: this.settleData.StyleNo,
					TotalPrice: 0,
					UnitPrice: 0,	//xx+石头
					UserAccount: "",
					ViceStoneQty: 0,
					Weight: this.settleData.TotalWeight,
					stoneData: [],
					Stones: [] //StoneId clone
				}
				let Condition, Weight;
				this.settleData.Data.forEach((item)=>{
					if(item.DataName == "Condition"){
						item.DataList.forEach((item1,index)=>{
							if(item1.active){
								Condition = item1.Name;
							}
						})
					}else if(item.DataName == "Weight"){
						item.DataList.forEach((item1,index)=>{
							if(item1.active || (item.DataList.length==1 && index==0)){
								Weight = item1.Name;
							}
						})
					}
				})
				// this.settleData.SkuList.forEach((item) => {
				// 	item.SkuAttrList.forEach((item1)=>{
				// 		if(item1.StyleAttrValueName == Condition){
				// 			this.params.SkuId = item.SkuId;
				// 		}
				// 	})
				// })

				this.params.SkuId = this.selectSkuId

				this.params.Specification = this.Size
				this.params.Lettering = this.lettering;
				this.params.Stones = [];
				if(this.settleData.AuxiliaryStoneType || this.settleData.AuxiliaryStoneWeight&&this.settleData.AuxiliaryStoneQuantity){
					let nameList = this.settleData.AuxiliaryStoneType.split('/'),
					qtyList = this.settleData.AuxiliaryStoneQuantity.split('/'),
					weightList = this.settleData.AuxiliaryStoneWeight.split('/');
					nameList.some((name, index) => {
						let qty = qtyList[index],
							weight = weightList[index];
						if(qty && weight){
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
								TotalPrice: 0,
								Insert: Weight,			//镶口
								finness: Condition,	//成色
								handSize: this.Size	//手寸
							});
							ImmediateBuy.stoneData.push({	//用于展示
								Insert: Weight,			//镶口
								Lettering: this.params.Lettering,		//刻字
								StoneCategory: name,	//镶石分类
								StoneQuantity: qty,	//镶石数量
								StoneWeight: weight,	//镶石重
								finness: Condition,	//成色
								handSize: this.Size	//手寸
							})
						}else{
							return true;
						}
					});
				}
				//SkuId
				ImmediateBuy.SkuId = this.params.SkuId;
				//ProStones
				//处理没有任何石头的时候，成色/手寸/刻字还是要显示的、排除提交购物车
				let stone = []
				if((!this.params.Stones || this.params.Stones.length == 0) && str != "add"){
					stone.push({
						handSize: this.Size,
						finness: Condition,
						Lettering: this.lettering
					})
				}else{
					stone = this.params.Stones
				}
				ImmediateBuy.ProStones = stone;
				ImmediateBuy.Quantity = this.params.Quantity;
				ImmediateBuy.Stones = this.params.Stones;
				if((!ImmediateBuy.stoneData || ImmediateBuy.stoneData.length == 0) && str != "add"){
					ImmediateBuy.stoneData = stone; //用于显示
				}
				//主图
				this.settleData.StyleImgList.forEach((img) =>{
					if(img.IsMain){
						ImmediateBuy.MainImg = img.ImageCode;
					}
				})
				//SpecialAtts 组合数据（成色/手寸/镶口）
				this.settleData.Data.forEach(item =>{
					let obj = {
						SetItemId: "",
						StyleAttrId: "",
						StyleAttrInputValue: "",
						StyleAttrName: "",
						StyleAttrValueId: "",
						StyleAttrValueName: ""
					}
					item.DataList.forEach( attr =>{
						if(attr.active){
							obj.StyleAttrValueName = attr.Name;
						}
					})
					// ImmediateBuy.SpecialAtts.push(obj)
				})
				//价格： RingPrice TotalPrice  UnitPrice 
				ImmediateBuy.TotalPrice = this.settleData.MinPrice;
				ImmediateBuy.UnitPrice = this.settleData.MinPrice;
				ImmediateBuy.RingPrice = this.settleData.MinPrice;

				//跳转到新的确认订单页面
				// this.$router.push('/finalFashion/messageNew')
				this.isLoading = true;
				if(str == "add"){
					this.isLoading = false;
					let options = {
						url: "/Order_Api_CustomizeCart_AddCartCustomizeSingle",
						params: this.params
					}
					let cbok = (res) => {
						this.isShow = true;
					}
					let cbno = (res) => {
						this.isLoading = false;
						this.tips(res.data.message || '网络开小差！')
					}
					this.http.post(options,cbok,cbno);
				}else{
					//页面点击返回键可以展示之前的数据
					let params = {
						id: this.$route.params.id,
						letter: {
							isSelect: this.isSelect,
							lettering: this.lettering
						},
						size: this.Size,
						ProType: "4"
					}
					//finalFashionMessageNew
					let query = this.$route.query;
					query.name = this.$route.name
					this.$router.push({
						name: "finalFashionMessageNew",
						params: params,
						query: query
					})
					this.isLoading = false;
					this.$store.commit('SET_SELECTGOOD',[ImmediateBuy])
				}
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
		z-index: 15;
		display: block;
		&.active{
			display: block;
		}
	}
	.sel-params{
		width: 16.25rem;
		height: 4.38rem;
		border-radius: 0.25rem;
		border: 1px solid #E5E5E5;
		line-height: 4.38rem;
		font-size: 1.5rem;
		color: #999999;
		position: relative;
		border-radius: 0.63rem;
		text-align: center;
		p{
			width: 16.25rem;
			height: 4.38rem;
			border-radius: 0.25rem;
			line-height: 4.38rem;
			font-size: 1.5rem;
			color: #999999;
			border-radius: 0.63rem;
			text-align: center
		}
		.condition-list{
			width: 30rem;
			position: absolute;
			background: #FFFFFF;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
			left: 0;
			margin-top: 1.25rem;
			border-radius: 0.63rem;
			box-sizing: border-box;
			z-index: 99;
			.size-wrap{
				display: flex;
				flex-wrap: wrap;
				max-width: 30.3rem;
				// border: 1px solid #E5E5E5;
				box-sizing: border-box;
				border-radius: 0.63rem;
				overflow: hidden;
				div{
					width: 7.5rem;
					height: 4.38rem;
					color: #333;
					font-size: 1.5rem;
					box-sizing: border-box;
					text-align: center;
					padding: 0;
					margin: 0;
					border-right: 1px solid #E5E5E5;
					border-bottom: 1px solid #E5E5E5;
					&.active{
						background: #FF7B7B;
						color: #ffffff;
					}
				}
			}
		}
	}
    .finalFashionSettlement{
        background: #ffffff;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        // margin-top: 3.75rem;
		box-sizing: border-box;
        .detail_wrap{
			padding: 1.88rem;
			padding-top: 7.88rem;
            display: flex;
            color: #ffffff;
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
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
				.list_wrap{
					box-sizing: border-box;
					box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
					width: 100%;
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
						.total_price{
							padding-left: 1.94rem;
							border-bottom: 1px solid #E5E5E5;
							height: 4.56rem;
							box-sizing: border-box;
							display: flex;
							align-items: center;
							span{
								font-size: 1.5rem;
								color: #333333;
							}
							em{
								font-size: 3rem;
								color: #FF7B7B ;
							}
						}
						.title-distance{
							padding: 1.5rem 1.5% 0;
						}
						.title{
							font-size: 2.25rem;
							display: flex;
							align-items: center;
							padding: 1.94rem 1.5% 0;
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
									color: #999;
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
								padding-bottom: 0.88rem;
								li{
									margin-bottom: 2.5rem;
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
									align-items: center;
									margin-bottom: 1.5rem;
								}
								.finness{
									display: flex;
									flex-wrap: wrap;
									flex: 1;
									em{
										margin-right: 3.63rem;
										display: inline-block;
										border: 1px solid #E5E5E5;
										border-radius: 0.25rem;
										padding: 0 0.81rem;
										height: 4.38rem;
										text-align: center;
										line-height: 4.38rem;
										&.active{
											background: #FF7B7B;
											border: 1px solid #FF7B7B;
											color: #ffffff;
										}
									}
								}
								&.stone,&.final-weight{
									span{
										margin-right: 4em;
									}
								}
								&.style{
									em{
										margin-right: 1.25rem;
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
			padding: 1.88rem 0 3.38rem 0;
			border-top: 1px solid #E5E5E5;
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
			z-index: 99;
			padding-top: 2.5rem;
			border-radius: 0.625rem;
			// animation: shoppingCar 0.5s ease;
			// animation-fill-mode: forwards;
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
