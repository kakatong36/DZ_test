<template>
	<div class="detailSlide">
			
	</div>
</template>

<script>
require("swiper/dist/css/swiper.css");
import { swiper, swiperSlide } from "vue-awesome-swiper";
const page1 = require("@/assets/myBride/1.jpg");
const page2 = require("@/assets/myBride/2.jpg");
const page3 = require("@/assets/myBride/3.jpg");
const page4 = require("@/assets/myBride/4.jpg");
const page5 = require("@/assets/myBride/5.jpg");
	export default {
		data (){
			return {
				swiperOption: {
					notNextTick: true,
					direction: "horizontal",
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					paginationClickable: true,
					mousewheelControl: false,
					observeParents: true,
					debugger: true
				},
				bannerArr: [
					{ src: page1 },
					{ src: page2 },
					{ src: page3 },
					{ src: page4 },
					{ src: page5 }
				],
				fullHeight: document.documentElement.clientHeight,
				imgArr:[],
				isExit: this.isShow,
			}
		},
		props:['imgUrl','isShow'],
		created (){
			if(this.imgUrl){
				this.imgArr = this.imgUrl.split(',');
			}
		},
		methods:{
			back(){
				this.isExit = false;
				this.$emit('back',true);
			}
		}
	}
</script>

<style lang='scss'>
html,body{
	font-size: 8px;
}
	.detailSlide{
		.detailHeader{
			width: 100%;
            height: 3.75rem;
            // font-size: 2.25rem;
			color: #333;
			letter-spacing: 0;
			z-index: 999;
			display: flex;
			padding: 0 3.75rem;
			box-sizing: border-box;
			justify-content: space-between;
			box-shadow: 0 1px 0 0 #E5E5E5;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 9999;
			.return{
                
                position: absolute;
				left: 0;
				padding: 0 3.75rem;
                display: flex;
                align-items: center;
				height: 3.75rem;
				line-height: 3.75rem;
				font-size: 1.75rem;
				letter-spacing: -0.71px;
                &:before{
                    content:"";
                    display: inline-block;
                    width: 1.1rem;
                    height: 1.1rem;
                    border-right: 2px solid #333;
                    border-top: 2px solid #333;
                    transform: rotate(-135deg);
                }
                &:active{
                    opacity: 0.8;
                }
			}
			.title{
				height: 3.75rem;
				line-height: 3.75rem;
			}
			.rightSel{
				 height: 3.75rem;
				 line-height: 3.75rem;
				font-size: 1.75rem;
			}
		}
	}
</style>
