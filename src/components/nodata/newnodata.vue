<template>
	<transition name='fade'>
		<div class="nodata">
			<div class="container">
				<div class="nodata-bg"></div>
				<p v-html='msg'></p>
			</div>
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
		width:50rem;
		height:37.5rem;
		left: 0;
		right: 0;
		top: 32%;
		margin: auto;
        .nodata-bg{
			width:50rem;
			height:37.5rem;
			background: url('../../assets/assetsFinal/noResult.png') no-repeat center;
      		background-size: 50%;
        }
        p{
        	text-align: center;
			font-size: 1.5rem;
			color: #333333;
			position: absolute;
			bottom: 3rem;
			left: 50%;
			transform: translateX(-50%);
        }
        
    }

</style>
