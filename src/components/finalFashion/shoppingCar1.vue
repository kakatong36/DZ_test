<template>
	<div class="shoppingCar">
		<v-header :header="header"></v-header>
		<div class="shopping_wrap">
			<div class="out_wrap">
				<ul class="inner_wrap" ref="goods">
					<li class="goods_list">
						<div class="title">
							<div class="title_left">
								<span>来图定制</span>
								<em>¥13,560.00（含金工时费）</em>
							</div>
							<i class="close"></i>
						</div>
						<div class="goods_content">
							<ul class="goods_num">
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">戒托：¥2400.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down">
											<p><span>材质</span><em></em>18K金</p>
											<p><span>手寸</span><em></em>11</p>
										</div>
									</div>
								</li>
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">配石：¥12,000.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down marginBottom">
											<p><span>净度</span><em></em>VVS1</p>
											<p><span>切工</span><em></em>EX</p>
										</div>
										<div class="down">
											<p><span>成色</span><em></em>G</p>
											<p><span>重量</span><em></em>0.88g</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="goods_footer">
							<div class="total_num">共 1 件</div>
							<div class="group-input">
								<input type="checkbox" v-model="isSelFoods" name="stone">
								<div class="outCircle">
									<div :class="{'innerCircle':isSelFoods}"></div>
								</div>
							</div>
						</div>
					</li>
					<li class="goods_list">
						<div class="title">
							<div class="title_left">
								<span>来图定制</span>
								<em>¥13,560.00（含金工时费）</em>
							</div>
							<i class="close"></i>
						</div>
						<div class="goods_content">
							<ul class="goods_num">
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">戒托：¥2400.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down">
											<p><span>材质</span><em></em>18K金</p>
											<p><span>手寸</span><em></em>11</p>
										</div>
									</div>
								</li>
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">配石：¥12,000.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down marginBottom">
											<p><span>净度</span><em></em>VVS1</p>
											<p><span>切工</span><em></em>EX</p>
										</div>
										<div class="down">
											<p><span>成色</span><em></em>G</p>
											<p><span>重量</span><em></em>0.88g</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="goods_footer">
							<div class="total_num">共 1 件</div>
							<div class="group-input">
								<input type="checkbox" v-model="isSelFoods" name="stone">
								<div class="outCircle">
									<div :class="{'innerCircle':isSelFoods}"></div>
								</div>
							</div>
						</div>
					</li>
					<li class="goods_list">
						<div class="title">
							<div class="title_left">
								<span>来图定制</span>
								<em>¥13,560.00（含金工时费）</em>
							</div>
							<i class="close"></i>
						</div>
						<div class="goods_content">
							<ul class="goods_num">
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">戒托：¥2400.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down">
											<p><span>材质</span><em></em>18K金</p>
											<p><span>手寸</span><em></em>11</p>
										</div>
									</div>
								</li>
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">配石：¥12,000.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down marginBottom">
											<p><span>净度</span><em></em>VVS1</p>
											<p><span>切工</span><em></em>EX</p>
										</div>
										<div class="down">
											<p><span>成色</span><em></em>G</p>
											<p><span>重量</span><em></em>0.88g</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="goods_footer">
							<div class="total_num">共 1 件</div>
							<div class="group-input">
								<input type="checkbox" v-model="isSelFoods" name="stone">
								<div class="outCircle">
									<div :class="{'innerCircle':isSelFoods}"></div>
								</div>
							</div>
						</div>
					</li>
					<li class="goods_list">
						<div class="title">
							<div class="title_left">
								<span>来图定制</span>
								<em>¥13,560.00（含金工时费）</em>
							</div>
							<i class="close"></i>
						</div>
						<div class="goods_content">
							<ul class="goods_num">
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">戒托：¥2400.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down">
											<p><span>材质</span><em></em>18K金</p>
											<p><span>手寸</span><em></em>11</p>
										</div>
									</div>
								</li>
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">配石：¥12,000.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down marginBottom">
											<p><span>净度</span><em></em>VVS1</p>
											<p><span>切工</span><em></em>EX</p>
										</div>
										<div class="down">
											<p><span>成色</span><em></em>G</p>
											<p><span>重量</span><em></em>0.88g</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="goods_footer">
							<div class="total_num">共 1 件</div>
							<div class="group-input">
								<input type="checkbox" v-model="isSelFoods" name="stone">
								<div class="outCircle">
									<div :class="{'innerCircle':isSelFoods}"></div>
								</div>
							</div>
						</div>
					</li>
					<li class="goods_list">
						<div class="title">
							<div class="title_left">
								<span>来图定制</span>
								<em>¥13,560.00（含金工时费）</em>
							</div>
							<i class="close"></i>
						</div>
						<div class="goods_content">
							<ul class="goods_num">
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">戒托：¥2400.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down">
											<p><span>材质</span><em></em>18K金</p>
											<p><span>手寸</span><em></em>11</p>
										</div>
									</div>
								</li>
								<li class="goods_box">
									<div class="goods_img">
										<img src="../../assets/assetsFinal/ring.png" alt="">
									</div>
									<div class="good_base_value">
										<div class="up">
											<span class="prices">配石：¥12,000.00</span>
											<em class="edit">编辑</em>
										</div>
										<div class="down marginBottom">
											<p><span>净度</span><em></em>VVS1</p>
											<p><span>切工</span><em></em>EX</p>
										</div>
										<div class="down">
											<p><span>成色</span><em></em>G</p>
											<p><span>重量</span><em></em>0.88g</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="goods_footer">
							<div class="total_num">共 1 件</div>
							<div class="group-input">
								<input type="checkbox" v-model="isSelFoods" name="stone">
								<div class="outCircle">
									<div :class="{'innerCircle':isSelFoods}"></div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="gray"></div>
		<div class="customer">
			<div class="custome_title">客户信息</div>
			<div class="customer_mes">
				<ul>
					<li>
						<label for="">客户姓名</label>
						<div class="input">
							<input type="text" placeholder="输入姓名">
						</div>
					</li>
					<li>
						<label for="">客户电话</label>
						<div class="input">
							<input type="text" placeholder="请输入电话号码">
						</div>
					</li>
					<li>
						<label for="">客户生日</label>
						<div class="input">
							<input type="date" placeholder="请选择客户生日">
						</div>
					</li>
				</ul>
			</div>
			<div class="customer_info">
				<ul>
					<li>
						<label for="">是否会员</label>
						<div class="memmer">
							<div class="group-input">
								<input type="radio" v-model="isSelMemmer" name="stone" value="1"/>
								<div class="outCircle">
									<div :class="{'innerCircle':isSelMemmer == 1}"></div>
								</div>
								<label for="">是</label>
							</div>
							<div class="group-input">
								<input type="radio" v-model="isSelMemmer" name="stone" value="2"/>
								<div class="outCircle">
									<div :class="{'innerCircle':isSelMemmer == 2}"></div>
								</div>
								<label for="">否</label>
							</div>
						</div>
					</li>
					<li>
						<label for="">客户微信</label>
						<div class="input">
							<input type="text" placeholder="输入微信">
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 生成订单 -->
		<div class="next_step" @click="next_step">生成订单</div>
	</div>
</template>

<script>
	import header from './header'
	export default {
		data () {
			return {
				header:{
					title: '购物车',
					isShow: true,
				},
				isSelFoods: true,
				isSelMemmer: 1,
				isDate: true,
			}
		},
		created () {
			window.vm = this;
		},
		mounted () {
			this.$nextTick(()=>{
				let goods = document.getElementsByClassName('goods_list');
				for (let i = 0 ; i < goods.length; i ++) {
					goods[i].style.animation = 'shoppingGoods 0.2s ease';
					goods[i].style['animation-delay'] = i*0.1 + 0.1 +'s';
					goods[i].style['animation-fill-mode'] = 'forwards';
				}
				let goodsWrap = this.$refs.goods;
				goodsWrap.style.width = goods.length * 43.75 + 'rem';
			})
		},
		methods: {
			next_step () {
				this.$router.push('/finalFashion/message')
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="scss">
	.shoppingCar{
		height: 100%;
		// margin-top: 6.25rem;
		.shopping_wrap{
			margin-top: 3.75rem;
			.out_wrap{
				background: url('../../assets/assetsFinal/top02.png') no-repeat center;
				background-size: 100% 100%;
 				padding: 1.25rem 1.88rem 1.81rem 1.88rem;
				box-sizing: border-box;
				overflow-x: scroll;
				width: 100%;
				.inner_wrap{
					display: flex;
					height: 100%;
					// width: 200%;
					.goods_list{
						border: 1px solid #E5E5E5;
						border-radius: 0.63rem;
						background: #ffffff;
						width: 43.75rem;
						margin-right: 3.75rem;
						opacity: 0;
						// transform: translate3d(5rem,0,0);
						transform: translate(5rem,0);
						&:last-child{
							margin-right: 1.88rem;
						}
						.title{
							display: flex;
							align-items: center;
							padding: 1.32rem 1.95rem 1.07rem 1.79rem;
							box-sizing: border-box;
							border-bottom: 1px solid #E5E5E5;
							.title_left{
								span{
									color: #333;
									font-size: 1.88rem;
									line-height: 2.63rem;
								}
								em{
									font-size: 1.25rem;
									color: #FF7B7B;
									line-height: 2.69rem;
									margin-left: 1.25rem;
								}
							}
							i{
								display: inline-block;
								width: 2.23rem;
								height: 2.23rem;
								background: url('../../assets/assetsFinal/close.png') no-repeat center;
								background-size: 100%;
								margin-left: 7.6rem;
								&:active{
									opacity: 0.8;
								}
							}
							&:before{
								content: '';
								display: inline-block;
								width: 1.15rem;
								height: 2.58rem;
								margin-right: 0.71rem;
								background-image: linear-gradient(45deg, #BA9061 0%, #EECDA3 100%);
							}
						}
						.goods_content{
							width: 100%;
							.goods_num{
								padding-top: 1.84rem;
								box-sizing: border-box;
								.goods_box{
									display: flex;
									width: 100%;
									padding: 0 1.95rem 0;
									box-sizing: border-box;
									align-items: center;
									margin-bottom: 1.84rem;
									.goods_img{
										width: 7.18rem;
										// height: 7.18rem;
										background: #FFFFFF;
										border: 1px solid #E5E5E5;
										margin-right: 0.72rem;
										img{
											width: 100%;
											height: 100%;
										}
									}
									.good_base_value{
										width: 100%;
										.up{
											display: flex;
											justify-content: space-between;
											margin-bottom: 1.13rem;
											.prices{
												color: #FF7B7B;
												font-size: 1.88rem;
											}
											.edit{
												display: inline-block;
												width: 6.46rem;
												height: 2.58rem;
												text-align: center;
												line-height: 2.58rem;
												background: #FF7B7B;
												color: #ffffff;
												font-size: 1.5rem;
												border-radius: 0.25rem;
											}
										}
										.down{
											display: flex;
											// justify-content: space-between;
											p{
												color: #333333;
												font-size: 1.88rem;
												line-height: 2.63rem;
												width: 100%;
												span{
													opacity: 0.5;
													margin-right: 1.93rem;
													display: inline-block;
												}
												&:last-child{
													width: 60%;
												}
											}
										}
									}
								}
							}
						}
						.goods_footer{
							height: 5.11rem;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 1.86rem 0 1.94rem;
							box-sizing: border-box;
							border-top: 1px solid #E5E5E5;
							.total_num{
								color: #333333 ;
								font-size: 1.88rem;
							}
							.group-input{
								position: relative;
								input[type="checkbox"]{
									appearance: checkbox;
									z-index: 100;
									opacity: 0;
									position: relative;
									width: 2rem;
									height: 2rem;
								}
								.outCircle{
									width: 2.29rem;
									height: 2.29rem;
									border-radius: 50%;
									background: #ffffff;
									border:1px solid #FF7B7B;
									display: flex;
									justify-content: center;
									align-items: center;
									position: absolute;
									top: 0;
									z-index: 5;
									.innerCircle{
										width: 1.5rem;
										height: 1.5rem;
										border-radius: 50%;
										background: #FF7B7B;
									}
								}
							}
						}
						.marginBottom{
							margin-bottom: 1.13rem;
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
		.customer{
			.custome_title{
				color: #FF7B7B;
				font-size: 2.25rem;
				line-height: 3.13rem;
				display: flex;
				justify-content: center;
				align-items: center;
				&:before{
					content: "";
					display: inline-block;
					width: 12.5rem;
					height: 0.13rem;
					background-image: linear-gradient(#FFBABA 0%, #F27474 100%);
					margin-right: 4.16rem;
				}
				&:after{
					content: "";
					display: inline-block;
					width: 12.5rem;
					height: 0.13rem;
					background-image: linear-gradient(#FFBABA 0%, #F27474 100%);
					margin-left: 4.16rem;
				}
			}
			.customer_mes{
				ul{
					display: flex;
					padding: 1.18rem 6.25rem 0;
					box-sizing: border-box;
					justify-content: space-between;
					li{
						label{
							color: #333;
							font-size: 1.88rem;
						}
						.input{
							width: 16.25rem;
							height: 3rem;
							margin-top: 1.13rem;
							input[type='text']{
								width: 100%;
								height: 100%;
								padding-left: 1.38rem;
								box-sizing: border-box;
								border-radius: 0.25rem;
							}
							input[type='date']{
								appearance: date;
								width: 100%;
								height: 100%;
								padding-left: 1.38rem;
								box-sizing: border-box;
								border-radius: 0.25rem;
							}
						}
						
					}
				}
			}
			.customer_info{
				margin-top: 1.25rem;
				ul{
					padding-left: 6.25rem;
					box-sizing: border-box;
					display: flex;
					li{
						label{
							color: #333;
							font-size: 1.88rem;
						}
						width: 41%;
						.memmer{
							display: flex;
							align-items: center;
							margin-top: 1.06rem;
						}
						.group-input{
							position: relative;
							display: flex;
							align-items: center;
							label{
								color: #333;
								font-size: 1.5rem;
								line-height: 2.06rem;
								margin-left: 0.71rem;
								margin-right: 7.14rem;
							}
							input[type="radio"]{
								appearance: radio;
								z-index: 100;
								opacity: 0;
								position: relative;
								width: 2rem;
								height: 2rem;
							}
							.outCircle{
								width: 2.29rem;
								height: 2.29rem;
								border-radius: 50%;
								background: #ffffff;
								border:1px solid #FF7B7B;
								display: flex;
								justify-content: center;
								align-items: center;
								position: absolute;
								top: -1px;
								left: 0;
								z-index: 5;
								.innerCircle{
									width: 1.5rem;
									height: 1.5rem;
									border-radius: 50%;
									background: #FF7B7B;
								}
							}
						}
						.input{
							width: 16.25rem;
							height: 3rem;
							margin-top: 1.13rem;
							input[type='text']{
								width: 100%;
								height: 100%;
								padding-left: 1.38rem;
								box-sizing: border-box;
								border-radius: 0.25rem;
							}
						}
					}
				}
			}
		}
		.next_step{
			color: #ffffff;
			font-size: 1.5rem;
			width: 25rem;
			height: 5.5rem;
			line-height: 5.5rem;
			text-align: center;
			background-image: linear-gradient(-134deg, #FFBABA 0%, #F27474 100%);
			border-radius: 0.625rem;
			margin: 4.13rem auto 0;
			&:active{
				opacity: 0.8;
			}
		}
		// 购物车商品
		@keyframes shoppingGoods {
			0%{
				opacity: 0;
				// transform: translate3d(5rem,0,0);
				transform: translate(5rem,0);
			}
			100%{
				// transform: translate3d(0,0,0);
				transform: translate(0);
				opacity: 1;
			}
		}
	}
</style>
