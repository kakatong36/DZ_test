<template>
    <div class="home-wrap">
        <div class="line-group" :style="lineGroup">
            <div class="line-img-wrap">
                <div class="line line-top">
                    <img src="../assets/home/line-up.png"/>
                </div>
                <div class="line line-center">
                    <img src="../assets/home/line-center.png"/>
                </div>
                <div class="line line-bottom">
                    <img src="../assets/home/line-bottom.png"/>
                </div>
            </div>
            <!-- <div class="center-img">
                <img src="../assets/home/final.png">
            </div> -->
            <div class="center-img">
                <img src="../assets/home/left-top.png" class="left-top">
                <img src="../assets/home/left-down.png" class="left-bottom">
                <img src="../assets/home/right-top.png" class="right-top">
                <img src="../assets/home/right-bottom.png" class="right-bottom">
                <img src="../assets/home/personal-center.png" class="center">
                <img src="../assets/home/personal-make.png" class="personal-make">
                <img src="../assets/home/fashion-make.png" class="fashion-make">
                <img src="../assets/home/pic-make.png" class="pic-make">
                <img src="../assets/home/private-make.png" class="private-make">
            </div>
        </div>
    </div>
</template>
<script>
    //import $ from 'jquery'
    export default {
        name: 'animate',
        data(){
            return {
                lineGroup: {
                    width: screen.width*0.35 + 'px',
                    height: screen.width*0.35 + 'px'
                }
            }
        },
        created(){
            setTimeout(() => {
                //$('.line-center')[0].addClass('in')
                //$('.line-top').addClass('in')
                //$('.line-bottom').addClass('in')
                addClass($('line-center')[0], 'in')
                addClass($('line-top')[0], 'in')
                addClass($('line-bottom')[0], 'in')
            }, 0);
            setTimeout(() => {
                /* $('.line-center').addClass('out')
                $('.line-top').addClass('out')
                $('.line-bottom').addClass('out') */
                addClass($('line-center')[0], 'out')
                addClass($('line-top')[0], 'out')
                addClass($('line-bottom')[0], 'out')
            }, 200);
            setTimeout(() => {
                //$('.center-img').addClass('in')
                addClass($('center-img')[0], 'in')
            }, 400);
            setTimeout(() => {
                //$('.center-img').addClass('enlarge')
                addClass($('center-img')[0], 'enlarge')
            }, 800);
            setTimeout(() => {
                //$('.center-img').addClass('text')
                addClass($('center-img')[0], 'text')
            }, 1000);
        }
    }
    function $(name){
        return document.getElementsByClassName(name)
    }
    function addClass(dom, className){
        if(!dom.className){
            dom.className = className
        }else{
            dom.className += ` ${className}`
        }
    }
</script>
<style lang="scss">
    #app, .home-wrap{
        width: 100%;
        height: 100%;
    }
    .home-wrap{
        background: url('../assets/home/bg.jpg') center no-repeat;
        background-size: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .line-group{
            position: relative;
            .line-base{
                position: absolute;
                width: 1px;
                height: 80%;
                background: #fff;
            }
            .line-img-wrap{
                width: 100%;
                height: 100%;
                position: relative;
                .line{
                    height: 33.33%;
                    overflow: hidden;
                    position: absolute;
                }   
                img{
                    width: 100%;
                    vertical-align: middle;
                    margin-top: 0;
                }
                .line-top{
                    height: 0%;
                    top: -7%;
                    transition: all .2s linear 0s;
                    &.in{
                        height: 33.33%;
                    }
                    &.out{
                        top: 100%;
                        img{
                            transition: all .2s linear 0s;
                            margin-top: -100%;
                        }
                    }
                }
                .line-center{
                    height: 0%;
                    top: 16.66667%;
                    transition: all .2s linear 0s;
                    &.in{
                        height: 66%;
                    }
                    &.out{
                        img{
                            transition: all .2s linear 0s;
                            margin-top: 100%;
                        }
                    }
                }
                .line-bottom{
                    height: 0.1%;
                    bottom: -7%;
                    transition: all .2s linear 0s;
                    img{
                        transition: all .2s linear 0s;
                        margin-top: -32.33%;
                    }
                    &.in{
                        height: 32.23%;
                        img{
                            margin-top: 0%;
                        }
                    }
                    &.out{
                        bottom: 64%;
                        height: 0%;
                        img{
                            transition: all .2s linear 0s;
                            margin-top: 32.23%
                        }
                    }
                }
            }
            .center-img{
                position: absolute;
                top: -7%;
                left: 50%;
                width: 100%;
                margin-left: -50%;
                transition: all .4s linear 0s;
                height: 113.5%;
                opacity: 0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                img{
                    width: 50%;
                    position: absolute;
                    transition: all .2s linear 0s;
                    &.left-top{
                        left: 0;
                        top: 0;
                    }
                    &.left-bottom{
                        left: 0;
                        bottom: 0;
                    }
                    &.right-top{
                        right: 0;
                        top: 0;
                    }
                    &.right-bottom{
                        right: 0;
                        bottom: 0;
                    }
                    &.center{
                        width: 35%;
                        opacity: 0;
                    }
                    &.personal-make, &.pic-make, &.private-make, &.fashion-make{
                        opacity: 0;
                    }
                    &.pic-make{
                        transition: all .3s linear 0.1s;
                    }
                    &.private-make{
                        transition: all .3s linear 0.3s;
                    }
                    &.fashion-make{
                        transition: all .3s linear 0.2s;
                    }
                }
                &.in{
                    opacity: 1;
                }
                &.enlarge{
                    img{
                        &.left-top{
                            left: -2%;
                            top: -2%;
                        }
                        &.left-bottom{
                            left: -2%;
                            bottom: -2%;
                        }
                        &.right-top{
                            right: -2%;
                            top: -2%;
                        }
                        &.right-bottom{
                            right: -2%;
                            bottom: -2%;
                        }
                        &.center{
                            width: 47%;
                            opacity: 1;
                        }
                    }
                }
                &.text{
                    img{
                        &.personal-make{
                            left: -28%;
                            top: -18%;
                            opacity: 1;
                        }
                        &.fashion-make{
                            left: -28%;
                            bottom: -18%;
                            opacity: 1;
                        }
                        &.pic-make{
                            right: -28%;
                            top: -18%;
                            opacity: 1;
                        }
                        &.private-make{
                            right: -28%;
                            bottom: -18%;
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
   
    
</style>


