<template>
  <div class="finalFinshed">
        <!-- <v-header :header="header"></v-header> -->
		<div class="finalFinshedContent">
			<div class="product_img">
				<img src="../../assets/assetsFinal/finish-gif.gif" alt="">
			</div>
			<p class="tips">恭喜你，已成功定制 时尚定制 系列钻戒</p>
			<p class="tips">稍后将有客服专员联系您</p>
			<div class="next_step" @click="next_step">返回首页</div>
		</div>
  </div>
</template>

<script>
    import footer from './footer'
    import header from './header'
    export default {
        data () {
            return {
                finishParams:{
                    isStone: true,
                    isPay: true,
                    isFinished: true
                },
                header:{
					title: '完成',
					isShow: true,
					return: {
						name: 'home'
					}
                }
            }
        },
        methods: {
            next_step () {
                this.$router.push('/')
            }
        },
         components: {
            'v-footer': footer,
            'v-header': header
        }
    }
</script>

<style lang="scss">
    #app{
        height: 100%;
    }
    .finalFinshed{
       	height: 100%;
		.finalFinshedContent{
			padding-top: 6.25rem;
        	height: 100%;
			background: url(../../assets/assetsFinal/finished-bg.png) no-repeat center;
			overflow-y: scroll;
			background-size: cover;
		}
        .product_img{
            width: 62.5rem;
            height: 37.5rem;
            opacity: 0.2;
            margin: 0 auto;
            margin-bottom: 2.55rem;
            transform: translateY(50rem);
            animation: upDown1 0.2s linear;
            animation-fill-mode: forwards;
        }
        .tips{
            font-size: 1.88rem;
            color: #333;
            letter-spacing: 0;
            line-height: 1.75rem;
            text-align: center;
			width: 100%;
            transform: translateY(50rem);
            animation: upDown1 0.2s 0.1s linear;
            animation-fill-mode: forwards;
			margin-top: 1.25rem;
        }
        .next_step{
            width: 25rem;
            height: 5.5rem;
            background-image: linear-gradient(-134deg, #FFBABA 0%, #F27474 100%);
            border-radius: 0.63rem;
            font-size: 1.5rem;
            text-align: center;
            line-height: 5.5rem;
            margin:0 auto;
            color: #ffffff;
            font-weight: bold;
            margin-top: 2.5rem;
            transform: translateY(50rem);
            animation: upDown1 0.2s 0.2s linear;
            animation-fill-mode: forwards;
            &:active{
                opacity: 0.8;
            }
        }
         @keyframes upDown1 {
             0%{
                opacity: 0;
                transform: translateY(5rem);
            }
            100%{
                opacity: 1;
                transform: translateX(0rem);
            }
        }
    }
</style>
