<template>
	<div class="fashionIndex">
		<v-header :header="header"></v-header>
		<div class="guide-wrap">
			<div class="guide_fashion" v-if="!isShow">
				<ul>
					<li @click="selGoods()" class="transition">
						<div class="guide_wrap">
							<div class="goodsImg">
								<img class="" src="../../assets/assetsFinal/cuicanzuanshi.png" alt="">
							</div>
							<div  class="goodsImgBg">
								<img src="../../assets/assetsFinal/Diamonds.png" alt="" class="">
							</div>
							<p>璀璨钻石</p>
						</div>
					</li>
					<li class="transition">
						<div class="guide_wrap">
							<div class="goodsImg">
								<img class="" src="../../assets/assetsFinal/youyazhenzhu.png" alt="">
							</div>
							<div class="waiting">敬请期待</div>
							<p class="no_have">优雅珍珠</p>
						</div>
					</li>
					<li class="transition">
						<div class="guide_wrap">
							<div class="goodsImg">
								<img class="" src="../../assets/assetsFinal/binfencaibao.png" alt="">
							</div>
							<div class="waiting">敬请期待</div>
							<p class="no_have">缤纷彩宝</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="img-transition" v-if='isShowTitle'>
			<img class="goodsImg transition" src="../../assets/assetsFinal/cuicanzuanshi.png">
		</div>
		<div class="hideBox" v-if='isShowTitle'>
			<p class="box">璀璨钻石</p>
		</div>
		<div class="guide_fashion goods_select" v-show="isShow">
			<ul>
				<li @click="next_step" class="transition1">
					<div class="guide_wrap">
						<div class="goodsImg">
							<img class="" src="../../assets/assetsFinal/clearStone.png" alt="">
						</div>
						<div class="goodsImgBg">
							<img src="../../assets/assetsFinal/Diamonds.png" alt="" class="">
						</div>
						<p>先选款</p>
					</div>
				</li>
				<li class="transition1" @click="next_step_stone">
					<div class="guide_wrap">
						<div class="goodsImg">
							<img class="" src="../../assets/assetsFinal/d.png" alt="">
						</div>
						<div class="goodsImgBg">
							<img src="../../assets/assetsFinal/Diamonds.png" alt="" class="">
						</div>
						<p>先选石</p>
					</div>
				</li>
			</ul>
		</div>
		<shopMenu></shopMenu>
	</div>
</template>

<script>
import header from "./header";
export default {
	data() {
		return {
		header: {
			title: "时尚定制",
			isShow: true,
			return: {
			name: "home"
			}
		},
		isShow: false,
		isShowTitle: false
		};
	},
	created() {
		this.$store.commit("SET_STYLE", false);
		this.$store.commit("SET_DETAIL", false);
		this.$store.commit("SET_STONE", false);
		this.$store.commit("SET_SETTLEMENT", false);
		let obj = {
			finness: "",
			stylePrice: ""
		};
		this.$store.commit("SET_FASHION", obj);
			
	},
	mounted (){
		this.$nextTick(()=>{
			let dom = document.getElementsByClassName('transition');
			for(let i = 0;i < dom.length; i ++){
				dom[i].style.animation = 'fashion 0.5s ease forwards';
				dom[i].style['animation-delay'] = i*0.2 +'s';
			}
		})
	},
	methods: {
		selGoods(){
			this.isShow = true;
			this.isShowTitle=true;
			if(this.isShow){
				setTimeout(()=>{
					let dom = document.getElementsByClassName('transition1');
					for(let i = 0;i < dom.length; i ++){
						dom[i].style.animation = 'fashion 0.5s ease forwards';
						dom[i].style['animation-delay'] = i*0.2 +'s';
					}
				},400)
			}
		},
		next_step() {
			this.$router.push("/finalFashion/fashion");
			this.$store.commit("SET_ISSTONEORSTYLE", true); //判断选择哪一个进去的先选款 true 是先选款式
		},
		next_step_stone() {
			this.$router.push("/finalFashion/stoneFirst");
			this.$store.commit("SET_ISSTONEORSTYLE", false);//false 是先选石
		}
	},
  components: {
    "v-header": header
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
.fashionIndex {
	height: 100%;
	background: url("../../assets/assetsFinal/bg1.jpg") no-repeat center;
	background-size: 100%;
	// margin-top: 3.75rem;
	.guide-wrap {
		padding-top: 6.25rem;
	}
	.finalHeader .headerFahion {
		box-shadow: none;
	}
	.img-transition {
		width: 18.88rem;
		height: 18.88rem;
		position: absolute;
		z-index: 120;
		opacity: 0;
		left: 12%;
		top: 33%;
		animation: flyScaleImg 0.5s ease forwards;
		img {
			width: 100%;
			// height: 100%;
		}
	}
	.guide_fashion {
		width: 100%;
		padding: 0 7.75rem;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		&.goods_select {
		ul {
			display: flex;
			justify-content: center;
			li {
				margin-right: 3.75rem;
			}
		}
		}
		ul {
			display: flex;
			height: 43.75rem;
			justify-content: space-between;
			li {
				padding: 1.19rem 0.94rem 1.13rem;
				width: 35rem;
				box-sizing: border-box;
				background: #fff;
				font-size: 1.5rem;
				color: #333;
				border-radius: 0.63rem;
				transform: translateX(10rem);
				opacity: 0;
				position: relative;
				z-index: 99;
				display: flex;
				.guide_wrap {
					border: 1px solid #e5e5e5;
					display: flex;
					align-items: center;
					flex-direction: column;
					position: relative;
					width: 100%;
					// height: 100%;
					flex: 1;
					.guide_wrap_title {
						position: absolute;
						top: 26rem;
						left: 0;
						right: 0;
						margin: auto;
						height: 2rem;
						text-align: center;
						color: #333;
						font-size: 1.5rem;
						z-index: 9;
					}
				}
					.goodsImg {
						width: 18.88rem;
						height: 18.88rem;
						margin-top: 4.81rem;
						margin-bottom: 9.75rem;
						&.transition {
							position: absolute;
							top: 0;
							left: 50%;
							opacity: 1;
							animation: flyScaleImg 0.5s ease forwards;
						}
						img{
							width: 100%;
							height: 100%;
						}
					}
					.goodsImgBg {
						width: 29.25rem;
						height: 9.06rem;
						position: absolute;
						top: 9rem;
						left: 50%;
						transform: translateX(-50%);
						img{
							width: 100%;
							height: 100%;
						}
					}
					p {
						width: 18.75rem;
						height: 4.13rem;
						line-height: 4.13rem;
						text-align: center;
						border-radius: 0.63rem;
						background-image: linear-gradient(-134deg, #ffbaba 0%, #f27474 100%);
						margin-bottom: 5rem;
						color: #ffffff;
					&.no_have {
						border: 1px solid #333333;
						background: #ffffff;
						opacity: 0.2;
						width: 9.81rem;
						color: #333;
					}
					&:active {
						opacity: 0.8;
					}
				}
				.waiting {
					display: flex;
					align-items: center;
					position: absolute;
					width: 82.5%;
					top: 65%;
					left: 50%;
					transform: translate(-50%, -50%);
					text-align: center;
					&:before {
						content: "";
						display: inline-block;
						width: 9rem;
						height: 1px;
						background: #a0a0a0;
						margin-right: 1.25rem;
					}
					&:after {
						content: "";
						display: inline-block;
						width: 9rem;
						height: 1px;
						background: #a0a0a0;
						margin-left: 1.25rem;
					}
				}
			}
		}
	}
	.curGoodsImg {
		width: 35rem;
		height: 10rem;
		background: #fff;
		display: flex;
		align-items: center;
		border-radius: 0.63rem;
		position: absolute;
		top: 18rem;
		left: 20%;
		animation: flyScale 1s ease;
		animation-fill-mode: forwards;
		img {
			width: 7.5rem;
			height: 7.5rem;
			margin-left: 2.5rem;
			margin-right: 9.38rem;
		}
		p {
			color: #333;
			font-size: 1.5rem;
		}
	}
	.hideBox {
		width: 35rem;
		height: 43.75rem;
		border: 1px solid #e5e5e5;
		background: #ffffff;
		border-radius: 0.63rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -21.82rem;
		margin-left: -17.5rem;
		animation: flyScaleBox 0.5s ease forwards;
		.box {
			color: #333;
			font-size: 1.5rem;
			position: absolute;
			bottom: 3.88rem;
			left: 60%;
			transform: translateX(-50%);
		}
	}
	// 时尚定制首页
	@keyframes fashion {
		0% {
			transform: translateX(15rem);
			opacity: 0;
		}
		100% {
			transform: translateX(0rem);
			opacity: 1;
		}
	}
	@keyframes flyScaleImg {
		0% {
			opacity: 0;
			transform: translate(0rem, 0);
		}
		100% {
			transform: translate(28rem, -26.8rem) scale(0.3);
			opacity: 1;
		}
	}
	@keyframes flyScaleBox {
		0% {
			opacity: 0;
			top: 50%;
			height: 43.75rem;
		}
		100% {
			top: 32%;
			opacity: 1;
			height: 10rem;
		}
	}
	}
</style>
