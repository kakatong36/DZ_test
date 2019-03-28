<template>
    <div class="content">
    	<div class="conent-inner">
    		<div class="product-wrapper" style="min-height: 255px;">
	            <ul class=" product-box" >
	                <li class="pro-list" v-for='(product,index) in product_list' :key="product.Id">
	                    <div class="clone" @click="delete_product(index,product)"><span>×</span></div>
	                    <ul class="">
	                        <li class="product_item clearfix">
	                            <div class=" img-left img-left-box">
	                                <!-- <img :src="imgUrl+product.SellerID+'/'+imgModel+'/image/'+product.ProductPic" height="60" width="60"> -->
                                    <img :src="http.imgUrl+product.ProductPic" v-if="product.ProductPic" height="60" width="60">
	                            </div>
	                            <div class=" msg-right-box" >
	                                <span class="">空托</span>
	                                <span class="right">￥{{product.ProductPrice}}</span>
	                                <ul class="">
	                                    <!-- <li class="list" v-for='attr in product.Attrs' >{{attr.AttrName}}: {{attr.AttrValue}}</li> -->
                                         <li class="list" v-for='attr in proParams' >{{attr.DictionaryName}}: {{attr.DictionaryValueName}}</li>
	                                </ul>
	                            </div>
	                        </li>
	                        <li class="product_item clearfix" v-for='stone in product.Stones' style="border-bottom: 1px solid #F5F5F5;" :key="stone.Id">
	                            <div class=" img-left img-left-box">
	                                <img src="../../common/images/fashionStatements/zuan.png" height="60" width="60">
	                            </div>
	                            <div class=" msg-right-box" >
	                                <span class="">配石</span>
	                                <span class="right">￥{{stone.StonePrice}}</span>   <!-- 石料价格 -->
	                                <ul class="">
	                                    <li class="list">{{stone.Cleanliness}}</li>     <!-- 石料净度 -->
		                                <li class="list">{{stone.Color}}</li>           <!-- 石料颜色 -->
		                                <li class="list">{{stone.Cut}}</li>             <!-- 石料切工 -->
		                                <li class="list">{{stone.StonePrice}}</li>      <!-- 石料价格 -->
	                                </ul>
	                            </div>
	                        </li>
	                    </ul>
	                    <div class="pro-total" style="color: #999;">共计<span class="total-price">¥{{PriceArr[product.Id]}}</span></div>
	                </li>
	               
	            </ul>
	        </div>
	        <div class="plans-customer bg-white">
	            <div class="form-title">客户信息填写</div>	            
	            <div class="form-customer list-box">
	                <div class="list">
	                    <div class="form-group">
	                        <label class="lab">姓名</label>
	                        <div class="input-box">
	                        	 <input type="text"  v-model='order.Consignee' class="requier"  data-tips='请填写收货人'/>
	                        </div>
	                       
	                    </div>
	                    <!-- <div class="form-group" id="distpicker">
	                        <label class="lab">省市区</label>
                            <v-distpicker @province="set_province" @city="set_city" @area="set_area"  class="distpicker"></v-distpicker >
                            <select data-v-a078dc08="" v-model="order.ProvinceName"></select>
                        </div> -->
	                    <!-- <div class="form-group">
	                        <label class="lab">详细地址</label>
	                        <div class="input-box">
	                        	<input type="text" class="inp requier" v-model='order.Address' data-tips='请填写详细地址'/>
	                        </div>
	                    </div> -->
                        <div class="form-group date">
	                        <label class="lab">预计交货日期</label>
	                        <div class="input-box input-date">
	                        	<input type="text" disabled class="inp requier" v-model='order.DeliveryDate' data-tips='请填写交货日期'/>
	                        </div>	
	                    </div>
	                </div>
	                <div class="list">
	                    <div class="form-group">
                            <label for="" class="lab">指纹上传</label>
                            <div class="upload">
                                <input type="button" value="已上传"  v-show="order.ImgUrl != ''">
                                <input type="button" value="未上传"  v-show="order.ImgUrl == ''">
                                <v-upload :type='0' @get_img='set_Img'></v-upload>
                            </div>
                        </div>
                        <div class="form-group write-group">
                            <div class="checkBox">
                                <input type="checkbox" value="刻字定制" @change="getWrite" id="write">
                                <div class="innerCirle">
                                    <div :class="{'outCirle':check}"></div>
                                </div>
                                <label class="lab" for="write">刻字定制</label>
                            </div>
                            <div class="write_content">
                                <input type="text" placeholder="输入刻字信息" v-model="order.writeMessage" :disabled="!check" maxlength="6">
                                <select name="" id="" class="custom-input" v-model="order.selectItem" :disabled="!check">
                                    <option value="新宋体">新宋体</option>
                                    <option value="微软雅黑">微软雅黑</option>
                                    <option value="篆体">篆体</option>
                                </select>
                                <div class="custom-input preview-btn" @click="previewShow">
                                    预览效果
                                    <div class="preview-view" v-show="previewShowFlag">
                                        <div class="preview-box">
                                            <img src="../../common/images/personal/copy@3x.png"/>
                                            <span class="preview-span" :style="{fontFamily : order.selectItem}">{{order.writeMessage}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
	                </div>
	            </div>
	        </div>
    	</div>
        
        <v-footer :isbtn='true' :textBtn='textBtn' :actives='actives' @nextaction = 'create_order'></v-footer>
        <v-shortcat></v-shortcat>
    </div>
</template>

<script>
import footer from 'components/footer/footer'
import relate from 'components/relate/relate'
import shortcat from 'components/home/shortcat'
import upload from "components/upload/upload";
var _Account = JSON.parse(localStorage.getItem('user'));
  export default {
    data () {
      return {
        isShowH: this.$store.state.header.isShow = true,
        title: this.$store.state.header.title = '结算平台',
        isShowF: this.$store.state.footer.isShow = true,
        isPrice:this.$store.state.footer.isPrice = true,
        isStep:this.$store.state.footer.isStep = false,
        
        textBtn:'提交',
        actives:[0,1,2],
        product_list:[],
        imgUrl:this.$store.state.header.imgUrl,
        imgModel:this.$store.state.header.imgModel ,
        PriceArr:{},
        order:{    
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
            CartIds: [],
            ImgUrl: '',
            writeMessage:'',
            selectItem: '新宋体',
        },
        proParams:[],
        check: false,
        previewShowFlag: false,
      }
    },
    wathch:{
        
    },
    created (){
        window.vm = this;
    },
    mounted(){
        this.order.DeliveryDate = this.getDate(12);
    	this.getCartlist();
    },

    methods:{
        previewShow () {
            if(this.check){
                this.previewShowFlag = !this.previewShowFlag;
            }
        },
        getWrite (e){
            if(e.target.checked) {
                this.check = true;
            }else{
                this.check = false;
                this.previewShowFlag = false;
            }
        },
        set_Img(src) {
            this.order.ImgUrl = src.url;
        },
        getDate(addDay) {
            var dd = new Date();
            if (addDay) {
                dd.setDate(dd.getDate() + addDay);
            }
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
            let dateList = y + "-" + m + "-" + d;
            return dateList;
        },
        /*获取购物车列表*/
            getCartlist(){
               var that = this;
               this.loading();
               
        	   var options = {
                       url:"/order_api_CustomizeCart_GetCarts"
        	   };
        	   var cbok = (res) =>{
        	   	  if(res.data.data.List.length>0){
                         that.product_list = res.data.data.List
                         for(let i = 0 ; i < that.product_list[0].AttrList.length; i ++){
                             if(i<that.product_list[0].AttrList.length-1){
                                that.proParams.push(that.product_list[0].AttrList[i+1])
                             }
                             if(i==that.product_list[0].AttrList.length-1){
                                 that.proParams.push(that.product_list[0].AttrList[0])
                             }
                         }
                        that.$store.commit('SET_TOTALPRICE',res.data.data.TotalPrice)
                    that.get_product_totalPrice();
                    
        	   	  };
                this.closeLoad();
        	   };
        	  this.http.get(options,cbok);
        	},
        /*计算单品总价*/
            get_product_totalPrice(){
                var that = this;
                that.product_list.map(function(product,index,array){
                   var totalPrice = 0;
                   totalPrice += product.ProductPrice;
                   product.Stones.map(function(stone,index,array){
                        totalPrice += stone.StonePrice;
                   });
                   that.PriceArr[product.Id] = totalPrice;
                });
                that.get_CommodityPrice();
            },   
        /*添加购物车订单*/
        	create_order(){
                this.order.ConsigneeTel = this.order.ConsigneePhone
                this.order.CartIds = []
                for(var i = 0; i < this.product_list.length; i++){
                    this.order.CartIds.push(this.product_list[i].Id)
                }
                this.loading();
                var options = {
                    url:"/order_Api_CustomizeOrder_CreateFashionOrder",
                    params:this.order
                };
                var cbok = res =>{
                    this.$router.push({
                        path:'/success/fastion'
                    });
                    this.closeLoad();
                };

                var cbno = res =>{
                    this.bombox.tomast({
                        msg:res.data.message
                    });
                    this.closeLoad();
                };
                this.http.post(options,cbok,cbno);
            },
        /*表单验证*/
            form_check(){
                var that = this;
                var requier = document.querySelectorAll(".requier");
                var flag = true;
                requier.forEach(function(item){
                    if(item.value == ''){
                        that.bombox.tomast({
                            msg:item.getAttribute('data-tips'),
                            time:1500,
                            type:'warning'
                        });
                        flag = false;
                        return ;
                    };

                    if(item.getAttribute("data-phone")){
                       if(!(/^1[34578]\d{9}$/.test(item.value))){
                            that.bombox.tomast({
                                msg:item.getAttribute('data-tips'),
                                type:'warning',
                                time:1500,

                            });
                             flag = false;
                            return ;
                       }
                    }
                });
                return flag;
            },
        /*设置订单数据*/
            make_order_detail(){
                return
                var that = this;
                that.product_list.map(function(item,index,array){
                    var data = {
                      Id: "",
                      OrderId: "",
                      OrderDetailsNo: "",
                      CartId: item.CartID,
                      ProductId: "",
                      SkuId: item.SKU,
                      CategoryId:that.$store.state.footer.cate.inlay,
                      BrandId: "",
                      ProductName: item.ProductName,
                      ProductType: 2,
                      ProductImg: item.ProductPic,
                      SalePrice: item.ProductPrice,
                      PaymentPrice: 0,
                      EstimateWeight: 0,
                      Weight: 0,
                      MatchStone: item.ProductStone.length>0?1:0,
                      ProductAttr: JSON.stringify(item.Attrs),
                      ProductSkuAttr: "",
                      CategoryName: "钻石镶嵌",
                      BrandName: "",
                      StoneType: 1,
                      ProductCode: "",
                      Address: "",
                      CustomizeType: 0,
                      GoldPrice: 0,
                      FeePrice: 0,
                      CertificatePrice: 0,
                      AuxiliaryStonePrice: 0,
                      MainStonePrice: item.ProductStone[0].StonePrice,
                      Remarks: "",
                      //ShopsId: that.order.UserId,
                      ShopsName: "",
                      StyleId: item.StyleID,
                      Lettering: "",
                      Typeface: "",
                      Hand: "",
                      ImgUrl: "",
                      Name: "",
                      Stones:[],
                      Imgs:[]
                    };
                    if(item.ProductStone.length>0){
                        item.ProductStone.map(function(stone,index,array){
                            var stone = {
                                Id: stone.ID,
                                OrderId: "",
                                OrderDetailsId: "",
                                SalePrice: stone.StonePrice,
                                Weight: "",
                                Count: stone.StoneNumber,
                                Color: stone.Color,
                                Cleanliness: stone.Cleanliness,
                                Cut: stone.Cut,
                                Remarks: "",
                                StoneType: stone.StoneType,
                                ProductCode: "",
                                StoneId: stone.StoneID
                            };
                            data.Stones.push(stone);
                        });
                    };
                    that.order.Details.push(data);
                });
            },
        /*计算订单总价*/
            get_CommodityPrice(){
                var cPrice = 0;
              // console.log(this.PriceArr)
                for(var _key in this.PriceArr){
                    cPrice += this.PriceArr[_key];
                };
                this.order.CommodityPrice = cPrice;
                this.$store.commit('SET_TOTALPRICE', cPrice)
            },  
            set_province(obj){
                this.order.ProvinceName = obj.value;
                this.order.ProvinceId = obj.code;
                    },//省数据更新
            set_city(obj){
                this.order.CityName = obj.code ? obj.value : '';
                this.order.CityId = obj.code || '';
                    },//市数据更新  判断下市级这里是否为空，如果是未定义或者传（市）的话就是错的，
            set_area(obj){
                this.order.AreaName = obj.code ? obj.value : '';
                this.order.AreaId = obj.code || '';
                }, //区数据更新  
        /*删除商品*/
        	delete_product(index,product){
        		var that = this;
        	
        		var options = {
                    url:"/order_api_CustomizeCart_DeleteCustomizeCart",
        			params:{
        				ids:[product.Id]
        			}
        		};
        		var cbok = function(res){
        			that.product_list.splice(index,1);
                    delete that.PriceArr[product.Id];
                    that.get_CommodityPrice();
        		};
        		this.http.post(options,cbok);
        	}
    },
    components:{
    	'v-footer':footer,
    	'v-relate':relate,
        'v-shortcat':shortcat,
        'v-upload': upload
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss';
    /*表单样式*/
 	
   .total-price{
   	color: #C1996A;
   	margin: 0 5px;
   }
   .product_item{
   	background-color: #fff;
   	padding: 10px 20px;
   	border-top: 1px solid #F5F5F5;
   	position: relative;
   }
   .msg-right-box{
   
   	margin: 0 0px 0 80px;
   	bottom: 10px;
   	padding-left: 20px;
   	span.right{
		color: #C1996A;
	}
   	ul{
   		margin-top: 20px;
   		li{
   			display: block;
   			float: left;
   			margin-right: 15px;
   			color:#aaa;
   			margin-bottom: 5px;
   			
   		}
   	}
   }
   .img-left-box{
   	width: 60px;
   	height: 60px;
    float: left;
   
   }
   .info-right{
   	padding-left: 20px;
   }
   .form-group{
        margin-bottom: 10px;
        width: 80%;
        .upload{
            display: block;
            margin:0 0 0 8em;
            position: relative;
        }
        input[type='button']{
            width: 100px;
        	height: 40px;
	        border-radius: 4px;
	        background: #fff;
	        box-sizing: border-box;
	        text-align: center;
           
        }
    }
    .date{
        margin-top: 40px;
    }
    .write-group{
        margin-top: 40px;
        .checkBox{
            display: flex;
            align-items: center;
            position: relative;
            .innerCirle{
                width: 20px;
                height: 20px;
                background: #fff;
                border: 1px solid #2c3e50;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                top: 10px; 
                .outCirle{
                    width: 14px;
                    height: 14px;
                    background: #2c3e50;
                    border: 1px solid #2c3e50;
                    border-radius: 50%;
                }
            }
        }
        .write_content{
            display: flex;
            margin-top: 20px;
            input[type='text'] {
                padding: 0 10px;
                border-radius: 4px;
                margin-right: 10px;
                width: 100px;
            }
            .preview-btn{
                width: 100px;
                height: 40px;
                border-radius: 4px;
                text-align: center;
                line-height: 40px;
                border:1px solid #e5e5e5;
                margin-left: 10px;
                position: relative;
                .preview-view{
                    width: 200px;
                    height: 200px;
                    position: absolute;
                    top: -210px;
                    .preview-box{
                        width: 100%;
                        height: 100%; 
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .preview-span{
                        position: absolute;
                        bottom: 42px;
                        left: 0;
                        width: 100%;
                        display: inline-block;
                        text-align: center;
                    }
                }
            }
        }
    }
    .form-group .lab,.form-group .inp{
        font-size: 1.2em;
    }
    .form-group .lab{
        width: 6em;
        float: left;
        line-height: 40px;
    }
    
    .form-group .input-box{
    	display: block;
        margin:0 0 0 8em;
        input{
        	width: 100%;
        	height: 40px;
	        padding: 8px 5px;
	        border-radius: 4px;
	        background: #fff;
	        box-sizing: border-box;
	        text-align: left;
        }
       
    }
    .input-date {
        input{
            border: none;
        }
    }
    .form-group .relate{
        margin:0 0 0 6em;
    }
    
    .form-group .sel{
        width: 6.2em;
        height: 40px;
        margin-right: 0.5em;
        border-radius: 4px;
        font-size: 1.2em;
        padding: 8px 5px;
        box-sizing: border-box;
        text-align: left;
    }
   
   
    .conent-inner{
    	position: absolute;
    	top: 57px;
    	bottom: 60px;
    	left: 0;
    	width: 100%;
    	overflow-y: auto;
    }
    .product-wrapper{
        padding: 1.44rem 2rem 1.88rem;
        background: #D8B387;
        /*background-image: linear-gradient(45deg, #BA9061 0%, #EFCEA3 100%);*/
        overflow-x: auto;
        overflow-y: hidden;
        border-bottom: 1rem solid #e5e5e5;
    }
    .table-box{
    	table-layout: fixed;
    	width: 100%;
    }
    

    .product-wrapper .product-box{
        width: auto;
        margin: 0 auto;
        white-space: nowrap;
    }
    .pro-list{
        position: relative;
        z-index:1;
        width: 350px;
        display: inline-block;
        
        padding-right: 2rem;
        .pro-total{
            background: #fff;
            text-align: right;
            color: #666 !important;
            padding: 0.5rem 1rem;
        }
        .table-box{
        	width: 300px;
        }
        &:before{
             content: '';
             position: absolute;
             z-index: 100;
             top: 0;
             left: 0;
             width: 0;
             height: 0;
             border-left: 40px solid #D8B387;
             border-bottom: 40px solid transparent;
         }
        &:after{
             content: '';
             position: absolute;
             z-index: -1;
             top:50%;
             left: 1rem;
             right: 3rem;
             bottom: 0;
             box-shadow: 0 10px 20px rgba(0,0,0,.3);
         }
        .stone-img{
            position: relative;
            z-index:1;
        }
        .clone{
            text-align: right;
            background: #fff;
            color: #e5e5e5;
            font-size:0;
            span{
                display: inline-block;
                font-size: 2rem;
                font-weight: 100;
                text-align: center;
                width: 2rem;
                height: 2.425rem;
                line-height: 2rem;
            }
        }
        
    }

    .stone-img .table-box{
        z-index: 1;
        @include border-1px(#e5e5e5);
        background: #fff;
        width: 100%;
    }
    .stone-img .img-l{
        width:112px;
        height:112px;
        padding: 15px;
    }
    .stone-img .img-l img{
        border: 1px solid #e5e5e5;
        padding: 10px;
    }
    .stone-img .info-right{
        padding-right:30px;

        .right{
            color:#c39d6f;
            font-weight: 500;
        }
        .list-box{
                margin-top: 20px;
            li{
                margin-right: 10px;
                color: #999;
            }
        }
    }

    .plans-customer{

    }
    .form-customer>.list{
        width: 50%;
        vertical-align: top;
        padding-left: 40px;
        box-sizing: border-box;
    }
    .form-title{
        padding-top: 20px;
        margin-bottom: 38px;
        font-size: 1.5em;
        text-align: center;
        margin-top: 20px;
    }
    @media screen and (max-width:768px){
        .form-customer > .list{
            width: 100%;
        }
    }
    #Provincial .inp{
        display: inline;
        width: 90px;
        margin-right: 3.1%;
    }
    .address{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
       
    }
    input[type='checkbox']{
        -webkit-appearance: checkbox;
        width: 20px;
        height: 20px;
        opacity: 0;
        z-index: 5;
        margin-right: 10px;
    }
</style>
