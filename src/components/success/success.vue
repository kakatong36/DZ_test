<template>
    <div class="content success">
        <div class="success-img"></div>
        <div class="success-text" v-if='sign != "fastion"'>
            <p>恭喜你们，已成功定制{{sign}}。</p>
            <p>稍后会有服务专员跟进你们的后续事务</p>
        </div>
        <div class="success-text" v-if='sign == "fastion"'>
            <p>已成功定制专属产品！</p>
            <p>感谢您的购买</p>
        </div>
        <router-link to="/" class="success-back">返回首页</router-link>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        isShowH: this.$store.state.header.isShow = true,
        title: this.$store.state.header.title = '提交成功',
        sign :''
      }
    },
    created(){
        this.sign = this.$route.params.sign;
    	if(this.sign == 'love'){
    		this.sign = '真爱指环';
    	}else if(this.sign == 'honey'){
            this.sign = '守护甜心';
        }else if(this.sign == 'bride'){
            this.sign = '我的新娘';
        }else{
            this.sign = 'fastion'
        }
  },
  mounted(){
    this.$nextTick(function(){
      
    });
  }
}
</script>

<style lang="scss">
            
    @import '../../common/scss/mixin.scss';

    .success{
        text-align: center;
        @include bg-image('../../common/images/success/personalbg');
        background-position:bottom center;

    }
    .success-img{
        margin-top: 6rem;
        margin-bottom: 2rem;
        height: 120px;
        @include bg-image('../../common/images/success/success');
        background-size: 120px 120px;
         animation:scales .5s linear;
         -webkit-animation:scales .5s linear;
        
    }
    .success-text{
        font-size: 18px;
        margin-bottom: 1.6rem;
        animation:Toup .5s linear;
         -webkit-animation:Toup .5s linear;
    }
    .success-back{
        display: inline-block;
        width: 11rem;
        height: 2rem;
        line-height: 2rem;
        border: 1px solid #333;
        border-radius: 1.5rem;
        letter-spacing: 1px;
        color: #333;

    }
     @-webkit-keyframes scales{
        0%,15%{
            -webkit-transform: scale(0);
            transform: scale(0)
        }
        80%,10%{
            -webkit-transform: scale(1);
            transform: scale(1)
        }
       
    }
      @keyframes scales{
        0%,15%{
            -webkit-transform: scale(0);
            transform: scale(0)
        }
        80%,10%{
            -webkit-transform: scale(1);
            transform: scale(1)
        }
       
    }
    @-webkit-keyframes Toup{
        0%{
            -webkit-transform: translate3d(0,100px,0);
            transform: translate3d(0,100px,0)
        }
        80%{
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0)
        }
       
    }
      @keyframes Toup{
         0%{
            -webkit-transform: translate3d(0,100px,0);
            transform: translate3d(0,100px,0)
        }
        80%{
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0)
        }
       
    }

</style>
