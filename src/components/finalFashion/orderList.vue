<template>
	<div class="orderList">
		<v-header :header="header"></v-header>
		<div class="order-content">
			<div class="order-title">
				<ul class="order-title-list">
					<li :class="{'active': item.active}" @click="getTitle(item.title,item.id)" v-for="(item,index) in orderSearchList" :key="index">{{item.title}}</li>
					<!-- <li>已付款</li>
					<li>已接单</li>
					<li>已送货</li>
					<li>已到店</li>
					<li>已取货</li>
					<li>退款/售后</li>
					<li>交易成功</li> -->
				</ul>
				<div class="search-order">
					<span class="searech-icon" @click="getOrder()"></span>
					<!-- <img src="../../assets/assetsFinal/search.jpg" alt=""> -->
					<input type="text" placeholder="搜索订单…" v-model="orderNo">
				</div>
			</div>
			<!-- 订单列表 -->
			<div class="order-container"  ref='tables'>
				<div class="order-contents">
					<div class="order-list" v-for="item in orderData" :key='item.Id'>
						<div class="order-list-title">
							<span>订单号：{{item.OrderNo}}</span>
							<span>订单时间：{{item.InTime | date}}</span>
							<span>交货日期：{{item.ExpectDeliveryTime| date}}</span>
						</div>
						<div class="order-list-wrap">
							<div class="order-detail-wrap">
								<ul class="order-out-wrap" v-for="(list,index1) in item.Styles" :key="list.Id">
									<li class="order-goods">
										<div class="order-inner">
											<template v-if="list.StyleType=='10'">
												<img :src="defaultStoneImg" @load="loadingImg(item.Id,index1)" @click="jumpDetail(list)">
											</template>
											<template v-else>
												<img :src="http.imgUrl+list.MainImg+config.orderImgSize" alt="" v-show="list.loading" @load="loadingImg(item.Id,index1)" @click="jumpDetail(list)">
												<img :src="imgLoading" v-show="!list.loading" @click="jumpDetail (list)">
											</template>
											<div class="goods-name">
												<p v-if="['1', '10', '11'].includes(list.StyleType)">时尚定制</p>
												<p v-if="list.StyleType == '4'">轻奢定制</p>
												<p v-if="list.StyleType == '3'">来图定制</p>
												<p v-if="list.StyleType == '2'">{{list.CategoryName}}</p>

												<p v-if="list.StyleType != '3'">{{list.StyleName}}</p>
												<p v-if="['1', '4', '11'].includes(list.StyleType)">{{list.ClassName}} 【款号#{{list.StyleNo}}】</p>
												<p v-if="list.StyleType == '3'">{{list.class}}</p>
												<p v-if="list.StyleType == '3'" class="goodsNo">{{list.goldType}}  {{list.telco}}</p>
												<p v-if="list.StyleType == '10' && list.ClassName">【石号#{{list.ClassName}}】</p>
											</div>
										</div>
									</li>
									<li class="order-sku">
										<div class="order-sku-inner" v-for="(cell, index2) in list.stoneData" :key="index2" v-if="((list.StyleType == '1'||(list.StyleType == '3' && !list.isNoStone)||list.StyleType=='10'))&&list.StoneType == '0'">
											<div v-if="list.StyleType!='10'"><span>成色：{{cell.finness?cell.finness:'无'}}</span><span> 尺寸：{{cell.handSize?cell.handSize:"无"}}</span></div>
											<div :style="{borderBottom: list.StyleType=='10'?'none':'' }"><span>净度：{{cell.Clarity}}</span><span>切工：{{cell.Cut}}</span><span>颜色：{{cell.Color}}</span><span>重量：{{cell.Weight}}ct</span></div>
										</div>
										<div class="order-sub-stone"  v-else-if="(list.StyleType == '4'||list.StyleType == '3')&&list.StoneType == '1'"  v-for="(cell, index3) in list.stoneData" :key="index3">
											<div>【<span>成色：{{cell.finness?cell.finness:'无'}}</span><span> 尺寸：{{cell.handSize?cell.handSize:"无"}}</span>】</div>
											<div>【<span>镶石：{{cell.StoneCategory}} </span><span>粒数：{{cell.StoneQuantity}}</span><span>重量：{{cell.StoneWeight}}ct</span>】</div>
										</div>
										<div class="couples" v-if="list.StyleType == '2'" v-for="(cell, index4) in list.stoneData" :key="index4">
											<div>
												<div class="title-couples">{{cell.StyleName}}&nbsp;&nbsp;{{cell.ClassName}}&nbsp;{{cell.StyleCategory}}</div>
												<div><span>成色：{{cell.finness?cell.finness:'无'}}</span><span> 尺寸：{{cell.handSize?cell.handSize:"无"}}</span></div>
												<div v-if="cell.Clarity"><span>净度：{{cell.Clarity}}</span><span>切工：{{cell.Cut}}</span><span>颜色：{{cell.Color}}</span><span>重量：{{cell.Weight}}ct</span></div>
												<div v-else><span>镶石：{{cell.StoneCategory?cell.StoneCategory:'无'}} </span><span>粒数：{{cell.StoneQuantity?cell.StoneQuantity:'无'}}</span><span>重量：{{cell.StoneWeight?cell.StoneWeight+'ct':'无'}}</span></div>
											</div>
										</div>
										<!-- <div v-if="item.isNoStone &&list.StyleType != '2'" class="alone"  v-for="cell in list.stoneData" :key="cell.Id"> -->
										<div v-if="list.isNoStone && !['1', '2', '11'].includes(list.StyleType)"  class="alone"  v-for="(cell, index5) in list.stoneData" :key="index5">
											<div><span>成色：{{cell.finness?cell.finness:'无'}}</span><span> 尺寸：{{cell.handSize?cell.handSize:"无"}}</span></div>
										</div>
										<div v-if="list.StyleType == '11'"  class="alone"  v-for="(cell, index5) in list.stoneData" :key="index5">
											<div><span>成色：{{cell.finness?cell.finness:'无'}}</span><span> 尺寸：{{cell.handSize?cell.handSize:"无"}}</span><span>镶口：{{cell.Insert?cell.Insert+'ct':'无'}}</span></div>
										</div>
									</li>
									
									<li class="order-user">
										<div v-if="list.Lettering">
											<p>刻字</p>
											<!-- <span>指纹</span> -->
										</div>
										<div v-else>无</div>
									</li>
								</ul>
							</div>
							<ul class="right-wrap">
								<li class="order-user">
									<div><p v-if="item.member">{{item.member.MemberName }}</p><span v-if="item.member">{{item.member.MemberMobile }}</span></div>
								</li>
								<li class="order-price">
									<div>
										<p>￥{{item.SettlementAmount.toFixed(2)|money}}</p>
										<!-- <span>支付宝支付</span> -->
									</div>
								</li>
								<li class="order-status">
									<div class="order-status-inner">
										<p v-if="item.OrderStatus == '8001' || item.OrderStatus == '40001'" @click="goPay(item.Id)">去付款</p>
										<p>状态：
											<span v-if="item.OrderStatus == '8001'" :class="{'status':item.OrderStatus == '8001'}">未付款</span>
											<span v-if="item.OrderStatus == '8004'">已付款</span>
											<span v-if="item.OrderStatus == '8002'">已接单</span>
											<span v-if="item.OrderStatus == '8018'">已送货</span>
											<span v-if="item.OrderStatus == '8019'">已到店</span>
											<span v-if="item.OrderStatus == '8013'">已取货</span>
											<span v-if="item.OrderStatus == '8016'">退款/售后</span>
											<span v-if="item.OrderStatus == '8025'">交易成功</span>

											<!-- 2018-4-30修改，钟垒定义新编号。8开头的作废但兼容 -->
											<span v-if="item.OrderStatus == '40001'" :class="{'status':item.OrderStatus == '40001'}">未付款</span>
											<span v-if="item.OrderStatus == '40002'">已付款</span>
											<span v-if="item.OrderStatus == '40003'">生产中</span>
											<span v-if="item.OrderStatus == '40004'">已到店</span>
											<span v-if="item.OrderStatus == '40005'">交易完成</span>
											<span v-if="item.OrderStatus == '40006'">已取消</span>
										</p>
										<p class="look-detail" @click="goDetail(item.Id)">查看订单详情</p>
										<p>销售顾问：{{item.SaleUserName}}</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<p v-show="isLoadingText" class="loading-text">{{loadingtext}}</p>
				</div>
			</div>
		</div>
		<noInternet v-show="isInternet"></noInternet>
		<v-nodata v-show="isNoData" msg="暂无订单哦！"></v-nodata>
		<v-loading v-show="isLoading"></v-loading>
	</div>
</template>

<script>
	import header from './header'
	import nodata from 'components/nodata/newnodata'
	import loading from "@/components/isLoading/isloading";
	const imgLoading = require('@/assets/assetsFinal/imgLoading.png')
	const defaultStoneImg = require('@/assets/assetsFinal/default-diamond.png')
	export default {
		data () {
			return {
				header:{
					title: '订单列表',
					isShow: true,
					return: {
						name: 'home'
					}
				},
				orderSearchList:[
					{title: '全部订单',active: true,id:''},
					{title: '未付款',active: false,id:'8001_40001'},
					{title: '已付款',active: false,id:'8004_40002'},
					{title: '生产中',active: false,id:'40003'},
					{title: '已到店',active: false,id:'8019_40004'},
					{title: '交易完成',active: false,id:'8025_40005'},
					{title: '已取消',active: false,id:'40006'}
				],

				isNoData: false,
				isLoading: false,
				isLoadingText: false,
				isInternet: false,

				params: {
					pageIndex: 1,
					pageSize: 10,
					//isAll: false,
					orderNo: '',
					memberName: '',
					memberMobile: '',
					createBegin: '',
					createEnd: '',
					customizeType: '',
					status: '',
				},
				imgLoading: imgLoading,
				defaultStoneImg: defaultStoneImg,
				orderData: [],
				orderNo: '',
				isloading: true,
				page: 1,
				isExist: 1,
				loadingtext: 'loadingtext'
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
		mounted (){
			let tableRefs = this.$refs.tables;
			let that = this;
			this.$nextTick(() => {
				tableRefs.addEventListener('scroll', function() {
					if(that.orderData.length == 0){ 
						return false
					}
					if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
						if(that.isloading){
							that.isloading = false;
							that.getList (that.page);
						}
					}else{
					}					
				}, false)
			})  
		},
		created (){
			window.vm = this
			this.getList();
		},
		methods:{
			loadingImg (id,index){//图片加载
				this.orderData.forEach((item)=>{
					if(item.Id == id){
						item.Styles.forEach((item1,index1)=>{
							if(index == index1){
								item1.loading = true;
							}
						})
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
			goPay (id){
				this.$router.push('/finalFashion/pay/'+id)
			},
			goDetail(orderId){
				this.$router.push({
					name: 'finalFashionOrderDetail',
					params:{
						id:orderId
					}
				})

			},
			getTitle(name,id){
				this.params.status = id;
				this.params.orderNo = '';
				this.params.memberName = ''
				this.params.memberMobile = ''
				this.orderSearchList.forEach(item=>{
					if(item.title == name){
						item.active = true;
					}else{
						item.active = false;
					}
				})
				this.page = 1;
				this.orderData = []
				this.isExist = 1
				this.params.pageIndex = 1;
				this.getList();
			},
			getPunishResult(list){
				if(list && list.length > 0){
					list.forEach(item => {
						if(item.Styles&&item.Styles.length>0){
							item.Styles.forEach(item1=>{
								this.$set(item1,'loading',false)
								let obj = {},arr = [];
								if(item1.SetItems&&item1.SetItems.length>0){//套装  //SetItems（stones） 只有套装的时候才不为空  stones是单品的时候才会有
									let array = [];
									item1.SetItems.forEach(item3=>{
										let str = '',str1 = '',str2 = '',obj = {};
										obj.finness = item3.FinnessName;	//成色
										obj.handSize = item3.Specification;			//尺寸
										obj.Insert = item1.InlaySize;		//镶口
										item1.telco = item1.Techonology;	//工艺分级
										item1.class = item3.ClassName;	//品类
										item1.goldType = item1.GoldRelyType;	//金托类型
										if(item3.Stones&&item3.Stones.length>0){
											item3.Stones.forEach(item2=>{
												if(item2.StoneType == 0){//主石
													item1.StoneType = 0
													obj.Id = item2.StoneId;
													obj.Shape = item2.Shape
													obj.Color = item2.Color
													obj.Clarity = item2.Clarity
													obj.Cut = item2.Cut
													obj.Weight = item2.Weight
													obj.StoneNo =  item2.StoneNo
												}else {
													if(item1.StoneType !== 0){
														item1.StoneType = 1
													}
													str += item2.StoneClass + '/'
													str1 += item2.Weight + '/';
													str2 += item2.Quantity + '/'
												}
											})
											obj.StoneCategory = str.slice(0,-1);
											obj.StoneWeight =  str1.slice(0,-1);
											obj.StoneQuantity =  str2.slice(0,-1);
										}
										item1.Lettering = item3.Lettering ? item3.Lettering : item1.Lettering
										obj.couplePrice = item3.RingPrice + item3.StonePrice
										obj.StyleName = item3.StyleName
										obj.Lettering = item3.Lettering
										obj.StyleCategory = item3.CategoryName
										obj.ClassName = item3.ClassName
										array.push(obj)
									})
									//自由女神戒臂花头分开显示 19.03.19改动
									item1.stoneData = array
									// if(item1.CategoryName== '自由女神'){
									// 	let randomArr = [array[0]]
									// 	item1.stoneData = randomArr;
									// }else{
									// 	item1.stoneData = array;
									// }
								}else{
									obj.StyleName = item1.StyleName
									obj.Lettering = item1.Lettering
									obj.StyleCategory = item1.CategoryName
									obj.ClassName = item1.ClassName
									//item1.Attrs 不存在了
									obj.finness = item1.FinnessName;	//成色
									obj.handSize = item1.Specification;			//尺寸
									obj.Insert = item1.InlaySize;		//镶口
									item1.telco = item1.Techonology;	//工艺分级
									item1.class = item1.ClassName;	//品类
									item1.goldType = item1.GoldRelyType;	//金托类型
									if(item1.Stones&&item1.Stones.length>0){//单品的
										let str = '',str1 = '',str2 = '';
										item1.Stones.forEach(item2=>{
											if(item2.StoneType == 0){//主石
												item1.StoneType = 0
												obj.Id = item2.StoneId;
												obj.Shape = item2.Shape
												obj.Color = item2.Color
												obj.Clarity = item2.Clarity
												obj.Cut = item2.Cut
												obj.Weight = item2.Weight
												obj.StoneNo = item2.StoneNo
												obj.Shape = item2.Shape
											}else {
												if(item1.StoneType !== 0){
													item1.StoneType = 1
												}
												str += item2.StoneClass + '/'
												str1 += item2.Weight + '/';
												str2 += item2.Quantity + '/'
											}
										})
										obj.StoneCategory = str.slice(0,-1);
										obj.StoneWeight =  str1.slice(0,-1);
										obj.StoneQuantity =  str2.slice(0,-1);
										this.$set(item1, 'isNoStone', false)
									}else{
										this.$set(item1, 'isNoStone', true)
									}
									
									if(item1.StyleType == '10'){//单买石头
										item1.StyleName = `钻石${obj.Shape?('-'+obj.Shape):''}`
										item1.ClassName = obj.StoneNo // 石号
									}
									arr.push(obj)
									item1.stoneData = arr
								}
							})
							this.orderData.push(item);
						}
					})
				}
			},
			getList (page){
				if(page){
					this.isLoadingText = true;
					this.params.pageIndex = page;
				}else{
					this.isLoading = true;
				}
				for(let key in  this.params){
					if(!this.params[key]){
						if(this.params[key] === false){//有的数据键值为false
							continue 
						}
						delete this.params[key]
					}
				}
				let options = {
					//url: '/order_Api_OrderCustomize_Search',
					url: '/order_Api_OrderCustomize_SearchOwn',
					params: this.params
				}
				let cbok = (res) => {
					this.isNoData = false;
					this.isLoading = false;
					this.isInternet = false;
					this.isLoadingText = false;
					this.isNoData = false;
					let data = res.data.data;
					let list = data.data_list || [];
					if(list.length%5 == 0&&list.length) {//只有后台返回来的数据为20的倍数才选择加一
						this.page ++ ;
					}
					if(page) {
						this.isloading = true;
						if(this.isExist != page) {//判断的是否已经全部加载完数据了
							this.getPunishResult(list)
							this.loadingtext = '正在加载中...'
						}else{
							this.loadingtext = '亲，已经到底啦！'
						}
						this.isExist = page;
					}else{//这里是页面刚进来的时候加载
						this.getPunishResult(list)
					}
				}
				let cbnull = (res) =>{
					this.isLoading = false;
					// this.isNoData = true;
					this.isInternet = false;
					this.isLoadingText = false;
					if(this.params.pageIndex == 1){
						this.isNoData = true;
						this.orderData = [];
					}
				}
				let cbno = res => {
					this.isLoading = false;
					this.isInternet = true;
					// this.isNoData = false;
					this.orderData = []
					this.isLoadingText = false
				}
				this.http.get(options,cbok,cbno,cbnull);
			},
			getOrder(){
				this.params.orderNo = this.orderNo.trim();
				this.params.memberMobile = "";
				this.params.memberName = "";
				this.page = 1;
				this.orderData = []
				this.isExist = 1
				this.params.pageIndex = 1;
				this.getList();
			},
			//icon跳转
			jumpDetail (list) {
				if (list.StyleType == "4") {
					this.$router.push({
						name: 'lightFashionDetail',
						params:{
							id: list.StyleId
						},
						query: {from: 'orderList'}
					})
				}
				if (list.StyleType == "1" || list.StyleType == "11") {
					//控制页面跳转，保证返回按钮直接返回订单列表页面
					this.$store.commit("SET_DISTINGUISH_FASHION_OR_SUITS", "");
					this.$store.commit('SET_ISSTONEORSTYLE', true)
					this.$router.push({
						name: 'finalFashionDetail',
						params:{
							id: list.StyleId
						},
						query: {from: 'orderList'}
					})
				}	
				// if (list.StyleType == "3") {
				// 	this.$router.push({
				// 		name: 'toMap',
				// 		params:{
							
				// 		}
				// 	})
				// }
				if (list.StyleType == "2") {
					if (list.CategoryName == "情侣对戒") {
						this.$router.push({
							name: 'couplesDetail',
							params:{
								id: list.StyleId
							},
							query: {from: 'orderList'}
						})
					}
					if (list.CategoryName == "套装系列") {
						this.$router.push({
							name: 'seriesDetail',
							params:{
								id: list.StyleId
							},
							query: {from: 'finalFashionList'}
						})
					}
				}
			}
		},
		components: {
			'v-header': header,
			'v-nodata': nodata,
			'v-loading': loading,
		}
	}
</script>

<style lang="scss">
	.orderList{
		height: 100%;
		background: #ffffff;
		.nodata{
			top: 31%;
		}
		.order-content{
			height: 100%;
			padding-top: 6.25rem;
			padding-bottom: 6.25rem;
			.order-container{
				overflow-y: scroll;
				height: 100%;
			}
			.order-contents{
				padding-bottom: 2.5rem;
			}
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
			.order-title{
				background: rgba($color: #FFCF5F, $alpha: 0.1);
				display: flex;
				align-items: center;
				color: #999999;
				font-size: 1.88rem;
				justify-content: space-between;
				.order-title-list{
					display: flex;
					height: 6.25rem;
					padding-left: 2.5rem;
					li{
						margin-right: 3.06rem;
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						transition: all 0.2s ease;
						&.active{
							color: #333333;
							font-weight: 600;
							&:after{
								content: "";
								display: inline-block;
								width: 100%;
								height: 0.38rem;
								background: #FF7B7B;
								position: absolute;
								bottom: 0;
								left: 0;
							}
						}
					}
				}
				.search-order{
					width: 18.75rem;
					height: 4.38rem;
					background: #ffffff;
					border-radius: 0.63rem;
					border: 1px solid #E5E5E5;
					display: flex;
					align-items: center;
					margin-right: 1.88rem;
					position: relative;
					overflow: hidden;
					.searech-icon{
						display: block;
						width: 2rem;
						height: 2rem;
						margin-right: 1.75rem;
						background: url('../../assets/assetsFinal/search.jpg') no-repeat center;
						background-size: 100%;
						position: absolute;
						left: 1.2rem;
						top: 50%;
						margin-top: -0.8rem;
					}
					input[type="text"]{
						outline: none;
						border: none;
						margin-left: 4rem;
						height: 2.5rem;
						width: 15rem;
					}
				}
			}
			.order-list{
				margin-top: 1.31rem;
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
				.order-list-wrap{
					display: flex;
				}
				.right-wrap{
					flex: 720;
					display: flex;
					font-size: 1.5rem;
					color: #333333;
					.order-user{
						flex: 196;
						box-sizing: border-box;
						flex: 198;
						display: flex;
						align-items: center;
						justify-content: center;
						border-right: 1px solid #E5E5E5;
						border-bottom: 1px solid #E5E5E5;
						p{
							text-align: center;
							margin-bottom: 1.25rem;
							color:  #FF7B7B;
						}
						span{
							color: #999999;
						}
					}
					.order-price{
						box-sizing: border-box;
						flex: 198;
						display: flex;
						align-items: center;
						justify-content: center;
						border-right: 1px solid #E5E5E5;
						border-bottom: 1px solid #E5E5E5;
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
						border-right: 1px solid #E5E5E5;
						border-bottom: 1px solid #E5E5E5;
						flex: 326;
						display: flex;
						align-items: center;
						justify-content: center;
						.order-status-inner{
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							.status{
								color: #FF7B7B;
							}
							.look-detail{
								color: #4A90E2;
							}
							p{
								margin-bottom: 0.5rem;
								&:last-child{
									margin-bottom: 0;
								}
								&:nth-of-type(2){
									font-weight: 600;
								}
								&:active{
									opacity: 0.8;
								}
							}
						}
					}
				}
				.order-detail-wrap{
					flex: 1319;
					.order-out-wrap{
						display: flex;
						// height: 100%;
						// border-top: 1px solid #E5E5E5;
						border-bottom: 1px solid #E5E5E5;
						li{
							border-right: 1px solid #E5E5E5;
							font-size: 1.5rem;
							color: #333333;
						}
						.order-goods{
							box-sizing: border-box;
							flex: 477;
							padding-bottom: 5rem;
							.order-inner{
								padding: 1.25rem;
								display: flex;
								img{
									width: 6.01rem;
									height: 6.01rem;
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
							flex-direction: column;
							span{
								margin-right: 1.25rem;
							}
							.order-sku-inner{
								flex: 1;
								display: flex;
								flex-direction: column;
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
							align-items: center;
							justify-content: center;
							p{
								text-align: center;
								margin-bottom: 1.25rem;
							}
						}
						
					}
				}
			}
		}
	}
</style>
