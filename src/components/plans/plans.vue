<template>
    <div class="content bg-grey main" style="overflow-y: hidden;">
        <!--正文box-->
        <div class="plans_inners">
        <div class="plans-img">
            <ul class="table-box plans-img-box">
                <li class="cell pic-zst"><!--<input accept="image/*" type="file"/>-->
                	`<div class="imgbox">
                		<div class="remove-img" v-show='imgs.elevation != "" ' @click='imgs.elevation = ""'>&times;</div>
                		<div class="img" v-show='imgs.elevation != "" '>
                			<img :src="imgs.elevation" />
                		</div>
                		<v-upload :type='0' @get_img='set_elevation'></v-upload>
                    <p class='pic-tit'>正视图</p>
                	</div>`
                  
                </li>
                <li class="cell pic-cst">
                	<div class="imgbox">
                		<div class="remove-img" v-show='imgs.side_left != "" ' @click='imgs.side_left = "" '>&times;</div>
                		<div class="img" v-show='imgs.side_left != "" '>
                			<img :src="imgs.side_left" />
                		</div>
                		<v-upload :type='0' @get_img='set_side_left'></v-upload>
                    <p class='pic-tit'>侧视图</p>
                	</div>
                  
                </li>
                <li class="cell pic-csf">
                	<div class="imgbox">
                		<div class="remove-img" v-show='imgs.side_right != "" ' @click='imgs.side_right = "" '>&times;</div>
                		<div class="img" v-show='imgs.side_right != "" '>
                			<img :src="imgs.side_right" />
                		</div>
                		<v-upload :type='0' @get_img='set_side_right'></v-upload>
                    <p class='pic-tit'>俯视图</p>
                	</div>
                  
                </li>
                <li class="cell pic-xjt" v-for = '(part,index) in imgs.parts'>
                	<div class="imgbox">
                		<div class="remove-img" @click='delete_img(index,"parts")'>&times;</div>
                		<div class="img" >
                			<img :src="part" />
                      
                		</div>         		
                    <p class='pic-tit'>细节图</p>
                	</div>
                  
                </li>
                <li class="cell pic-xjt">
                	<div class="imgbox">
                		<v-upload :type='1' @get_img='set_parts'></v-upload>
                    <p class='pic-tit'>细节图</p>
                	</div>
                  
                </li>
            
            </ul>
        </div>

        <div class="plans-property bg-white list-box">
            <div class="list" style="width: 95%;">
                <div class="property">定制参数</div>
                <div class="parameter-wrapper" v-for='(attr,index) in StyleAttrList'>
                    <h2 class="para-attr">{{attr.DictionaryName}}</h2>
                    <ul class="para-val list-box">
                        <li class="list" v-for='(attrValue,index) in attr.AttrValueList'>
                        	<input type="radio" :name="attr.Id" v-model='StyleAttrSelected[attr.Id]' :value='attrValue' /><span>{{attrValue.DictionaryValueName}}</span>
                        </li>	                      
                    </ul>
	            </div>   
                <div class="parameter-wrapper" v-for='(attr,index) in StoneAttrList'>
                    <h2 class="para-attr">{{attr.DictionaryName}}</h2>
                    <ul class="para-val list-box">
                        <li class="list" v-for='(attrValue,index) in attr.AttrValueList'>
                        	<input type="radio" :name="attr.Id" v-model='StoneAttrSelected[attr.Id]' :value='attrValue' /><span>{{attrValue.DictionaryValueName}}</span>
                        </li>	                      
                    </ul>
	            </div>    
            </div>
        </div>
        <div class="plans-style bg-white">
            <div class="form-group">
                <label class="lab" style="width: 7em;">参考款式编号</label>
                <div class="input-box" style="margin-left: 9em;">
                	<input type="text" class="inp" v-model='priorStyleNo'/>
                </div>	
            </div>
        </div>
        <div class="plans-customer bg-white">
            <div class="form-title">客户信息填写</div>
            <div class="form-customer list-box">
                <div class="list">
                    <div class="form-group">
                        <label class="lab">姓名</label>
                        <div class="input-box">
                        	 <input type="text"  v-model='order.Consignee'/>
                        </div>
                       
                    </div>
                    <div class="form-group" id="distpicker">
                        <label class="lab">省市区</label>
                        <v-distpicker @province="set_province" @city="set_city" @area="set_area"  class="distpicker"></v-distpicker >
                    </div>
                    <div class="form-group">
                        <label class="lab">详细地址</label>
                        <div class="input-box">
                        	<input type="text" class="inp" v-model='order.Address'/>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="form-group">
                        <label class="lab">电话</label>
                        <div class="input-box">
                        	<input type="tel" class="inp" v-model='order.ConsigneePhone'/>
                        </div>	
                    </div>
                    <div class="form-group">
                        <label class="lab">交货日期</label>
                        <div class="input-box">
                        	<input type="date" class="inp" v-model='order.DeliveryDate'/>
                        </div>	
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!--正文box end-->
         <v-footer :isbtn='isbtn'  :textBtn='textBtn' @nextaction='create_order'></v-footer>
    </div>
</template>

<script>
  import relate from 'components/relate/relate';
  import upload from 'components/upload/upload';
  import footer from 'components/footer/footer';
  
  export default {
    data () {
      return {
        isShow: this.$store.state.header.isShow = true,
        isbtn:true,
        title: this.$store.state.header.title = '来图定制',
        isShow: this.$store.state.footer.isShow = true,
        textBtn:'提交',
        isPrice: this.$store.state.footer.isPrice = false,
        success2: this.$store.state.footer.submit = this.success,
        Account:JSON.parse(localStorage.getItem('user')),
        imgs:{
        	elevation:'',
        	side_left:'',
        	side_right:'',
        	parts:[]
        },

        imgUrl:this.$store.state.header.imgUrl,
      	upModel:this.$store.state.header.upModel,
      	order:{
      		DeliveryDate:''
      	},

      	palletAttrList:[],
      	stoneAttrList:[],
      	styleSkuList:[],
      	/*订单基本数据*/
    	plans_order:{
    	  OrderNo: "",
		  CustomizeType: 4,
		  UserId: "",
		  CommodityPrice: 0,
		  EstimateWeight: 0,
		  Weight: 0,
		  Freight: 0,
		  FavorablePrice: 0,
		  InsurancePrice: 0,
		  OrderTotal: 0,
		  DeliverGoodsId: "",
		  DeliverGoodsName: "",
		  AddressId: "",
		  Consignee: "",
		  ConsigneeTel: "",
		  ConsigneePhone: "",
		  Province: 0,
		  Citye: 0,
		  Area: 0,
		  AddressDetailse: "",
		  OrderRemarkse: "",
		  MatchStonee: 0,
		  ShopsIde: "",
		  SHOPSNAME: "",
		  ZipCodee: "",
		  DeliveryDate: "",
		  Details:[]
    	},


        StoneAttrList: [],
        StyleAttrList: [],
        StoneAttrSelected:{}, //已选择的属性
        StyleAttrSelected:{}, //已选择的属性
        priorStyleNo: '', //参考款号
        order: {
            DeliverGoodsId: '',
            DeliverGoodsName: '',

            Consignee: '',
            ConsigneeTel: '',
            ConsigneePhone: '',

            ProvinceId: '',
            CityId: '',
            AreaId: '',
            ProvinceName: '',
            CityName: '',
            AreaName: '',

            Address: '',

            DeliveryDate: '',

            DetailsList: []
        }
      }
    },
    mounted(){
    	this.Account = JSON.parse(localStorage.getItem('user'));
    	this.$store.state.footer.isStep = false;
    	this.$store.state.footer.isPrice = false;
        this.get_attr_list();

    },
    methods:{

      /*上传图片*/	
	    uplaodImg(evt){
	      	var files = evt.target.files;
	      	this.upload(files);
	    },
      /*提交成功*/
	    success(){
	        this.$router.push({
	          path: '/success'
	        });
	    },
      /*拉取属性*/
     	get_attr_list(){
     		var that = this;
     		var options = {
     			url:'/purchase_api_Select_GetToFigureAttr'
     		};
     		
     		var cbok = function(res){
     			that.StoneAttrList = res.data.data.StoneAttrList;
     			that.StyleAttrList = res.data.data.StyleAttrList;

     		};
     		
     		var cbno = function(res){
     			that.bombox.tomast({
     				msg:res.data.message,
     				type:'warning'
     			});
     		};
     		
     		var cbnull = function(res){
     			that.StoneAttrList = [];
     			that.StyleAttrList = [];
     			that.bombox.tomast({
     				msg:res.data.message,
     				type:'warning'
     			})
     		};
     		
     		this.http.get(options,cbok,cbno,cbnull);
     			
     	},
      /*整理戒托的属性参数*/
     	make_pallet_attrs(){
             /*
     		var that = this;
     		this.attrData.ChildList.forEach(function(item){
     			if(item.ChildAttribute.length>0){
     				if( item.GroupName != '主石'){
     					that.palletAttrList = that.palletAttrList.concat(item.ChildAttribute);
     				}else{
     					that.stoneAttrList = that.stoneAttrList.concat(item.ChildAttribute);
     				}
     			}
     		});*/
     	},
      /*正视图*/
     	set_elevation(data){
     		this.imgs.elevation = data.url;
     	},
     /*左侧图*/
    	set_side_left(data){
    		this.imgs.side_left = data.url;
    	},
    /*右侧图*/	
    	set_side_right(data){
    		this.imgs.side_right = data.url;
    	},
    /*细节图*/
   		set_parts(data){
   			this.imgs.parts = this.imgs.parts.concat(data.url);
   		},
   	/*删除图片*/
   		delete_img(index){
   			this.imgs.parts.splice(index,1);
   		},
   	/*创建订单*/
   		create_order(){

   			if(this.imgs.elevation == ''){
                this.bombox.tomast({
                    msg:'请上传正视图',
                    type:'warning',
                    time:1500
                });
                return;
            };

            if(this.imgs.side_left == ''){
                this.bombox.tomast({
                    msg:'请上传侧视图',
                    type:'warning',
                    time:1500
                });
                return;
            };

            if(this.imgs.side_right == ''){
                this.bombox.tomast({
                    msg:'请上传俯视图',
                    type:'warning',
                    time:1500
                });
                return;
            };

            if(this.imgs.parts.length == 0){
                this.bombox.tomast({
                    msg:'请至少上传一张细节图',
                    type:'warning',
                    time:1500
                });
                return;
            }
            
            if(Object.keys(this.StyleAttrSelected).length + Object.keys(this.StoneAttrSelected).length != this.StoneAttrList.length + this.StyleAttrList.length){
                this.bombox.tomast({
                    msg:'请选择商品参数',
                    type:'warning',
                    time:1500
                });
                return;
            }
            
            if(this.order.Consignee == ''){
            	this.bombox.tomast({
                    msg:'请填写收货人',
                    type:'warning',
                    time:1500
                });
                return;
            };
            
          

           if(!(/^1[34578]\d{9}$/.test(this.order.ConsigneePhone))){
                this.bombox.tomast({
                    msg:"请填写正确的联系电话",
                    type:'warning',
                    time:1500,
                });               
                return;
           }

           if(!this.order.ProvinceName || !this.order.CityName || !this.order.AreaName){
               this.bombox.tomast({
                    msg:'请填写完整的省市区信息',
                    type:'warning',
                    time:1500
                });
                return;
           }
           
            
            if(this.order.Address == ''){
            	this.bombox.tomast({
                    msg:'请填写详细地址',
                    type:'warning',
                    time:1500
                });
                return;
            };
            
            if(this.order.DeliveryDate == ''){
            	this.bombox.tomast({
                    msg:'请填写交货日期',
                    type:'warning',
                    time:1500
                });
                return;
            };



            
            this.order.ConsigneeTel = this.order.ConsigneePhone;
            this.order.DetailsList = [];

            let attrList = [],
                Stone = {
                    SalePrice: 0,
                    Quantity: 1,
                    Weight: "",
                    Color: "",
                    Cleanliness: "",
                    Shape: ""
                };
            for(let key in this.StoneAttrSelected){
                /* if(this.StoneAttrList[0].Id == key){//重量
                    Stone.Weight = this.StoneAttrSelected[key].DictionaryValueName;
                } */
                if(this.StoneAttrList[0].Id == key){//颜色
                    Stone.Color = this.StoneAttrSelected[key].DictionaryValueName;
                }
                if(this.StoneAttrList[1].Id == key){//净度
                    Stone.Cleanliness = this.StoneAttrSelected[key].DictionaryValueName;
                }
                /* if(this.StoneAttrList[0].Id == key){//形状
                    Stone.Shape = this.StoneAttrSelected[key].DictionaryValueName;
                } */
                if(this.StoneAttrList[2].Id == key){//切工
                    Stone.Cut = this.StoneAttrSelected[key].DictionaryValueName;
                }
            }
            for(let key in this.StyleAttrSelected){
                this.StyleAttrList.some(item => {
                    if(item.Id == key){
                        attrList.push({
                            AttrGroupId: item.GroupId,
                            AttrId: item.Id,
                            AttrValueId: this.StyleAttrSelected[key].Id,
                            AttrGroupName: "",
                            DictionaryId: item.DictionaryId,
                            DictionaryValueId: this.StyleAttrSelected[key].DictionaryValueId
                        });
                        if(item.DictionaryName == '镶口大小'){
                            Stone.Weight = this.StyleAttrSelected[key].DictionaryValueName
                        }
                    }
                    return item.Id == key;
                });
            }
            this.order.DetailsList = [];

            let imgs = [];
            if(this.imgs.elevation){
                imgs.push({
                    ImgUrl: this.imgs.elevation.slice(this.imgs.elevation.lastIndexOf('_')+1),
                    Type: 1
                });
            }
            if(this.imgs.side_left){
                imgs.push({
                    ImgUrl: this.imgs.side_left.slice(this.imgs.side_left.lastIndexOf('_')+1),
                    Type: 2
                });
            }
            if(this.imgs.side_right){
                imgs.push({
                    ImgUrl: this.imgs.side_right.slice(this.imgs.side_right.lastIndexOf('_')+1),
                    Type: 3
                });
            }
            if(this.imgs.parts && this.imgs.parts.length){
                this.imgs.parts.forEach(item => {
                    imgs.push({
                        ImgUrl: item.slice(item.lastIndexOf('_')+1),
                        Type: 4
                    });
                });
            }

            this.order.DetailsList.push({
                StyleNo: this.priorStyleNo,
                Imgs: imgs,
                AttrList: attrList,
                Stones: [Stone]
            });
   			var that = this;
            var options = {
                url:"/order_Api_CustomizeOrder_CreateToFigureOrder",
                params:that.order
            };
            
            var cbok = function(res){
                that.$router.push({
                    path:'/success/fashion'
                });
            };
            
            var cbno = function(res){
                that.bombox.tomast({
                    msg:res.data.message,
                    type:'warning'
                });
            };
            
            this.http.post(options,cbok,cbno);

   		},
        set_province(obj){
            this.order.ProvinceName = obj.value;
            this.order.ProvinceId = obj.code;
        },
        set_city(obj){
            this.order.CityName = obj.code ? obj.value : '';
            this.order.CityId = obj.code || '';
        },
        set_area(obj){
            this.order.AreaName = obj.code ? obj.value : '';
            this.order.AreaId = obj.code || '';
        }
   		
    },
    components:{
    	'v-relate':relate,
    	'v-upload':upload,
    	'v-footer':footer
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss';
    /*表单样式*/
     .plans_inners{
     	position: absolute;
     	top: 57px;
     	bottom: 60px;
     	left: 0;
     	right: 0;
     	overflow-x: hidden;
     	overflow-y: auto;
     }
    .form-group{
        margin-bottom: 10px;
        width: 80%;
    }
    .form-group .lab,.form-group .inp{
        font-size: 1.2em;
    }
    .form-group .lab{
        width: 5em;
        float: left;
        line-height: 40px;
    }
    
    .form-group .input-box{
    	display: block;
        margin:0 0 0 6em;
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

    .main{
        overflow-y: scroll;
    }
    .plans-img{
        width: 100%;
        height: 220px;
        text-align: center;
        overflow-y: hidden;
        overflow-x: scroll;
    }
    .plans-img .plans-img-box{
        width: auto;
        margin: 0 auto;
        .pic-tit{
          position:absolute;
          bottom:10px;
          text-align:center;
          color:#aaa;
          font-size:14px;
          left:0;
          right:0;
        }
    }
    .plans-img::-webkit-scrollbar{
        display: none;
    }
    .plans-img .cell{
        width: 180px;
        height: 180px;
        padding: 20px;
        background: #fff;
       
    }
    .imgbox{
    	width: 180px;
    	height: 180px;
    	position: relative;
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
    .imgbox .img{
    	margin-top: 10px;
    	width: 100%;
    	height: 130px;
    	position: absolute;
    	top: 0;
    	left: 0;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	background-color: #fff;
    	img{
    		max-width: 100%;
    		max-height: 100%;
    		
    	}
    }
    .plans-img .cell input[type='file']{
       position: absolute;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
       opacity: 0;
    }
    .plans-img .pic-zst{
        @include bg-image('../../common/images/plans/zs');
        background-size: 180px 180px;
    }
    .plans-img .pic-cst{
        @include bg-image('../../common/images/plans/cs');
        background-size: 180px 180px;
    }
    .plans-img .pic-csf{
        @include bg-image('../../common/images/plans/fs');
        background-size: 180px 180px;
    }
    .plans-img .pic-xjt{
        @include bg-image('../../common/images/plans/xj');
        background-size: 180px 180px;
    }

    .plans-property{
        width: 100%;
        margin-bottom: 20px;
    }
    .plans-property>.list{
        width: 50%;
        vertical-align: top;
        padding-left: 40px;
        box-sizing: border-box;
    }

    .plans-style{
        padding: 15px 40px;
        margin-bottom: 20px;
    }
    .plans-style .form-group{
        margin-bottom: 0;
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
    }
    .address{
        display: flex;
    }

    @media screen and (max-width:768px){
        .form-customer > .list{
            width: 100%;
        }
    }


</style>
