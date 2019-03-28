<template>
	<div class="myHome">
		<header class="myHomeHeader">
			<p>定制小课堂</p>
			<p>登录账户</p>
		</header>
		<div class="main">
			<ul class="title_wrap">
				<li>
					<ul class="title_inner">
						<li><p>时尚定制</p><p>GIA钻石专场</p></li>
						<li><p>时尚定制</p><p>GIA钻石专场</p></li>
						<li><p>时尚定制</p><p>GIA钻石专场</p></li>
					</ul>
				</li>
				<li>
					<ul class="title_inner">
						<li><p>时尚定制</p><p>GIA钻石专场</p></li>
						<li><p>时尚定制</p><p>GIA钻石专场</p></li>
						<li><p>时尚定制</p><p>GIA钻石专场</p></li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="myLogin">
			<div class="no_login">
				<p></p>
				<p>请先登录员工账号！</p>
				<div class="btn_login">登录</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		created () {

		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.myHome{
		.myHomeHeader{
			display: flex;
			justify-content: space-between;
			padding: 0 35px 0 49px;
			box-sizing: border-box;
			p:last-child{
				&:active{
					opacity: 0.8;
				}
			}
		}
		.main{
			margin-top: 57px;
			padding: 150px 280px 0 246px;
			.title_wrap{
				.title_inner{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					li{
						width: 200px;
						height: 100px;
						border: 1px solid #000;
						margin-bottom: 150px;
						text-align: center;
						padding: 40px 0;
						box-sizing: border-box;
						p:first-child{
							font-size: 20px;
							line-height: 20px;
						}
						p:last-child{
							font-size: 12px;
							line-height: 20px;
						}
					}
				}
			}
		}
		.no_login{
			width: 340px;
			height: 206px;
			border: 1px solid #000;
			padding: 0 20px 16px 0;
			box-sizing: border-box;
			position: absolute;
			margin: 0;
			top: 0;
			left: 0;
			right: 0;
			top: 0;			
			p{
				text-align: center;
				line-height: 206px;
			}
			.btn_login{
				position: absolute;
				height: 30px;
				width: 80px;
				border: 1px solid #000;
				text-align: center;
				line-height: 30px;
				right: 20px;
				bottom: 16px;
			}
		}
	}
</style>
