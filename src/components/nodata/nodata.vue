<template>
	<transition name='fade'>
		<div class="nodata">
	       <div class="nodata-bg"></div>
	       <p v-html='msg'></p>
	    </div>
	</transition>
    
</template>

<script>
  export default {
    data () {
      return {}
    },
    props:['msg'],
    computed:{
    	
    },
	methods:{
	 	
	}
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
   .fade-enter-active{
   	 opacity: 1;
   	 transition:all .5s ease;
   	 -webkit-transition:all .5s ease;
   	 transform: translate3d(0,0,0);
   	 -webkit-transform: translate3d(0,0,0);
   }
   .fade-enter,.fade-to-leave{
   	 opacity: 0;
   	 transform: translate3d(0,30px,0);
   	 -webkit-transform: translate3d(0,30px,0);
   }
    .nodata{
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right:0;
    	overflow:hidden;
        .nodata-bg{
        	width:100%;
        	height:30%;
      		@include bg-image('../../common/images/nodata/nodata');
      		background-size:auto 100% ;
      		background-position:center;      		
      		top:20%;
      		margin-top:20%;
        }
        p{
        	padding: 15px 0;
        	text-align: center;
        	line-height: 1.5em;
        	color:#DFB077;
        }
        
    }

</style>
