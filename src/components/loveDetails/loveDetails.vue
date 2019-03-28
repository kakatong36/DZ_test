<template>
    <div class="content bg-grey loveDetail">
    	<div class="lover-content-inner scroll">
	        <div class="love-wrapper bg-white list-box">
	            <div class="love-img list">
	                <div class="img-big effect">
	                	<!-- <v-imgview :length='StyleList.StyleImgList' v-show='imgsign.curImg.ImgClass==2'></v-imgview> -->
	                    <img :src="http.imgUrl+imgsign.curImg.ImageCode" v-if="imgsign.curImg"/>
                        <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
	                </div>
	                <div class="img-small">
	                    <ul class="list-box">
	                        <li class="list loveList" v-for='(img,index) in StyleList.StyleImgList' @click='set_curImg(img)' :class='{active:img == imgsign.curImg}'  :key="index">
	                        	<img :src="http.imgUrl+img.ImageCode" v-if="img.ImageCode"/> 
                                <img src="../../assets/ps_17101611163885870100.jpg" v-else/>  
	                        	<!-- <img src="../../common/images/loveDetails/video.png" v-show='img.ImgClass==2'/>      
	                        	<span class="img-3d" v-if='img.ImgClass==2'>3D</span> -->	                  
	                        </li>      
	                       
	                    </ul>
	                </div>
	            </div>
	            <div class="love-attr list">
	                <h2 class="goods-tit">{{StyleList.StyleName}}</h2>
	                <ul class="list-box">
	                    <li class="list" v-for='attr in StyleList.StyleAttrList' :key="attr.StyleAttrId">{{attr.StyleAttrName}} : {{attr.StyleAttrValueName}}</li>                   
	                </ul>
	            </div>
	        </div>
            <!-- <div class="desc-img">
                <img src="../../common/images/personal/1481942062883.png"/>
            </div> -->
            <div class="goods-img"  v-if='StyleList.CopyWriting != null'>
                <ul>
                    <li v-for="img in StyleList.CopyWriting">
                        <img :src="http.imgUrl+img" style='width:100%;'>                               
                    </li>                         
                </ul>
            </div>
            <div class="goods-img"  v-if='StyleList.CopyWriting == null'>
                <ul>
                    <li v-for="img in StyleList.StyleImgList">
                        <img :src="http.imgUrl+img.ImageCode" style='width:100%;' v-if="img.ImageCode">                               
                    </li>                         
                </ul>
            </div>
        </div>
        <v-footer :isbtn='isbtn' :textBtn='textBtn' @nextaction='go_messgae'></v-footer>
        <transition name='slide-down'>
	        <modal-dialog :show="show">
                <div class="dialog-header" slot="header">
	                <h1 class="dialog-title">选择</h1>
	            </div>
                <div class="dialog-body" slot="body">
                    <ul class="individuality_ul">
                        <li v-if="bSkuId!='0'"><router-link tag="div" :to="'/individuality/message/'+suitId+'/'+bSkuId+'/0/'+styleName+'/'+MainImg">男款戒指</router-link></li>
                        <li v-if="gSkuId!='0'"><router-link tag="div" :to="'/individuality/message/'+suitId+'/0'+'/'+gSkuId+'/'+styleName+'/'+MainImg">女款戒指</router-link></li>
                        <li v-if="bSkuId!='0' && gSkuId!='0'"><router-link tag="div" :to="'/individuality/message/'+suitId+'/'+bSkuId+'/'+gSkuId+'/'+styleName+'/'+MainImg">男女对戒</router-link></li>
                    </ul>
                </div>
                <div class="dialog-footer table-box" slot="footer">
	                <span class="cell" @click="$store.dispatch('close_dialog');">返回</span>
	            </div>
	        </modal-dialog>
        </transition>
    </div>
</template>

<script>
    import footer from 'components/footer/footer'
    import imgview from 'components/imgViewer/imgViewer'
    import Dialog from 'components/dialog/dialog'

    export default {
        data () {
            return {
                main_bar: 0,
                recommendbar:0,
                isbtn:true,
                isShow: this.$store.state.header.isShow = true,
                title: this.$store.state.header.title = '款式详情',
                isShowF: this.$store.state.footer.isShow = true,
                textBtn:'选择此款',
                isPrice: this.$store.state.footer.isPrice = true,
                isStep:this.$store.state.footer.isStep = false,
                suitId:'',
                StyleList:[],
                suit:{},
                imgsign:{},
                show: true,
                bSkuId: '0',
                gSkuId: '0',
                styleName: '',
                MainImg: '',

                Video: {},
                Img3d: {}
            }
        },
        created(){
            this.suitId = this.$route.params.id;
            this.condition = this.$route.params.condition
        },
        mounted(){
            /* let data = {
                "Id":"7b1feed4-61b1-4b3a-9761-b7464727fe3c",
                "StyleName":"个性定制钻戒",
                "TotalWeight":12,
                "IsLettering":true,
                "CopyWriting":"1111111111111",
                "StyleImgList":[
                    require('../../common/images/personal/pic6@3x.png'),
                    require('../../common/images/personal/pic5@3x.png'),
                    require('../../common/images/personal/pic4@3x.png')
                ],
                "StyleAttrList":[
                    {
                        "StyleAttrId":"8327081a-26ce-4078-80fc-d96c5cd4586d",
                        "StyleAttrName":"成色",
                        "StyleAttrValueName":"18K红"
                    }
                ],
                "SkuList":[
                    {
                        "SkuId":"187a6cc5-0937-4e52-8a18-d538a339207b",
                        "SkuName":"18K红钻石戒指-女",
                        "SalePrice":4580,
                        "GoldWeight":10
                    },
                    {
                        "SkuId":"083f0bb0-f1dc-4d95-9134-cd6494bfd27f",
                        "SkuName":"18K红钻石戒指-男",
                        "SalePrice":4890,
                        "GoldWeight":10
                    }
                ]
            }
            this.StyleList = data
            this.set_img();
            this.$store.state.footer.totalPrice = 1000; */
            this.$store.dispatch('close_dialog')
            if(this.condition != '0'){
                this.get_suit_detail();
            }else{
                this.$router.go(-1)
            }
        },
        methods:{
            /*拉取套装列表*/
            get_suit_detail(){
                var that = this;
                this.loading();
                var options = {
                    url:'/purchase_Api_PersonalityStyle_GetTrueLoveInfo',
                    params:{
                        Id: this.suitId,
                        Condition: this.condition
                    }
                };
                var cbok = (res) =>{
                    that.StyleList = res.data.data;

                    if(that.StyleList.CopyWriting != null){
                        that.StyleList.CopyWriting = that.StyleList.CopyWriting.split(',');
                    }

                    let arrImg = [],
                        video = {},
                        img3d = {};
                    if(that.StyleList.StyleImgList.length){
                        that.StyleList.StyleImgList.map(item => {
                            if(item.ImageType === 1){
                                if(item.IsMain){
                                    arrImg.unshift(item);
                                    this.MainImg = item.ImageCode;
                                }else{
                                    arrImg.push(item)
                                }
                            }else if(item.ImageType === 2){
                                that.Video = item;
                            }else if(item.ImageType === 3){
                                that.Img3d = item;
                            }
                        });
                        that.StyleList.StyleImgList = arrImg;
                    }else{
                        that.StyleList.StyleImgList = [];
                    }

                    let price = 0
                    this.styleName = this.StyleList.StyleName
                    if(this.StyleList.SkuList && this.StyleList.SkuList.length){
                        this.StyleList.SkuList.forEach(item => {
                            if(item.SuitPeople == '女'){
                                that.gSkuId = item.SkuId
                            }else if(item.SuitPeople == '男'){
                                that.bSkuId = item.SkuId
                            }
                            price += item.SalePrice
                        })
                    }
                    that.$store.state.footer.totalPrice = price;
                    that.set_img();
                    this.closeLoad();
                };
                this.http.get(options,cbok);
            },
            /*套装轮番图片*/
            set_img(){
                if(this.StyleList.StyleImgList && this.StyleList.StyleImgList.length){
                    this.imgsign = {
                        curImg: this.StyleList.StyleImgList[0],
                        imgs: this.StyleList.StyleImgList
                    }
                }
            },
            /*设置当前图片*/
            set_curImg(img){		
                this.imgsign.curImg = img;
            },
            /*下一步*/
            go_messgae(){
                this.$store.dispatch('open_dialog');
            }   
        },
        components:{
            'v-footer':footer,
            'v-imgview':imgview,
            'modal-dialog':Dialog,
        }
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';

.loveDetail{
    .dialog .close.rotate{
        display: none;
    }   
    .desc-img{
        img{
            width: 100%;
        }
    }
    .lover-content-inner{
    	position: absolute;
    	top: 57px;
    	bottom: 60px;
    	left: 0; 
        right: 0;
    }
    .loveList.active{
    	border-color: #C1996A;
    }
    .love-wrapper{
        display: flex;
        padding: 15px;
        margin-bottom: 20px;
        .love-img{
            flex: 0 0 294px;
            position: relative;
            z-index: 1;
            width: 280px;
            margin-right: 14px;
            vertical-align: top;
            .img-big{
                position: relative;
                height: 280px;
                border:1px solid #f5f5f5;
                box-sizing: content-box;
                background: #fff;
                margin-bottom: 30px;
                line-height: 280px;
                img{
                	vertical-align: middle;
                    width: 100%;
                }

            }
        }
        .love-attr{
            flex: 1;
            margin-top: 14px;
            .goods-tit{
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 10px;
            }
            .list-box{
                white-space: normal;
                .list{
                    min-width: 220px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                }
            }
        }
    }
    .love-wrapper:last-child{
    	margin-bottom: 5px;
    }

    .img-small{
        width: 100%;
        overflow: hidden;
    }
    .img-small ul{
        overflow-x: scroll;
        width: 100%;
        white-space: nowrap;
        .list{
            width: 54px;
            height: 54px;
            border: 1px solid #f5f5f5;
            box-sizing: border-box;
            margin-right: 12px;
            background: #fff;
            line-height: 54px;
            overflow:hidden;
            position:relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            &.video{
                width: 82px;
                height: 54px;
                border: none;
                background: rgba(0,0,0,.3);
                z-index: 100;
                img{
                    /*width: 100%;*/
                    max-height: 54px;
                    vertical-align: middle;
                }
             }

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
        .list.active{
        	border-color:#C1996A ;
        }
    }
    .progress {
        position: absolute;
        left: 20px;
        bottom: 20px;
        width: 240px;
        height: 20px;
        border-radius: 10px;
        overflow: hidden;
        progress{
            width: 100%;
            height: 20px;
            background-color: #DFB077;
            position:absolute;
            top:0;
            left:0;  
            &::-webkit-progress-bar{
                 background: #F7F7F7;
             }
            &::-webkit-progress-value{
                 background: #DFB077;
                 border-radius: 10px;
             }
        }
        .range{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 20px;
            z-index: 5;
            opacity:0; 
	        &::-webkit-slider-thumb{
	             opacity: 0;
	         }
        }
    }
    .individuality_ul{
        padding: 30px;
        border-bottom: 1px solid #e5e5e5;
        li{
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            margin-top: 20px;
            &:first-child{
                margin-top: 0;
            }
        }
    }
    .goods-img img{
        width: 100%;
        // margin-bottom: 14px;
    }
}
    

</style>
