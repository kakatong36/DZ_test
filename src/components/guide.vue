<template>
<div class="home-box" id='home'>
    <div class="cusClass">
		<img src="../assets/home/cusClassicon.png" alt="" @click="goClass">
		<span @click="goClass">定制小课堂</span>
	</div>

    <div class="center-img">
		<!-- 时尚定制 -->
        <img src="../assets/home/home-fashion.png" class="left-top" @click="$router.push('/finalFashion/fashionIndex')">
		<!-- 私人定制 -->
        <img src="../assets/home/home-private.png" class="left-bottom" @touchstart="showSecret">
		<!-- 轻奢定制 -->
        <img src="../assets/home/home-luxury.png" class="right-top" @click="$router.push('/lightFashion/fashion')">
		<!-- 订单详情 -->
        <img src="../assets/home/home-order.png" class="right-bottom" @click="orderList">
		<!-- 来图定制 -->
        <img src="../assets/home/home-toMap.png" class="left" @click="$router.push('/toMap/index')">
		<!-- 套装定制 -->
        <img src="../assets/home/home-suit.png" class="right" @click="$router.push('/personal')">
		<!-- 登录账号 -->
        <img src="../assets/home/sixShape.png" class="center">
		<img src="../assets/home/home-photo.png" class="center-photo">
		<!-- <div> -->
			<p class='user-action' v-if='loginSuccess'>{{username}}</p>
			<p class='user-logOut' v-if='loginSuccess' @click="logout">退出登录</p>
		<!-- </div> -->
    </div>
	<shopMenu></shopMenu>
</div>
</template>
<script>
	import md5 from "js-md5";
	import axios from "axios";
	var unilogin = "/auth/unifylogin/usercenter_Api_UnifyUser_LoginSystem";
	var normallogin = "/login/usercenter_api_user_getItem";
    export default {
        name: 'home',
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
				loginSuccess: true,
				username: '',

				secretTimes: 0,
				timeOutId: null
            }
        },
        created(){
            this.getList();
            setTimeout(() => {
                addClass($('center-img')[0], 'img_appear')
			}, 0);
			let username = JSON.parse(window.localStorage.user).Account;
			this.username = username;
        },
        methods: {
            //该接口仅用于测试token是否过期
            getList(){
                var options = {
                    url:'/order_Api_CustomizeOrder_GetCustomizeOrderList',
                    params: {
                        pageIndex: 1,
                        pageSize: 10
                    }
                }
                var cbok = res => {}
                var cbno = res => {}
                var cbnull = res => {}
                this.http.get(options,cbok,cbno,cbnull)
            },
            orderList(){
                this.$router.push({
                    name: 'finalFashionList'
                })
            },
            logout(){
                localStorage.clear();
                this.$router.push('/login');
			},
			goClass(){
				
				this.$router.push('/classRoom');
			},

			showSecret(){
				this.secretTimes++;

				clearTimeout(this.timeOutId);
				this.timeOutId = setTimeout(function(){
					this.secretTimes = 0;
				}, 3000);

				if(this.secretTimes >= 5){
					this.secretTimes = 0;
					if(self.isApp){ //判断是否在app模式
						let w = plus.webview.open('index2.html', 'index2');
					}
				}

			}
        }
    }
    function $(name){
        return document.getElementsByClassName(name)
    }
    function addClass(dom, className){
        if(dom){
            if(!dom.className){
                dom.className = className
            }else{
                dom.className += ` ${className}`
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
    #app, .home-box,{
        width: 100%;
        height: 100%;
    }
	html,body{
		font-size: 8px;
	}
	#home{
		width: 100%;
		height: 100%;
		position: relative;
		&.home-box{
			background: url('../assets/home/newbg.jpg') center no-repeat;
			background-size: 100%;
			padding: 20px 0;
			.cusClass{
				width: 100%;
				border: 1px solid transparent;
				height: 8rem;
				img{
					width: 1.6%;
					height: 2.1%;
					right: 10.2%;
					top: 4.4%;
					position: absolute;
					z-index: 10;
				}
				span{
					z-index: 10;
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
				position: absolute;
				top: 0;
				img{
					opacity: 0;
					position: absolute;
					transition: all .2s linear 0s;
					&.left-top{
						width: 24.9%; 
						height: 26%;
						left: 24%;
						top: 10.3%;
					}
					&.left-bottom{
						width: 24.9%; 
						height: 26%;
						left: 24%;
						bottom: 10.4%;
					}
					&.right-top{
						width: 25.1%;
						height: 26.1%;
						right: 25.02%;
						top: 10.2%;
					}
					&.right-bottom{
						width: 25.1%;
						height: 26.1%;
						right: 25%;
						bottom: 10.4%;
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
						right: 24%;
						top: 30.7%;
					}
					&.left{
						width: 8.9%;
						height: 38.4%;
						left: 23%;
						top: 30.7%;
					}
					&.center-photo{
						width: 7.8%;
						height: 10.4%;
						top: 42.8%;
						left: 46.1%;
					}
				}
				.user-action{
					width: 22%;
					height: 2.7%;
					position: absolute;
					top: 54.5%;
					left: 39%;
					z-index: 200;
					color: #FFFFFF;
					font-size: 2rem !important;
					text-align: center;
				}
				.user-logOut{
					width: 7.3%;
					height: 2.7%;
					z-index: 200;
					top: 59%;
					left: 46.3%;
					text-align: center;
					position: absolute;
					color: #FFFFFF;
					font-size: 1.4rem !important;
					text-decoration: underline;
				}
				&.img_appear{
					opacity: 1;
					img{
						opacity: 1;
					}
					.center-photo{
						opacity: 1;
					}
				}
			}
		}	
	}

</style>