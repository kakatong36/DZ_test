<template>
    <div class="content details">
        <!--正文box-->
        <div class="details-property bg-white list-box">
            <div class="list bg-grey" style="padding-left:0;min-width: 512px">
                <div class="pic-big" style="position: relative;">
                	<img :src="http.imgUrl+curImg" height="472" width="472" v-if="curImg">
                    <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
                </div>
                <div class="list-box" style="width: 100%; padding: 0 20px; box-sizing: border-box;">
                    <div class="list plans-imgs" style="width: 100%; margin-left: 0;">
                        <ul class="table-box" style="width:auto;">
                            <li class="cell" v-for='img in Style.StyleImgList' @click='img_viewer(img.ImageCode)'>
                            	<img :src="http.imgUrl+img.ImageCode" v-if="img.ImageCode">
                                <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
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
                        <li class="list" v-for='attr in Sku.SkuAttrList'>{{attr.StyleAttrName}}: {{attr.StyleAttrValueName}}</li>
                        <li class="list" v-for='attr in Style.StyleAttrList'>{{attr.StyleAttrName}}: {{attr.StyleAttrValueName}}</li>
                    </ul>
                    <div class="goods-img" v-if='Style.CopyWriting!=null'>
                        <ul class="table-box">
                            <li v-for='img in Style.CopyWriting' style="width:100%;padding:10px;box-sizing:border-box;">
                                <img :src="http.imgUrl+img" style='width:100%;'>                             
                            </li>
                        </ul>
                    </div>
                    <div class="goods-img"  v-if='Style.CopyWriting == null'>
                        <ul class="table-box">
                            <li v-for='img in Style.StyleImgList' style="width:100%;padding:10px;box-sizing:border-box;">
                                <img :class="{active:curImg.ImgUrl == img.ImageCode}" :src="http.imgUrl+img.ImageCode" style='width:100%;' v-if="img.ImageCode">   
                                <img src="../../assets/ps_17101611163885870100.jpg" v-else/>                            
                            </li>                         
                        </ul>
                    </div>


                </div>
            </div>
        </div>
        <!--正文box end-->
        <div class="player-wrapper" v-show='isplay'>
        	<span class="close" @click="close_video">&times;</span>
        	<video :src="play_url" autoplay="autoplay" controls="controls"></video>
        </div>
        <v-footer :isbtn='isbtn' :textBtn='textBtn' @nextaction='go_to_next'></v-footer>
    </div>
</template>

<script>
import footer from 'components/footer/footer'
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
        suit:{},
        Sku:{},
        play_url:'',
        isplay:false,
        isbtn:true,
        textBtn:'选择此款',
        innerSize:'',
        imgUrl:this.$store.state.header.imgUrl,
        imgModel:this.$store.state.header.imgModel ,
        // curImg: {ImgUrl:styleImg},
        curImg:'',

        Video: {},
        Img3d: {}
      }
    },
    created(){
    	this.$store.state.footer.isStep = false;
    	this.suitId = this.$route.params.id;
        this.get_Suit_Detail();
        console.log(this.curImg)
    },
    methods:{
    	/*获取款式详情*/
	    	get_Suit_Detail(){
	    		var that = this;
	    		
	    		this.loading();
	    		
	    		var options = {
	    			url:'/purchase_Api_FashionStyle_Get',
	    			params:{
	    				styleId:that.suitId
	    			}
	    		};
	    		
	    		var cbok = (res) =>{
                    that.suit = that.Style = res.data.data;

                    if(that.Style.CopyWriting != null){
                        that.Style.CopyWriting = that.Style.CopyWriting.split(',');
                    }

                    that.Sku = that.Style.SkuList[0];
                    let arrImg = [],
                        video = {},
                        img3d = {};
                    if(that.Style.StyleImgList.length){
                        that.Style.StyleImgList.map(item => {
                            if(item.ImageType === 1){
                                if(item.IsMain){
                                    that.curImg = item.ImageCode
                                    arrImg.unshift(item);
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

                    /*设置总价*/
                    that.$store.state.footer.totalPrice = that.Sku.TotalPrice;
                    //设置当前选中的图片
                    
	    		    if(that.Style.imgs && that.Style.imgs.length>0){
	    		    	that.curImg = that.Style.imgs[0];
	    		    }
	    		    
	    		  /*  this.Style.imgs.map(function(item,index,array){
	    		    	if(item.ImgUrl.indexOf(".mp4")>=0){
	    		    		item.ImgClass = 2;
	    		    	}
	    		    })*/
	    		    
	    		    
	    		    this.closeLoad();
	    			
	    		};
	    		
	    		this.http.get(options,cbok);
	    	},
	    /*图片预览*/
	   		img_viewer(img){	   			
	   			if(img.ImgClass == 1){
	   				this.curImg = img;
	   			}else{
	   				this.curImg = img;
	   			}
	   		},
	   	/*视频暂停*/
	   		close_video(){
	   			this.isplay = false;
	   			document.querySelector("video").pause();
	   		},
	   	/*下一步*/
	   		go_to_next(){
	   			var that = this;	   			
	   			that.$router.push({
	   				path:'/honey/details/'+that.suitId
	   			});
	   		}
    },
    components:{
    	'v-footer':footer,
    	'v-imgview':imgview
    }
  }
</script>

<style lang="scss">
    ::-webkit-scrollbar{
        display: none;
    }
    .plans-imgs{
        display: inline-block;
        width: 310px;
        height: 110px;
        text-align: center;
        background: #f5f5f5;
        overflow-y: hidden;
        overflow-x: scroll;
        vertical-align: top;
        margin-left: 20px;
    }
    .plans-imgs::-webkit-scrollbar{
        display: none;
    }
    .plans-imgs .cell:last-child{
        padding-right: 0;
    }
    .plans-imgs .cell{
        width: 80px;
        height: 80px;
        padding-right: 20px;
        position:relative;
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
    .plans-imgs .cell img.active{
    	border-color: #C1996A;
    }
    .plans-imgs .cell img{
        width: 90px;
        height: 90px;
        background:#fff;
        border: 1px solid transparent;
    }

    .details-property{
        display: flex;
        width: 100%;
        margin-bottom: 20px;
        min-height: 100%;
    }
    .details-property>.list{
        width: 50%;
        vertical-align: top;
        padding-left: 40px;
        box-sizing: border-box;
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
        margin: 20px 20px 0px 0;
    }
    .details-attr .list{
        width: 50%;
        font-size: 0.8rem;
        font-weight: 500;
        margin-bottom: 1.8rem;
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
