<template>
    <div class="message content clearfix" style="padding-bottom:0;" >
		<div class="left " >
			<div class="love-content">
				<div class="main-img">
					<img :src="http.imgUrl+$route.params.MainImg" v-if="$route.params.MainImg"/>
					<img src="../../assets/ps_17101611163885870100.jpg" v-else/>				
				</div>
				<div class="img-group">
					<a  v-if='gSkuId'>
						<div class="img-item" style="position:relative;">
							<span class='Lettering' style="position:absolute;top:80px;left:0;right:0;color:#aaa;text-align:center;">{{womenAdditional.Lettering}}</span>
							<img src="../../common/images/personal/copy@3x.png" />
						</div>
						<p>女款刻字示例</p>
					</a>
					<a v-if='bSkuId'>
						<div class="img-item" style="position:relative;">
							<span class='Lettering' style="position:absolute;top:80px;left:0;right:0;color:#aaa;text-align:center;">{{manAdditional.Lettering}}</span>
							<img src="../../common/images/personal/copy@3x.png" />
						</div>
						<p>男款刻字示例</p>
					</a>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="inner">
				<h5 style="font-size:20px;">{{styleName}}</h5>
				<div class="main-box" v-show="!next">
					<div v-if='bSkuId' class="info-box effect">
						<h2>男方</h2>
						<div class="list-box">
							<div class="tab-content list" style="width: 290px;">
								<div class="form-group">
									<label>姓名</label>
									<input type="text" name="Name" v-model='manAdditional.Name' class="require" data-tips='请输入男方姓名'/>
								</div>
								<div class="form-group">
									<label>手寸</label> 
									<input type="tel" name="Specification" v-model='manAdditional.Specification' class="require" data-tips='请输入男方手寸' />
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
			                		<div class="remove-img" v-show='manAdditional.ImgUrl' @click='manAdditional.ImgUrl = "" '>&times;</div>
			                		<div class="img" v-show="manAdditional.ImgUrl">
                                        <img :src="manAdditional.ImgUrl" v-if="manAdditional.ImgUrl"/>
			                		</div>
			                		<v-upload :type='0' @get_img='set_manImg'></v-upload>
			                	</div>
								
							</div>
						</div>
					</div>
					<div v-if='gSkuId' class="info-box effect" style="transition:all .8s .1s linear;-webkit-transition:all .8s .1s linear;">
						<h2 class="women">女方</h2>
						<div class="list-box">
							<div class="tab-content list" style="width: 290px;">
								<div class="form-group">
									<label>姓名</label>
									<input type="text" name="name" v-model='womenAdditional.Name' class="require" data-tips='请填写女方姓名'/>
								</div>
								<div class="form-group">
									<label>手寸</label>
									<input type="tel" name="Specification" v-model='womenAdditional.Specification' class="require" data-tips='请填写女方手寸'/>
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
			                		<div class="remove-img" v-show='womenAdditional.ImgUrl' @click='womenAdditional.ImgUrl = "" '>&times;</div>
			                		<div class="img" v-show='womenAdditional.ImgUrl' >
			                			<img :src="womenAdditional.ImgUrl" v-if="womenAdditional.ImgUrl"/>
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
						<a v-for="(item, index) in deliveryType" :class="{checked: tab==index}" @click='set_devier(index, item)' :key="item.Id">
							<span><i></i></span>{{item.ValueName}}
						</a>
					</div>
					<div class="tab-content" >
						<div class="form-group">
							<label>姓名</label>
							<input type="text" name="name" v-model='order.Consignee' class="require" data-tips='请填写收货人'/>
						</div>
						<div class="form-group">
							<label>电话</label>
							<input type="text" name="phone" v-model='order.ConsigneeTel' class="require" data-tips='请填写正确的联系电话'/>
						</div>
						<div class="form-group message-relate" v-if='tab==1'>
							<label>省市区</label>
							<v-distpicker @province="set_province" @city="set_city" @area="set_area" class="distpicker"></v-distpicker >
						</div>
						<div class="form-group " v-if='tab==1'>
							<label>详细地址</label>
							<input type="text" name="address" v-model='order.Address' :class="{require:tab==1}" data-tips='请填写详细地址'/>
						</div>
						<div class="form-group">
							<label>交货日期</label>
							<input type="date" name="date" v-model='order.DeliveryDate' class="require" data-tips='请填写交货日期' style="height:2.5em;" placeholder="交货日期" />
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
import upload from 'components/upload/upload';

export default {
    data(){
        return {
            deliveryType: [],
            styleId: '',
            bSkuId: '',
            gSkuId: '',
            styleName: '',
      	    isShow: this.$store.state.header.isShow = true,
            title: this.$store.state.header.title = '信息确认',
            tab:0,
            next:false,
            sign:this.$store.state.personal.sign,
            main:{},
            upModel:this.$store.state.header.upModel,
            manAdditional: {
                SkuId: '',
                StyleId: '',
                Name:'',
                Specification:'',
                Typeface:'',
                Lettering:'',
                ImgUrl:''
            },
            womenAdditional: {
                SkuId: '',
                StyleId: '',
                Name:'',
                Specification:'',
                Typeface:'',
                Lettering:'',
                ImgUrl:''
            },
            /*订单基本数据*/
            order: {
                DeliverGoodsId: '',
                DeliverGoodsName: '',
                Consignee: '',
                ConsigneeTel: '',
                ConsigneePhone: '',
                ProvinceName: '',
                ProvinceId: '',
                CityName: '',
                CityId: '',
                AreaName: '',
                AreaId: '',
                Address: '',
                DeliveryDate: '',
                DetailsList: []
            },
        } 
    },
    created(){
        this.styleId = this.$route.params.styleId
        if(this.$route.params.bSkuId!='0'){
            this.bSkuId = this.$route.params.bSkuId
            this.manAdditional.SkuId = this.bSkuId
            this.order.DetailsList.push(this.manAdditional)
        }
        if(this.$route.params.gSkuId!='0'){
            this.gSkuId = this.$route.params.gSkuId
            this.womenAdditional.SkuId = this.gSkuId
            this.order.DetailsList.push(this.womenAdditional)
        }
        this.styleName = this.$route.params.styleName
        this.womenAdditional.StyleId = this.styleId
        this.manAdditional.StyleId = this.styleId
        this.getDeliveryType()
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
        //获取配送方式
        getDeliveryType(){
            var options = {
                url:"/purchase_Api_Select_GetDeliveryTypeList"
            };

            var cbok = res =>{
                this.deliveryType = res.data.data || []
            };

            var cbno = res =>{
                
            };

            this.http.get(options,cbok,cbno);
        },
        //省数据更新
        set_province(obj){
            this.order.ProvinceId = obj.code
            this.order.ProvinceName = obj.value
        },
        //市数据更新
        set_city(obj){
            this.order.CityId = obj.code || '';
            this.order.CityName = obj.code ? obj.value : '';
        },
        //区数据更新
        set_area(obj){
            this.order.AreaId = obj.code || '';
            this.order.AreaName = obj.code ? obj.value : '';
        }, 
    	/*女款指纹*/
    	set_womenImg(src){
    		this.womenAdditional.ImgUrl = src.url;
        },
        /*男款指纹*/
    	set_manImg(src){
            this.manAdditional.ImgUrl = src.url;
    	},
    	/*寄送方式选择*/
    	set_devier(index, obj){
            if(obj.Id == '70d0271c-f8ac-4dd5-a9e4-de621f7db1c1'){
                this.tab = 1
            }else{
                this.tab = 0
            }
    		this.order.DeliverGoodsId = obj.Id
    		this.order.DeliverGoodsName= obj.ValueName
    	},
    	/*订单*/
    	set_order(){
    	},
    	/*下一步*/
    	go_next_step(){
            if(this.bSkuId){
                if(!this.manAdditional.Name){
                    this.bombox.tomast({
                        msg: '请输入男方姓名',
                        type:'warning',
                        time:1500
                    });
                    return false
                }
                if(!this.manAdditional.Specification){
                    this.bombox.tomast({
                        msg: '请输入男方手寸',
                        type:'warning',
                        time:1500
                    });
                    return false
                }
            }
            if(this.gSkuId){
                if(!this.womenAdditional.Name){
                    this.bombox.tomast({
                        msg: '请输入女方姓名',
                        type:'warning',
                        time:1500
                    });
                    return false
                }
                if(!this.womenAdditional.Specification){
                    this.bombox.tomast({
                        msg: '请输入女方手寸',
                        type:'warning',
                        time:1500
                    });
                    return false
                }
            }
    		this.next = true;
            this.set_order();
    	},
    	create_order(){
    		if(!this.form_check()){
    			return;
    		};
    		this.loading();
    		var that = this;
            if(this.tab == 0){
                this.order.ProvinceId = ''
                this.order.ProvinceName = ''
                this.order.CityId = ''
                this.order.CityName = ''
                this.order.AreaId = ''
                this.order.AreaName = ''
            }
            let order = this.order
            order.DetailsList.forEach(item => {
                if(item.ImgUrl){
                    item.ImgUrl = item.ImgUrl.slice(item.ImgUrl.lastIndexOf('_')+1)
                }
            })
            var options = {
                url:"/order_Api_CustomizeOrder_CreateTrueLoveOrder",
                params: order
            };

            var cbok = res =>{
                this.$router.push({
                    path:'/success/love'
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
            });
            /*手机号验证*/
            if(!(/^1[34578]\d{9}$/.test(this.order.ConsigneeTel))){
                this.bombox.tomast({
                    msg: '请输入正确的电话号码',
                    type:'warning',
                    time:1500,
                });
                flag = false;
                return;
            }
            return flag;
            
        }
    },
    components:{
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
