<template>
	<transition name='fade3'>
		<div class="nointernet">
			<div class="container">
				<div class="nointernet-bg"></div>
				<p>网络连接错误</p>
			</div>
			<div class="refresh" @click="refresh()">刷新本页</div>
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
	 	refresh(){
			window.location.reload();
		}
	}
  }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
   .fade3-enter-active{
		opacity: 1;
		transition:all .5s ease;
		-webkit-transition:all .5s ease;
		transform: translate3d(0,0,0);
		-webkit-transform: translate3d(0,0,0);
   }
   .fade3-enter,.fade3-to-leave{
		opacity: 0;
		transform: translate3d(0,30px,0);
		-webkit-transform: translate3d(0,30px,0);
   }
    .nointernet{
    	position: absolute;
		width:50rem;
		height:37.5rem;
		left: 50%;
		top: 50%;
		z-index: 999;
		transform: translate(-50%,-50%);
        .nointernet-bg{
			width:50rem;
			height:37.5rem;
			background: url('../../assets/assetsFinal/noInternet.png') no-repeat center;
      		background-size: 50%;
        }
		.refresh{
			width: 12.5rem;
			height: 5.5rem;
			text-align: center;
			line-height: 5.5rem;
			border: 1px solid #E5E5E5;
			border-radius: 0.25rem;
			background: #FFFFFF;
			color: #333333;
			font-size: 1.5rem;
			margin: 0 auto;
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
