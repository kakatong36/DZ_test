<template>
	<div class="promptbox">
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
				time: ''
			}
		},
		props: ['msg'],
	}
</script>

<style lang="scss">
	html,body{
		font-size: 8px;
	}
	#app{
		height: 100%;	
	}
	.promptbox{
		color: #333;
		font-size: 1.88rem;
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		.out-wrap{
			width: 27.5rem;
			border-radius: 0.63rem;
			position: absolute;
			top: 65%;
			left: 50%;
			transform: translate(-50%,-50%);
			background: #ffffff;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
			z-index: 99;
			opacity: 0;
			animation: fadeOutBox 2s ease;
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
					width: 7.5rem;
					height: 7.5rem;
					margin-bottom: 1.25rem;
				}
				display: flex;
				align-items: center;
				flex-direction: column;
			}
		}
		@keyframes fadeOutBox {
			0%{
				top: 65%;
				opacity: 0;
			}
			40%{
				top: 40%;
				opacity: 1;
			}
			50%{
				top: 40%;
				opacity: 1;
			}
			60%{
				top: 40%;
				opacity: 1;
			}
			100%{
				top: 65%;
				opacity: 0;
			}
		}
	}
</style>
