<template>
	<div class="finalFashionShopping2">
		<v-header :header="header" v-if="!showStone" :style="showSelectStyleModel?'z-index:10':''"></v-header>
		<div class="order-content">
			<div class="order-title">
				<ul class="order-title-list">
					<li class="allLin">
						<div class="allLin-left"  @click="allCheck()">
							<div class="group-input">
								<input type="checkbox" name="stone" id='allCheck'/>
								<div class="outCircle" :class="{'outCircleBorder': isAllCheck}">
									<div :class="{'innerCircle': isAllCheck}"></div>
								</div>
							</div>
							<label for="">全选</label>
						</div>
						<div class="allLin-right">品类</div>
					</li>
					<li>产品信息</li>
					<li>小计</li>
					<li>特殊要求</li>
					<li>价格</li>
					<li>操作</li>
				</ul>
			</div>
			<!-- 订单列表 -->
			<div class="order-list">
				<div class="order-detail-wrap">
					<ul class="order-out-wrap" v-for="(item,index) in shoppingData" :key="item.Id + item.StyleIds">
						
						<li class="order-goods" @click="getVal(item.Id)">
							<div class="goods-out-wrap">
								<div class="group-input paddingTop">
									<input type="checkbox" name="stone"/>
									<div class="outCircle" :class="{'outCircleBorder': item.active}">
										<div :class="{'innerCircle': item.active}"></div>
									</div>
								</div>
								<div class="order-inner">
									<template v-if="item.ProType=='10'">
										<img :src="defaultStoneImg" @load='loadingImg(index)'>
									</template>
									<template v-else>
										<img :src="http.imgUrl+item.MainImg+config.carImgSize" alt="" @load='loadingImg(index)' v-show="item.loading">
										<img :src="imgLoading" v-show="!item.loading">
									</template>
									<div class="goods-name">
										<p v-if="['1', '10', '11'].includes(item.ProType)">时尚定制</p>
										<p v-if="item.ProType == '4'">轻奢定制</p>
										<p v-if="item.ProType == '3'">来图定制</p>
										<p v-if="item.ProType == '2'">{{item.ClassName}}</p>
										
										<p v-if="item.ProType != '3'">{{item.StyleName}}</p>
										<p v-if="['1', '4', '11'].includes(item.ProType)">{{item.ClassName}} 【款号#{{item.StyleNo}}】</p>
										<p v-if="item.ProType == '3'">{{item.class}}</p>
										<p v-if="item.ProType == '3'" class="goodsNo">{{item.goldType}} {{item.telco}}</p>
										<p v-if="item.ProType == '10' && item.ClassName">【石号#{{item.ClassName}}】</p>
									</div>
								</div>
							</div>
						</li>
						<li class="order-sku">
							<div class="order-sku-inner" v-for="(list,index1) in item.stoneData" :key="index1" v-if="((item.ProType == '1'||item.ProType == '3'||item.ProType=='10'))&&item.StoneType == '0'">
								<div v-if="item.ProType!='10'"><span>成色：{{list.finness?list.finness:'无'}}</span><span> 尺寸：{{list.handSize?list.handSize:'无'}}</span></div>
								<div :style="{borderBottom: item.ProType=='10'?'none':'' }"><span>净度：{{list.Clarity}}</span><span>切工：{{list.Cut}}</span><span>颜色：{{list.Color}}</span><span>重量：{{list.Weight}}ct</span></div>
							</div>
							<div class="order-sub-stone"  v-else-if="(item.ProType == '4'||item.ProType == '3')&&item.StoneType == '1'"  v-for="(list, index2) in item.stoneData" :key="index2">
								<div>【<span>成色：{{list.finness?list.finness:'无'}}</span><span> 尺寸：{{list.handSize?list.handSize:'无'}}</span>】</div>
								<div class="no_flex">【<span>镶石：{{list.StoneCategory}} </span><span>粒数：{{list.StoneQuantity}}</span><span>重量：{{list.StoneWeight?list.StoneWeight+"ct":"无"}}</span>】</div>
							</div>

							<div class="couples" v-if="item.ProType == '2'" v-for="(list, index3) in item.stoneData" :key="index3">							
								<div>
									<div class="title-couples">{{list.StyleName}}&nbsp;&nbsp;{{list.ClassName}}{{list.StyleCategory}}</div>
									<div><span>成色：{{list.finness?list.finness:'无'}}</span><span> 尺寸：{{list.handSize?list.handSize:'无'}}</span></div>
									<div v-if = "list.Clarity"><span>净度：{{list.Clarity}}</span><span>切工：{{list.Cut}}</span><span>颜色：{{list.Color}}</span><span>重量：{{list.Weight}}ct</span></div>
									<div v-else><span>镶石：{{list.StoneCategory?list.StoneCategory:'无'}} </span><span>粒数：{{list.StoneQuantity?list.StoneQuantity:'无'}}</span><span>重量：{{list.StoneWeight?(list.StoneWeight+'ct'):'无'}}</span></div>
								</div>
							</div>

							<div v-if="item.isNoStone || item.ProType=='11'" class="alone"  v-for="(list, index4) in item.stoneData" :key="index4">
								<div><span>成色：{{list.finness?list.finness:'无'}}</span><span> 尺寸：{{list.handSize?list.handSize:'无'}}</span><span v-if="item.ProType=='11'">镶口：{{list.Insert?list.Insert+'ct':'无'}}</span></div>
							</div>
						</li>
						<li class="order-money">
							<div class="have-stone-money" v-if="item.ProType == '2'">
								<div v-for="(list, index5) in item.stoneData" :key="index5" class="have-stone-money-wrap">
									<div v-if="list.couplePrice">¥{{Number(list.couplePrice).toFixed(2)|money}}</div>
									<div v-else>¥{{Number(0).toFixed(2)|money}}</div>
									<div v-if="list.StoneType===0 || list.StoneType==='0'">（含配石）</div>
								</div>
							</div>
							<div class="order-money-wrap" v-else-if="(item.ProType == '1') && !item.isNoStone && item.StoneType == 0">
								<div>¥{{Number(item.RingPrice).toFixed(2)|money}}</div>
								<div>¥{{Number(item.StonePrice).toFixed(2)|money}}</div>
							</div>
							<div class="order-money-wrap" v-else-if="item.ProType == '3'">
								<div>¥{{Number(item.RingPrice).toFixed(2)|money}}</div>
								<div v-if="!item.isNoStone && item.StoneType == 0">¥{{Number(item.StonePrice).toFixed(2)|money}}</div>
							</div>
							<div v-else-if="item.ProType=='11' || item.ProType=='4'" class="order-money-wrap" ><div>¥{{Number(item.RingPrice).toFixed(2)|money}}</div></div>
							<div v-else-if="item.ProType=='10'" class="order-money-wrap" ><div>¥{{Number(item.StonePrice).toFixed(2)|money}}</div></div>
							<div v-else></div>
						</li>
						<li class="order-user">
							<div class="order-user-wrap">
								<div v-for="(list, index6) in item.stoneData" :key="index6" class="order-user-content">
									<div v-if="handleLettering( list.Lettering )">刻字</div>
									<div v-else>无</div>
								</div>
							</div>
						</li>
						<li class="order-price">
							<div >¥{{Number(item.TotalPrice).toFixed(2)|money}}</div>
						</li>
						<li class="order-status">
							<div @click="del(item.Id)">删除</div>
							<!-- <div @click="againStyle(item.Id)" v-if="item.ProType == '1'||(item.ProType == '2' && item.ClassName!='自由女神')||item.ProType=='11'">重新选款</div> -->
							<!-- <div @click="againStone(item.Id)"  v-if="item.ProType == '1'||(item.ProType == '2' && item.ClassName!='自由女神')||item.ProType=='10'">重新选石</div> -->
							<!-- 只要有配石的情况下，才显示重选配石。来图定制：添加购物车有加配石的话，才显示；否则不显示 ,删除了  && item.ClassName!='自由女神' -->
							<div @click="againStone(item)"  v-if="item.IsAllowMatchStone && (item.ProType == '1' || item.ProType == '3' || (item.ProType == '2') || item.ProType=='10')">重新选石</div>							
							<!-- <div @click="gravity(item.Id)"  v-if="item.ProType == '4'||item.ProType == '3'">重选</div> -->
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 去结算 -->
		<div class="goSettle">
			<div class="goSettle-left">
				<div class="allGoods" @click="allCheck()">
					<div class="group-input">
						<input type="checkbox" name="stone"/>
						<div class="outCircle" :class="{'outCircleBorder': isAllCheck}">
							<div :class="{'innerCircle': isAllCheck}"></div>
						</div>
					</div>
					<label for="">全选</label>
				</div>
				<div @click="delAll()">删除选中商品</div>
			</div>
			<div class="goSettle-right">
				<p>已选<span> {{goodsNum}} </span>件商品</p>
				<p>总价：<span>¥{{totalPrice|money}}</span></p>
				<div class="settle_btn" @click="goAccounts">去结算</div>
			</div>
		</div>
		<v-loading v-show="isLoading"></v-loading>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
		<v-nodata v-show="isNoData" msg="购物车暂无商品哦！"></v-nodata>
		<noInternet v-show="isInternet"></noInternet>
		<!-- :stone="detailList.Rabbet" -->
		<stoneList ref="stoneList" :styleInfo="reSelectCarInfo" @finish="finishStone" @select="selectStone" v-if="showStone"></stoneList>
		<div class="selectStyleModel" v-if="showSelectStyleModel">
			<div class="shadowBg" v-if="showSelectStyleModel"></div>
			<div class="styleSelectArea">
				<div class="close_row">
					<img src="../../assets/close_black.png" alt="" @click="showSelectStyleModel=false">
				</div>
				<div class="context_area">
					<span v-for="style in selectStyleList" :key="style.StyleId" @click="handleReSelectStone(style)" class="styleOptions" :class="{active: style.StyleId === reSelectCarInfo.styleId }">{{style.StyleName}}</span>
				</div>
			</div>
		</div>
		<div id="shadow" v-if="showStone"></div>
	</div>
</template>

<script>
	import header from './header'
	import nodata from 'components/nodata/newnodata'
	import loading from "@/components/isLoading/isloading";
	import promptBox from 'components/promptBox/promptBox'
	import stoneList from "@/components/finalFashion/stoneForCar";
	const imgLoading = require('@/assets/assetsFinal/imgLoading.png')
	const defaultStoneImg = require('@/assets/assetsFinal/default-diamond.png')
	export default {
		data () {
			return {
				imgLoading: imgLoading,
				defaultStoneImg: defaultStoneImg,
				curId: '',
				header:{
					title: '购物车',
					isShow: true,
					return: {
						name: "home",
					},
				},
				isLoading: false,

				isAllCheck: false,
				isInternet:false,

				shoppingData: [],
				totalPrice: 0,
				goodsNum: 0,
				isNoData: false,
				skuData:{
					finness: '',
					handSzie: '',
					rabit:''
				},
				ispromptBox: false,
				msg: {
					text: '',
					time: '',
					show: false
				},
				reSelectCarInfo: {
					styleId: "",
					carId: "",
					stoneType: "",
					isSendStyleId: false
				}, //重新选石的款式Id及购物车Id
				showStone: false,
				hideTitle: true,
				showSelectStyleModel: false,
				selectStyleList: [],  //多个产品信息时，弹窗供用户选择
				isSelectStoneOver: false
			}
		},
		filters: {
			date(val1) {
				if(!val1) return 
				let val = new Date(val1);
				let year = val.getFullYear();
				let month = val.getMonth() + 1; // 记得当前月是要+1的  
					month = month < 10 ? ("0" + month) : month;  
				let dd = val.getDate();
					dd = dd < 10 ? ("0" + dd) : dd;
				let today = year + "年" + month + "月" + dd + '日' 
				return today
			},
		},
		created (){window.vm = this;
			this.getList();
		},
		methods:{
			selectStone(params) {
				//重新更新选择的配石
				this.isLoading = true;
				this.isSelectStoneOver = true;
				let options = { //Api//
					url: "/order_Api_CustomizeCart_UpdateCartStone",
					params: params
				};
				let cbok = res => {
					this.showStone = false;
					this.hideTitle = true;
					this.isLoading = false;
					this.showSelectStyleModel = false;
					this.reSelectCarInfo = {
						styleId: "",
						carId: "",
						stoneType: "",
						isSendStyleId: false,
						shape: ""
					}
					this.$store.commit("SET_SHAPE", "");
					//更新数据
					this.getList();
				};
				let cbno = res => {
					this.isLoading = false;
					this.showSelectStyleModel = false;
					this.reSelectCarInfo = {
						styleId: "",
						carId: "",
						stoneType: "",
						isSendStyleId: false,
						shape: ""
					}
					this.$store.commit("SET_SHAPE", "");
					this.tips(res.data.message||'重新配石失败！')
				};
				let cbnull = res => {
					//没有数据的时候
					this.isLoading = false;
					this.showSelectStyleModel = false;
					this.reSelectCarInfo = {
						styleId: "",
						carId: "",
						stoneType: "",
						isSendStyleId: false,
						shape: ""
					}
					this.$store.commit("SET_SHAPE", "");
				};
				this.http.post(options, cbok, cbno, cbnull);
				// this.stoneItem = params;
				// this.skuPrice.stonePrice = Number(this.stoneItem.tableRow.SalesPrice);
			},
			finishStone() {
				this.showStone = false;
				this.hideTitle = true;
				this.showSelectStyleModel = false;
				this.reSelectCarInfo = {
					styleId: "",
					carId: "",
					stoneType: "",
					isSendStyleId: false,
					shape: ""
				}
				this.$store.commit("SET_SHAPE", "");
			},
			loadingImg (index){//图片加载
				this.shoppingData.forEach((item,index1)=>{
					if(index == index1){
						item.loading = true;
					}
				})
			},
			againStyle(id){//重新选款
				this.shoppingData.forEach(item=>{
					if(item.Id == id){
						if(item.ProType == '1' || item.ProType == '11'){
							let obj = {
								stylePrice: '',//价格
								finness: ''//成色
							}
							this.$store.commit('SET_FASHION',obj)
							this.$store.commit('SET_STYLE', true)
							this.$store.commit('SET_ISSTONEORSTYLE', true)
							this.$store.commit('SET_DETAIL',false)
							this.$store.commit('SET_STONE',false)
							this.$store.commit('SET_SETTLEMENT',false)
							this.$router.push({
								name: 'finalFashion',
								params: {}
							})
						}else if(item.ProType == '2'){
							if (item.ClassName == "情侣对戒") {
								this.$router.push('/couples')
							}
							if (item.ClassName == "套装系列") {
								this.$router.push('/series')								
							}
						}
					}
				})
			},
			handleReSelectStone(style){
				this.reSelectCarInfo = {
					styleId: style.StyleId,
					carId: style.CartId,
					stoneType: style.StoneType,
					isSendStyleId: style.isSendStyleId,
					shape: style.Shape || ""
				};
				this.$store.commit("SET_SHAPE", this.reSelectCarInfo.shape);
				this.showStone = true;
				this.hideTitle = false;
				this.showSelectStyleModel = false;
			},
			againStone(carItem){//重新选石
				//如果是套系（多个款式的那种）
				if(carItem.ProType == "2"){  //这种情况下才传值StyleId
					let selectStyleList = []
					if(carItem.SetItems && carItem.SetItems.length > 0){
						carItem.SetItems.forEach( stone =>{
							if(stone.ProStones && stone.ProStones.length > 0){
								stone.ProStones.forEach( proStone =>{
									if(proStone.StoneId){
										selectStyleList.push({
											StyleId: stone.Id,
											StyleName: stone.StyleName,
											ClassName: stone.ClassName,
											StyleCategory: stone.StyleCategory,
											StoneType: proStone.StoneType,
											CartId: carItem.Id,
											isSendStyleId: true,
											Shape: proStone.Shape
										})
									}
								})
							}
						})
					}
					this.selectStyleList = selectStyleList;
					if(selectStyleList.length == 1){
						this.reSelectCarInfo = {
							styleId: selectStyleList[0].StyleId,
							carId: selectStyleList[0].CartId,
							stoneType: selectStyleList[0].StoneType,
							isSendStyleId: true,
							shape: selectStyleList[0].Shape || ""
						};
						//注意此时要明确形状的选中问题
						this.$store.commit("SET_SHAPE", this.reSelectCarInfo.shape);
						this.showStone = true;
						this.hideTitle = false;
					}else if(selectStyleList.length > 1){
						this.showSelectStyleModel = true;
					}
				}else {
					//自由女神/来图定制/时尚定制/
					//保证有配石的情况下，才给他选石的按钮
					if(carItem.ProStones && carItem.ProStones.length > 0){
						carItem.ProStones.forEach(proStone =>{
							if(proStone.StoneId){
								this.reSelectCarInfo = {
									styleId: carItem.StyleId,
									carId: carItem.Id,
									stoneType: proStone.StoneType,
									isSendStyleId: false,
									shape: proStone.Shape || ""
								};
								this.showStone = true;
								this.hideTitle = false;
								this.$store.commit("SET_SHAPE", this.reSelectCarInfo.shape);
							}
						})
					}
				}
				/*this.shoppingData.forEach(item=>{
					if(item.Id == id){
						if(item.ProType == '1' || item.ProType == '10'){
							let obj = {
								stylePrice: '',
								finness: ''
							}
							this.$store.commit('SET_FASHION',obj)
							this.$store.commit('SET_STYLE', true)
							this.$store.commit('SET_ISSTONEORSTYLE', true)
							this.$store.commit('SET_DETAIL',false)
							this.$store.commit('SET_STONE',false)
							this.$store.commit('SET_SETTLEMENT',false)
							this.$router.push('/finalFashion/stoneFirst')
						}else if(item.ProType == '2'){
							if (item.ClassName == "情侣对戒") {
								this.$router.push('/couples/edit/' + item.StyleId)
							}
							if (item.ClassName == "套装系列") {
								this.$router.push('/series/edit/' + item.StyleId)							
							}
						}
					}
				})*/
			},
			gravity(id){//重选
				this.shoppingData.forEach(item=>{
					if(item.Id == id){
						if(item.ProType == '3'){
							this.$router.push('/toMap/index')
						}else if(item.ProType == '4'){
							this.$router.push('/lightFashion/fashion')
						}
					}
				})
			},
			tips(text){
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
			del (id){
				this.isLoading = true;
				let Ids = [];

				Ids.push(id)
				let options = {
					url: '/order_Api_CustomizeCart_BatchRemove',
					params:{
						Ids:Ids,
					}
				}
				let cbok = (res) => {
					this.isLoading = false;
					this.tips(res.data.message||'你已经成功删除！')
					let len = 0;
					this.shoppingData.forEach((item,index)=>{
						if(item.Id == id){
							this.shoppingData.splice(index,1);
						}
					})
					this.shoppingData.forEach((item,index)=>{
						len ++;
					})
					if(len == 0){
						this.shoppingData = []
						this.isAllCheck = false;
						this.isNoData = true;
					}
					this.calPrice();
				}
				let cbno = (res) => {
					this.isLoading = false;
					this.tips(res.data.message||'删除失败！')
				}
				let cbnull = (res) => {
					this.isLoading = false;
				}
				this.http.post(options,cbok,cbno,cbnull);
			},
			delAll (){//删除所有
				let Ids = [];
				this.shoppingData.forEach(item=>{
					if(item.active){
						Ids.push(item.Id)
					}
				})
				if(Ids.length==0){
					this.tips('你还没有勾选物品！')
					return false
				}
				this.isLoading = true;
				let options = {
					url: '/order_Api_CustomizeCart_BatchRemove',
					params:{
						Ids:Ids,
					}
				}
				let cbok = (res) => {
					this.isLoading = false;
					this.tips(res.data.message||'你已经成功删除！')
					let arrIndex = []
					let len = 0;
					for(let i = 0 ; i < this.shoppingData.length; i ++){
						if(this.shoppingData[i].active){
							this.shoppingData.splice(i,1);
							i--
						}
					}
					this.shoppingData.forEach((item,index)=>{
						len ++;
					})
					if(len == 0){
						this.isAllCheck = false;
						this.isNoData = true;
						this.shoppingData = []
					}
					this.calPrice();
				}
				let cbno = (res) => {
					this.isLoading = false;
					this.isNoData = true;
				}
				let cbnull = (res) => {
					this.isLoading = false;
					this.isNoData = true;
				}
				this.http.post(options,cbok,cbno,cbnull);
			},
			allCheck (){
				this.isAllCheck = !this.isAllCheck;
				this.shoppingData.forEach(item=>{
					if(this.isAllCheck){
						item.active = true
					}else{
						item.active = false
					}
				})
				this.calPrice()
			},
			getVal(id){
				let len = 0;
				this.shoppingData.forEach(item=>{
					if(item.Id == id){
						item.active = !item.active;
					}
					if(item.active){
						len ++
					}
				})
				if(len == this.shoppingData.length){
					this.isAllCheck = true;
				}else{
					this.isAllCheck = false;
				}
				this.calPrice()
			},
			calPrice(){
				let totalPrice = 0;
				let num = 0;
				this.shoppingData.forEach(item=>{
					if(item.active){
						num++
						totalPrice += item.TotalPrice;
						
					}
				})
				this.totalPrice = totalPrice.toFixed(2);
				this.goodsNum = num;
			},
			goAccounts () {
				let len = 0 ; //判断是否已有勾选了
				let selectData = []
				this.shoppingData.forEach(item=>{
					if(item.active) {
						if(item.ProType == '2'){
							
						}
						len ++;
						selectData.push(item);
					}
				})
				if(len == 0 ) {
					this.tips('请选择商品！')
					return false
				}else {
					this.$store.commit('SET_SELECTGOOD',selectData)
					this.$router.push('/finalFashion/messageNew')
				}
			},
			getList(){
				this.isLoading = true;
				let options = {
					url: '/order_Api_CustomizeCart_Cart',
				}
				let that = this;
				let cbok = res => {
					this.isLoading = false;
					let data = res.data.data;
					this.shoppingData = data;
					this.isInternet = false;
					if(data.length == 0){
						this.isNoData = true;
					}else{
						this.shoppingData.forEach(item=>{//SetItems（stones） 只有套装的时候才不为空  stones是单品的时候才会有
							this.$set(item,'active',false)
							this.$set(item, 'StoneType', null)
							if(!that.isSelectStoneOver){
								this.$set(item,'loading',false)
							}else{
								this.$set(item,'loading',true)
							}
							// item.IsAllowMatchStone = false;
							if(item.SetItems&&item.SetItems.length>0){//套装
								let arr = [];
								item.SetItems.forEach(item1=>{
									let str = '',str1 = '',str2 = '',obj = {StoneType: null};
									if(item.SpecialAtts){
										item.SpecialAtts.forEach(item2=>{
											if(item.ClassName == '自由女神'){
												if(item2.StyleAttrName == '成色'){
													obj.finness = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '戒指手寸'||item2.StyleAttrName == '吊坠尺寸'){
													obj.handSize = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '镶口大小'){
													obj.Insert = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '工艺分级'){
													item.telco = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '品类'){
													item.class = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '金托类型'){
													item.goldType = item2.StyleAttrValueName
												}
											}else{
												if(item2.SetItemId == item1.Id){
													if(item2.StyleAttrName == '成色'){
														obj.finness = item2.StyleAttrValueName
													}else if(item2.StyleAttrName == '戒指手寸'||item2.StyleAttrName == '吊坠尺寸'){
														obj.handSize = item2.StyleAttrValueName
														
													}else if(item2.StyleAttrName == '镶口大小'){
														obj.Insert = item2.StyleAttrValueName
													}else if(item2.StyleAttrName == '工艺分级'){
														item.telco = item2.StyleAttrValueName
													}else if(item2.StyleAttrName == '品类'){
														item.class = item2.StyleAttrValueName
													}else if(item2.StyleAttrName == '金托类型'){
														item.goldType = item2.StyleAttrValueName
													}
												}
											}
										})
										if(item1.ProStones&&item1.ProStones.length>0){
											item1.ProStones.forEach(item2=>{
												if(item2.StoneType == 0){//主石 0是有主石 1是没有主石
													item.StoneType = 0
													obj.Id = item2.StoneId;
													obj.Shape = item2.Shape
													obj.Color = item2.Color
													obj.Cleanliness = obj.Clarity
													obj.Clarity = item2.Clarity
													obj.Cut = item2.Cut
													obj.Weight = item2.Weight
													obj.StoneType = 0
												}else {
													if(item.StoneType != 0){
														item.StoneType = 1
													}
													str += item2.StoneCategory + '/'
													str1 += item2.Weight + '/';
													str2 += item2.Quantity + '/'
												}
											})
											obj.StoneCategory = str.slice(0,-1);
											obj.StoneWeight =  str1.slice(0,-1);
											obj.StoneQuantity =  str2.slice(0,-1);
										}
										obj.RingPrice = item1.RingPrice
										obj.StonePrice - item1.StonePrice
										obj.couplePrice = item1.RingPrice + item1.StonePrice
										obj.StyleName = item1.StyleName
										obj.Lettering = item1.Lettering
										obj.StyleCategory = item1.StyleCategory
										obj.ClassName = item1.ClassName
									}
									//配石情况
									if(item1.ProStones && item1.ProStones.length > 0){
										item1.ProStones.forEach(stone =>{
											if(stone.StoneId){
												//提交购物车之前存在配石，才能出现重新配石操作
												item.IsAllowMatchStone = true;
											}
										})
									}
									arr.push(obj)
								})
								item.stoneData = arr
								// if(item.ClassName == '自由女神'){
								// 	let randomArr = [arr[0]]
								// 	item.stoneData = randomArr;
								// }else{
								// 	item.stoneData = arr;
								// }
							}else{
								let str = '',str1 = '',str2 = '';
								let obj = {},arr = [];
								if(item.ProStones&&item.ProStones.length){
									item.ProStones.forEach(item2=>{
										if(item2.StoneType == 1){//主石
											if(item.StoneType !== 0){
												item.StoneType = 1
											}
											str += item2.StoneCategory + '/'
											str1 += item2.Weight?item2.Weight + '/':"";
											str2 += item2.Quantity?item2.Quantity + '/':""
										}else {
											item.StoneType = 0//这个是用来判断是否有z
											obj.Id = item2.StoneId;
											obj.Shape = item2.Shape
											obj.Color = item2.Color
											obj.Clarity = item2.Clarity
											obj.Cleanliness = obj.Clarity
											obj.Cut = item2.Cut
											obj.Weight = item2.Weight
											obj.StoneNo = item2.StoneNo
											obj.Shape = item2.Shape
										}
										if(item2.StoneId){
											//普通的购物车数据，如果有配石，则有【重选配石】的操作
											item.IsAllowMatchStone = true;
										}
									})
								}else{
									item.isNoStone = true;
								}
								
								obj.StoneCategory = str.slice(0,-1);
								obj.StoneWeight =  str1.slice(0,-1);
								obj.StoneQuantity =  str2.slice(0,-1);
								obj.Lettering = item.Lettering
								item.SpecialAtts.forEach(item1=>{
									if(item1.StyleAttrName == '成色'){
										obj.finness = item1.StyleAttrValueName
									}else if(item1.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
										obj.handSize = item1.StyleAttrValueName
									}else if(item1.StyleAttrName == '镶口大小'){
										obj.Insert = item1.StyleAttrValueName
									}else if(item1.StyleAttrName == '工艺分级'){
										item.telco = item1.StyleAttrValueName
									}else if(item1.StyleAttrName == '品类'){
										item.class = item1.StyleAttrValueName
									}else if(item1.StyleAttrName == '金托类型'){
										item.goldType = item1.StyleAttrValueName
									}
								})

								if(item.ProType == '10'){//单买石头
									item.StyleName = `钻石${obj.Shape?('-'+obj.Shape):''}`
									item.ClassName = obj.StoneNo // 石号
								}
								arr.push(obj)
								item.stoneData = arr;
							}
						})
					}
					
				}
				let cbnull = (res) => {
					this.isLoading = false;
					this.isNoData = true;
					this.isInternet = false;
				}
				let cbno = (res) => {
					this.isLoading = false;
					this.isNoData = false;
					this.isInternet = true;
				}
				this.http.get(options,cbok,cbno,cbnull)
			},

			handleLettering (info) {
				if ( info == null ) {
					return false
				} else if ( info.trim() == "") {
					return false
				} else {
					return true
				}
			}
		},
		components: {
			'v-header': header,
			'v-nodata': nodata,
			'v-loading': loading,
			'promptBox': promptBox,
			stoneList
		}
	}
</script>

<style lang="scss">
	.finalFashionShopping2{
		height: 100%;
		width: 100%;
		#shadow{
			height: 100%;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			background: rgba(0,0,0,0.3);
		}
		.selectStyleModel{
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			display: flex;
			justify-content: center;
			align-items: center;
			.shadowBg{
				height: 100%;
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 99;
				background: rgba(0,0,0,0.3);
			}
			.styleSelectArea{
				min-width: 50rem;
				max-width: 80rem;
				z-index: 100;
				background: #ffffff;
				border: 1px solid #e5e5e5;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				padding-bottom: 2rem;
				.close_row{
					text-align: right;
					padding: 0.5rem 1rem;
					img{
						width: 2.75rem;
						height: 2.75rem;
					}
				}
				.context_area{
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: center;
					margin: 0 1rem 1rem;
					.styleOptions{
						border: 1px solid #e5e5e5;
						border-radius: 4px;
						font-size: 1.8rem;
						padding: 1rem 0.5rem;
						margin-right: 0.5rem;
						margin-bottom: 0.5rem;
						&.active{
							color: #fff;
							background: #FF7B7B;
							border: 1px solid #FF7B7B;
						}
					}
				}
			}
		}
		.gray{
			width: 100%;
			height: 1.25rem;
			background: #E5E5E5;
		}
		.group-input{
			position: relative;
			margin-right: 0.64rem;
			input[type="checkbox"]{
				appearance: checkbox;
				z-index: 100;
				opacity: 0;
				position: relative;
				width: 2rem;
				height: 2rem;
			}
			.outCircle{
				width: 2rem;
				height: 2rem;
				border-radius: 100%;
				// background: #ffffff;
				background: transparent;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				border:1px solid #999999;
				top: 3px;
				box-sizing: border-box;
				z-index: 5;
				transition: all 0.2s ease-in-out;
				.innerCircle{
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 100%;
					background: #FF7B7B;
					transition: all 0.2s ease-in-out;
				}
				&.outCircleBorder{
					border:1px solid #FF7B7B;
				}
			}
		}
		.order-content{
			height: 100%;
			padding-top: 6.25rem;
			overflow: scroll;
			.order-title{
				height: 6.25rem;
				color: #333;
				font-size: 1.88rem;
				.order-title-list{
					display: flex;
					height: 6.25rem;
					background: rgba($color: #FFCF5F, $alpha: 0.1);
					li{
						display: flex;
						justify-content: center;
						align-items: center;
						&.allLin{
							display: flex;
							align-items: center;
							position: relative;
							justify-content: space-between;
							.allLin-left{
								margin-right: 5.44rem;
								padding-left: 1.88rem;
								box-sizing: border-box;
								display: flex;
								align-items: center;
							}
							.allLin-right{
								padding-right: 12.06rem;
							}
						}
						&:nth-of-type(1){
							flex: 477;
						}
						&:nth-of-type(2){
							flex: 648;
						}
						&:nth-of-type(3){
							flex: 195;
						}
						&:nth-of-type(4){
							flex: 195;
						}
						&:nth-of-type(5){
							flex: 198;
						}
						&:nth-of-type(6){
							flex: 326;
						}
					}
				}
			}
			.order-list{
				margin-top: 1.31rem;
				margin-bottom: 6.3rem;
				background: #E5E5E5;
				.order-list-title{
					height: 5.13rem;
					color: #333333;
					font-size: 1.88rem;
					background: rgba($color: #FF9999, $alpha: 0.1);
					line-height: 5.13rem;
					padding-left: 1.88rem;
					span{
						margin-right: 2.5rem;
					}
				}
				.order-detail-wrap{
					transition: height 0.5s ease;
					.order-out-wrap{
						background: #ffffff;
						display: flex;
						border-top: 1px solid #E5E5E5;
						margin-bottom: 1.25rem;
						&:last-child{
							border-bottom: 1px solid #E5E5E5;
						}
						li{
							border-right: 1px solid #E5E5E5;
							font-size: 1.5rem;
							color: #333333;
						}
						.order-goods{
							box-sizing: border-box;
							flex: 477;
							.goods-out-wrap{
								padding-left: 2.09rem;
								box-sizing: border-box;
								display: flex;
								align-items: center;
							}
							.paddingTop{
								padding-bottom: 4.55rem;
							}
							.order-inner{
								padding: 1.25rem 0 4.55rem 0;
								box-sizing: border-box;
								display: flex;
								img{
									width: 6.01rem;
									height: 6.01rem;
									animation: scaleimg 0.5s ease;
								}
								.goods-name{
									margin-left: 0.74rem;
									p{
										margin-bottom: 1.25rem;
										&:nth-of-type(1){
											font-weight: 500;
										}
										&:nth-of-type(3){
											color: #999999;
											margin-bottom: 0;
										}
									}
								}
							}
						}
						.order-sku{
							flex: 648;
							display: flex;
							// align-items: center;
							flex-direction: column;
							span{
								margin-right: 1.25rem;
							}
							.order-sku-inner{
								display: flex;
								flex-direction: column;
								flex: 1;
								div{
									flex: 1; 
									display: flex;
									justify-content: flex-start;
									align-items: center;
									padding-left: 3.13rem;
									box-sizing: border-box;
									&:first-child{
										border-bottom: 1px solid #E5E5E5;
									}
								}
							}
							.order-sub-stone{
								flex: 1;
								display: flex;
								flex-direction: column;
								justify-content: center;
								div{
									display: flex;
									justify-content: flex-start;
									align-items: center;
									padding-left: 3.13rem;
									box-sizing: border-box;
									&:first-child{
										margin-bottom: 1.25rem;
									}
									&.no_flex{
										display: inline-block;
									}
								}
							}
							.couples{
								display: flex;
								flex-direction: column;
								justify-content: center;
								font-size: 1.5rem;
								padding: 1.94rem 0;
								padding-left: 3.13rem;
								box-sizing: border-box;
								.title-couples{
									font-weight: 600;
									margin-bottom: 1.25rem;
								}
								&:nth-of-type(n+2){
									border-top: 1px solid #E5E5E5;
								}
							}
							.alone{
								flex: 1;
								display: flex;
								padding-left: 3.13rem;
								box-sizing: border-box;
								align-items: center;
							}
						}
						.order-user{
							box-sizing: border-box;
							flex: 195;
							display: flex;
							// align-items: center;
							// justify-content: center;
							.order-user-wrap{
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;
								flex: 1;
								div{
									display: flex;
									align-items: center;
									justify-content: center;
									height: 100%;
									width: 100%;
									flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
								}
								.order-user-content{
									border-bottom: 1px solid #E5E5E5;
									&:nth-last-child(1){
										border-bottom: 0;
									}
								}
							}
							p{
								text-align: center;
								margin-bottom: 1.25rem;
							}
						}
						.order-money{
							flex: 195;
							display: flex;
							.order-money-wrap{
								display: flex;
								flex-direction: column;
								flex: 1;
								div{
									-webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
									-moz-box-flex: 1; /* OLD - Firefox 19- */
									-webkit-flex: 1; /* Chrome */
									-ms-flex: 1; /* IE 10 */
									flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
									display: flex;
									align-items: center;
									justify-content: center;
									&:nth-of-type(n+2){
										border-top: 1px solid #E5E5E5;
									}
								}
							}
							.have-stone-money{
								display: flex;
								flex-direction: column;
								flex: 1;
								align-items: center;
								justify-content: center;
								.have-stone-money-wrap{
									-webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
									-moz-box-flex: 1; /* OLD - Firefox 19- */
									-webkit-flex: 1; /* Chrome */
									-ms-flex: 1; /* IE 10 */
									flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
									width: 100%;
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									&:nth-of-type(n+2){
										border-top: 1px solid #E5E5E5;
									}
								}
							}
						}
						.order-price{
							box-sizing: border-box;
							flex: 198;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #FF7B7B;
							font-size: 1.5rem;
							p{
								text-align: center;
								margin-bottom: 1.25rem;
								color:  #FF7B7B;
							}
							span{
								color: #999999;
							}
						}
						.order-status{
							box-sizing: border-box;
							flex: 326;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							div{
								margin-top: 1.25rem;
							}
							.order-status-inner{
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								.look-detail{
									color: #4A90E2;
								}
								p{
									margin-bottom: 1.25rem;
									&:last-child{
										margin-bottom: 0;
									}
									&:first-child{
										font-weight: 600;
									}
									&:active{
										opacity: 0.8;
									}
								}
							}
						}
					}
				}
			}
		}
		.goSettle{
			display: flex;
			justify-content: space-between;
			position: absolute;
			padding-left: 1.88rem;
			box-sizing: border-box;
			border-top: 1px solid #E5E5E5;
			width: 100%;
			left: 0;
			bottom: 0;
			height: 6.25rem;
			font-size: 1.88rem;
			color: #333333;
			background: #ffffff;
			z-index: 99;
			.goSettle-left{
				display: flex;
				align-items: center;
				.allGoods{
					display: flex;
					align-items: center;
					margin-right: 2.5rem;
				}
			}
			.goSettle-right{
				display: flex;
				align-items: center;
				span{
					color: #FF7B7B;
				}
				.settle_btn{
					background: #FF7B7B;
					width: 25rem;
					color: #fff;
					text-align: center;
					height: 6.25rem;
					line-height: 6.25rem;
					margin-left: 2.44rem;
					position: relative;
					overflow: hidden;
					&:active{
						opacity: 0.8;
						// &:before{
						// 	content: "";
						// 	display: inline-block;
						// 	width: 2.5rem;
						// 	height: 2.5rem;
						// 	border: 1px solid #ffffff;
						// 	border-radius: 100%;
						// 	position: absolute;
						// 	top: 50%;
						// 	left: 50%;
						// 	transform: translate(-50%,-50%);
						// 	animation: hand 0.2s linear;
						// }
					}
				}
				p:first-child{
					margin-right: 5.06rem;
				}
			}
		}
		@keyframes hand {
			0%{
				width: 2.5rem;
				height: 2.5rem;
			}
			100%{
				width: 25rem;
				height: 25rem;
			}
		}
	}
</style>
