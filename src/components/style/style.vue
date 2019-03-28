<template>
    <div class="flex-box content">
        <div class="slider-box" style="z-index: 15;">
            <div class="search">
                <span class="icon-search"></span>
                <input type="search" v-model='searchs.SearchWord' class="inp-search" placeholder="搜索" @input='get_search(1)'/>
            </div>
            <div class="slider-inner">
                <ul class="slider-ul" id="fistList">
                    <li v-for='(item,index) in cateList' @click='get_value_item(item,index)' :class='{hover:currentCate.Id == item.Id}'>
                      <span>{{item.DictionaryName}}</span>
                      <i v-for='item2 in cateChildSelected[item.Id]'>{{item2.DictionaryValueName}}</i>
                    </li>
                </ul>
            </div>
            <div class="slider-map" v-show='subMenu' style="z-index: 15;">
              <div class="subMenu-header"><span @click='clearCurSearchItem'>清空</span></div>
            	<ul>
            		<li v-for='(value,index) in cateChildList' @click='set_Muilte(value,index)' :class='{hover:isCateChildSelected(value)}'><span>{{value.DictionaryValueName}}</span></li>
            	</ul>           
            </div>
        </div>
      
        <div class="product-list "  @scroll='scrollLoading' >
        	<v-nodata v-show='isnodata' :msg='nodatamsg'></v-nodata>
            <ul class="list-box">
               <li class="list skuItem" v-for='(style,index) in styleList'>        
                    <div class="pic">
                        <img :src="http.imgUrl+style.StyleImg" @click='go_to_detail(style)' v-if="style.StyleImg">
                        <img src="../../assets/ps_17101611163885870100.jpg" @click='go_to_detail(style)' v-else/>
                    </div>
                    <div class="price" style="padding:0 10px 5px 0; "><font color="#ff0000">￥{{style.SalePrice}}</font></div>             
                    <div class="name" style="">{{style.StyleName}}</div>
                    <div class="name " style=";    color: #C1996A;" v-if='style.SKUName'>{{style.SKUName}}</div>
                </li>    
            </ul>
        </div>
             <div class="mask" v-show='subMenu' @click='subMenu = false'></div>
        <v-footer :active='active'></v-footer>
        <v-shortcat></v-shortcat>
        
     
    </div>
</template>

<script>
import footer from 'components/footer/footer'
import shortcat from 'components/home/shortcat'
import nodata from 'components/nodata/nodata'

import styleImg from '../../assets/ps_17101611163885870100.jpg'

var style_progress = [];
  export default {
    data () {
        return {
            isShow: this.$store.state.header.isShow = true,
            title: this.$store.state.header.title = '戒托款式选择',
            isShow: this.$store.state.footer.isShow = true,
            isnodata:false,
            translate:'translate3d',
            nodatamsg:'暂无数据<br>请重新设置搜索条件',
            active:[],
            /*
            searchs:{
                show: {
                    SearchWord: "",
                    StoreId: '',
                    CategoryId: this.$store.state.footer.cate.inlay,
                    StoreClass: "",
                    SupAndWeightSearch: [],
                    AttributeSearch: [],
                    PriceSearch: [],
                    DataSearch: [],
                    StockSearch: [],
                    SortSearch: null
                },
                PageIndex: 1,
                PageSize:30,
                Incubate:'',
                WeightRange:''
            },
            */
            barJson:{},
            barArr:[],
            subMenu:false,
            valueList:{
            group:'empty',
            content:{}
            },
            searchItems:{},
            Hover:{
            SupAndWeightSearch:[],
            AttributeSearch:[],
            PriceSearch:[],
            DataSearch:[],
            StockSearch:[],
            empty:[]
            },
            currentCate:{},
            cateHover:[],
            valueHover:-1,
            styleList:[],
            styleData:{},
            imgUrl:this.$store.state.header.imgUrl,
            imgModel:this.$store.state.header.imgModel ,
            isLoad:false,
            muilte:[],
            sigle:[],
            isscroll:false,


            styleImg: styleImg,
            cateList: [],
            cateChildList: [],
            cateChildSelected: {},
            searchs: {
                PageIndex: 1,
                PageSize: 30,
                SearchWord: ''/*,
                RabbetSize: 0,
                AttributeSearch: null*/
            }
        }
    },
   
    beforeRouteLeave (to, from, next) {
      this.$store.state.header.isShow = false;
      this.$store.state.footer.isShow = false;
      if(to.name == 'fashion'){
      	 this.$store.dispatch('clear_cache');
      };
      next();
    },
    created(){
     
      if(this.$store.state.dialog.cur_stone.Id){
         style_progress =  ['选石','选款','结算','完成'];
         this.active = [0,1];
      }else{
         style_progress =  ['选款','选石','结算','完成'];
          this.active = [0];
      }

       this.$store.state.footer.progress = style_progress;
    },
    mounted(){
    	this.$store.state.footer.isStep = true;
        this.getStyleList();
    	this.getCate();
    },
    methods:{
        isCateChildSelected (cateItem) {
            let childList = this.cateChildSelected[this.currentCate.Id] || [],
                flag = false;
            if(childList.indexOf(cateItem) != -1){
                flag = true;
            }
            return flag;
        },
    	/*拉取钻石镶嵌分类*/
	    	getCate(){
	    		var that = this;
	    		
	    		var options = {
	    			url:'/purchase_Api_Select_SelectPlatShowList',
	    			params:{
                        platId:'f9815566-0a58-43a6-9d4f-ed8361f535c9',
                        categoryId:'01e30caf-d9bc-4069-90d0-3ccc9251d1de'
	    			}
	    		};
	    		var cbok = function(res){
	    			that.MakeData(res.data.data);
	    			
                }
                this.cateList = [];
                this.cateChildList = [];
	    		this.http.get(options,cbok);
	    	},
        /*渲染查询属性*/
        	MakeData(data){
                var that = this;
                if(data && data.length){
                    data.forEach(item => {
                        item.DictionaryName;
                        that.cateList.push(item);
                    });
                }
        	},
        /*清空当前搜索条件*/
          clearCurSearchItem(){
            this.cateChildSelected = {};
            this.get_search(1);
          },  
        /*渲染属性值*/
       		get_value_item(cate,index){
                this.currentCate = cate;
                this.cateChildList = [];
                if(cate.AttrValueList && cate.AttrValueList.length){
                    this.cateChildList = cate.AttrValueList;
                }
                this.subMenu = true;
       		},
       	/*设置搜索多选条件*/
       		set_Muilte(value){
                let childList = this.cateChildSelected[this.currentCate.Id] || [],
                    index = childList.indexOf(value);
                if(index == -1){
                    childList.push(value)
                }else{
                    childList.splice(index,1);
                }
                this.$set(this.cateChildSelected, this.currentCate.Id, childList);
                this.get_search(1);


       			//this.set_search(value,'muilte');   
				
	            //this.save_search_item(value,'muilte');
	            
	            
       		},
        /*保存已选择的搜索条件*/
          save_search_item(value,sign){
          	
             var cateId = this.valueList.content.Id;
             if(this.searchItems[cateId]){
                if(sign == 'single'){
                  var index = this.searchItems[cateId].indexOf(value);
                  if(index>=0){
                    this.searchItems[cateId].splice(0,1);
                  }else{
                    this.searchItems[cateId].splice(0,1,value);
                  }
                }else{
                  var index = this.searchItems[cateId].indexOf(value);
                  if(index>=0){
                    this.searchItems[cateId].splice(index,1);
                  }else{
                    this.searchItems[cateId].push(value);
                  }
                }
             }else{
               this.$set(this.searchItems,cateId,[]);
               this.searchItems[cateId].push(value);
             }
            // console.log(this.searchs.show.SupAndWeightSearch);
          }, 

       	/*设置搜索条件*/
       		set_search(value,sign){
       			var that = this;
       			var isExite = false;
       			var _index = 0;
       			var _key = this.valueList.group;
       			this.searchs.show[_key].map(function(item,index,array){
       				if(item.Id == that.valueList.content.Id){
       					isExite = true;
       					_index = index;
       				}
       			});
       			if(isExite){
              var valueIndex = this.searchs.show[_key][_index].Valueitem.indexOf(value);
              if(valueIndex>=0){
                this.searchs.show[_key][_index].Valueitem.splice(valueIndex,1);
                if(this.searchs.show[_key][_index].Valueitem.length == 0){
                    this.searchs.show[_key].splice(_index,1);
                };
              }else{
                if(sign == 'single'){
                  this.searchs.show[_key][_index].Valueitem.splice(0,1,value);
                }else{
                  this.searchs.show[_key][_index].Valueitem.push(value);
                }
                
              }
       				
       			}else{
       				console.log(value);
       				var data = {
	       				Id: this.valueList.content.Id,
				        Name: this.valueList.content.Name,
				        IsMulti: this.valueList.content.IsMulti,
				        AttributeClass: this.valueList.content.AttributeClass,
				        Valueitem: []
	       			};
	       			data.Valueitem.push(value);
	       			this.searchs.show[_key].push(data);
       			}
       		},
       	/*拉取款式列表*/
       		getStyleList(){
                var that = this;   
                   this.loading();
                if(this.$store.state.dialog.cur_stone.Weight){
                   this.searchs.RabbetSize = this.$store.state.dialog.cur_stone.Weight;
                }else{
                    delete this.searchs.RabbetSize;
                }
                let searchCateList = [];
                for(let key in this.cateChildSelected){
                    let obj = {},
                        className = '';
                    this.cateList.some(item => {
                        if(item.Id == key){
                            className = item.DictionaryClass;
                            return true;
                        }
                        return false;
                    });
                    obj.AttributeClass = className;
                    obj.AttrId = key;
                    obj.AttrValueList = [];
                    this.cateChildSelected[key].forEach(item => {
                        obj.AttrValueList.push({
                            AttrValueId: item.Id
                        });
                    });
                    searchCateList.push(obj);
                }
                if(searchCateList.length){
                    this.searchs.AttributeSearch = searchCateList;
                }else{
                    delete this.searchs.AttributeSearch;
                }
       			var options = {
       				url:'/purchase_Api_FashionStyle_SearchList',
       				params:that.searchs
                   };
       			var cbok = function(res){
       				
       				that.closeLoad();
       				
       				if(that.isscroll){
       					that.styleList = that.styleList.concat(res.data.data.data_list);        					
       				}else{
       					that.styleList = res.data.data.data_list; 
       				}
       				
       				that.styleData = res.data.data;
       				if(that.styleList.length == 0){
       					that.isnodata = true;
       				}else{
       					that.isnodata = false;
       				}
       				that.isLoad = false;
       			  
		              that.$nextTick(function(){
		                document.querySelector(".product-list").style.cssText="opacity: 1;top: 0;";
		              });
       			};
       			var cbno = function(res){
       				console.log(res.data.message);
       				//this.styleData = res.data.data;
       				that.isLoad = false;
                    that.isnodata = true;
       			};
       			var cbnull = function(res){
       				that.styleData = res.data.data;
       				that.isLoad = false;
       				that.isnodata = true;
                   };
                this.styleList = [];
       			this.http.post(options,cbok,cbno,cbnull);
       		},
       	/*查看详情*/
			go_to_detail(Style){
        /*this.$store.dispatch('set_cur_sku',Style);*/
				this.$router.push({
					path:'/fashion/styleDetails/'+Style.Id + '/0'
				});
			},
		/*搜索列表*/
			get_search(page){
				this.searchs.PageIndex = page;
				this.isscroll = false;
                this.getStyleList();
				this.subMenu = false;
			},
		/*取消搜索条件*/
			cancel_search(){
				for(var _key in this.searchs.show){
					if(this.searchs.show[_key] instanceof Array){
						this.searchs.show[_key] = []
					}else{
						this.searchs.show[_key] = '';
					}
				};
				
				/*for(var _key in this.Hover){
					this.Hover[_key] = [];
				}*/
				
				//this.cateHover = [];
				this.subMenu = false;
				this.get_search(1);
			},
		/*滚动加载*/
			scrollLoading(evt){
				var scroller = evt.target;
				var scrHeight = scroller.scrollHeight;
				var offHeight = scroller.offsetHeight;
				var scrTop = scroller.scrollTop;
				if(scrHeight - (offHeight+scrTop) <= 100){
					if(this.isLoad == false){
						this.isLoad = true;
						if(this.searchs.PageIndex<this.styleData.page_count){
							this.searchs.PageIndex += 1;
							this.isscroll = true;
							this.getStyleList();
						}
					}
				}
			}
    },
    components:{
    	'v-footer':footer,
    	'v-shortcat':shortcat,
    	'v-nodata':nodata
    }
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
    .product-list-no{
      position:absolute;
      top:0;
      left:200px;
      bottom:0;
      right:0;
    }
    .subMenu-header{
      text-align:right;
      line-height:3em;
      position:absolute;
      top:0;
      left:0;
      right:0;
      box-shadow:0 0 5px rgba(0,0,0,0.1);
      span{
        color:#20a0ff;
        float:right;
        font-size:1em;
        padding: 0 1em;
      }
    }
   
    .btn-group{
    	position: absolute;
    	bottom: 5px;
    	left: 0%;
    	width: 100%;
    	height: 30px;
    	line-height: 30px;
    	button{
    		width:80px;
    		height: 100%;
    		border-radius: 15px;
	    	background-color: #C1996A;
	    	color: #fff;
	    	text-align: center;
	    	line-height:30px;
	    	border: none;
	    	margin: 0 8px;
	    	outline: none;
    	}
      
    }
    .flex-box{
        display: flex;
    }
    .flex-box .slider-box{
        position: relative;
        z-index: 2;
        flex: 0 0 200px;
        width: 200px;
        height: 100%;
        border-right: 1px solid #e5e5e5;
        vertical-align: top;
        box-sizing: border-box;
        padding-top: 46px;
        box-sizing: border-box;
        .slider-inner{
        	position: absolute;
        	top: 46px;
        	padding-bottom: 50px;
        	bottom:0px ;
        	left: 0;
        	right: 0;
        	overflow-x: hidden;

        	overflow-y: auto;
        }
    }
    /*款式列表*/
    .product-list{
        position: relative;
        z-index: 1;
        flex: 1;
        vertical-align: top;
        margin: 1.25em 1.4em 1em;
        overflow-y: scroll;
       /*top: 50%;*/
        transition: all .5s ease-in;
        z-index: 1;
        
    }
    .product-list .list{
        width: 178px;
        height: 260px;
        margin: 0 0.6em 1.25em;
        background: #FAFAFA;
        border: 1px solid #FAFAFA;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        transition: all .5s linear;
        .pic{
            width:178px;
            height: 168px;
            text-align: center;
            line-height: 178px;
            margin-bottom: 10px;
            overflow:hidden;
            img{
                max-width: 178px;
                max-height: 178px;
                vertical-align: middle;
            }
        }

    }
    .product-list .list:nth-child(even){
        /*margin-bottom: -3rem;*/
    }

    .product-list .name{
        font-size: 1em;
        white-space: nowrap;
    	padding:5px 10px;
    	box-sizing: border-box;
    	overflow: hidden;
    	text-overflow: ellipsis;
        
    }
    .product-list .name,#product-list .price{
    	
        font-size: 1em;

    }
    .product-list .price{
        color: #C1996A;
        font-size:1.1em;
    }

    /*侧边栏*/
    .slider-list{
        position: relative;
        overflow-y: scroll;
        width: 200px;
        height: 100%;
    }
    .slider-list li{
    	margin-bottom: 1px;
    }
    .slider-ul{
        list-style: none;
        position: static;
        bottom: 100px;
        width: 100%;
        left: 0;
        overflow-y: scroll;
        height: 100%;

    }
    .slider-ul>li{
        position: relative;
        font-size: 1.2em;
        height: 50px;
        line-height: 50px;
        padding-left: 1em;
        margin-bottom: 1px;
         white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          padding-right:45px;
        i{
          font-size:8px;
          font-style:normal;
          margin-right:5px;
        
        }
    }
    #fistList>li:after{
        content: '';
        position: absolute;
        top:19px;
        right: 20px;
        width: 10px;
        height: 10px;
        border-left:1px solid #333333;
        border-top:1px solid #333333;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        margin-right: 10px;
    }
    #fistList>li.hover:after{
        border-left:1px solid #fff;
        border-top:1px solid #fff;
    }
    .slider-ul[value]>li{
    	font-size: 1em;
    }
    .slider-ul>li.hover{
        margin-right: -1px;
        background: #C1996A;
        color: #fff;
    }

    .search{
        position: absolute;
        align-items: center;
        margin: 8px;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    .search .icon-search{
        position: absolute;
        top: 6px;
        left: 6px;
        width: 12px;
        height: 18px;
        @include bg-image('../../common/images/style/iconsearch');
    }
    .search .inp-search{
        width: 180px;
        height: 30px;
        border-radius: 4px;
        padding-left: 26px;
        font-size: 14px;
        box-sizing: border-box;
    }
    .search input.inp-search::-webkit-input-placeholder {
        color: #333;
        vertical-align: middle;
        font-size: 14px;
    }
    .slider-box .slider-map{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 200px;
        background: #fff;
        overflow: hidden;
        padding: 1em 0 ;
        box-sizing: border-box;
        z-index: 6;
        /*margin-top: -1px;*/
    }
    .slider-box .slider-map li{
     	line-height: 50px;
     	text-indent: 16px;
     	margin-bottom: 1px;
    }
    .slider-box .slider-map ul{
    	position: absolute;
    	top: 3em;
    	bottom:0px;
    	left: 0;
    	right: 0;
    	overflow-y: auto;
    }
    .slider-box .slider-map li.hover{
    	background-color: #C1996A;
    	color: #fff;
    }
    #fistList>li:hover + .slider-map{
        display: block;
    }
    .mask{
        position: fixed;
        left: 200px;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 5;
    }
    @media screen and (max-width:768px){
        .product-list{
            margin: 1.25em 0 1em;
            .list{
                margin: 0 4px 1.25em;
            }
        }
    }
</style>
