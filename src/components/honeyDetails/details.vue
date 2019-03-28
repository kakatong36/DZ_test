<template>
    <div class="content">
    	
    		<div class="pic-center" >
    			<transition name='fade-left'>
	            	<img :src="http.imgUrl+suit" v-if="suit"/>
	            </transition>
	        </div>
    	
        
        <div class="pic-list">
            <h2 class="title">我们推荐给对方的款式</h2>
            <!--<ul class="list-box list-wrapper" v-if='recommentList.length>0'>-->
            	<transition-group class='list-box list-wrapper' tag='ul' name='slide-left'>
            		<li class="list ringLi" :key='item.Id' :class='{active:curRecStyle.Id == item.Id}' v-for='(item,index) in recommentList' @click='set_Recommend(item)'>
	                    <div class="list-img">
	                        <img :src="http.imgUrl+item.MainImg" v-if="item.MainImg"/>
                            <img src="../../assets/ps_17101611163885870100.jpg" v-else/>
	                    </div>
	                    <div class="name">{{item.StyleName}}</div>
	                    <div class="price">价格 : <span>{{item.Price}}元</span></div>
	                </li>
            	</transition-group>
                
           <!-- </ul>-->
        </div>
        <footer >
        	<div class="foot table-box">
        		<div class="cell" @click="go_custom">我要定制</div>
        		<div class="cell" @click='go_to_next'>提交</div>
        	</div>
        </footer>
    </div>
</template>

<script>
  import footer from 'components/footer/footer'

import styleImg from '../../assets/ps_17101611163885870100.jpg'

  export default {
    data () {
      return {
        header:{
          isShow: this.$store.state.header.isShow = true,
          title: this.$store.state.header.title = '款式详情',
        },
        textBtn:"提交",
        footer:{
          isShow: this.$store.state.footer.isShow = true,
          fStyle: this.$store.state.footer.fStyle = true,
          text: this.$store.state.footer.text = '款式详情',
        },
        suit:null,
        suitId:"",
        curImg:styleImg,
        recommentList:[],
        Style:{},
        imgUrl:this.$store.state.header.imgUrl,
        imgModel:this.$store.state.header.imgModel,
        curRecStyle:{},
        MainImg:""
      }
    },
   /*路由进入之前，判断是否设置选中状态*/
    beforeRouteLeave(to,from,next){
       if(to.name == 'honeyDetails'){
            var params = {
                sign:'honey',
                data:{
                    main:{},
                    recommend:{}
                }
            };
            this.$store.dispatch('set_suit_product',params);
       };
        next();
    },
    created(){
        this.suitId = this.$route.params.id;
    	this.get_data();
        if(this.$store.state.personal.honey.select_product.recommend && this.$store.state.personal.honey.select_product.recommend.Id){
            this.curRecStyle = this.$store.state.personal.honey.select_product.recommend
        }
    },
    
    methods:{
       
      /*拉取套装数据*/
	      get_data(){
	      	var that = this;
	      	
	      	this.loading();
	      	
            var options = {
                url:'/purchase_Api_FashionStyle_Get',
                params:{
                    styleId:that.suitId
                }
            };

            var cbok = (res) =>{
                that.Style = res.data.data;
                res.data.data.StyleImgList.forEach(item => {
                    if(item.IsMain){
                        this.suit = item.ImageCode;
                    }
                })
				this.closeLoad();
                //设置选择的套装
                that.$store.dispatch('set_suit',{sign:'honey',data:that.Style});
            };

            var cbno = (res) =>{
                that.bombox.tomast({
                    msg:res.data.message,
                    type:'warning'
                });
                
                this.closeLoad();
            };

            this.http.get(options,cbok,cbno);	

            this.http.get({
                url:'/purchase_Api_PersonalityStyle_GetManGuardSweetList',
                params:{
                    PageIndex: 1,
                    PageSize: 5
                }
            },res => {
                if(res.data.data && res.data.data.data_list.length>0){
                    that.recommentList = res.data.data.data_list;
                    that.recommentList.map(function(rec,index,array){
                        if(rec.isSelected == true){
                            that.set_Recommend(rec);
                        }
                    });

                }
            },err => {});
	      },
      /*选择推荐款*/
        set_Recommend(rec_style){
        	var lis = document.querySelectorAll(".ringLi");
        	if(lis[0].style.transitionDelay != '0s'){
        		lis.forEach(function(item){
	        		item.style.transitionDelay = "0s";
	        	});
        	}
        	
            if(this.curRecStyle.Id && this.curRecStyle.Id == rec_style.Id){
                this.curRecStyle = {};
                var params = {
                    sign:'honey',
                    data:{
                        main:this.Style,
                        recommend:this.curRecStyle
                    }
                };
                this.$store.dispatch('set_suit_product',params);
            }else{
                this.curRecStyle = rec_style;
            }
        },    
	  /*我要定制*/    
	      go_custom(){
            if(this.curRecStyle.Id){
                this.bombox.tomast({
                    msg:'若想定制，请取消推荐款',
                    type:'warning'
                });
                return;
            };

            var params = {
                sign:'honey',
                data:{
                    main:this.Style,
                    recommend:this.curRecStyle
                }
            };
            this.$store.dispatch('set_suit_product',params);

	        this.$router.push({
	          path:'/personal/custom'
	        });
	      },
      /*下一步*/
        go_to_next(){
            if(!this.curRecStyle.Id){
                this.bombox.tomast({
                    msg:'请选择推荐款式',
                    type:'warning'
                });
                return;
            }
            this.Style.MainImg = this.suit;
            var params = {
                sign:'honey',
                data:{
                    main:this.Style,
                    recommend:this.curRecStyle
                }
            };
            this.$store.dispatch('set_suit_product',params);
            this.$router.push({
                path:'/personal/message'
            })
        }    
    },
    
    components:{
      'v-footer':footer
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin.scss';
     .fade-left-enter-active{
     	opacity: 1;
     	transition-property: transform;
     	-webkit-transition-property: transform ;
     	transition-duration:.5s ;
     	-webkit-transition-duration:.5s ;
     	transition-timing-function: linear;
     	-webkit-transition-timing-function: linear;
     	transform: translate3d(0,0,0);
     	-webkit-transform: translate3d(0,0,0);
     }
     .fade-left-enter{
     	opacity: 0;
     	
     }
     .fade-left-enter{
     	opacity: 0;
     }
     .ringLi:nth-child(1){
	  	transition-delay:  0.4s;
	  }
	  .ringLi:nth-child(2){
	  	transition-delay: 0.8s;
	  }
	  .ringLi:nth-child(3){
	  	transition-delay: 1.2s;
	  }
	  .ringLi:nth-child(4){
	  	transition-delay: 1.6s;
	  }
	  .ringLi:nth-child(5){
	  	transition-delay: 2s;
	  }
    .pic-center{
        width: 260px;
        height: 260px;
        line-height: 260px;
        overflow: hidden;
        margin: 20px auto;
        text-align: center;
        box-sizing: border-box;
       
        img{
            max-width: 260px;
            max-height: 260px;
            vertical-align: middle;
        }
    }
    .pic-list{
        padding: 0 60px;
        border-top: 20px solid #f5f5f5;
        .title{
            font-size: 1.2rem;
            font-weight: 500;
            margin: 20px;
            text-align: center;
        }
        .list-wrapper {
            white-space: nowrap;
            overflow-y: hidden;
            overflow-x: scroll;
            text-align: center;
        .list {
            width: 185px;
            background: #fafafa;
            text-align: center;
            font-size: 1.2rem;
            padding-bottom: 10px;
            border: 1px solid transparent;
            margin: 0 20px;

        .list-img {
            width: 185px;
            height: 160px;
            line-height: 160px;
            overflow: hidden;
            img {
                max-width: 185px;
                max-height: 160px;
                vertical-align: middle;
            }
        }
        .name {
            padding: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .price {

            span {
                color: #C1996A;
            }

            }
        }
        .list.active{
            border-color:#C1996A;
        }
        }
    }

</style>
