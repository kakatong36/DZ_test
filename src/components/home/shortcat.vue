<template>
    <div class="nav" :class='{hover:open}' @click='ShowShortCat'>
      <ul>
        <li @click='go_fashion_order'></li>
        <li @click='go_stone'></li>
        <li @click='go_style'></li>
        <li @click='go_fashion'></li>
        <!-- 这个属性只在平板和移动端能用  touchstart -->
      </ul>
      <div class="close"></div>
    </div>
</template>

<script>

export default {
  name: 'nav',
  data () {
    return {
       open:false
    }
  },
  methods:{
  	ShowShortCat(){
  		if(this.open){
  			this.open = false;
  		}else{
  			this.open = true;
  		}
  	},
  	go_fashion_order(){
  		this.$router.push({
  			path:'/fashion/fashionStatements'
  		})
  	},
  	go_stone(){
  		this.$router.push({
  			path:'/fashion/stone/list'
  		})
  	},
  	go_style(){
  		this.$router.push({
  			path:'/fashion/style'
  		})
  	},
  	go_fashion(){
  		this.$router.push({
  			path:'/fashion'
  		})
  	}
  },
  computed: {
	
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/mixin.scss';

  .nav{
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    font-size: 3rem;
    font-weight: 100;
    color: #fff;
    z-index: 1000;
    border-radius: 50%;
    background-color: #333;
    .close{
    	position:absolute;
    	top:0px;
			left:0px;
			right:0px;
			bottom:0px;
    	@include bg-image('../../common/images/home/icon');
    	transform: rotate3d(0,0,1,135deg);
    	-webkit-transform: rotate3d(0,0,1,135deg);
    	transition: all 0.2s ease-in-out;
    	-webkit-transition: all 0.2s ease-in-out;
    }
	 
    li{
        position: absolute;
        z-index: -1;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 10px;
        top: 0;
        left: 0;
        transition: all 0.5s ease-in-out;
    }
  }
  .nav.hover li:nth-child(1){
   @include bg-image('../../common/images/home/key');
     top: -105px;
     left: 0;
   }
  .nav.hover li:nth-child(2){
   @include bg-image('../../common/images/home/stone');
     top: -95px;
     left: -55px;
   }
  .nav.hover li:nth-child(3){
   @include bg-image('../../common/images/home/style');
     top: -55px;
     left: -95px;
   }
  .nav.hover li:nth-child(4){
   @include bg-image('../../common/images/home/home');
     top: 0;
     left: -105px;
   }
   .nav.hover .close{
   	 transform: rotate3d(0,0,0,0deg);
   	 -webkit-transform: rotate3d(0,0,0,0deg);
   }


</style>
