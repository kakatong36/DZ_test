<template>
    <div class="content bg-grey main">
        <!--正文box-->
        <div class="section">
	        <div class="plans-img">
	            <ul class="table-box plans-img-box">
		            <li class="cell pic-zst">
	                	<div class="imgbox">
	                		<div class="remove-img" v-show='imgs.elevation != "" ' @click='imgs.elevation = ""'>&times;</div>
	                		<div class="img" v-show='imgs.elevation != "" '>
	                			<img :src="imgs.elevation" />
	                		</div>
	                		<v-upload :type='0' @get_img='set_elevation'></v-upload>
	                	</div>
	                </li>
	                <li class="cell pic-cst">
	                	<div class="imgbox">
	                		<div class="remove-img" v-show='imgs.side_left != "" ' @click='imgs.side_left = ""'>&times;</div>
	                		<div class="img" v-show='imgs.side_left != "" '>
	                			<img :src="imgs.side_left" />
	                		</div>
	                		<v-upload :type='0' @get_img='set_side_left'></v-upload>
	                	</div>
	                </li>
	                <li class="cell pic-cst">
	                	<div class="imgbox">
	                		<div class="remove-img" v-show='imgs.side_right != "" ' @click='imgs.side_right = ""'>&times;</div>
	                		<div class="img" v-show='imgs.side_right != "" '>
	                			<img :src="imgs.side_right" />
	                		</div>
	                		<v-upload :type='0' @get_img='set_side_right'></v-upload>
	                	</div>
	                </li>
	                <li class="cell pic-xjt" v-for = '(part,index) in imgs.parts'>
	                	<div class="imgbox">
                            <div class="remove-img" @click='delete_img(index,"parts")'>&times;</div>
	                		<div class="img" >
	                			<img :src="part" />
	                		</div>         		
	                	</div>
	                </li>
	                <li class="cell pic-xjt">
	                	<div class="imgbox">
	                		<v-upload :type='1' @get_img='set_parts'></v-upload>
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
	                <label class="lab">参考款式编号</label>
	                <input type="text" class="inp" v-model='priorStyleNo'/>
	            </div>
	        </div>
        </div>
        <!--正文box end-->
        <v-footer :isbtn='isbtn' :textBtn='textBtn' @nextaction='go_to_next'></v-footer>
    </div>
</template>

<script>
  import footer from 'components/footer/footer'
  import upload from 'components/upload/upload'
  export default {
    data () {
      return {
        isShow: this.$store.state.header.isShow = true,
        title: this.$store.state.header.title = '男戒选择',
        isShow: this.$store.state.footer.isShow = true,
        textBtn: '提交',
        isPrice: this.$store.state.footer.isPrice = false,
        isbtn: this.$store.state.footer.isbtn = true,
        Account:JSON.parse(localStorage.getItem('user')),
        AttrArr:{},
        imgs:{
        	elevation:'',
        	side_left:'',
        	side_right:'',
        	parts:[]
        },
        imgUrl:this.$store.state.header.imgUrl,
      	upModel:this.$store.state.header.upModel,
      	attrData:[],
        palletAttrList:[],
        stoneAttrList:[],
        styleSkuList:[],

        StoneAttrList: [],
        StyleAttrList: [],
        StoneAttrSelected:{}, //已选择的属性
        StyleAttrSelected:{}, //已选择的属性
        priorStyleNo: null
      }
    },
    beforeRouteLeave(to,from,next){
        if(to.name == 'details'){
            var params = {
                sign:'honey',
                data:[]
            };
            this.$store.dispatch('set_suit_sku',params);

            var skuparams = {
                sign:'honey',
                data:{}
            };
            this.$store.dispatch('set_skuContent',skuparams);

        };
        next();
    },
    mounted(){
         if(this.$store.state.personal.honey.select_product.recommend ){
            if(this.$store.state.personal.honey.select_product.recommend.imgs){
                this.imgs = this.$store.state.personal.honey.select_product.recommend.imgs;
            }
            
            if(this.$store.state.personal.honey.skuContent){
                this.AttrArr  = this.$store.state.personal.honey.skuContent;
            }
        };
        this.get_attr_list();

    },
    watch:{
        AttrArr:{
            handler(val,oval){
                this.styleSkuList = [];
                for(var _key in val){
                    this.styleSkuList.push(val[_key]);
                };

                var params = {
                    sign:'honey',
                    data:this.styleSkuList
                };
                this.$store.dispatch('set_suit_sku',params);

                var skuparams = {
                    sign:'honey',
                    data:val
                };
                this.$store.dispatch('set_skuContent',skuparams);
            },
            deep:true
        }
    },
    methods:{
      /*选择属性*/
        checkAttr(attr,attrv){
            this.$set(this.AttrArr,attr.Id,JSON.stringify(attrv));
            this.styleSkuList = [];
            for(var _key in this.AttrArr){
                this.styleSkuList.push(this.AttrArr[_key]);
            };
            
            var params = {
                sign:'honey',
                data:this.styleSkuList
            };
            this.$store.dispatch('set_suit_sku',params);

            var skuparams = {
                sign:'honey',
                data:this.AttrArr
            };
            this.$store.dispatch('set_skuContent',skuparams);
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
     		var that = this;
     		this.attrData.ChildList.forEach(function(item){
     			if(item.ChildAttribute.length>0){
     				if( item.GroupName != '主石'){
     					that.palletAttrList = that.palletAttrList.concat(item.ChildAttribute);
     				}else{
     					that.stoneAttrList = that.stoneAttrList.concat(item.ChildAttribute);
     				}
     			}
     		});
     	},
      /*下一步*/	
	   go_to_next(){
	   	    /* if(!this.$store.state.personal.honey.select_product.main){
	   	    	 this.bombox.tomast({
                    msg:'请选择女款',
                    type:'warning',
                    time:1500
                });
                return;
	   	    }; */
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
            
            var params = {
                sign:'honey',
                data:{
                    main:this.$store.state.personal.honey.select_product.main,
                    recommend:{
                        Type:1,
                        imgs:this.imgs,
                        StyleAttrList:this.StyleAttrList,
                        StoneAttrList:this.StoneAttrList,
                        StyleAttrSelected:this.StyleAttrSelected,
                        StoneAttrSelected:this.StoneAttrSelected,
                        priorStyleNo:this.priorStyleNo
                    }
                }
            };
            this.$store.dispatch('set_suit_product',params);
            this.$store.state.personal.sign = 'honey';

            this.$router.push({
                path:'/personal/message'
            })
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
   		}
    },
    components:{
      'v-footer':footer,
      'v-upload':upload
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss';
    /*表单样式*/
    .form-group{
        display: table;
        margin-bottom: 10px;
        width: 80%;
        white-space: nowrap;
    }
    .form-group .lab,.form-group .inp{
        display: table-cell;
        font-size: 1.2em;
        padding-right: 1em;
        vertical-align: middle;
    }
    .form-group .lab{
        min-width: 5em;
    }
    .form-group .inp{
        min-width: 20em;
        height: 40px;
        padding: 8px 5px;
        border-radius: 4px;
        background: #fff;
        box-sizing: border-box;
        text-align: left;
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
       .section{
       	 position: absolute;
       	 top:57px;
       	 width: 100%;
       	 bottom: 60px;
       	 overflow-x: hidden;
       	 overflow-y: auto;
       }
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
    	width: 100%;
    	height: 130px;
    	margin-top: 10px;
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
    .plans-img .pic-zst{
        @include bg-image('../../common/images/honeyDetails/zst');
        background-size: 180px 180px;
    }
    .plans-img .pic-cst{
        @include bg-image('../../common/images/honeyDetails/cst');
        background-size: 180px 180px;
    }
    .plans-img .pic-xjt{
        @include bg-image('../../common/images/honeyDetails/xjt');
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
    @media screen and (max-width:768px){
        .form-customer > .list{
            width: 100%;
        }
    }


</style>
