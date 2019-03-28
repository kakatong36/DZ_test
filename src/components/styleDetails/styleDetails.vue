<template>
    <div class="content details">
        <!--正文box-->
        <div class="details-property bg-white list-box">
            <div class="list bg-grey" style="padding-left:0;min-width: 512px">
                <div class="pic-big" style="position: relative;">
                	<img :src="http.imgUrl+curImg.ImgUrl" v-if="curImg.ImgUrl">
                    <img src="../../assets/ps_17101611163885870100.jpg" height="472" width="472"  v-else/>
                    <!-- <video v-if="videoIsShow" type="video/mp4" class="video_play" webkit-playsinline autoplay="true" controls="true" width="472" height="472"> -->
                        <!-- <source src="http://192.168.101.23/a.php" type="video/mp4"> -->
                        <!-- 您的浏览器不支持 video 标签。 -->
                    <!-- </video> -->
                    <div class="videoIcon" @click="videoIsShow = true" v-if="Video.ImageCode">视频</div>
                </div>
                <div class="list-box" style="width:100%; padding:0 20px;box-sizing:border-box;">
                    <div class="list plans-img">
                        <ul class="table-box" style="width: auto;">
                            <li class="cell" :class='{active:curImg.ImgUrl == img.ImageCode}' v-for='img in Style.StyleImgList' @click='img_viewer(img)'>
                                <div class="img-wrap" v-if="img.ImageCode"><img :src="http.imgUrl+img.ImageCode" v-if="img.ImageCode"></div>
                            </li>                         
                        </ul>
                    </div>
                </div>
            </div>
            <div class="list details-wrapper">
                <div class="details-attr">
                    <h1 class="goods-name">{{Style.StyleName}}</h1>
                    <div class="goods-price">¥{{Sku.TotalPrice}}</div>
                    <p class="goods-text">{{Sku.SkuName}}</p>
                    <ul class="list-box">
                        <li class="list sku" v-for='item in skuSelectList'>{{item.name}}: 
                            <span @click="selectSku(item, item.name, value.name)" class="value" :class="{active:value.active}" v-for='value in item.values'>{{value.name}}</span>
                        </li>
                    </ul>
                    <ul>
                    	<li class="list" v-for='attr in Style.StyleAttrList'>{{attr.StyleAttrName}}: {{attr.StyleAttrValueName}}</li>
                    </ul>
                    <h2>款式详情</h2>
                    <div class="goods-img">
                        <ul class="table-box">
                            <li v-for='(img, index) in picList' style="width:100%;padding:10px;box-sizing:border-box;">
                                <img :src="http.imgUrl+img" @click="showPicViewer(picList, index)" style='max-width:100%;'>                             
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <v-videoPlayer v-if="videoIsShow" @videoClose="videoIsShow=false" :options="videoOptions"></v-videoPlayer>
        <v-picViewer v-if="picViewerIsShow" @picViewerClose="picViewerIsShow=false" :options="picViewerOptions"></v-picViewer>
        <v-footer :isbtn='isbtn' :textBtn='textBtn' @nextaction='go_to_next'></v-footer>
        <v-shortcat></v-shortcat>
    </div>
</template>

<script>
import footer from 'components/footer/footer'
import shortcat from 'components/home/shortcat'
import imgview from 'components/imgViewer/imgViewer'

import styleImg from '../../assets/ps_17101611163885870100.jpg'
  export default {
    data () {
      return {
        header:{
            isShow: this.$store.state.header.isShow = true,
            title: this.$store.state.header.title = '款式详情',
        },
        footer:{
            isShow: this.$store.state.footer.isShow = true,
            text: this.$store.state.footer.text = '款式详情',
        },
        styleId:'',
        Style:{},
        Sku:{},

        isbtn:true,
        innerSize:'',
        imgUrl:this.$store.state.header.imgUrl,
        imgModel:this.$store.state.header.imgModel,

        curImg: {ImgUrl:''},

        Video: {},
        Img3d: {},
        videoIsShow: false,
        videoOptions: {
			src: "",
			title : ""
		},

        picViewerIsShow: false,
        picViewerOptions: {
            list: [],
            activeIndex: 0
        },

        picList: [],
        skuSelectList: []
      }
    },
    created(){
        // window.vm = this;
    	this.styleId = this.$route.params.id;
    	this.$store.state.footer.isStep = true;
    	this.$store.state.footer.isPrice = false;
    	if(this.$store.state.dialog.cur_stone.Id){
    		this.textBtn = '提交';
    	}else{
    		this.textBtn = '选石';
    	}
        this.get_Style_Detail();

    },
    methods:{
        showPicViewer (list, index) {
            this.picViewerIsShow = true;
            this.picViewerOptions.list = list;
            this.picViewerOptions.activeIndex = index;
        },
        selectSku (attr, key, value) {

            attr.values.forEach(val => {
                if(val.name == value){
                    val.active = true;
                }else{
                    val.active = false;
                }
            });
            let sku = [];
            this.Sku.SkuAttrList.forEach(item => {
                let obj = {
                    StyleAttrName: item.StyleAttrName,
                    StyleAttrValueName: item.StyleAttrValueName
                }
                if(item.StyleAttrName == key){
                    obj.StyleAttrValueName = value;
                }
                sku.push(obj);
            });

            this.Style.SkuList.some(item => {
                let i = 0;
                item.SkuAttrList.some(item2 => {
                    sku.some(item3 => {
                        let flag = false;
                        if(item2.StyleAttrName == item3.StyleAttrName && item2.StyleAttrValueName == item3.StyleAttrValueName){
                            i++;
                            flag = true;
                        }
                        return flag;
                    });
                });
                if(i == item.SkuAttrList.length){
                    this.Sku = item;
                }
            })

        },

    	/*获取SKU详情*/
	    	get_Sku_Detail(){
	    		var that = this;
	    		
	    		this.loading();
	    		
	    		var options = {
	    			url:'/style_api_FashionStyleCenterSKU_Get',
	    			params:{
	    				Id:that.styleId
	    			}
	    		};
	    		
	    		var cbok = function(res){
	    			that.Sku = res.data.data;
	    			that.get_Style_Detail();
	    		};
	    		
	    		this.http.get(options,cbok);
	    	},
	    /*获取款式详情*/
	   		get_Style_Detail(){
	   			var that = this;
	   			var options = {
	   				url:'/purchase_Api_FashionStyle_Get',
	   				params:{
                           //Id:that.Sku.StyleId
                        styleId:that.styleId
	   				}
	   			};
	   			
	   			var cbok = function(res){
                    that.closeLoad();
                    that.Style = res.data.data;

                    that.Style.SkuList.forEach((item, index) => {
                        item.SkuAttrList.forEach(item2 => {
                            let flag = false;
                            that.skuSelectList.some(item3 => {
                                if(item3.name == item2.StyleAttrName){
                                    flag = true;
                                    item3.values.add(item2.StyleAttrValueName)
                                }
                                return flag;
                            });
                            if(!flag){
                                that.skuSelectList.push({
                                    name: item2.StyleAttrName,
                                    values: new Set([item2.StyleAttrValueName])
                                })
                            }
                        });
                    });

                    that.Sku = that.Style.SkuList[0];

                    that.skuSelectList.forEach(item => {
                        let values = Array.from(item.values),
                            newValues = [];
                        values.forEach(value => {
                            let obj = {
                                    name: value,
                                    active: false
                                },
                                flag = false;
                            that.Sku.SkuAttrList.some(item2 =>{
                                if(item.name == item2.StyleAttrName && value == item2.StyleAttrValueName){
                                    obj.active = true;
                                    flag = true;
                                }
                                return flag;
                            });
                            newValues.push(obj);
                        });
                        item.values = newValues;
                    });

                    let arrImg = [],
                        video = {},
                        img3d = {};
                    if(that.Style.StyleImgList.length){
                        that.Style.StyleImgList.map(item => {
                            if(item.ImageType === 1){
                                if(item.IsMain){
                                    arrImg.unshift(item);
                                    that.curImg.ImgUrl = item.ImageCode
                                }else{
                                    arrImg.push(item)
                                }
                            }else if(item.ImageType === 2){
                                that.Video = item;
                            }else if(item.ImageType === 3){
                                that.Img3d = item;
                            }
                        });
                        that.Style.StyleImgList = arrImg;
                    }else{
                        that.Style.StyleImgList = [];
                    }

                    if(that.Video.ImageCode){
                        that.videoOptions = {
                            src: that.http.imgUrl+that.Video.ImageCode
                            // src:'http://192.168.101.23/a.php'
                        }
                    }

                    if(that.Style.CopyWriting != null){
                        that.picList = that.Style.CopyWriting.split(',');
                    }else{
                        that.Style.StyleImgList.forEach(img => {
                            that.picList.push(img.ImageCode)
                        });
                    }
	   			};
	   			
	   			this.http.get(options,cbok);
	   			
	   		},
	    /*图片预览*/
	   		img_viewer(img){	   			
	   			this.curImg.ImgUrl = img.ImageCode;
	   		},

	   	/*下一步*/
	   		go_to_next(){
                let that = this,
                   obj = {
                        Id: this.Style.Id, //为兼容之前的代码
                        StyleId: this.Style.Id,
                        ProductPrice: this.Sku.TotalPrice,
                        ProductName: this.Sku.SkuName,
                        SkuId: this.Sku.SkuId,
                        Quantity: 1,
                        Weight: this.Style.TotalWeight,
                        SkuAttrList: this.Sku.SkuAttrList //选石使用
                   };
                this.$store.dispatch('set_cur_style',obj);
                
                /*如果已选配石直接添加购物车*/
                if(this.$store.state.dialog.cur_stone.Id){
                	this.cart_add();
                	return;
                };

	   			that.$router.push({
                    name:'stone',
                    params:{
                        id:that.Sku.RabbetSize,
                        shape:0,
                        color:0,
                        cleanliness:0,
                        MainImg:that.curImg.ImgUrl
                    }
                    //    path:'/fashion/stone/'+that.Sku.RabbetSize+'/0/0/0/'
                    //    '/fashion/stone/:id/:shape/:color/:cleanliness'
	   			});
	   		},
	   	/*加入购物车*/
	   		cart_add(){
	   			var that = this;
	    	    this.$store.dispatch('set_select_product');
	    	   
	    	    var params = {list:[]};
	    	    this.$store.state.dialog.select_product.map(function(item,index,array){
                    let data = {
                        StyleId: item.Style.Id,
                        ProductName: item.Style.ProductName,
                        ProductPrice: item.Style.ProductPrice,
                        Quantity: item.Style.Quantity,
                        SkuId: item.Style.SkuId,
                        Weight: item.Style.Weight,
                        Stones: [{
                            StoneId: item.Stone.Id,
                            Quantity: 1
                        }]
                    }
	    	    	params.list.push(data);
	    	    });
	
	            //清楚缓存的用以筛选款式的裸石形状和重量区间
	            var c_params = {
	                stoneIncut:'',
	                stoneWeightRange:''
	            };
	            this.$store.dispatch('set_stone_params',c_params);
	
	    	    var options = {
	    	    	url:'/order_Api_CustomizeCart_CreateCustomizeCart',
	    	    	params:params
	    	    };
	    	    var cbok = function(res){
	    	    	that.$store.dispatch('clear_cache');
	                that.$store.dispatch('set_select_product');
	             
	    	    	that.$router.push({
		    			path:'/fashion/fashionStatements'
		    		}); 
	    	    };
	    	    var cbno = function(res){
	
	    	    	that.bombox.tomast({
	    				msg:res.data.message,
	    				type:'warning'
	    			});
	    	    }
	    	   this.http.post(options,cbok,cbno);
	   		}
    },
    components:{
    	'v-footer':footer,
    	'v-shortcat':shortcat,
    	'v-imgview':imgview
    }
  }
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';

::-webkit-scrollbar{
	display: none;
}

.videoIcon{
    position: absolute;
    right: 0;
    bottom: 0;
    padding: .5em;
    font-size: 2em;
}
.video_play{
    z-index: 999;
}
    .plans-img{
       // display: inline-block;
       width:100%;
        height: 110px;
        text-align: center;
        background: #f5f5f5;
        overflow-y: hidden;
        overflow-x: scroll;
        vertical-align: top;
        
       
    }
    .plans-img::-webkit-scrollbar{
        display: none;
    }
    .plans-img .cell:last-child{
        padding-right: 0;
    }
    .plans-img .cell{
        width: 80px;
        height: 80px;
        padding-right: 20px;
        position: relative;
         span.img-3d{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    background: rgba(187,133,69,.6);
                    color: #fff;
                    text-align: center;
                }
       
    }

    .plans-img .cell{
        .img-wrap{
            position: relative;
            width: 80px;
            height: 80px;
            border: 1px solid transparent;
            overflow: hidden;
        }
    }
    .plans-img .cell.active{
        .img-wrap{
            border-color: #D8B387;
        }
    }
    .plans-img .cell img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        max-width: 80px;
        max-height: 80px;
    }


    .details-property{
        display: flex;
        width: 100%;
        position: absolute;
        top: 57px;
        bottom: 60px;
    }
    .details-property>.list{
        width: 50%;
        vertical-align: top;
        padding-left: 40px;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .details-wrapper{
        position: relative;
        overflow-y: scroll;
    }
    /*大图*/
    .pic-big{
        margin: 20px;
        height: 492px !important;
        background: #fff;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pic-big img{
        max-width: 472px;
        max-height: 472px;
    }
    .details-attr{
        position: absolute;
        margin: 20px 20px 20px 0;
        h2{
        	font-weight: 600;
        	position: relative;
        	line-height: 18px;
        }
        h2:before{
        		content: "";
        		width: 8px;
        		height: 16px;
        		display: inline-block;
        		background-image: linear-gradient(-134deg, #9DBDFF 0%, #146DE5 100%);
        		vertical-align: -3px;
				margin-right: 8px;
        	}
    }
    .details-attr .list{
        width: 50%;
        font-size: 0.8rem;
        font-weight: 500;
        margin-bottom: 1.8rem;
        &.sku{
            margin-bottom: 1rem;
            width: 100%;
            .value{
                display: inline-block;
                margin: 5px;
                padding: 5px;
                border: 1px solid #9DBDFF;
                &.active{
                    border-color: #C1996A;
                }
            }
        }
    }
    .goods-name{
        font-size: 20px;
        margin-bottom: 20px;
    }
    .goods-price{
        font-size: 20px;
        color: #C1996A;
        margin-bottom: 20px;
    }
    .goods-text{
        font-size: 16px;
        text-align: justify;
        color: #999;
        margin-bottom: 20px;
    }
    .goods-img img{
        width: 100%;
        margin-bottom: 14px;
    }
    .player-wrapper{
    	position: fixed;
    	top:50%;
    	left: 100px;
    	right: 100px;
    	z-index: 100;
    	padding: 50px 30px 10px;
    	background-color: #fff;
    	border-radius: 5px;
    	box-shadow: 0 0 5px rgba(0,0,0,0.1);
    	transform: translate3d(0,-50%,0);
    	video{
    		width: 100%;
    		border-radius: 5px;
    	}
    	.close{
    		position: absolute;
    		top: 0;
    		right: 0;
    		padding: 10px 15px;
    		font-size: 30px;
    	}
    }
    @media screen and (max-width:768px){
        .details-attr .list{
            width: 100%;
        }
    }
</style>
