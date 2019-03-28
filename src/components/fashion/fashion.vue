<template>
    <div class="content">
        <div class="fashion-bg list-box" v-show="fashionShow">
            <router-link to="/fashion/style" class="list kuan" :class='{down:isAnimation}'>
                <p>先选戒托，再选配石</p>
                <span>选款</span>
            </router-link>
            <router-link to="/fashion/stone/list/0/0/0" class="list zuan" :class='{down1:isAnimation}'>
                <p>先选配石，再选戒托</p>
                <span>选石</span>
            </router-link>
            
        </div>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        fashionShow:true,
        isShow: this.$store.state.header.isShow = true,
        title: this.$store.state.header.title = '时尚定制',
        isAnimation:false
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.fashionShow = false;
      next()
    },
    created(){
      this.$store.state.footer.isPrice = false
      this.$store.state.footer.isStep = true;
    },
    components:{

    }
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
    .fashion-bg{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 540px;
        @include bg-image('../../common/images/fashion/rectangle');
        background-size: 100% 540px;
        text-align: center;
        animation:clip .5s ease-out;
       -webkit-animation:clip .5s ease-out;
    }

    @-webkit-keyframes clip{
        0%{
            opacity:0.2;
             clip:rect(0 0 540px 0);
        }
        100%{
             opacity:1;
             clip:rect(0 1024px 540px 0);
        }
       
    }

    

    .fashion-bg .list{
        position: relative;
        width: 310px;
        height: 348px;
        background: #fff;
        display: inline-block;
        border-radius: 20px;
        border: 1px solid #e5e5e5;
        margin: 80px 50px;
        text-align: center;
        transform: translateY(-1000px);
        box-shadow: 0 10px 20px rgba(0,0,0,.3);
         p{
             font-size: 14px;
             margin-bottom: 30px;
         }
         span{
             display: inline-block;
             width: 200px;
             line-height: 50px;
             background: #C1996A;
             border-radius: 25px;
             color: #fff;
             font-size: 18px;
             font-weight: 100;
             letter-spacing: 2px;
         }
    }
     .fashion-bg .list:nth-child(1){
        -webkit-animation:down .8s ease-in-out .2s forwards;
    }
    .fashion-bg .list:nth-child(2){
        -webkit-animation:down .8s ease-in-out .3s forwards;
    }  
    .zuan:before{
        content: '';
        display: block;
        height: 210px;
        @include bg-image('../../common/images/fashion/zuan');
        background-size: 210px;
    }
    .kuan:before{
        content: '';
        display: block;
        height: 210px;
        @include bg-image('../../common/images/fashion/kuan');
        background-size: 210px;
    }
    .down{
        -webkit-animation:down 2s ease-in-out forwards;
         animation:down 2s ease-in-out forwards
    }

   .down1{
        -webkit-animation:down1 2s ease-in-out  forwards;
         animation:down1 2s ease-in-out  forwards
    }
    @-webkit-keyframes down{
        0%{
            opacity:0;
            -webkit-transform: translateY(300px);
            transform: translateY(300px)
        }
        80%{
              opacity:1;
        }
        100%{
          
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
    }
 @-webkit-keyframes down1{
        0%{
            opacity:0;
            -webkit-transform: translateY(300px);
            transform: translateY(300px)
        }
        100% {
            opacity:1;
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
    }
    @media screen and (max-width:768px){
        .fashion-bg .list{
            margin: 80px 10px;
        }
    }
</style>
