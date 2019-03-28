<template>
<div class="black">
	<div class="back-header">
		<div class="back-btn" @click="goback">返回</div>
		<h1 class="head-text">{{title}}</h1>
		<div class="choose-btn" @click="openShow">选择参数</div>
	</div>
	<swiper :options="swiperOption" ref="mySwiper" style="margin-top:6.25rem;">

		<swiper-slide :key="index" v-for="(item,index) in suitArr" :style="{height: fullHeight + 'px'}">
			<img :src="item.indexOf('http')>-1 ? item : (http.imgUrl+item+config.detailMainImgSize)" style="width:100%;" :style="{height: fullHeight + 'px'}" alt="">
		</swiper-slide>

		<div class="swiper-pagination" slot="pagination"></div>
		<div class="swiper-scrollbar" slot="scrollbar"></div>

	</swiper>

	<!-- <myBrideDetail ref="Customized" @btnShowFlag="btnFlag"></myBrideDetail> -->

</div>
</template>

<script>
require("swiper/dist/css/swiper.css");
import {
	swiper,
	swiperSlide
} from "vue-awesome-swiper";
import myBrideDetail from "@/components/myBride/detail";

export default {
	computed: {
		title() {
			return this.$store.state.header.title;
		}
	},
	mounted() {
		window.addEventListener("resize", this.handleResize);

		this.$store.state.header.title = "图文详情";
	},
	beforeDestroy: function() {
		window.removeEventListener("resize", this.handleResize);
	},
	data() {
		return {
			suitArr: [],
			fullHeight: document.documentElement.clientHeight,
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
			routeId: "",
			proto: {},
			header: {
				return: {
					name: 'myBrideWidget'
				}
			}
		};
	},
	methods: {
		handleResize(event) {
			this.fullHeight = document.documentElement.clientHeight;
			console.log(this.fullHeight);
		},
		openShow() {
			this.$router.push({
				name: "myBrideDetail",
				params: this.$route.params,
				query: this.$route.query
			});
		},
		goback() {
			this.$router.replace({
				name: 'myBrideWidget',
				query: this.header.return.query
			})
		}
	},
	created() {
		let suitArr = [],
			suitStr = "";
		if (this.$route.params.id) {
			this.routeId = this.$route.params.id;
			this.proto = this.$route.params.proto;
			suitStr = this.$route.params.suitCopy;
		}
		suitArr = suitStr.split(",");
		this.suitArr = suitArr;
	},
	components: {
		swiper,
		swiperSlide,
		myBrideDetail
	},
	beforeRouteEnter(from, to, next){
		next(vm => {
			vm.header.return.query = vm.$route.query
			delete vm.header.return.query.lastPage
		})
	}
};
</script>

<style lang="scss" scoped>
@keyframes chooseBtnMove {
	0% {
		bottom: -5rem;
	}
	to {
		bottom: 1.88rem;
	}
}

@-webkit-keyframes chooseBtnMove {
	0% {
		bottom: -5rem;
	}
	to {
		bottom: 1.88rem;
	}
}

@keyframes maskFade {
	0% {
		opacity: 0;
	}
	to {
		opacity: 0.8;
	}
}

@-webkit-keyframes maskFade {
	0% {
		opacity: 0;
	}
	to {
		opacity: 0.8;
	}
}

html,
body {
	height: 100%;
	font-size: 12px;
}

* {
	margin: 0;
	padding: 0;
}

.black {
	width: 100%;
	height: 100%;
	background-color: #000;
}

.mask-layer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #333;
	opacity: 0.8;
	z-index: 6;
	animation: maskFade 0.4s ease;
	animation-fill-mode: backwards;
}

.back-header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 6.25rem;
	line-height: 8.75rem;
	background-color: #fff;
	color: #333;
	z-index: 10;
	.back-btn {
		position: absolute;
		top: 0;
		left: 1rem;
		width: 10rem;
		z-index: 10;
		font-size: 1.75rem;
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
		font-size: 2.25rem;
	}
	.cusIndex {
		width: 100%;
		height: 100%;
	}
	.choose-btn {
		position: absolute;
		top: 0;
		right: 1rem;
		width: 10rem;
		z-index: 10;
		font-size: 1.75rem;
	}
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal>.swiper-pagination-bullets {
	top: 70px !important;
}

header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 3.56rem;
	line-height: 3.56rem;
	background-color: #333;
	color: #fff;
	z-index: 9;
}

.back-btn {
	position: absolute;
	top: 0;
	left: 1rem;
	width: 10rem;
	z-index: 10;
}

header .back-btn:before {
	content: "";
	display: inline-block;
	width: 0.8rem;
	height: 0.8rem;
	border-left: 1px solid #fff;
	border-top: 1px solid #fff;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	margin-right: 10px;
}

.arrow {
	background-color: #e2aa6f;
	color: #9d6113;
	font-size: 1.25rem;
	position: fixed;
	left: 0;
	bottom: 1.88rem;
	right: 0;
	border-radius: 4px;
	width: 25rem;
	height: 3.63rem;
	z-index: 8;
	text-align: center;
	line-height: 3.63rem;
	margin: auto;
	box-shadow: 0 2px 8px 0 rgba(226, 170, 111, 0.5);
	animation: chooseBtnMove 0.2s ease;
	animation-delay: 0.2s;
	animation-fill-mode: backwards;
}

.swiper-container-autoheight .swiper-wrapper {
	margin-top: 3.56rem !important;
	height: 100% !important;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
	html,
	body {
		font-size: 8px !important;
	}
	.swiper-container-autoheight .swiper-slide {
		height: 60.8rem;
		img {
			height: 100% !important;
		}
	}
}

@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
	html,
	body {
		font-size: 11px !important;
	}
	.swiper-container-autoheight .swiper-slide {
		height: 60.8rem;
		img {
			height: 100% !important;
		}
	}
}
</style>



