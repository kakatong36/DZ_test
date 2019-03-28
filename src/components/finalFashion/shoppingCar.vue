<template>
  <div class="finalFashionShopping">
	  	<v-header :header="header"></v-header>
		<div class="finalFashion-content">
			<ul class="shoppingCarTitle">
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
			<!-- 时尚定制购物车列表 -->
			<!-- <div class="fashionCar">
				<div class="title_fashion">
					<div class="group-input">
						<input type="checkbox" name="stone"/>
						<div class="outCircle" :class="{'outCircleBorder': true}">
							<div :class="{'innerCircle': true}"></div>
						</div>
					</div>
					<label for="">时尚定制</label>
				</div>
				<div class="goodsShopping fashion">
					<ul class="list ">
						<li>
							<div class="goodsName">
								<div class="group-input">
									<input type="checkbox" name="stone"/>
									<div class="outCircle" :class="{'outCircleBorder': true}">
										<div :class="{'innerCircle': true}"></div>
									</div>
								</div>
								<div class="goods_wrap">
									<div class="goodsImg">
										<img src="../../assets/assetsFinal/thumbnail-2.png" alt="">
									</div>
									<div class="goods-name">
										<p>永恒之约</p>
										<p class="goodsNo">钻石女戒 【款号#1424】</p>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div><span>成色：18K金</span><em>尺寸：13</em></div>
							<div><span>净度：VVS1 </span><span>切工：EX</span><span>颜色：G</span><span>重量：0.88g</span></div>
						</li>
						<li>
							<div>¥6,888.00</div>
							<div>¥8,000.00</div>
						</li>
						<li>刻字+指纹</li>
						<li>¥12,888.00</li>
						<li>
							<div>删除</div>
							<div>重新选款</div>
							<div>重新选石</div>
						</li>
					</ul>
				</div>
			</div> -->
			<!-- 轻奢定制 -->
			<!-- <div class="fashionCar">
				<div class="title_fashion">
					<div class="group-input">
						<input type="checkbox" name="stone"/>
						<div class="outCircle" :class="{'outCircleBorder': true}">
							<div :class="{'innerCircle': true}"></div>
						</div>
					</div>
					<label for="">轻奢定制</label>
				</div>
				<div class="goodsShopping light">
					<ul class="list">
						<li>
							<div class="goodsName">
								<div class="group-input">
									<input type="checkbox" name="stone"/>
									<div class="outCircle" :class="{'outCircleBorder': true}">
										<div :class="{'innerCircle': true}"></div>
									</div>
								</div>
								<div class="goods_wrap">
									<div class="goodsImg">
										<img src="../../assets/assetsFinal/thumbnail-2.png" alt="">
									</div>
									<div class="goods-name">
										<p>永恒之约</p>
										<p class="goodsNo">钻石女戒 【款号#1424】</p>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div><span>成色：18K金</span><em>尺寸：13</em></div>
							<div><span>净度：VVS1 </span><span>切工：EX</span><span>颜色：G</span><span>重量：0.88g</span></div>
						</li>
						<li>
						</li>
						<li>刻字+指纹</li>
						<li>¥12,888.00</li>
						<li>
							<div>删除</div>
							<div>重选</div>
						</li>
					</ul>
					<ul class="list">
						<li>
							<div class="goodsName">
								<div class="group-input">
									<input type="checkbox" name="stone"/>
									<div class="outCircle" :class="{'outCircleBorder': true}">
										<div :class="{'innerCircle': true}"></div>
									</div>
								</div>
								<div class="goods_wrap">
									<div class="goodsImg">
										<img src="../../assets/assetsFinal/thumbnail-2.png" alt="">
									</div>
									<div class="goods-name">
										<p>永恒之约</p>
										<p class="goodsNo">钻石女戒 【款号#1424】</p>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div><span>成色：18K金</span><em>尺寸：13</em></div>
							<div><span>净度：VVS1 </span><span>切工：EX</span><span>颜色：G</span><span>重量：0.88g</span></div>
						</li>
						<li>
						</li>
						<li>刻字+指纹</li>
						<li>¥12,888.00</li>
						<li>
							<div>删除</div>
							<div>重选</div>
						</li>
					</ul>
				</div>
			</div> -->
			<div class="shopping-content">
				<!-- 组合定制 -->
				<div class="fashionCar" v-for="(item, index) in shoppingData" :key="index">
					<div class="title_fashion"  @click="subAllCheck(item.name)">
						<div class="group-input">
							<input type="checkbox" name="stone"/>
							<div class="outCircle" :class="{'outCircleBorder': item.active}">
								<div :class="{'innerCircle': item.active}"></div>
							</div>
						</div>
						<label for="">{{item.name}}</label>
					</div>
					<div class="goodsShopping" :class="{'fashion':cell.ProType=='1'||cell.ProType=='3','light':cell.ProType=='4','lovers':cell.ProType=='2'}" v-for="cell in item.arr" :key="cell.Id">
						<ul class="list">
							<li @click="getVal(cell.Id,item.name)">
								<div class="goodsName">
									<div class="group-input">
										<input type="checkbox" name="stone"/>
										<div class="outCircle" :class="{'outCircleBorder': cell.active}">
											<div :class="{'innerCircle': cell.active}"></div>
										</div>
									</div>
									<div class="goods_wrap">
										<div class="goodsImg">
											<img v-if="cell.MainImg" :src= "(cell.MainImg).indexOf('http') >= 0 ?cell.MainImg : http.imgUrl+cell.MainImg " alt="">
											<img v-else :src="imgLoading">
										</div>
										<div class="goods-name">
											<p v-if="cell.ProType!='3'">{{cell.StyleName}}</p>
											<p v-if="cell.ProType == '1'||cell.ProType == '4'" class="goodsNo">{{cell.ClassName}} 【款号{{cell.StyleNo}}】</p>
											<p v-if="cell.ProType == '3'">类别 {{cell.class}}</p>
											<p v-if="cell.ProType == '3'" class="goodsNo">金托类型 {{cell.goldType}} 工艺分级 {{cell.telco}}</p>
										</div>
									</div>
								</div>
							</li>
							<li>
								<!-- 时尚和来图 -->
								<div class="cell-second" v-if="cell.ProType=='1'||cell.ProType=='3'">
									<div><span>成色：{{cell.finness}}</span><em>尺寸：{{cell.handSize}}</em></div>
									<div v-if="cell.stoneData"><span>净度：{{cell.stoneData.Clarity}} </span><span>切工：{{cell.stoneData.Cut}}</span><span>颜色：{{cell.stoneData.Color}}</span><span>重量：{{cell.stoneData.Weight}}ct</span></div>
									<div v-if="cell.ProType =='3'&&cell.StoneCategory"><span>镶石：{{cell.StoneCategory?cell.StoneCategory:'无'}}</span><em>粒数：{{cell.StoneQuantity}}</em><em>重量：{{cell.StoneWeight}}ct</em></div>
								</div>
								<!-- 自由女神 -->
								<!-- <div class="cell-second" v-if="cell.ProType=='2' && cell.ClassName == '自由女神'" v-for="(list,index2) in cell.mainSton" :key="index2">
									<div><span>成色：{{cell.finness}}</span><em>尺寸：{{cell.handSize}}</em></div>
									<div><span>净度：{{list.Clarity}} </span><span>切工：{{list.Cut}}</span><span>颜色：{{list.Color}}</span><span>重量：{{list.Weight}}ct</span></div>
								</div> -->
								<!-- <div class="cell-second" v-if="cell.ProType=='2'&& cell.coupleData">
									<div><span>成色：{{cell.finness}}</span><em>尺寸：{{cell.handSize}}</em></div>
									<div v-if="cell.coupleData"><span>净度：{{cell.coupleData.Clarity}} </span><span>切工：{{cell.coupleData.Cut}}</span><span>颜色：{{cell.coupleData.Color}}</span><span>重量：{{cell.coupleData.Weight}}g</span></div>
								</div> -->
								<!-- 轻奢-->
								<div class="light-second"  v-if="cell.ProType=='4'">
									<div>【<span>成色：{{cell.finness}}</span><em>尺寸：{{cell.handSize}}</em>】</div>
									<div>【<span>镶石：{{cell.StoneCategory?cell.StoneCategory:'无'}}</span><em>粒数：{{cell.StoneQuantity}}</em><em>重量：{{cell.StoneWeight}}ct</em>】</div>
								</div>
								<!-- 情侣戒 -->
								<div class="cell"  v-if="cell.ProType=='2'&& cell.mainSton" v-for="(list,index2) in cell.mainSton" :key="index2">
									<p>{{cell.StyleName}} {{list.StyleCategory}}</p>
									<p><span>成色：{{cell.finness}}</span><em>尺寸：{{cell.handSize}}</em></p>
									<p v-if='list.Clarity'><span>净度：{{list.Clarity}} </span><span>切工：{{list.Cut}}</span><span>颜色：{{list.Color}}</span><span>重量：{{list.Weight}}ct</span></p>
									<div v-else>【<span>镶石：{{list.Category?list.Category:'无'}}</span><em>粒数：{{cell.MainStoneQty}}</em><em>重量：{{list.subWeight?(list.subWeight+'ct'):''}}</em>】</div>
								</div>
							</li>
							<li>
								<div class="third-cell" v-if="cell.ProType=='1'||cell.ProType=='3'">
									<div>¥{{cell.RingPrice?cell.RingPrice:0}}</div>
									<div v-if="cell.stoneData">¥{{cell.StonePrice?cell.StonePrice:0}}</div>
								</div>
								<div v-if="cell.ProType=='4'" class="null-wrap"></div>
								<div class="couples" v-if="cell.ProType=='2'">
									<div v-for="(list,index2) in cell.mainSton" :key="index2">¥{{list.TotalPrice+cell.RingPrice}}<p>（含配石）</p></div>
								</div>
								<!-- <div class="third-cell" v-if="cell.ProType=='2'&& cell.ClassName == '自由女神'">
									<div>¥{{cell.RingPrice?cell.RingPrice:0}}</div>
									<div>¥{{cell.StonePrice?cell.StonePrice:0}}</div>
								</div> -->
							</li>
							<li>
								<p  v-if="cell.Lettering">刻字</p>
								<p  v-else>无</p>
							</li>
							<li>
								<div>¥{{cell.TotalPrice}}</div>
							</li>
							<li>
								<div @click="del(cell.Id)">删除</div>
								<!-- <div @click="gravityStyle(item.name)"  v-if="cell.ProType=='1'||cell.ProType=='2'">重新选款</div> -->
								<div @click="gravityStone(item.name)"  v-if="cell.ProType=='1'||cell.ProType=='2'">重新选石</div>
								<!-- <div @click="gravityStyle(item.name)"  v-if="cell.ProType=='4'">重选</div> -->
							</li>
						</ul>
						<!-- <div class="gray"></div> -->
					</div>
				</div>
			</div>
			
			<!-- 情侣戒指 -->
			<!-- <div class="fashionCar">
				<div class="title_fashion">
					<div class="group-input">
						<input type="checkbox" name="stone"/>
						<div class="outCircle" :class="{'outCircleBorder': true}">
							<div :class="{'innerCircle': true}"></div>
						</div>
					</div>
					<label for="">情侣戒指</label>
				</div>
				<div class="goodsShopping lovers">
					<ul class="list">
						<li>
							<div class="goodsName">
								<div class="group-input">
									<input type="checkbox" name="stone"/>
									<div class="outCircle" :class="{'outCircleBorder': true}">
										<div :class="{'innerCircle': true}"></div>
									</div>
								</div>
								<div class="goods_wrap">
									<div class="goodsImg">
										<img src="../../assets/assetsFinal/thumbnail-2.png" alt="">
									</div>
									<div class="goods-name">
										<p>永恒之约</p>
										<p class="goodsNo">钻石女戒 【款号#1424】</p>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="cell">
								<p>男款</p>
								<p><span>成色：18K金</span><em>尺寸：13</em></p>
								<p><span>净度：VVS1 </span><span>切工：EX</span><span>颜色：G</span><span>重量：0.88g</span></p>
							</div>
							<div class="cell">
								<p>女款</p>
								<p><span>成色：18K金</span><em>尺寸：13</em></p>
								<p><span>净度：VVS1 </span><span>切工：EX</span><span>颜色：G</span><span>重量：0.88g</span></p>
							</div>
						</li>
						<li>
							<p><em>¥6,888.00</em><span>（含配石）</span></p>
							<p><em>¥6,888.00</em><span>（含配石）</span></p>
						</li>
						<li>
							<p>刻字+指纹</p>
							<p>刻字+指纹</p>
						</li>
						<li>¥12,888.00</li>
						<li>
							<div>删除</div>
							<div>重新选款</div>
							<div>重新选石</div>
						</li>
					</ul>
				</div>
			</div> -->
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
				<p>总价：<span>¥{{totalPrice}}</span></p>
				<div class="settle_btn" @click="goAccounts">去结算</div>
			</div>
		</div>
		<v-loading v-show="isLoading"></v-loading>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
		<v-nodata v-show="isNoData" msg="购物车暂无商品哦！"></v-nodata>
  </div>
</template>

<script>
	import header from './header'
	import loading from 'components/isLoading/isloading'
	import nodata from 'components/nodata/newnodata'
	import promptBox from 'components/promptBox/promptBox'
	const imgLoading = require('@/assets/assetsFinal/imgLoading.png')
	export default {
		data () {//
			return {
				imgLoading: imgLoading,
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
				}
			}
		},
		computed:{

		},
		components: {
			'v-header': header,
			'v-loading': loading,
			'v-nodata': nodata,
			'promptBox': promptBox
		},
		created () {
			window.vm = this
			this.getList ();
			
		},
		methods: {
			inputChange(e){
				// console.log(e.target.checked)
			},
			// 重选
			gravityStyle(type){
				if(type== '时尚定制'){
					let obj = {
						finness: "",
						stylePrice: ''
					}
					this.$router.push('/finalFashion/fashion')
					this.$store.commit('SET_ISSTONEORSTYLE',true)//判断选择哪一个进去的先选款
					this.$store.commit('SET_FASHION',obj)
					this.$store.commit('SET_STYLE',false)
					this.$store.commit('SET_DETAIL',false)
					this.$store.commit('SET_STONE',false)
					this.$store.commit('SET_SETTLEMENT',false)
				}else if(type == '轻奢定制'){
					let obj = {
						finness: "",
						Size: ''
					}
					this.$store.commit('SET_STYLELIGHT',false)
					this.$store.commit('SET_DETAILLIGHT',false)
					this.$store.commit('SET_SETTLEMENTLIGHT',false)
					this.$router.push('/lightFashion/fashion')
					this.$store.commit('SET_SIZELIGHT',obj)
				}
				
			},
			gravityStone () {
				let obj = {
					finness: "",
					stylePrice: ''
				}
				this.$router.push('/finalFashion/stoneFirst')
				this.$store.commit('SET_ISSTONEORSTYLE',false)
				this.$store.commit('SET_FASHION',obj)
				this.$store.commit('SET_STYLE',false)
				this.$store.commit('SET_DETAIL',false)
				this.$store.commit('SET_STONE',false)
				this.$store.commit('SET_SETTLEMENT',false)
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
			goAccounts () {
				let len = 0 ; //判断是否已有勾选了
				let selectData = []
				this.shoppingData.forEach(item=>{
					item.arr.forEach(item1=>{
						if(item1.active) {
							len ++;
							selectData.push(item1);
						}
					})
				})
				if(len == 0 ) {
					this.ispromptBox = true;
					this.$nextTick(() => {
						this.msg.text = '请选择商品！！'
					})
					setTimeout(() => {
						this.msg.time = 500
					}, 1000)
					setTimeout(() => {
						this.ispromptBox = false
						this.msg.time = null
						this.msg.text = null
					}, 1500)
					return false
				}else {
					this.$store.commit('SET_SELECTGOOD',selectData)
					this.$router.push('/finalFashion/message')
				}
			},
			getVal (id){
				let mainLen = 0;
				let allLen = 0;
				let total = 0;
				this.shoppingData.forEach(item=>{
					let len = 0;
					item.arr.forEach(item1=>{
						total ++ //总长度
						if(item1.Id == id){
							item1.active = !item1.active;
						}
						if(!item1.active){
							len ++
							this.isAllCheck = false;
						}else{
							item.active = true;
							allLen++
						}
					})
					if(len == item.arr.length){
						item.active = false;
					}
					if(!item.active){
						mainLen++
					}
				})
				if(mainLen == this.shoppingData.length){
					this.isAllCheck = false;
				}
				if(total == allLen ){
					this.isAllCheck = true;
				}
				this.calPrice();
			},
			// 总价
			calPrice(){
				let totalPrice = 0;
				let stonePrice = 0;
				let num = 0;
				this.shoppingData.forEach(item=>{
					item.arr.forEach(item1=>{
						if(item1.active){
							num++
							totalPrice += item1.TotalPrice;
							// item1.ProStones.forEach(item2=>{
							// 	stonePrice += item2.TotalPrice;
							// })
						}
					})
				})
				this.totalPrice = (totalPrice+stonePrice).toFixed(2);
				this.goodsNum = num;
			},
			// 全选
			allCheck (){
				this.isAllCheck = !this.isAllCheck;
				this.shoppingData.forEach(item=>{
					if(this.isAllCheck){
						item.active = true;
					}else{
						item.active = false;
					}
					item.arr.forEach(item1=>{
						if(this.isAllCheck){
							item1.active = true;
						}else{
							item1.active = false;
						}
					})
				})
				this.calPrice();
			},
			subAllCheck (name){
				let len = 0;
				let activeLen = 0;
				this.shoppingData.forEach(item=>{
					if(item.name == name){
						item.active = !item.active;
						item.arr.forEach(item1=>{
							if(item.active){
								item1.active = true;
							}else{
								item1.active = false;
							}
						})
						if(!item.active){
							len++
						}else{
							activeLen++;
						}
					}
				})
				if(len == this.shoppingData.length){
					this.isAllCheck = false; 
				}
				if(activeLen == this.shoppingData.length){
					this.isAllCheck = true; 
				}
				this.calPrice();
			},
			delAll (){
				let Ids = [];
				this.shoppingData.forEach(item=>{
					item.arr.forEach(item1=>{
						if(item1.active){
							Ids.push(item1.Id)
						}
					})
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
					this.tips('你已经成功删除！')
					let arrIndex = []
					for(let i = 0 ; i < this.shoppingData.length; i ++){
						for(let a = 0 ; a < this.shoppingData[i].arr.length; a ++){
							if(this.shoppingData[i].arr[a].active){
								this.shoppingData[i].arr.splice(a,1);
								a--
							}
						}
					}
					let len = 0;
					this.shoppingData.forEach((item,index)=>{//去掉头部标题
						if(item.arr.length == 0){
							len ++;
							if(this.shoppingData.length == len){
								this.isAllCheck = false;
								this.isNoData = true;
								this.shoppingData = []
							}
							this.shoppingData.splice(index,1);
						}
					})
					this.calPrice();
				}
				let cbno = (res) => {
					this.isLoading = false;
				}
				let cbnull = (res) => {
					this.isLoading = false;
				}
				this.http.post(options,cbok,cbno,cbnull);
			},
			del(id){
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
					this.tips('你已经成功删除！')
					this.shoppingData.forEach((item,index)=>{
						item.arr.forEach((item1,index1)=>{
							if(item1.Id == id){
								this.shoppingData[index].arr.splice(index1,1);
							}
						})
					})
					let len = 0;
					this.shoppingData.forEach((item,index)=>{
						if(item.arr.length == 0){
							len ++;
							if(this.shoppingData.length == len){
								this.isAllCheck = false;
								this.isNoData = true;
								this.shoppingData = []
							}
							this.shoppingData.splice(index,1);
						}
					})
					this.calPrice();
				}
				let cbno = (res) => {
					this.isLoading = false;
				}
				let cbnull = (res) => {
					this.isLoading = false;
				}
				this.http.post(options,cbok,cbno,cbnull);
			},
			getList (){
				this.isLoading = true;
				let options = {
					url: '/order_Api_CustomizeCart_Cart',
				}
				let cbok = (res) => {
					this.isLoading = false;
					let data = res.data.data;
					let objFashion = {
						name:"",
						arr:[]
					};
					let objSamllFashion = {
						name:"",
						arr:[]
					};
					let objToMap = {
						name:"",
						arr:[]
					};
					let couples = {
						name:"",
						arr:[]
					}
					this.shoppingData = [];
					if(data.length == 0){
						this.isNoData = true;
					}else{
						this.isNoData = false;
						data.forEach(item=>{
							this.$set(item,'active',false)
							item.SpecialAtts.forEach(item1=>{
								if(item1.StyleAttrName == '成色'){
									item.finness = item1.StyleAttrValueName
								}else if(item1.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
									item.handSize = item1.StyleAttrValueName
								}else if(item1.StyleAttrName == '镶口大小'){
									item.Insert = item1.StyleAttrValueName
								}else if(item1.StyleAttrName == '工艺分级'){
									item.telco = item1.StyleAttrValueName
								}else if(item1.StyleAttrName == '品类'){
									item.class = item1.StyleAttrValueName
								}else if(item1.StyleAttrName == '金托类型'){
									item.goldType = item1.StyleAttrValueName
								}
							})
							if(item.ProType == '1'){//时尚定制的 1 和 有石头
								item.ProStones.forEach(item2=>{
									if(item2.StoneType == 0){
										item.stoneData = item2;
									}
								})
								this.$set(objFashion,'active',false);
								objFashion.name = "时尚定制"
								objFashion.arr.push(item);
							}else if(item.ProType == '4'){//时尚定制的 1 和 没有石头
								let str = '',str1 = '',str2 = '';
								item.ProStones.forEach(item2=>{
									if(item2.StoneType == 1){
										str += item2.StoneCategory + '/'
										str1 += item2.Weight + '/';
										str2 += item2.Quantity + '/'
									}
									item.StoneCategory = str.slice(0,-1);
									item.StoneWeight =  str1.slice(0,-1);
									item.StoneQuantity =  str2.slice(0,-1);
								})
								this.$set(objSamllFashion,'active',false);
								objSamllFashion.name = "轻奢定制"
								objSamllFashion.arr.push(item);
							}else if(item.ProType == '3'){//时尚定制的 1 和 没有石头
								let str = '',str1 = '',str2 = '';
								item.ProStones.forEach(item2=>{
									if(item2.StoneType == 0){
										item.stoneData = item2
									}
									if(item2.StoneType == 1){
										str += item2.StoneCategory + '/'
										str1 += item2.Weight + '/';
										str2 += item2.Quantity + '/'
									}
									item.StoneCategory = str.slice(0,-1);
									item.StoneWeight =  str1.slice(0,-1);
									item.StoneQuantity =  str2.slice(0,-1);
								})
								this.$set(objToMap,'active',false);
								objToMap.name = "来图定制"
								objToMap.arr.push(item);
							}else if(item.ProType == '2'){//情侣装
								let arr = [];
								if(item.SetItems&&item.SetItems.length>0){//这里是情侣戒
									item.SetItems.forEach(item1=>{
										let obj = {},
											str = '',
											str1 = '',
											subStoneNum = 0;
										if(item1.ProStones.length>0){
											item1.ProStones.forEach(item2=>{
												if(item2.StoneType == '0'){
													obj.StyleCategory = item1.StyleCategory
													obj.Clarity = item2.Clarity
													obj.Cut = item2.Cut
													obj.Color = item2.Color
													obj.Quantity = item2.Quantity
													obj.Shape = item2.Shape
													obj.StoneCategory = item2.StoneCategory
													obj.StoneType = item2.StoneType
													obj.TotalPrice = item2.TotalPrice
													obj.Weight = item2.Weight
												}
												if(item2.StoneType == '1'){
													subStoneNum++
													if(item2.StoneCategory){
														str +=item2.StoneCategory+'/'
													}
													if(item2.Weight){
														str1 +=item2.Weight+'/'
													}
													obj.Category = str.slice(0,-1)
													obj.subWeight = str1.slice(0,-1)
													obj.subStoneNum = subStoneNum
												}
											})
											arr.push(obj)
										}
										item.mainSton = arr
									})
								}else if(item.ProStones&&item.ProStones.length>0){//这里是套装
									let obj = {},
										str = '',
										str1 = '',
										subStoneNum = 0;
									item.ProStones.forEach(item1=>{
										if(item1.StoneType == '0'){
											obj.Clarity = item1.Clarity
											obj.Cut = item1.Cut
											obj.Color = item1.Color
											obj.Quantity = item1.Quantity
											obj.Shape = item1.Shape
											obj.StoneCategory = item1.StoneCategory
											obj.StoneType = item1.StoneType
											obj.TotalPrice = item1.TotalPrice
											obj.Weight = item1.Weight
										}else {
											subStoneNum ++
											if(item1.StoneCategory){
												str +=item1.StoneCategory+'/'
											}
											if(item1.Weight){
												str1 +=item1.Weight+'/'
											}
											obj.Category = str.slice(0,-1);//辅石的名称
											obj.subWeight = str1.slice(0,-1);//辅石的重量
											obj.subStoneNum = subStoneNum;//辅石的粒数
										}
										item.coupleData = obj
									})
								}
								this.$set(couples,'active',false);
								couples.name = "情侣戒"
								couples.arr.push(item);
							}
						})
						if(objFashion.name){
							this.shoppingData.push(objFashion)
						}
						if(objSamllFashion.name){
							this.shoppingData.push(objSamllFashion)
						}
						if(objToMap.name){
							this.shoppingData.push(objToMap)
						}
						if(couples.name){
							this.shoppingData.push(couples)
						}
						// this.shoppingData = data;
						this.calPrice();
					}
				}
				let cbnull = (res) => {
					this.isLoading = false;
					this.isNoData = true;
				}
				let cbno = (res) => {
					this.isLoading = false;
					this.isNoData = true;
				}
				this.http.get(options,cbok,cbno,cbnull);
			}
		}
	}
</script>

<style lang='scss'>
html,body{
	font-size: 8px;
}
#app{
	height: 100%;
}
	.finalFashionShopping{
		height: 100%;
		// margin-top: 3.75rem;
		background: #ffffff;
		padding-bottom: 11rem;
		.no{
			border: none;
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
				border-radius: 50%;
				background: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				border:1px solid #999999;
				top: 3px;
				z-index: 5;
				.innerCircle{
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 50%;
					background: #FF7B7B;
				}
				&.outCircleBorder{
					border:1px solid #FF7B7B;
				}
			}
		}
		.finalFashion-content{
			height: 100%;
			overflow-y: scroll;
			padding-top: 6.25rem;
			.shoppingCarTitle{
				height: 6.25rem;
				background: rgba($color: #FFCF5F, $alpha: 0.2);
				width: 100%;
				display: flex;
				align-items: center;
				padding-left: 1.88rem;
				box-sizing: border-box;
				color: #333333;
				margin-bottom: 1.33rem;
				font-size: 1.88rem;
				.allLin{
					display: flex;
					align-items: center;
					position: relative;
					.allLin-left{
						margin-right: 5.44rem;
						display: flex;
						align-items: center;
					}
				}
				li{
					text-align: center;
				}
				li:nth-of-type(1){
					width: 30.5rem;
				}
				li:nth-of-type(4),li:nth-of-type(5),li:nth-of-type(3){
					width: 12.5rem;
				}
				li:nth-of-type(2){
					width: 42rem;
				}
				li:nth-of-type(6){
					flex: 1;
				}
			}
			.fashionCar{
				.title_fashion{
					display: flex;
					align-items: center;
					font-size: 2.25rem;
					color: #333333;
					height: 5.13rem;
					background: rgba($color: #FF9999, $alpha: 0.1);
					padding-left: 1.88rem;
					box-sizing: border-box;
				}
				.goodsShopping{
					font-size: 1.5rem;
					color: #333333;
					.gray{
						width: 100%;
						height: 1.25rem;
						background: #f5f5f5;
					}
					&.light{
						li:nth-of-type(2){
							width: 42rem;
							display: flex;
							justify-content: center;							
							.light-second{
								div{
									margin-top: 1.25rem;
									em{
										margin-left: 1em;
									}
									&:last-child{
										margin-bottom: 1.25rem;
									}
								}
							} 
						}
						li:nth-of-type(3){
							width: 12.5rem;
							.null-wrap{
								width: 12.5rem;
							}
						}
						li:nth-of-type(4){
							display: flex;
							justify-content: center;
							align-items: center;
							// padding: 0 2.63rem;
						}
					}
					&.fashion{
						li:nth-of-type(2){
							.cell-second{
								width: 42rem;
								div{
									height: 5.94rem;
									line-height: 5.94rem;
									text-align: center;
									padding: 0 3.69rem;
									span{
											margin-right: 1em;
										}
									&:nth-of-type(2){
										border-top: 1px solid #E5E5E5;
									}
									
								}
							}
							
						}
						li:nth-of-type(3){
							.third-cell{
								width: 12.5rem;
								box-sizing: border-box;
								div{
									height: 5.94rem;
									line-height: 5.94rem;
									text-align: center;
									// padding: 0 3.69rem;
									span{
											margin-right: 1em;
										}
									&:nth-of-type(2){
										border-top: 1px solid #E5E5E5;
									}
								}
							}
							.light-second{
								div{
									margin-top: 1.25rem;
									em{
										margin-left: 1em;
									}
									&:last-child{
										margin-bottom: 1.25rem;
									}
								}
							} 
						}
						li:nth-of-type(4){
							display: flex;
							justify-content: center;
							align-items: center;
							// padding: 0 2.63rem;
						}
					}
					&.group{
						li:nth-of-type(2){
							.cell{
								text-align: left;
								padding: 1.88rem 3.69rem 2.38rem;
								border-bottom: 1px solid #E5E5E5;
								display: flex;
								flex-direction: column;
								&:last-child{
									border-bottom: 0;
								}
								p:first-child{
									margin-bottom: 1.25rem;
								}
								p:nth-of-type(2){
									margin-bottom: 0.2rem;
								}
								p{
									span{
										margin-right: 1em;
									}
								}
							}
						}
						
						li:nth-of-type(3),li:nth-of-type(4){
							display: flex;
							flex-direction: column;
							p{
								display: flex;
								justify-content: center;
								align-items: center;
								border-bottom: 1px solid #E5E5E5;
								flex: 1;
								&:last-child{
									border-bottom: 0;
								}
							}
						}
					}
					&.lovers{
						li:nth-of-type(2){
							display: flex;
							flex-direction: column;
							.cell{
								text-align: left;
								flex: 1;
								padding: 1.88rem 3.69rem 2.38rem;
								border-bottom: 1px solid #E5E5E5;
								display: flex;
								flex-direction: column;
								width: 100%;
								&:last-child{
									border-bottom: 0;
								}
								p:first-child{
									margin-bottom: 1.25rem;
								}
								p:nth-of-type(2){
									margin-bottom: 0.2rem;
								}
								p{
									span{
										margin-right: 1em;
									}
								}
							}
							
							.cell-second{
								width: 42rem;
								div{
									height: 5.94rem;
									line-height: 5.94rem;
									text-align: center;
									padding: 0 3.69rem;
									span{
											margin-right: 1em;
										}
									&:first-child{
										border-bottom: 1px solid #E5E5E5;
									}
								}
							}
						}
						li:nth-of-type(3){
							.couples{
								width: 12.5rem;
								box-sizing: border-box;
								height: 100%;
								display: flex;
								flex-direction: column;
								div{
									flex: 1;
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									&:first-child{
										border-bottom: 1px solid #E5E5E5;
									}
								}
							}
							.third-cell{
								width: 12.5rem;
								box-sizing: border-box;
								div{
									height: 5.94rem;
									line-height: 5.94rem;
									text-align: center;
									// padding: 0 3.69rem;
									span{
											margin-right: 1em;
										}
									&:first-child{
										border-bottom: 1px solid #E5E5E5;
									}
								}
							}
						}
						li:nth-of-type(4){
							display: flex;
							justify-content: center;
							align-items: center;
							// padding: 0 2.63rem;
						}
					}
					.list{
						display: flex;
						border-bottom: 1px solid #E5E5E5;
						padding-left: 1.88rem;
						box-sizing: border-box;
						li{
							border-right: 1px solid #E5E5E5;
							display: flex;
							align-items: center;
							justify-content: space-between;
							// padding: 1.25rem 0;
							p{
								white-space: nowrap;
							}
						}
						li:nth-of-type(1){
							// padding: 1.33rem 0 0 1.88rem;
							padding-right: 1.38rem;
							width: 29rem;
							.goodsName{
								display: flex;
								align-items: center;
								.goods_wrap{
									display: flex;
									align-items: center;
									margin-left: 0.99rem;
									.goodsImg{
										width: 6.01rem;
										height:6.01rem;
										img{
											width: 100%;
										}
									}
									.goods-name{
										margin-left: 0.76rem;
										.goodsNo{
											margin-top: 1.25rem;
											color: #999999;
										}
									}
								}
							}
						}
						li:nth-of-type(2){
							width: 42rem;
						}
						li:nth-of-type(3){
							// div{
							// 	height: 5.94rem;
							// 	line-height: 5.94rem;
							// 	text-align: center;
							// 	width: 100%;
							// 	&:first-child{
							// 		border-bottom: 1px solid #E5E5E5;
							// 	}
							// }
							// width: 11.8rem;
							// box-sizing: border-box;
						}
						li:nth-of-type(4){
							width: 12.5rem;
							// display: flex;
							// justify-content: center;
							// align-items: center;
							// padding: 0 2.63rem;
						}
						li:nth-of-type(5){
							width: 12.5rem;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #FF7B7B;
						}
						li:nth-of-type(6){
							flex: 1;
							border-right: none;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							div{
								text-align: center;
								margin-bottom: 1.25rem;
								&:last-child{
									margin-bottom: 0;
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
			margin-top: 1.25rem;
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
					&:active{
						opacity: 0.8;
					}
				}
				p:first-child{
					margin-right: 5.06rem;
				}
			}
		}
	}
</style>
