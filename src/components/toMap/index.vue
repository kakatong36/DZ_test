<template>
	<div class="toMapIndex">
		<div class="toMap-main">
			<div class="toMap-content">
				<!-- 上传图片 -->
				<div class="plan-imgs">
					
					<div class="toMap-header">
						<p class="return-btn" @click="$router.push('/')">返回</p>
						<div class="toMapIndexTitle">来图定制</div>
					</div>
					<div class="upload-wrap">
						<div class="upload-inner-wrap" ref="table">
							<ul class="tables-box" ref="ul">
								<li class="cells pic-zst">
									<div class="img-box">
										<div class="remove-img" v-if='imgs.elevation != "" ' @click='imgs.elevation = ""'>&times;</div>
										<div class="img" v-show='imgs.elevation != "" '>
											<img :src="http.imgUrl+imgs.elevation+'_0x0'" />
										</div>
										<v-upload :type='0' @get_img='set_elevation'></v-upload>
										<p class='pic-tit'>正视图</p>
									</div>
								</li>
								<li class="cells pic-cst">
									<div class="img-box">
										<div class="remove-img" v-if='imgs.side_left != "" ' @click='imgs.side_left = "" '>&times;</div>
										<div class="img"  v-show='imgs.side_left != "" ' >
											<img :src="http.imgUrl+imgs.side_left+'_0x0'" />
										</div>
										<v-upload :type='0' @get_img='set_side_left'></v-upload>
										<p class='pic-tit'>侧视图</p>
									</div>
								</li>
								<li class="cells pic-csf">
									<div class="img-box">
										<div class="remove-img" v-if='imgs.side_right != "" ' @click='imgs.side_right = "" '>&times;</div>
										<div class="img" v-show='imgs.side_right != "" '>
											<img :src="http.imgUrl+imgs.side_right+'_0x0'" />
										</div>
										<v-upload :type='0' @get_img='set_side_right'></v-upload>
										<p class='pic-tit'>俯视图</p>
									</div>
								</li>
								<li class="cells pic-xjt" v-for='(item,index) in imgs.parts' :key="index" v-if="imgs.parts && imgs.parts.length">
									<div class="img-box">
										<div class="remove-img" @click='delete_img(index,"parts")'>&times;</div>
										<div class="img">
											<img :src="http.imgUrl+item+'_0x0'" alt="">
										</div>
										<!-- <v-upload :type='0' @get_img='set_elevation'></v-upload> -->
										<p class='pic-tit'>细节图</p>
									</div>
								</li>
								<li class="cells pic-xjt">
									<div class="imgbox">
										<v-upload :type='1' @get_img='set_parts'></v-upload>
										<p class='pic-tit'>细节图</p>
									</div>
								
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 定制参数 -->
				<div class="gray"></div>
				<div class="map-scroll">
					<div class="tomap-property">
						<div class="property-title" v-if="isTabGoldWeight">产品分类</div>
						<div class="first-wrap" v-if="isTabGoldWeight">
							<div @click="choicePro('yes')">
								<p>已知金重</p>
							</div>
							<div @click="choicePro('no')">
								<p>未知金重</p>
							</div>
						</div>
						<div class="out-wrap" v-if="isGoldWeight">
							<div class="property-title">定制参数</div>
							<div class="property-classify">
								定制分类 
								<span>钻石镶嵌</span>
								<span style="display: none">珍珠镶嵌</span>
							</div>
							<div class="contanier-property">
								<div class="inner-wrap">
									<div class="property-sub-title">产品信息</div>
									<div class="property-message">
										<ul class="property-message-box">
											<li class="property-message-cell" style="width:37%;">
												<div class="property-message-title">定制类别</div>
												<ul class="property-message-list" v-if="produceData[0].DataName == 'CustomCategories'" v-for="(cell,index) in produceData" :key="index">
													<li :class="{'active': curId == item.Id}" @click='getOhterData(item,item.Id,item.ParentId)' v-for="item in cell.DataList" :key="item.Id">{{item.Name}}</li>
												</ul>
											</li>
											<li class="property-message-cell" v-for="(item,index) in otherData" :key="index" style="width:28%;">
												<div class="property-message-title">{{item.name}}</div>
												<ul class="property-message-list">
													<li :class="{'active':cell.active,'disabled':cell.isDisabled}" @click="getOwnData(cell,cell.Id,item.name)" v-for="cell in item.DataList" :key="cell.Id">{{cell.Name}}</li>
												</ul>
											</li>
										</ul>
									</div>
								</div>
								<div class="gray"></div>
								<div class="property-base-message" @click="cancelCondition($event)">
									<p class="base-message-title">基本信息</p>
									<!-- 未填写的时候 -->
									<div class="no-base-message" v-show="!isBaseMessage" @click="write_message">
										<p><span>+</span><em>填写信息</em></p>
									</div>
									<!-- 填写信息 -->
									<div class="sure-base-message" v-show="isBaseMessage">
										<ul class="sure-base-wrap">									
											<li>
												<div class="group-input">
													<label for="Condition">金属成色</label>
													<div class="sel-params condition-container">
														<p @click="isShowCondition = !isShowCondition;isShowSubStone = false; isShowSize = false" class="condition-container">{{params.Condition}}</p>
														<transition name="opacityLeave">
															<div class="condition-list  condition-container" v-if="isShowCondition">
																<ul class="condition-container">
																	<li class="condition-container" :class="{'active':item.active,'disabled':item.isDisabled}" @click="getCondition(item,item.Id,$event)" :key="index" v-for="(item,index) in skuData">{{item.Name}}</li>
																</ul>
															</div>
														</transition>
													</div>
												</div>
											</li>
											<li>
												<div class="group-input">
													<label for="Size">尺寸大小</label>
													<div class="sel-params">
														<p @click="isShowSize =!isShowSize;isShowCondition = false; isShowSubStone = false" class="size-container">{{params.Size}}</p>
														<transition name="opacityLeave">
															<div class="condition-list" v-show="isShowSize">
																<ul class="size-container">
																	<li class="size-container" :class="{'active':item.active}" @click="getSize(item.Id,$event)" :key="index" v-for="(item,index) in handData">{{item.Name}}</li>
																</ul>
															</div>
														</transition>
													</div>
												</div>
											</li>
											<li v-if="isNoKownGoldWeight">
												<div class="group-input">
													<label for="Lettering">刻字要求</label>
													<div class="input">
														<input type="text" placeholder="填写刻字" id="Lettering" v-model="params.Lettering">
													</div>
												</div>
											</li>
											<li v-if="isKownGoldWeight">
												<div class="group-input">
													<label for="GoldWeight">金重</label>
													<div class="input">
														<input type="text" placeholder="填写款式金重" id="GoldWeight" v-model="params.GoldWeight">
													</div>
												</div>
											</li>
											<li>
												<div class="group-input">
													<label for="AuxiliaryStone">辅石类别<span>如多种类别用“/”隔开</span></label>
													<div class="sel-params">
														<p @click="isShowSubStone = !isShowSubStone; isShowSize = false;isShowCondition = false" class="stone-container">{{params.AuxiliaryStone}}</p>
														<div class="input hideInput" v-show="isSubStoneInput">
															<input type="text" placeholder="填写辅石类别" id="" v-model="params.otherContent">
															<!-- <div class="sure-button" @click="isSubStoneInput = false;">确定</div> -->
														</div>
														<transition name="opacityLeave">
															<div class="condition-list" v-show="isShowSubStone">
																<ul class="stone-container">
																	<li class="stone-container" :class="{'active':item.active,'disabled':item.isDisabled}" @click="getSubStone(item,item.Id)" :key="index" v-for="(item,index) in subStoneData">{{item.Name}}</li>
																</ul>
															</div>
														</transition>
													</div>
												</div>
											</li>
											<li>
												<div class="group-input">
													<label for="AuxiliaryStoneNum">辅石总粒数<span>如多种类别用“/”隔开</span></label>
													<div class="input">
														<input type="text" placeholder="填写数量" id="AuxiliaryStoneNum" v-model="params.AuxiliaryStoneNum" :disabled="skuHasPrice.accStoneList && skuHasPrice.accStoneList.length==0?true:false">
													</div>
												</div>
											</li>
											<li v-if="isKownGoldWeight">
												<div class="group-input">
													<label for="AuxiliaryStoneWeight">辅石总重<span>如多种类别用“/”隔开</span></label>
													<div class="input">
														<input type="text" placeholder="填写总重" id="AuxiliaryStoneWeight" v-model="params.AuxiliaryStoneWeight" :disabled="skuHasPrice.accStoneList && skuHasPrice.accStoneList.length==0?true:false">
													</div>
												</div>
											</li>
											<li v-if="isNoKownGoldWeight">
												<div class="group-input">
												</div>
											</li>
										</ul>
									</div>
									<div class="sure-base-btn" v-show="isBaseMessage">
										<div class="sure-base-price"  v-show="isSure"><span>总价</span><em>¥{{Number(baseTotalPrice?baseTotalPrice:0).toFixed(2) | money}}</em></div>
										
										<div class="group-input" v-if="isKownGoldWeight">
											<div class="input">
												<label for="Lettering">备注 : </label>
												<input type="text" placeholder="特属配石信息等备注" id="Lettering" v-model="params.Lettering">
											</div>
										</div>

										<div class="sure-base-button" @click="sure_message">确定基本信息</div>
									</div>
									<div class="gray"></div>
								</div>
								<div class="property-base-message property-stone-message">
									<p class="base-message-title">配石信息</p>
									<!-- 未填写的时候 -->
									<div class="no-base-message" v-show="!isAddStone">
										<p @click="addStone()"><span>+</span><em>添加配石</em></p>
									</div>
									<p class="stone-tips" v-show="!isAddStone">* 如无配石请直接提交</p>
									<div class="have-stone" v-show="isAddStone">
										<ul class="cell_value">
											<li><span>形状</span><em>{{stoneData.Shape}}</em></li>
											<li><span>证书</span><em>{{stoneData.CertificateType}}</em></li>
											<li><span>重量</span><em>{{stoneData.Weight}}ct</em></li>
											<li><span>颜色</span><em>{{stoneData.Color}}</em></li>
											<li><span>净度</span><em>{{stoneData.Cleanliness}}</em></li>
											<li><span>切工</span><em>{{stoneData.Cut}}</em></li>
											<li><span>荧光</span><em>{{stoneData.Fluorescence?stoneData.Fluorescence:'None'}}</em></li>
										</ul>
									</div>
									<div class="sure-base-btn" v-show="isAddStone">
										<div class="angin-stone" @click="anginStone()">重选配石</div>
										<div class="sure-base-price"><span>总价</span><em v-if="stoneData.SalesPrice">¥{{stoneData.SalesPrice.toFixed(2) | money}}</em></div>
										<div class="sure-base-button">确定配石信息</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="now-buy-btn-wrap" v-if="!isTabGoldWeight">
						<p class="tomap-total-price"><em>总计</em><span>¥{{totalPrice.toFixed(2) | money}}</span></p>
						<div class="buy-btn">
							<div @click='getGoldWeight()'>加入购物车</div>
							<div @click="getGoldWeight('now')">立即购买</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
		<v-loading v-show="isloading"></v-loading>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

	import upload from 'components/upload/upload';
	import promptBox from 'components/promptBox/promptBox'
	import loading from "@/components/isLoading/isloading";
	const categoryId = "22f8971f-86d2-427e-8b9d-66b5a73498bc"  //钻石镶嵌的Id，用于调用接口并实时更新sku信息能否使用
	export default {
		route: {
			canReuse: false,
		},
		data () {
			return {
				imgs:{
					elevation:'',
					side_left:'',
					side_right:'',
					parts:[]
				},
				isShow: false,
				isloading: false,
				isAddStone: false,
				isBaseMessage: false,
				isSure: false,
				isShowCondition: false,
				isShowSize: false,
				isFirstStep: false,
				isGold: false,
				isTelco: false,
				isShowSubStone: false,
				otherActive: false,
				isSubStoneInput: false,

				produceData: [],
				curId: '',
				otherData: [],
				stoneData: {},
				params : {
					CategoryId: '',
					CustomCategories: '',
					KindredCategory: '',
					CraftCategory: '',
					Condition: '',
					Size:"",
					AuxiliaryStone: "",
					AuxiliaryStoneNum: "",
					Lettering: '',
					baseTotalPrice: '',
					StoneSize: 0,//主石大小
					otherContent: '',
					stoneText: '',

					GoldWeight: '', //after 金重 
					AuxiliaryStoneWeight: '' //after 辅石总重

				},
				baseTotalPrice: 0,
				totalPrice: 0,
				skuData: [],
				handData: [],
				allData: [],
				subStoneData: [],
				stoneText: '',

				ispromptBox: false,
				msg: {
					text: '',
					time: '',
					show: false
				},

				cellsLength: '',//这个是判断是图片的长度
				curImgId: '',


				isGoldWeight: false,
				isTabGoldWeight: true,
				isKownGoldWeight: false,
				isNoKownGoldWeight: false,
				BasicCostList: [],  //基本信息是否有配置价格
				DeputyStoneList: [],	//副石是否有配置价格
				skuHasPrice: {
					cateName: "",           //定制分类
					processCateList: [], 	//工艺类别
					accStoneList: [],		//辅石列表
					conditionList: []       //成色
				}
			}
		},
		computed: {
			...mapState({
				x_toMap_state: state => state.toMap.state,
				x_toMap_isSelected: state => state.toMap.isSelected
			})
		},
		filters: {
			
		},
		components:{
			'v-upload': upload,
			'v-loading': loading,
			'promptBox':promptBox
		},
		created () {window.vm = this;
			this.getInit();
			if(this.$route.params){
				if(this.$route.params.skuHasPrice){
					this.skuHasPrice = this.$route.params.skuHasPrice;
				}
				if(this.$route.params.BasicCostList){
					this.BasicCostList = this.$route.params.BasicCostList
				}
				if(this.$route.params.DeputyStoneList){
					this.DeputyStoneList = this.$route.params.DeputyStoneList
				}
			}
			if(!this.BasicCostList || (this.BasicCostList && this.BasicCostList.length == 0)){
				this.realValidate();
			}
			if(this.$route.params.tableRow){
				if(this.$route.params.tableRow.Id){
					this.stoneData = this.$route.params.tableRow
					this.isAddStone = true;
				}
			}else{
				this.stoneData = {}
			}
			if(this.$route.params.baseMessage){ //选石页面过来的 / 确认订单页面过来的
				let formData = this.$route.params.baseMessage;
				if(this.$route.params.baseMessage.AuxiliaryStone){
					this.params.CraftCategory = this.$route.params.baseMessage.CraftCategory
					this.isBaseMessage = true;
					this.isFirstStep = true;
					this.baseTotalPrice = this.$route.params.baseMessage.baseTotalPrice
				}
				this.params.Lettering = this.$route.params.baseMessage.Lettering
				this.params.stoneText = this.$route.params.baseMessage.stoneText
				if(this.$route.params.imgs){
					this.imgs = this.$route.params.imgs
				}

				
				//已知金重
				if(this.$route.params.baseMessage.GoldWeight){
					this.params.GoldWeight = this.$route.params.baseMessage.GoldWeight;
				}
				if(this.$route.params.baseMessage.AuxiliaryStoneWeight){
					this.params.AuxiliaryStoneWeight = this.$route.params.baseMessage.AuxiliaryStoneWeight;
				}
			}else{
				this.f_toMap_isSelected(false)
			}


			if(this.x_toMap_isSelected){
				this.isGoldWeight = this.x_toMap_state.isGoldWeight;
				this.isTabGoldWeight = this.x_toMap_state.isTabGoldWeight;
				this.isKownGoldWeight = this.x_toMap_state.isKownGoldWeight;
				this.isNoKownGoldWeight = this.x_toMap_state.isNoKownGoldWeight;
			}
		},
		methods: {
			...mapMutations({
				f_toMap_state: 'toMap_state',
				f_toMap_isSelected: 'toMap_isSelected'
			}),

			/*正视图*/
			set_elevation(data){
				this.curImgId = data.Id
				this.imgs.elevation = data.Id;
			},
			/*左侧图*/
			set_side_left(data){
				this.imgs.side_left = data.Id;
			},
			/*右侧图*/	
			set_side_right(data){
				this.imgs.side_right = data.Id;
			},
			/*细节图*/
			set_parts(data){
				this.imgs.parts = this.imgs.parts.concat(data.Id);

				// if(this.imgs.parts.length>=2){
				// 	this.$refs.table.style['justify-content'] = 'flex-start';//记得center属性会影响到滚动布局 认为添加这个属性
				// }else{
				// 	this.$refs.table.style['justify-content'] = 'center';
				// }
				this.$refs.table.style['justify-content'] = 'flex-start';
				this.$nextTick( () => {  //图片列表栏始终左对齐
					this.$refs.table.scrollBy(document.body.scrollWidth, 0)					
				})

			},
			/*删除图片*/
			delete_img(index){
				this.imgs.parts.splice(index,1);

				// if(this.imgs.parts.length>=2){
				// 	this.$refs.table.style['justify-content'] = 'flex-start';//记得center属性会影响到滚动布局 认为添加这个属性
				// }else{
				// 	this.$refs.table.style['justify-content'] = 'center';
				// }
				if(this.imgs.parts.length < 2){
					this.$refs.table.style['justify-content'] = 'center';
				}

			},
			anginStone (){
				this.params.baseTotalPrice = this.params.baseTotalPrice || this.baseTotalPrice
				this.$router.push({
					name:'toMapStone',
					params:{
						index:this.$route.params.index,
						baseMessage: this.params,
						skuHasPrice: this.skuHasPrice,
						BasicCostList: this.BasicCostList,
						DeputyStoneList: this.DeputyStoneList,
						imgs: this.imgs,
						tableRow: this.$route.params.tableRow,
						index: this.$route.params.index
					}
				})
			},
			continueShpping () {
				this.isShow = false;
				this.$router.push('/');
				//  window.location.reload()
			},
			addStone() {
				let len = 0, len1 = 0;
				let lenStone = 0, lenStoneNum = 0 ,flag = false;// 判断辅石的填写是否与辅石的填写的数量份一样
				this.otherData.forEach(item=>{
					item.DataList.forEach(item1=>{
						if(item1.active){
							//before
							// if(item.name == '金托类别'){
							// 	len ++;
							// }else if(item.name == '工艺类别'){
							// 	len1 ++
							// }
							//after 共有四处需要修改
							if (this.isKownGoldWeight) {
								len ++;
								if(item.name == '工艺类别'){
									len1 ++
								}
							} else if (this.isNoKownGoldWeight) {
								if(item.name == '金托类别'){
									len ++;
								}else if(item.name == '工艺类别'){
									len1 ++
								}
							}
						}else {
							if (this.isKownGoldWeight) {
								len ++;
							} 
						}
					})
				});
				if(len&&len1&&this.curId&&this.isSure&&this.isBaseMessage){
					this.params.baseTotalPrice = this.baseTotalPrice;
					this.$router.push({
						name: "toMapStone",
						params:{
							baseMessage: this.params,
							skuHasPrice: this.skuHasPrice,
							BasicCostList: this.BasicCostList,
							DeputyStoneList: this.DeputyStoneList,
							imgs: this.imgs
						}
					})
				}else{
					if(!this.curId){
						this.tips('请选择定制类别！')
					}else if(!len){
						this.tips('请选择金托类别！')
					}else if(!len1){
						this.tips('请选择工艺类别！')
					}else if(!this.isBaseMessage){
						this.tips('请填写基本信息！')
					}else if(!this.isSure){
						this.tips('请先点击确认基本信息！')
					}
				}
			},
			sumbitTotal (){
				let stoneprice = 0;
				let baseTotalPrice = 0;
				if(!this.stoneData.SalesPrice){
					stoneprice = 0;
				}else{
					stoneprice = this.stoneData.SalesPrice
				}
				if(!this.baseTotalPrice){
					baseTotalPrice = 0
				}else{
					baseTotalPrice = this.baseTotalPrice
				}
				this.totalPrice = baseTotalPrice + stoneprice;
			},
			// 获取金重
			getGoldWeight (type){
				let options = {
					url: '/system_Api_GoldWeight_Get',
					params: this.params
				}
				let cbok = (res) => {
					let data = res.data.data;
					this.joinShoppingCar(data,type)
				}
				let len = 0, len1 = 0;
				this.otherData.forEach(item=>{
					item.DataList.forEach(item1=>{
						if(item1.active){
							//before
							// if(item.name == '金托类别'){
							// 	len ++;
							// }else if(item.name == '工艺类别'){
							// 	len1 ++
							// }
							//after 共有四处需要修改
							if (this.isKownGoldWeight) {
								len ++;
								if(item.name == '工艺类别'){
									len1 ++
								}
							} else if (this.isNoKownGoldWeight) {
								if(item.name == '金托类别'){
									len ++;
								}else if(item.name == '工艺类别'){
									len1 ++
								}
							}
						}else {
							if (this.isKownGoldWeight) {
								len ++;
							} 
						}
					})
				})
				// 再次判断辅石和数量的是否一致（防止用户再次改变）
				let lenStone = 0, lenStoneNum = 0 , flag = false,stone = '';// 判断辅石的填写是否与辅石的填写的数量份一样
				let stoneSub;
				let indexFirst = this.params.AuxiliaryStone.indexOf('/');//
				let indexLast = this.params.AuxiliaryStone.lastIndexOf('/');
				stone = this.params.AuxiliaryStone;
				//石头
				if(indexFirst >= 0){//先判断是否存在其他这个
					stone = this.params.AuxiliaryStone.split('/');
					if(this.params.AuxiliaryStone.indexOf('其他') >= 0){
						for(let i = 0;i < stone.length; i ++){
							if(stone[i] == "其他"){
								stone[i] = "钻石"
							}
						}
					}
					stoneSub = stone.join('/');
					lenStone = stone.length;//这是辅石的长度
				}else {
					if(stone&&stone != '选择辅石'){
						if(this.params.AuxiliaryStone.indexOf('其他') >= 0){
							stoneSub = "钻石"
						}else{
							stoneSub = stone;
						}
						lenStone = 1
					}else{
						stoneSub = "";
						lenStone = 0;
					}
				}
				if(lenStone==lenStoneNum){
					flag = true
				}
				//输入的数量
				let indexFirstNum = this.params.AuxiliaryStoneNum.indexOf('/');//
				if(indexFirstNum>=0){
					let arrTemp = [];//去掉空的数据 防止用户输入  '1/'
					arrTemp = this.params.AuxiliaryStoneNum.split('/');
					arrTemp.forEach(item=>{
						if(item){
							lenStoneNum++
						}
					})
				}else{
					if(this.params.AuxiliaryStoneNum){
						lenStoneNum = 1;
					}else{
						lenStoneNum = 0;
					}
				}
				if(len&&len1&&this.curId&&this.isSure&&this.isBaseMessage&&this.imgs.elevation&&this.imgs.side_left&&this.imgs.side_right){
					//before
					// this.http.get(options,cbok)
					//after
					if (this.isKownGoldWeight) {
						let data = this.params.GoldWeight;
						this.joinShoppingCar(data,type) //入参：金重、提交至
					} 
					if (this.isNoKownGoldWeight) {
						this.http.get(options,cbok)
					}
				}else{
					if(!this.imgs.elevation){
						this.tips('请选择正视图！')
					}else if(!this.imgs.side_left){
						this.tips('请选择侧视图！')
					}else if(!this.imgs.side_right){
						this.tips('请选择俯视图！')
					}else if(!this.curId){
						this.tips('请选择定制类别！')
					}else if(!len){
						this.tips('请选择金托类别！')
					}else if(!len1){
						this.tips('请选择工艺类别！')
					}else if(!this.isBaseMessage){
						this.tips('请填写基本信息！')
					}else if(!this.isSure){
						this.tips('请先点击确认基本信息！')
					}
				}
			},
			getInit () {
				this.isloading = true;
				let options = {
					url: '/purchase_Api_FashionStyle_CustomCategoriesInit'
				}
				let cbok = (res) => {
					this.isloading = false;
					let data = res.data.data.Data;
					this.produceData = data;
					if(this.$route.params.baseMessage){
						let formData = this.$route.params.baseMessage;
						if(this.$route.params.baseMessage.CategoryId){

							this.produceData.forEach(item=>{
								if(item.DataName == "CustomCategories"){
									item.DataList.forEach(item1=>{
										if(item1.Name == formData.CustomCategories){
											this.curId = item1.Id;
											this.getOhterData(item1,item1.Id,item1.ParentId,true)
											this.params.Condition = this.$route.params.baseMessage.Condition
											this.params.Size = this.$route.params.baseMessage.Size
											this.params.AuxiliaryStone = this.$route.params.baseMessage.AuxiliaryStone
										}
									})
								}
							})
						}
					}
				}
				let cbnull = (res) => {
					this.isloading = false;
				}
				let cbno = (res) => {
					this.isloading = false;
				}
				this.http.get(options,cbok,cbno);
			},
			getCondition(cond,id,event){
				if(cond.isDisabled){
					return 
				}
				event.stopPropagation();
				if(this.skuData && this.skuData.length > 0){
					this.skuData.forEach(item=>{
						if(item.Id == id){
							item.active = true
							this.params.Condition = item.Name;
						}else{
							item.active = false
						}
					})
				}
				this.isShowCondition = false;
				this.isSure = false;//再次验证防用户是否有改变输入
			},
			cancelCondition(event){
				// let e = event.target;
				// if(e.className == "condition-container"){
				// 	 	this.isShowCondition = true;
				// }else if(e.className == "stone-container"){
				// 		this.isShowSubStone = true;
				// }else if (e.className == "size-container"){
				// 		this.isShowSize = true;	
				// }else{
				// 	 	this.isShowCondition = false;
				// 		this.isShowSubStone = false;
				// 		this.isShowSize = false;
				// }
			},
			getSize(id,event){
				event.stopPropagation();
				this.handData.forEach(item=>{
					if(item.Id == id){
						item.active = true
						this.params.Size = item.Name;
					}else{
						item.active = false
					}
				})
				this.isShowSize = false;
				this.isSure = false;//再次验证防用户是否有改变输入
			},
			//获取镶石
			getSubStone (subStone,id){
				if(subStone.isDisabled){
					return 
				}
				this.otherActive = false;
				let stoneText = '', arr = [];
				let flag = false;
				this.subStoneData.forEach(item=>{
					if(item.Id == id){
						item.active = !item.active;
						if(id == 'other'){
							this.isSubStoneInput  = !this.isSubStoneInput;
						}
						if(item.active) {
							this.params.stoneText += item.Name + '/';						
						}else{
							arr = this.params.stoneText.split('/');
							arr.forEach((item1,index) => {
								if(item1 == item.Name){
									arr.splice(index,1);
								}
							})
							this.params.stoneText = arr.join('/')
						}
					}
					if(item.active){
						flag = true
					}
				})
				if(!flag){
					this.params.AuxiliaryStone = '选择辅石'
				}else{
					this.params.AuxiliaryStone = this.params.stoneText.slice(0,-1);
				}
				this.isShowSubStone = false;
				this.isSure = false;//再次验证防用户是否有改变输入
			},
			getOhterData (cateItem,id,parentId,lastPage){
				//注意清空基本信息和配石信息两大模块
				if(!lastPage){
					this.clearBasicAndSubStone();
				}
				this.curId = id;
				this.isloading = true;
				this.params.CategoryId = parentId;
				//清空数据
				this.params.Size = '选择尺寸'
				this.params.Condition = '选择参数'
				this.params.AuxiliaryStone = '选择辅石'
				this.isShowCondition = false;
				this.isSubStoneInput = false;
				this.isSure = false;
				this.isShowSize = false;
				this.isShowSubStone = false;
				this.params.AuxiliaryStoneNum = ''
				this.handData.forEach(item=>{
					item.active = false;
				})
				this.subStoneData.forEach(item=>{
					item.active = false;
					item.isDisabled = false;
				})
				this.skuData.forEach(item=>{
					item.active = false;
					item.isDisabled = false;
				})
				this.produceData.forEach(item=>{
					if(item.DataName == "CustomCategories"){
						item.DataList.forEach(item1=>{
							if(item1.Id == id){
								this.params.CustomCategories = item1.Name;
							}
						})
					}
				})
				if(this.$route.params.baseMessage && lastPage){
					this.isSure = true;

				}else{
					this.params.stoneText = ""
				}
				//处理工艺类别/辅石/手寸/成色，选项是否禁用
				let cateItemName = cateItem.Name;
				if(cateItem.Name && cateItem.Name.includes("情侣戒")){
					cateItemName = "情侣戒"
				}
				this.skuHasPrice.cateName = cateItemName;
				if(this.BasicCostList && this.BasicCostList.length>0){
					this.BasicCostList.forEach(basic =>{
						if(this.skuHasPrice.cateName && basic.CateName == this.skuHasPrice.cateName){
							//工艺类别（已配置价格的选项）
							if(this.skuHasPrice && this.skuHasPrice.processCateList){
								if(this.skuHasPrice.processCateList.indexOf(basic.Technology) == -1){
									this.skuHasPrice.processCateList.push(basic.Technology)
								}
							}
						}
					})
				}
				//1.如果辅石都不符合条件，则禁用辅石数量和重量
				if(this.DeputyStoneList && this.DeputyStoneList.length > 0){
					this.DeputyStoneList.forEach(subStone =>{
						if(!this.skuHasPrice.accStoneList.includes(subStone.Name)){
							this.skuHasPrice.accStoneList.push(subStone.Name)
						}
					})
				}
				// this.skuHasPrice.accStoneList = ["红宝石"]; //hidden
				let options = {
					url: '/purchase_Api_FashionStyle_OtherInit',
					params: {
						CategoryId: parentId
					}
				}
				let cbok = (res) => {
					this.isloading = false;
					let data = res.data.data.Data;
					this.allData = data
					this.otherData = [];
					data.forEach(item=>{
						if(item.DataName == 'GoldoType' || item.DataName == 'CraftCategory') {
							if(item.DataName == 'GoldoType'){
								//brfore
								// item.name = '金托类别'
								// this.otherData.push(item);
								//after
								if (this.isKownGoldWeight) {
									item.name = ''
								} else if (this.isNoKownGoldWeight) {
									item.name = '金托类别'
									this.otherData.push(item);
								}

							}else if(item.DataName == 'CraftCategory'){
								item.name = '工艺类别'
							}
							item.DataList.forEach(item1 =>{
								this.$set(item1,'active', false);
								this.$set(item1,'isDisabled', false); //是否禁用，默认不禁用
								//仅处理工艺类别
								if(item.DataName == 'CraftCategory'){
									//skuHasPrice.processCateList 已经配置了价格的
									if(item1.Name && !this.skuHasPrice.processCateList.includes(item1.Name)){
										//请求到的工艺要求数据中有没有配置价格的，就禁用展示
										this.$set(item1,'isDisabled', true);
									}
								}
								if(this.$route.params.baseMessage && lastPage){//是从石头跳转回来的标志
									let formData = this.$route.params.baseMessage;
									
									if(this.$route.params.baseMessage.KindredCategory){
										this.params.KindredCategory = this.$route.params.baseMessage.KindredCategory
										if(item1.Name == formData.KindredCategory){
											item1.active = true;
										}
									}
									if(this.$route.params.baseMessage.CraftCategory){
										this.params.CraftCategory = this.$route.params.baseMessage.CraftCategory
										if(item1.Name == formData.CraftCategory){
											item1.active = true;
										}
									}
									//处理成色的显示隐藏
									if(this.skuData && this.skuData.length>0){
										this.skuData.forEach(sku =>{
											this.$set(sku,'isDisabled', false); //是否禁用，默认不禁用
											if(sku.DataName == "Condition"){
												if(sku.Name && !this.skuHasPrice.conditionList.includes(sku.Name)){
													this.$set(sku,'isDisabled', true); //是否禁用，默认不禁用
												}
											}
										})
									}
								}
							})
							
						}else if(item.DataName == 'Condition'||item.DataName == 'Size'){
							item.DataList.forEach(item1=>{
								item1.DataName = item.DataName
								this.$set(item1,'active',false);
								this.$set(item1,'isDisabled',false);
								if(this.$route.params.baseMessage){
									let formData = this.$route.params.baseMessage;
									if(this.$route.params.baseMessage.Condition && lastPage){
										if(item1.Name == formData.Condition || item1.Name == formData.Size){
											item1.active = true;
										}
									}
								}
							})
							if(item.DataName == 'Condition'){
								this.skuData = item.DataList
							}else{
								this.handData = item.DataList
							}
						}else if(item.DataName == 'AuxiliaryStone'){
							item.DataList.push({//添加其他按钮
								Name: '其他',
								Id: 'other',
							})
							let isDisabledOther = true;
							item.DataList.forEach(item1=>{
								item1.DataName = item.DataName
								this.$set(item1,'active',false);
								this.$set(item1,'isDisabled',false);
								//处理辅石的禁用，没有钻石时，其他选项也禁用skuHasPrice.accStoneList
								if(this.skuHasPrice.accStoneList && !this.skuHasPrice.accStoneList.includes(item1.Name)){
									this.$set(item1,'isDisabled',true);
								}else{
									//已经配置价格的
									if(item1.Name == "钻石"){
										isDisabledOther = false;
									}
								}
								if(item1.Name == "其他"){
									this.$set(item1,'isDisabled',isDisabledOther);
								}
								if(this.$route.params.baseMessage && lastPage){
									if(this.$route.params.baseMessage.AuxiliaryStone){
										this.params.AuxiliaryStoneNum = this.$route.params.baseMessage.AuxiliaryStoneNum
										let formData = this.$route.params.baseMessage.AuxiliaryStone;
										let stoneTempData = ''
										if(formData.indexOf('/')>=0){
											stoneTempData = formData.split('/');
											stoneTempData.forEach(item3=>{
												if(item3 == item1.Name){
													item1.active = true;
													if(item3 == '其他'){
														this.isSubStoneInput = true;
														this.params.otherContent = this.$route.params.baseMessage.otherContent
													}
												}
											})
										}else {
											if(formData == item1.Name){
												item1.active = true;
												if(formData == '其他'){
													this.isSubStoneInput = true;
													this.params.otherContent = this.$route.params.baseMessage.otherContent
												}
											}
										}
										if(item1.Name == formData.AuxiliaryStone){
											item1.active = true;
										}
									}
								}
							})

							this.subStoneData=item.DataList
						}
					})
					data.forEach(item=>{
						if(item.DataName == 'CraftCategory' ){
							this.otherData.push(item);
						}
					})
					this.sumbitTotal();
				}
				let cbnull = (res) => {
					this.isloading = false;
				}
				this.http.get(options,cbok,cbnull)
			},
			getOwnData (otherItem,id,name) {//选择工艺 金拓
				if(otherItem.isDisabled){
					return 
				}
				let len1 = 0, len2 = false;
				//处理成色的禁用与否
				if(this.BasicCostList && this.BasicCostList.length > 0){
					this.BasicCostList.forEach(basic => {
						if(basic.CateName == this.skuHasPrice.cateName && basic.Technology== otherItem.Name){
							if(this.skuHasPrice.conditionList.indexOf(otherItem.Name) == -1){
								this.skuHasPrice.conditionList.push(basic.Condition)
							}
						}
					})
				}
				if(this.skuData && this.skuData.length>0){
					this.skuData.forEach(sku =>{
						this.$set(sku,'isDisabled', false); //是否禁用，默认不禁用
						if(sku.DataName == "Condition"){
							if(sku.Name && !this.skuHasPrice.conditionList.includes(sku.Name)){
								this.$set(sku,'isDisabled', true); //是否禁用，默认不禁用
							}
						}
					})
				}
				this.otherData.forEach(item=>{
					item.DataList.forEach(item1 =>{
						if(item.name == name){
							if(item1.Id == id) {
								item1.active = true;
							}else{
								item1.active = false;
							}
							if(name == '金托类别'){
								if(item1.active){
									this.params.KindredCategory = item1.Name
								}
							}else if(name == '工艺类别'){
								if(item1.active){
									this.params.CraftCategory  = item1.Name
								}
							}
						}
						if(item1.active){
							len1 ++
						}
					})
				})
				if(len1 == 2 && this.isSure){
					this.sure_message();
				}
			},
			write_message(){
				let len = 0, len1 = 0;
				this.otherData.forEach(item=>{
					item.DataList.forEach(item1=>{
						if(item1.active){
							//before
							// if(item.name == '金托类别'){
							// 	len ++;
							// }else if(item.name == '工艺类别'){
							// 	len1 ++
							// }
							//after 共有四处需要修改
							if (this.isKownGoldWeight) {
								len ++;
								if(item.name == '工艺类别'){
									len1 ++
								}
							} else if (this.isNoKownGoldWeight) {
								if(item.name == '金托类别'){
									len ++;
								}else if(item.name == '工艺类别'){
									len1 ++
								}
							} 
						} else {
							if (this.isKownGoldWeight) {
								len ++;
							} 
						}

					})
				})

				if(len&&len1&&this.curId){
					this.isBaseMessage = true;
				}else{
					if(!this.curId){
						this.tips('请选择定制类别')
					}else if(!len){
						this.tips('请选择金托类别'); 
					}else if(!len1){
						this.tips('请选择工艺类别')
					}
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
			sure_message () {
				let lenStone = 0, lenStoneNum = 0 , lenStoneWeight = 0, flag = false,stone = '';// 判断辅石的填写是否与辅石的填写的数量份一样
				//转换成钻石
				let stoneSub;
				let indexFirst = this.params.AuxiliaryStone.indexOf('/');//
				let indexLast = this.params.AuxiliaryStone.lastIndexOf('/');
				stone = this.params.AuxiliaryStone;
				//石头
				if(indexFirst >= 0){//先判断是否存在其他这个
					stone = this.params.AuxiliaryStone.split('/');
					if(this.params.AuxiliaryStone.indexOf('其他') >= 0){
						for(let i = 0;i < stone.length; i ++){
							if(stone[i] == "其他"){
								stone[i] = "钻石" 
							}
						}
					}
					stoneSub = stone.join('/');
					lenStone = stone.length;//这是辅石的长度
				}else {
					if(stone&&stone != '选择辅石'){
						if(this.params.AuxiliaryStone.indexOf('其他') >= 0){
							stoneSub = "钻石" 
						}else{
							stoneSub = stone;
						}
						lenStone = 1
					}else{
						stoneSub = "";
						lenStone = 0;
					}
				}
				//输入的数量
				let indexFirstNum = this.params.AuxiliaryStoneNum.indexOf('/');//
				if(indexFirstNum>=0){
					let arrTemp = [];//去掉空的数据 防止用户输入  '1/'
					arrTemp = this.params.AuxiliaryStoneNum.split('/');
					arrTemp.forEach(item=>{
						if(item){
							lenStoneNum++
						}
					})
				}else{
					if(this.params.AuxiliaryStoneNum){
						lenStoneNum = 1;
					}else{
						lenStoneNum = 0;
					}
				}
				//辅石总重匹配	
				let indexFirstWeight = this.params.AuxiliaryStoneWeight.indexOf('/');
				if (indexFirstWeight >= 0) {
					let arrtemp = [];
					arrtemp = this.params.AuxiliaryStoneWeight.split('/');
					arrtemp.forEach(item => {
						if (item) {
							lenStoneWeight ++;
						}
					})
				} else {
					if (this.params.AuxiliaryStoneWeight) {
						lenStoneWeight = 1;
					} else {
						lenStoneWeight = 0;
					}
				}

				// if((this.params.AuxiliaryStone).indexOf('其他')>=0 &&(this.params.AuxiliaryStone).indexOf('/') >=0 ){
				// 	let stone = this.params.AuxiliaryStone.split('/');
				// 	for(let i = 0; i < stone.length; i ++) {
				// 		stone[stone.length-1] = "钻石"
				// 	}
				// 	stoneSub = stone.join('/');
				// 	lenStone = stone.length;//这是辅石的长度
				// }else if((this.params.AuxiliaryStone).indexOf('其他')<0 &&(this.params.AuxiliaryStone).indexOf('/') >=0){
				// 	let stone = this.params.AuxiliaryStone.split('/');
				// 	stoneSub = stone.join('/');
				// 	lenStone = stone.length;//这是辅石的长度
				// }else if((this.params.AuxiliaryStone).indexOf('其他')<0 &&(this.params.AuxiliaryStone).indexOf('/')<0){
				// 	stoneSub = this.params.AuxiliaryStone
				// 	lenStone = 1;
				// }
				
				// if((this.params.AuxiliaryStone).indexOf('其他')==0 &&(this.params.AuxiliaryStone).indexOf('/') <0){
				// 	stoneSub = '钻石';
				// 	lenStone = 1;
				// }
				
				// if(this.params.AuxiliaryStone.indexOf('/')>=0){
				// 	lenStone = (this.params.AuxiliaryStone.split('/')).length
				// }else{
				// 	if(this.params.AuxiliaryStone=='选择辅石'||this.params.AuxiliaryStone == ""){
				// 		lenStone = 0;
				// 		stoneSub = ''
				// 	}else{
				// 		lenStone = 1;
				// 	}
				// }
				// if(this.params.AuxiliaryStoneNum.indexOf('/')>=0){
				// 	let arrTemp = [];//去掉空的数据 防止用户输入  '1/'
				// 	arrTemp = this.params.AuxiliaryStoneNum.split('/');
				// 	arrTemp.forEach(item=>{
				// 		if(item){
				// 			lenStoneNum++
				// 		}
				// 	})
				// }else{
				// 	if(this.params.AuxiliaryStoneNum){
				// 		lenStoneNum = 1;
				// 	}else{
				// 		lenStoneNum = 0;
				// 	}
				// }
				console.log(lenStone)
				console.log(lenStoneNum)

				//before
				// if(lenStone==lenStoneNum){
				// 	flag = true
				// }
				//after
				if (this.isKownGoldWeight) {
					if(lenStone == lenStoneNum && lenStone == lenStoneWeight){
						flag = true
					}
				} else if (this.isNoKownGoldWeight) {
					if(lenStone==lenStoneNum){
						flag = true
					}
				}

				let params = {
					CategoryId: this.params.CategoryId,
					CustomCategories: this.params.CustomCategories,
					KindredCategory: this.params.KindredCategory,
					CraftCategory: this.params.CraftCategory,
					Condition: this.params.Condition,
					Size: this.params.Size,
					AuxiliaryStone: stoneSub,
					AuxiliaryStoneNum: this.params.AuxiliaryStoneNum,
					Lettering: this.params.Lettering,

					GoldWeight: this.params.GoldWeight, //after 金重 
					AuxiliaryStoneWeight: this.params.AuxiliaryStoneWeight //after 辅石总重
				}
				let options = {
					url: '',
					params: params
				}


				let cbok = (res) => {
					this.isloading = false;
					this.isSure = true;
					let data = res.data.data;
					this.baseTotalPrice = data;
					this.params.baseTotalPrice = this.baseTotalPrice;
					this.sumbitTotal();
				}
				let cbno = (res) => {
					this.isloading = false;
					this.tips(res.data.message || '服务开小差！')
				}
				let len = 0, len1 = 0;
				this.otherData.forEach(item=>{
					item.DataList.forEach(item1=>{
						if(item1.active){
							//before
							// if(item.name == '金托类别'){
							// 	len ++;
							// }else if(item.name == '工艺类别'){
							// 	len1 ++
							// }
							//after 共有四处需要修改
							if (this.isKownGoldWeight) {
								len ++;
								if(item.name == '工艺类别'){
									len1 ++
								}
							} else if (this.isNoKownGoldWeight) {
								if(item.name == '金托类别'){
									len ++;
								}else if(item.name == '工艺类别'){
									len1 ++
								}
							}
						}else {
							if (this.isKownGoldWeight) {
								len ++;
							} 
						}
					})
				})

				if(flag&&this.params.Condition!='选择参数'&&this.params.Size!='选择尺寸'&&len&&len1&&this.curId){
					//before
					// this.isloading = true;
					// this.http.post(options,cbok,cbno)
					//after
					if (this.isKownGoldWeight) {
						if (this.params.GoldWeight != '' ) {
							options.url = '/purchase_Api_FashionStyle_GetPrice';
						} else {
							this.tips('请填写款式金重! ');
							return false
						}
						
					} else if (this.isNoKownGoldWeight) {
						options.url = '/purchase_Api_FashionStyle_GetCustomPrice';
					}
					this.isloading = true;
					this.http.post(options,cbok,cbno)

				}else {
					if(!this.curId){
						this.tips('请选择定制类别')
					}else if(!len){
						this.tips('请选择金托类别')
					}else if(!len1){
						this.tips('请选择工艺类别')
					}
					else if(this.params.Condition=='选择参数'){
						this.tips('请选择成色！')
					}else if(this.params.Size=='选择尺寸'){
						this.tips('请选择尺寸！')
					}else if(!flag){
						//before
						// if(lenStoneNum>lenStone){
						// 	this.tips('辅石粒数多于辅石类别所填写！')
						// }else{
						// 	this.tips('辅石粒数小于辅石类别所填写！')
						// }
						//after
						if (this.isKownGoldWeight) {
							if ( lenStoneNum > lenStone) {
								if (lenStoneWeight > lenStone) {
									this.tips('粒数类别和总重类别都多于辅石类别！')
								} 
								if (lenStoneWeight < lenStone) {
									this.tips('粒数类别多于辅石类别，总重类别少于辅石类别！')
								} 
								if (lenStoneWeight == lenStone) {
									this.tips('粒数类别多于辅石类别！')
								} 
							} else if ( lenStoneNum < lenStone ) {
								if (lenStoneWeight > lenStone) {
									this.tips('粒数类别少于辅石类别，总重类别多于辅石类别！')
								} 
								if (lenStoneWeight < lenStone) {
									this.tips('粒数类别和总重类别都少于辅石类别！')
								} 
								if (lenStoneWeight == lenStone) {
									this.tips('粒数类别少于辅石类别！')
								} 
							} else {
								if (lenStoneWeight > lenStone) {
									this.tips('总重类别多于辅石类别！')
								} 
								if (lenStoneWeight < lenStone) {
									this.tips('总重类别少于辅石类别！')
								} 
							}
						} 
						if (this.isNoKownGoldWeight) {
							if(lenStoneNum>lenStone){
								this.tips('粒数类别多于辅石类别！')
							}else{
								this.tips('粒数类别小于辅石类别！')
							}
						}
					}
				}
				
			},
			joinShoppingCar(goldWeight,type){
				this.isloading = true;
				let subStoneNum = 0;
				if((this.params.AuxiliaryStoneNum).indexOf('/')>=0){
					let len = this.params.AuxiliaryStoneNum.split('/')
					subStoneNum = len.length
				}else{
					subStoneNum = 1
				}
				
				let params = {
					ProCategoryName: '',
					ProCategory: this.params.CategoryId,//商品类目
					MainImg: this.imgs.elevation,//主图
					Quantity: 1,//数量 
					Weight: goldWeight,//重量
					UnitPrice: this.baseTotalPrice || 0,//石头单价
					TotalPrice: this.totalPrice,//总价 
					IsNeedStone: 0,//是否需要配石
					Specification: this.params.Size,//规格
					Lettering: this.params.Lettering,//刻字
					MainStoneQty: 1,//主石数
					ViceStoneQty: subStoneNum,//副石数 
					Atts: [],//来图参数
					Images: [],//来图图像
					Stones: [],
				}
				let ImmediateBuy = {
					IsNeedStone: 0,
					Lettering: "",
					MainImg: "",
					MainStoneQty: 0,
					ProCategory: "",
					ProCategoryName: "",
					ProStones: [],
					ProType: "3",	//来图定制
					Quantity: 1,
					RingPrice: 0,
					SetItems: [],	//套装
					SkuId: "",
					SpecialAtts: [],
					SpecialImages: [],
					Specification: 0,
					StonePrice: 0,
					StoneType: 1, //有副石，无主石
					StyleId: "",
					StyleName: "",
					StyleNo: "",
					TotalPrice: 0,
					UnitPrice: 0,	//xx+石头
					ViceStoneQty: 0,
					Weight: 0,
					isNoStone: null,
					stoneData: [],
					telco: "",	//工艺要求
					goldType: "", //金拓类别
					//提交订单所需要的参数
					Atts: [],
					Images: [],
					Stones: [] 
				}
				this.produceData.forEach(item=>{
					if(item.DataName == 'CustomCategories') {
						item.DataList.forEach(item1=>{
							if(item1.ParentId == this.params.CategoryId){
								params.ProCategoryName = item1.Name;
							}
						})
					}
				})
				// 基本参数
				let condiId = '', handId = '';
				let StoneObj = {};
				this.allData.forEach(item=>{
					if(item.DictionaryName == '成色'){
						condiId = item.Id
					}else if(item.DataName == "Size"){
						handId = item.Id
					}
				})
				this.skuData.forEach(item=>{//成色
					if(item.active){
						params.Atts.push({
							StyleAttrId:condiId,
							StyleAttrValueId: item.Id,
							StyleAttrInputValue: item.Name
						})
					}
				})
				this.otherData.forEach(item=>{
					item.DataList.forEach(item1=>{
						if(item1.active){
							params.Atts.push({
								StyleAttrId:item.Id,
								StyleAttrValueId: item1.Id,
								StyleAttrInputValue: item1.Name
							})
						}
					})
				})
				this.produceData.forEach(item=>{
					if(item.DataName == "CustomCategories"){
						item.DataList.forEach(item1=>{
							if(item1.Id==this.curId){
								params.Atts.push({
									StyleAttrId:item.Id,
									StyleAttrValueId: this.curId,
									StyleAttrInputValue: item1.Name
								})
							}
						})
					}
				})
				this.handData.forEach(item=>{//手寸
					if(item.active){
						params.Atts.push({
							StyleAttrId:handId,
							StyleAttrValueId: item.Id,
							StyleAttrInputValue: item.Name
						})
					}
				})
				if(this.stoneData.Shape){
					let Stones =  {
						StoneId: this.stoneData.Id,
						StoneType: 0,
						StoneCategory: '钻石',
						Shape: this.stoneData.Shape,
						Color: this.stoneData.Color,
						Clarity: this.stoneData.Cleanliness,
						Cut: this.stoneData.Cut,
						Weight: this.stoneData.Weight,
						UnitPrice: this.stoneData.SalesPrice,
						RingPrice: this.baseTotalPrice,
						Quantity: 1,
						TotalPrice: this.stoneData.SalesPrice,
					}
					StoneObj = Stones
					params.Stones.push(Stones)
				}
				if(this.params.AuxiliaryStone!='选择辅石'){
					//辅石的数据展示处理
					StoneObj.StoneCategory = this.params.AuxiliaryStone,
					StoneObj.StoneQuantity = this.params.AuxiliaryStoneNum,
					StoneObj.StoneWeight = this.params.AuxiliaryStoneWeight

					let AuxiliaryStone = (this.params.AuxiliaryStone).split('/');
					let AuxiliaryStoneNum = (this.params.AuxiliaryStoneNum).split('/');
					let AuxiliaryStoneWeight = (this.params.AuxiliaryStoneWeight).split('/');
					AuxiliaryStone.forEach((item, index)=>{
						AuxiliaryStoneWeight[index] = String(AuxiliaryStoneWeight[index]).replace(/[^\d.]/g,'')
						if(item){
							let subStone = {
								StoneId: '',
								StoneType: 1,
								StoneCategory: item,
								UnitPrice: 0,
								Quantity: AuxiliaryStoneNum[index],
								TotalPrice: 0,
							 	RingPrice: Number(this.baseTotalPrice),
								Weight: AuxiliaryStoneWeight[index] //重量要去掉单位
							}
							params.Stones.push(subStone)
						}
					})
				}
				//处理stoneData包含主石/副石
				StoneObj.RingPrice = Number(this.baseTotalPrice),
				StoneObj.Lettering = this.params.Lettering,
				StoneObj.finness = this.params.Condition,
				StoneObj.handSize = this.params.Size,
				ImmediateBuy.stoneData.push(StoneObj)
				let Images = [];
				if(this.stoneData.Id){
					params.IsNeedStone = 1;
				}else {
					params.IsNeedStone = 0;
				}
				for(let key in this.imgs){
					if( typeof this.imgs[key] == 'string'){
						let obj = {
							ImgType: 1,
							ImgCode: '',
							Sort: 0
						}
						obj.ImgCode = this.imgs[key]
						Images.push(obj)
					}else{
						this.imgs[key].forEach(item=>{
							let obj = {
								ImgType: 1,
								ImgCode: item,
								Sort: 0
							}
							Images.push(obj)
						})
					}
				}
				params.Images = Images;
				params.Images.forEach((item,index)=>{
					item.Sort = index;
				})
				//立即购买存数据赋值
				ImmediateBuy.ProCategory = this.params.CategoryId;
				ImmediateBuy.ProCategoryName = params.ProCategoryName;
				ImmediateBuy.SpecialImages = params.Images;
				ImmediateBuy.Specification = this.params.Size;
				ImmediateBuy.Quantity = params.Quantity;
				ImmediateBuy.MainStoneQty = params.MainStoneQty;
				ImmediateBuy.MainImg = params.MainImg;
				ImmediateBuy.Lettering = this.params.Lettering;
				ImmediateBuy.IsNeedStone = params.IsNeedStone;
				ImmediateBuy.TotalPrice = params.TotalPrice;
				ImmediateBuy.UnitPrice = params.UnitPrice;
				ImmediateBuy.ViceStoneQty = params.ViceStoneQty;
				ImmediateBuy.Weight = params.Weight;
				ImmediateBuy.telco = this.params.CraftCategory;
				ImmediateBuy.goldType = this.params.KindredCategory;
				ImmediateBuy.RingPrice = Number(this.baseTotalPrice)
				//添加石头价格
				params.Stones.forEach(stone =>{
					ImmediateBuy.StonePrice += Number(stone.TotalPrice)
					stone.handSize = this.params.Size;
					stone.finness = this.params.Condition;
					stone.Lettering = this.params.Lettering;
					stone.RingPrice = Number(this.baseTotalPrice);
				})
				// if((!params.Stones || params.Stones.length == 0) && type=='now'){
				// 	params.Stones.push({
				// 		handSize: this.params.Size,
				// 		finness: this.params.Condition,
				// 		Lettering: this.params.Lettering
				// 	})
				// }
				ImmediateBuy.ProStones = params.Stones;
				ImmediateBuy.Stones = params.Stones;
				ImmediateBuy.TotalPrice = ImmediateBuy.StonePrice + ImmediateBuy.RingPrice;
				//戒托信息
				//款式的属性
				params.Atts.forEach(attr =>{
					let obj = {
						SetItemId: "",
						StyleAttrId: attr.StyleAttrId,
						StyleAttrInputValue: attr.StyleAttrInputValue,
						StyleAttrName: "",
						StyleAttrValueId: attr.StyleAttrValueId,
						StyleAttrValueName: attr.StyleAttrInputValue
					}
					ImmediateBuy.SpecialAtts.push(obj)
				})
				ImmediateBuy.Atts = ImmediateBuy.SpecialAtts;
				ImmediateBuy.Images = ImmediateBuy.SpecialImages;
					if(type=='now'){
					//避免空对象，展示出来无用的配石数据
						if(this.stoneData && !this.stoneData.Id){
							this.stoneData = {}
						}
						this.params.baseTotalPrice = this.baseTotalPrice;
						let showParams = {
							tableRow: this.stoneData,	//添加配石
							baseMessage: this.params,
							skuHasPrice: this.skuHasPrice,
							BasicCostList: this.BasicCostList,
							DeputyStoneList: this.DeputyStoneList,
							imgs: this.imgs
						}
						let query = this.$route.query;
						query.name = this.$route.name
						console.log(ImmediateBuy.stoneData)
						this.$store.commit('SET_SELECTGOOD',[ImmediateBuy])
						this.$router.push({
							name: "finalFashionMessageNew",
							params: showParams,
							query: query
						})
						// this.$router.push('/finalFashion/shoppingCar')
					}else{
						let options = {
							url: '/order_Api_CustomizeCart_AddCartCustomizeToMap',
							params: params
						}
						let cbok = (res) => {
							this.isloading = false;
							this.isShow = true;
						}
						let cbno = (res) => {
							this.tips(res.data.message ||'添加购物车失败！')
							this.isloading = false;
						}
						this.http.post(options,cbok,cbno)
					}
			},


			choicePro (info) {
				if (info === 'yes') {
					this.isKownGoldWeight = !this.isKownGoldWeight;
				} else if (info === 'no'){
					this.isNoKownGoldWeight = !this.isNoKownGoldWeight;
				} else {
					return  false
				}
				this.isGoldWeight = !this.isGoldWeight;
				this.isTabGoldWeight = !this.isTabGoldWeight;


				this.f_toMap_state({
					isGoldWeight: this.isGoldWeight,
					isTabGoldWeight: this.isTabGoldWeight,
					isKownGoldWeight: this.isKownGoldWeight,
					isNoKownGoldWeight: this.isNoKownGoldWeight
				});
			},
			realValidate(){
				let options = {
					url: '/system_Api_BasicCost_MapPriceVerify',
					params: {
						categoryId: categoryId
					}
				}
				let cbok = (res) => {
					let data = res.data.data;
					if(data){
						this.BasicCostList = data.BasicCostList || [];
						this.DeputyStoneList = data.DeputyStoneList || [];
					}
				}	
				let cbno = (res) => {
					this.tips(res.data.message ||'请检查当前sku的价格配置！')
					
				}
				this.http.get(options,cbok,cbno)
			},
			clearBasicAndSubStone(){
				this.isBaseMessage = false;
				this.isAddStone = false;
				//清除成色已选中状态
				if(this.skuData && this.skuData.length>0){
					this.skuData.forEach(sku =>{
						sku.active = false;
					})
				}
				//清除尺寸已选中状态
				if(this.handData && this.handData.length > 0){
					this.handData.forEach(size =>{
						size.active = false;
					})
				}
				this.params.Size = ""
				this.params.Lettering = "";
				this.params.GoldWeight = "";
				this.params.otherContent = "";
				this.params.AuxiliaryStone = "";
				//清空副石选中状态
				if(this.subStoneData && this.subStoneData.length>0){
					this.subStoneData.forEach(subStone =>{
						subStone.active = false;
					})
				}
				this.params.AuxiliaryStoneNum = "";
				this.params.AuxiliaryStoneWeight = ""
				//清空配石信息
				this.stoneData = {};
				this.totalPrice = 0;
				this.baseTotalPrice = 0;
				//清空已处理出的有配置价格的sku信息和副石信息
				this.skuHasPrice = {
					cateName: "",           //定制分类
					processCateList: [], 	//工艺类别
					accStoneList: [],		//辅石列表
					conditionList: []       //成色
				}
			}
		}
	}
</script>

<style lang="scss">
	#app{
		height: 100%;
	}
	.toMapIndex{
		height: 100%;
		display: flex;
		flex-direction: column;
		.mask{
			width: 100%;
			height: 100%;
			background:rgba(0, 0, 0, 0.1);
			position: absolute;
			left: 0;
			top: 0;
			display: block;
			z-index: 15;
			&.active{
				display: block;
			}
		}
		.toMap-header{
			font-size: 2.25rem;
			color: #ffffff;
			width: 100%;
			display: flex;
			position: absolute;
			top: 0;
			left: 0;
			height:6.25rem;
			padding-top: 2.5rem;
			background-color: rgba(255,255,255,.2);
			z-index: 10;
			.return-btn{
				position: absolute;
				left: 0;
				padding: 0 3.75rem;
				&:before{
					content:"";
					display: inline-block;
					width: 1.1rem;
					height: 1.1rem;
					border-right: 2px solid #ffffff;
					border-top: 2px solid #ffffff;
					transform: rotate(-135deg);
				}
			}
			.toMapIndexTitle{
				text-align: center;
				width: 100%;
			}

		}
		.toMap-main{
			flex: 1;
			overflow-y: scroll;
		}
		.alert_shopping{
			width: 45rem;
			// height: 34.63rem;
			background: #ffffff;
			position: absolute;
			left: 50%;
			top: 45%;
			transform: translate(-50%,-50%);
			z-index: 99999;
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
		.plan-imgs{
			width: 100%;
			height: 30.25rem;
			background: url('../../assets/toMap/toMapImg.jpg') no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			top: 0;
			z-index: 80;
			.upload-wrap{
				width: 100%;
				height: 22.5rem;
			}
			.upload-inner-wrap{
				padding-top: 6.25rem;
				width: 100%;
				overflow: scroll;
				display: flex;
				justify-content: center;
			}
			.tables-box{
				font-size: 1.88rem;
				color: #333;
				height: 22.5rem;
				display: flex;
				justify-content: center;
				align-items: center;
				.cells{
					width: 18.75rem;
					height: 18.74rem;
					background: #ffffff;
					margin-right: 7.5rem;
					padding: 0.87rem 2.28rem 0;
					box-sizing: border-box;
					position: relative;
					.img-box{
						width: 100%;
						height: 100%;
						position: relative;
						.remove-img{
							position: absolute;
							top: -18px;
							right: -28px;
							width: 2.5rem;
							height: 2.5rem;
							text-align: center;
							line-height: 2.5rem;
							font-size: 2rem;
							color: #fff;
							background-color: rgba(0,0,0,0.1);
							-webkit-background-clip: content-box;
							border-radius: 50%;
							z-index: 100;
							cursor: pointer;
							box-sizing: content-box;
							border: 10px solid transparent;
						}
						.img{
							width: 14.23rem;
							height: 14.23rem;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
					&:last-child{
						margin-right: 0;
					}
					&.pic-zst{
						background: url('../../assets/toMap/view.png') no-repeat center;
						background-size: 18.75rem;
					}
					&.pic-cst{
						background: url('../../assets/toMap/left.png') no-repeat center;
						background-size: 18.75rem;
					}
					&.pic-csf{
						background: url('../../assets/toMap/top.png') no-repeat center;
						background-size: 18.75rem;
					}
					&.pic-xjt{
						background: url('../../assets/toMap/detail.png') no-repeat center;
						background-size: 18.75rem;
					}
					.pic-tit{
						color: #999999;
						font-size: 1.88rem;
						text-align: center;
						position: absolute;
						bottom: 1.25rem;
						left: 0;
						right: 0;
					}
				}
			}
		}
		.gray{
			background: #F5F5F5;
			width: 100%;
			height: 1.25rem;
		}
		.map-scroll{
			width: 100%;
			height: 56rem;
			overflow-y: scroll;
			overflow-x: hidden;
			margin-top: 33rem;
			.tomap-property{
				color: #333;
				padding: 2rem 1.88rem 0.5rem;
				box-sizing: border-box;
				.out-wrap{
				}
				.first-wrap{
					display: flex;
					justify-content: space-around;
  					flex-wrap: wrap;
					div{
						margin-top: 2rem;
						width: 18.75rem;
						height: 20rem;
						line-height: 20rem;
						text-align: center;
						font-size: 2.25rem;
						font-weight: bold;
    					border: 1px dashed #FF7B7B;			
						p{
							cursor: pointer;
							width: 12.75rem;
							height: 4.13rem;
							line-height: 4.13rem;
							text-align: center;
							border-radius: 0.63rem;
							background-image: linear-gradient(-134deg, #ffbaba 0%, #f27474 100%);
							margin: 8rem auto;
							color: #ffffff;
						}		
					}
				}
				.property-title{
					font-size: 2.25rem;
					display: flex;
					align-items: center;
					margin-bottom: 2.25rem;
					font-weight: bold;
					&:before{
						content: "";
						display: inline-block;
						width: 1rem;
						height: 2.25rem;
						background-image: linear-gradient(-134deg, #FFBABA 0%, #F27474 100%);
						margin-right: 1.25rem;
					}
				}
				.property-classify{
					margin-left: 2.25rem;
					font-size: 2.25rem;
					display: flex;
					align-items: center;
					margin-bottom: 2.25rem;
					font-weight: bold;
					span{
						display: inline-block;
						margin-left: 2.25rem;
						padding: 1rem 1.25rem;
						text-align: center;
						font-size: 1.88rem;
						border: 1px solid #E5E5E5;
					}
				}
				.contanier-property{
					box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
					// padding-left: 1.25rem;
				}
				.inner-wrap{
					// background: #FFFFFF;
					.property-sub-title{
						font-size: 2.25rem;
						border-bottom: 1px solid #E5E5E5;
						padding: 1.25rem;
						font-weight: bold;
					}
					.property-message{
						padding-left: 1.25rem;
						.property-message-box{
							display: -webkit-box;
							padding-bottom: 2.5rem;
							.property-message-cell{
								margin-right: 7rem;
								.property-message-title{
									font-size: 1.88rem;
									padding: 1.25rem 0;
								}
								.property-message-list{
									display: flex;
									flex-wrap: wrap;
									border-radius: 0.63rem;
									overflow: hidden;
									li{
										padding: 1rem 1.25rem;
										float: left;
										text-align: center;
										font-size: 1.88rem;
										border:1px solid #E5E5E5;
										margin: 2px;
										&:first-child{
											border-left: 1px solid #E5E5E5;
										}
										&.active{
											background: #FF7B7B;
											color: #ffffff;
										}
										&.disabled{
											color: #ccc;
											background: #FFFFFF;
										}
									}
								}
							}
						}
					}
				}
				.property-base-message{
					padding: 2.5rem 0 0;
					background: #FFFFFF;
					// box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
					.base-message-title{
						font-size: 1.88rem;
						margin-bottom: 1.25rem;
						text-align: center;
						font-weight: bold;
					}
					.no-base-message{
						width: 25rem;
						height: 5.5rem;
						border: 1px dashed #FF7B7B;
						text-align: center;
						line-height: 5.5rem;
						color: #FF7B7B;
						margin: 0 auto;
						font-size: 1.5rem;
						margin-bottom: 2.5rem;
						span{
							margin-right: 1.25rem;
							font-size: 2.5rem;
							vertical-align: top;
						}
					}
					.sure-base-message{
						font-size: 1.88rem;
						border-bottom: 1px solid #E5E5E5;
						.sure-base-wrap{
							// margin: 0 auto;
							display: flex;
							justify-content: space-around;
							flex-wrap: wrap;
							li{
								width: 33.3%;
								margin-bottom: 2.5rem;
								// padding-left: 12.36rem;
								box-sizing: border-box;
								.input{
									margin-top: 1.25rem;
								}
								.group-input{
									padding: 0 5rem;
								}
								input[type="text"],input[type="number"]{
									width: 16.25rem;
									height: 4.38rem;
									border-radius: 0.25rem;
									padding-left: 1.38rem;
									border: 1px solid #E5E5E5;
									box-sizing: border-box;
									font-size: 1.5rem;
									text-align: center;
								}
								label{
									span{
										color: #999999;
										font-size: 1.5rem;
									}
								}
								.sel-params{
									width: 16.25rem;
									height: 4.38rem;
									border-radius: 0.25rem;
									// padding-left: 1.38rem;
									border: 1px solid #E5E5E5;
									line-height: 4.38rem;
									font-size: 1.5rem;
									margin-top: 1.25rem;
									color: #999999;
									position: relative;
									border-radius: 0.63rem;
									p{
										min-width: 16.25rem;
										height: 4.38rem;
										line-height: 4.38rem;
										font-size: 1.5rem;
										text-align: center;
										overflow-x: scroll;
									}
									.hideInput{
										position: absolute;
										right: -140px;
										top: -11px;
										display: flex;
										.sure-button{
											width: 5rem;
											text-align: center;
											border: 1px solid #E5E5E5;
											border-radius: 0 0.25rem  0.25rem 0;
											border-left: none;
											box-sizing: border-box;
										}
										input{
											border-radius: 0.25rem 0 0 0.25rem;
										}
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
										z-index: 50;
										ul{
											display: flex;
											flex-wrap: wrap;
											width: 30.3rem;
											border: 1px solid #E5E5E5;
											box-sizing: border-box;
											border-radius: 0.63rem;
											overflow: hidden;
										}
										li{
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
											&.disabled{
												color: #ccc;
												background: #FFFFFF;
											}
										}
									}
								}
							}
						}
					}
					.sure-base-btn{
						display: flex;
						justify-content: flex-end;
						align-items: center;
						padding: 1.25rem 0;
						.sure-base-button{
							width: 25rem;
							height: 5.5rem;
							text-align: center;
							line-height: 5.5rem;
							border-radius: 0.63rem;
							border: 1px solid #FF7B7B ;
							color: #FF7B7B ;
							font-size: 1.5rem;
							margin-right: 3.75rem;
							&:active{
								opacity: 0.8;
							}
						}
						.sure-base-price{
							font-size: 2.25rem;
							margin-right: 2.5rem;
							span{
								color: #333;
								font-weight: bold;
							}
							em{
								color: #FF7B7B ;
								margin-left: 1.25rem;
							}
						}
						.group-input{
							label{
								margin-right: 1rem;
								font-size: 1.5rem;
							}
							input{
								height: 4.38rem;
								text-align: center;
   								margin-right: 3.75rem;
							}
						}
					}
				}
				.property-stone-message{
					.stone-tips{
						font-size: 1.5rem;
						color: #999999;
						text-align: center;
						padding-bottom: 2.5rem;
						margin-top: 1.25rem;
					}
					.have-stone{
						.cell_value{
							display: flex;
							justify-content: center;
							color: #333;
							font-size: 1.5rem;
							border-bottom: 1px solid #e5e5e5;
							padding-bottom: 2.5rem;
							li{
								border-right: 1px solid #e5e5e5;
								border-top: 1px solid #e5e5e5;
								border-bottom: 1px solid #e5e5e5;
								width: 12.75rem;
								&:first-child{
									border-left: 1px solid #e5e5e5;
								}
								span{
									border-bottom: 1px solid #e5e5e5;
								}
								span,em{
									display: inline-block;
									width: 12.75rem;
									height: 5.5rem;
									text-align: center;
									line-height: 5.5rem;
								}
							}
						}
					}
					.angin-stone{
						color: #FF7B7B ;
						font-size: 1.88rem;
						margin-right: 5.63rem;
						&:active{
							opacity: 0.8;
						}
					}
				}
			}
			.now-buy-btn-wrap{
				background: #ffffff;
				// box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
				padding-top: 1.25rem;
				.tomap-total-price{
					color: #333333;
					font-size: 2.5rem;
					text-align: center;
					padding: 0.9rem 0;
					font-weight: bold;
					em{
						color: #FF7B7B;
						margin-right: 1.25rem;
					}
				}
				.buy-btn{
					display: flex;
					justify-content: center;
					margin: 1.25rem 0;
					div{
						width: 25rem;
						height: 5.5rem;
						text-align: center;
						line-height: 5.5rem;
						font-size: 1.5rem;
						color: #FF7B7B;
						border: 1px solid #FF7B7B;
						border-radius: 0.63rem;
						margin-right: 3.75rem;
						&:active{
							opacity: 0.8;
						}
					}
				}
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
