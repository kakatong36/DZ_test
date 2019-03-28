<template>
    <div class="finalFashionSettlement">
        <v-header :header="header"></v-header>
        <div class="detail_wrap">
            <!-- <div class="left">
				<div class="video_wrap">
					<div class="video">
						<img src="../../assets/assetsFinal/bigPic.png" alt="">
					</div>
					<div class="estimate">总价<span>¥8,388.00</span></div>
				</div>
            </div> -->
			<div class="right">
				<div class="list_wrap">
					<div class="list">
						<div class="total_price"><span>总价格：</span><em>¥{{(styleObj.stylePrice+tableList.SalesPrice) | toFixedTwo}}</em></div>
						<div class="title"><h3>戒托信息</h3><p  v-if="styleObj.stylePrice">¥{{(styleObj.stylePrice).toFixed(2)}}<span>（价格）</span></p><div class="angin" @click="anginSelectStyle()">重新选托</div></div>
						<ul class="cell_value ring_mes">
							<li class="style"><span>款式：</span><em>{{settleData.Category}}</em><em>款号{{settleData.StyleNo}}</em><em>{{settleData.StyleName}}</em></li>
							<li class="stone"><span>辅石：</span><em>{{settleData.AuxiliaryStoneType}}</em></li>
							<li class="finness-wrap">
								<span>成色：</span>
								<div class="finness"  v-if="settleData.Data">
									<em :class="{'active':item.active}" @click="getFinness(item.Id)" :key="item.Id" v-for="item in settleData.Data[0].DataList" v-if="settleData.Data[0].DataName == 'Condition'">{{item.Name}}</em>
								</div>
							</li>
							<li v-if="settleData.AuxiliaryStoneQuantity"><span>镶石粒数：</span><em>{{settleData.AuxiliaryStoneQuantity}}</em></li>
							<li v-if="settleData.TotalWeight"><span>金重：</span><em>{{settleData.TotalWeight}}g</em></li>
							<li v-if="settleData.AuxiliaryStoneWeight"><span>镶石总重：</span><em>{{settleData.AuxiliaryStoneWeight}}ct</em></li>
							<li class="sizeHand">
								<span>手寸：</span>
								<select name="" id="" v-if="settleData.Data" v-model="selectSizeHand">
									<option :value="item.Name" :key="item.Id" v-for="item in settleData.Data[2].DataList" v-if="settleData.Data[2].DataName == 'RingSize'">{{item.Name}}</option>
								</select>
							</li>
						</ul>
						<div class="bg-img bg1">
							<img :src="http.imgUrl+mainImg" v-if="mainImg" alt="">
						</div>
					</div>
					<div class="gray"></div>
					<div class="list table_list">
						<div class="title"><h3>配石信息</h3><p v-if="tableList">¥{{(tableList.SalesPrice) | toFixedTwo}}<span>（价格）</span></p><div class="angin" @click="anginSelectStone()">重新选石</div></div>
						<ul class="cell_value">
							<li><span>形状</span><em>{{tableList.Shape}}</em></li>
							<li><span>证书</span><em>{{tableList.CertificateType}}</em></li>
							<li><span>重量</span><em>{{tableList.Weight}}ct</em></li>
							<li><span>颜色</span><em>{{tableList.Color}}</em></li>
							<li><span>净度</span><em>{{tableList.Cleanliness}}</em></li>
							<li><span>切工</span><em>{{tableList.Cut}}</em></li>
							<li><span>荧光</span><em>无</em></li>
						</ul>
						<!-- <div class="bg-img bg2"></div> -->
					</div>
					<div class="gray"></div>
					<div class="list special">
						<div class="title"><h3>特殊定制</h3></div>
						<ul class="cell_value">
							<li class="write_mes">
								<div class="write_inner">
									<div class="form-group">
										<input type="checkbox" id="write" v-model="isSelect">
										<div class="outCircle" :class="{'outCircleBorder':isSelect}">
											<div :class="{'innerCircle':isSelect}"></div>
										</div>
									</div>
									<label for="write">刻字</label>
								</div>
								<input type="text" :disabled="!isSelect" v-model="lettering" placeholder="输入刻字信息" class="input_write">
							</li>
							<!-- <li class="write_mes">
								<div class="write_inner">
									<div class="form-group">
										<input type="checkbox" id="hand" v-model="isSelectHand">
										<div class="outCircle" :class="{'outCircleBorder':isSelectHand}">
											<div :class="{'innerCircle':isSelectHand}"></div>
										</div>
									</div>
									<label for="hand">指纹</label>
								</div>
								<div class="file_upLoad">
									<input type="button" value="已上传" v-show="ImgUrl != ''"/>
									<input type="button" value="未上传" v-show="ImgUrl == ''" />
									<v-upload :type='0' @get_img='set_Img'></v-upload>
								</div>
							</li> -->
						</ul>
					</div>
					<div class="subit_wrap">
						<div class="join_shopping" @click="joinShopping()">加入购物车</div>
						<div class="buy_now">立即购买</div>
					</div>
				</div>
			</div>
        </div>
		
		<shopMenu></shopMenu>
		<v-loading v-show="isLoading"></v-loading>
        <!-- <v-footer :finishParams='finishParams'></v-footer> -->
		<!-- 弹窗 -->
		<div class="alert_shopping" v-if="isShow">
			<div class="shopping">
				<img src="../../assets/assetsFinal/shoppingSuccess.png" alt="">
				<p>成功放入购物车</p>
				<div class="subit">
					<router-link tag="div" to="/finalFashion/shoppingCar">前往购物车</router-link>
					<div @click="isShow = false;">继续购物</div>
				</div>
			</div>
		</div>
		<div class="mask" :class="{'active': isShow}"></div>

    </div>
</template>

<script>
    import footer from './footer'
	import header from './header'
	import upload from "components/upload/upload";
	import loading from 'components/isLoading/isloading'
    export default {
        data () {
            return {
                finishParams:{
					isStyleListFinshed:true,
					isDetailFinshed: true,
					isStoneFinshed: true,
					isMessage: true,
					isShow: true,
					footerWord: {
						firstStep: '款式列表',
						secondStep: '款式详情',
						thirdStep: '配石',
						fourStep: '确认信息',
					}
                },
                header:{
					title: '结算',
					isShow: true,
					return: {
						name:"finalFashionStone",
						params: this.$route.params.id
					}
                },
				isNext: true,
				isLast: false,
				isSelectHand: true,
				isSelect:true,
				isShow: false,
				settleData: {},
				mainImg: '',
				selectSizeHand: '',
				tableList:{},
				styleObj: this.$store.state.relate.fashioinObj,
				ImgUrl: '',
				isLoading: false,

				lettering: '',
				params:{
					SkuId: this.$route.params.id,
					Quantity: 1,
					Specification: '',
					Lettering: '',
					Stones:[]
				}
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
			this.getInit ();
			if(this.$route.params.tableRow){
				this.tableList = this.$route.params.tableRow
			}
			if(!this.$store.state.relate.isSroneOrStyle){
				this.finishParams.footerWord.firstStep = '配石列表';
				this.finishParams.footerWord.secondStep = '款式列表';
				this.finishParams.footerWord.thirdStep = '款式详情';
				this.finishParams.footerWord.fourStep = '确认信息';
			}else{
			}
			this.$store.commit('SET_SETTLEMENT',true)
		},
        methods: {
			set_Img(src) {
				this.ImgUrl = src.url;
			},
			anginSelectStyle (){
				this.$router.push({
					name:"finalFashionDetail",
					params:{
						id:this.$route.params.id,
						index: this.$route.params.index,//这个参数是列表的第几行索引
						tableRow: this.$route.params.tableRow
					}
				})
			},
			anginSelectStone (){
				if(this.$store.state.relate.isSroneOrStyle){
					this.$router.push({
						name:'finalFashionStone',
						params:{
							id:this.$route.params.id,
							index: this.$route.params.index,
						}
					})
				}else{
					this.$router.push({
						name:'finalFashionStoneFirst',
						params:{
							id:this.$route.params.id,
							index: this.$route.params.index,
						}
					})
				}
				
			},
            sumbit () {
                this.$router.push('/finalFashion/message')
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
					this.settleData.Data.forEach((item)=>{
						if(item.DataName == "Condition"){
							item.DataList.forEach((item1,index)=>{
								if(item1.Name == this.$store.state.relate.fashioinObj.finness){
									this.$set(item1,'active',true);
								}else{
									this.$set(item1,'active',false);
								}
							})
						}else if(item.DataName == 'RingSize'){
							if(item.DataList.length>0){
								this.selectSizeHand = item.DataList[0].Name;
							}
						}
					})
				}
				this.http.get(options,cbok);
			},
			getFinness (id) {
				let obj= {
					finness: ''
				};
				this.settleData.Data.forEach((item)=>{
					if(item.DataName == "Condition"){
						item.DataList.forEach((item1,index)=>{
							if(item1.Id == id) {
								item1.active = true;
								obj.finness = item1.Name;
								this.$store.commit('SET_FASHION',obj.finness)
							}else{
								item1.active = false;
							}
						})
					}
				})
			},
			joinShopping () {
				this.params.Specification = this.selectSizeHand
				this.params.Lettering = this.lettering;
				this.params.Stones = [];
				this.isLoading = true;
				this.params.Stones.push({
					StoneId: this.tableList.Id,
					StoneType: 1,//
					StoneCategory: '',
					Shape:this.tableList.Shape,
					Color: this.tableList.Color,
					Clarity: this.tableList.Cleanliness,
					Cut: this.tableList.Cut,
					Weight: this.tableList.Weight,
					UnitPrice: this.tableList.SalesPrice,
					Quantity: this.settleData.AuxiliaryStoneQuantity,
					TotalPrice: this.settleData.AuxiliaryStoneQuantity,
				})
				let options = {
					url: "/Order_Api_CustomizeCart_AddCartCustomizeSingle",
					params: this.params
				}
				let cbok = (res) => {
					this.isLoading = false;
					this.isShow = true;
				}
				let cbno = (res) => {
					this.isLoading = false;
				}
				this.http.post(options,cbok,cbno);
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
		display: none;
		&.active{
			display: block;
		}
	}
    .finalFashionSettlement{
        background: #ffffff;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
		padding: 1.88rem;
		box-sizing: border-box;
        .detail_wrap{
            display: flex;
            color: #ffffff;
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
			padding-top: 6.25rem;
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
										border: 1px solid #E5E5E5;
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
										border: 1px solid #E5E5E5;
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
									align-items: flex-start;
									margin-bottom: 0;
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
										padding: 0.2% 0.63rem;
										margin-bottom: 1.5rem;
										&.active{
											background: #FF7B7B;
											border: 1px solid #FF7B7B;
											color: #ffffff;
										}
									}
								}
								&.stone{
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
									width: 11.25rem;
									height: 3rem;
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
							bottom: 4.81rem;
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
			top: 54%;
			transform: translate(-50%,-50%);
			z-index: 99;
			padding-top: 2.5rem;
			border-radius: 0.625rem;
			animation: shoppingCar 0.5s ease;
			animation-fill-mode: forwards;
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
    }
</style>
