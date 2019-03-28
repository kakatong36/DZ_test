<template>
    <div class="personal">
		
      <div class="backList-header">
		  <div class="header-container">
            <div class="back-btn" @click="goback">返回</div>
            <h1 class="head-text">组合定制</h1>
		  </div>
      </div>
		<ul>
			<li class="item" >
				<router-link to='/myBrideWidget'>
					<img src="../../common/images/personal/myBride.png"/>
					<div class="routerBtn">自由女神</div>
				</router-link>

			</li>
			<li class="item" >
				<router-link to='/couples'>
					<img src="../../common/images/personal/couples.png"/>
					<div class="routerBtn">情侣戒</div>
				</router-link>
			</li>
			<li class="item" >
				<!--<router-link to='/personalcate/bride'>-->
				<router-link to='/series'>
					<img src="../../common/images/personal/series.png"/>
					<div class="routerBtn">套装系列</div>
				</router-link>
			</li>
		</ul>
		<shopMenu></shopMenu>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(function() {
        var lis = document.querySelectorAll(".item");
        lis.forEach(function(item) {
          item.style.cssText =
            "transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);opacity:1;";
        });
      }, 200);
    });
  },
  methods: {
    goback() {
      this.$router.push({
		  name : 'home'
	  })
    }
  }
};
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  html,
  body {
    font-size: 8px !important;
  }
}
@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
  html,
  body {
    font-size: 11px;
  }
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.backList-header {
//   background-image: url("topImg.png");
	background-color: rgba(255,255,255,.2);
  width: 100%;
  height: 6.25rem;
  position: absolute;
  z-index: 9999;
  padding-top: 2.5rem;
  box-shadow: 0;
  .header-container {
    width: 100%;
    height: 3.75rem;
    .back-btn {
      position: absolute;
      left: 3.75rem;
      display: -webkit-box;
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
.personal {
  width: 100%;
  height: 100%;
background: url("../../assets/assetsFinal/bg1.jpg") no-repeat center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-position: bottom center;
  background-size: 100% auto;
  ul {
    width: 100%;
    margin-top: 23.63rem;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content: center;
    align-items: center;
    li {
      width: 35rem;
      margin-right: 3rem;
      padding-top: 17px;
      box-sizing: border-box;
      height: 43.75rem;
      text-align: center;
      position: relative;
      opacity: 0.6;
      transform: translate3d(200px, 0, 0);
      -webkit-transform: translate3d(200px, 0, 0);
      a {
      }
      img {
        width: 100%;
        display: block;
        height: 100%;
      }
      .routerBtn {
        position: absolute;
        bottom: 5rem;
        width: 18.75rem;
        height: 4.13rem;
        background-image: linear-gradient(134deg, #ffbaba 0%, #f27474 100%);
        border-radius: 1.25rem;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 1.5rem;
        color: #fff;
        line-height: 4.13rem;
      }
    }
    li:nth-child(1) {
      transition: all 0.5s 0s linear;
      -webkit-transition: all 0.5s 0s linear;
    }
    li:nth-child(2) {
      transition: all 0.5s 0.2s linear;
      -webkit-transition: all 0.5s 0.2s linear;
    }
    li:nth-child(3) {
      transition: all 0.5s 0.3s linear;
      -webkit-transition: all 0.5s 0.3s linear;
    }
  }
}
@media only screen and (max-width: 900px) {
  .personal {
    ul {
      li {
        margin-right: 2px;
        height: 25.625rem;
      }
    }
  }
}
</style>
