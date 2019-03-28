<template>
	<div class="promptbox" v-show="msg.show">
		<div class="out-wrap" :class="{active:msg.text, out: msg.time}">
			<div class="img">
				<img src="../../assets/assetsFinal/alert.png" alt="">
				<p>{{msg.text}}</p>
			</div>
			<div class="sure-btn" v-show="msg.sure">确定</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isShow:true,
			}
		},
		props: ['msg'],
		mounted () {
			this.$nextTick(()=>{
				
			})
		}
	}
</script>

<style lang="scss">
html,body{
	font-size: 8px;
}
#app{
	height: 100%;	
}
	.fade1-enter-active{
		animation: fade2 1.5s ease;
		animation-fill-mode: forwards;
		// animation: fade3 1.5s ease;
	}
	.fade1-enter,.fade1-to-leave{
		z-index: -999;
		
		// animation: fade2 1.5s ease;
		// animation-fill-mode: forwards;
		// transform: translate3d(0,30px,0);
		// -webkit-transform: translate3d(0,30px,0);
	}
	@keyframes fade2 {
		0%{
			transform: translate3d(0,30px,0);
			opacity: 1;
		}
		50%{
			transform: translate3d(0,0,0);
		}
		100%{
			transform: translate3d(0,0,0);
		}
	}
	
	.promptbox{
		// background: rgba(0,0,0,0.2);
		// width: 100%;
		// height: 100%;
		color: #333;
		font-size: 1.88rem;
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		.out-wrap{
			width: 50rem;
			border-radius: 0.63rem;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
			z-index: 99;
			opacity: 1;
			transition: all .5s linear .5s;
			&.active{
				top: 50%;
				opacity: 1;
			}
			&.out{
				opacity: 0;
			}
			.sure-btn{
				border-top: 1px solid #E5E5E5;
				height: 6.13rem;
				line-height: 6.13rem;
				text-align: center;
				&:active{
					opacity: 0.8;
				}
			}
			.img{
				padding-top: 2.5rem;
				padding-bottom: 1.25rem;
				img{
					width: 15rem;
					height: 15rem;
					margin-bottom: 1.25rem;
				}
				display: flex;
				align-items: center;
				flex-direction: column;
			}
		}
	}
</style>
