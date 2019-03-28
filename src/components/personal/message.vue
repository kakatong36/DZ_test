<template>
    <div class="message content clearfix" style="padding-bottom:0;" >

		<div class="left " :class="{honey:sign == 'honey'}">
			<div class="love-content" v-if='sign == "love"'>
				<div class="main-img">
					<img src="../../common/images/personal/ring1@3x.png"/>				
				</div>
				<div class="img-group">
					<a>
						<div class="img-item" style="position:relative;">
							<span class='Lettering' style="position:absolute;top:80px;left:0;right:0;color:#aaa;text-align:center;">{{womenAdditional.Lettering}}</span>
							<img src="../../common/images/personal/copy@3x.png" />
						</div>
						
						<p>女款刻字示例</p>
					</a>
					<a>
						<div class="img-item" style="position:relative;">
							<span class='Lettering' style="position:absolute;top:80px;left:0;right:0;color:#aaa;text-align:center;">{{manAdditional.Lettering}}</span>
							<img src="../../common/images/personal/copy@3x.png" />
						</div>
						<p>男款刻字示例</p>
					</a>
				</div>
			</div>
			<div class="bride-content" v-if='sign == "bride"'>
				<div class="main-img">
					<img :src="imgUrl+recommend.SellerID+'/'+imgModel+'/image/'+recommend.imgs[0].ImgUrl" />		
				</div>
				<div class="img-group">
					<a>
						<div class="img-item" style="position:relative;">
							<span class='Lettering' style="position:absolute;top:80px;left:0;right:0;color:#aaa;text-align:center;">{{womenAdditional.Lettering}}</span>
							<img src="../../common/images/personal/copy@3x.png" />
						</div>
						
						<p>女款刻字示例</p>
					</a>
				</div>
			</div>
			<div class="honey-content" v-if='sign == "honey"'>
				<div class="main-img">
					<img :src="imgUrl+main.SellerID+'/'+imgModel+'/image/'+recommend.imgs[0].ImgUrl" v-if='recommend.imgs[0]'/> 
					<img :src="imgUrl+main.SellerID+'/'+upModel+'/image/'+recommend.imgs.elevation" v-if='recommend.imgs.elevation'/> 
					<div class="img-item">
						<span class='Lettering'>{{manAdditional.Lettering}}</span>
						<img src="../../common/images/personal/copy@3x.png" />
					</div>
				</div>
				<div class="main-img">
					<img :src="imgUrl+main.SellerID+'/'+imgModel+'/image/'+main.imgs[0].ImgUrl" />
					<div class="img-item">
						<span class='Lettering'>{{womenAdditional.Lettering}}</span>
						<img src="../../common/images/personal/copy@3x.png" />
					</div>
				</div>
				
			</div> 
		</div>
		<div class="right">
			<div class="inner">
				<h5 style="font-size:20px;">{{checkedSuit.Name}}</h5>
				<div class="main-box" v-show="!next">
					<div class="info-box effect" v-if='sign != "bride"'>
						<h2>男方</h2>
						<div class="list-box">
							<div class="tab-content list" style="width: 290px;">
								<div class="form-group">
									<label>姓名</label>
									<input type="text" name="Name" v-model='manAdditional.Name' class="require" data-tips='请填写男方姓名'/>
								</div>
								<div class="form-group">
									<label>手寸</label> 
									<input type="tel" name="Hand" v-model='manAdditional.Hand' class="require" data-tips='请填写男方手寸'/>
								</div>
								<div class="form-group">
									<label>刻字</label>
									<input type="text" name="Lettering" v-model='manAdditional.Lettering' maxlength="8" />
								</div>
								<div class="form-group">
									<label>字体</label>
									<select name="Typeface" v-model='manAdditional.Typeface' style="width:100px;height:28px;border-color:#999;font-size:12px;line-height:1em;">
										<option value="新宋体" >新宋体</option>
										<option value="微软雅黑">微软雅黑</option>
										<option value="篆体">篆体</option>
									</select>
								</div>
							</div>
							<div class="img-fingerprint list">
								<div class="imgbox">
			                		<div class="remove-img" v-show='manAdditional.ImgUrl != "" ' @click='manAdditional.ImgUrl = "" '>&times;</div>
			                		<div class="img" v-show='manAdditional.ImgUrl != "" '>
			                			<img :src="imgUrl+main.SellerID+'/'+upModel+'/image/'+manAdditional.ImgUrl" />
			                		</div>
			                		<v-upload :type='0' @get_img='set_manImg'></v-upload>
			                	</div>
								
							</div>
						</div>
					</div>
					<div class="info-box effect" style="transition:all .8s .1s linear;-webkit-transition:all .8s .1s linear;">
						<h2 class="women">女方</h2>
						<div class="list-box">
							<div class="tab-content list" style="width: 290px;">
								<div class="form-group">
									<label>姓名</label>
									<input type="text" name="name" v-model='womenAdditional.Name' class="require" data-tips='请填写女方姓名'/>
								</div>
								<div class="form-group">
									<label>手寸</label>
									<input type="tel" name="Hand" v-model='womenAdditional.Hand' class="require" data-tips='请填写女方手寸'/>
								</div>
								<div class="form-group">
									<label>刻字</label>
									<input type="text" name="Lettering" v-model='womenAdditional.Lettering' maxlength="8"/>
								</div>
								<div class="form-group">
									<label>字体</label>
									<select name="Typeface" v-model='womenAdditional.Typeface' style="width:100px;height:28px;border-color:#999;font-size:12px;line-height:1em;">
										<option value="新宋体" >新宋体</option>
										<option value="微软雅黑">微软雅黑</option>
										<option value="篆体">篆体</option>
									</select>
								</div>
							</div>
							<div class="img-fingerprint list">
								<div class="imgbox">
			                		<div class="remove-img" v-show='womenAdditional.ImgUrl != "" ' @click='womenAdditional.ImgUrl = "" '>&times;</div>
			                		<div class="img" v-show='womenAdditional.ImgUrl != "" '>
			                			<img :src="imgUrl+recommend.SellerID+'/'+upModel+'/image/'+womenAdditional.ImgUrl" />
			                		</div>
			                		<v-upload :type='0' @get_img='set_womenImg'></v-upload>
			                	</div>
							</div>
							
						</div>
					</div>
					<div class="message-btn-group">
						<button class="message-next-btn" @click="go_next_step">下一步</button>
					</div>
					
				</div>
				<div class="tab-box" v-show="next">
					<div class="tab">
						<a :class="{checked:tab==0}" @click='set_devier(0)' >
							<span><i></i></span>快递寄送服务
						</a>
						<a :class="{checked:tab==1}" @click='set_devier(1)'>
							<span><i></i></span>上门自取
						</a>
					</div>
					<div class="tab-content" >
						<div class="form-group">
							<label>姓名</label>
							<input type="text" name="name" v-model='personal_order.Name' class="require" data-tips='请填写收货人'/>
						</div>
						<div class="form-group">
							<label>电话</label>
							<input type="text" name="phone" v-model='personal_order.ConsigneePhone' class="require" data-tips='请填写正确的联系电话'/>
						</div>
						<div class="form-group message-relate" v-if='tab==0'>
							<label>省市区</label>
							<v-relate></v-relate>
						</div>
						<div class="form-group " v-if='tab==0'>
							<label>详细地址</label>
							<input type="text" name="address" v-model='personal_order.AddressDetailse' :class="{require:tab==0}" data-tips='请填写详细地址'/>
						</div>
						<div class="form-group">
							<label>交货日期</label>
							<input type="date" name="date" v-model='personal_order.DeliveryDate' class="require" data-tips='请填写交货日期' style="height:2.5em;" placeholder="交货日期" />
						</div>
					</div>					
					<div class="message-btn-group">
						<button class="prive-btn" @click='next=false'>上一步</button>
						<button class="submit-btn" @click='create_order'>提交</button>
					</div>
					
				</div>
			</div>	
		</div>
    </div>
</template>

<script>
import relate from 'components/relate/relate';
import upload from 'components/upload/upload';

export default {
    data () {
      return {
      	Account:{},
      	isShow: this.$store.state.header.isShow = true,
        title: this.$store.state.header.title = '信息确认',
        tab:0,
        next:false,
        sign:this.$store.state.personal.sign,
        main:{},
        recommend:{},
        imgUrl:this.$store.state.header.imgUrl,
        imgModel:this.$store.state.header.imgModel,
        upModel:this.$store.state.header.upModel,
        checkedSuit:{},
        manAdditional:{
        	Name:'town',
        	Hand:'14',
        	Typeface:'新宋体',
        	Lettering:'town',
        	ImgUrl:''
        },
        womenAdditional:{
        	Name:'Jnies',
        	Hand:'10',
        	Typeface:'新宋体',
        	Lettering:'Jnies',
        	ImgUrl:''
        },

        /*订单基本数据*/
    	personal_order:{
    	  OrderNo: "",
		  CustomizeType: 0,
		  UserId: "",
		  CommodityPrice: 0,
		  EstimateWeight: 0,
		  Weight: 0,
		  Freight: 0,
		  FavorablePrice: 0,
		  InsurancePrice: 0,
		  OrderTotal: 0,
		  DeliverGoodsId: "",
		  DeliverGoodsName: "快递寄送服务",
		  AddressId: "",
		  Consignee: "town",
		  ConsigneeTel: "",
		  ConsigneePhone: "13536363535",
		  Province: 0,
		  Citye: 0,
		  Area: 0,
		  AddressDetailse: "人民路",
		  OrderRemarkse: "",
		  MatchStonee: 0,
		  ShopsId: "",
		  SHOPSNAME: "",
		  ZipCodee: "",
		  DeliveryDate: " ",
		  Details:[]
    	}
      } 
    },
    created(){

    	this.Account = JSON.parse(localStorage.getItem('user'));
    	this.personal_order.UserId = this.Account.SelUser.UserId;
    	this.checkedSuit = this.$store.state.personal[this.sign].suit;

    	this.main = this.$store.state.personal[this.sign].select_product.main;
    	this.recommend = this.$store.state.personal[this.sign].select_product.recommend;
    	this.personal_order.CommodityPrice = this.checkedSuit.Price;

    	console.log(this.$store.state.personal[this.sign]);

    	//this.set_honey_order();

    },
    mounted(){
    	this.$nextTick(function(){
    		setTimeout(function(){
	    		var lis = document.querySelectorAll('.info-box');
	    		lis.forEach(function(item){
	    			item.style.top = 0+"px";
	    		});
	    		var bts = document.querySelectorAll(".message-btn-group");
	    		bts.forEach(function(item){
	    			item.style.cssText = "transform:translate3d(0,0,0)";
	    		});
	    		
    		},300);
    	});
    	if(this.sign == 'love'){
    		this.personal_order.CustomizeType = 1;
    	}else if(this.sign == 'honey'){
    		this.personal_order.CustomizeType = 2;
    	}else{
    		this.personal_order.CustomizeType = 3;
    	}
    },
    methods:{
    	/*女款指纹*/
    	set_womenImg(src){
    		this.womenAdditional.ImgUrl = src[0];
    	},
    	set_manImg(src){
    		this.manAdditional.ImgUrl = src[0];
    	},
    	/*寄送方式选择*/
    	set_devier(num){
    		this.tab = num;
    		if(this.tab == 0){
    			this.personal_order.DeliverGoodsName='快递寄送服务';
    		}else{
    			this.personal_order.DeliverGoodsName = '上门自取';
    			this.personal_order.AddressDetailse = '';
    		};
    	},

    	/*守护甜心订单*/
    	set_order(){
    		if(this.main.Id){
    			var main_data = {
				  Id: "",
			      OrderId: "",
			      OrderDetailsNo: "",
			      CartId: '',
			      ProductId: "",
			      SkuId: "",
			      CategoryId: this.$store.state.footer.cate.inlay,
			      BrandId: "",
			      ProductName: this.main.Name,
			      ProductType: this.main.Type,
			      ProductImg: this.main.imgs[0].ImgUrl,
			      SalePrice: 0,
			      PaymentPrice: 0,
			      EstimateWeight: 0,
			      Weight: 0,
			      MatchStone: 0,
			      Count: 0,
			      ProductAttr: JSON.stringify(this.main.Attrs),
			      ProductSkuAttr: JSON.stringify(this.main.SKU),
			      CategoryName: "钻石镶嵌",
			      BrandName: "",
			      StoneType: 0,
			      ProductCode: "",
			      ActivityId: "",
			      ActivityName: "",
			      CustomizeType: this.personal_order.CustomizeType,
			      GoldPrice: 0,
			      FeePrice: 0,
			      CertificatePrice: 0,
			      AuxiliaryStonePrice: 0,
			      MainStonePrice: 0,
			      Remarks: "",
			      ShopsId: this.main.SellerID,
			      ShopsName: "",
			      StyleId: "",
			      Lettering: this.womenAdditional.Lettering,
			      Typeface: this.womenAdditional.Typeface,
			      Hand: this.womenAdditional.Hand,
			      ImgUrl: this.womenAdditional.ImgUrl,
			      Name: this.womenAdditional.Name,
			      Stones:[],
			      Imgs:[]
	    		};
	    		if(this.sign == 'bride'){
	    			main_data.ProductSkuAttr = JSON.stringify(this.$store.state.personal[this.sign].skuContent);
	    		};
	    		this.personal_order.Details.push(main_data);
    		}
    		/*console.log(this.recommend);*/
    		if(this.recommend.Id){
    			var recoument_data = {
				  Id: "",
			      OrderId: "",
			      OrderDetailsNo: "",
			      CartId: '',
			      ProductId: "",
			      SkuId: "",
			      CategoryId: this.$store.state.footer.cate.inlay,
			      BrandId: "",
			      ProductName: this.recommend.Name,
			      ProductType: this.recommend.Type,
			      ProductImg: this.recommend.imgs[0].ImgUrl,
			      SalePrice: 0,
			      PaymentPrice: 0,
			      EstimateWeight: 0,
			      Weight: 0,
			      MatchStone: 0,
			      Count: 0,
			      ProductAttr: JSON.stringify(this.recommend.Attrs),
			      ProductSkuAttr: JSON.stringify(this.recommend.SKU),
			      CategoryName: "钻石镶嵌",
			      BrandName: "",
			      StoneType: 0,
			      ProductCode: "",
			      ActivityId: "",
			      ActivityName: "",
			      CustomizeType: this.personal_order.CustomizeType,
			      GoldPrice: 0,
			      FeePrice: 0,
			      CertificatePrice: 0,
			      AuxiliaryStonePrice: 0,
			      MainStonePrice: 0,
			      Remarks: "",
			      ShopsId: this.recommend.SellerID,
			      ShopsName: "",
			      StyleId: "",
			      Lettering: this.manAdditional.Lettering,
			      Typeface: this.manAdditional.Typeface,
			      Hand: this.manAdditional.Hand,
			      ImgUrl: this.manAdditional.ImgUrl,
			      Name: this.manAdditional.Name,
			      Stones:[],
			      Imgs:[]
	    		};

	    		if(this.sign == 'bride' && main_data.ProductSkuAttr){
	    		
	    			main_data.ProductSkuAttr = JSON.stringify(this.$store.state.personal[this.sign].skuContent);
	    		};
	            this.personal_order.Details.push(recoument_data);
	            console.log(this.personal_order);
    		};
    		if(this.recommend.imgs && this.sign == 'honey'){
    			var recoument_data = {
				  Id: "",
			      OrderId: "",
			      OrderDetailsNo: "",
			      CartId: '',
			      ProductId: "",
			      SkuId: "",
			      CategoryId: this.$store.state.footer.cate.inlay,
			      BrandId: "",
			      ProductName: '',
			      ProductType: this.recommend.Type,
			      ProductImg: '',
			      SalePrice: 0,
			      PaymentPrice: 0,
			      EstimateWeight: 0,
			      Weight: 0,
			      MatchStone: 0,
			      Count: 0,
			      ProductAttr: '',
			      ProductSkuAttr: JSON.stringify(this.recommend.SKU),
			      CategoryName: "钻石镶嵌",
			      BrandName: "",
			      StoneType: 0,
			      ProductCode: "",
			      ActivityId: "",
			      ActivityName: "",
			      CustomizeType: 4,
			      GoldPrice: 0,
			      FeePrice: 0,
			      CertificatePrice: 0,
			      AuxiliaryStonePrice: 0,
			      MainStonePrice: 0,
			      Remarks: "",
			      ShopsId: this.main.SellerID,
			      ShopsName: "",
			      StyleId: "",
			      Lettering: this.womenAdditional.Lettering,
			      Typeface: this.womenAdditional.Typeface,
			      Hand: this.womenAdditional.Hand,
			      ImgUrl: this.womenAdditional.ImgUrl,
			      Name: this.womenAdditional.Name,
			      Stones:[],
			      Imgs:this.recommend.imgs
	    		};
	    		this.personal_order.Details.push(recoument_data);
    		}
    	},
    	/*下一步*/
    	go_next_step(){
    		this.next = true;
    		
    		this.set_order();
    		console.log(this.personal_order);
    	},
    	create_order(){
    		if(!this.form_check()){
    			return;
    		};
    		this.loading();
    		var that = this;
    		  var _sign = '';
    		    if(that.sign == 'love'){
    		    	that.personal_order.CustomizeType = 1;
    		    	_sign = 'love';
    		    }else if(that.sign == 'honey'){
    		    	that.personal_order.CustomizeType = 2;
    		    	_sign = 'honey';
    		    }else if(that.sign == 'bride'){
    		    	_sign = 'bride';
    		    	that.personal_order.CustomizeType = 3;
    		    };

                that.personal_order.Province = that.$store.state.relate.cur_province;
                that.personal_order.City = that.$store.state.relate.cur_city;
                that.personal_order.Area = that.$store.state.relate.cur_district;  
                that.personal_order.OrderTotal = that.CommodityPrice+that.personal_order.Freight + that.personal_order.InsurancePrice;
                
                var options = {
                    url:"/order_api_BuyFroOrder_CreateOrder",
                    params:that.personal_order
                };

                var cbok = res =>{
                	this.$store.dispatch('clear_suit_cache',that.sign);
                    this.$store.state.header.sign = 'fastion';
                    this.$router.push({
                        path:'/success/'+_sign
                    });
                    this.closeLoad();
                };

                var cbno = res =>{
                    this.bombox.tomast({
                        msg:res.data.message,
                        type:'warning'
                    });
                    this.closeLoad();
                };

                this.http.post(options,cbok,cbno);
    	},
    	 /*表单验证*/
		    form_check(){
		    	var that = this;
		    	var requier = document.querySelectorAll(".require");
		    	var flag = true;
		    	requier.forEach(function(item){

		    		if(item.value == ''){
		    			that.bombox.tomast({
		    				msg:item.getAttribute('data-tips'),
		    				type:'warning',
		    				time:1500
		    			});
		    			flag = false;
		    			return;
		    		}
					/*手机号验证*/
		    		if(item.getAttribute("data-phone")){

                       if(!(/^1[34578]\d{9}$/.test(item.value))){
                            that.bombox.tomast({
                                msg:item.getAttribute('data-tips'),
                                type:'warning',
                                time:1500,
                            });
                            flag = false;
                            return;
                       }
                    }
		    	});

		    	return flag;
		    	
		    }
    },
   
    components:{
    	'v-relate':relate,
    	'v-upload':upload
    }
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
    .message-relate{
    	select{
    		height:auto;
    	}
    }
    .message-btn-group{
    	width: 100%;
    	text-align: center;
    	transform:translate3d(0,500px,0);
    	-webkit-transform:translate3d(0,300px,0);
    	transition:all 1s ease-in;
    	-webkit-transition:all 1s ease-in;
    	button{
    		width:30%;
    		border-radius: 1.25rem;
    		background-color: #C1996A;
    		height: 2.5rem;
    		border: none;
    		color: #fff;
			text-align: center;
			line-height: 2.5rem;
			font-size: 14px;
			border:none;
			margin:0 5%;
			display: inline-block;
    	}
    	
    }
    .tab-box .sel{
    	padding: 6px;
    	border: 1px solid #999;
    	border-radius: 3px;
    	width: 30%;
    }
    html,body{
    	height: 100%;
    }
    #app{
    	height: 100%;
    }
    ::-webkit-scrollbar{
    	display: none;
    }
    .message{
    	padding-top:57px;
    	width: 100%;
    	height: 100%;
    	box-sizing: border-box;
    	.left{
    		float:left;
    		width: 50%;
    		overflow-y:auto;
    		overflow-x: hidden;
    		height: 100%;
    		.love-content{
    			padding: 2.5rem 3.5rem;
    			box-sizing: border-box;
    		}
    		.bride-content{
    			@extend .love-content
    		}
    		.main-img{
				width: 100%;
				margin-bottom: 2rem;
				text-align: center;
				img{
					width: 100%;
				}
			}
			.img-group{
				display: flex;
				justify-content: center;
				a{
					display: block;
					width: 8.25rem;
					margin-right: 3.625rem;
					.img-item{
						width: 100%;
						box-shadow: 0 6px 8px -3px rgba(0,0,0,0.1);  
						border: 1px solid #E5E5E5;
						border-radius: 6px;
						img{
							width: 100%;
						}
					}
					p{
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 14px;
						color: #333;
						font-weight: 400;
						margin-top: 1rem;
					}
					
				}
				a:last-child{
					margin: 0;
				}
		
			}
    	}
    	.left.honey{
    		background-color: #f5f5f5;
    		.honey-content{
    			padding: 0.875rem;
    			.main-img{
    				width: 100%;
    				background-color: #fff;
    				padding: 1rem ;
    				box-sizing: border-box;
    				text-align: center;
    				position: relative;
    				img{
    					max-width: 100%;
    				}
    				.img-item{
    					position: absolute;
    					width: 8.25rem;
    					bottom: 1.2rem;
    					right: 0.5rem;
    					img{
    						width: 100%;
    					}
    					.Lettering{
    						position:absolute;
    						top:86px;
    						left:0;
    						width:100%;
    						color:#aaa;
    						font-size:12px;
    						text-align:center;
    					}
    				}
    			}
    		}
    	}
    	.right{
    		float: right;
    		width: 50%;
    		height: 100%;
    		box-sizing:border-box;
    		border-left:1px solid rgba(0,0,0,0.2);
    		padding: 1.5625rem;
    		.inner{
    			width:100%;
    			
    			h5{
    				font-size: 14px;
    				color: #333;
    				font-weight: 400;
    				line-height: 1em;
    				margin: 0;
    			}
    			.tab{
    				margin-top: 1rem;
    				a{
    					font-size: 12px;
    					color: #333;
    					display: inline-block;
    					height: 16px;
    					line-height: 16px;
    					margin-right: 3.6rem;
    					span{
    						width: 14px;
    						height: 14px;
    						border-radius: 50%;
    						border: 1px solid #E5E5E5;
    						display: inline-block;
    						vertical-align: middle;
    						margin-right: 14px;
    						i{
    							display: inline-block;
    							width: 12px;
    							height: 12px;
    							background-color: #fff;
    							border-radius: 50%;
    							line-height: 14px;
    							vertical-align: top;
    							margin: 1px;
    						}
    					}
    				}
    				a.checked{
    					span{
    						border-color: #C1996A;
    					}
    					i{
    						background-color: #D8B387;
    					}
    				}
    			}
    			
    			.tab-content{
    				width: 100%;
    				margin-top: 14px;
    			}
    			
    		}
    	}
    }
	.tab-box .form-group{
		width: 100%;
		margin-bottom:13px;
		label{
			font-size: 12px;
			color: #666;
			line-height: 2em;
			display: block;
		}
		input{
			padding: 6px;
			font-size: 12px;
			width: 100%;
			border:1px solid #999;
			border-radius: 3px;
			box-sizing: border-box;
			justify-content: space-between;
		}
		.relate{
			display: flex;
		}
		.relate {
			input{
				flex: 1 ;
				margin-right: 13px;
			}
			input:last-child{
				margin-right: 0;
			}
		}
	}
	.main-box{
		margin-top: 20px;
	}
	.main-box .form-group{
		width: 100%;
		margin-bottom:13px;
		label{
			font-size: 12px;
			color: #666;
			line-height: 2em;
			display: block;
		}
		input{
			padding: 6px;
			font-size: 12px;
			width: 100%;
			border:1px solid #999;
			border-radius: 3px;
			box-sizing: border-box;
			justify-content: space-between;
		}
		.relate{
			display: flex;
		}
		.relate {
			input{
				flex: 1 ;
				margin-right: 13px;
			}
			input:last-child{
				margin-right: 0;
			}
		}
	}
	.info-box .form-group{
		width: 100px;
		display: inline-block;
		margin-right: 20px;
	}
	

	.info-box{
		border: 1px solid #e5e5e5;
		background: #fff;
		top:100px;
		transition:all .5s linear;
		-webkit-transition:all .5s linear;
		border-radius: 10px;
		margin-bottom: 40px;
		
		.tab-content{
			width: 290px;
			vertical-align: middle;
			padding: 0 14px;
		}
		.img-fingerprint{
			position:relative;
			vertical-align: middle;
			width:110px;
			height:110px;
			border:1px solid #ddd;
			background:url("../../common/images/personal/fingerprint@3x.png") no-repeat center;
			background-size:80%;
            .imgbox{
            	position:absolute;
            	top:0;
            	left:0;
            	bottom:0;
            	right:0;
            	
            	.img{
            		width:100%;
            		height:100%;
            		background-color:#fff;
            		overflow:hidden;
            	}
            	img{
					position:absolute;
					max-width:100%;
					max-height:100%;
					top:50%;
					left:50%;
					transform:translate3d(-50%,-50%,0);
				}
				.remove-img{
					position: absolute;
		    		top: -17px;
		    		right: -17px;
		    		width: 20px;
		    		height: 20px;
		    		text-align: center;
		    		line-height: 20px;
		    		font-size: 16px;
		    		color: #fff;
		    		background-color: rgba(0,0,0,0.1);
		    		-webkit-background-clip: content-box;
		    		border-radius: 50%;
		    		z-index: 100;
		    		cursor: pointer;
		    		box-sizing: content-box;
		    		border: 10px solid transparent;
				}
            }
			
		}
		h2{
			height: 30px;
			line-height: 30px;
		    border-bottom: 1px solid #e5e5e5;
			padding-left: 14px;
			&:before{
				content: '';
				display: inline-block;
				width: 8px;
				height: 16px;
				vertical-align: -3px;
				margin-right: 8px;
			    background-image: linear-gradient(-134deg, #9DBDFF 0%, #146DE5 100%);
			 }
		}
		h2.women{
			&:before{
				background-image: linear-gradient(-134deg, #FF9DEA 0%, #F17A7A 100%);
			}			
		}
	}
	.main-box{
		.info-box:last-child{
			
		}
	}
	
</style>
