<template>
    <header id="header" v-show="isShow" class="clearfix">
        <div class="head-l iback" @click="back">返回</div>
        <h1 class="head-c">{{title}}</h1>
    </header>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    
    methods:{
      back(){
      	if(this.$route.name == 'fashion' || this.$route.name == 'success'){
      		this.$router.push({
      			path:'/'
      		})
      	}else{
      		this.$router.go(-1);
      	};
        
      }
    },
    computed:{
      title() {
        return this.$store.state.header.title
      },
      isShow() {
        return this.$store.state.header.isShow
      }
    }
  }
</script>

<style lang="scss">
header{
    width: 100%;
    height: 6.25rem;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.2em;
    color: #333333;
    text-align: center;
    line-height: 57px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    z-index: 100;
    -ms-touch-action: none;
}
header .head-l,{
    width: 15%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
	font-size: 14px;
}
header .head-l{
    text-align: left;
    padding-left: 20px;
}
header .iback:before{
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-left:1px solid #333333;
    border-top:1px solid #333333;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    margin-right: 10px;
}
header .head-r{
    text-align: right;
    padding-right: 20px;
    a{
        color: #F05557;
    }
}
header .head-c{
	position: absolute;
	top: 0;
	left: 0;
  	width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	font-size: 16px;
}
</style>
