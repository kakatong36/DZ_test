<template>
  <div class="layer" v-show='open'>
    <div class="_content">
    	{{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      
    }
  },
  props:{
    	open:{
    		type:[Boolean,String],
    		default(){
    			return false
    		}
    	},
    	msg:{
    		type:String,
    		default(){
    			return ''
    		}
    	}
  },
  mounted(){
  
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layer{
	padding: 10px 15px;
	background-color: #fff;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%,-50%,0);
	box-shadow: 0 0 5px rgba(0,0,0,0.2);
	
}
._content{
		line-height: 1.5em;
		font-size: 14px;
		color: #F05557;
		min-width: 200px;
		text-align: center;
		
	}
</style>
