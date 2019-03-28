<template>
    <div class="loading-warpper" v-show='isShow'>
    	<div class="loading-inner">
    		<img src="../../common/images/loading/vogue.gif" width="100"/>
    	</div>
    </div>
</template>

<script>
 export default{
 	name:'loading'
 }
</script>

<style lang="scss">
    @import '../../common/scss/mixin.scss';
  .loading-warpper{
  	position: fixed;
  	top:0;
  	left:0;
  	right: 0;
  	bottom: 0;
  	z-index: 1000000;
  	.loading-inner{
  		padding:25px;
  		background-color:#fff;
  		border-radius:5px;
  		position:absolute;
  		top:50%;
  		left:50%;
  		transform:translate3d(-50%,-50%,0);
  		-webkit-transform:translate3d(-50%,-50%,0);
  	}
  
  }
</style>
