<template>
    <div class="finalFashionMessageNew">
        <v-header :header="header"></v-header>
		<div class="message_wrap">
			<div class="inner_message">
				<!-- <p class="order_number">订单号：38855673</p> -->
				<div class="order_number" style="display: flex;justify-items: center;">
					<label>销售顾问：</label>
					<div class="select widget">
						<p @click="isShowSalerOption = !isShowSalerOption;" :id="sale.id">{{sale.name}}</p>
						<transition name="opacityLeave">
						<div class="wrap" v-if="isShowSalerOption">
							<ul>
								<li v-for="(item, index1) in optionsData" :key="index1" @click="selectSaler(item.Id, item.Name)">{{item.Name}}</li>
							</ul>
						</div>
						</transition>
					</div>
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
									<input type="text" placeholder="输入电话" v-model="Member.MemberMobile" id="cusTel" @change="getTel">
								</div>
							</div>
						</li>
						<li style="visibility: hidden;">
							<div class="group-input">
								<label for="">生日</label>
								<div class="input">
									<input type="text" placeholder="点击选取" @click="showPickDate" readonly v-model="Member.Anniversary" v-if="isApp">
									<input type="date" placeholder="点击选取" v-model="Member.Anniversary" v-else>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="gray"></div>
				<div class="customer_message">
					<h3>货品信息</h3>
					<div class="order_detail" v-for="(item, index2) in selectGoods" :key="index2">
						<div class="goods_title">
							<span v-if="['1', '10', '11'].includes(item.ProType)">时尚定制</span>
							<span v-else-if='item.ProType == "4"'>轻奢定制</span>
							<span v-else-if='item.ProType == "3"'>来图定制</span>
							<span v-else-if="item.ClassName">{{item.ClassName}}</span>
							<em>总价： ¥{{item.TotalPrice.toFixed(2) | money}}</em>
						</div>
						<div class="goods" v-for="(list, index3) in item.stoneData" :key="index3">
							<div class="goods_message" v-if="item.ProType!='10'">
								<p class="ring">
									<span v-if="list.CategoryName =='自由女神'" style="font-weight: 600;">{{list.StyleName + '  ' +list.ClassName + '  ' +list.StyleCategory}}</span>
									<span v-else>戒托信息</span>
									<em>¥{{list.RingPrice.toFixed(2) |money}}</em>
								</p>
								<ul>
									<li><span>成色</span><em>{{list.finness?list.finness:'无'}}</em></li>
									<li><span>手寸</span><em>{{list.handSize?list.handSize:'无'}}</em></li>
									<li><span>刻字</span><em v-if="list.Lettering">{{list.Lettering}}</em><em v-else>无</em></li>
								</ul>
							</div>
							<div class="goods_message">
								<div>
									<p v-if="list.Shape && item.ProType != '2'" class="ring"><span>配石信息</span><em>¥{{item.StonePrice.toFixed(2) | money}}</em></p>
									<p v-if="list.Shape && item.ProType == '2'" class="ring"><span>配石信息</span><em>¥{{list.StonePrice.toFixed(2) | money}}</em></p>
									<ul v-if="list.Shape">
										<li><span>形状</span><em>{{list.Shape}}</em></li>
										<li><span>重量</span><em>{{list.Weight}}ct</em></li>
										<li><span>颜色</span><em>{{list.Color}}</em></li>
										<li><span>切工</span><em>{{list.Cut}}</em></li>
										<li><span>净度</span><em>{{list.Clarity || list.Cleanliness}}</em></li>
									</ul>
									<p class="ring" v-if="item.ProType!='10'"><span>镶石信息</span></p>
									<ul v-if="item.ProType!='10'">
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
					<h2>总金额：¥{{Number(totalPrice).toFixed(2)|money}}</h2>
					<div class="tips_wrap">
						<div class="left">
							<p>下单日期：<span>{{nowDate | date}}</span></p>
							<p>预计取货日期：{{sumbitDate}}</p>
							<p>销售顾问：<span>{{sale.name}}</span></p>
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
		<v-loading v-show="isloading"></v-loading>
		<promptBox :msg="msg" v-show="ispromptBox"></promptBox>
    </div>
</template>

<script>
	import { mapState, mapGetters, mapMutations, mapActions} from 'vuex' //y

    import footer from './footer'
    import header from './header'
	import loading from 'components/isLoading/isloading'
	import promptBox from 'components/promptBox/promptBox'
    export default {
        data () {
            return {
				isApp: self.isApp,
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
				sale: {
					id:'',
					name: ''
				},
				orderNo: '',

				ispromptBox: false,
				msg: {
					text: '',
					time: '',
					show: false
				},
				correctTel: true,
				isShowSalerOption: false,
				params: null,
				directBuy: false
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
		//y
		beforeRouteEnter (to, from, next) {
			next(vm => {
				if (from.name == "finalFashionPay" ) {
					vm.sale.id = vm.x_messageNew_state.saleId,
					vm.sale.name = vm.x_messageNew_state.saleName,
					vm.Member.MemberName = vm.x_messageNew_state.memberName,
					vm.Member.MemberMobile = vm.x_messageNew_state.memberMobile
					vm.params = vm.$route.query.data || null
				}else{
					vm.sale.id = "",
					vm.sale.name = "",
					vm.Member.MemberName = "",
					vm.Member.MemberMobile = ""
					vm.params = null
				}
			});
		},
		created (){
			window.vm =this;
			if(this.$route.query.name){//直接购买过来 或付款退回来
				this.directBuy = true
				let query = this.$route.query,
					name = this.$route.query.name
				delete query.name
				this.header.return = {
					name,
					params: this.params || this.$route.params,
					query
				}
			}
			if(this.$store.state.relate.selectGoods.length>0) {
				this.selectGoods = this.$store.state.relate.selectGoods
				this.selectGoods.StonePrice = this.selectGoods.StonePrice || 0
				this.selectGoods.forEach(item=>{
					item.stoneData = item.stoneData || []
					item.stoneData.forEach(stone => {
						stone.StonePrice = stone.StonePrice || 0
						stone.RingPrice = stone.RingPrice || item.RingPrice || 0
					})
					item.TotalPrice = item.TotalPrice || 0
					this.totalPrice += item.TotalPrice
				})
			}else{
				this.$router.go(-1)
			}
			let getworkday = this.$options.filters['getworkday'];//这里是调用局部的过滤器
			let time = getworkday(this.nowDate)
			let date = this.$options.filters['date']
			this.sumbitDate = date(time);
			this.selectInit();
		},
		//y
		computed: { 
			...mapState({
				x_messageNew_state: state => state.messageNew.state,
				x_messageNew_isSubmit: state => state.messageNew.isSubmit
			})
		},
        methods: {
			//y
			...mapMutations ({ 
				f_messageNew_state: "messageNew_state",
				f_messageNew_isSubmit: "messageNew_isSubmit"
			}),

			selectSaler (id, name) {
				this.isShowSalerOption = false;
				this.sale.id = id;
				this.sale.name = name;
			},
			showPickDate () {
				let _this = this;
				if(self.isApp){
					plus.nativeUI.pickDate( function(e){
						let d = e.date;
						let date = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
						_this.Member.Anniversary = date;
					},function(e){
						
					});
				}else{
					alert("不是安装版本")
				}

				//this.Member.Anniversary
			},
			show () {
				this.isShow = false; 
			},
			getTel (){
				let that = this
				let fiter = this.$options.filters['phone']
				if(!fiter(this.Member.MemberMobile)){
					tips('请输入正确的手机号码！')
					this.correctTel = false
				}else{
					this.correctTel = true;
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
			},
			selectInit (){
				this.isloading = true;
				let options = {
					url: '/system_Api_Employee_DropList'
				}
				let cbok = (res) => {
					this.isloading = false;
					let data = res.data.data;
					this.optionsData = data;
				}
				let cbno = res => {
					this.isloading = false;
					this.tips && this.tips(res.data.message || "服务开小差！")
				};
				let cbnull = res => {
					this.isloading = false;
				};
				this.http.get(options,cbok,cbno,cbnull)
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
					SaleUserId: this.sale.id,
					SaleUserName: this.sale.name,
					Delivery: null,
					ExpectDeliveryTime: this.sumbitDate,
					Discount: null,
				}
				
				let url = '/order_Api_OrderCustomize_SubmitOrder'
				
				if(this.directBuy){//立即购买
					let ProductList = this.selectGoods
					if(!ProductList || !ProductList.length){
						return
					}
					url = '/order_Api_OrderCustomize_SubmitImmediately'
					let obj = {ProductList}
					obj.MemberName = this.Member.MemberName
					obj.MemberMobile = this.Member.MemberMobile
					obj.SaleUserId = params.SaleUserId
					obj.ExpectDeliveryTime = params.ExpectDeliveryTime
					params = obj
				}else{
					this.selectGoods.forEach(item=>{
						params.CartIds.Ids.push(item.Id);
					})
				}
				let options = {
					url,
					params:params
				}
				let cbok = (res) => {
					this.isShow = true;
					let data = res.data.data;
					this.orderNo = data;
					this.isloading = false;
					//y
					this.f_messageNew_isSubmit(true); 					
					this.f_messageNew_state({
						saleId: this.sale.id,
						saleName: this.sale.name,
						memberName: this.Member.MemberName,
						memberMobile: this.Member.MemberMobile
					})
					let params = this.$route.params
					params.styleId = params.id
					params.id = data
					this.$router.push({
						name: 'finalFashionPay',
						params: params,
						query: this.$route.query
					})
				}
				let cbno = (res) => {
					this.isloading = false;
					tips('订单提交失败！')
				}
				if(params.SaleUserId&&this.Member.MemberName&&this.Member.MemberMobile&&this.correctTel){
					this.isloading = true;
					this.http.post(options,cbok,cbno)
				}else{
					if(!params.SaleUserId){
						tips('请选择销售顾问！')
					}else if(!this.Member.MemberName){
						tips('请输入姓名！')
					}else if(!this.Member.MemberMobile){
						tips('请输入电话！')
					}else if(!this.correctTel){
						tips('请输入正确的手机号码！')
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
    .finalFashionMessageNew{
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


		.select.widget{
			position: relative;
			display: inline-block;
			margin: .25rem 0;
		    &>p{
			    padding-left: 0.63rem;
			    width: 15rem;
				height: 4.38rem;
				border: 1px solid #e5e5e5;
			}
			.wrap{
				width: 30rem;
				position: absolute;
				background: #FFFFFF;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
				left: 0;
				margin-top: 1.25rem;
				box-sizing: border-box;
				z-index: 99;
				ul{
					display: flex;
					flex-wrap: wrap;
					width: 30.3rem;
					border: 1px solid #E5E5E5;
					box-sizing: border-box;
					overflow: hidden;
					li{
					    width: 33.3%;
						height: 4.38rem;
						color: #333;
						font-size: 1.5rem;
						box-sizing: border-box;
						text-align: center;
						padding: 0;
						margin: 0;
						border-right: 1px solid #E5E5E5;
						border-bottom: 1px solid #E5E5E5;
					}
				}
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
