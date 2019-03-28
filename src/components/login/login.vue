<template>
<div class="home-box" id='login'>
    <div class="cusClass">
		<img src="../../assets/home/cusClassicon.png" alt="">
		<span>定制小课堂</span>
	</div>

    <div class="center-img">
		<!-- 时尚定制 -->
        <img src="../../assets/home/home-fashion.png" class="left-top" @click='getLoginWay'>
		<!-- 私人定制 -->
        <img src="../../assets/home/home-private.png" class="left-bottom" @click='getLoginWay'>
		<!-- 轻奢定制 -->
        <img src="../../assets/home/home-luxury.png" class="right-top" @click='getLoginWay'>
		<!-- 订单详情 -->
        <img src="../../assets/home/home-order.png" class="right-bottom" @click='getLoginWay'>
		<!-- 来图定制 -->
        <img src="../../assets/home/home-toMap.png" class="left" @click='getLoginWay'>
		<!-- 套装定制 -->
        <img src="../../assets/home/home-suit.png" class="right" @click='getLoginWay'>
		<!-- 登录账号 -->
        <img src="../../assets/home/sixShape.png" class="center" @click='getLoginWay'>
		<img src="../../assets/home/start-photo.png" class="center-photo" @click='getLoginWay'>
		<p class='user_action' @click='getLoginWay'>登录账号</p>
    </div>
	<div class='login_info'>
		<div class="sysmbol"></div>
		<p class='userNumber'>
			<label for="username">账号</label>
		</p>
		<input type="text" v-model='loginer.user' id="username" @click='getUserFocus' placeholder="  请输入登录账号" class='logInfo user' />
		<p class='user_pwd'>
			<label for="pwd" >密码</label>
		</p>
		<input type="password" id="pwd" placeholder="  请输入登录密码" @click='getPwdFocus' class='logInfo pwd' v-model='loginer.pwd' @keyup.enter="login" />
		<input type="button" class="log_btn" @click='login' />
	</div>
	<div class='login_shadow' @click='clearModal'></div>
	
	<v-loading v-show="isloading"></v-loading>
	<div class='cols_one'>
		<div>顶尖工厂起版定制</div>
	</div>
	<div class='cols_two'>
		<div>30分以上钻石，及大克拉彩宝、<br>珍珠的时尚珠宝定制</div>
		<div>专业的珠宝设计师为您服务</div>
	</div>
	<div class='cols_three'>
		<div>小清新的轻奢珠宝定制</div>
		<!-- <div>这是一段功能说明。这是一段功能说明。这是一段功能说明。这是一段功能说明。这是一段功能说明。这是一段功能说明。</div> -->
	</div>
	<div class='cols_four'>
		<div>成套定制才够精彩</div>
	</div>
</div>

</template>



<script>
	import md5 from "js-md5";
	import axios from "axios";
	import loading from "@/components/isLoading/isloading";
	var unilogin = "/auth/unifylogin/usercenter_Api_UnifyUser_LoginSystem";
	var normallogin = "/login/usercenter_api_user_getItem";
	
			document.getElementsByTagName('center-img img').onclick = function(){
				console.log('4455')
			}
    export default {
        name: 'login',
        data(){
            let width = screen.width,
                circleWidth,
                circleHeight;
            if(screen.width>1366){
                width = 1366
                circleWidth = width*0.35*2
                circleHeight = width*0.35*2*914/1050//914/1050是图片的高度和宽度
            }else{
                circleWidth = width*0.35*2.2,
                circleHeight = width*0.35*2.2*914/1050//914/1050是图片的高度和宽度
            }
            let top = -circleHeight/2 + 'px',
                left = -circleWidth/2 + 'px'  
                return {
				isloading : false,
                isShow: this.$store.state.header.isShow = false,
				isShowF: this.$store.state.footer.isShow = false,
      			title: (this.$store.state.header.title = ""),
                circle: {
                    width: circleWidth + 'px',
                    height: circleHeight + 'px',
                    left: left,
                    top: top,
                    margin: `${width*0.35/2}px 0 0 ${width*0.35/2}px`
                },
                lineGroup: {
                    width: width*0.35 + 'px',
                    height: width*0.35 + 'px'
                },
				loginer: {
					user: "",
					pwd: ""
				},
				logining: false,
				show: true,
				loginSuccess: false,
				username: ''
            }
		},
        created(){
            // this.getList()
            setTimeout(() => {
				addClass($('center-img')[0], 'entrans')	//一圈
            }, 400);
            setTimeout(() => {
				addClass($('center-img')[0], 'enlarge')	//变大
				addClass($('cols_one')[0], 'text_appear')
				addClass($('cols_two')[0], 'text_appear')
				addClass($('cols_three')[0], 'text_appear')
				addClass($('cols_four')[0], 'text_appear')	//文字过渡性出现
            }, 1100);
            setTimeout(() => {
				// addClass($('center-img')[0], 'ensmall')	//收缩
            }, 1200);
        },
        methods: {
			getLoginWay(){
				$('login_info')[0].style.display = 'block';
				$('login_shadow')[0].style.display = 'block';
				const username = document.getElementById('username'),
				password = document.getElementById('pwd');
				if(username.value.length && ! password.value.length){
					password.focus();
				}else if(!username.value.length && !password.value.length){
					username.focus();
				}else{
					return
				}
			},
			clearModal (){
				$('login_info')[0].style.display = 'none';
				$('login_shadow')[0].style.display = 'none';
			},
			login() {
				var that = this;
				var params = {};
				if (!this.loginer.user) {
					this.bombox.tomast({
						msg: "账号不能为空",
						type: "warning"
					});
					return;
				}
				params.Account = this.loginer.user;
				if (!this.loginer.pwd) {
					this.bombox.tomast({
					msg: "密码不能为空",
					type: "warning"
					});
					return;
				}
				params.Password = md5(this.loginer.pwd);
				var options = {
					url: unilogin,
					params: params
				};

				this.isloading = true;
				var cbok = res => {
					localStorage.clear();
					this.isloading = false;
					localStorage.setItem("TokenStr", res.data.data.TokenStr);
					localStorage.setItem("user", JSON.stringify(res.data.data));
					axios.defaults.headers.common["tokenStr"] = localStorage.getItem(
					"TokenStr"
					);
					that.$router.push({
						path: "/",
						name: 'home'
					});
					this.closeLoad();
				};
				var cbno = res => {
					this.isloading = false;
					that.bombox.tomast({
						msg: res.data.message,
						type: "warning"
					});
					this.closeLoad();
				};
				if (!this.logining) {
					this.isloading = true;
					this.http.logAuth(options, cbok, cbno);
					this.clearModal(); //清空弹层
				}
			},
			getUserFocus (){
				var user = document.getElementById('username');
				var pwd = document.getElementById('pwd');
				user.focus();
				pwd.blur();
			},
			getPwdFocus (){
				var user = document.getElementById('username');
				var pwd = document.getElementById('pwd');
				pwd.focus();
				user.blur();
			}
		},
		components : {
			
			'v-loading': loading
		}
    }
	//输入框获取焦点
	// $('user')[0].trigger("click").focus();
	// $('pwd')[0].trigger("click").focus();
    function $(name){
        return document.getElementsByClassName(name)
    }
    function addClass(dom, className){
        if(dom){
            if(!dom.className){
                dom.className = className
            }else{
                dom.className += ` ${className}`;
            }
        }
    }
    function removeClass(dom, addClass, removeClass){
        if(dom){
			let classList = [];
			classList = dom.className.split(' ');
			for(var index in classList){
				if(classList[index] == removeClass){
					classList[index] = addClass;
				}
				dom.className += classList[index];
			}
        }
    }

</script>

<style lang="scss">
		#app{
			width: 100%;
			height: 100%;
		}
		html,body{
			font-size: 8px;
		}
		#login{
			width: 100%;
			height: 100%;
			position: relative;
			font-size: 8px !important;
			&.home-box{
				background: url('../../assets/home/newbg.jpg') center no-repeat;
				background-size: 100% 100%;
				.login_shadow{
					width: 100%;
					height: 100%;
					display: none;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 250;
					background: rgba(0,0,0,0.3);
					&.appearSdw{
						opacity: 1;
						
						transition: all .1s linear 0s;
					}
					&.clearSdw{
						opacity: 0;
						z-index: 0;
						transition: all .1s linear 0s;
					}
				}
				.login_info{
					width: 35.2%;
					height: 36.1%;
					position: absolute;
					top: 21.4%;
					left: 32.4%;
					z-index: 251;
					background: #FFFFFF;
					border-radius: 4px;
					display: none;
					font-family: PingFangHK-Regular;
					&.appear{
						opacity: 1 !important;
						transition: all .1s linear 0s;
					}
					&.clear{
						opacity: 0;
						z-index: 0;
						transition: all .1s linear 0s;
					}
					.sysmbol{
						width: 33.2%;
						height: 14.4%;
						opacity: 0.3;
						background: #D8D8D8;
						margin-top: 3.6%;
						margin-left: 33.2%;
					}
					p{
						width: 10%;
						height: 7.5%;
						font-size: 1.88rem;
						color: #333333;
						letter-spacing: 0;
						&.userNumber{
							margin-left: 4.3%;
							margin-top: 2.2%;
						}
						&.user_pwd{
							margin-left: 4.3%;
							margin-top: 4.2%;
						}
					}
					.logInfo{
						width: 90%;
						height: 7.8%;
						margin-left: 4.3%;
						margin-top: 1.0%;
						font-size: 1.5rem;
						background: #FFFFFF;
						border: 1px solid #E5E5E5;
						border-radius: 3px;
						-webkit-tap-highlight-color: rgba(0,0,0,0);       
						-webkit-user-modify: read-write-plaintext-only;
						outline: 0;
					}
					.log_btn{
						display: block;
						width: 55.4%;
						height: 17.7%;
						margin-left: 22.2%;
						margin-top: 7.2%;
						border: none;
						background: url('../../assets/home/log_btn.png');
						-webkit-tap-highlight-color:transparent;
						background-size: 100% 100%;
					}
				}
				.cusClass{
					width: 100%;
					border: 1px solid transparent;
					img{
						width: 1.6%;
						height: 2.1%;
						right: 10.2%;
						top: 4.4%;
						position: absolute;
					}
					span{
						width: 6.8%;
						height: 2.6%;
						position: absolute;
						top: 4.4%;
						right: 2.9%;
						font-family: PingFangHK-Regular;
						font-size: 1.6rem;
						color: #333333;
						letter-spacing: 0;
					}
				}
				.center-img{
					width:100%;
					height:100%;
					img{
						opacity: 0;
						position: absolute;
						z-index: 10;
						transition: all .2s linear 0s;
						&.left-top{
							width: 24.9%; 
							height: 26%;
							left: 25%;
							top: 11.6%;
						}
						&.left-bottom{
							width: 24.9%; 
							height: 26%;
							left: 25%;
							bottom: 11.7%;
						}
						&.right-top{
							width: 25.1%;
							height: 26.1%;
							left: 49.9%;
							top: 11.55%;
						}
						&.right-bottom{
							width: 25.1%;
							height: 26.1%;
							left: 49.9%;
							bottom: 11.6%;
						}
						&.center{
							width: 22%;
							height: 33.1%;
							top: 33.4%;
							left: 39%;
							opacity: 0;
						}

						&.right{
							width: 8.9%;
							height: 38.4%;
							top: 30.7%;
							right: 25%;
						}
						&.left{
							width: 8.9%;
							height: 38.4%;
							top: 30.7%;
							left: 25%;
						}
						&.center-photo{
							width: 7.8%;
							height: 10.4%;
							opacity: 0;
							top: 42.8%;
							left: 46.1%;
						}
					}
				.user_action{
					width: 5.9%;
					height: 2.7%;
					z-index: 200;
					text-align: center;
					position: absolute;
					font-family: PingFangHK-Regular;
					color: #FFFFFF;
					font-size: 1.88rem;
					letter-spacing: 0;
					left: 47.1%;
					top: 54.5%;
				}
				&.enlarge{
					img{
						&.left-top{
							left: 24%;
							top: 10.3%;
							transition: all .1s linear 0s !important;
						}
						&.left-bottom{
							left: 24%;
							bottom: 10.4%;
							transition: all .1s linear 0s !important;
						}
						&.right-top{
							right: 24%;
							top: 10.2%;
							transition: all .1s linear 0s !important;
						}
						&.right-bottom{
							right: 24%;
							bottom: 10.3%;
							transition: all .1s linear 0s !important;
						}
						&.center{
							opacity: 1;
							top: 33.4%;
							left: 39%;
							transition: all .1s linear 0s !important;
						}
						&.center-photo{
							opacity: 1;
							z-index: 200; 
							transition: all .1s linear 0s;
						}
						&.right{
							right: 24%;
							top: 30.7%;
							transition: all .1s linear 0s !important;
						}
						&.left{
							left: 23%;
							top: 30.7%;
							transition: all .1s linear 0s !important;
						}
					}
				}
				&.ensmall{
					img{
						&.left-top{
							left: 24%;
							top: 10.3%;
							transition: all .1s linear 0s !important;
						}
						&.left-bottom{
							left: 24%;
							bottom: 10.4%;
							transition: all .1s linear 0s !important;
						}
						&.right-top{
							right: 24%;
							top: 10.2%;
							transition: all .1s linear 0s !important;
						}
						&.right-bottom{
							right: 24%;
							bottom: 10.3%;
							transition: all .1s linear 0s !important;
						}
						&.center{
							opacity: 1;
							top: 33.4%;
							left: 39%;
							transition: all .1s linear 0s !important;
						}
						&.right{
							right: 23%;
							top: 30.7%;
							transition: all .1s linear 0s !important;
						}
						&.left{
							left: 23%;
							top: 30.7%;
							transition: all .1s linear 0s !important;
						}
					}
				}
				&.entrans{
					img{
						&.left-top{
							opacity: 1;
							transition: all .1s linear 0s;
						}
						&.right-top{
							opacity: 1;
							transition: all .1s linear .1s;
						}
						&.right{
							opacity: 1;
							transition: all .1s linear .2s;
						}
						&.right-bottom{
							opacity: 1;
							transition: all .1s linear .3s
						}
						&.left-bottom{
							opacity: 1;
							transition: all .1s linear .4s;
						}
						&.left{
							opacity: 1;
							transition: all .1s linear .5s;
						}
						// &.center{
						// 	opacity: 0;
						// 	transition: all .1s linear .6s;
						// }
						// &.center-photo{
						// 	opacity: 0;
						// 	z-index: 200;
						// 	transition: all .1s linear .6s;
						// }
					}
				}
			}
		.cols_one,
		.cols_two,
		.cols_three,
		.cols_four{
			// border: 1px solid red;
			opacity: 0;
			z-index: 1 !important;
			position: absolute;
			div{
				font-size: 1.65rem !important;
				color: black;
				z-index: 1 !important;
				transition: all .1s linear 0s !important;
			}
			&.text_appear{
				z-index: 1 !important;
				opacity: 1;
			}
		}
		.cols_one{
			height: 100%;
			width: 23%;
			top:0;
			left: 8%;
			padding: 0 2%;
			display: flex;
			align-items: center;
		}
		.cols_four{
			height: 100%;
			width: 23%;
			top:0;
			right: 0;
			padding: 0 1%;
			display: flex;
			align-items: center;
		}
		.cols_two{
			height: 80%;
			width: 23%;
			top: 10%;
			left: 15%;
			padding: 0 2%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.cols_three{
			height: 80%;
			width: 23%;
			top: 10%;
			right: 15%;
			padding: 0 2%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
}
</style>