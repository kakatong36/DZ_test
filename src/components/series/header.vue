<template>
  <div class="seriesHeader">
		<div class="headerFahion" :class="{'guide':  header.title == '时尚定制',}" v-show="header.isShow"> 
			<div class="return" @click="back">返回</div>
			<h1 class="title" >{{header.title}}</h1>
			<div class="rightTitle" v-show="header.showRight" @click="next">{{header.showRight}}</div>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["header", "isShow"],
  created() {},
  methods: {
    back() {
		if(this.header.showRight){
			if(this.$route.name == 'seriesDetail'){
				let route = {
					name: this.header.return.name,
					params:this.header.return.params,
					query: this.header.return.query
				}
				this.$router.replace(route)
			}else{
				this.$emit('getBack',true)
				this.$router.go(-1);
			}
		}else{
			if(this.header.return){
				if(this.header.return.name){
					let route = {
						name: this.header.return.name,
						params:this.header.return.params,
						query: this.header.return.query
					}
					if(this.header.return.name == 'finalFashion'){
						this.$router.replace(route)
					}else{
						this.$router.replace(route)
					}
				}else{
					this.$router.go(-1)
				}
			}else {
				this.$router.go(-1)
			}
		}
    },
    next() {
		if (this.header.showRight == "确认信息") {
			this.$router.push({
				name: "seriesEdit",
				params: {
					id: this.$route.params.id
				},
				query: this.$route.query
			});
		} else {
			this.$emit("edit", true);
		}
    }
  }
};
</script>

<style lang="scss">
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  html,
  body {
    font-size: 8px !important;
  }
}
@media only screen and (min-device-width: 1025px) and (max-device-width: 1366px) and (orientation: landscape) {
  html,
  body {
    font-size: 11px !important;
  }
}
html,
body {
  font-size: 8px;
}
.seriesHeader {
  background: #ffffff;
  width: 100%;
  height: 6.25rem;
  position: absolute;
  z-index: 9999;
  padding-top: 2.5rem;
  top: 0;
  &.guide {
    background: url("../../assets/assetsFinal/top03.png") no-repeat center;
    background-size: 100% 6.25rem;
    box-shadow: none;
  }
  .back-header {
    background: #ffffff;
    width: 100%;
    height: 6.25rem;
    position: absolute;
    z-index: 9999;
    padding-top: 2.5rem;
    .header-container {
      width: 100%;
      height: 3.75rem;
      box-shadow: 0 1px 0 0 #e5e5e5;
      .back-btn {
        position: absolute;
        display: -webkit-box;
		left: 0;
		padding: 0 3.75rem;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 3.75rem;
        line-height: 3.75rem;
        font-size: 1.75rem;
        letter-spacing: -0.71px;
      }
      .back-btn:before {
        content: "";
		display: inline-block;
		width: 1.1rem;
		height: 1.1rem;
		border-left: 2px solid #333;
		border-top: 2px solid #333;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
      }
      .head-text {
        text-align: center;
        line-height: 3.75rem;
        height: 3.75rem;
        color: #333;
        font-size: 2.25rem;
      }
      .cusIndex {
        width: 100%;
        height: 100%;
      }
    }
  }
  .headerFahion {
    // background: #ffffff;
    width: 100%;
    height: 3.75rem;
    box-shadow: 0 1px 0 0 #e5e5e5;
    .title {
      text-align: center;
      line-height: 3.75rem;
      height: 3.75rem;
      color: #333;
      font-size: 2.25rem;
    }
    .return {
     	position: absolute;
		left: 0;
		padding: 0 3.75rem;
		display: flex;
		align-items: center;
		height: 3.75rem;
		line-height: 3.75rem;
		font-size: 1.75rem;
		letter-spacing: -0.71px;
		&:before {
			content: "";
			display: inline-block;
			width: 1.1rem;
			height: 1.1rem;
			border-right: 2px solid #333;
			border-top: 2px solid #333;
			transform: rotate(-135deg);
		}
		&:active {
			opacity: 0.8;
		}
    }
    .rightTitle {
		position: absolute;
		right: 3.75rem;
		height: 3.75rem;
		font-size: 1.75rem;
		line-height: 3.75rem;
		bottom: 0;
    }
    &.shoppingCar {
		background: url("../../assets/assetsFinal/top1.png") no-repeat center;
		background-size: 100% 6.25rem;
		box-shadow: none;
    }
  }
}
</style>
