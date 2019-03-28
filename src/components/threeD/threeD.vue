<template>
    <div class="threeDBox">
		<div class="imgs">
			<img :src="img" 
				v-for="(img,index) in imgList" 
				:key="index"
				:style="{opacity:current3DIndex==index && moveFlag ?1:0}"
				@load = "imageLoad"
				@error = "errorLoad(index)"
			>
			<div class="progress-bar" v-show="!moveFlag">
				{{persent}}%
				<div class="progress-bar-container">
					<div class="progress-bar-content" :style="{width: persent + '%'}"></div>
				</div>
				<span>预览加载中</span>
			</div>
		</div>
		<div class="control" v-show="moveFlag">
			<div class="bar">
				<div class="thumb" @touchstart="startTouch" ref="thumb"></div>
			</div>
		</div>
		<!-- <div class="remind" style="position:absolute;bottom:5rem;left:0;width:25%;height:5rem;z-index:9999999999999999;" v-show="remindFlag">
			<img :src="remindImg" alt="" style="width:100%;height:100%;">
		</div> -->
    </div>
</template>

<script>
const remind = require("@/assets/slideRight.gif");

export default {
  props: ["list"],
  name: "threeD",
  data() {
    return {
	  current3DIndex: 0,
	  loadedImages: 0,//加载图片数量
	  moveFlag : false,
	  loadVal : 0,
	  errorArr : [],
	  imgList : []
	//   remindImg : remind,
	//   remindFlag : false
    };
  },
  created(){
	  this.imgList = this.list;
  },
  computed:{
	  persent(){
		  return Math.round((this.loadVal / this.list.length) * 100)
	  }
  },
  watch:{
	  loadedImages:{
		  handler(val,oldval){
			  //监听加载图片数量
				this.loadVal = val;
			  	if(val == this.imgList.length){
				  //数量达到显示图片
				this.moveFlag = true;
				// this.remindFlag = true;
				if(this.errorArr.length > 0){
					let newList = this.list;
					let errorArr = this.errorArr;
					
					this.imgList = newList.filter((_, index) => !errorArr.includes(index));
				}
			  }
		  }
	  }
  },
  methods: {
	imageLoad() {
		this.loadedImages ++; 
	},
	errorLoad(index){
		//加载失败时把失败图片删除
		new Promise((resolve)=> {
			this.errorArr.push(index);
			resolve()
			}).then(()=>{
				this.imageLoad()
			})
		// this.errorArr.push(index);
		// this.imageLoad();
	},
    startTouch($event) {
		if(!this.moveFlag){
			return
		}
      let that = this;
      let startX = $event.touches[0].pageX,
        lastX = startX;
      let el = $event.target;
      let left = el.style.left.replace("px", "");
	  let maxLength = document.getElementsByClassName('threeDBox')[0].offsetWidth;
	  let maxIndex = this.imgList.length - 1;
      if (left) {
        left = Number(left);
      } else {
        left = 0;
      }
      let move = function(event) {
		  that.remindFlag = false;
		  let eleLeft = document.getElementsByClassName('threeD-content')[0].offsetLeft,
		  eleWidth = document.getElementsByClassName('threeDBox')[0].offsetWidth,
		  eleRight = eleLeft + eleWidth,
		  touchX = event.touches[0].pageX;
		//   if(event.touches[0].pageX > ){}
		  if(touchX < eleLeft || touchX > eleRight){
			  return
		  }
        let interval = event.touches[0].pageX - lastX;
        let length = Math.round(left + interval);
        if (length < 0) {
          length = 0;
        } else if (length > maxLength) {
          length = maxLength;
        }

		el.style.left = length + "px";
        that.current3DIndex = Math.floor(length * (maxIndex / maxLength));
      };
      let up = function(event) {
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", up);
      };
      document.addEventListener("touchmove", move);
      document.addEventListener("touchend", up);
    }
  }
};
</script>

<style lang="scss">
.threeDBox {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .imgs {
    position: relative;
    height: 100%;
	width: 100%;
	border-radius: 2rem;
	// box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.4);
    img {
      position: absolute;
      top: 45rem;
      height: auto !important;
      transform: translate(0, -60%);
	  width: 100% !important;
	  border-radius: 2rem;
      /*transition: opacity 2s;*/
    }
	.progress-bar{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 100%;
		height: 10rem;
		font-size: 1.5rem;
		color: #FF687B;
		text-align: center;
		.progress-bar-container{
			width: 37.5rem;
			height: 1.25rem;
			margin: 0 auto;
			background-color: #e5e5e5;
			border-radius: 10px;
		}
		.progress-bar-content{
			height: 100%;
			background-image: linear-gradient(90deg, #FFBABA 0%, #F27474 100%);
			border-radius: 10px;
		}
		span{
			color:#fff;
		}
	}
  }
  .control {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
	width: 300%;
	height: 100%;
    .bar {
      position: relative;
      width: 100%;
      height: 100%;
      .thumb {
        position: absolute;
        left: 0;
        top: 0;
        width: 300%;
        height: 100%;
        // border-radius: 3px;
        // background-image: url('../../assets/progressBar.png');
		// background-size: cover;
      }
    }
  }
}
</style>
