<template>
	<div class="shopMenu">
		<div class="mainMenu">
			<img :src="iconArr.add" alt="" class="addMenu" @click="iconShow = !iconShow">
			<div class="shopMenu">
				<img :src="iconArr.radio" alt="" v-show="iconShow" @click="goradio">
			</div>
			<div class="radioMenu">
				<img :src="iconArr.shopping" alt="" v-show="iconShow" @click="goshop">
			</div>
			<div class="indexMenu">
				<img :src="iconArr.index" alt="" v-show="iconShow" @click="gohome">
			</div>
		</div>
	</div>
</template>

<script>
const addIcon = require("@/assets/add-icon.png");
const radioIcon = require("@/assets/radio-icon.png");
const shoppingIcon = require("@/assets/shopping-icon.png");
const indexIcon = require("@/assets/index-icon.png");
export default {
  name: "shopMenu",
  data() {
    return {
      iconArr: {
        add: addIcon,
        radio: radioIcon,
        shopping: shoppingIcon,
        index: indexIcon
      },
	  iconShow : false
    };
  },
  methods : {
	  gohome(){
		  this.$router.push({
			  name : 'home'
		  })
	  },
	  goshop(){
		  this.$router.push({
			  name : 'finalFashionShoppingCar'
		  })
	  },
	  goradio(){
		  this.$router.push({
			  name : 'classRoom'
		  })
	  }
  }
};
</script>

<style lang="scss">
.shopMenu {
  position: fixed;
  bottom: 8.05rem;
  right: 1.94rem;
  z-index: 10;
  .mainMenu {
    width: 8.75rem;
    height: 8.75rem;
    background-color: #ffa6a6;
    border-radius: 100%;
    z-index: 10;
    position: relative;
    .addMenu {
      width: 3rem;
      height: 3rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .shopMenu,
  .radioMenu,.indexMenu {
    img {
      width: 100%;
      height: 100%;
    }
    position: absolute;
    width: 6.25rem;
    height: 6.25rem;
  }
  .shopMenu{
	  right: 11.25rem;
	  top:0;
	  bottom: 0;
	  margin: auto;
  }
  .indexMenu{
	  right: 19.75rem;
	  top:0;
	  bottom: 0;
	  margin: auto;
  }
  .radioMenu{
	  right: 28.25rem;
	  top:0;
	  bottom: 0;
	  margin: auto;
  }
}
</style>
