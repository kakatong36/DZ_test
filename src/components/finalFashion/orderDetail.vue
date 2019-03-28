<template>
    <div class="finalFashionMessage">
        <v-header :header="header"></v-header>
		<div class="message_wrap">
			<div class="inner_message">
				<div class="order-title">
					<div class="order_number">
						<label>销售顾问：</label>
						<span>{{orderDetailData.SaleUserName}}</span>
					</div>
					<p class="order_number">订单号：{{orderDetailData.OrderNo}}</p>
				</div>
				<div class="base_message">
					<h3>客户信息</h3>
					<ul class="base_mes">
						<li>
							<div class="group-input">
								<label for="cusName">姓名</label>
								<div class="input">
									<span v-if="orderDetailData.member">{{orderDetailData.member.MemberName}}</span>
								</div>
							</div>
						</li>
						<li>
							<div class="group-input">
								<label for="cusTel">电话</label>
								<div class="input">
									<span v-if="orderDetailData.member">{{orderDetailData.member.MemberMobile}}</span>
								</div>
							</div>
						</li>
						<li>
							<div class="group-input">
								<label for="">生日</label>
								<div class="input">
									<span v-if="orderDetailData.member">{{orderDetailData.member.Anniversary?orderDetailData.member.Anniversary :'无'}}</span>
								</div>
							</div>
						</li>
					</ul>
					<ul class="base_mes second_base_mes">
						<li class="wx-input">
							<div class="group-input">
								<label for="">微信</label>
								<div class="input">
									<span v-if="orderDetailData.member">{{orderDetailData.member.WeChat ? orderDetailData.member.WeChat:'无'}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="gray"></div>
				<div class="customer_message">
					<h3>货品信息</h3>
					<div class="order_detail" v-for="(item, index) in selectGoods" :key="index">
						<div class="goods_title">
							<span v-if="['1', '10', '11'].includes(item.StyleType)">时尚定制</span>
							<span v-else-if='item.StyleType == "4"'>轻奢定制</span>
							<span v-else-if='item.StyleType == "3"'>来图定制</span>
							<span v-else>{{item.CategoryName}}</span>
							<em>总价： ¥{{Number(item.TotalPrice).toFixed(2)|money}}</em>
						</div>
						<div class="goods"  v-for="(list, index1) in item.stoneData" :key="index1">
							<div class="goods_message" v-if="item.StyleType != '10'">
								<p class="ring">
									<span v-if="list.CategoryName =='自由女神'" style="font-weight: 600;">{{list.StyleName + '  ' +list.ClassName + '  ' +list.StyleCategory}}</span>
									<span v-else>戒托信息</span>
									<em>¥{{list.RingPrice.toFixed(2)|money}}</em>
								</p>
								<ul>
									<li><span>成色</span><em>{{list.finness?list.finness:'无'}}</em></li>
									<li><span>手寸</span><em>{{list.handSize?list.handSize:'无'}}</em></li>
									<li><span>刻字</span><em v-if="list.Lettering">{{list.Lettering}}</em><em v-else>无</em></li>
								</ul>
							</div>
							<div class="goods_message">
								<div>
									<p v-if="list.Shape" class="ring"><span>配石信息</span><em>¥{{list.StonePrice.toFixed(2)|money}}</em></p>
									<ul v-if="list.Shape">
										<li><span>形状</span><em>{{list.Shape}}</em></li>
										<li><span>重量</span><em>{{list.Weight}}ct</em></li>
										<li><span>颜色</span><em>{{list.Color}}</em></li>
										<li><span>切工</span><em>{{list.Cut}}</em></li>
										<li><span>净度</span><em>{{list.Clarity}}</em></li>
									</ul>
									<p class="ring" v-if="item.StyleType != '10'"><span>镶石信息</span></p>
									<ul v-if="item.StyleType != '10'">
										<li class="differ"><span>镶石粒数</span><em v-if="list.StoneQuantity">{{list.StoneQuantity}}</em><em v-else>无</em></li>
										<li class="differ"><span>镶石类别</span><em v-if="list.StoneCategory">{{list.StoneCategory}}</em><em v-else>无</em></li>
										<li class="differ"><span>镶石重量</span><em v-if="list.StoneWeight">{{list.StoneWeight}}ct</em><em v-else>无</em></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="gray"></div>
				<div class="tip">
					<h2>总金额：¥{{totalPrice.toFixed(2) | money}}</h2>
					<div class="tips_wrap">
						<div class="left">
							<p>下单日期：<span v-if="orderDetailData.InTime">{{orderDetailData.InTime|date}}</span></p>
							<p>预计取货日期：{{orderDetailData.ExpectDeliveryTime | date}}</p>
							<p>销售顾问：<span>{{orderDetailData.SaleUserName}}</span></p>
						</div>
						<div class="right">
							<p>客户须知：</p>
							<p>1、定制周期：现货定制约为12个工作日。</p>
							<p>2、如果遇到天气、法定节假日、物流、业务过于繁忙等原因，可能导致产品周期延长。</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-loading v-show="isloading"></v-loading>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
    </div>
</template>

<script>
    import footer from './footer'
    import header from './header'
	import loading from 'components/isLoading/isloading'
	import promptBox from 'components/promptBox/promptBox'
    export default {
        data () {
            return {
                finishParams:{
                    isStone: true,
                    isPay: true,
					isFinished: false,
					isShow: true,
                },
                header:{
                    title: '订单详情',
					isShow: true,
				},
				isShow: false,
				isMember: true,
				isloading: false,

				selectGoods: [],
				totalPrice: 0,
				Member: {
					MemberName: '',
					MemberMobile: '',
					WeChat:'',
					Anniversary: '',
					QQ: '',
					Email: '',
					MemberId: ''
				},
				nowDate: new Date(),
				sumbitDate: '',
				optionsData: [],
				sale: '',
				orderNo: '',

				ispromptBox: false,
				msg: {
					text: '',
					time: '',
					show: false
				},
				orderDetailData: {},
            }
		},
		filters: {
			moneyToFixed(val){
				if(!val) return 0
				let num = val.toFixed(2)
				return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			},
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
			getworkday (date) {
				var  date=new Date();    
				var millisceonds =date.getTime();    
				for(var i=1;i<=12;i++){    
					millisceonds +=24*60*60*1000;    
					date.setTime(millisceonds);    
					if(date.getDay()==0||date.getDay()==6) i--;    
				}    
				return date;   
			},
			data2(val){
				if(!val){
					return
				}
				let arr = val.split('-')
				return arr[0] + "年" + arr[1] + "月" + arr[2] + '日' 
			}
		},
		created (){
			window.vm =this;
			if(this.$store.state.relate.selectGoods.length>0) {
				this.selectGoods = this.$store.state.relate.selectGoods;
				this.selectGoods.forEach(item=>{
					this.totalPrice += item.TotalPrice
				})
			}
			let getworkday = this.$options.filters['getworkday'];//这里是调用局部的过滤器
			let time = getworkday(this.nowDate)
			let date = this.$options.filters['date']
			this.sumbitDate = date(time)
			// this.selectInit();
			this.getDetail();
		},
        methods: {
			getDetail (){
				this.isloading = true;
				let options ={
					url: '/order_Api_OrderCustomize_GetOrder',
					params:{
						OrderId: this.$route.params.id
					}
				}
				let cbok = (res) =>{
					this.isloading = false;
					this.orderDetailData = res.data.data;
					this.selectGoods = this.orderDetailData.Styles
					this.selectGoods.forEach(item1=>{
						let obj = {},arr = [];
						if(item1.SetItems&&item1.SetItems.length>0){//套装
							let array = [];
							item1.SetItems.forEach(item3=>{
								let str = '',str1 = '',str2 = '',obj = {};
								if(item1.Attrs&&item1.Attrs.length){
									item1.Attrs.forEach(item2=>{
										if(item1.CategoryName== '自由女神'){
											if(item2.StyleAttrName == '成色'){
												obj.finness = item2.StyleAttrValueName
											}else if(item2.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
												obj.handSize = item2.StyleAttrValueName
											}else if(item2.StyleAttrName == '镶口大小'){
												obj.Insert = item2.StyleAttrValueName
											}else if(item2.StyleAttrName == '工艺分级'){
												item1.telco = item2.StyleAttrValueName
											}else if(item2.StyleAttrName == '品类'){
												item1.class = item2.StyleAttrValueName
											}else if(item2.StyleAttrName == '金托类型'){
												item1.goldType = item2.StyleAttrValueName
											}
										}else{
											if(item3.Id == item2.SetItemId){
												if(item2.StyleAttrName == '成色'){
													obj.finness = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
													obj.handSize = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '镶口大小'){
													obj.Insert = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '工艺分级'){
													item1.telco = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '品类'){
													item1.class = item2.StyleAttrValueName
												}else if(item2.StyleAttrName == '金托类型'){
													item1.goldType = item2.StyleAttrValueName
												}
											}
										}
									})
								}
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
								obj.CategoryName = item1.CategoryName
								obj.couplePrice = item3.RingPrice + item3.StonePrice
								obj.StyleName = item3.StyleName
								obj.Lettering = item3.Lettering
								obj.StyleCategory = item3.CategoryName
								obj.ClassName = item3.ClassName
								obj.RingPrice = item3.RingPrice || 0
								obj.StonePrice = item3.StonePrice || 0
								array.push(obj)
							})
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
							obj.RingPrice = item1.RingPrice || 0
							obj.StonePrice = item1.StonePrice || 0
							if(item1.Attrs&&item1.Attrs.length){
								item1.Attrs.forEach(item2=>{
									if(item2.StyleAttrName == '成色'){
										obj.finness = item2.StyleAttrValueName
									}else if(item2.StyleAttrName == '戒指手寸'||item1.StyleAttrName == '吊坠尺寸'){
										obj.handSize = item2.StyleAttrValueName
									}else if(item2.StyleAttrName == '镶口大小'){
										obj.Insert = item2.StyleAttrValueName
									}else if(item2.StyleAttrName == '工艺分级'){
										obj.telco = item2.StyleAttrValueName
									}else if(item2.StyleAttrName == '品类'){
										obj.class = item2.StyleAttrValueName
									}else if(item2.StyleAttrName == '金托类型'){
										obj.goldType = item2.StyleAttrValueName
									}
								})
							}
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
							}else{
								item1.isNoStone = true;
							}
							arr.push(obj)
							item1.stoneData = arr
						}
					})
					this.totalPrice = this.orderDetailData.SaleAmount
				}
				let cbno = () =>{

				}
				this.http.get(options,cbok)
			},
			show () {
				this.isShow = false; 
			},
			selectInit (){
				this.isloading = true;
				let options = {
					url: '/system_Api_Employee_DropList '
				}
				let cbok = (res) => {
					let data = res.data.data;
					this.optionsData = data;
					this.isloading = false;
				}
				this.http.get(options,cbok)
			},
            next_step () {``
				let that = this;
				let params = {
					CartIds: {
						Ids: []
					},
					Member:this.Member,
					DeliveryFee: 0,
					InsuranceFee: 0,
					PointDeductionQty: 0,
					PointDeductionMoney: 0,
					DeliveryType: 0,
					SaleUserId: '',
					SaleUserName: this.sale,
					Delivery: null,
					ExpectDeliveryTime: this.sumbitDate,
					Discount: null,
				}
				this.selectGoods.forEach(item=>{
					params.CartIds.Ids.push(item.Id);
				})
				this.optionsData.forEach(item=>{
					if(this.sale == item.Name){
						params.SaleUserId = item.Id;
					}
				})
				let options = {
					url: '/order_Api_OrderCustomize_SubmitOrder',
					params:params
				}
				let cbok = (res) => {
					this.isShow = true;
					let data = res.data.data;
					this.orderNo = data;
					this.isloading = false;
					this.$router.push('/finalFashion/pay/'+data);
				}
				let cbno = (res) => {
					this.isloading = false;
					tips('订单提交失败！')
				}
				if(params.SaleUserId&&this.Member.MemberName&&this.Member.MemberMobile){
					this.isloading = true;
					this.http.post(options,cbok,cbno)
				}else{
					if(!params.SaleUserId){
						tips('请选择销售顾问！')
					}else if(!this.Member.MemberName){
						tips('请输入姓名！')
					}else if(!this.Member.MemberMobile){
						tips('请输入电话！')
					}
				}
				function tips (text){
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
				}
            }
        },
         components: {
            'v-footer': footer,
			'v-header': header,
			'v-loading': loading,
			'promptBox':promptBox
        }
    }
</script>

<style lang="scss">

    #app{
        height: 100%;
    }
	.loading-text{
			font-size: 1.5rem;
			color: #999;
			text-align: center;
			width: 100%;
			padding: 0.8rem;
			position: absolute;
			bottom: -0.5rem;
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
    .finalFashionMessage{
		// margin-top: 3.75rem;
		background: #ffffff;
        height: 100%;
		.order-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #E5E5E5;
			padding-right: 1.25rem;
		}
		.message_wrap{
			padding: 1.25rem 1.88rem;
			box-sizing: border-box;
        	padding-top: 7.5rem;
			height: 100%;
			overflow: scroll;
			.inner_message{
				box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
				.order_number{
					color: #333333;
					font-size: 1.5rem;
					line-height: 5rem;
					padding-left: 1.25rem;
					box-sizing: border-box;
					height: 5rem;
					border-bottom: 1px solid #E5E5E5;
					select{
						width: 11.25rem;
						height: 4rem;
					}
				}
				h3{
					font-size: 2.25rem;
					color: #333333;
					line-height: 3.13rem;
					display: flex;
					align-items: center;
					padding-left: 1.25rem;
					box-sizing: border-box;
					margin-bottom: 1.25rem;
					&:before{
						content: '';
						display: inline-block;
						width: 1rem;
						height: 2.25rem;
						margin-right: 1.25rem;
						background-image: linear-gradient(-134deg, #FFBABA 0%, #F27474 100%);
					}
				}
				.base_message{
					padding-top: 1.94rem;
					.base_mes{
						display: flex;
						color: #333333;
						font-size: 1.5rem;
						line-height: 2.06rem;
						justify-content: space-between;
						padding-left: 3.5rem;
						padding-right: 3.5rem;
						box-sizing: border-box;
						li{
							box-sizing: border-box;
							// margin-bottom: 1.25rem;
							.group-input{
								display: flex;
								align-items: center;
								.input{
									width: 15rem;
									height: 2.38rem;
									margin-left: 1.25rem;
									line-height: 2.38rem;
									input[type="text"],input[type="date"]{
										width: 100%;
										height: 100%;
										padding-left: 0.63rem;
										box-sizing: border-box;
									}
								}
							}
						}
						&.second_base_mes{
							position: relative;
							// display: flex;
							// align-items: center;
							padding-bottom: 1.25rem;
							.wx-input{
								// margin: 0 auto;
							}
							.mermer{
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
								display: flex;
								.memmer-wrap{
									display: flex;
									align-items: center;
									margin-left: 1.25rem;
								}
								label{
									font-size: 1.5rem;
									color: #333333;
									margin-left: 1.25rem;
								}
								.group-inputs{
									position: relative;
									display: flex;
									align-items: center;
									margin-right: 1.88rem;
									input[type="radio"]{
										appearance: radio;
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
										top: -1px;
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
							}
						}
					}
				}
				.gray{
					width: 100%;
					height: 1.25rem;
					background: #F5F5F5;
				}
				.customer_message{
					padding-top: 2.5rem;
					.order_detail{
						background: #FFFFFF;
						border: 1px solid #999999;
						margin-left: 3.5rem;
						margin-right: 3.5rem;
						margin-bottom: 1.25rem;
						.goods_title{
							padding-left: 1.63rem;
							padding-right: 1.25rem;
							box-sizing: border-box;
							color: #333333;
							display: flex;
							justify-content: space-between;
							height: 4.31rem;
							align-items: center;
							font-size: 1.5rem;
							border-bottom: 1px solid #E5E5E5;
						}
						.goods{
							display: flex;
							.goods_message{
								width: 50%;
								padding-left: 1.63rem;
								padding-right: 1.25rem;
								box-sizing: border-box;
								padding-bottom: 1.5rem; 
								.ring{
									color: #333333;
									font-size: 1.5rem;
									margin-bottom: 1.25rem;
									padding-top: 1.25rem;
									span{
										margin-right: 0.63rem;
									}
								}
								ul{
									display: flex;
									flex-wrap: wrap;
									li{
										width: 50%;
										font-size: 1.5rem;
										color: #333333;
										margin-bottom: 0.63rem;
										span{
											opacity: 0.8;
											margin-right: 3em;
										}
										&.differ{
											span{
												margin-right: 1em;
											}
										}
									}
								}
							}
						}
					}
				}
				.tip{
					padding-left: 1.25rem;
					padding-top: 1.25rem;
					padding-bottom: 2.5rem;
					box-sizing: border-box;
					color: #333333;
					h2{
						font-size: 2.25rem;
						line-height: 3.13rem;
						font-weight: bold;
					}
					.tips_wrap{
						display: flex;
						padding-top: 0.63rem;
						p{
							margin-bottom: 0.63rem;
						}
						.left{
							font-size: 1.5rem;
							width: 50%;
							span{
								margin-left: 2em;
							}
						}
						.right{
							font-size: 1.5rem;
							width: 50%;
							span{
								margin-left: 2em;
							}
						}
					}
				}
			}
		}
        .next_step{
            width: 25rem;
            height: 5.5rem;
            text-align: center;
            line-height: 5.5rem;
            background-image: linear-gradient(-134deg, #FFBABA 0%, #F27474 100%);
            border-radius: 0.625rem;
            color: #ffffff;
            font-size: 1.5rem;
            letter-spacing: 0;
            margin: 0 auto;
            margin-top: 2.5rem;
            margin-bottom: 9.38rem;
            &:active{
                opacity: 0.8;
            }
        }
		// 付款
		@keyframes pay {
			0%{
				opacity: 0;
				top: 54%;
			}
			100%{
				opacity: 1;
				top: 50%;
			}
		}
    }
</style>
