<template>
    <div class="finalFashionMessage">
        <v-header :header="header"></v-header>
		<div class="message_wrap">
			<div class="inner_message">
				<!-- <p class="order_number">订单号：38855673</p> -->
				<div class="order_number">
					<label>销售顾问：</label>
					<select name="" id="" v-model="sale">
						<option :value="item.Name" v-for="item in optionsData" :key="item.Id">{{item.Name}}</option>
					</select>
				</div>
				<div class="base_message">
					<h3>客户信息</h3>
					<ul class="base_mes">
						<li>
							<div class="group-input">
								<label for="cusName">姓名</label>
								<div class="input">
									<input type="text" placeholder="输入姓名" id='cusName' v-model="Member.MemberName">
								</div>
							</div>
						</li>
						<li>
							<div class="group-input">
								<label for="cusTel">电话</label>
								<div class="input">
									<input type="text" placeholder="输入电话" v-model="Member.MemberMobile" id="cusTel" @oninput="getTel">
								</div>
							</div>
						</li>
						<li>
							<div class="group-input">
								<label for="">生日</label>
								<div class="input">
									<input type="date" placeholder="点击选取" v-model="Member.Anniversary">
								</div>
							</div>
						</li>
					</ul>
					<ul class="base_mes second_base_mes">
						<li class="mermer">
							<div>会员</div>
							<div class="memmer-wrap">
								<div class="group-inputs" @click="isMember=true">
									<input type="radio" name="stone" />
									<div class="outCircle" :class="{'outCircleBorder':isMember}">
										<div :class="{'innerCircle':isMember}"></div>
									</div>
									<label for="">会员</label>
								</div>
								<div class="group-inputs" @click="isMember=false">
									<input type="radio" name="stone"/>
									<div class="outCircle" :class="{'outCircleBorder':!isMember}">
										<div :class="{'innerCircle':!isMember}"></div>
									</div>
									<label for="">非会员</label>
								</div>
							</div>
						</li>
						<li class="wx-input">
							<div class="group-input">
								<label for="">微信</label>
								<div class="input">
									<input type="text" placeholder="输入微信" v-model="Member.WeChat">
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="gray"></div>
				<div class="customer_message">
					<h3>货品信息</h3>
					<div class="order_detail" v-for="item in selectGoods" :key="item.Id">
						<div class="goods_title" v-if='item.ProType == "1"'><span>时尚定制</span><em>总价： ¥{{item.TotalPrice | moneyToFixed}}</em></div>
						<div class="goods_title" v-if='item.ProType == "4"'><span>轻奢定制</span><em>总价： ¥{{item.TotalPrice | moneyToFixed}}</em></div>
						<div class="goods_title" v-if='item.ProType == "3"'><span>来图定制</span><em>总价： ¥{{item.TotalPrice | moneyToFixed}}</em></div>
						<div class="goods_title" v-if='item.ProType == "2"'><span>套装</span><em>总价： ¥{{item.TotalPrice | moneyToFixed}}</em></div>
						<div class="goods">
							<div class="goods_message">
								<p class="ring"><span>戒托信息</span><em>¥{{item.RingPrice | moneyToFixed}}</em></p>
								<ul>
									<li v-if='item.ProType != "3"'><span>类别</span><em>{{item.ClassName}}</em></li>
									<li v-if='item.ProType == "3"'><span>类别</span><em>{{item.class}}</em></li>
									<li><span>成色</span><em>{{item.finness}}</em></li>
									<li><span>手寸</span><em>{{item.handsize}}</em></li>
									<li><span>刻字</span><em v-if="item.Lettering">{{item.Lettering}}</em><em v-else>无</em></li>
									<li v-if='item.ProType == "3"'><span>类型</span><em>{{item.goldType}}</em></li>
								</ul>
							</div>
							<div class="goods_message" >
								<p class="ring" v-if='item.ProType == "1"||item.ProType == "3"'><span>配石信息</span><em>¥{{item.StonePrice| moneyToFixed}}</em></p>
								<div v-if='item.ProType == "2"' v-for="(cell,index1) in item.mainSton" :key="index1">
									<p class="ring"><span>配石信息</span><em>¥{{cell.TotalPrice | moneyToFixed}}</em></p>
									<ul>
										<li><span>形状</span><em>{{cell.Shape}}</em></li>
										<li><span>重量</span><em>{{cell.Weight}}ct</em></li>
										<li><span>颜色</span><em>{{cell.Color}}</em></li>
										<li><span>切工</span><em>{{cell.Cut}}</em></li>
										<li><span>净度</span><em>{{cell.Clarity}}</em></li>
									</ul>
									<p class="ring"><span>镶石信息</span></p>
									<ul>
										<li class="differ"><span>镶石粒数</span><em v-if="cell.subStoneNum">{{cell.subStoneNum}}</em><em v-else>无</em></li>
										<li class="differ"><span>镶石类别</span><em v-if="cell.Category">{{cell.Category}}</em><em v-else>无</em></li>
										<li class="differ"><span>镶石重量</span><em v-if="item.subStoneWeight">{{item.subStoneWeight}}ct</em><em v-else>无</em></li>
									</ul>
								</div>
								
								<ul v-if='item.ProType == "1"||item.ProType == "3"'>
									<li><span>形状</span><em>{{item.stoneData.Shape}}</em></li>
									<li><span>重量</span><em>{{item.stoneData.Weight}}ct</em></li>
									<li><span>颜色</span><em>{{item.stoneData.Color}}</em></li>
									<li><span>切工</span><em>{{item.stoneData.Cut}}</em></li>
									<li><span>净度</span><em>{{item.stoneData.Clarity}}</em></li>
								</ul>
								
								<p class="ring" v-if='item.ProType!="2"'><span>镶石信息</span></p>
								<ul v-if='item.ProType!="2"'>
									<li class="differ"><span>镶石粒数</span><em v-if="item.StoneQuantity">{{item.StoneQuantity}}</em><em v-else>无</em></li>
									<li class="differ"><span>镶石类别</span><em v-if="item.StoneCategory">{{item.StoneCategory}}</em><em v-else>无</em></li>
									<li class="differ"><span>镶石重量</span><em v-if="item.StoneWeight">{{item.StoneWeight}}ct</em><em v-else>无</em></li>
								</ul>
							</div>
						</div>
					</div>
					<!-- <div class="order_detail">
						<div class="goods_title"><span>时尚定制</span><em>总价：¥18,700.00</em></div>
						<div class="goods">
							<div class="goods_message">
								<p class="ring"><span>戒托信息</span><em>¥2,400.00</em></p>
								<ul>
									<li><span>类别</span><em>女戒</em></li>
									<li><span>成色</span><em>18K红</em></li>
									<li><span>手寸</span><em>10</em></li>
									<li><span>刻字</span><em>my lover  微软雅黑</em></li>
									<li><span>类型</span><em>偏重</em></li>
								</ul>
							</div>
							<div class="goods_message">
								<p class="ring"><span>配石信息</span><em>¥2,400.00</em></p>
								<ul>
									<li><span>形状</span><em>圆形</em></li>
									<li><span>重量</span><em>0.3ct</em></li>
									<li><span>颜色</span><em>F</em></li>
									<li><span>切工</span><em>3EX</em></li>
									<li><span>净度</span><em>VS1</em></li>
									<li class="differ"><span>辅石粒数</span><em>1</em></li>
									<li class="differ"><span>辅石类别</span><em>红宝石</em></li>
									<li class="differ"><span>辅石重量</span><em>0.03ct</em></li>
								</ul>
							</div>
						</div>
					</div> -->
				</div>
				<div class="gray"></div>
				<div class="tip">
					<h2>总金额：¥{{totalPrice | moneyToFixed}}</h2>
					<div class="tips_wrap">
						<div class="left">
							<p>下单日期：<span>{{nowDate | date}}</span></p>
							<p>预计取货日期：{{sumbitDate}}</p>
							<p>销售顾问：<span>{{sale}}</span></p>
						</div>
						<div class="right">
							<p>客户须知：</p>
							<p>1、定制周期：现货定制约为12个工作日。</p>
							<p>2、如果遇到天气、法定节假日、物流、业务过于繁忙等原因，可能导致产品周期延长。</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 确认定制 -->
			<div class="next_step" @click="next_step">提交订单</div>
		</div>
       
		<!-- 弹窗 -->
		<div class="alert_pay" v-show="false">
			<div class="pay">
				<ul>
					<router-link tag='li' to="/finalFashion/finished">
						<img src="../../assets/assetsFinal/onlinePay.png" alt="">
						<p>线上支付</p>
					</router-link>
					<li>
						<img src="../../assets/assetsFinal/underPay.png" alt="">
						<p>线下支付</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- <div class="mask" :class="{'active': isShow}"></div> -->
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
                    title: '确认订单',
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
				}
            }
		},
		filters: {
			moneyToFixed(val){
				if(!val) return 0
				let num = val.toFixed(2)
				return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			},
			date(val) {
				if(!val) return 
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
			}
		},
		created (){
			window.vm =this;
			if(this.$store.state.relate.selectGoods.length>0) {
				this.selectGoods = this.$store.state.relate.selectGoods;
				let stoneTotal = 0, stylePrice = 0;
				this.selectGoods.forEach(item=>{
					stylePrice += item.TotalPrice;
					item.SpecialAtts.forEach(item1=>{
						if(item1.StyleAttrName == "成色"){
							item.finness = item1.StyleAttrValueName
						}else if(item1.StyleAttrName == "戒指手寸"||item1.StyleAttrName == '吊坠尺寸'){
							item.handsize = item1.StyleAttrValueName
						}else if(item1.StyleAttrName == "镶口大小"){
							item.InlaySize = item1.StyleAttrValueName
						}
					})
					let str = '',str1 = '',doubleStoneData = [], doubleStoneObj = {};
					 
					// item.subStoneWeight = str.slice(0,-1);
					// item.subStoneCategory = str1.slice(0,-1);
					item.ProStones.forEach(item1=>{
						stoneTotal += item1.TotalPrice
					})
				})
				this.totalPrice = stylePrice;
			}
			let getworkday = this.$options.filters['getworkday'];//这里是调用局部的过滤器
			let time = getworkday(this.nowDate)
			let date = this.$options.filters['date']
			this.sumbitDate = date(time)
			this.selectInit();
		},
        methods: {
			show () {
				this.isShow = false; 
			},
			 getTel (){
				console.log(44)
				let fiter = this.$options.filters['phone']
				if(!fiter(this.Member.MemberMobile)){
					this.tips('请检查你的手机号码是否正确！')
				}
			},
			selectInit (){
				this.isloading = true;
				let options = {
					url: '/purchase_Api_StoneOut_Init'
				}
				let cbok = (res) => {
					let data = res.data.data.empList;
					this.optionsData = data;
					this.isloading = false;
				}
				this.http.get(options,cbok)
			},
            next_step () {
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
							margin-bottom: 1.25rem;
							.group-input{
								display: flex;
								align-items: center;
								.input{
									width: 15rem;
									height: 4.38rem;
									margin-left: 1.25rem;
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
								margin: 0 auto;
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
