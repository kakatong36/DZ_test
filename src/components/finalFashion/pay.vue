<template>
	<div class="payFashion">
		<v-header :header="header"></v-header>
		<div class="pay-content">
			<div class="pay-page">
				<!-- <div class="pay-text">支付宝支付</div> -->
				<div class="img-quirloy">
					<img src="" alt="">
				</div>
				<div class="pay-success">付款成功后，请点击提交</div>
				<div class="price-text"><span></span><em v-if="orderData.SettlementAmount">¥{{Number(orderData.SettlementAmount).toFixed(2)|money }}</em></div>
			</div>
			<div class="gray"></div>
			<div class="order-message">
				<div class="order-wrap">
					<p>订单号<span style="margin-left:1em;">：{{orderData.OrderNo}}</span></p>
					<p>下单日期：<span>{{orderData.InTime}}</span></p>
					<p>销售顾问：<span>{{orderData.SaleUserName}}</span></p>
				</div>
			</div>
			<div class="payWrap">
			<div class="alert_pay">
				<div class="pay">
					<p class="pay-title">支付方式</p>
					<ul>
						<li v-for="item in payData" :key="item.Id" @click="getPay(item)" :class="{'active': curId == item.Id}">
							<div class="group-input">
								<input type="radio" name="stone"/>
								<div class="outCircle" :class="{'outCircleBorder':curId == item.Id}">
									<div :class="{'innerCircle':curId == item.Id}"></div>
								</div>
							</div>
							<div class="pay-inner">
								<img :src="item.imgCode" alt="">
								<p>{{item.Name}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="QRCode" v-if="payQRImg">
				<qriously :size="150" :value="payQRImg"></qriously>
			</div>
			<div class="noQRCode" v-else>无法获取二维码</div>
			</div>
			<div class="sumbit" @click="next_step">提交</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/finalFashion/header'
	const img = require('../../assets/assetsFinal/icon_alipay.png');
	const img1 = require('../../assets/assetsFinal/icon_wechat.png');
	const img2 = require('../../assets/assetsFinal/icon_quickpass.png');
	const img3 = require('../../assets/assetsFinal/icon_pos.png');
	export default {
		data () {
			return {
				header:{
					title: '支付',
					isShow: true,
				},
				orderData: {},
				payData: [],
				curId: '',

				payQRImg: "",
				
				isInited: false,
				orderId: null
			}
		},
		created() {
			
		},
		watch: {
			isInited: function(newVal, oldVal){
				if(newVal === oldVal){
					return false;
				}
				if(newVal === true){
					this.payType();
				}
			}
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				let params = vm.$route.params
				vm.orderId = params.id
				params.id = params.styleId
				vm.header.return = {
					name: 'finalFashionMessageNew',
					params: params,
					query: vm.$route.query
				}
				vm.getInit();
			})
		},
		methods:{
			next_step(){
				this.$router.push('/finalFashion/finished');
			},
			getPay(item){
				this.curId = item.Id;
				if(item.payQRImg){
					this.payQRImg = item.payQRImg;
				}else{
					this.payQRImg = "";
				}
			},
			payType (){
				let vm = this;
				let options = {
					url: '/pay_Api_PaymentType_GetDropList',
				}
				/* let cbok = (res) => {
					let data = res.data.data;
					data.forEach(item=>{
						if(item.Name == '支付宝'){
							this.curId = item.Id
							item.imgCode = img
						}else if(item.Name == '微信'){
							item.imgCode = img1
						}else if(item.Name == '云闪付'){
							item.imgCode = img3
						}else if(item.Name == 'POS机'){
							item.imgCode = img2
						}
					})
					this.payData = data;
				} */


				let cbok = (res) => {
					let data = res.data.data;
					data.forEach(item=>{
						if(item.Name == '支付宝'){
							this.curId = item.Id;

							item.imgCode = img

							this.http.getPayQRCode({
								url: "interface_Api_AliPay_ScanPay",
								params: {
									paymentTypeId: item.Id,
									orderNo: this.orderData.OrderNo,
									totalFee: Number(this.orderData.SettlementAmount).toFixed(2),
									productInfo: "订单号："+this.orderData.OrderNo
								}
							},
							function(res){
								if(res.data){
									let url = res.data.data;
									if(url && url.indexOf("https://") == 0){
										vm.$set(item, "payQRImg", url);
										vm.payQRImg = url;
									}
								}
							},
							function(){

							},
							function(){

							});
						}else if(item.Name == '微信'){
							item.imgCode = img1

							this.http.getPayQRCode({
								url: "interface_Api_pay_GetRequestUrl",
								params: {
									paymentTypeId: item.Id,
									orderNo: this.orderData.OrderNo,
									totalFee: Number(this.orderData.SettlementAmount).toFixed(2),
									productInfo: "订单号："+this.orderData.OrderNo
								}
							},
							function(res){
								if(res.data){
									let url = res.data.data;
									if(url && url.indexOf("weixin://") == 0){
										vm.$set(item, "payQRImg", url);
									}
								}

							},
							function(){

							},
							function(){

							});

						}else if(item.Name == '云闪付'){
							item.imgCode = img3
						}else if(item.Name == 'POS机'){
							item.imgCode = img2
						}
					})
					this.payData = data;

				};



				let cbno = (res) => {
					alert("获取支付方式失败")
				};
				let cbnull = (res) => {
					alert("获取支付方式失败")
				};
				this.http.get(options,cbok,cbno,cbnull)
			},
			getInit (){
				let options = {
					url: '/order_Api_OrderCustomize_GetOrderPay',
					params:{
						OrderId: this.orderId
					}
				}
				let cbok = (res) => {
					let data = res.data.data;
					this.orderData = data;
					if(!this.isInited){
						this.isInited = true;
					}
					if (data.InTime) {
						this.orderData.InTime = data.InTime.replace("T"," ");
					} else {
						data.InTime = ""
					}
				}
				this.http.get(options,cbok)
			}
		},
		components:{
			'v-header':header
		}
	}
</script>

<style lang="scss">
	.payFashion{
		// margin-top: 3.75rem;
		height: 100%;
		.pay-content{
			padding: 7.44rem 0;
			.pay-page{
				height: 40rem;
				background: url('../../assets/assetsFinal/bg.png') no-repeat center;
				background-size: 100% 100%;
				color: #ffffff;
				font-size: 3rem;
				text-align: center;
				box-sizing: border-box;
				position: relative;
				.img-quirloy{
					width: 26.25rem;
					height: 26.25rem;
					margin-bottom: 2.79rem;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.pay-text{
					padding: 1.25rem;
				}
				.pay-success{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate((-50%));
					font-size: 2.25rem;
				}
				.price-text{
					position: absolute;
					bottom: 2.13rem;
					left: 50%;
					transform: translateX(-50%);
				}
			}
			.gray{
				width: 100%;
				height: 1.25rem;
				background: #F5F5F5;
			}
			.order-message{
				color: rgba($color: #333333, $alpha: 0.8);
				height: 4.25rem;
				line-height: 4.25rem;
				font-size: 1.88rem;
				border: 1px solid #E5E5E5;
				.order-wrap{
					display: flex;
					justify-content: space-evenly;
					span{
						color: #333333;
					}
				}
			}
			.payWrap{
				display: flex;
			    justify-content: space-evenly;
			    align-items: center;
				height: 230px;
				.noQRCode{
					font-size: 1.88rem;
				}
			}
			.alert_pay{
				width: 45rem;
				background: #fff;
				border-radius: 0.63rem;
				.pay-title{
					color: #333;
					font-size: 1.88rem;
					text-align: center;
					height: 5rem;
					line-height: 5rem;
					// border: 1px solid #E5E5E5;
					font-weight: 600;
				}
				ul{
					display: flex;
					align-items: center;
					flex-direction: column;
					li{
						// border-bottom: 1px solid #E5E5E5;
						// border-right: 1px solid #E5E5E5;
						// border-left: 1px solid #E5E5E5;
						// width: 19.56rem;
						width: 100%;
						height: 5rem;
						text-align: center;
						border-radius: 0.25rem;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #333;
						font-size: 1.88rem;
						text-align: center;
						position: relative;
						&.active{
							box-shadow: 0 0 4px 0 rgba(255,123,123,0.40);
						}
						img{
							width: 2rem;
							// margin-top: 1.75rem;
						}
						p{
							color: #333333;
							font-size: 1.88rem;
							margin-left: 1.25rem;
						}
						.pay-inner{
							width: 10rem;
							display: flex;
							align-items: center;
							justify-content: flex-start;
						}
						.group-input{
							position: absolute;
							left: 3.77rem;
							top: 50%;
							transform: translateY(-50%);
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
			.sumbit{
				background-image: linear-gradient(-134deg, #FFBABA 0%, #F27474 100%);
				border-radius: 0.63rem;
				font-size: 1.88rem;
				color: #ffffff;
				width: 25rem;
				height: 5.5rem;
				text-align: center;
				line-height: 5.5rem;
				margin: 0 auto;
				margin-top: 5rem;
				&:active{
					opacity: 0.8;
				}
			}
		}
	}
</style>