<template>
    <div class="message content clearfix honey-detail-wrap" style="padding-bottom:0;" >
        <v-nodata v-show='isnodata'></v-nodata>
        <div class="user-center" v-if="orderNo">
            <div class="table-order">
                <div class="thead table-box">
                    <div class="cell thead-l">
                        <span>订单时间：{{order.CreateTime && order.CreateTime.replace('T',' ')}}</span>
                        <span>订单号：<span class="color-back" style="margin-right: 0;">{{order.SalesOrderNo}}</span></span>
                        <span>交货日期：{{order.DeliveryDate && order.DeliveryDate.substr(0,10)}}</span>
                    </div>
                    <span class="cell thead-r">{{order.CustomizeType==1?'真爱指环':order.CustomizeType==2?'守护甜心':''}}</span>
                </div>
            </div>
        </div>
        <div class="detail-box clearfix">
            <div class="left" :class="{honey: order.CustomizeType==2}">
                <div class="love-content" v-if='order.CustomizeType==1'>
                    <div class="main-img">
                        <img :src="styleImg" v-if="!order.DetailsList[0].ProductImg"/>	
                        <img :src="http.imgUrl+order.DetailsList[0].ProductImg" v-else/>
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
                <div class="honey-content" v-if='order.CustomizeType==2'>
                    <div class="main-img" v-if="bSkuId">
                        <img :src="http.imgUrl+manAdditional.ProductImg" v-if='manAdditional.ProductImg'/> 
                        <img :src="styleImg" v-if='!manAdditional.ProductImg'/> 
                        <div class="img-item">
                            <span class='Lettering'>{{manAdditional.Lettering}}</span>
                            <img src="../../common/images/personal/copy@3x.png" />
                        </div>
                    </div>
                    <!-- <div class="img-wrap clearfix">
                        <div class="img-box">
                            <p>主视图</p>
                            <div>
                                <img :src="styleImg"/>
                            </div>
                        </div>
                    </div> -->
                    <div class="main-img" v-if="gSkuId">
                        <img :src="http.imgUrl+womenAdditional.ProductImg" v-if='womenAdditional.ProductImg'/> 
                        <img :src="styleImg" v-if='!womenAdditional.ProductImg'/> 
                        <div class="img-item">
                            <span class='Lettering'>{{womenAdditional.Lettering}}</span>
                            <img src="../../common/images/personal/copy@3x.png" />
                        </div>
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
                                <div class="tab-content list clearfix" style="width: 290px;">
                                    <div class="form-group">
                                        <div>姓名</div>
                                        <div class="form-group-value">{{manAdditional.Name}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>手寸</div>
                                        <div class="form-group-value">{{manAdditional.Specification}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>刻字</div>
                                        <div class="form-group-value">{{manAdditional.Lettering}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>字体</div>
                                        <div class="form-group-value">{{manAdditional.Typeface}}</div>
                                    </div>
                                </div>
                                <div class="img-fingerprint list">
                                    <div class="imgbox">
                                        <div class="img">
                                            <img v-if='manAdditional.ImgUrl' :src="manAdditional.ImgUrl.indexOf('http')>-1?manAdditional.ImgUrl:http.imgUrl+manAdditional.ImgUrl" />
                                            <img v-if='!manAdditional.ImgUrl ' src="../../common/images/personal/pic5@2x.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if='gSkuId' class="info-box effect" style="transition:all .8s .1s linear;-webkit-transition:all .8s .1s linear;">
                            <h2 class="women">女方</h2>
                            <div class="list-box">
                                <div class="tab-content list clearfix" style="width: 290px;">
                                    <div class="form-group">
                                        <div>姓名</div>
                                        <div class="form-group-value">{{womenAdditional.Name}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>手寸</div>
                                        <div class="form-group-value">{{womenAdditional.Specification}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>刻字</div>
                                        <div class="form-group-value">{{womenAdditional.Lettering}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>字体</div>
                                        <div class="form-group-value">{{womenAdditional.Typeface}}</div>
                                    </div>
                                </div>
                                <div class="img-fingerprint list">
                                    <div class="imgbox">
                                        <div class="img">
                                            <img :src="womenAdditional.ImgUrl.indexOf('http')>-1?womenAdditional.ImgUrl:http.imgUrl+womenAdditional.ImgUrl" v-if="womenAdditional.ImgUrl"/>
                                            <img src="../../common/images/personal/pic5@2x.png" v-if='!womenAdditional.ImgUrl'/>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="info-box effect" style="transition:all .8s .1s linear;-webkit-transition:all .8s .1s linear;">
                            <h2 class="address">联系信息</h2>
                            <div class="list-box">
                                <div class="tab-content list clearfix" style="width: 290px;">
                                    <div class="form-group">
                                        <div>取货方式</div>
                                        <div class="form-group-value">{{order.Address?'快递寄送':'上门自取'}}</div>
                                    </div>
                                </div>
                                <div class="tab-content list clearfix" style="margin-top: 0;">
                                    <div class="form-group">
                                        <div>姓名</div>
                                        <div class="form-group-value">{{order.Consignee}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>电话</div>
                                        <div class="form-group-value">{{order.ConsigneeTel || order.ConsigneePhone}}</div>
                                    </div>
                                    <div class="form-group">
                                        <div>交货日期</div>
                                        <div class="form-group-value">{{order.DeliveryDate && order.DeliveryDate.substr(0,10)}}</div>
                                    </div>
                                </div>
                                <div class="tab-content list clearfix" style="margin-top: 0;" v-if="order.Address">
                                    <div class="form-group" style="width: 340px;">
                                        <div>地址</div>
                                        <div  class="form-group-value">{{order.ProvinceName +' '+ order.CityName + ' '+ order.AreaName + ' '+order.Address}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>	
            </div>
        </div>
    </div>
</template>

<script>
import nodata from 'components/nodata/nodata'
import styleImg from '../../assets/ps_17101611163885870100.jpg'
export default {
    data(){
        return {
            styleImg: styleImg,
            orderNo: '',
            order: {},
            isnodata: false,
            deliveryType: [],
            styleId: '',
            bSkuId: '',
            gSkuId: '',
            styleName: '',
            isShow: this.$store.state.header.isShow = true,
            title: this.$store.state.header.title = '订单详情',
            tab:0,
            next:false,
            sign:this.$store.state.personal.sign,
            main:{},
            upModel:this.$store.state.header.upModel,
            manAdditional: {
                SkuId: '',
                StyleId: '',
                ImgList: [],
                Flag: '',
                Name:'',
                Specification:'',
                Typeface:'',
                Lettering:'',
                ImgUrl:'',
                ProductName: '',
                ProductImg: ''
            },
            womenAdditional: {
                SkuId: '',
                StyleId: '',
                ImgList: [],
                Flag: '',
                Name:'',
                Specification:'',
                Typeface:'',
                Lettering:'',
                ImgUrl:'',
                ProductName: '',
                ProductImg: ''
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
        this.orderNo = this.$route.params.orderNo
        if(this.orderNo){
            this.getDetail()
        }
        this.styleName = this.$route.params.styleName
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
        getDetail(){
            this.loading()
            var options = {
                url:'/order_Api_CustomizeOrder_GetCustomizeOrderByOrderNo',
                params: {orderNo: this.orderNo}
            };
            var cbok = res => {
                this.order = res.data.data;
                this.styleId = this.order.StyleId
                if(this.order.DetailsList && this.order.DetailsList.length){
                    this.order.DetailsList.forEach(item => {
                        this.$set(item, 'gender', '0')
                        if(item.SkuAttrList && item.SkuAttrList.length){
                            item.SkuAttrList.forEach(sku => {
                                if(sku.DictionaryName == '适用人群'){
                                    item.gender = sku.DictionaryValueName == '女'?'1':'0'
                                }
                            })
                        }
                        if(item.ImgList && item.ImgList.length){
                            item.ImgList.sort((a,b) => {
                                return a.Type - b.Type
                            })
                            if(item.ImgList[0].ImgUrl.indexOf('http')>-1){
                                item.ProductImg = item.ImgList[0].ImgUrl
                            }else{
                                item.ProductImg = this.http.imgUrl + item.ImgList[0].ImgUrl
                            }
                        }
                        if(item.gender == '0'){
                            this.manAdditional = item
                            if(item.Flag == 2){
                                this.bSkuId = 1
                            }else{
                                this.bSkuId = item.SkuId
                            }
                        }else if(item.gender == '1'){
                            this.womenAdditional = item
                            if(item.Flag == 2){
                                this.gSkuId = 1
                            }else{
                                this.gSkuId = item.SkuId
                            }
                        }
                    })
                }
                this.isnodata = false;
                this.closeLoad();
            };
        
            var cbno = res =>{
                this.closeLoad();
                this.isnodata = true
            };

            var cbnull = res =>{
                this.isnodata = true;
                this.closeLoad();
            };
            this.http.get(options,cbok,cbno,cbnull);
        },
    },
    components:{
        'v-nodata':nodata
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
            border-right: 1px solid #e5e5e5;
            padding: 0 0 20px 0;
    		.love-content{
    			padding: 0 3.5rem;
    			box-sizing: border-box;
                margin-top: 15px;
    		}
    		.bride-content{
    			@extend .love-content
    		}
    		.main-img{
				width: 100%;
				margin-bottom: 1rem;
				text-align: center;
				img{
					width: 100%;
				}
			}
			.img-group{
				display: flex;
				justify-content: center;
                margin-bottom: 1rem;
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
    		box-sizing:border-box;
    		padding: 0 1.5625rem;
            overflow: hidden;
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
	
	.main-box{
		width: 100%;
		margin-right: 20px;
    }
	.main-box .form-group{
		width: 100px;
        margin: 0 20px 13px 0;
        float: left;
		div{
			font-size: 12px;
			color: #666;
			line-height: 2em;
			display: block;
            &.form-group-value{
                padding: 0 6px;
                height: 2em;
                line-height: 2em;
                font-size: 12px;
                width: 100%;
                border:1px solid #999;
                border-radius: 3px;
                box-sizing: border-box;
            }
		}
	}
    .clearfix:after{
        content: " ";
        display: block;
        clear: both;
        height: 0;
    }
    .clearfix {
        zoom: 1;
    }
	.info-box{
		border: 1px solid #e5e5e5;
		background: #fff;
		top:100px;
		transition:all .5s linear;
		-webkit-transition:all .5s linear;
		border-radius: 10px;
		margin-top: 20px;
		
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
        h2.address{
            &:before{
                background-image: linear-gradient(-134deg, #f0ff9d 0%, #e5c614 100%);
            }
        }
	}
	.user-center{
        margin: 20px 20px 0;
        border: 1px solid #e5e5e5;
        border-bottom: 0;
    }
    .user-center .t-list{
        padding: 14px 12px;
    }
    .user-center .t-list-wrap{
        border-bottom: 1px solid #e5e5e5;
    }
    .user-center .t-list-wrap:last-child{
        border-bottom:0;
    }
    .user-center .t-list:last-child{
        border-bottom:0;
    }
    .table-order{
        border-bottom: 1px solid #e5e5e5;
    }
    .t-img{
        width: 80px;
        height: 80px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
    .t-text{
        padding-left: 14px;
        vertical-align: top;
        .t-h2{
            font-size: 16px;
        }
        .t-arrt{
            color: #999;
        }
    }
    .thead{
        height: 30px;
        line-height: 30px;
        background: #f5f5f5;
        padding: 0 14px;
        color: #999;
        .thead-l span{
            margin-right: 50px;
        }
        .thead-r{
            color: #333;
            text-align: right;
            font-weight: bold;
        }
    }
    .user-center .color-back{
        color: #333;
    }
    .t-name,.t-price,.t-state{
        width: 200px;
        color: #999;
    }
    .t-state{
        p{
            margin-bottom: 14px;
        }
        .state{
            color: #333;
            font-weight: bold;
        }
        .order-details{
            color: #4990E2;
        }
    }
    .t-body td{
        border-right: 1px solid #e5e5e5;
        &:last-child{
             border-right: 0;
         }
    }
    .content, .content-top{
        overflow: scroll;
    }
    .detail-box{
        margin: 0 20px;
        border: 1px solid #e5e5e5;
    }
    .honey-detail-wrap{
        .honey-content{
            .img-wrap{
                width: 100%;
                background: red;
                margin-bottom: 1rem;
                overflow: hidden;
            }
            .img-box{
                float: left;
                padding: 10px;
                line-height: 80px;
            }
        }
    }
</style>
