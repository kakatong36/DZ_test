<template>
	   <div class="loading_wrap">
			<transition name="fade" >
				<div class="loading-img">
					<img src="../../assets/assetsFinal/loading-2.gif" alt="">
				</div>
			</transition>
	   </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
	.fade-enter-active{
		opacity: 1;
		transition:all .5s ease;
		-webkit-transition:all .5s ease;
		// transform: translate3d(0,0,0);
		// -webkit-transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-to-leave{
		opacity: 0;
	}
	#app{
		height: 100%;
	}
	.loading_wrap{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 100%;;
		.loading-img{
			width: 20rem;
			height: 16rem;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			img{
				width: 100%;
			}
		}
	}
</style>
