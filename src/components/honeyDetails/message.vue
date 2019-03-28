<template>
    <div class="message content clearfix" style="padding-bottom:0;" >

		<div class="left honey">
			<div class="honey-content">
				<div class="main-img">
					<img :src="http.imgUrl+recommend.MainImg" v-if="recommend.MainImg"/> 
					<img src="../../assets/ps_17101611163885870100.jpg" v-else/>
					<div class="img-item">
						<span class='Lettering'>{{manAdditional.Lettering}}</span>
						<img src="../../common/images/personal/copy@3x.png" />
					</div>
				</div>
				<div class="main-img">
					<img :src="http.imgUrl+main.MainImg" v-if="main.MainImg"/>
					<img src="../../assets/ps_17101611163885870100.jpg" v-else/>
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
					<div class="info-box effect">
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
			                			<img :src="http.imgUrl+manAdditional.ImgUrl.Id" v-if="manAdditional.ImgUrl.Id"/>
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
			                			<img :src="http.imgUrl+womenAdditional.ImgUrl.Id" v-if="womenAdditional.ImgUrl.Id"/>
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
							<input type="text" name="name" v-model='personal_order.Consignee' class="require" data-tips='请填写收货人'/>
						</div>
						<div class="form-group">
							<label>电话</label>
							<input type="text" name="phone" v-model='personal_order.ConsigneePhone' class="require" data-tips='请填写正确的联系电话'/>
						</div>
						<div class="form-group message-relate" v-if='tab==0'>
							<label>省市区</label>
							<v-distpicker @province="set_province" @city="set_city" @area="set_area" class="distpicker"></v-distpicker >
						</div>
						<div class="form-group " v-if='tab==0'>
							<label>详细地址</label>
							<input type="text" name="address" v-model='personal_order.Address' :class="{require:tab==0}" data-tips='请填写详细地址'/>
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

// import styleImg from '../../assets/ps_17101611163885870100.jpg'

export default {
    data () {
      return {
      	isShow: this.$store.state.header.isShow = true,
        title: this.$store.state.header.title = '信息确认',
        tab:0,
        next:false,
        main:{},
        mainSku: {},
        recommend:{},
        recommendSku: {},
        imgUrl:this.$store.state.header.imgUrl,
        imgModel:this.$store.state.header.imgModel,
        upModel:this.$store.state.header.upModel,
        checkedSuit:{},
        manAdditional:{
        	Name:'',
        	Hand:'14',
        	Typeface:'新宋体',
        	Lettering:'',
        	ImgUrl:''
        },
        womenAdditional:{
        	Name:'',
        	Hand:'10',
        	Typeface:'新宋体',
        	Lettering:'',
        	ImgUrl:''
        },

        /*订单基本数据*/
    	personal_order:{
			DeliverGoodsId: "",
			DeliverGoodsName: "",
			Consignee: "",
			ConsigneeTel: "",
			ConsigneePhone: "",
			ProvinceId: "",
			CityId: "",
			AreaId: "",
			ProvinceName: "",
			CityName: "",
			AreaName: "",
			Address: "",
			DeliveryDate: "",
			DetailsList: []
    	}
      } 
    },
    created(){
    	this.checkedSuit = this.$store.state.personal.honey.suit;
		this.main = this.$store.state.personal.honey.select_product.main;
		// this.main.MainImg = styleImg;
        this.mainSku = this.checkedSuit.SkuList[0];
		this.recommend = this.$store.state.personal.honey.select_product.recommend;
		
		if(this.recommend.Type == 1){//来图
			// this.recommend.MainImg = this.recommend.imgs.elevation;
		}else{
			// this.recommend.MainImg = styleImg;
			this.recommendSku = this.recommend.SkuList[0];
		}

    	this.set_devier(0);

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
    },
    methods:{
    	/*女款指纹*/
    	set_womenImg(src){
    		this.womenAdditional.ImgUrl = src;
    	},
    	set_manImg(src){
    		this.manAdditional.ImgUrl = src;
    	},
    	/*寄送方式选择*/
    	set_devier(num){
			this.tab = num;
			this.personal_order.DeliverGoodsId = num;
    		if(this.tab == 0){
    			this.personal_order.DeliverGoodsName='快递寄送服务';
    		}else{
    			this.personal_order.DeliverGoodsName = '上门自取';
    			this.personal_order.Address = '';
    		};
		},
		set_province(obj){
			this.personal_order.ProvinceId = obj.code;
			this.personal_order.ProvinceName = obj.value;
		},
		set_city(obj){
			this.personal_order.CityId = obj.code || '';
			this.personal_order.CityName = obj.value ? obj.value : '';
		},
		set_area(obj){
			this.personal_order.AreaId = obj.code || '';
			this.personal_order.AreaName = obj.code ? obj.value : '';
		}, 


    	/*下一步*/
    	go_next_step(){
			this.next = true;	
    	},
    	create_order(){
    		if(!this.form_check()){
    			return;
    		};
    		this.loading();
			var that = this,
				detailsList = [];
			this.personal_order.ConsigneeTel = this.personal_order.ConsigneePhone;

			//女款
			detailsList.push({
				Flag: 1,
				SkuId: this.mainSku.SkuId,
				ProductName: this.main.StyleName,
				ProductImg: this.main.MainImg,
				StyleId: this.main.Id,

				Lettering: this.womenAdditional.Lettering,
				Typeface: this.womenAdditional.Typeface,
				Specification: this.womenAdditional.Hand,
				ImgUrl: this.womenAdditional.ImgUrl.Id,
				Name: this.womenAdditional.Name,
				Imgs: [],
				AttrList: [],
				Stones: [],
				StyleNo: ''
			});

			
			//男款
			if(this.recommend.Type == 1){//来图
				let attrList = [],
					Stone = {
						SalePrice: 0,
						Quantity: 1,
						Weight: "",
						Color: "",
						Cleanliness: "",
						Shape: ""
					};
				for(let key in this.recommend.StoneAttrSelected){
					/* if(this.recommend.StoneAttrList[0].Id == key){//重量
						Stone.Weight = this.recommend.StoneAttrSelected[key].DictionaryValueName;
					} */
					if(this.recommend.StoneAttrList[0].Id == key){//颜色
						Stone.Color = this.recommend.StoneAttrSelected[key].DictionaryValueName;
					}
					if(this.recommend.StoneAttrList[1].Id == key){//净度
						Stone.Cleanliness = this.recommend.StoneAttrSelected[key].DictionaryValueName;
					}
					/* if(this.recommend.StoneAttrList[0].Id == key){//形状
						Stone.Shape = this.recommend.StoneAttrSelected[key].DictionaryValueName;
                    } */
                    if(this.recommend.StoneAttrList[2].Id == key){//切工
						Stone.Cut = this.recommend.StoneAttrSelected[key].DictionaryValueName;
                    }
				}
				for(let key in this.recommend.StyleAttrSelected){
					this.recommend.StyleAttrList.some(item => {
						if(item.Id == key){
							attrList.push({
								AttrGroupId: item.GroupId,
								AttrId: item.Id,
								AttrValueId: this.recommend.StyleAttrSelected[key].Id,
								AttrGroupName: "",
								DictionaryId: item.DictionaryId,
								DictionaryValueId: this.recommend.StyleAttrSelected[key].DictionaryValueId
                            });
                            if(item.DictionaryName == '镶口大小'){
                                Stone.Weight = this.recommend.StyleAttrSelected[key].DictionaryValueName
                            }
						}
						return item.Id == key;
					});
				}

				let imgs = [];
				if(this.recommend.imgs.elevation){
					imgs.push({
						ImgUrl: this.recommend.imgs.elevation.slice(this.recommend.imgs.elevation.lastIndexOf('_')+1),
						Type: 1
					});
				}
				if(this.recommend.imgs.side_left){
					imgs.push({
						ImgUrl: this.recommend.imgs.side_left.slice(this.recommend.imgs.side_left.lastIndexOf('_')+1),
						Type: 2
					});
				}
				if(this.recommend.imgs.side_right){
					imgs.push({
						ImgUrl: this.recommend.imgs.side_right.slice(this.recommend.imgs.side_right.lastIndexOf('_')+1),
						Type: 3
					});
				}
				if(this.recommend.imgs.parts && this.recommend.imgs.parts.length){
					this.recommend.imgs.parts.forEach(item => {
						imgs.push({
							ImgUrl: item.slice(item.lastIndexOf('_')+1),
							Type: 4
						});
					});
				}


				detailsList.push({
					Flag: 2,
					SkuId: '',
					ProductName: '',
					ProductImg: '',
					StyleId: '',

					Lettering: this.manAdditional.Lettering,
					Typeface: this.manAdditional.Typeface,
					Specification: this.manAdditional.Hand,
					ImgUrl: this.manAdditional.ImgUrl.Id,
					Name: this.manAdditional.Name,
					Imgs: imgs,
					AttrList: attrList,
					Stones: [Stone],
					StyleNo: this.recommend.priorStyleNo
				});
			}else{
				detailsList.push({
					Flag: 1,
					SkuId: this.recommendSku.SkuId,
					ProductName: this.recommend.StyleName,
					ProductImg: this.recommend.MainImg,
					StyleId: this.recommend.Id,

					Lettering: this.manAdditional.Lettering,
					Typeface: this.manAdditional.Typeface,
					Specification: this.manAdditional.Hand,
					ImgUrl: this.manAdditional.ImgUrl.Id,
					Name: this.manAdditional.Name,
					Imgs: [],
					AttrList: [],
					Stones: [],
					StyleNo: ''
				});
			}

			this.personal_order.DetailsList = detailsList;
			var options = {
				url:"/order_api_CustomizeOrder_CreateGuardSweetOrder",
				params:that.personal_order
			};

			var cbok = res =>{
				this.$store.dispatch('clear_suit_cache','honey');
				this.$store.state.header.sign = 'fastion';
				this.$router.push({
					path:'/success/honey'
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
			display: inline-block;
			width: 30%;
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
